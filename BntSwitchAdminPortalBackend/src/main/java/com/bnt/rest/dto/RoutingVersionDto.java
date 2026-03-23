package com.bnt.rest.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.bnt.rest.wrapper.dto.ConfigureRouteRuleWrapper;
import com.bnt.rest.wrapper.dto.SelectedRule;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class RoutingVersionDto extends BaseDto {

	@JsonIgnore
	private RoutingDto routing;

	private Integer version;

	@JsonIgnore
	private ConfigureRouteRuleWrapper routeRuleMapper;

	@JsonProperty("live")
	private boolean status;

	private List<SelectedRule> selectedRuleList;

	private List<ConfiguredRoutesDto> configuredRoutes;

	public ConfigureRouteRuleWrapper getRouteRuleMapper() {
		return routeRuleMapper;
	}

	public void setRouteRuleMapper(ConfigureRouteRuleWrapper routeRuleMapper) {
		this.routeRuleMapper = routeRuleMapper;
	}

	public RoutingDto getRouting() {
		return routing;
	}

	public void setRouting(RoutingDto routing) {
		this.routing = routing;
	}

	public Integer getVersion() {
		return version;
	}

	public void setVersion(Integer version) {
		this.version = version;
	}

	public List<ConfiguredRoutesDto> getConfiguredRoutes() {
		return configuredRoutes;
	}

	public void setConfiguredRoutes(List<ConfiguredRoutesDto> configuredRoutes) {
		this.configuredRoutes = configuredRoutes;
	}

	public boolean getStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public List<SelectedRule> getSelectedRuleList() {
		return selectedRuleList;
	}

	public void setSelectedRuleList(List<SelectedRule> selectedRuleList) {
		this.selectedRuleList = selectedRuleList;
	}

	@Override
	public String toString() {
		return "RoutingVersionDto [routing=" + routing + ", version=" + version + ", status=" + status
				+ ", selectedRuleList=" + selectedRuleList + ", configuredRoutes=" + configuredRoutes + "]";
	}
}
