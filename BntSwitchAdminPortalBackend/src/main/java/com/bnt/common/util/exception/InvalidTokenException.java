package com.bnt.common.util.exception;

import org.springframework.http.HttpStatus;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class InvalidTokenException extends AbstractException {

	private static final long serialVersionUID = 8198123841273060276L;

	public InvalidTokenException(String messgae, HttpStatus httpStatus) {
		this.setMessage(messgae);
		this.setHttpStatus(httpStatus);
	}

	public InvalidTokenException(String status, String messgae, HttpStatus httpStatus) {
		this.setStatus(status);
		this.setMessage(messgae);
		this.setHttpStatus(httpStatus);
	}

	@Override
	public String toString() {
		return "InvalidTokenException [message=" + this.getMessage() + ", httpStatus=" + this.getHttpStatus() + "]";
	}

}
