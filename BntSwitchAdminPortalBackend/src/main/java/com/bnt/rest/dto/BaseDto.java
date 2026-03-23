package com.bnt.rest.dto;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class BaseDto {

	private Integer id;

	@JsonIgnore
	private Timestamp createdOn;

	@JsonIgnore
	private Integer createdBy;

	@JsonIgnore
	private Timestamp updatedOn;

	@JsonIgnore
	private Integer updatedBy;

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

	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}

	@Override
	public String toString() {
		return id != null ? "[" + id + "]" : "";
	}

	@Override
	public boolean equals(Object obj) {
		if (obj == this) {
			return true;
		}
		if (obj == null || obj.getClass() != this.getClass()) {
			return false;
		}
		BaseDto base = (BaseDto) obj;
		return id.equals(base.id);
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	public void autoGenerateValues(Integer authorId) {
		this.updatedOn = new Timestamp(System.currentTimeMillis());

		// generate createdAt only for new entities
		if (createdOn == null) {
			createdOn = updatedOn;
		}

		updatedBy = authorId;

		if (createdBy == null) {
			createdBy = updatedBy;
		}
	}
}
