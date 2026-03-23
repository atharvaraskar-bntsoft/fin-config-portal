package com.bnt.rest.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Table(name = "checker")
public class Checker extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Column(name = "comment", nullable = false, length = 45)
	private String comment;

	@Column(name = "status", nullable = false, length = 45)
	private String status;

	@Column(name = "data", nullable = false, length = 45)
	private String data;

	@Column(name = "json", nullable = false, length = 45)
	private String json;

	public String getJson() {
		return json;
	}

	public void setJson(String json) {
		this.json = json;
	}

	@Column(name = "entity_type", nullable = false, length = 45)
	private String entityType;

	@Column(name = "entity_id", nullable = false, length = 45)
	private Integer entityId;

	public Integer getEntityId() {
		return entityId;
	}

	public void setEntityId(Integer entityId) {
		this.entityId = entityId;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getEntityType() {
		return entityType;
	}

	public void setEntityType(String entityType) {
		this.entityType = entityType;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	@Override
	public String toString() {
		return "Checker [comment=" + comment + ", status=" + status + ", data=" + data + ", entityType=" + entityType
				+ ", entityId=" + entityId + "]";
	}
}
