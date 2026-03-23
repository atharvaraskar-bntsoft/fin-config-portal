package com.bnt.rest.entity;

import java.sql.Timestamp;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;

import org.hibernate.envers.Audited;

import com.fasterxml.jackson.annotation.JsonManagedReference;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Table(name = "deployment")
@Audited
public class Deployment extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Column(name = "scheduled_on")
	private Timestamp scheduledOn;

	@Column(name = "status")
	private String status;

	@Column(name = "status_reason")
	private String statusReason;

	@Column(name = "error_log")
	private String errorLog;

	@Column(name = "name")
	private String name;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "deployment", cascade = CascadeType.ALL)
	@JsonManagedReference
	@OrderBy("version DESC")
	// @AuditJoinTable(name = "deployment_component")
	private List<DeploymentComponent> deploymentComponent;

	@OneToOne(mappedBy = "deploymentId", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JsonManagedReference
	private DeploymentCluster deploymentCluster;

	/**
	 * @ManyToOne
	 * 
	 * @JoinTable(name = "deployment_cluster", joinColumns = {@JoinColumn(name =
	 *                 "fk_deployment_cluster_dep_id", insertable = false, updatable
	 *                 = false, referencedColumnName = "deployment_id")},
	 *                 inverseJoinColumns = {@JoinColumn(name =
	 *                 "fk_deployment_cluster_switch_clus_id", insertable = false,
	 *                 updatable = false, referencedColumnName =
	 *                 "switch_cluster_id")} ) private SwitchCluster switchCluster;
	 */

	public List<DeploymentComponent> getDeploymentComponent() {
		return deploymentComponent;
	}

	public void setDeploymentComponent(List<DeploymentComponent> deploymentComponent) {
		this.deploymentComponent = deploymentComponent;
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

	@Column(name = "deployed_on")
	private Timestamp deployedOn;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Timestamp getScheduledOn() {
		return scheduledOn;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public void setScheduledOn(Timestamp scheduledOn) {
		this.scheduledOn = scheduledOn;
	}

	public Timestamp getDeployedOn() {
		return deployedOn;
	}

	public void setDeployedOn(Timestamp deployedOn) {
		this.deployedOn = deployedOn;
	}

	public DeploymentCluster getDeploymentCluster() {
		return deploymentCluster;
	}

	public void setDeploymentCluster(DeploymentCluster deploymentCluster) {
		this.deploymentCluster = deploymentCluster;
	}
}
