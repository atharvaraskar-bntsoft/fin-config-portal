package com.bnt.ruleengine;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.HashMap;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class RuleEngineBuilder {

	private RuleEngineBuilder() {

	}

	private static final Logger logger = LogManager.getLogger(RuleEngineBuilder.class);
	private static final String DELIMITED_ROUTES = "m.setDelimitedRoutes(";
	private static Map<String, String> logicalMap = new HashMap<>();
	public static final String NEWLINE = "\n";

	public static String serialize(ConditionRowDto routeRule, String type) {

		StringBuilder rule = new StringBuilder();
		if (routeRule.getStartParenthesis() != null && routeRule.getStartParenthesis().trim() != null
				&& routeRule.getStartParenthesis().trim().length() > 0) {
			rule.append(routeRule.getStartParenthesis());
		}

		rule.append(routeRule.getSelectionCriteria());

		rule.append(" " + routeRule.getConditionalOperator() + " ");

		serialize1(routeRule, rule);
		serialize2(routeRule, type, rule);
		return rule.toString();
	}

	private static void serialize2(ConditionRowDto routeRule, String type, StringBuilder rule) {
		if (routeRule.getEndParenthesis() != null && routeRule.getEndParenthesis().trim() != null
				&& routeRule.getEndParenthesis().trim().length() > 0) {
			rule.append(routeRule.getEndParenthesis() + "\n");
		}
		if (type.equalsIgnoreCase("1")) {
			if (routeRule.getLogicalOperator() != null && routeRule.getLogicalOperator().trim() != null
					&& routeRule.getLogicalOperator().trim().length() > 0) {
				rule.append(" " + "\n" + getLogicalMapping(routeRule.getLogicalOperator()) + "\n");
			}
		} else {
			if (routeRule.getLogicalOperator() != null && routeRule.getLogicalOperator().trim() != null
					&& routeRule.getLogicalOperator().trim().length() > 0) {
				rule.append(" " + getLogicalMapping(routeRule.getLogicalOperator()) + "\n");
			}
		}
	}

	private static void serialize1(ConditionRowDto routeRule, StringBuilder rule) {
		if (routeRule.getSelectionCriteria().equalsIgnoreCase("transactionAmount")
				&& routeRule.getSelectionCriteriaValue().trim().length() > 0) {
			NumberFormat formatter = new DecimalFormat("#0.0000");
			rule.append(" ").append(formatter.format(new BigDecimal(routeRule.getSelectionCriteriaValue())));
		} else if (routeRule.getSelectionCriteria().equalsIgnoreCase("cardPrefix")) {
			rule.append("\"" + routeRule.getSelectionCriteriaValue() + "\"");
		} else {

			rule.append("\"" + routeRule.getSelectionCriteriaValue() + "\"");

		}
	}

	private static Map<String, String> mapper() {
		Map<String, String> map = new HashMap<>();
		map.put(RuleEngineConstant.GREATER, RuleEngineConstant.GREATER_VAL);
		map.put(RuleEngineConstant.AND, RuleEngineConstant.AND_VAL);
		map.put(RuleEngineConstant.EQUAL, RuleEngineConstant.EQUAL_VAL);
		map.put(RuleEngineConstant.OR, RuleEngineConstant.OR_VAL);
		map.put(RuleEngineConstant.NOTEQUAL, RuleEngineConstant.NOTEQUAL_VAL);
		map.put(RuleEngineConstant.LESS, RuleEngineConstant.LESS_VAL);
		map.put(RuleEngineConstant.LESSEQUAL, RuleEngineConstant.LESSEQUAL_VAL);
		map.put(RuleEngineConstant.GREATER_EQUAL, RuleEngineConstant.GREATEREQUAL_VAL);
		map.put(RuleEngineConstant.STARTS_WITH, RuleEngineConstant.STARTS_WITH_VAL);
		return map;
	}

	private static String getLogicalMapping(String key) {
		if (!logicalMap.isEmpty()) {
			return logicalMap.get(key);
		} else {
			logicalMap = mapper();
			return logicalMap.get(key);
		}
	}
}
