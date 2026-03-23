package com.bnt.rest.wrapper.dto;

import java.sql.Timestamp;

import com.bnt.constant.HttpConstants;
import com.bnt.enums.EntityGroupEnum;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class CheckerDto {

	private Integer id;

	public Integer getEntityId() {
		return entityId;
	}

	public void setEntityId(Integer entityId) {
		this.entityId = entityId;
	}

	private Integer entityId;

	private String comment;

	private String status;

	private String data;

	private String entityType;

	private String json;

	public String getJson() {
		return json;
	}

	public void setJson(String json) {
		this.json = json;
	}

	private Timestamp createdOn;

	private String createdBy;

	private Timestamp updatedOn;

	private String updatedBy;

	private String operationType;

	private String groupType;

	public String getGroupType() {

		return EntityGroupEnum.findByValue(entityType);
	}

	public String getOperationType() {

		if (entityId != null) {
			operationType = HttpConstants.PUT;
		}

		else {
			operationType = HttpConstants.POST;
		}
		return operationType;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
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

	public String getEntityType() {
		return entityType;
	}

	public void setEntityType(String entityType) {
		this.entityType = entityType;
	}

	public Timestamp getCreatedOn() {
		return createdOn;
	}

	public void setCreatedOn(Timestamp createdOn) {
		this.createdOn = createdOn;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public Timestamp getUpdatedOn() {
		return updatedOn;
	}

	public void setUpdatedOn(Timestamp updatedOn) {
		this.updatedOn = updatedOn;
	}

	public String getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}

	public void setOperationType(String operationType) {
		this.operationType = operationType;
	}

	public void setGroupType(String groupType) {
		this.groupType = groupType;
	}

	@Override
	public String toString() {
		return "CheckerDto [comment=" + comment + ", status=" + status + ", data=" + data + ", entityType=" + entityType
				+ ", createdOn=" + createdOn + ", createdBy=" + createdBy + ", updatedOn=" + updatedOn + ", updatedBy="
				+ updatedBy + "]";
	}
}
