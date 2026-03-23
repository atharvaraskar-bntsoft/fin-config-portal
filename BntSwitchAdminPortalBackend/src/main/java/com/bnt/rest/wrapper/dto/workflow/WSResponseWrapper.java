package com.bnt.rest.wrapper.dto.workflow;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class WSResponseWrapper {

	private String type;
	private String value;
	private String text;

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}
}
