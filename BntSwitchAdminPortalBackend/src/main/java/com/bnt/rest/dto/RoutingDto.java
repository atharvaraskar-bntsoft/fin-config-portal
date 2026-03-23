package com.bnt.rest.dto;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class RoutingDto extends BaseDto {

	private String name;

	private String routeDesc;

	private List<RoutingVersionDto> routingVersion;

	private String serviceType;

	private Integer serviceTypeId;

	private boolean ruleActive;

	private String ruletype;

	private String routetype;

	private String routetypevalue;

	public Integer getServiceTypeId() {
		return serviceTypeId;
	}

	public void setServiceTypeId(Integer serviceTypeId) {
		this.serviceTypeId = serviceTypeId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getRouteDesc() {
		return routeDesc;
	}

	public void setRouteDesc(String routeDesc) {
		this.routeDesc = routeDesc;
	}

	public boolean getRuleActive() {
		return ruleActive;
	}

	public void setRuleActive(boolean ruleActive) {
		this.ruleActive = ruleActive;
	}

	public List<RoutingVersionDto> getRoutingVersion() {
		return routingVersion;
	}

	public String getServiceType() {
		return serviceType;
	}

	public void setServiceType(String serviceType) {
		this.serviceType = serviceType;
	}

	public void setRoutingVersion(List<RoutingVersionDto> routingVersion) {
		this.routingVersion = routingVersion;
	}

	public String getRuletype() {
		return ruletype;
	}

	public void setRuletype(String ruletype) {
		this.ruletype = ruletype;
	}

	public String getRoutetype() {
		return routetype;
	}

	public void setRoutetype(String routetype) {
		this.routetype = routetype;
	}

	public String getRoutetypevalue() {
		return routetypevalue;
	}

	public void setRoutetypevalue(String routetypevalue) {
		this.routetypevalue = routetypevalue;
	}

	@Override
	public String toString() {
		return "Routing [name=" + name + ", description=" + routeDesc + ", active=" + ruleActive + ", routingVersion="
				+ routingVersion + "]";
	}
}
