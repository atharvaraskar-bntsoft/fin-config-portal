package com.bnt.common.util.exception;

import org.springframework.http.HttpStatus;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class RippsAdminRestException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	private String message;

	private HttpStatus httpStatus;

	public RippsAdminRestException(String messgae, HttpStatus httpStatus) {
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
