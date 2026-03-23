package com.bnt.rest.wrapper.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class FinalWorkflowJsonDto {

	private String workflowRouterId;

	private String workflowRouterConfigurationId;

	private String destinationRouterId;

	private String destinationRouterIdConfigurationId;

	private String workflowsID;

	private String workflowsVersion;

	public String getWorkflowRouterId() {
		return workflowRouterId;
	}

	public void setWorkflowRouterId(String workflowRouterId) {
		this.workflowRouterId = workflowRouterId;
	}

	public String getWorkflowRouterConfigurationId() {
		return workflowRouterConfigurationId;
	}

	public void setWorkflowRouterConfigurationId(String workflowRouterConfigurationId) {
		this.workflowRouterConfigurationId = workflowRouterConfigurationId;
	}

	public String getDestinationRouterId() {
		return destinationRouterId;
	}

	public void setDestinationRouterId(String destinationRouterId) {
		this.destinationRouterId = destinationRouterId;
	}

	public String getDestinationRouterIdConfigurationId() {
		return destinationRouterIdConfigurationId;
	}

	public void setDestinationRouterIdConfigurationId(String destinationRouterIdConfigurationId) {
		this.destinationRouterIdConfigurationId = destinationRouterIdConfigurationId;
	}

	public String getWorkflowsID() {
		return workflowsID;
	}

	public void setWorkflowsID(String workflowsID) {
		this.workflowsID = workflowsID;
	}

	public String getWorkflowsVersion() {
		return workflowsVersion;
	}

	public void setWorkflowsVersion(String workflowsVersion) {
		this.workflowsVersion = workflowsVersion;
	}
}
