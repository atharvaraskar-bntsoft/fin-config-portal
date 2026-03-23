package com.bnt.rest.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class RuleDto extends BaseDto {

	private String name;

	private String ruleType;

	private String description;

	private Character active;

	private boolean versionable;

	private boolean editable;

	private boolean zeroVersion;

	@JsonManagedReference
	private List<RuleConfigurationDto> ruleConfiguration;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getRuleType() {
		return ruleType;
	}

	public void setRuleType(String ruleType) {
		this.ruleType = ruleType;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Character getActive() {
		return active;
	}

	public void setActive(Character active) {
		this.active = active;
	}

	public boolean isVersionable() {
		return versionable;
	}

	public void setVersionable(boolean versionable) {
		this.versionable = versionable;
	}

	public boolean isEditable() {
		return editable;
	}

	public void setEditable(boolean editable) {
		this.editable = editable;
	}

	public List<RuleConfigurationDto> getRuleConfiguration() {
		return ruleConfiguration;
	}

	public void setRuleConfiguration(List<RuleConfigurationDto> ruleConfiguration) {
		this.ruleConfiguration = ruleConfiguration;
	}

	public boolean isZeroVersion() {
		return zeroVersion;
	}

	public void setZeroVersion(boolean zeroVersion) {
		this.zeroVersion = zeroVersion;
	}

	@Override
	public String toString() {
		return "RouteRuleDto [id=" + this.getId() + ", name=" + name + ", ruleType=" + ruleType + ", description="
				+ description + ", active=" + active + ", versionable=" + versionable + ", editable=" + editable
				+ ", ruleConfiguration=" + ruleConfiguration + "]";
	}
}
