package com.bnt.enums;

/**************************
 * @author vaibhav.shejol *
 **************************/

public enum AccoutType {

	SAVINGS_ACCOUNT("SAVINGS_ACCOUNT"),

	CREDIT_ACCOUNT("CREDIT_ACCOUNT");

	private final String value;

	AccoutType(String value) {
		this.value = value;

	}

	public String getValue() {
		return value;
	}

}