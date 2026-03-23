package com.bnt.rest.repository.impl;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.metamodel.EntityType;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.querydsl.core.types.Predicate;
import com.querydsl.jpa.impl.JPAQuery;
import com.bnt.common.ResponseWrapper;
import com.bnt.common.util.JPAPredicateHelper;
import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.exception.RippsAdminRestException;
import com.bnt.constant.ParameterConstant;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.DeviceTypeDto;
import com.bnt.rest.entity.DeviceType;
import com.bnt.rest.entity.QDeviceType;
import com.bnt.rest.jpa.repository.DeviceTypePersistenceHelper;
import com.bnt.rest.repository.DeviceTypeRepository;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public class DeviceTypeRepositoryImpl implements DeviceTypeRepository {

	private static final Logger logger = LogManager.getLogger(DeviceTypeRepositoryImpl.class);

	@Autowired
	private DeviceTypePersistenceHelper deviceTypePersistenceHelper;

	@PersistenceContext
	private EntityManager entityManager;

	@PostConstruct
	public void setParam() {
		EntityType<?> entityType = JPAUtils.getEntityType(entityManager, DeviceType.class);
		logger.debug("entityType..{}", entityType);
	}

	@Override
	public ResponseWrapper findPagedDeviceTypes(Map<String, Object> requestParamMap) throws RippsAdminRestException {

		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		String[] filters = (String[]) requestParamMap.get(ParameterConstant.FILTERS);
		Page<DeviceType> userPage = null;
		if (filters == null) {
			userPage = deviceTypePersistenceHelper.findDeviceTypeByDeleted('0', pageable);
		} else {
			userPage = getFilterData(pageable, filters);
		}
		ResponseWrapper pageJPAData = JPAUtils.getResponseWrapperByPage(userPage, userPage.getTotalElements());
		pageJPAData.setContent(ObjectMapper.mapListObjects(userPage.getContent(), DeviceTypeDto.class));
		return pageJPAData;

	}

	@SuppressWarnings("unchecked")
	private Page<DeviceType> getFilterData(Pageable pageable, String[] filters) {
		QDeviceType qDeviceType = QDeviceType.deviceType;
		Predicate lockedPredicate = null;
		Predicate codePredicate = null;
		for (String each : filters) {
			String param = each.split(":")[0];
			String value = each.split(":")[1];
			if (param.equals("status")) {
				lockedPredicate = JPAPredicateHelper.getStatusPredicate(qDeviceType.locked, value);
			}
			if (param.equals("code")) {
				codePredicate = qDeviceType.code.eq(value);
			}

		}
		Predicate deletePredicate = qDeviceType.deleted.eq('0');
		Page<DeviceType> merchantInstitutionPage = null;
		JPAQuery<DeviceType> jpaQuery = null;
		jpaQuery = new JPAQuery<>(entityManager);
		jpaQuery.from(qDeviceType).where(lockedPredicate, codePredicate, deletePredicate).limit(pageable.getPageSize())
				.offset(pageable.getOffset());
		List<DeviceType> merchantInstitutionList = jpaQuery.fetch();
		merchantInstitutionPage = (Page<DeviceType>) JPAUtils.getPageObjectFromList(pageable, merchantInstitutionList,
				0);
		return merchantInstitutionPage;
	}

	@Override
	public DeviceType findOne(int id) {
		Optional<DeviceType> optional = deviceTypePersistenceHelper.findById(id);

		if (optional.isPresent()) {
			return optional.get();
		}
		return null;
	}
}
