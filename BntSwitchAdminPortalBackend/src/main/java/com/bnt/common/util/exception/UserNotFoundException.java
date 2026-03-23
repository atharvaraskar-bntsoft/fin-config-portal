package com.bnt.common.util.exception;

import org.springframework.http.HttpStatus;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class UserNotFoundException extends RuntimeException {

	private static final long serialVersionUID = -1859965282552455246L;

	private final String message;

	private final HttpStatus httpStatus;

	public UserNotFoundException(String messgae, HttpStatus httpStatus) {
		this.message = messgae;
		this.httpStatus = httpStatus;

	}

	@Override
	public String getMessage() {
		return message;
	}

	public HttpStatus getHttpStatus() {
		return httpStatus;
	}
}
