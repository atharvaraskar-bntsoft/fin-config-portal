package com.bnt.rest.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import org.hibernate.envers.Audited;

import com.fasterxml.jackson.annotation.JsonBackReference;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Table(name = "deployment_component")
@Audited
public class DeploymentComponent extends BaseEntity {

	private static final long serialVersionUID = 1L;
	@JsonBackReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "deployment_id", referencedColumnName = "id")
	// @AuditJoinTable(name = "deployment_aud")

	private Deployment deployment;

	public Deployment getDeployment() {
		return deployment;
	}

	public void setDeployment(Deployment deployment) {
		this.deployment = deployment;
	}

	@Column(name = "component_type")
	private String componentType;

	@Column(name = "component_id")
	private Integer componentId;

	@Column(name = "component")
	private String componentJson;

	@Column(name = "name")
	private String name;

	@Column(name = "version")
	private Integer version;

	@Column(name = "status")
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
