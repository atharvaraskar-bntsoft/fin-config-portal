package com.bnt.common.util.exception;

import org.springframework.http.HttpStatus;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class RippsAdminRestMethodException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	private String message;

	private HttpStatus httpStatus;

	private String status;

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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public RippsAdminRestMethodException(String messgae, HttpStatus httpStatus) {
		this.message = messgae;
		this.httpStatus = httpStatus;
	}

	public RippsAdminRestMethodException(String status, String messgae, HttpStatus httpStatus) {
		this.status = status;
		this.message = messgae;
		this.httpStatus = httpStatus;
	}

	@Override
	public String toString() {
		return "RippsAdminRestMethodException [status=" + status + ", message=" + message + ", httpStatus=" + httpStatus
				+ "]";
	}

}
