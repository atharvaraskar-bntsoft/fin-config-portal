package com.bnt.rest.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.metamodel.EntityType;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.google.gson.JsonObject;
import com.querydsl.core.types.Predicate;
import com.bnt.common.ResponseWrapper;
import com.bnt.common.util.CollectionUtil;
import com.bnt.common.util.GsonUtil;
import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.StringUtil;
import com.bnt.constant.Constants;
import com.bnt.constant.ParameterConstant;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.EntityExportDto;
import com.bnt.rest.dto.EntityRecordDto;
import com.bnt.rest.entity.AuthSession;
import com.bnt.rest.entity.BaseEntity;
import com.bnt.rest.entity.EntityExport;
import com.bnt.rest.entity.EntityRecord;
import com.bnt.rest.jpa.repository.EntityExportPersistenceHelper;
import com.bnt.rest.jpa.repository.EntityRecordPersistenceHelper;
import com.bnt.rest.jpa.repository.GenericDAOJPA;
import com.bnt.rest.service.impl.AuthSessionService;
import com.bnt.rest.service.ExportSchemaServiceRest;
import com.bnt.rest.wrapper.dto.ExportRequestWrapper;
import com.bnt.service.mapper.ExportEntityMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class ExportSchemaServiceRestImpl implements ExportSchemaServiceRest {

	private static final Logger logger = LogManager.getLogger(ExportSchemaServiceRestImpl.class);

	@Autowired
	private EntityRecordPersistenceHelper entityRecordPersistenceHelper;

	/** The auth session repository. */
	@Autowired
	private AuthSessionService authSessionService;

	@Autowired
	private EntityExportPersistenceHelper entityExportPersistenceRepository;

	@Value("${entity-export.file.dir}")
	private String entityExportPath;

	@PersistenceContext
	private EntityManager entityManager;

	EntityType<?> entityType;

	@SuppressWarnings("rawtypes")
	private com.bnt.rest.jpa.repository.GenericDAO entityDao;

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public Map<String, String> exportSchema(ExportRequestWrapper exportRequest, String authToken) {
		logger.info("Export Operation Initiated");
		Map<String, String> statusMap = new HashMap<>();
		if (!(StringUtil.isEmptyOrNull(exportRequest.getGroupType()))) {

			if (CollectionUtil.isCollectionEmptyOrNull(exportRequest.getEntities())) {
				logger.error("Export Operation failed:No entity has chosen to export");
				statusMap.put(Constants.ERROR, "No entity has chosen to export");
				return statusMap;

			}

			String jsonString = getJsonString(exportRequest.getEntities());

			if (StringUtil.isEmptyOrNull(jsonString)) {

				logger.error("Export Operation failed:Could not get json string for requested group");
				statusMap.put(Constants.ERROR, "Could not get json string for requested group");
				return statusMap;

			}

			EntityExport entityRecord = ExportEntityMapper.mapJsonObjectToEntityRecord(exportRequest.getGroupType(),
					exportRequest.getComment(), jsonString);
			try {

				setVersion(entityRecord);

				entityExportPersistenceRepository.save(entityRecord);
				statusMap.put(Constants.SUCCESS, "Export Record has been saved");
			}

			catch (Exception e) {
				statusMap.put(Constants.ERROR, "Error in saving JSON to DB instead it is saved on server path");
				logger.error("Export Operation failed: error in saving json to DB:{}", e.getMessage());
				ExportEntityMapper.saveJsonToFile(jsonString, entityRecord, entityExportPath);

				if (e instanceof DataIntegrityViolationException) {
					throw e;
				}
			}
		}

		logger.info("Export Operation ended");
		return statusMap;
	}

	private void setVersion(EntityExport entityRecord) {

		Long max = 0l;
		try {
			max = entityExportPersistenceRepository.findMax(entityRecord.getGroupType());
			if (max != null) {
				max = max + 1;
			} else {
				max = 0l;
			}
		} catch (NullPointerException e) {
			logger.info("max value set as 0");

		}

		entityRecord.setVersion(max);
	}

	@SuppressWarnings("unchecked")
	private String getJsonString(List<String> entities) {
		JsonObject jsonObject = new JsonObject();
		for (int i = 0; i < entities.size(); i++) {
			String entityName = entities.get(i);
			Class<? extends BaseEntity> entityClass = (Class<? extends BaseEntity>) JPAUtils
					.getClassTypeBySimpleName(entityManager, entityName);

			// Refactor this code with getGenericDao() of GenericDAOJPA
			if (entityClass != null) {
				logger.info(entityClass.getName());

				entityDao = new GenericDAOJPA<>(entityClass);
				entityDao.setEntityManager(entityManager);

			}
			Iterable<Object> recordList = entityDao.findAll();
			GsonUtil.getJsonObjectOfEntity(entities.get(i), jsonObject, recordList);
		}

		return GsonUtil.getResultObject(jsonObject, "data");

	}

	@Override
	public ResponseWrapper findAllRecordsNew(Map<String, Object> requestParamMap) {
		String sortColumn = (String) requestParamMap.get(ParameterConstant.SORT_COLUMN);
		if (null != sortColumn && sortColumn.equalsIgnoreCase("id")) {
			requestParamMap.put(ParameterConstant.SORT_COLUMN, "id");
		}

		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		String[] filters = (String[]) requestParamMap.get(ParameterConstant.FILTERS);
		entityType = JPAUtils.getEntityType(entityManager, EntityRecord.class);
		Predicate predicate = null;
		Page<EntityRecord> interchangePage = null;

		if (filters == null) {
			interchangePage = entityRecordPersistenceHelper.findAll(pageable);
		} else {
			predicate = JPAUtils.getPredicate(entityType, filters);
			interchangePage = entityRecordPersistenceHelper.findAll(predicate, pageable);

		}
		long count = entityRecordPersistenceHelper.count();
		List<EntityRecordDto> listDTO = new ArrayList<>();
		ResponseWrapper pageJPAData = JPAUtils.getResponseWrapperByPage(interchangePage, count);
		for (EntityRecord item : interchangePage) {

			EntityRecordDto dto = ObjectMapper.mapToDto(item, EntityRecordDto.class);
			dto.setData(new String(item.getData()));
			listDTO.add(dto);
		}
		pageJPAData.setContent(listDTO);
		return pageJPAData;
	}

	@Override
	public ResponseWrapper findAllRecords(Map<String, Object> requestParamMap) {
		String sortColumn = (String) requestParamMap.get(ParameterConstant.SORT_COLUMN);
		if (null != sortColumn && sortColumn.equalsIgnoreCase("id")) {
			requestParamMap.put(ParameterConstant.SORT_COLUMN, "id");
		}

		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		String[] filters = (String[]) requestParamMap.get(ParameterConstant.FILTERS);
		entityType = JPAUtils.getEntityType(entityManager, EntityExport.class);
		Predicate predicate = null;
		Page<EntityExport> page = null;

		if (filters == null) {
			page = entityExportPersistenceRepository.findAll(pageable);
		} else {
			predicate = JPAUtils.getPredicate(entityType, filters);
			page = entityExportPersistenceRepository.findAll(predicate, pageable);

		}
		long count = entityExportPersistenceRepository.count();
		List<EntityExportDto> listDTO = new ArrayList<>();
		ResponseWrapper pageJPAData = JPAUtils.getResponseWrapperByPage(page, count);
		for (EntityExport item : page) {

			EntityExportDto dto = ObjectMapper.mapToDto(item, EntityExportDto.class);
			dto.setData(item.getData());
			listDTO.add(dto);
		}
		pageJPAData.setContent(listDTO);
		return pageJPAData;
	}

}