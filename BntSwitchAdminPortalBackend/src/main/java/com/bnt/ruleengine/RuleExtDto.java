package com.bnt.ruleengine;

import java.sql.Timestamp;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.bnt.rest.dto.RuleConfigurationDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class RuleExtDto {
	private Integer id;

	private String name;

	private String ruleType;

	private String description;

	private Character active;

	private boolean versionable;

	private boolean editable;

	private boolean zeroVersion;

	private List<RuleConfigurationDto> ruleConfiguration;

	private String routerName;

	private Integer routerId;

	private Integer routerVersion;

	private boolean routerStatus;

	public String getRouterName() {
		return routerName;
	}

	public void setRouterName(String routerName) {
		this.routerName = routerName;
	}

	public Integer getRouterVersion() {
		return routerVersion;
	}

	public void setRouterVersion(Integer routerVersion) {
		this.routerVersion = routerVersion;
	}

	public boolean getRouterStatus() {
		return routerStatus;
	}

	public void setRouterStatus(boolean routerStatus) {
		this.routerStatus = routerStatus;
	}

	@JsonIgnore
	private Timestamp createdOn;

	@JsonIgnore
	private Integer createdBy;

	@JsonIgnore
	private Timestamp updatedOn;

	@JsonIgnore
	private Integer updatedBy;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

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

	public Timestamp getCreatedOn() {
		return createdOn;
	}

	public void setCreatedOn(Timestamp createdOn) {
		this.createdOn = createdOn;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	public Timestamp getUpdatedOn() {
		return updatedOn;
	}

	public void setUpdatedOn(Timestamp updatedOn) {
		this.updatedOn = updatedOn;
	}

	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}

	public boolean isZeroVersion() {
		return zeroVersion;
	}

	public void setZeroVersion(boolean zeroVersion) {
		this.zeroVersion = zeroVersion;
	}

	public Integer getRouterId() {
		return routerId;
	}

	public void setRouterId(Integer routerId) {
		this.routerId = routerId;
	}

	@Override
	public String toString() {
		return "RouteRuleDto [id=" + id + ", name=" + name + ", ruleType=" + ruleType + ", description=" + description
				+ ", active=" + active + ", versionable=" + versionable + ", editable=" + editable
				+ ", ruleConfiguration=" + ruleConfiguration + "]";
	}
}
