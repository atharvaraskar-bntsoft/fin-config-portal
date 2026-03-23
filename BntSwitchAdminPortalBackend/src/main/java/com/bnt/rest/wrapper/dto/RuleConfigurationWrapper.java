package com.bnt.rest.wrapper.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class RuleConfigurationWrapper {

	private String ruleJson;
	private Integer ruleId;

	public String getRuleJson() {
		return ruleJson;
	}

	public void setRuleJson(String ruleJson) {
		this.ruleJson = ruleJson;
	}

	public Integer getRuleId() {
		return ruleId;
	}

	public void setRuleId(Integer ruleId) {
		this.ruleId = ruleId;
	}

	public String getDestination() {
		return destination;
	}

	public void setDestination(String destination) {
		this.destination = destination;
	}

	public Integer getVersion() {
		return version;
	}

	public void setVersion(Integer version) {
		this.version = version;
	}

	public Integer getVerified() {
		return verified;
	}

	public void setVerified(Integer verified) {
		this.verified = verified;
	}

	public String getDroolRule() {
		return droolRule;
	}

	public void setDroolRule(String droolRule) {
		this.droolRule = droolRule;
	}

	public Character getActive() {
		return active;
	}

	public void setActive(Character active) {
		this.active = active;
	}

	public String getJson() {
		return json;
	}

	public void setJson(String json) {
		this.json = json;
	}

	private String destination;

	private Integer version;

	private Integer verified;

	private String droolRule;

	private Character active;

	private String json;
}
