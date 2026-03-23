package com.bnt.rest.dto;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.bnt.common.util.JsonObjectUtil;
import com.bnt.common.util.StringUtil;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class SafingDto {

	private String id;

	@JsonIgnore
	private String status;

	@JsonProperty("status")
	private IdAndNameStringWrapper statusui;

	private Integer noOfAttempts;

	private Timestamp lastAttemptTime;

	private Timestamp nextAttemptTime;

	// @JsonIgnoreProperties({"active","description","createdOn","createdBy","updatedOn","updatedBy","isSAFEnabled","lookupvalueId","adapterId"})
	private String route;

	private Character deleted;

	@JsonIgnore
	private String dependentData;

	@JsonProperty("dependentData")
	private Object dependentDataUi;

	private String postProcessingAction;

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		IdAndNameStringWrapper idAndNameStringWrapper = new IdAndNameStringWrapper();
		idAndNameStringWrapper.setId(status);
		idAndNameStringWrapper.setName(StringUtil.capitalizeWord(status));
		this.statusui = idAndNameStringWrapper;
		this.status = status;
	}

	public Integer getNoOfAttempts() {
		return noOfAttempts;
	}

	public void setNoOfAttempts(Integer noOfAttempts) {
		this.noOfAttempts = noOfAttempts;
	}

	public Timestamp getLastAttemptTime() {
		return lastAttemptTime;
	}

	public void setLastAttemptTime(Timestamp lastAttemptTime) {
		this.lastAttemptTime = lastAttemptTime;
	}

	public Timestamp getNextAttemptTime() {
		return nextAttemptTime;
	}

	public void setNextAttemptTime(Timestamp nextAttemptTime) {
		this.nextAttemptTime = nextAttemptTime;
	}

	public Character getDeleted() {
		return deleted;
	}

	public void setDeleted(Character deleted) {
		this.deleted = deleted;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getDependentData() {
		return dependentData;
	}

	public void setDependentData(String dependentData) {
		this.dependentDataUi = JsonObjectUtil.getObjectFromJsonString(dependentData);
		this.dependentData = dependentData;
	}

	public Object getDependentDataUi() {
		return dependentDataUi;
	}

	public void setDependentDataUi(Object dependentDataUi) {
		this.dependentData = JsonObjectUtil.getJsonStringFromObject(dependentDataUi);
		this.dependentDataUi = dependentDataUi;
	}

	public IdAndNameStringWrapper getStatusui() {
		return statusui;
	}

	public void setStatusui(IdAndNameStringWrapper statusui) {
		if (statusui != null) {
			this.status = statusui.getId();
		}
		this.statusui = statusui;
	}

	public String getRoute() {
		return route;
	}

	public void setRoute(String route) {
		this.route = route;
	}

	public String getPostProcessingAction() {
		return postProcessingAction;
	}

	public void setPostProcessingAction(String postProcessingAction) {
		this.postProcessingAction = postProcessingAction;
	}
}
