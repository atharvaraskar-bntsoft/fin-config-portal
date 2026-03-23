package com.bnt.common.util.exception;

import org.springframework.http.HttpStatus;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class AuthException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	private String status;
	private String message;
	boolean isExpired = false;
	private String email;
	private HttpStatus httpStatus;

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public boolean isExpired() {
		return isExpired;
	}

	public void setExpired(boolean isExpired) {
		this.isExpired = isExpired;
	}

	@Override
	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public AuthException(String message, boolean isExpired, String email, HttpStatus httpStatus) {
		super();
		this.message = message;
		this.isExpired = isExpired;
		this.httpStatus = httpStatus;
		this.email = email;
	}

	public HttpStatus getHttpStatus() {
		return httpStatus;
	}

	public void setHttpStatus(HttpStatus httpStatus) {
		this.httpStatus = httpStatus;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public AuthException(String messgae, HttpStatus httpStatus) {
		this.message = messgae;
		this.httpStatus = httpStatus;
	}

	public AuthException(String status, String messgae, HttpStatus httpStatus) {
		this.status = status;
		this.message = messgae;
		this.httpStatus = httpStatus;
	}

	@Override
	public String toString() {
		return "AuthException [message=" + message + ", httpStatus=" + httpStatus + "]";
	}

}
