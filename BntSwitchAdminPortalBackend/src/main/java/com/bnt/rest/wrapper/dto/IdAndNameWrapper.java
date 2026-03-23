package com.bnt.rest.wrapper.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class IdAndNameWrapper {

	private Integer id;

	private String name;

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

	public IdAndNameWrapper(Integer id) {
		this.id = id;
	}

	public IdAndNameWrapper(String id) {
		this.id = Integer.parseInt(id);
	}

	public IdAndNameWrapper() {

	}

	public IdAndNameWrapper(Integer id, String name) {
		this.id = id;
		this.name = name;
	}
}
