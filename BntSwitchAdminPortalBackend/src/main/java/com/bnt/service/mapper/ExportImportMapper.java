package com.bnt.service.mapper;

import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.jdo.annotations.Cacheable;
import jakarta.persistence.EntityManager;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONObject;

import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.JsonObjectUtil;
import com.bnt.common.util.StringUtil;
import com.bnt.rest.dto.BaseDto;
import com.bnt.rest.entity.BaseEntity;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ExportImportMapper {

	private static Log log = LogFactory.getLog(ExportImportMapper.class);

	private static Map<String, Object> expimpMetaDataMap = null;

	private static Map<String, Class<? extends BaseEntity>> entityClassPathMap = new HashMap<>();

	private static Map<String, Class<? extends BaseDto>> dtoClasspathMap = new HashMap<>();

	private static Map<String, String> entityTableNameMap = new HashMap<>();

	private static final String JSON_PATH = "/export-import/meta-data.json";

	@SuppressWarnings("unchecked")
	@Cacheable
	public static Map<String, Object> getExpImpMetaJsonData() {
		log.info("inside getExpImpMetaJsonData");
		if (expimpMetaDataMap == null) {
			log.info("EXPIMP_META_JSON_DATA is blank hence going to load from file:" + JSON_PATH);
			expimpMetaDataMap = (Map<String, Object>) JsonObjectUtil.loadJsonFileAsType(JSON_PATH, Map.class);
			log.info("completed getExpImpMetaJsonData");
		}
		return expimpMetaDataMap;
	}

	public static JSONObject metaDataByEntityName(String entityName) {
		Map<String, Object> mapData = getExpImpMetaJsonData();
		return JsonObjectUtil.getJsonObjectFromObject(mapData.get(entityName));
	}

	public static String[] getEntityList() {
		log.info("inside getEntityList");
		Map<String, Object> mapData = getExpImpMetaJsonData();
		return Arrays.stream(mapData.keySet().toArray()).toArray(String[]::new);
	}

	public static String getPropertyByEntityTypeChildPropertName(String entityType, String propertyName) {
		log.info("inside getPropertyByEntityTypeChildPropertName");
		String property = null;
		Object object = getObjectFromMetaInfoMap(entityType, propertyName);
		if (object != null) {
			if ("String".equalsIgnoreCase(object.getClass().getSimpleName())) {
				property = object.toString();
				if (!StringUtil.isNotNullOrBlank(property)) {
					property = getDefaultPropertName(propertyName);
				}
			}

			else if ("Boolean".equalsIgnoreCase(object.getClass().getSimpleName())) {
				property = object.toString();

			}
		}
		return property;
	}

	public static Object getObjectFromMetaInfoMap(String entityType, String propertyName) {
		LinkedHashMap<String, Object> metaInfo = (LinkedHashMap<String, Object>) getMetaInfoByEntityType(entityType);
		if (metaInfo != null) {
			return metaInfo.get(propertyName);
		}
		return null;
	}

	public static String getDefaultPropertName(String propertyName) {
		String property = null;
		if ("nameAttribute".equalsIgnoreCase(propertyName)) {
			property = "name";
		}
		if ("versionAttributeName".equalsIgnoreCase(propertyName)) {
			property = "version";
		}
		return property;
	}

	@SuppressWarnings("unchecked")
	public static Map<String, Object> getMetaInfoByEntityType(String entityType) {
		log.info("inside getMetaInfoByEntityType");

		Map<String, Object> mapData = getExpImpMetaJsonData();
		if (mapData.get(entityType) != null) {
			/**
			 * LinkedHashMap<String, Object> metaInfo = (LinkedHashMap<String, Object>)
			 * mapData.get(entityType);
			 */

			return (LinkedHashMap<String, Object>) mapData.get(entityType);
		}
		return mapData;
	}

	public static Class<? extends BaseEntity> getEntityClassByName(String enityName) {
		log.info("inside getEntityClassByName with enityName :" + enityName);
		return entityClassPathMap.get(enityName);
	}

	public static void setEntityClassByName(String enityName, Class<? extends BaseEntity> entityClass) {
		log.info("inside setEntityClassByName with enityName:" + enityName);
		entityClassPathMap.put(enityName, entityClass);
	}

	public static Class<? extends BaseDto> getDtoClassByName(String dtoType) {
		log.info("inside getEntityClassByName with enityName  :" + dtoType);
		return dtoClasspathMap.get(dtoType);
	}

	public static void setDtoClassByName(String dtoType, Class<? extends BaseDto> dtoClass) {
		log.info("inside setDtoClassByName with dtoType:" + dtoType);
		dtoClasspathMap.put(dtoType, dtoClass);
	}

	public static String getTableNameByEntityName(String enityName) {
		log.info("inside getTableNameByEntityName with enityName:" + enityName);
		return entityTableNameMap.get(enityName);
	}

	public static void setTableNameByEntityName(String enityName, String tableName) {
		log.info("inside setEntityClassByName with enityName:" + enityName);
		entityTableNameMap.put(enityName, tableName);
	}

	@SuppressWarnings("unchecked")
	public static Class<? extends BaseEntity> getEntityClassByName(EntityManager entityManager, String enityName) {
		log.info("inside getEntityClassByName with enityName:" + enityName);
		Class<? extends BaseEntity> entityclass = null;
		if (StringUtil.isNotNullOrBlank(enityName)) {
			entityclass = getEntityClassByName(enityName);
			if (entityclass == null) {
				entityclass = (Class<? extends BaseEntity>) JPAUtils.getClassTypeBySimpleName(entityManager, enityName);
				if (entityclass != null) {
					ExportImportMapper.setEntityClassByName(enityName, entityclass);
				}
			}
		}
		return entityclass;
	}

	@SuppressWarnings("unchecked")
	public static Class<? extends BaseDto> getDtoClassByName(String dtoType, boolean searchSpecificPackage) {
		log.info("inside getDtoClassByName with dtoType:" + dtoType);
		Class<? extends BaseDto> dtoClass = null;
		if (StringUtil.isNotNullOrBlank(dtoType)) {
			dtoClass = ExportImportMapper.getDtoClassByName(dtoType);
			if (dtoClass == null) {
				dtoClass = (Class<? extends BaseDto>) JPAUtils.getDtoClassTypeBySimpleEntityName(dtoType,
						searchSpecificPackage);
				if (dtoClass != null) {
					ExportImportMapper.setDtoClassByName(dtoType, dtoClass);
				}
			}
		}
		return dtoClass;
	}

	@SuppressWarnings("unchecked")
	public static String getTableNameByEntityName(EntityManager entityManager, String enityName) {
		log.info("inside getTableNameByEntityName with enityName:" + enityName);
		String tableName = null;
		if (StringUtil.isNotNullOrBlank(enityName)) {
			tableName = getTableNameByEntityName(enityName);
			if (!StringUtil.isNotNullOrBlank(enityName)) {
				tableName = JPAUtils.getTableName(getEntityClassByName(entityManager, enityName));
				if (StringUtil.isNotNullOrBlank(tableName)) {
					setTableNameByEntityName(enityName, tableName);
				}

			}
		}
		return tableName;
	}

	public static boolean isNotJoinButVersion(String childEntityName, String versionAttributeName) {
		if (StringUtil.isEmptyOrNull(childEntityName) && StringUtil.isNotNullOrBlank(versionAttributeName)) {
			return true;
		}
		return false;
	}

	public static boolean isNeitherJoinNorVersion(String childEntityName, String versionAttributeName) {
		if (StringUtil.isEmptyOrNull(childEntityName) && StringUtil.isEmptyOrNull(versionAttributeName)) {
			return true;
		}

		return false;
	}

	public static boolean isJoinAndVersion(String childEntityName, String versionAttributeName) {
		if (StringUtil.isNotNullOrBlank(childEntityName) && StringUtil.isNotNullOrBlank(versionAttributeName)) {
			return true;
		}

		return false;
	}
}
