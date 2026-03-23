package com.bnt.ruleengine;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class FieldsWrapper {

	String type;
	Object object;

	public FieldsWrapper(String type, Object operator) {
		super();
		this.type = type;
		this.object = operator;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Object getObject() {
		return object;
	}

	public void setObject(Object object) {
		this.object = object;
	}
}
