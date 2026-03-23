package com.bnt.service.mapper;

import java.util.ArrayList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;

import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.JsonObjectUtil;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ImportEntityMapper {

	private static final Logger logger = LogManager.getLogger(ImportEntityMapper.class);

	ImportEntityMapper() {

	}

	@SuppressWarnings("unused")
	public static <T> List<T> getEntityObjectListFromJson(String json, Class<T> entityClass) {

		// Traverse over JSON to get the all data for specific entity
		List<T> entityList = new ArrayList<>();

		try {
			JSONObject jsonObject = JsonObjectUtil.getJson(json);
			JSONObject dataJsonObject = JsonObjectUtil.getChildJSONObject(jsonObject, "data");
			JSONArray dataArrayCollection = dataJsonObject.getJSONArray(entityClass.getSimpleName());
			String dtoData = "";
			T t = null;
			if (Boolean.FALSE.equals((JsonObjectUtil.isJsonArrayNullOrEmpty(dataArrayCollection)))) {
				for (int i = 0; i < dataArrayCollection.length(); i++) {
					dtoData = dataArrayCollection.get(i).toString();

					t = getEntityObject(entityClass, dtoData, i);
					if (t != null) {
						entityList.add(t);
					}
				}
			}
		} catch (Exception e) {
			logger.error("Import Failed :  Error in converting Json for entity with name :{}:{}",
					entityClass.getSimpleName(), e.getMessage());
		}
		return entityList;
	}

	private static <T> T getEntityObject(Class<T> entityClass, String dtoData, int i) {
		T entity = null;
		try {
			entity = JPAUtils.getEntityFromJsonString(dtoData, entityClass);
		} catch (Exception e) {
			logger.error("Error in reading Json at index:{} : for entity with name {}: {}", i,
					entityClass.getSimpleName(), e.getMessage());
		}
		return entity;
	}
}
