package com.bnt.rest.dto;

import java.sql.Timestamp;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import com.bnt.service.mapper.DeploymentMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class DeploymentDto extends BaseDto {

	private String name;

	private Timestamp deployedOn;

	private Timestamp scheduledOn;

	private String status;

	private String statusReason;

	private String errorLog;

	private SwitchClusterDto switchCluster;

	private DeploymentClusterDto deploymentCluster;

	private Integer corePropertyDetailId;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getCorePropertyDetailId() {
		return corePropertyDetailId;
	}

	public void setCorePropertyDetailId(Integer corePropertyDetailId) {
		this.corePropertyDetailId = corePropertyDetailId;
	}

	public List<DeploymentComponentDto> getDeploymentComponent() {
		return deploymentComponent;
	}

	public void setDeploymentComponent(List<DeploymentComponentDto> deploymentComponent) {
		this.deploymentComponent = deploymentComponent;
	}

	private List<DeploymentComponentDto> deploymentComponent;

	private List<DeploymentStatusDto> deploymentStatus;

	@JsonIgnore
	private Set<IdNameVersionTypeWrapper> scheduledAndDeployedInfo;

	public Set<IdNameVersionTypeWrapper> getScheduledAndDeployedInfo() {
		return scheduledAndDeployedInfo;
	}

	public void setScheduledAndDeployedInfo(Set<IdNameVersionTypeWrapper> scheduledAndDeployedInfo) {
		this.scheduledAndDeployedInfo = scheduledAndDeployedInfo;
	}

	public SwitchClusterDto getSwitchCluster() {
		return switchCluster;
	}

	public void setSwitchCluster(SwitchClusterDto switchCluster) {
		this.switchCluster = switchCluster;
	}

	public String getStatusReason() {
		return statusReason;
	}

	public void setStatusReason(String statusReason) {
		this.statusReason = statusReason;
	}

	public String getErrorLog() {
		return errorLog;
	}

	public void setErrorLog(String errorLog) {
		this.errorLog = errorLog;
	}

	public Timestamp getDeployedOn() {
		return deployedOn;
	}

	public void setDeployedOn(Timestamp deployedOn) {
		this.deployedOn = deployedOn;
	}

	public Timestamp getScheduledOn() {
		return scheduledOn;
	}

	public void setScheduledOn(Timestamp scheduledOn) {
		this.scheduledOn = scheduledOn;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public List<DeploymentStatusDto> getDeploymentStatus() {
		return deploymentStatus;
	}

	public void setDeploymentStatus(List<DeploymentStatusDto> deploymentStatus) {
		this.deploymentComponent = DeploymentMapper.convertDeploymentStatusToDTo(deploymentStatus);
		this.deploymentStatus = deploymentStatus;
	}

	public DeploymentClusterDto getDeploymentCluster() {
		return deploymentCluster;
	}

	public void setDeploymentCluster(DeploymentClusterDto deploymentCluster) {
		this.deploymentCluster = deploymentCluster;
	}
}
