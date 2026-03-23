package com.bnt.rest.dto;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class WorkFlowDto extends BaseDto {

	private String name;

	private Integer version;

	private Integer workflowId;

	private String serviceGroupJson;

	private Character deleted;

	private List<WorkFlowServicesDto> workFlowServices;

	private String responseCode;

	private String reverseCondition;

	private Character status;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getVersion() {
		return version;
	}

	public void setVersion(Integer version) {
		this.version = version;
	}

	public Integer getWorkflowId() {
		return workflowId;
	}

	public void setWorkflowId(Integer workflowId) {
		this.workflowId = workflowId;
	}

	public String getServiceGroupJson() {
		return serviceGroupJson;
	}

	public void setServiceGroupJson(String serviceGroupJson) {
		this.serviceGroupJson = serviceGroupJson;
	}

	public Character getDeleted() {
		return deleted;
	}

	public void setDeleted(Character deleted) {
		this.deleted = deleted;
	}

	public List<WorkFlowServicesDto> getWorkFlowServices() {
		return workFlowServices;
	}

	public void setWorkFlowServices(List<WorkFlowServicesDto> workFlowServices) {
		this.workFlowServices = workFlowServices;
	}

	public String getResponseCode() {
		return responseCode;
	}

	public void setResponseCode(String responseCode) {
		this.responseCode = responseCode;
	}

	public Character getStatus() {
		return status;
	}

	public void setStatus(Character status) {
		this.status = status;
	}

	public String getReverseCondition() {
		return reverseCondition;
	}

	public void setReverseCondition(String reverseCondition) {
		this.reverseCondition = reverseCondition;
	}
}
