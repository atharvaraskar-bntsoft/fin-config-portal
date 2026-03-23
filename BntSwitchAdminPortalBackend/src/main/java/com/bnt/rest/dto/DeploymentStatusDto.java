package com.bnt.rest.dto;

import java.sql.Timestamp;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.bnt.rest.wrapper.dto.IdAndVersionWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class DeploymentStatusDto {

	private Integer id;

	public Integer getId() {
		return id;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((componentName == null) ? 0 : componentName.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		DeploymentStatusDto other = (DeploymentStatusDto) obj;
		if (componentName == null) {
			if (other.componentName != null)
				return false;
		} else if (!componentName.equals(other.componentName))
			return false;
		return true;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	private Integer componentId;

	public Integer getComponentId() {
		return componentId;
	}

	public void setComponentId(Integer componentId) {
		this.componentId = componentId;
	}

	private String componentName;

	private String componentType;

	private String componentTypeShowOnUI;

	public String getComponentTypeShowOnUI() {
		return componentTypeShowOnUI;
	}

	public void setComponentTypeShowOnUI(String componentTypeShowOnUI) {
		this.componentTypeShowOnUI = componentTypeShowOnUI;
	}

	private Integer currentVersion;

	private DeploymentHistoryWrapper lastDeploymentHistory;

	@JsonIgnore
	private List<DeploymentHistoryWrapper> deploymentHistory;

	private List<IdAndVersionWrapper> idVersionListToSchedule;

	public List<IdAndVersionWrapper> getIdVersionListToSchedule() {
		return idVersionListToSchedule;
	}

	public void setIdVersionListToSchedule(List<IdAndVersionWrapper> idVersionListToSchedule) {
		this.idVersionListToSchedule = idVersionListToSchedule;
	}

	public DeploymentHistoryWrapper getLastDeploymentHistory() {
		return lastDeploymentHistory;
	}

	public List<DeploymentHistoryWrapper> getDeploymentHistory() {
		return deploymentHistory;
	}

	public void setLastDeploymentHistory(DeploymentHistoryWrapper lastDeploymentHistory) {
		this.lastDeploymentHistory = lastDeploymentHistory;
	}

	public void setDeploymentHistory(List<DeploymentHistoryWrapper> deploymentHistory) {
		this.deploymentHistory = deploymentHistory;
	}

	private Timestamp lastModifiedOn;

	private Integer lastModifiedBy;

	private String status;

	public String getComponentName() {
		return componentName;
	}

	public void setComponentName(String componentName) {
		this.componentName = componentName;
	}

	public String getComponentType() {
		return componentType;
	}

	public void setComponentType(String componentType) {
		this.componentType = componentType;
	}

	public Integer getCurrentVersion() {
		return currentVersion;
	}

	public void setCurrentVersion(Integer currentVersion) {
		this.currentVersion = currentVersion;
	}

	public Timestamp getLastModifiedOn() {
		return lastModifiedOn;
	}

	public void setLastModifiedOn(Timestamp lastModifiedOn) {
		this.lastModifiedOn = lastModifiedOn;
	}

	public Integer getLastModifiedBy() {
		return lastModifiedBy;
	}

	public void setLastModifiedBy(Integer lastModifiedBy) {
		this.lastModifiedBy = lastModifiedBy;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	private String userName;

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}
}
