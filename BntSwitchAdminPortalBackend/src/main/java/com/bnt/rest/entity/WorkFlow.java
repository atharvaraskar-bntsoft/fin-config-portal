package com.bnt.rest.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Table(name = "workflow")
public class WorkFlow extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "version", nullable = false)
	private Integer version;

	@Column(name = "workflow_id", nullable = false)
	private Integer workflowId;

	@Column(name = "service_group_json")
	private String serviceGroupJson;

	@Column(name = "deleted", nullable = false)
	private Character deleted;

	@OneToMany(mappedBy = "workFlow", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JsonManagedReference
	private List<WorkFlowServices> workFlowServices;

	@Column(name = "response_code")
	private String responseCode;

	@Column(name = "reverse_condition")
	private String reverseCondition;

	@Column(name = "status")
	private Character status;

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

	public Integer getWorkflowId() {
		return workflowId;
	}

	public void setWorkflowId(Integer workflowId) {
		this.workflowId = workflowId;
	}

	public String getServiceGroupJson() {
		return serviceGroupJson;
	}

	public void setServiceGroupJson(String serviceGroupJson) {
		this.serviceGroupJson = serviceGroupJson;
	}

	public Character getDeleted() {
		return deleted;
	}

	public void setDeleted(Character deleted) {
		this.deleted = deleted;
	}

	public List<WorkFlowServices> getWorkFlowServices() {
		return workFlowServices;
	}

	public void setWorkFlowServices(List<WorkFlowServices> workFlowServices) {
		this.workFlowServices = workFlowServices;
	}

	public String getResponseCode() {
		return responseCode;
	}

	public void setResponseCode(String responseCode) {
		this.responseCode = responseCode;
	}

	public Character getStatus() {
		return status;
	}

	public void setStatus(Character status) {
		this.status = status;
	}

	public String getReverseCondition() {
		return reverseCondition;
	}

	public void setReverseCondition(String reverseCondition) {
		this.reverseCondition = reverseCondition;
	}
}
