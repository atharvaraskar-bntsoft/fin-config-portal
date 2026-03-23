package com.bnt.rest.wrapper.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class IdAndCodeWrapperString {

	private String id;

	@JsonProperty("name")
	private String code;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public IdAndCodeWrapperString(String id) {
		this.id = id;
	}

	public IdAndCodeWrapperString(Integer id) {
		this.id = id.toString();
	}

	public IdAndCodeWrapperString() {

	}
}
