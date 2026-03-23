package com.bnt.enums;

/**************************
 * @author vaibhav.shejol *
 **************************/

public enum ErrorCodes {

	ENTITY_NOT_FOUND(10, "Entity not found"),

	SYSTEM_ERROR(36, "System exception occured"),

	JMX_EXCEPTION(37, "Exception with MBean");

	private final int id;

	private final String message;

	ErrorCodes(int id, String message) {
		this.id = id;
		this.message = message;
	}

	public int getId() {
		return this.id;
	}

	public String getMessage() {
		return this.message;
	}
}
