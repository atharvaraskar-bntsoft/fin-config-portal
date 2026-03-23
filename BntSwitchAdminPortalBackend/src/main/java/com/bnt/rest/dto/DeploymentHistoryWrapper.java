package com.bnt.rest.dto;

import java.sql.Timestamp;

import com.bnt.bswitch.shared.lib.entities.StringUtil;
import com.bnt.common.util.DateUtil;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class DeploymentHistoryWrapper {

	private Integer version;
	private Timestamp lastModified;
	private String status;
	private String message = "";

	public Integer getVersion() {
		return version;
	}

	public void setVersion(Integer version) {
		this.version = version;
	}

	public Timestamp getLastModified() {
		return lastModified;
	}

	public void setLastModified(Timestamp lastModified) {
		this.lastModified = lastModified;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public DeploymentHistoryWrapper() {
		this.message = "Never deployed";
	}

	public DeploymentHistoryWrapper(String message) {
		this.message = message;
	}

	public DeploymentHistoryWrapper(String status, Integer versionDeployed, Timestamp deployedOn) {
		this.version = versionDeployed;
		this.lastModified = deployedOn;
		this.status = status;
	}

	public void setLatestHistoryMessage(String status) {
		// later,we will check condition based on status and change deployedOn variable
		// name with lastModifiedName
		if (!(StringUtil.isEmptyOrNull(status))) {
			this.message = "Version " + ":" + this.version + " " + this.status + " On:"
					+ DateUtil.getDateFormatUI(this.lastModified.getTime());
		} else
			this.message = "Never deployed";
	}
}
