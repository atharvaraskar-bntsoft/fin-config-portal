package com.bnt.rest.wrapper.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class IdAndCodeAndPedIdWrapper {

	public IdAndCodeAndPedIdWrapper() {

	}

	public IdAndCodeAndPedIdWrapper(Integer id, String code, String pedId) {
		this.id = id;
		this.code = code;
		this.pedId = pedId;
	}

	private String pedId;

	private Integer id;

	public String getPedId() {
		return pedId;
	}

	public void setPedId(String pedId) {
		this.pedId = pedId;
	}

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
