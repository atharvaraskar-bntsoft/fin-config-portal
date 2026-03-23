package com.bnt.common.util.exception;

import org.springframework.http.HttpStatus;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class TokenException extends AbstractException {

	private static final long serialVersionUID = 8915749360551898758L;

	public TokenException(String messgae, HttpStatus httpStatus) {
		this.setMessage(messgae);
		this.setHttpStatus(httpStatus);
	}

	public TokenException(String status, String messgae, HttpStatus httpStatus) {
		this.setStatus(status);
		this.setMessage(messgae);
		this.setHttpStatus(httpStatus);
	}

	@Override
	public String toString() {
		return "InvalidTokenException [message=" + this.getMessage() + ", httpStatus=" + this.getHttpStatus() + "]";
	}

}
