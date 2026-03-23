package com.bnt.service.mapper;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.google.gson.JsonArray;
import com.bnt.common.util.GsonUtil;
import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.JsonObjectUtil;
import com.bnt.common.util.RippsUtility;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.entity.AuthSession;
import com.bnt.rest.entity.BaseEntity;
import com.bnt.rest.entity.EntityExport;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ExportEntityMapper {

	private static final Logger logger = LogManager.getLogger(ExportEntityMapper.class);

	ExportEntityMapper() {

	}

	public static JsonArray convertEntityListToJsonArray(String entityName, Iterable<?> recordList) {
		Class<?> dtoClassType = JPAUtils.getDtoClassTypeBySimpleEntityName(entityName, false);

		BaseEntity baseEntity = null;
		JsonArray jsonArray = new JsonArray();
		Object dto = null;
		for (Object item : recordList) {

			try {
				baseEntity = (BaseEntity) item;
				dto = ObjectMapper.mapToDto(item, dtoClassType);

			} catch (Exception e) {
				logger.error("Export operation failed for entity with id:{}", baseEntity.getId());
				logger.error("Error in converting Entity to Dto{}", e.getMessage());

				logger.debug(e.fillInStackTrace());
				return null;
			}
			if (dto != null) {

				try {
					jsonArray.add(GsonUtil.getJsonObjectFromType(dto, false));
				} catch (Exception e) {
					logger.error("Export operation failed for entity with id:{}", baseEntity.getId());
					logger.error("Error in converting Dto To Json {}", e.getMessage());

					logger.debug(e.fillInStackTrace());
					return null;
				}
			}
		}
		return jsonArray;

	}

	public static EntityExport mapJsonObjectToEntityRecord(String groupType, String comment, String jsonString) {

		logger.debug("inside mapJsonObjectToEntityRecord().. for authSession {}");
		EntityExport entityRecord = new EntityExport();
		entityRecord.setComment(comment);

		entityRecord.setData(jsonString);

		entityRecord.setGroupType(groupType);

		return entityRecord;
	}

	public static void saveJsonToFile(String jsonString, EntityExport entityRecord, String entityExportPath) {

		logger.info("saving json data to export entity resource path");

		String fileName = RippsUtility.getAuthorIdentifier(entityRecord.getUpdatedBy());

		JsonObjectUtil.saveJson(jsonString, entityExportPath, fileName);
		logger.info(jsonString);
	}
}
