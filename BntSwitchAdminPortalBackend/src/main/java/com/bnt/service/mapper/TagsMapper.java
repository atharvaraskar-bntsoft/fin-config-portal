package com.bnt.service.mapper;

import java.io.IOException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.google.gson.JsonElement;
import com.bnt.core.orchestation.rule.ConditionalDecisionRule;
import com.bnt.bswitch.query.parser.Condition;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.GsonUtil;
import com.bnt.common.util.JsonObjectUtil;
import com.bnt.common.util.StringUtil;
import com.bnt.common.util.exception.ExceptionLog;
import com.bnt.rest.dto.TagsDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class TagsMapper {

	private static Log logger = LogFactory.getLog(TagsMapper.class);

	private TagsMapper() {

	}

	public static boolean validateDto(TagsDto dto) {
		logger.info("inside validateDto");
		boolean validation = false;
		if (dto == null) {
			throw new RippsAdminException("Tags input data connot be null");
		}
		if (!StringUtil.isNotNullOrBlank(dto.getName())) {
			/** validation = false; */
			throw new RippsAdminException("Tags name connot be null/blank");
		}

		if (!StringUtil.isNotNullOrBlank(dto.getServiceType())) {
			/** validation = false; */
			throw new RippsAdminException("Tags Service-type connot be null/blank");
		}

		if (!StringUtil.isNotNullOrBlank(dto.getCondition())) {
			/** validation = false; */
			throw new RippsAdminException("Tags condition connot be null/blank");
		} else if (!conditionUiValidation(dto.getCondition())) {
			/** validation = false; */
			throw new RippsAdminException("Tags condition json is invalid");
		}
		if (!StringUtil.isNotNullOrBlank(dto.getTag())) {
			/** validation = false; */
			throw new RippsAdminException("Tags tag connot be null/blank");
		}
		if (!StringUtil.isNotNullOrBlank(dto.getExchangeType())) {
			/** validation = false; */
			throw new RippsAdminException("Tags Exchange-type connot be null/blank");
		}

		validation = true;
		return validation;
	}

	public static Object getConditionUiObjectFromConditionString(String condition) {
		Object conditionUi = null;
		if (StringUtil.isNotNullOrBlank(condition)) {
			boolean isValid = conditionUiValidation(condition);
			if (!isValid) {
				logger.error("Condition parsing failed");
			} else {
				conditionUi = JsonObjectUtil.getObjectFromJsonString(condition);
			}
		}
		return conditionUi;
	}

	public static String getConditionStringFromConditionUiObject(Object conditionUi) {
		String condition = null;
		if (conditionUi != null) {
			JsonElement jsonElementCode = GsonUtil.getJsonObjectFromType(conditionUi, true);
			condition = jsonElementCode.toString();
		}
		return condition;
	}

	public static boolean conditionUiValidation(String json) {
		boolean isValid = false;
		if (json != null) {
			logger.info("json to validate:->" + json);
			Condition condition = JsonObjectUtil.getGenericObjectFromJsonString(json, Condition.class);
			if (condition == null) {
				logger.error("Exception in parsing Condition data Json " + json);
				isValid = false;
			} else {
				logger.info("Condition Json has been parsed");
				isValid = true;
			}
		}
		return isValid;
	}

	public static String getConditionalDecisionRuleFromConditionString(String json) {
		logger.info("getConditionalDecisionRuleFromConditionString Json has been parsed");
		String ruleString = "";
		if (StringUtil.isNotNullOrBlank(json)) {
			Condition condition = JsonObjectUtil.getGenericObjectFromJsonString(json, Condition.class);
			if (condition == null) {
				logger.error("issue in parsing condition Json " + json);
				throw new RippsAdminException("Invalid condition");
			} else {
				logger.info("condition Json has been parsed");
			}
			try {
				ConditionalDecisionRule conditionalDecisionRule = new ConditionalDecisionRule(condition);
				ruleString = new com.fasterxml.jackson.databind.ObjectMapper()
						.writeValueAsString(conditionalDecisionRule);
			} catch (IOException e) {
				logger.error("issue in conversion from Condition object to ConditionalDecisionRule "
						+ ExceptionLog.printStackTraceToString(e));
				throw new RippsAdminException("Invalid ConditionalDecisionRule");
			}
		}
		return ruleString;
	}
}
