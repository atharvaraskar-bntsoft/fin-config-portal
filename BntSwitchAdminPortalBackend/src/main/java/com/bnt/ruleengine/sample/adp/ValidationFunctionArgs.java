package com.bnt.ruleengine.sample.adp;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ValidationFunctionArgs {

	public ValidationFunctionArgs() {
		super();
	}

	public ValidationFunctionArgs(String dataType, String value, String ordinal) {
		super();
		this.dataType = dataType;
		this.value = value;
		this.ordinal = ordinal;
	}

	private String dataType;

	private String value;

	private String ordinal;

	private String name;

	private String displayName;

	public String getDataType() {
		return dataType;
	}

	public void setDataType(String dataType) {
		this.dataType = dataType;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getOrdinal() {
		return ordinal;
	}

	public void setOrdinal(String ordinal) {
		this.ordinal = ordinal;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDisplayName() {
		return displayName;
	}

	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}
}
