package com.bnt.rest.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class DtoWrapper {

	private String id;

	private String name;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public DtoWrapper() {

	}

	public DtoWrapper(String id, String name) {
		this.id = id;
		this.name = name;
	}

	public DtoWrapper(Integer id, String name) {
		this.id = id.toString();
		this.name = name;
	}

	public DtoWrapper(String id) {
		this.id = id;
	}

	public DtoWrapper(Integer id) {
		this.id = id.toString();
	}
}
