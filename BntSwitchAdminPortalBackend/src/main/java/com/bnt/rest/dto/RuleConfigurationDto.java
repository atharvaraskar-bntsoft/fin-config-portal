package com.bnt.rest.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class RuleConfigurationDto extends BaseDto {

	@JsonBackReference
	// @JsonManagedReference
	private RuleDto rule;

	private Integer ruleId;

	private String ruleJson;

	private String destination;

	private Integer version;

	private Integer verified;

	private String droolRule;

	public Integer getRuleId() {
		return ruleId;
	}

	public void setRuleId(Integer ruleId) {
		this.ruleId = ruleId;
	}

	public RuleDto getRule() {
		return rule;
	}

	public void setRule(RuleDto rule) {
		this.rule = rule;
	}

	public Character getActive() {
		return active;
	}

	public void setActive(Character active) {
		this.active = active;
	}

	private Character active;

	private String json;

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

	public String getJson() {
		return json;
	}

	public void setJson(String json) {
		this.json = json;
	}

	public String getRuleJson() {
		return ruleJson;
	}

	public void setRuleJson(String ruleJson) {
		this.ruleJson = ruleJson;
	}

	@Override
	public String toString() {
		return "RuleConfigurationDto [id=" + this.getId() + ", rule=" + rule + ", destination=" + destination
				+ ", version=" + version + ", verified=" + verified + ", droolRule=" + droolRule + ", json=" + json
				+ ", createdOn=" + this.getCreatedOn() + ", createdBy=" + this.getCreatedBy() + ", updatedOn="
				+ this.getUpdatedOn() + ", updatedBy=" + this.getUpdatedBy() + "]";
	}
}
