package com.bnt.rest.dto;

import java.sql.Timestamp;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class EntityRecordDto {

	private Integer id;

	private String mdata;

	private String comment;

	private Timestamp createdOn;

	private Integer createdBy;

	private Timestamp updatedOn;

	public String getData() {
		return mdata;
	}

	public void setData(String data) {
		this.mdata = data;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Timestamp getCreatedOn() {
		return createdOn;
	}

	public void setCreatedOn(Timestamp createdOn) {
		this.createdOn = createdOn;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	public Timestamp getUpdatedOn() {
		return updatedOn;
	}

	public void setUpdatedOn(Timestamp updatedOn) {
		this.updatedOn = updatedOn;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}
}
