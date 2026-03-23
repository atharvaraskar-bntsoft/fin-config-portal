package com.bnt.rest.dto;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class RouteRuleDto extends BaseDto {

	private String name;

	private String description;

	private boolean active;

	private String serviceType;

	private List<RouteRuleConfigurationDto> routeRuleConfiguration;

	private boolean isSchedule;

	private boolean isZeroVersion;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public boolean getActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public String getServiceType() {
		return serviceType;
	}

	public void setServiceType(String serviceType) {
		this.serviceType = serviceType;
	}

	public List<RouteRuleConfigurationDto> getRouteRuleConfiguration() {
		return routeRuleConfiguration;
	}

	public void setRouteRuleConfiguration(List<RouteRuleConfigurationDto> routeRuleConfiguration) {
		this.routeRuleConfiguration = routeRuleConfiguration;
	}

	public boolean isSchedule() {
		return isSchedule;
	}

	public boolean isZeroVersion() {
		return isZeroVersion;
	}

	public void setZeroVersion(boolean isZeroVersion) {
		this.isZeroVersion = isZeroVersion;
	}

	public void setSchedule(boolean isSchedule) {
		this.isSchedule = isSchedule;
	}

	@Override
	public String toString() {
		return "RouteRuleDto [name=" + name + ", description=" + description + ", active=" + active + ", serviceType="
				+ serviceType + ", routeRuleConfiguration=" + routeRuleConfiguration + ", isSchedule=" + isSchedule
				+ "]";
	}
}
