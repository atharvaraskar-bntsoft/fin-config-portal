package com.bnt.ruleengine;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.fasterxml.jackson.annotation.JsonSetter;

/**************************
 * @author vaibhav.shejol *
 **************************/

@JsonPropertyOrder({ "type", "fieldName", "value" })
public class NodeType3 extends NodeType1 {

	private String fieldName;
	private String value;

	@JsonCreator
	public NodeType3(String type, String fieldName, String value) {
		super();
		this.setType(type);
		this.fieldName = fieldName;
		this.value = value;
	}

	public String getFieldName() {
		return fieldName;
	}

	@JsonSetter
	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}

	public String getValue() {
		return value;
	}

	@JsonSetter
	public void setValue(String value) {
		this.value = value;
	}
}
