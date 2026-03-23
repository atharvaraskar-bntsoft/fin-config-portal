package com.bnt.rest.dto;

import java.io.Serializable;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ScheduledReportsDto implements Serializable {

	private static final long serialVersionUID = 1L;

	private Integer id;

	private String entityType;

	private String entityName;

	private String dateCreated;

	private String reportType;

	private String action;

	public String getEntityType() {
		return entityType;
	}

	public void setEntityType(String entityType) {
		this.entityType = entityType;
	}

	public String getEntityName() {
		return entityName;
	}

	public void setEntityName(String entityName) {
		this.entityName = entityName;
	}

	public String getDateCreated() {
		return dateCreated;
	}

	public void setDateCreated(String dateCreated) {
		this.dateCreated = dateCreated;
	}

	public String getReportType() {
		return reportType;
	}

	public void setReportType(String reportType) {
		this.reportType = reportType;
	}

	public String getAction() {
		return action;
	}

	public void setAction(String action) {
		this.action = action;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@Override
	public String toString() {
		return "ScheduledReportsDto [entityType=" + entityType + ", entityName=" + entityName + ", dateCreated="
				+ dateCreated + ", reportType=" + reportType + ", action=" + action + "]";
	}
}
