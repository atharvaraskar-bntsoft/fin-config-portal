package com.bnt.ruleengine.sample.adp;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class FunctionUI extends MappingMapper {

	private String defaultValue;

	private boolean useSameOnMatchFail;

	private Object value;

	public String getDefaultValue() {
		return defaultValue;
	}

	public void setDefaultValue(String defaultValue) {
		this.defaultValue = defaultValue;
	}

	public boolean isUseSameOnMatchFail() {
		return useSameOnMatchFail;
	}

	public void setUseSameOnMatchFail(boolean useSameOnMatchFail) {
		this.useSameOnMatchFail = useSameOnMatchFail;
	}

	public Object getValue() {
		return value;
	}

	public void setValue(Object value) {
		this.value = value;
	}
}
