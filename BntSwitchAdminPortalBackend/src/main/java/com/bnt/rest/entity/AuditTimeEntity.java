package com.bnt.rest.entity;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;

import org.hibernate.envers.Audited;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

/**************************
 * @author vaibhav.shejol *
 **************************/
/*
 * All entities need to extend this class It provides id generation and audit
 * attributes for all entities It is declared abstract so it cannot be
 * instantiated on its own The @MappedSuperclass annotation implies that there
 * is no corresponding table for this class. However, all the attributes
 * declared in this class are part of the table that corresponds to the
 * inherited entity
 */
@MappedSuperclass
@Audited
public abstract class AuditTimeEntity {

	@Column(name = "created_on", nullable = false, updatable = false)
	@CreatedDate
	private Timestamp createdOn;

	@Column(name = "updated_on")
	@LastModifiedDate
	private Timestamp updatedOn;

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
}
