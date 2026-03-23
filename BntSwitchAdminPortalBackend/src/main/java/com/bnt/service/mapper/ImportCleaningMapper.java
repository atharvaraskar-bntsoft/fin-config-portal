package com.bnt.service.mapper;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.stream.IntStream;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;

import com.bnt.bswitch.shared.lib.entities.CollectionUtil;
import com.bnt.common.util.JsonObjectUtil;
import com.bnt.common.util.StringUtil;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ImportCleaningMapper {

	private ImportCleaningMapper() {
	}

	private static final String ID = "id";
	private static final String VERSION = "version";
	private static final Logger logger = LogManager.getLogger(ImportCleaningMapper.class);

	public static String cleanAttributes(String dataToImport, String className) {

		Map<String, Object> metaInfo = ExportImportMapper.getExpImpMetaJsonData();

		JSONObject importJson = new JSONObject(dataToImport);
		List<String> parentCleanAttributeList = getParentCleaningAttribute(metaInfo, className);
		cleanRequiredFields(importJson, parentCleanAttributeList);
		Iterator<String> keys = importJson.keys();

		while (keys.hasNext()) {
			String key = keys.next();
			if (importJson.get(key) instanceof JSONArray entityList
					&& !(JsonObjectUtil.isJsonArrayNullOrEmpty(entityList))) {
				getChildKey(entityList, metaInfo, key);
			}
		}
		if (!(JsonObjectUtil.isNullOrEmpty(importJson)).booleanValue()) {
			logger.info("Cleaning of id and version is done");
			dataToImport = importJson.toString();
			return dataToImport;
		}
		logger.error("Cleaning of id and version is not done");
		return null;
	}

	private static void getChildKey(JSONArray entityList, Map<String, Object> metaInfo, String key) {
		String childKey = null;
		if (StringUtil.isNotNullOrBlank(key)) {
			childKey = JsonObjectUtil.getStringValue((JSONObject) metaInfo.get(key), "childEntityAttribute");
		}
		cleanAttribute(entityList, metaInfo, key, childKey);
	}

	private static void cleanAttribute(JSONArray entityList, Map<String, Object> metaInfo, String parentKey,
			String childKey) {
		Object object;
		List<String> parentCleanAttributeList = getParentCleaningAttribute(metaInfo, parentKey);
		for (int i = 0; i < entityList.length(); i++) {
			object = entityList.get(i);

			if (object instanceof JSONObject parentObject) {
				cleanRequiredFields(parentObject, parentCleanAttributeList);
				// process child
				if (StringUtil.isEmptyOrNull(childKey)) {
					// Clean Id and version from Nested childs
					cleanChildAttributes(parentObject, metaInfo, parentKey);
				} else if (StringUtil.isNotNullOrBlank(childKey)) {
					processChildForCleaning(parentObject, metaInfo, childKey);
				}
			}
		}
	}

	private static List<String> getParentCleaningAttribute(Map<String, Object> metaInfo, String classAttributeName) {

		logger.info("inside getParentCleaningAttribute().. for metaInfo {}", metaInfo);
		List<String> parentCleanAttributeList = new ArrayList<>();
		JSONObject metaInfoObject = ExportImportMapper
				.metaDataByEntityName(StringUtil.capitalizeFirstLetter(classAttributeName));
		if (metaInfoObject != null) {
			JSONArray parentCleanAttribute = metaInfoObject.optJSONArray("cleanParentAttributes");
			parentCleanAttributeList = IntStream.range(0, parentCleanAttribute.length())
					.mapToObj(parentCleanAttribute::getString).toList();
		}
		return parentCleanAttributeList;
	}

	private static void processChildForCleaning(JSONObject parentObject, Map<String, Object> metaInfo,
			String childKey) {
		Object childObject;
		childObject = parentObject.get(childKey);

		if (childObject instanceof JSONObject jsonObject) {
			cleanRequiredFields(jsonObject);
		} else if (childObject instanceof JSONArray jsonArray) {
			getChildKey(jsonArray, metaInfo, childKey);
		}
	}

	private static void cleanChildAttributes(JSONObject parentObject, Map<String, Object> metaInfo, String parentKey) {

		JSONObject parentObjectCleaningInfo = null;
		if (metaInfo.containsKey(StringUtil.capitalizeFirstLetter(parentKey))) {
			JSONObject parentCleaningAttribute = (JSONObject) metaInfo.get(StringUtil.capitalizeFirstLetter(parentKey));
			JSONArray cleaningAttributeList = parentCleaningAttribute.optJSONArray("cleaningAttributes");

			if (!(JsonObjectUtil.isJsonArrayNullOrEmpty(cleaningAttributeList).booleanValue())) {
				cleanChildAttributes1(parentObject, metaInfo, parentKey, cleaningAttributeList);
			}
		}
	}

	private static void cleanChildAttributes1(JSONObject parentObject, Map<String, Object> metaInfo, String parentKey,
			JSONArray cleaningAttributeList) {
		JSONObject parentObjectCleaningInfo;
		String childKey;
		for (int i = 0; i < cleaningAttributeList.length(); i++) {
			parentObjectCleaningInfo = cleaningAttributeList.getJSONObject(i);
			if (!(JsonObjectUtil.isNullOrEmpty(parentObjectCleaningInfo).booleanValue())
					&& parentKey.equalsIgnoreCase(parentObjectCleaningInfo.getString("entityName")) && parentKey
							.equalsIgnoreCase(JsonObjectUtil.getStringValueWithNullValueCheck(parentObject, "name"))) {
				childKey = JsonObjectUtil.getStringValueWithNullValueCheck(parentObjectCleaningInfo,
						"childEntityAttribute");
				if (StringUtil.isNotNullOrBlank(childKey)) {
					processChildForCleaning(parentObject, metaInfo, childKey);
				}
			}
		}
	}

	private static void cleanRequiredFields(JSONObject entityObject) {
		entityObject.remove(ID);
		JsonObjectUtil.setValue(entityObject, VERSION, 1);
	}

	private static void cleanRequiredFields(JSONObject entityObject, List<String> keyList) {
		if (!(CollectionUtil.isCollectionEmptyOrNull(keyList))) {
			cleanRequiredFields1(entityObject, keyList);
		} else {
			JsonObjectUtil.removeKey(entityObject, ID);
			JsonObjectUtil.setValue(entityObject, VERSION, 1);
		}
	}

	private static void cleanRequiredFields1(JSONObject entityObject, List<String> keyList) {
		if (keyList.size() == 1) {
			if (ID.equalsIgnoreCase(keyList.get(0))) {
				JsonObjectUtil.removeKey(entityObject, ID);
			} else if (VERSION.equalsIgnoreCase(keyList.get(0))) {
				JsonObjectUtil.removeKey(entityObject, VERSION);
			}
		} else if (keyList.size() == 2) {
			JsonObjectUtil.removeKey(entityObject, ID);
			JsonObjectUtil.setValue(entityObject, VERSION, 1);
		} else {
			for (String key : keyList) {
				if (!(VERSION.equalsIgnoreCase(key))) {
					JsonObjectUtil.removeKey(entityObject, key);
				} else {
					JsonObjectUtil.setValue(entityObject, VERSION, 1);
				}
			}
		}
	}
}
