package com.bnt.rest.wrapper.dto;

import java.util.List;
import java.util.Map;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class Output {

	private String label;

	private String multiple;

	private String editable;

	private List<String> value;

	private List<Map<String, String>> values;

	public List<Map<String, String>> getValues() {
		return values;
	}

	public void setValues(List<Map<String, String>> values) {
		this.values = values;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public String getMultiple() {
		return multiple;
	}

	public void setMultiple(String multiple) {
		this.multiple = multiple;
	}

	public String getEditable() {
		return editable;
	}

	public void setEditable(String editable) {
		this.editable = editable;
	}

	public List<String> getValue() {
		return value;
	}

	public void setValue(List<String> value) {
		this.value = value;
	}
}
