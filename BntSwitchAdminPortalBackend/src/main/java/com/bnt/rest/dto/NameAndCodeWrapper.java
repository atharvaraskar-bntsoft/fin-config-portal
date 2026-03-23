package com.bnt.rest.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class NameAndCodeWrapper {

	private String id;
	private String name;
	private String code;

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

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public NameAndCodeWrapper() {

	}

	public NameAndCodeWrapper(String id, String name, String code) {
		this.id = id;
		this.name = name;
		this.code = code;
	}

	public NameAndCodeWrapper(String id) {
		this.id = id;
	}

	public NameAndCodeWrapper(Integer id) {
		this.id = id.toString();
	}
}
