package com.bnt.rest.wrapper.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class IdAndVersionWrapper {

	private Integer id;

	private Integer version;

	public IdAndVersionWrapper() {

	}

	public IdAndVersionWrapper(Integer id, Integer version) {
		super();
		this.id = id;
		this.version = version;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getVersion() {
		return version;
	}

	public void setVersion(Integer version) {
		this.version = version;
	}
}
