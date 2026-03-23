package com.bnt.rest.wrapper.dto.workflow;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class WorkFlowUiWrapper {

	private Integer id;

	private String name;

	private Integer version;

	private Integer workflowId;

	private String workflowJson;

	private List<WSGroupJsonWrapper> serviceGroupJson;

	private WSResponseWrapper responseCode;

	private ReverseConditionWrapper reverseCondition;

	private Character status;

	private List<WorkFlowServicesUiWrapper> workFlowServices;

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

	public String getWorkflowJson() {
		return workflowJson;
	}

	public void setWorkflowJson(String workflowJson) {
		this.workflowJson = workflowJson;
	}

	/**
	 * public List<WorkFlowServicesDto> getWorkFlowServices() { return
	 * workFlowServices; }
	 * 
	 * public void setWorkFlowServices(List<WorkFlowServicesDto> workFlowServices) {
	 * this.workFlowServices = workFlowServices; }
	 */

	public List<WSGroupJsonWrapper> getServiceGroupJson() {
		return serviceGroupJson;
	}

	public List<WorkFlowServicesUiWrapper> getWorkFlowServices() {
		return workFlowServices;
	}

	public void setWorkFlowServices(List<WorkFlowServicesUiWrapper> workFlowServices) {
		this.workFlowServices = workFlowServices;
	}

	public void setServiceGroupJson(List<WSGroupJsonWrapper> serviceGroupJson) {
		this.serviceGroupJson = serviceGroupJson;
	}

	public WSResponseWrapper getResponseCode() {
		return responseCode;
	}

	public void setResponseCode(WSResponseWrapper responseCode) {
		this.responseCode = responseCode;
	}

	public Character getStatus() {
		return status;
	}

	public void setStatus(Character status) {
		this.status = status;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public ReverseConditionWrapper getReverseCondition() {
		return reverseCondition;
	}

	public void setReverseCondition(ReverseConditionWrapper reverseCondition) {
		this.reverseCondition = reverseCondition;
	}

}
