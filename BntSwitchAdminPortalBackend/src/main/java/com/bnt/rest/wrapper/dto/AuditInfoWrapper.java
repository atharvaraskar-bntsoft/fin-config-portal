package com.bnt.rest.wrapper.dto;

import java.sql.Timestamp;

import com.bnt.rest.dto.DtoWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class AuditInfoWrapper {

	Timestamp createdOn;

	public Timestamp getCreatedOn() {
		return createdOn;
	}

	public void setCreatedOn(Timestamp createdOn) {
		this.createdOn = createdOn;
	}

	public Timestamp getUpdatedOn() {
		return updatedOn;
	}

	public void setUpdatedOn(Timestamp updatedOn) {
		this.updatedOn = updatedOn;
	}

	public DtoWrapper getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(DtoWrapper createdBy) {
		this.createdBy = createdBy;
	}

	public DtoWrapper getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(DtoWrapper updatedBy) {
		this.updatedBy = updatedBy;
	}

	Timestamp updatedOn;

	DtoWrapper createdBy;

	DtoWrapper updatedBy;
}
