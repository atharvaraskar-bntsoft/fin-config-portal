package com.bnt.common.util.exception;

import org.springframework.http.HttpStatus;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class DuplicateEntryException extends AbstractException {

	private static final long serialVersionUID = 6866226191156597558L;

	public DuplicateEntryException(String messgae, HttpStatus httpStatus) {
		this.setMessage(messgae);
		this.setHttpStatus(httpStatus);
	}

	public DuplicateEntryException(String status, String messgae, HttpStatus httpStatus) {
		this.setStatus(status);
		this.setMessage(messgae);
		this.setHttpStatus(httpStatus);
	}

	@Override
	public String toString() {
		return "DuplicateEntryException [message=" + this.getMessage() + ", httpStatus=" + this.getHttpStatus() + "]";
	}

}
