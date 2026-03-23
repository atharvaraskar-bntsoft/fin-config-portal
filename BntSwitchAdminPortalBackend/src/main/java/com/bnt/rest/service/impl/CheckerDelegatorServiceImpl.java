package com.bnt.rest.service.impl;

import java.io.Serializable;
import java.util.List;

import jakarta.persistence.EntityManager;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import com.bnt.common.HttpCommons;
import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.JsonObjectUtil;
import com.bnt.enums.EntityGroupEnum;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.BaseDto;
import com.bnt.rest.entity.BaseEntity;
import com.bnt.rest.entity.DeviceType;
import com.bnt.rest.entity.Institution;
import com.bnt.rest.jpa.repository.GenericRepository;
import com.bnt.rest.service.CheckerDelegatorService;
import com.bnt.rest.wrapper.dto.CheckerDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class CheckerDelegatorServiceImpl implements CheckerDelegatorService {

	private static Log logger = LogFactory.getLog(CheckerDelegatorServiceImpl.class);

	public static final List<Class<?>> genericHandlerEntityList = List.of(DeviceType.class, Institution.class);

	@Autowired
	private EntityManager entityManager;

	@Autowired
	GenericRepository<BaseEntity, Serializable> genericRepo;

	@Lazy
	@Autowired
	private CheckerDelegatorServiceImpl self;

	@SuppressWarnings("unchecked")
	@Override
	public boolean delegate(CheckerDto checkerDto) {

		boolean isOperationPerformed = false;
		try {
			Class<? extends BaseEntity> entityClass = (Class<? extends BaseEntity>) JPAUtils
					.getClassTypeBySimpleName(entityManager, checkerDto.getEntityType());

			Class<? extends BaseDto> dtoClassType = (Class<? extends BaseDto>) JPAUtils
					.getDtoClassTypeBySimpleEntityName(checkerDto.getEntityType(), false);

			Object dtoObject = JsonObjectUtil.getObjectFromString(checkerDto.getJson(), dtoClassType);
			if (dtoObject == null) {
				return false;
			}
			String operationType = checkerDto.getOperationType();
			BaseEntity entityObject = ObjectMapper.map(dtoObject, entityClass);
			if (isEntityApplicableForGenericRepo(entityClass)) {

				self.delegateToGenericRepository(entityObject, operationType);
			}

			else if (EntityGroupEnum.MERCHANT_GROUP.name().equals(checkerDto.getGroupType())) {

				isOperationPerformed = delegateForMerchantHierarchy(dtoObject, entityClass,
						checkerDto.getOperationType());
			}
		} catch (Exception e) {
			logger.error("exception in delegating through checker:delegate()", e);

		}
		return isOperationPerformed;

	}

	private boolean isEntityApplicableForGenericRepo(Class<? extends BaseEntity> entityClass) {

		return genericHandlerEntityList.contains(entityClass);
	}

	/*
	 * /To perform operations without any specific business processing
	 */

	@org.springframework.transaction.annotation.Transactional
	public boolean delegateToGenericRepository(BaseEntity entityObject, String operationType) {
		try {

			processSpecificProcessing(entityObject);
			if (HttpCommons.isPostOrPUTOperation(operationType)) {
				genericRepo.save(entityObject);
			}
			return true;
		} catch (Exception e) {
			logger.error("exception in delegating through delegateToGenericRepository()", e);
			return false;
		}

	}

	@Override
	public void processSpecificProcessing(BaseEntity entityObject) {
		if (entityObject instanceof DeviceType deviceType) {
			deviceType.setDeleted('0');
		}
	}

	private boolean delegateForMerchantHierarchy(Object dto, Class<? extends BaseEntity> entityClass,
			String operationType) {
		// Do nothing
		return true;

	}

}
