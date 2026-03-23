package com.bnt.rest.wrapper.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class PropertyValueWrapper {

	public String property;

	public String value;

	public PropertyValueWrapper(String property, String value) {
		super();
		this.property = property;
		this.value = value;
	}

	public String getProperty() {
		return property;
	}

	public void setProperty(String property) {
		this.property = property;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}
}
