package com.bnt.rest.service.impl;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import jakarta.persistence.EntityManager;
import jakarta.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.bnt.common.RippsAdminException;
import com.bnt.common.util.JPACriteriaUtils;
import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.JsonObjectUtil;
import com.bnt.common.util.StringUtil;
import com.bnt.constant.Constants;
import com.bnt.rest.dto.BaseDto;
import com.bnt.rest.dto.DataFilesDto;
import com.bnt.rest.dto.ExportImportSnapshotDto;
import com.bnt.rest.dto.ExportSnapshotDetailDto;
import com.bnt.rest.dto.RoutingDto;
import com.bnt.rest.entity.BaseEntity;
import com.bnt.rest.entity.DeviceType;
import com.bnt.rest.entity.Institution;
import com.bnt.rest.service.AdapterService;
import com.bnt.rest.service.DataFilesService;
import com.bnt.rest.service.ExportDelegatorService;
import com.bnt.rest.service.NewWorkflowService;
import com.bnt.rest.service.RoutingService;
import com.bnt.rest.wrapper.dto.IdAndVersionWrapper;
import com.bnt.rest.wrapper.dto.adapter.AdapterExportSnapshotWrapper;
import com.bnt.rest.wrapper.dto.adapter.AdapterUiResponseWrapper;
import com.bnt.service.mapper.AdapterWrapperDtoMapper;
import com.bnt.service.mapper.ExportImportMapper;
import com.bnt.service.mapper.ExportSnapshotMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class ExportDelegatorServiceImpl implements ExportDelegatorService {

	private static final String VERSION_ATTRIBUTE_NAME = "versionAttributeName";

	private static final String CHILD_ENTITY_ATTRIBUTE = "childEntityAttribute";

	private static final Logger logger = LogManager.getLogger(ExportDelegatorServiceImpl.class);

	public static final List<Class<?>> genericHandlerEntityList = List.of(DeviceType.class, Institution.class);

	@Autowired
	private EntityManager entityManager;

	@Autowired
	private AdapterService adapterService;

	@Autowired
	private RoutingService routingService;

	@Autowired
	private NewWorkflowService newWorkflowService;

	@Autowired
	private DataFilesService dataFilesService;

	@Override
	public ExportImportSnapshotDto setJsonData(ExportImportSnapshotDto snapshotDto) {

		List<ExportSnapshotDetailDto> snapsotDetailsDtoList = snapshotDto.getSnapshotExportedDetail();

		JSONObject data = new JSONObject();
		for (ExportSnapshotDetailDto snapshotDetailDto : snapsotDetailsDtoList) {
			if (snapshotDetailDto.getEntityId() == null) {
				snapshotDetailDto.setEntityId(snapshotDetailDto.getParentEntityId());
			}
			snapshotDetailDto.setExportSnapshot(snapshotDto);
			setJsonDataInSnapshot(snapshotDetailDto, data);

		}

		if (Boolean.TRUE.equals(JsonObjectUtil.isNullOrEmpty(data))) {
			logger.error("Error in retrieving data for snapshot");
			throw new RippsAdminException("Snapshot cannnot be exported");
		}

		snapshotDto.setData(data.toString());
		return snapshotDto;

	}

	/*
	 * @SuppressWarnings("unused") private void setJsonData(ExportSnapshotDetailDto
	 * snapshotDetailDto, JSONObject map) { try { Class<? extends BaseEntity>
	 * entityClass=getEntityClassByName(snapshotDetailDto.getEntityType());
	 * 
	 * Class<? extends BaseDto> dtoClassType
	 * =getDtoClassByName(snapshotDetailDto.getEntityType());
	 * 
	 * GenericDAOJPA<?, ?> entityDao = GenericDAOJPA.getInstance(entityManager,
	 * entityClass); JSONArray jsonArray = null; Object dto; dto =
	 * entityDao.getRecordById(snapshotDetailDto.getEntityId(), entityClass,
	 * dtoClassType);
	 * 
	 * if (dto != null) {
	 * 
	 * extracted(snapshotDetailDto, map, dto);
	 * 
	 * }
	 * 
	 * } catch (Exception e) { logger.error("exception in setJsonData method() {}",
	 * e.getMessage());
	 * 
	 * } }
	 */

	/*
	 * private void extracted(ExportSnapshotDetailDto snapshotDetailDto, JSONObject
	 * map, Object dto) { try {
	 * 
	 * JSONObject object = JsonObjectUtil.getJsonObjectFromObject(dto);
	 * 
	 * processDataMap(snapshotDetailDto, map, object);
	 * 
	 * } catch (Exception e) {
	 * logger.error("Exception occured in getting JSON string from object for :{}",
	 * e.getMessage()); } }
	 */

	private void setJsonDataInSnapshot(ExportSnapshotDetailDto snapshotDetailDto, JSONObject map) {
		logger.info("inside setJsonDataInSnapshot() for entityType {}", snapshotDetailDto.getEntityType());
		Object dto = null;
		try {

			String isCustomExport = ExportImportMapper
					.getPropertyByEntityTypeChildPropertName(snapshotDetailDto.getEntityType(), "isCustomExport");
			if ("true".equalsIgnoreCase(isCustomExport)) {
				dto = customExportByExportSnapshotDetail(snapshotDetailDto);
			} else {
				dto = genericExportByExportSnapshotDetail(snapshotDetailDto);

				processAfterGenericExport(dto);
			}
		} catch (Exception e) {
			logger.error("exception in setJsonData method()", e);

		}
		if (dto != null) {
			try {
				JSONObject object = JsonObjectUtil.getJsonObjectFromObject(dto);
				processDataMap(snapshotDetailDto, map, object);

			} catch (Exception e) {
				logger.error("Exception occured in getting JSON string from object for {} ,Entity Id {}: {}",
						snapshotDetailDto.getEntityName(), snapshotDetailDto.getEntityId(), e.getMessage());
			}
		}
	}

	private void processAfterGenericExport(Object dto) {
		if (dto instanceof RoutingDto routingDto) {
			routingService.getRoutingVersionDtoForExport(routingDto.getRoutingVersion());

		}
	}

	private void processDataMap(ExportSnapshotDetailDto snapshotDetailDto, JSONObject map, JSONObject object) {
		JSONArray jsonArray;
		if (object != null) {

			if (!(map.has(snapshotDetailDto.getEntityType()))) {
				jsonArray = new JSONArray();

			} else {

				jsonArray = map.getJSONArray(snapshotDetailDto.getEntityType());

			}

			jsonArray.put(object);
			map.put(snapshotDetailDto.getEntityType(), jsonArray);

		}
	}

	private Class<? extends BaseEntity> getEntityClassByName(String enityName) {
		logger.info("inside getEntityClassByName() with enityName {}:", enityName);
		Class<? extends BaseEntity> entityclass = null;
		if (StringUtil.isNotNullOrBlank(enityName)) {
			entityclass = ExportImportMapper.getEntityClassByName(entityManager, enityName);
		}
		return entityclass;
	}

	private Class<? extends BaseDto> getDtoClassByName(String dtoType) {
		logger.info("inside getDtoClassByName() with dtoType {}:", dtoType);
		Class<? extends BaseDto> dtoClass = null;
		if (StringUtil.isNotNullOrBlank(dtoType)) {
			dtoClass = ExportImportMapper.getDtoClassByName(dtoType, false);
		}
		return dtoClass;
	}

	public Object genericExportByExportSnapshotDetail(ExportSnapshotDetailDto snapshotDetailDto) {
		Object dto = null;
		try {
			Class<? extends BaseEntity> entityClass = getEntityClassByName(snapshotDetailDto.getEntityType());
			Class<? extends BaseDto> dtoClassType = getDtoClassByName(snapshotDetailDto.getEntityType());
			Object entity = null;
			String childEntityName = ExportImportMapper
					.getPropertyByEntityTypeChildPropertName(snapshotDetailDto.getEntityType(), "childEntityName");
			String childEntityAttribute = ExportImportMapper
					.getPropertyByEntityTypeChildPropertName(snapshotDetailDto.getEntityType(), CHILD_ENTITY_ATTRIBUTE);
			String versionAttributeName = ExportImportMapper
					.getPropertyByEntityTypeChildPropertName(snapshotDetailDto.getEntityType(), VERSION_ATTRIBUTE_NAME);

			if (ExportImportMapper.isJoinAndVersion(childEntityName, versionAttributeName)) {
				entity = JPACriteriaUtils.getSpecificChild(entityManager, entityClass, childEntityAttribute,
						snapshotDetailDto.getParentEntityId(), snapshotDetailDto.getEntityId());
			}

			else if (ExportImportMapper.isNeitherJoinNorVersion(childEntityName, versionAttributeName)) {

				entity = JPACriteriaUtils.getNonJoinNonVersionObject(entityManager, entityClass,
						snapshotDetailDto.getEntityId());
			} else if (ExportImportMapper.isNotJoinButVersion(childEntityName, versionAttributeName)
					&& !("workflow".equalsIgnoreCase(snapshotDetailDto.getEntityType()))) {
				entity = JPACriteriaUtils.getNonJoinNonVersionObject(entityManager, entityClass,
						snapshotDetailDto.getEntityId());
			} else {

				/*
				 * Exceptional condition such as Workflow Use case
				 * 
				 */
				entity = JPACriteriaUtils.getSpecificChild(entityManager, entityClass, snapshotDetailDto.getEntityId());
			}

			dto = com.bnt.main.ObjectMapper.mapToDto(entity, dtoClassType);
		} catch (Exception e1) {
			logger.error("Exception occured in getting entity by id :{},Entity Id {}: and error {}",
					snapshotDetailDto.getEntityType(), snapshotDetailDto.getEntityId(), e1);
			return null;
		}
		return dto;
	}

	public Object customExportByExportSnapshotDetail(ExportSnapshotDetailDto snapshotDetailDto) {
		Object dto = null;
		try {
			if ("WorkFlow".equalsIgnoreCase(snapshotDetailDto.getEntityType())) {
				dto = newWorkflowService.getWorkFlowUiById(snapshotDetailDto.getEntityId());
			} else if ("Adapter".equalsIgnoreCase(snapshotDetailDto.getEntityType())) {
				AdapterUiResponseWrapper dtoObject = adapterService
						.findAdapterByConfigurationId(snapshotDetailDto.getEntityId());
				dto = AdapterWrapperDtoMapper
						.exportedUiWrapperToImportableUiWrapper(getAdapterExportSnapshotWrapper(dtoObject));
			}

			else if ("Routing".equalsIgnoreCase(snapshotDetailDto.getEntityType())) {
				dto = routingService.getRoutingVersionUiDtoForImport(snapshotDetailDto.getEntityId());
			}

		} catch (Exception e1) {
			logger.error("Exception occured in getting entity by id :{},Entity Id {}: and error {}",
					snapshotDetailDto.getEntityType(), snapshotDetailDto.getEntityId(), e1);

			return null;
		}
		return dto;
	}

	private AdapterExportSnapshotWrapper getAdapterExportSnapshotWrapper(AdapterUiResponseWrapper dtoObject) {
		AdapterExportSnapshotWrapper dtoWrapper = new AdapterExportSnapshotWrapper();
		dtoWrapper.setBeanconfiguationData(dtoObject.getBeanconfiguationData());
		dtoWrapper.setConfigurationId(dtoObject.getConfigurationId());
		dtoWrapper.setConfigurationVersion(dtoObject.getConfigurationVersion());
		dtoWrapper.setImfId(dtoObject.getImfId());
		dtoWrapper.setImfStructure(dtoObject.getImfId());
		dtoWrapper.setMasterData(dtoObject.getMasterData());
		dtoWrapper.setNetworkData(dtoObject.getNetworkData());
		dtoWrapper.setResponseCodeData(dtoObject.getResponseCodeData());
		dtoWrapper.setSchemaData(dtoObject.getSchemaData());
		dtoWrapper.setTransformData(dtoObject.getTransformData());
		return dtoWrapper;
	}

	@Override
	public Map<String, Object> downloadFile(ExportImportSnapshotDto dto, HttpServletRequest request) {
		logger.info("inside downloadFile() with id: {}", dto.getId());
		Map<String, Object> map = new HashMap<>();
		String filename = dto.getName();
		filename = filename.replace(" ", "");
		logger.info("filename->{}", filename);
		byte[] data = null;
		List<Integer> dataFilesIds = ExportSnapshotMapper.getAdapterList(dto.getData(), request);

		if (dataFilesIds != null && !dataFilesIds.isEmpty()) {
			filename = filename + ".zip";
			DataFilesDto dataFilesDtoMain = new DataFilesDto();
			dataFilesDtoMain.setFileContent(dto.getData().getBytes());
			dataFilesDtoMain.setId(0);
			dataFilesDtoMain.setFileName(dto.getName() + ".json");
			List<DataFilesDto> dataFilesDtoList = dataFilesService.getDataFilesList(dataFilesIds);
			try {
				dataFilesDtoList.add(dataFilesDtoMain);
				data = ExportSnapshotMapper.getZipFile(filename, dataFilesDtoList);
			} catch (IOException e) {
				logger.error(e);
			}
		} else {
			filename = filename + ".json";
			data = dto.getData().getBytes();
		}
		logger.info("filename-> {}", filename);

		Resource resource = new ByteArrayResource(data);
		map.put(Constants.RESOURCE, resource);
		map.put(Constants.FILE_NAME, filename);
		return map;
	}

	@SuppressWarnings("unchecked")
	@Override
	public Page<Object> getRecordToExport(String[] valuesEntity, Pageable pageable) {
		try {
			return (Page<Object>) JPAUtils.getPageFromNativeQuery(entityManager, pageable,
					ExportSnapshotMapper.getQueryForAllExportEntity(valuesEntity, entityManager), null, null);
		} catch (Exception e) {
			logger.error(e);
		}
		return null;
	}

	@Override
	public ExportSnapshotDetailDto getEntityExpotableData(Object[] newData) {
		ExportSnapshotDetailDto exportSnapshotDetailDto = new ExportSnapshotDetailDto();
		if (newData[2] instanceof Short obj) {
			exportSnapshotDetailDto.setEntityId(obj.intValue());
		} else {
			exportSnapshotDetailDto.setEntityId((Integer) newData[2]);
		}
		exportSnapshotDetailDto.setEntityName((String) newData[0]);
		exportSnapshotDetailDto.setEntityType((String) newData[1]);
		exportSnapshotDetailDto.setParentEntityId(exportSnapshotDetailDto.getEntityId());
		if (StringUtil
				.isNotNullOrBlank(ExportImportMapper.getPropertyByEntityTypeChildPropertName(
						exportSnapshotDetailDto.getEntityType(), CHILD_ENTITY_ATTRIBUTE))
				|| StringUtil.isNotNullOrBlank(ExportImportMapper.getPropertyByEntityTypeChildPropertName(
						exportSnapshotDetailDto.getEntityType(), VERSION_ATTRIBUTE_NAME))) {
			getRecordToExportByEntityName(exportSnapshotDetailDto);
		}

		return exportSnapshotDetailDto;
	}

	@SuppressWarnings("unchecked")
	public void getRecordToExportByEntityName(ExportSnapshotDetailDto exportSnapshotDetailDto) {
		Page<Object> pagedata = null;
		Map<String, Object> parameters = new HashMap<>();
		parameters.put("name", exportSnapshotDetailDto.getEntityName());

		Pageable pageable = JPAUtils.getPageableObject(new HashMap<>());

		try {
			pagedata = (Page<Object>) JPAUtils.getPageFromQuery(entityManager, pageable,
					ExportSnapshotMapper.getQueryForExportableEntity(exportSnapshotDetailDto.getEntityType()), null,
					parameters);
		} catch (Exception e) {
			logger.error(e);
		}
		if (pagedata != null && !pagedata.isEmpty()) {
			pagedata.getContent().forEach(each -> {
				Object[] data = (Object[]) each;
				IdAndVersionWrapper idAndVersionWrapper = new IdAndVersionWrapper();
				if (data[0] instanceof Short obj) {
					idAndVersionWrapper.setId(obj.intValue());
				} else {
					idAndVersionWrapper.setId((Integer) data[0]);
				}
				if (data[1] instanceof Short obj) {
					idAndVersionWrapper.setVersion(obj.intValue());
				} else {
					idAndVersionWrapper.setVersion((Integer) data[1]);
				}
				exportSnapshotDetailDto.getIdVersionListToExport().add(idAndVersionWrapper);
			});
		}

	}
}
