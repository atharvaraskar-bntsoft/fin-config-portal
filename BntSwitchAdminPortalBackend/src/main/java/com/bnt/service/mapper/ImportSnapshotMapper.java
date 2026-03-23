package com.bnt.service.mapper;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import jakarta.persistence.EntityManager;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.json.JSONArray;

import com.bnt.common.RippsAdminException;
import com.bnt.common.util.JPACriteriaUtils;
import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.JsonObjectUtil;
import com.bnt.common.util.StringUtil;
import com.bnt.rest.dto.DataFilesDto;
import com.bnt.rest.entity.DataFiles;
import com.bnt.rest.wrapper.dto.adapter.AdapterUiResponseWrapper;
import com.bnt.rest.wrapper.dto.adapter.NetworkPropertiesResponseWrapper.PropertiesWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ImportSnapshotMapper {

	private static final Logger logger = LogManager.getLogger(ImportSnapshotMapper.class);

	public static final String JSON_FILE = "jsonfile";
	public static final String DATA_FILE_LIST = "datafilelist";
	public static final String MAP_INSERTED_DATA_FILE = "mapinserteddatafile";

	public static final String DATA_FILE_MIME_TYPE = "application/octet-stream";

	@SuppressWarnings("unused")
	public static <T> List<T> getEntityObjectListFromJsonArray(JSONArray entityListArray, Class<?> entityClass,
			EntityManager em) {

		// Traverse over JSON to get the all data for specific entity
		List<T> entityList = new ArrayList<>();
		try {
			String dtoData = "";
			T t = null;
			if (Boolean.TRUE.equals(JsonObjectUtil.isJsonArrayNotNullAndNotEmpty(entityListArray))) {
				for (int i = 0; i < entityListArray.length(); i++) {
					getEntityObjectListFromJsonArray1(entityListArray, entityClass, em, entityList, i);
				}
			}
		} catch (Exception e) {
			logger.error("Import Failed :  Error in converting Json for entity with name  {}",
					entityClass.getSimpleName());
			if (e instanceof RippsAdminException) {
				throw new RippsAdminException(e.getMessage());
			}
		}
		return entityList;
	}

	@SuppressWarnings("unchecked")
	private static <T> void getEntityObjectListFromJsonArray1(JSONArray entityListArray, Class<?> entityClass,
			EntityManager em, List<T> entityList, int i) {
		String dtoData;
		T t;
		dtoData = entityListArray.get(i).toString();
		dtoData = ImportCleaningMapper.cleanAttributes(dtoData, entityClass.getSimpleName());
		String nameKey = ExportImportMapper.getPropertyByEntityTypeChildPropertName(entityClass.getSimpleName(),
				"nameAttribute");
		if (nameKey == null) {
			nameKey = "name";
		}
		String name = JsonObjectUtil.getStringValueWithNullValueCheck(entityListArray.getJSONObject(i), nameKey);
		boolean namevalidate = JPACriteriaUtils.validateName(em, entityClass, name, "name");
		if (!namevalidate) {
			logger.info("name already exist");
			throw new RippsAdminException(entityClass.getSimpleName() + " with name :" + name + " already exist");
		}
		if (StringUtil.isNotNullOrBlank(dtoData)) {
			t = (T) getEntityObject(entityClass, dtoData, i);
			if (t != null) {
				entityList.add(t);
			}
		}
	}

	private static <T> T getEntityObject(Class<T> entityClass, String dtoData, int i) {
		T entity = null;
		try {
			entity = JPAUtils.getEntityFromJsonString(dtoData, entityClass);
		} catch (Exception e) {
			logger.error("Error in reading Json at index:{}:for entity with name {}:{}", i, entityClass.getSimpleName(),
					e.getMessage());
		}
		return entity;
	}

	public static Map<String, Object> unzip(InputStream inputStream) throws IOException {
		List<DataFilesDto> listDataFiles = new ArrayList<>();
		ZipInputStream zipIn = new ZipInputStream(inputStream);
		ZipEntry entry = zipIn.getNextEntry();
		Map<String, Object> map = new HashMap<>();
		String jsonFile = null;
		while (entry != null) {
			DataFilesDto dataFilesDto = extractFile(zipIn, entry);
			if (dataFilesDto.getId() == 0) {
				if (dataFilesDto.getFileContent() != null && dataFilesDto.getFileContent().length > 0) {
					jsonFile = new String(dataFilesDto.getFileContent(), StandardCharsets.UTF_8);
				}
			} else {
				listDataFiles.add(dataFilesDto);
			}
			zipIn.closeEntry();
			entry = zipIn.getNextEntry();
		}
		zipIn.close();
		map.put(JSON_FILE, jsonFile);
		map.put(DATA_FILE_LIST, listDataFiles);
		return map;
	}

	private static DataFilesDto extractFile(ZipInputStream zipIn, ZipEntry entry) throws IOException {
		DataFilesDto dataFilesDto = new DataFilesDto();
		dataFilesDto.setFileContent(zipIn.readAllBytes());
		processName(entry.getName(), dataFilesDto);
		return dataFilesDto;
	}

	private static void processName(String name, DataFilesDto dataFilesDto) {
		if (name != null && name.contains("_")) {
			int firstOccurencePlace = name.indexOf("_");
			if (firstOccurencePlace > 0 && firstOccurencePlace < name.length()) {
				String idStr = name.substring(0, firstOccurencePlace);
				String newName = name.substring(firstOccurencePlace + 1, name.length());
				dataFilesDto.setFileName(newName);
				dataFilesDto.setId(Integer.parseInt(idStr));
			}
		} else {
			logger.error("not a valid name");
		}
	}

	public static void updateAdapterData(AdapterUiResponseWrapper adapterUiResponseWrapper,
			Map<String, Object> zipMap) {
		logger.info("inside updateAdapterData");
		List<PropertiesWrapper> listPropertiesUpdated = null;
		if (adapterUiResponseWrapper.getNetworkData() != null
				&& adapterUiResponseWrapper.getNetworkData().getProperties() != null) {
			if (adapterUiResponseWrapper.getNetworkData().getProperties().getMessage() != null) {
				listPropertiesUpdated = updateAdapterwithDataFilesIdsList(
						adapterUiResponseWrapper.getNetworkData().getProperties().getMessage(), zipMap);
				adapterUiResponseWrapper.getNetworkData().getProperties().setMessage(listPropertiesUpdated);
			}
			if (adapterUiResponseWrapper.getNetworkData().getProperties().getNetwork() != null) {
				listPropertiesUpdated = updateAdapterwithDataFilesIdsList(
						adapterUiResponseWrapper.getNetworkData().getProperties().getNetwork(), zipMap);
				adapterUiResponseWrapper.getNetworkData().getProperties().setNetwork(listPropertiesUpdated);
			}
		}
	}

	private static List<PropertiesWrapper> updateAdapterwithDataFilesIdsList(List<PropertiesWrapper> listProperties,
			Map<String, Object> zipMap) {
		logger.info("inside updateAdapterwithDataFilesIdsList");
		String ids = null;
		String newIds = "";
		List<PropertiesWrapper> listPropertiesUpdated = null;
		if (listProperties != null) {
			listPropertiesUpdated = new ArrayList<>();
			for (PropertiesWrapper propertiesWrapper : listProperties) {
				if ("file".equalsIgnoreCase(propertiesWrapper.getDatatype())) {
					Object idObj = propertiesWrapper.getValue();
					String fileNameS = propertiesWrapper.getFileName();
					if (idObj instanceof Integer) {
						ids = "" + idObj;
					} else {
						ids = (String) idObj;
					}
					newIds = getUpdatablevalue(ids, fileNameS, zipMap);
					propertiesWrapper.setValue(newIds);
				}
				listPropertiesUpdated.add(propertiesWrapper);
			}
		}
		return listPropertiesUpdated;
	}

	@SuppressWarnings("unchecked")
	private static String getUpdatablevalue(String ids, String filesName, Map<String, Object> zipMap) {
		logger.info("inside getUpdatablevalue");
		String[] arrayId = null;
		String[] arrayFileName = null;
		String mapKey = "";
		DataFiles dataFiles;
		String newIds = "";
		Map<String, DataFiles> mapInsertedDataFile = (Map<String, DataFiles>) zipMap
				.get(ImportSnapshotMapper.MAP_INSERTED_DATA_FILE);
		if (com.bnt.common.util.StringUtil.isNotNullOrBlank(ids)) {
			arrayId = ids.split("\\|");
			arrayFileName = filesName.split("\\|");
			for (int i = 0; i < arrayId.length; i++) {
				mapKey = arrayId[i] + "_" + arrayFileName[i];
				dataFiles = mapInsertedDataFile.get(mapKey);
				if ("".equalsIgnoreCase(newIds)) {
					newIds = "" + dataFiles.getId();
				} else {
					newIds = newIds + "|" + dataFiles.getId();
				}
			}
		}
		return newIds;
	}
}
