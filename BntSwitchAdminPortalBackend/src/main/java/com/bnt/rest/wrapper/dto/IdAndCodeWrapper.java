package com.bnt.rest.wrapper.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class IdAndCodeWrapper {

	public IdAndCodeWrapper() {

	}

	public IdAndCodeWrapper(Integer id, String code) {
		this.id = id;
		this.code = code;
	}

	private Integer id;

	private String code;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}
}
