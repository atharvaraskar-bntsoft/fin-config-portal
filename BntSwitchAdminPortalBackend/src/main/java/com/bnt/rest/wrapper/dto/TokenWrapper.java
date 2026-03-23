package com.bnt.rest.wrapper.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class TokenWrapper {

	private String id;
	private String transactionId;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(String transactionId) {
		this.transactionId = transactionId;
	}

	public boolean isForReview() {
		return forReview;
	}

	public void setForReview(boolean forReview) {
		this.forReview = forReview;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	private boolean forReview;

	private String remarks;

	/** The currency. */
	@JsonProperty(access = com.fasterxml.jackson.annotation.JsonProperty.Access.READ_ONLY)
	private AuditInfoWrapper auditInfo;

	public AuditInfoWrapper getAuditInfo() {
		return auditInfo;
	}

	public void setAuditInfo(AuditInfoWrapper auditInfo) {
		this.auditInfo = auditInfo;
	}
}
