package com.bnt.rest.wrapper.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**************************
 * @author vaibhav.shejol *
 **************************/

@JsonIgnoreProperties(ignoreUnknown = true)
public class UserAttribute {

	private String region;

	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}
}
