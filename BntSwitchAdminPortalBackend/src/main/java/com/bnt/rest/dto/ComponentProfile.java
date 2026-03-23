package com.bnt.rest.dto;

import java.util.Map;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ComponentProfile {

	private String componentName;
	private String profile;
	Map<String, String> endpoints;

	public String getComponentName() {
		return componentName;
	}

	public void setComponentName(String componentName) {
		this.componentName = componentName;
	}

	public String getProfile() {
		return profile;
	}

	public void setProfile(String profile) {
		this.profile = profile;
	}

	public Map<String, String> getEndpoints() {
		return endpoints;
	}

	public void setEndpoints(Map<String, String> endpoints) {
		this.endpoints = endpoints;
	}
}
