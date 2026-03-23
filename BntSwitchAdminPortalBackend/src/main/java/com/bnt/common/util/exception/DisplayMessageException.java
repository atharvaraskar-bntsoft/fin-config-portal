package com.bnt.common.util.exception;

import org.springframework.http.HttpStatus;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class DisplayMessageException extends AbstractException {

	private static final long serialVersionUID = 215715610579809173L;

	public DisplayMessageException(String messgae, HttpStatus httpStatus) {
		this.setMessage(messgae);
		this.setHttpStatus(httpStatus);
	}

	public DisplayMessageException(String status, String messgae, HttpStatus httpStatus) {
		this.setStatus(status);
		this.setMessage(messgae);
		this.setHttpStatus(httpStatus);
	}

	@Override
	public String toString() {
		return "DisplayMessageException [message=" + this.getMessage() + ", httpStatus=" + this.getHttpStatus() + "]";
	}

}
