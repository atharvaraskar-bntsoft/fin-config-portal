package com.bnt.rest.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class RouteRuleConfigurationDto extends BaseDto {

	@JsonIgnore
	private RouteRuleDto routeRule;

	private String rule;

	private String destination;

	private Integer version;

	private Integer verified;

	public RouteRuleDto getRouteRule() {
		return routeRule;
	}

	public void setRouteRule(RouteRuleDto routeRule) {
		this.routeRule = routeRule;
	}

	public String getRule() {
		return rule;
	}

	public void setRule(String rule) {
		this.rule = rule;
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

	@Override
	public String toString() {
		return "RouteRuleConfigurationDto [routeRule=" + routeRule + ", rule=" + rule + ", destination=" + destination
				+ ", version=" + version + ", verified=" + verified + "]";
	}
}
