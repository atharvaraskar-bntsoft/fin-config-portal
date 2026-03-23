package com.bnt.rest.wrapper.dto.adapter.postsaction;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ActionParametersDto {

	private String dataType;

	private String name;

	private List<Object> possibleValue;

	private String displayName;

	private Integer ordinal;

	public String getDataType() {
		return dataType;
	}

	public void setDataType(String dataType) {
		this.dataType = dataType;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Object> getPossibleValue() {
		return possibleValue;
	}

	public void setPossibleValue(List<Object> possibleValue) {
		this.possibleValue = possibleValue;
	}

	public String getDisplayName() {
		return displayName;
	}

	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}

	public Integer getOrdinal() {
		return ordinal;
	}

	public void setOrdinal(Integer ordinal) {
		this.ordinal = ordinal;
	}
}
