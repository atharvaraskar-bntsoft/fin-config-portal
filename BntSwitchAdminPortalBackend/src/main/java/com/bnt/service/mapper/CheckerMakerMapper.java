package com.bnt.service.mapper;

import com.bnt.common.util.JsonObjectUtil;
import com.bnt.enums.EntityGroupEnum;
import com.bnt.rest.entity.Checker;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class CheckerMakerMapper {

	private CheckerMakerMapper() {
	}

	public static Checker mapToChecker(String entityName, Integer entityId, String requestJsontoUpdate,
			String updatedData, String status) {
		Checker checker = new Checker();
		checker.setComment(null);
		checker.setData(updatedData);
		checker.setStatus(status);
		checker.setEntityType(entityName);
		checker.setEntityId(entityId);
		checker.setJson(requestJsontoUpdate);
		return checker;
	}

	public static Checker mapToChecker(String entityName, String requestJsontoUpdate, String status) {
		Checker checker = new Checker();
		checker.setComment(null);
		checker.setStatus(status);
		checker.setEntityType(entityName);
		checker.setJson(requestJsontoUpdate);
		return checker;
	}

	public static Boolean setEntityIdIfPUT(Checker checker) {
		/*
		 * Ideally the knowledge of POST and PUT should be done through a separate
		 * header attribute if Request method is same for POST/PUT But In Admin Portal,
		 * POST/PUT is currently for Merchant Hierarchy
		 */
		Boolean isPOSTPUTSame = EntityGroupEnum.isEntityExistsInGroup(EntityGroupEnum.MERCHANT_GROUP.name(),
				checker.getEntityType());

		if (Boolean.TRUE.equals(isPOSTPUTSame)) {
			String jsonString = checker.getJson();
			Integer id = JsonObjectUtil.findIntegerValue(jsonString, "id");

			if (id != 0 && id != null) {
				// This is really PUT operation even if the request method is POST
				checker.setEntityId(id);
				// Now find the difference
				return true;
			}
		}
		return false;
	}
}
