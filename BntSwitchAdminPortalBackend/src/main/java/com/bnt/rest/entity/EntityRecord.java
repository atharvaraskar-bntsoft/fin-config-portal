package com.bnt.rest.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Deprecated(since = "")
// @Where(clause="deleted='0'")
//@Table(name = "entityexport")
public class EntityRecord extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Column(name = "comment")
	private String comment;

	@Column(name = "data", nullable = false)
	private byte[] data;

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public byte[] getData() {
		return data;
	}

	public void setData(byte[] data) {
		this.data = data;
	}
}
