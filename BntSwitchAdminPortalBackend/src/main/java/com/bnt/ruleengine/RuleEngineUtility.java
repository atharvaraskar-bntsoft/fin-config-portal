package com.bnt.ruleengine;

import java.util.List;
import java.util.stream.Collectors;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.google.gson.Gson;
import com.bnt.common.util.GsonUtil;
import com.bnt.rest.wrapper.dto.IdAndNameWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class RuleEngineUtility {

	private RuleEngineUtility() {
	}

	private static Log log = LogFactory.getLog(RuleEngineUtility.class.getName());

	public static ConditionRowDto setConditionValue(Nodes conditions) {
		ConditionRowDto routeRuleDto = new ConditionRowDto();
		if (conditions.getKey() != null) {
			String key = conditions.getKey();
			routeRuleDto.setSelectionCriteriaValue(conditions.getValue());
			routeRuleDto.setSelectionCriteria(key);
		}

		if (conditions.getOperator() != null) {
			routeRuleDto.setConditionalOperator(conditions.getOperator());
		}
		routeRuleDto.setLogicalOperator(conditions.getRelation());
		return routeRuleDto;
	}

	public static String getJson(Object s) {
		Gson gson = new Gson();
		return gson.toJson(s);
	}

	public static String convertListToStringWithComma(List<IdAndNameWrapper> list) {
		return list.stream().map(id -> id.getId().toString()).collect(Collectors.joining(","));
	}

	public static String convertListOfIdsToStringWithComma(List<IdAndNameWrapper> list) {
		return list.stream().map(id -> id.getId().toString()).collect(Collectors.joining(","));
	}

	public static ParentDto mapJsonToParentDto(String json) {
		return GsonUtil.getObjectFromString(json, ParentDto.class);
	}
}
