package com.bnt.rest.entity;

import java.io.Serializable;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Table(name = "comment")
public class CommentEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	private String transactionId;
	private boolean forReview;
	private byte[] remarks;
	private Date createdOn;
	private Date updatedOn;
	private String createdBy;
	private String updatedBy;

	@Column(name = "transaction_id")
	public String getTransactionId() {
		return this.transactionId;
	}

	public void setTransactionId(String transactionId) {
		this.transactionId = transactionId;
	}

	@Column(name = "for_review")
	public boolean isForReview() {
		return this.forReview;
	}

	public void setForReview(boolean forReview) {
		this.forReview = forReview;
	}

	@Column(name = "remarks")
	public byte[] getRemarks() {
		return this.remarks;
	}

	public void setRemarks(byte[] remarks) {
		this.remarks = remarks;
	}

	@Column(name = "created_on")
	public Date getCreatedOn() {
		return this.createdOn;
	}

	public void setCreatedOn(Date createdOn) {
		this.createdOn = createdOn;
	}

	@Column(name = "updated_on")
	public Date getUpdatedOn() {
		return this.updatedOn;
	}

	public void setUpdatedOn(Date updatedOn) {
		this.updatedOn = updatedOn;
	}

	@Column(name = "created_by")
	public String getCreatedBy() {
		return this.createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	@Column(name = "updated_by")
	public String getUpdatedBy() {
		return this.updatedBy;
	}

	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}
}
