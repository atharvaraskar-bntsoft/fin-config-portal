package com.bnt.common.util.exception;

import org.springframework.http.HttpStatus;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class AbstractException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	private String status;
	private String message;
	private HttpStatus httpStatus;

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;

	}

	@Override
	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public HttpStatus getHttpStatus() {
		return httpStatus;
	}

	public void setHttpStatus(HttpStatus httpStatus) {
		this.httpStatus = httpStatus;
	}

}
