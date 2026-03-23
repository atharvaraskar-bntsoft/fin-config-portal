package com.bnt.rest.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class SystemUserCategoryDto {

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

	public String getDisplayName() {
		return displayName;
	}

	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}

	private String displayName;
}
