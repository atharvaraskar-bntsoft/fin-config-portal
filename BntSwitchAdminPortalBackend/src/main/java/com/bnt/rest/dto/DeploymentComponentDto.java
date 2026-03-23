package com.bnt.rest.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class DeploymentComponentDto extends BaseDto {

	@JsonIgnore
	private DeploymentDto deployment;

	private String componentType;

	private String name;

	private Integer version;

	private String status;

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

	private Integer componentId;

	private String componentJson;

	public DeploymentDto getDeployment() {
		return deployment;
	}

	public void setDeployment(DeploymentDto deployment) {
		this.deployment = deployment;
	}

	public String getComponentType() {
		return componentType;
	}

	public void setComponentType(String componentType) {
		this.componentType = componentType;
	}

	public Integer getComponentId() {
		return componentId;
	}

	public void setComponentId(Integer componentId) {
		this.componentId = componentId;
	}

	public String getComponentJson() {
		return componentJson;
	}

	public void setComponentJson(String componentJson) {
		this.componentJson = componentJson;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
}
