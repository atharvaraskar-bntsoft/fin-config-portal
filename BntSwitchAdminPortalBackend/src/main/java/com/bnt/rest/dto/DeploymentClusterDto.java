package com.bnt.rest.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class DeploymentClusterDto {

	@JsonIgnore
	private DeploymentDto deploymentId;

	private SwitchClusterDto switchClusterId;

	private String status;

	public DeploymentDto getDeploymentId() {
		return deploymentId;
	}

	public void setDeploymentId(DeploymentDto deploymentId) {
		this.deploymentId = deploymentId;
	}

	public SwitchClusterDto getSwitchClusterId() {
		return switchClusterId;
	}

	public void setSwitchClusterId(SwitchClusterDto switchClusterId) {
		this.switchClusterId = switchClusterId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
}
