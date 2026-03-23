package com.bnt.common.util.exception;

import org.springframework.http.HttpStatus;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class AccessDeniedException extends Exception {

	private static final long serialVersionUID = 1L;
	private String status;
	private final String message;
	private final HttpStatus httpStatus;

	public String getStatus() {
		return status;
	}

	@Override
	public String getMessage() {
		return message;
	}

	public HttpStatus getHttpStatus() {
		return httpStatus;
	}

	public AccessDeniedException(String messgae, HttpStatus httpStatus) {
		this.message = messgae;
		this.httpStatus = httpStatus;
	}

	public AccessDeniedException(String status, String messgae, HttpStatus httpStatus) {
		this.status = status;
		this.message = messgae;
		this.httpStatus = httpStatus;
	}

	@Override
	public String toString() {
		return "AccessDeniedException [message=" + message + ", httpStatus=" + httpStatus + "]";
	}

}
