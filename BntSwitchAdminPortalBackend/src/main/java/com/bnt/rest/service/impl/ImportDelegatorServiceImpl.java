package com.bnt.rest.service.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.Lists;
import com.bnt.bswitch.message.packager.Attribute;
import com.bnt.bswitch.message.packager.Fields;
import com.bnt.bswitch.message.packager.BNTPackager;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.CollectionUtil;
import com.bnt.common.util.JPACriteriaUtils;
import com.bnt.common.util.JsonObjectUtil;
import com.bnt.rest.dto.DataFilesDto;
import com.bnt.rest.dto.ImfStructureDto;
import com.bnt.rest.dto.RoutingDto;
import com.bnt.rest.entity.DataFiles;
import com.bnt.rest.entity.ImfStructure;
import com.bnt.rest.service.AdapterService;
import com.bnt.rest.service.DataFilesService;
import com.bnt.rest.service.GenericService;
import com.bnt.rest.service.ImportDelegatorService;
import com.bnt.rest.service.NewWorkflowService;
import com.bnt.rest.service.RoutingService;
import com.bnt.rest.wrapper.dto.adapter.AdapterUiResponseWrapper;
import com.bnt.rest.wrapper.dto.workflow.WorkFlowUiWrapper;
import com.bnt.service.mapper.AdapterWrapperDtoMapper;
import com.bnt.service.mapper.ExportImportMapper;
import com.bnt.service.mapper.ImportSnapshotMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class ImportDelegatorServiceImpl implements ImportDelegatorService {

	private static final String DTO_OBJECT = "_dtoObject";

	private static final String ZIP_MAP = "_zipMap";

	private static final Logger logger = LogManager.getLogger(ImportDelegatorServiceImpl.class);

	@Autowired
	private GenericService genericService;

	@PersistenceContext
	private EntityManager entityManager;

	@Autowired
	private AdapterService adapterService;

	@Autowired
	private RoutingService routingService;

	@Autowired
	private NewWorkflowService newWorkflowService;

	@Autowired
	private DataFilesService dataFilesService;

	private ConcurrentHashMap<String, Object> storeInMap = new ConcurrentHashMap<>();

	@Override
	public Integer genericImportEntityData(JSONArray entityList, String key, HttpServletRequest request,
			Map<String, Object> zipMap) {
		Integer result = -1;
		Class<?> entityClass = ExportImportMapper.getEntityClassByName(entityManager, key);
		if (entityClass != null && !(JsonObjectUtil.isJsonArrayNullOrEmpty(entityList))) {

			List<Object> objectList = ImportSnapshotMapper.getEntityObjectListFromJsonArray(entityList, entityClass,
					entityManager);

			return saveList(objectList, entityClass);
		}
		return result;
	}

	private Integer saveList(List<Object> objectList, Class<?> entityClass) {
		if (CollectionUtil.isCollectionEmptyOrNull(objectList)) {
			logger.error("Selected Entity is not exist in  the JSON {}", entityClass.getSimpleName());
		} else {
			genericService.saveList(objectList);
			logger.debug("Saved entity list using generic operation for {}:", entityClass.getSimpleName());
			return 1;
		}
		return 0;

	}

	@Override
	public Integer customImportEntityData(JSONArray entityList, String key, HttpServletRequest request,
			Map<String, Object> zipMap) {
		Integer result = -1;
		try {
			String dtoData = "";
			if (!(JsonObjectUtil.isJsonArrayNullOrEmpty(entityList).booleanValue())) {
				logger.info("for key:{} \t total record for import{}:", key, entityList.length());
				for (int i = 0; i < entityList.length(); i++) {
					dtoData = entityList.get(i).toString();

					result = customImportEntityData(dtoData, key, request, zipMap);
				}
			}
		} catch (RippsAdminException e) {
			throw new RippsAdminException(e.getMessage());
		}
		return result;
	}

	public Integer customImportEntityData(String dtoJsonString, String key, HttpServletRequest request,
			Map<String, Object> zipMap) {
		Integer savedId = -1;
		boolean delegateObject = false;
		String name = "";
		logger.info("json to persist-->> {}", dtoJsonString);
		try {
			if ("WorkFlow".equalsIgnoreCase(key)) {
				WorkFlowUiWrapper dtoObject = JsonObjectUtil.getObjectFromString(dtoJsonString,
						WorkFlowUiWrapper.class);
				String requestToken = request.getHeader("X-Auth-Token");
				name = dtoObject.getName();
				savedId = newWorkflowService.versionItWorkFlow(dtoObject, requestToken);
				logger.info("name: {} \t savedId  {}:", name, savedId);
			} else if ("Adapter".equalsIgnoreCase(key)) {

				savedId = processAdapter(dtoJsonString, request, zipMap);

				logger.info("name:{}  \t savedId {}", name, savedId);
			}

			else if ("Routing".equalsIgnoreCase(key)) {
				RoutingDto dtoObject = JsonObjectUtil.getObjectFromString(dtoJsonString, RoutingDto.class);

				savedId = routingService.importRouting(dtoObject);
				logger.info("name:{} \t savedId  {}", name, savedId);
			}

		} catch (RippsAdminException e) {
			throw new RippsAdminException(e.getMessage());
		} catch (Exception e1) {
			logger.error("Exception occured for entity: {} and exception {}", key, e1);
			return 0;
		}
		if (savedId > 0) {
			delegateObject = true;
		}
		logger.info("returned delegateObject  {}", delegateObject);
		return savedId;
	}

	/**
	 * processAdapter() 1. If No Delta Fields Available ( in adapter bundle , IMF
	 * have no additional attributes) :
	 * 
	 * ---In this case latest IMF from db reference should be associate with Adapter
	 * and persist adapter.
	 * 
	 * --- Required reference can be verify in adapter-configuration table
	 * associated to adapter version.
	 * 
	 * ---In this case no popup window with blank delta fields shown and simply
	 * adapter persists.
	 * 
	 * ---Adapter snapshot remain as it is and persist into snapshot_import_detail
	 * table.
	 * 
	 * 2. If Delta Fields available ( in adapter bundle , IMF have some additional
	 * attributes) :
	 * 
	 * ---In First step get all delta fields and display on popup window and ask for
	 * confirmation before saving adapter.
	 * 
	 * ---Once received confirmation first save updated target IMF with delta
	 * fields.
	 * 
	 * ---Persist adapter which will have reference to updated target IMF ID from
	 * db.
	 * 
	 * ---Persist adapter snapshot into snapshot_import_detail table.
	 * 
	 * @param source
	 * @param target
	 * @param deltaList
	 * @return
	 */

	public Integer processAdapter(String dtoJsonString, HttpServletRequest request, Map<String, Object> zipMap) {
		logger.info("inside processAdapter ");
		AdapterUiResponseWrapper dtoObject = JsonObjectUtil.getObjectFromString(dtoJsonString,
				AdapterUiResponseWrapper.class);
		ImfStructureDto imfStructureDto;
		ImfStructure imfStructure = JPACriteriaUtils.getLatestEntityByID(entityManager, ImfStructure.class, "ID");
		if (imfStructure != null) {
			imfStructureDto = com.bnt.main.ObjectMapper.mapToDto(imfStructure, ImfStructureDto.class);
		} else {
			logger.error("Invalid IMF, hence Returning back and marking as fail");
			throw new RippsAdminException("Invalid IMF");
		}

		List<String> sourceList = Lists.newArrayList();
		List<String> targetList = Lists.newArrayList();
		List<String> deltaList = null;
		BNTPackager sourceImfBNTPackager = new BNTPackager(null);// source imf
		BNTPackager targetImfBNTPackager = new BNTPackager(null);// target imf
		// get delta field names list
		deltaList = getDeltaFieldNamesList(dtoJsonString, imfStructureDto, sourceImfBNTPackager, targetImfBNTPackager,
				sourceList, targetList);
		// If no delta fields : persist adapter with latest IMF details. In this case
		// IMF will as it is.
		String fileName = (String) request.getAttribute("fileName");
		if (!deltaList.isEmpty()) {
			String responseData = prepareImportResponseData(deltaList, fileName);
			request.setAttribute("responseData", responseData);// set list if delta fields.

			BNTPackager updatedTargetImf = getUpdatedTargetImfWithDeltaFields(sourceImfBNTPackager,
					targetImfBNTPackager, deltaList);
			JSONArray updatedTargetIMFjson = getIMFJson(updatedTargetImf, imfStructureDto);

			dtoObject.setImfId(imfStructureDto);
			storeInMap.put(fileName + "_imf", updatedTargetIMFjson);
			storeInMap.put(fileName + DTO_OBJECT, dtoObject);
			storeInMap.put(fileName + ZIP_MAP, zipMap);

		} else {
			return persistAdapter(request, zipMap, dtoObject, imfStructureDto);
		}

		return 1;
	}

	private String prepareImportResponseData(List<String> deltaList, String fileName) {
		String responseData = null;
		ImportResponseWrapper wrapper = new ImportResponseWrapper();
		wrapper.setFileName(fileName);
		wrapper.setDeltaList(deltaList);
		ObjectMapper mapper = new ObjectMapper();
		try {
			responseData = mapper.writeValueAsString(wrapper);
		} catch (Exception e) {
			logger.error(e);
		}
		return responseData;
	}

	private JSONArray getIMFJson(BNTPackager updatedTargetImf, ImfStructureDto imfStructureDto) {
		String str1 = null;
		try {
			str1 = new ObjectMapper().writeValueAsString(Lists.newArrayList(updatedTargetImf));

		} catch (IOException e) {
			logger.error(e);
		}

		JSONArray array1 = new JSONArray(str1);
		JSONArray array2 = new JSONArray();

		JSONObject jo = new JSONObject();
		jo.put("imf", array1.get(0).toString());
		jo.put("name", "IMF Structure " + (1 + imfStructureDto.getVersion()));
		jo.put("version", 1 + imfStructureDto.getVersion());
		array2.put(0, jo);

		imfStructureDto.setImf(null);
		imfStructureDto.setImf(str1);
		imfStructureDto.setName(jo.getString("name"));
		imfStructureDto.setVersion(jo.getInt("version"));

		return array2;

	}

	private Attribute getAttribute(String attributeName, BNTPackager source) {
		Attribute attribute = null;
		if (attributeName.contains(".")) {
			attribute = source.findAttribute(attributeName.substring(0, attributeName.indexOf(".")));
		}
		if (attribute instanceof Fields) {
			Fields fields = (Fields) attribute;
			if (fields.getType().toString().equals("LIST"))
				attributeName = attributeName.replaceFirst("\\.", ".#.");
		}

		return source.findAttribute(attributeName);

	}

	private String modifyDeltaField(String delta, BNTPackager source) {

		StringBuilder deltaField = new StringBuilder();
		List<String> ls = Lists.newArrayList(delta.split("\\."));
		int count = 0;
		for (String field : ls) {
			count++;
			deltaField.append(field);
			Attribute attribute = source.findAttribute(deltaField.toString());
			if (source.findAttribute(field) != null && attribute instanceof Fields) {
				Fields fields = (Fields) attribute;
				if (fields.getType().toString().equals("LIST"))
					deltaField.append(".#.");
			} else {
				if (count != ls.size())
					deltaField.append(".");
			}
		}
		return deltaField.toString();
	}

	private BNTPackager getUpdatedTargetImfWithDeltaFields(BNTPackager source, BNTPackager target,
			List<String> deltaList) {
		try {

			for (String deltafield : deltaList) {

				Attribute attribute1 = source.findAttribute(deltafield);
				if (deltafield.contains(".")) {
					if (attribute1 == null) {
						attribute1Null(source, target, deltafield);
					} else {
						attribute1NotNull(target, deltafield, attribute1);
					}

				} else {
					if (target.findAttribute(deltafield) == null)
						target.getAttributes().add(source.findAttribute(deltafield));
				}
			}

		} catch (Exception e) {
			logger.error(e);
		}
		return target;
	}

	/**
	 * @param target
	 * @param deltafield
	 * @param attribute1
	 */
	private void attribute1NotNull(BNTPackager target, String deltafield, Attribute attribute1) {
		// usecase for delta fields like :
		// amounts.amount_transaction.currency_iso,amounts.amount_debit where attribute1
		// is not null
		Fields fields1 = (Fields) target.findAttribute(deltafield.substring(0, deltafield.indexOf(".")));// root
																											// attribute
		Fields fields2 = (Fields) target.findAttribute(deltafield.substring(0, deltafield.lastIndexOf(".")));
		if (attribute1 != null && fields2 != null) {
			if (fields1.getName().equals(fields2.getName()) && target.findAttribute(deltafield) == null) { // sometime
																											// first
																											// index and
																											// last
																											// index
																											// would be
																											// same so
																											// in this
																											// case
																											// fields1
																											// and
																											// fields2
																											// would be
																											// same e.g
																											// :
																											// amounts.amount_debit,
																											// original_data_element.transmission_date_time
				fields1.getAttributes().add(attribute1);
			} else {
				if (target.findAttribute(deltafield) == null) {
					fields1.getAttributes().remove(fields1.getAttributes().indexOf(fields2));
					fields2.getAttributes().add(attribute1);
					fields1.getAttributes().add(fields2);
				}
			}

		}
		Attribute attribute = fields1;
		target.getAttributes().remove(target.getAttributes().indexOf(attribute));
		target.getAttributes().add(attribute);
	}

	/**
	 * @param source
	 * @param target
	 * @param deltafield
	 */
	private void attribute1Null(BNTPackager source, BNTPackager target, String deltafield) {
		// if Field is of type LIST then needto modify delta fields which includes # in
		// delta fields like for this : card_details.details.secondary_echo_data"
		String modifyDeltaField = modifyDeltaField(deltafield, source); // modified delta field of type LIST:
																		// card_details.#.details.secondary_echo_data
		if (target.findAttribute(modifyDeltaField) == null) {
			Attribute attribute2 = getAttribute(deltafield, source);

			Fields fields1 = (Fields) target.findAttribute(deltafield.substring(0, deltafield.indexOf(".")));// root
																												// attribute
			Fields fields2 = (Fields) target
					.findAttribute(modifyDeltaField.substring(0, modifyDeltaField.lastIndexOf(".")));// attribute before
																										// last index,
																										// which is list
																										// of actual
																										// list
			if (attribute2 != null && fields2 != null) {
				fields1.getAttributes().remove(fields1.getAttributes().indexOf(fields2));
				fields2.getAttributes().add(attribute2);
				fields1.getAttributes().add(fields2);
			}
			Attribute attribute = fields1;
			target.getAttributes().remove(target.getAttributes().indexOf(attribute));
			target.getAttributes().add(attribute);
		}
	}

	private List<String> getDeltaFieldNamesList(String dtoJsonString, ImfStructureDto imfStructureDto,
			BNTPackager sourceImfBNTPackager, BNTPackager targetImfBNTPackager, List<String> sourceList,
			List<String> targetList) {
		JSONObject importJson = new JSONObject(dtoJsonString);
		JSONObject imfStuctureJson = (JSONObject) importJson.get("imfStructure");
		BNTPackager sourceImfBNTPackager1 = null;// source imf
		BNTPackager targetImfBNTPackager1 = null;// target imf
		try {
			sourceImfBNTPackager1 = new ObjectMapper().readValue(imfStuctureJson.get("imf").toString(),
					BNTPackager.class);
			targetImfBNTPackager1 = new ObjectMapper().readValue(imfStructureDto.getImf(), BNTPackager.class);
			sourceImfBNTPackager.setAttributes(sourceImfBNTPackager1.getAttributes());
			targetImfBNTPackager.setAttributes(targetImfBNTPackager1.getAttributes());
			sourceImfBNTPackager.getAttributes().forEach(action -> {
				sourceList.addAll(action.getFieldNames());
			});
			targetImfBNTPackager.getAttributes().forEach(action -> {
				targetList.addAll(action.getFieldNames());
			});
		} catch (JsonProcessingException e) {
			logger.error(e);
		}
		// get delta fields list
		return prepareDeltaFieldList(sourceList, targetList);// delta fields form source
	}

	/**
	 * prepareDeltaFieldList() returns list of delta fields which are missing in
	 * target and available in source IMF.
	 * 
	 * @param dtoJsonString
	 * @param zipMap
	 * @param request
	 * @return
	 */
	private List<String> prepareDeltaFieldList(List<String> sourceList, List<String> targetList) {
		List<String> deltaList = new ArrayList<>();
		sourceList.forEach(action -> {
			if (!targetList.contains(action) && !deltaList.contains(action.trim())) {
				deltaList.add(action.trim());
			}
		});
		return deltaList;
	}

	@SuppressWarnings("unchecked")
	public void insertDataFiles(Map<String, Object> zipMap) {
		logger.info("inside insertDataFiles ");
		List<DataFilesDto> listDataFiles = (List<DataFilesDto>) zipMap.get(ImportSnapshotMapper.DATA_FILE_LIST);
		Map<String, DataFiles> mapInsertedDataFile = (Map<String, DataFiles>) zipMap
				.get(ImportSnapshotMapper.MAP_INSERTED_DATA_FILE);
		if (mapInsertedDataFile == null) {
			mapInsertedDataFile = new HashMap<>();
		}
		String prevName = "";
		DataFiles dataFiles = null;
		if (listDataFiles != null && !listDataFiles.isEmpty()) {
			for (DataFilesDto dataFilesDto : listDataFiles) {
				prevName = dataFilesDto.getId() + "_" + dataFilesDto.getFileName();
				dataFiles = mapInsertedDataFile.get(prevName);
				if (dataFiles == null) {
					dataFilesDto.setId(null);
					dataFilesDto.setFileMimeType(ImportSnapshotMapper.DATA_FILE_MIME_TYPE);
					dataFiles = dataFilesService.insertDataFile(dataFilesDto);
					if (dataFiles != null) {
						dataFiles = mapInsertedDataFile.put(prevName, dataFiles);
					}
				}
			}
		}

		logger.info("inside insertDataFiles  and datafiles{} ", dataFiles);
		zipMap.put(ImportSnapshotMapper.MAP_INSERTED_DATA_FILE, mapInsertedDataFile);
	}

	@SuppressWarnings("unchecked")
	@Override
	public Integer customImportEntityDataConfirmation(JSONObject confirmationValue, HttpServletRequest request) {
		if (confirmationValue.get("confirmation").toString().equalsIgnoreCase("Y")) {

			String fileName = confirmationValue.get("name").toString();
			Map<String, Object> zipMap = (Map<String, Object>) storeInMap.get(fileName + ZIP_MAP);
			AdapterUiResponseWrapper dtoObject = (AdapterUiResponseWrapper) storeInMap.get(fileName + DTO_OBJECT);
			JSONArray array2 = (JSONArray) storeInMap.get(fileName + "_imf");

			// persist IMF new version
			genericImportEntityData(array2, "ImfStructure", request, zipMap);

			storeInMap.remove(fileName + ZIP_MAP);
			storeInMap.remove(fileName + DTO_OBJECT);
			storeInMap.remove(fileName + "_imf");

			// get IMF based on name
			ImfStructureDto imfStructureDto = dtoObject.getImfId();
			ImfStructure imfStructure = JPACriteriaUtils.getEntityByName(entityManager, ImfStructure.class,
					imfStructureDto.getName(), "name");// should be based on max id
			if (imfStructure != null) {
				imfStructureDto = com.bnt.main.ObjectMapper.mapToDto(imfStructure, ImfStructureDto.class);
			}

			else {
				logger.error("Invalid IMF, Hence Returing back and marking as fail");
				throw new RippsAdminException("Invalid IMF");
			}
			// persist updated adapter
			return persistAdapter(request, zipMap, dtoObject, imfStructureDto);

		} else {
			return -1;
		}
	}

	private Integer persistAdapter(HttpServletRequest request, Map<String, Object> zipMap,
			AdapterUiResponseWrapper dtoObject, ImfStructureDto imfStructureDto) {
		dtoObject.setImfId(imfStructureDto);
		insertDataFiles(zipMap);
		ImportSnapshotMapper.updateAdapterData(dtoObject, zipMap);
		String name = dtoObject.getMasterData().getAdapterDto().getName();
		String requestToken = request.getHeader("X-Auth-Token");
		dtoObject = AdapterWrapperDtoMapper.exportedUiWrapperToImportableUiWrapper(dtoObject);
		Integer savedId = adapterService.versionItAdapter(dtoObject, requestToken);
		logger.info("name:{} \t savedId {}", name, savedId);
		return savedId;
	}

}

class ImportResponseWrapper {
	String fileName;
	List<String> deltaList;

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public List<String> getDeltaList() {
		return deltaList;
	}

	public void setDeltaList(List<String> deltaList) {
		this.deltaList = deltaList;
	}
}
