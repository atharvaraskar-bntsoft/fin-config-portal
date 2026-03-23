package com.bnt.rest.dto;

import java.util.Date;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class CommentEntityDto {

	private String id;
	private String transactionId;
	private boolean forReview;
	private byte[] remarks;
	private Date createdOn;
	private Date updatedOn;
	private String createdBy;
	private String updatedBy;

	public String getTransactionId() {
		return this.transactionId;
	}

	public void setTransactionId(String transactionId) {
		this.transactionId = transactionId;
	}

	public boolean isForReview() {
		return this.forReview;
	}

	public void setForReview(boolean forReview) {
		this.forReview = forReview;
	}

	public byte[] getRemarks() {
		return this.remarks;
	}

	public void setRemarks(byte[] remarks) {
		this.remarks = remarks;
	}

	public Date getCreatedOn() {
		return this.createdOn;
	}

	public void setCreatedOn(Date createdOn) {
		this.createdOn = createdOn;
	}

	public Date getUpdatedOn() {
		return this.updatedOn;
	}

	public void setUpdatedOn(Date updatedOn) {
		this.updatedOn = updatedOn;
	}

	public String getCreatedBy() {
		return this.createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public String getUpdatedBy() {
		return this.updatedBy;
	}

	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}
}
