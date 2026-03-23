package com.bnt.rest.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class TxnLogRequestWrapper {

	boolean forReview;

	String message;

	public boolean isForReview() {
		return forReview;
	}

	public void setForReview(boolean forReview) {
		this.forReview = forReview;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}
