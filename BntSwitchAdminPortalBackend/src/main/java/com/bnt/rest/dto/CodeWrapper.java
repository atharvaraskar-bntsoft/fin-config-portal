package com.bnt.rest.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class CodeWrapper {

	private String id;

	private String code;

	private String description;

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

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

	public CodeWrapper() {
	}

	public CodeWrapper(String id) {
		this.id = id;
	}

	public CodeWrapper(Integer id) {
		this.id = id.toString();
	}

	public CodeWrapper(String id, String code, String description) {
		super();
		this.id = id;
		this.code = code;
		this.description = description;
	}
}
