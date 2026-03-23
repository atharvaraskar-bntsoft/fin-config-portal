package com.bnt.rest.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class DeploymentWorkflowDto extends BaseDto {

	private String workflowJson;

	private String componentDetailsJson;

	private Integer corePropertyDetailId;

	public String getComponentDetailsJson() {
		return componentDetailsJson;
	}

	public void setComponentDetailsJson(String componentDetailsJson) {
		this.componentDetailsJson = componentDetailsJson;
	}

	private int deploymentId;

	private DeploymentDto deploymentDto;

	public DeploymentDto getDeploymentDto() {
		return deploymentDto;
	}

	public void setDeploymentDto(DeploymentDto deploymentDto) {
		this.deploymentDto = deploymentDto;
	}

	public String getWorkflowJson() {
		return workflowJson;
	}

	public void setWorkflowJson(String workflowJson) {
		this.workflowJson = workflowJson;
	}

	public int getDeploymentId() {
		return deploymentId;
	}

	public void setDeploymentId(int deploymentId) {
		this.deploymentId = deploymentId;
	}

	public Integer getCorePropertyDetailId() {
		return corePropertyDetailId;
	}

	public void setCorePropertyDetailId(Integer corePropertyDetailId) {
		this.corePropertyDetailId = corePropertyDetailId;
	}
}
