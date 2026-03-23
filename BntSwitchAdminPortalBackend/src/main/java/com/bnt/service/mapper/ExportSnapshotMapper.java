package com.bnt.service.mapper;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import jakarta.persistence.EntityManager;
import jakarta.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;

import com.bnt.common.util.JsonObjectUtil;
import com.bnt.common.util.StringUtil;
import com.bnt.rest.dto.DataFilesDto;
import com.bnt.rest.wrapper.dto.adapter.AdapterUiResponseWrapper;
import com.bnt.rest.wrapper.dto.adapter.NetworkPropertiesResponseWrapper.PropertiesWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ExportSnapshotMapper {

	private static final String CHILD_ENTITY_ATTRIBUTE = "childEntityAttribute";
	private static final String NAME_ATTRIBUTE = "nameAttribute";
	private static final String VERSION_ATTRIBUTE_NAME = "versionAttributeName";
	private static final Logger logger = LogManager.getLogger(ExportSnapshotMapper.class);

	public static List<Integer> getAdapterList(String jsonObject, HttpServletRequest request) {
		logger.debug("Inside getAdapterList");
		logger.debug(jsonObject);
		JSONObject importJson = new JSONObject(jsonObject);

		String key = "Adapter";
		String dtoData = "";
		List<String> dataFilesList = null;
		List<Integer> dataFilesNewList = new ArrayList<>();
		if (importJson.has(key) && importJson.get(key) instanceof JSONArray entityList
				&& !(JsonObjectUtil.isJsonArrayNullOrEmpty(entityList)).booleanValue()) {
			logger.info("for key:{} \t total record for import:", entityList.length());
			AdapterUiResponseWrapper dtoObject = null;
			dataFilesList = new ArrayList<>();
			for (int i = 0; i < entityList.length(); i++) {
				dtoData = entityList.get(i).toString();
				dtoObject = JsonObjectUtil.getObjectFromString(dtoData, AdapterUiResponseWrapper.class);
				if (dtoObject != null) {
					dataFilesList.addAll(getDataFileListInAdapter(dtoObject, request));
				}
			}
		}
		if (dataFilesList != null) {
			dataFilesList.forEach(a -> {
				Integer id = Integer.parseInt(a);
				if (!dataFilesNewList.contains(id)) {
					dataFilesNewList.add(id);
				}
			});
		}
		logger.debug("returned from getAdapterList with {} ", dataFilesNewList.size());
		return dataFilesNewList;
	}

	private static List<String> getDataFileListInAdapter(AdapterUiResponseWrapper adapterUiResponseWrapper,
			HttpServletRequest request) {
		logger.info("inside getDataFileListInAdapter() with request {}", request);
		List<String> dataFilesList = null;
		if (adapterUiResponseWrapper.getNetworkData() != null
				&& adapterUiResponseWrapper.getNetworkData().getProperties() != null) {
			dataFilesList = new ArrayList<>();
			dataFilesList.addAll(
					getDataFilesIdsList(adapterUiResponseWrapper.getNetworkData().getProperties().getMessage()));
			dataFilesList.addAll(
					getDataFilesIdsList(adapterUiResponseWrapper.getNetworkData().getProperties().getNetwork()));
		}
		return dataFilesList;
	}

	private static List<String> getDataFilesIdsList(List<PropertiesWrapper> listProperties) {
		List<String> dataFilesList = null;
		String ids = null;
		if (listProperties != null) {
			dataFilesList = new ArrayList<>();
			for (PropertiesWrapper propertiesWrapper : listProperties) {
				if ("file".equalsIgnoreCase(propertiesWrapper.getDatatype())) {
					Object idObj = propertiesWrapper.getValue();
					if (idObj instanceof Integer) {
						ids = "" + idObj;
					} else {
						ids = (String) idObj;
					}
					if (com.bnt.common.util.StringUtil.isNotNullOrBlank(ids)) {
						dataFilesList.addAll(Arrays.asList(ids.split("\\|")));
					}
				}
			}
		}
		return dataFilesList;
	}

	public static byte[] getZipFile(String zipFileName, List<DataFilesDto> dataFilesDtoList) throws IOException {

		logger.info("inside getZipFile() with file {}", zipFileName);
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		ZipOutputStream zipOut = new ZipOutputStream(baos);
		File fileToZip = null;
		for (DataFilesDto dataFilesDto : dataFilesDtoList) {
			fileToZip = new File(dataFilesDto.getId() + "_" + dataFilesDto.getFileName());
			ZipEntry zipEntry = new ZipEntry(fileToZip.getName());
			zipOut.putNextEntry(zipEntry);
			zipOut.write(dataFilesDto.getFileContent());
		}
		zipOut.close();
		baos.close();
		return baos.toByteArray();
	}

	public static String getQueryForAllExportEntity(String[] valuesEntity, EntityManager entityManager) {
		logger.info("inside getQueryForAllExportEntity");
		StringBuilder queryBuilder = new StringBuilder();
		for (String value : valuesEntity) {
			if (queryBuilder.length() > 10) {
				queryBuilder.append("\n");
				queryBuilder.append(" union ");
				queryBuilder.append("\n");
			}

			if (StringUtil.isNotNullOrBlank(
					ExportImportMapper.getPropertyByEntityTypeChildPropertName(value, "listMainQuery"))) {
				queryBuilder.append(ExportImportMapper.getPropertyByEntityTypeChildPropertName(value, "listMainQuery"));
			} else {
				prepareQueryForAllExportEntity(entityManager, queryBuilder, value);

			}
		}
		if (queryBuilder.length() > 0) {
			logger.info("Query:select * from ({}) query order by updated_on desc", queryBuilder);
			return "select * from (" + queryBuilder.toString() + ") query order by updated_on desc";
		}
		return queryBuilder.toString();
	}

	private static void prepareQueryForAllExportEntity(EntityManager entityManager, StringBuilder queryBuilder,
			String value) {
		String childEntityAttribute = ExportImportMapper.getPropertyByEntityTypeChildPropertName(value,
				CHILD_ENTITY_ATTRIBUTE);
		String nameAttribute = "name";
		if (StringUtil
				.isNotNullOrBlank(ExportImportMapper.getPropertyByEntityTypeChildPropertName(value, NAME_ATTRIBUTE))) {
			nameAttribute = ExportImportMapper.getPropertyByEntityTypeChildPropertName(value, NAME_ATTRIBUTE);
		}
		String entityTypeName = ExportImportMapper.getPropertyByEntityTypeChildPropertName(value, "entityName");
		String entityType = ExportImportMapper.getTableNameByEntityName(entityManager, entityTypeName);
		if (!StringUtil.isNotNullOrBlank(childEntityAttribute)) {
			if (StringUtil.isNotNullOrBlank(
					ExportImportMapper.getPropertyByEntityTypeChildPropertName(value, VERSION_ATTRIBUTE_NAME))) {
				String version = ExportImportMapper.getPropertyByEntityTypeChildPropertName(value,
						VERSION_ATTRIBUTE_NAME);
				queryBuilder.append("select distinct " + nameAttribute + " as name, '" + entityType
						+ "' as entity , 0 as id  from " + entityType);
				queryBuilder.append(" where " + version + " > 0");
			} else {
				queryBuilder.append(
						"select " + nameAttribute + ", '" + entityType + "' as entity , id as id from " + entityType);
			}
		} else {
			queryBuilder.append(
					"select " + nameAttribute + ", '" + entityType + "' as entity , id as id from " + entityType);
		}
	}

	public static String getQueryForExportableEntity(String entity) {
		StringBuilder queryBuilder = new StringBuilder();
		StringBuilder whereCondition = new StringBuilder();
		StringBuilder orderedBy = new StringBuilder();
		String valueTable = "";
		String nameAttribute = "name";
		if (StringUtil
				.isNotNullOrBlank(ExportImportMapper.getPropertyByEntityTypeChildPropertName(entity, NAME_ATTRIBUTE))) {
			nameAttribute = ExportImportMapper.getPropertyByEntityTypeChildPropertName(entity, NAME_ATTRIBUTE);
		}

		if (StringUtil.isNotNullOrBlank(
				ExportImportMapper.getPropertyByEntityTypeChildPropertName(entity, "childEntityName"))) {
			valueTable = ExportImportMapper.getPropertyByEntityTypeChildPropertName(entity, "childEntityName");
			String attributePerentInChild = ExportImportMapper.getPropertyByEntityTypeChildPropertName(entity,
					"attributePerentInChild");
			if (StringUtil.isNotNullOrBlank(attributePerentInChild)) {
				whereCondition.append(attributePerentInChild + "." + nameAttribute + "= :name");
			}
		} else {
			valueTable = ExportImportMapper.getPropertyByEntityTypeChildPropertName(entity, "entityName");
			whereCondition.append(nameAttribute + "= :name");
		}
		queryBuilder.append("select id ");
		if (StringUtil.isNotNullOrBlank(
				ExportImportMapper.getPropertyByEntityTypeChildPropertName(entity, VERSION_ATTRIBUTE_NAME))) {
			String version = ExportImportMapper.getPropertyByEntityTypeChildPropertName(entity, VERSION_ATTRIBUTE_NAME);
			queryBuilder.append(" ," + version + " as version");
			if (whereCondition.length() > 1) {
				whereCondition.append(" and ");
			}
			whereCondition.append(version + " > 0");
			orderedBy.append(version);
		}
		queryBuilder.append(" from " + valueTable);

		if (whereCondition.length() > 1) {
			queryBuilder.append(" where ").append(whereCondition);
		}
		if (orderedBy.length() > 1) {
			queryBuilder.append(" order by ").append(orderedBy).append(" desc ");
		} else {
			queryBuilder.append(" order by ").append("updatedOn").append(" desc ");
		}

		logger.info("Query child {}:", queryBuilder);
		return queryBuilder.toString();
	}
}
