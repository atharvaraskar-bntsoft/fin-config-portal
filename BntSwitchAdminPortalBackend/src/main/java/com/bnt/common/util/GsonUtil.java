package com.bnt.common.util;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.google.common.collect.MapDifference;
import com.google.common.collect.MapDifference.ValueDifference;
import com.google.common.collect.Maps;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.bnt.rest.wrapper.dto.KeyDiffWrapper;
import com.bnt.service.mapper.ExportEntityMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class GsonUtil {

	private GsonUtil() {
	}

	private static final Logger logger = LogManager.getLogger(GsonUtil.class);

	public static String toPrettyFormat(String jsonString) {
		JsonParser parser = new JsonParser();
		JsonObject json = parser.parse(jsonString).getAsJsonObject();
		Gson gson = getInstance();
		return gson.toJson(json);
	}

	@SuppressWarnings("unchecked")
	public static <T> T getObjectFromString(String jsonString, Class<T> classType) {
		Gson gson = getInstance();
		return gson.fromJson(jsonString, classType);
	}

	private static Gson getInstance() {
		return new GsonBuilder().disableHtmlEscaping().setPrettyPrinting().create();
	}

	/*
	 * Work with TypeAdapter approach which uses Streaming Little complex and faster
	 * in performance than De-serializer for complex and nested Json
	 * 
	 */
	private static Gson getInstanceUsingTypeAdapter(Boolean isNullSerialized) {
		Gson gson = null;
		GsonBuilder gsonBuilder = new GsonBuilder().registerTypeAdapter(Timestamp.class,
				UnixEpochTimestampAdapter.getUnixEpochDateTypeAdapter().nullSafe());

		if (Boolean.TRUE.equals(isNullSerialized)) {
			gson = gsonBuilder.serializeNulls().create();
		} else {
			gson = gsonBuilder.create();
		}
		return gson;
	}

	public static <T> JsonElement getJsonObjectFromType(T t, Boolean isNullSerialized) {
		return getInstanceUsingTypeAdapter(isNullSerialized).toJsonTree(t);
	}

	private static Boolean isEmpty(JsonObject jsonObject) {
		return !(!(jsonObject.isJsonNull()) && !jsonObject.entrySet().isEmpty());
	}

	private static Boolean isEmpty(JsonArray jsonArray) {
		return !(jsonArray != null && !(jsonArray.isJsonNull()) && jsonArray.size() > 0);
	}

	public static JsonObject getJsonObjectOfEntity(String entityName, JsonObject jsonObject, Iterable<?> recordList) {
		JsonArray jsonArray = ExportEntityMapper.convertEntityListToJsonArray(entityName, recordList);

		if (Boolean.TRUE.equals(GsonUtil.isEmpty(jsonArray))) {
			logger.error("Could not get json object of entity for{}", entityName);
			return jsonObject;
		}
		jsonObject.add(entityName, jsonArray);
		return jsonObject;
	}

	public static String getResultObject(JsonObject jsonObject, String headerName) {
		if (Boolean.FALSE.equals(GsonUtil.isEmpty(jsonObject))) {
			JsonObject mainJson = new JsonObject();
			mainJson.add(headerName, jsonObject);
			return getInstance().toJson(mainJson);
		}
		return null;
	}

	public static String getDifference(String leftJson, String rightJson) {
		Map<String, Object> leftFlatMap = JsonPathUtil.getFlatMap(leftJson, true);
		Map<String, Object> rightFlatMap = JsonPathUtil.getFlatMap(rightJson, true);
		MapDifference<String, Object> difference = Maps.difference(leftFlatMap, rightFlatMap);
		List<KeyDiffWrapper> updatedValueObjList = new ArrayList<>();
		KeyDiffWrapper updatedValueObj = null;
		String leftValue = null;
		String rightValue = null;
		for (Entry<String, ValueDifference<Object>> eachSet : difference.entriesDiffering().entrySet()) {

			if (eachSet.getValue() != null) {
				leftValue = eachSet.getValue().leftValue() != null ? eachSet.getValue().leftValue().toString() : null;
				rightValue = eachSet.getValue().rightValue() != null ? eachSet.getValue().rightValue().toString()
						: null;
				updatedValueObj = new KeyDiffWrapper(eachSet.getKey(), leftValue, rightValue);
				updatedValueObjList.add(updatedValueObj);
			}
		}
		return getJsonObjectFromType(updatedValueObjList, true).toString();
	}

	public static String getDifference(Object leftJson, Object rightJson) {

		String leftJsonString = null;
		if (leftJson != null) {
			leftJsonString = GsonUtil.getJsonObjectFromType(leftJson, false).toString();
		}
		String rightJsonString = null;
		if (rightJson != null) {
			rightJsonString = GsonUtil.getJsonObjectFromType(rightJson, false).toString();
		}
		if (leftJsonString != null && rightJsonString != null) {
			return getDifference(leftJsonString, rightJsonString);
		} else if (leftJsonString == null && rightJsonString != null) {
			return rightJsonString;
		} else if (leftJsonString != null) {
			return leftJsonString;
		}
		return "[]";
	}
}
