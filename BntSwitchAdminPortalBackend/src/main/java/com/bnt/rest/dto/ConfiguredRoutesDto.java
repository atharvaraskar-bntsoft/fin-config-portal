package com.bnt.rest.dto;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.bnt.rest.wrapper.dto.ConfiguredRouteWrapper;
import com.bnt.rest.wrapper.dto.IdWrapper;
import com.bnt.rest.wrapper.dto.SelectedRule;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ConfiguredRoutesDto extends BaseDto {

	private IdWrapper routingVersion;

	// Refactor this to remove below attribute or rename it to routeruleConfigId to
	// avoid confusion
	private Integer routeRuleConfiguration;

	private Integer routingVersionId;

	public Integer getRoutingVersionId() {
		return routingVersionId;
	}

	public void setRoutingVersionId(Integer routingVersionId) {
		this.routingVersionId = routingVersionId;
	}

	public IdWrapper getRuleConfiguration() {
		return ruleConfiguration;
	}

	public void setRuleConfiguration(IdWrapper ruleConfiguration) {
		this.ruleConfiguration = ruleConfiguration;
	}

	private IdWrapper ruleConfiguration;

	public ConfiguredRouteWrapper getRouteWrapper() {
		return routeWrapper;
	}

	public void setRouteWrapper(ConfiguredRouteWrapper routeWrapper) {
		this.routeWrapper = routeWrapper;
	}

	private ConfiguredRouteWrapper routeWrapper;
	private Integer priority;
	Map<String, Set<String>> ruleRouteLinkingMap = new HashMap<>();
	private List<SelectedRule> selectedRuleList;

	public Map<String, Set<String>> getRuleRouteLinkingMap() {
		return ruleRouteLinkingMap;
	}

	public void setRuleRouteLinkingMap(Map<String, Set<String>> ruleRouteLinkingMap) {
		this.ruleRouteLinkingMap = ruleRouteLinkingMap;
	}

	public IdWrapper getRoutingVersion() {
		return routingVersion;
	}

	public void setRoutingVersion(IdWrapper routingVersion) {
		this.routingVersion = routingVersion;
	}

	public Integer getRouteRuleConfiguration() {
		return routeRuleConfiguration;
	}

	public void setRouteRuleConfiguration(Integer routeRuleConfiguration) {
		this.routeRuleConfiguration = routeRuleConfiguration;
	}

	public Integer getPriority() {
		return priority;
	}

	public void setPriority(Integer priority) {
		this.priority = priority;
	}

	public List<SelectedRule> getSelectedRuleList() {
		return selectedRuleList;
	}

	public void setSelectedRuleList(List<SelectedRule> selectedRuleList) {
		this.selectedRuleList = selectedRuleList;
	}

	@Override
	public String toString() {
		return "ConfiguredRoutesDto [routingVersion=" + routingVersion + ", routeRuleConfiguration="
				+ routeRuleConfiguration + ", priority=" + priority + ", selectedRuleList=" + selectedRuleList + "]";
	}
}
