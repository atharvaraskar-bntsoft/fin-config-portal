package com.bnt.common.util.exception;

import org.springframework.http.HttpStatus;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class CommonException extends AbstractException {

	private static final long serialVersionUID = 6461081722096687965L;

	public CommonException(String messgae, HttpStatus httpStatus) {
		this.setMessage(messgae);
		this.setHttpStatus(httpStatus);
	}

	public CommonException(String status, String messgae, HttpStatus httpStatus) {
		this.setStatus(status);
		this.setMessage(messgae);
		this.setHttpStatus(httpStatus);
	}

	@Override
	public String toString() {
		return "CommonException [message=" + this.getMessage() + ", httpStatus=" + this.getHttpStatus() + "]";
	}

}
