package com.bnt.ruleengine;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import com.bnt.rest.wrapper.dto.IdAndNameWrapper;
import com.bnt.service.mapper.TagsMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ParentDto {

	private String name;

	private String ruleType;

	private boolean active;

	private String description;

	private List<IdAndNameWrapper> destinations;

	private List<Nodes> nodes;

	@JsonProperty("condition")
	private Object conditionUi;

	@JsonIgnore
	private String condition;

	private boolean commit;

	private List<RuleAdditionalInfo> additionalInfo;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<IdAndNameWrapper> getDestinations() {
		return destinations;
	}

	public void setDestinations(List<IdAndNameWrapper> destinations) {
		this.destinations = destinations;
	}

	public List<Nodes> getNodes() {
		return nodes;
	}

	public void setNodes(List<Nodes> nodes) {
		this.nodes = nodes;
	}

	public boolean isCommit() {
		return commit;
	}

	public void setCommit(boolean commit) {
		this.commit = commit;
	}

	public String getRuleType() {
		return ruleType;
	}

	public void setRuleType(String ruleType) {
		this.ruleType = ruleType;
	}

	public List<RuleAdditionalInfo> getAdditionalInfo() {
		return additionalInfo;
	}

	public void setAdditionalInfo(List<RuleAdditionalInfo> additionalInfo) {
		this.additionalInfo = additionalInfo;
	}

	public String getCondition() {
		return condition;
	}

	public void setCondition(String condition) {
		this.conditionUi = TagsMapper.getConditionUiObjectFromConditionString(condition);
		this.condition = condition;
	}

	public Object getConditionUi() {
		return conditionUi;
	}

	public void setConditionUi(Object conditionUi) {
		this.condition = TagsMapper.getConditionStringFromConditionUiObject(conditionUi);
		this.conditionUi = conditionUi;
	}

	@Override
	public String toString() {
		return "ParentDto [name=" + name + ", active=" + active + ", description=" + description + ", destinations="
				+ destinations + ", nodes=" + nodes + "]";
	}
}
