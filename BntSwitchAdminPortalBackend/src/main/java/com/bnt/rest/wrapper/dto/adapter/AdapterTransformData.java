package com.bnt.rest.wrapper.dto.adapter;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class AdapterTransformData {

	private String id;

	private String name;

	private Object possibleValue;

	private String parentField;

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

	public Object getPossibleValue() {
		return possibleValue;
	}

	public void setPossibleValue(Object possibleValue) {
		this.possibleValue = possibleValue;
	}

	public String getParentField() {
		return parentField;
	}

	public void setParentField(String parentField) {
		this.parentField = parentField;
	}

}
