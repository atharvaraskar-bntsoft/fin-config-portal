package com.bnt.rest.wrapper.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ConfiguredRouteWrapper {

	Integer priority;

	public Integer getPriority() {
		return priority;
	}

	public void setPriority(Integer priority) {
		this.priority = priority;
	}

	private RuleConfigurationWrapper ruleConfig;

	private RuleWrapper ruleWrapper;

	public RuleConfigurationWrapper getRuleConfig() {
		return ruleConfig;
	}

	public void setRuleConfig(RuleConfigurationWrapper ruleConfig) {
		this.ruleConfig = ruleConfig;
	}

	public RuleWrapper getRuleWrapper() {
		return ruleWrapper;
	}

	public void setRuleWrapper(RuleWrapper ruleWrapper) {
		this.ruleWrapper = ruleWrapper;
	}
}
