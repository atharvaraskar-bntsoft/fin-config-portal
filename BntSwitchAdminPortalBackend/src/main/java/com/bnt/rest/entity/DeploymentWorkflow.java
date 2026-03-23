package com.bnt.rest.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import org.hibernate.envers.Audited;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Audited
@Entity
@Table(name = "deployment_workflow")
public class DeploymentWorkflow extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Column(name = "component_details")
	private String componentDetailsJson;

	@Column(name = "workflow_json")
	private String workflowJson;

	@Column(name = "deployment_id")
	private int deploymentId;

	@Column(name = "core_properties_id")
	private Integer corePropertyDetailId;

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

	public String getComponentDetailsJson() {
		return componentDetailsJson;
	}

	public void setComponentDetailsJson(String componentDetailsJson) {
		this.componentDetailsJson = componentDetailsJson;
	}

	public int getCorePropertyDetailId() {
		return (null != corePropertyDetailId ? corePropertyDetailId.intValue() : 0);
	}

	public void setCorePropertyDetailId(Integer corePropertyDetailId) {
		this.corePropertyDetailId = corePropertyDetailId;
	}
}
