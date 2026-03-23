package com.bnt.rest.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import org.hibernate.envers.Audited;

import com.fasterxml.jackson.annotation.JsonBackReference;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Table(name = "deployment_cluster")
@Audited
public class DeploymentCluster extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "deployment_id")
	@JsonBackReference
	private Deployment deploymentId;

	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "switch_cluster_id")
	// @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
	private SwitchCluster switchClusterId;

	@Column(name = "status")
	private String status;

	public Deployment getDeploymentId() {
		return deploymentId;
	}

	public void setDeploymentId(Deployment deploymentId) {
		this.deploymentId = deploymentId;
	}

	public SwitchCluster getSwitchClusterId() {
		return switchClusterId;
	}

	public void setSwitchClusterId(SwitchCluster switchClusterId) {
		this.switchClusterId = switchClusterId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
}
