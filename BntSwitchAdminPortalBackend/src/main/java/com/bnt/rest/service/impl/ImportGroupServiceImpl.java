package com.bnt.rest.service.impl;

import java.io.Serializable;
import java.util.List;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.metamodel.EntityType;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bnt.common.RippsAdminException;
import com.bnt.common.util.CollectionUtil;
import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.JsonObjectUtil;
import com.bnt.rest.entity.BaseEntity;
import com.bnt.rest.entity.EntityExport;
import com.bnt.rest.jpa.repository.EntityExportPersistenceHelper;
import com.bnt.rest.jpa.repository.GenericRepository;
import com.bnt.rest.jpa.repository.MerchantInstitutionPersistenceHelper;
import com.bnt.rest.jpa.repository.MerchantPersistenceHelper;
import com.bnt.rest.service.ImportJsonService;
import com.bnt.rest.wrapper.dto.ExportRequestWrapper;
import com.bnt.service.mapper.ImportEntityMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class ImportGroupServiceImpl implements ImportJsonService {

	private static final Logger logger = LogManager.getLogger(ImportGroupServiceImpl.class);

	@Autowired
	MerchantInstitutionPersistenceHelper ipHelper;

	@Autowired
	MerchantPersistenceHelper merchantJPAHelper;

	@Autowired
	private EntityExportPersistenceHelper entityExportPersistenceRepository;

	@Value("${entity-export.file.dir}")
	private String entityExportPath;

	@PersistenceContext
	EntityManager entityManager;
	EntityType<?> entityType;

	@Autowired
	GenericRepository<BaseEntity, Serializable> genericRepo;

	@Override
	public String validateAndImportJson(ExportRequestWrapper requestWrapper, String authToken) {

		// Get exported Json of latest version for group type

		if (CollectionUtil.isCollectionEmptyOrNull(requestWrapper.getEntities())) {
			throw new RippsAdminException("No entity has chosen to import");
		}
		Long version = getMaxVersion(requestWrapper.getGroupType());
		EntityExport entityExport = entityExportPersistenceRepository
				.findByGroupTypeAndVersion(requestWrapper.getGroupType(), version);

		if (entityExport == null) {
			throw new RippsAdminException(
					"No record exist to import for the group type" + requestWrapper.getGroupType());
		}
		JsonObjectUtil.validateJsonObject(entityExport.getData());

		return importJson(entityExport.getData(), requestWrapper.getEntities());

	}

	private Long getMaxVersion(String groupType) {

		Long max = 0l;
		try {
			max = entityExportPersistenceRepository.findMax(groupType);

		} catch (NullPointerException e) {
			logger.info("max value set as 0");

		}

		if (max == null) {
			max = 0l;
		}
		return max;
	}

	private String importJson(String inputJson, List<String> entityList) {
		Integer result = -1;
		StringBuilder message = new StringBuilder("Import operation invoked for : ");
		for (int i = 0; i < entityList.size(); i++) {
			Class<?> entityClass = JPAUtils.getClassTypeBySimpleName(entityManager, entityList.get(i));
			if (entityClass != null) {
				logger.debug("Import operation initiated for{}", entityClass.getName());
				result = importEntityData(inputJson, entityList, entityClass);
				if (result > 0) {
					message = message.append(entityClass.getSimpleName()).append(",");
				}
			}
		}
		return message.toString();
	}

	private int importEntityData(String inputJson, List<String> entityList, Class<?> entityClass) {

		logger.info("inside importEntityData() entityList {}", entityList);
		List<?> entityDataList;
		if (entityClass != null) {

			entityDataList = ImportEntityMapper.getEntityObjectListFromJson(inputJson, entityClass);

			if (CollectionUtil.isCollectionEmptyOrNull(entityDataList)) {
				logger.error(("Selected Entity is not exist in  the JSON {}" + entityClass.getName()));
			} else {
				saveList(entityDataList);
				return 1;
			}
		}
		return 0;
	}

	@SuppressWarnings("unchecked")
	@Transactional
	public void saveList(List<?> entityDataList) {
		Iterable<? extends BaseEntity> iterable;
		iterable = (Iterable<? extends BaseEntity>) entityDataList;

		genericRepo.saveAll(iterable);
	}
}
