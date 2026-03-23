package com.bnt.common.util.exception;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class EntityNotFoundException extends RuntimeException {

	private static final long serialVersionUID = -8508435713156769358L;

	private String message;

	public EntityNotFoundException() {
		super();
	}

	@Override
	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}
