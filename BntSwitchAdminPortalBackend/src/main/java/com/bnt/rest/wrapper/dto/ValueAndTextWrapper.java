package com.bnt.rest.wrapper.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ValueAndTextWrapper {

	private String value;

	private String text;

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

	public ValueAndTextWrapper() {

	}

	public ValueAndTextWrapper(String value) {
		this.value = value;
	}

	public ValueAndTextWrapper(Integer value) {
		this.value = value.toString();
	}

	public ValueAndTextWrapper(String value, String text) {
		this.value = value;
		this.text = text;
	}
}
