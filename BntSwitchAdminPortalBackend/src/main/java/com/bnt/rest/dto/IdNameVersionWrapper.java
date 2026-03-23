package com.bnt.rest.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class IdNameVersionWrapper {

	private Integer id;

	private String name;

	private Integer version;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getVersion() {
		return version;
	}

	public void setVersion(Integer version) {
		this.version = version;
	}
}
