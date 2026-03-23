package com.bnt.rest.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class WorkflowWrapper {

	private Integer id;

	private String workFlowId;

	private Integer workflowgroupId;

	private String name;

	private String responseCodeIdRule;

	public String getResponseCodeIdRule() {
		return responseCodeIdRule;
	}

	public void setResponseCodeIdRule(String responseCodeIdRule) {
		this.responseCodeIdRule = responseCodeIdRule;
	}

	@JsonProperty("default")
	private boolean defaultStr;

	@JsonProperty("enabled")
	private boolean enabled;

	private List<ServiceDto> services;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public boolean getDefaultStr() {
		return defaultStr;
	}

	public void setDefaultStr(boolean defaultStr) {
		this.defaultStr = defaultStr;
	}

	public boolean getEnabled() {
		return enabled;
	}

	public void setEnable(boolean enabled) {
		this.enabled = enabled;
	}

	public List<ServiceDto> getServices() {
		return services;
	}

	public void setServices(List<ServiceDto> services) {
		this.services = services;
	}

	public Integer getWorkflowgroupId() {
		return workflowgroupId;
	}

	public void setWorkflowgroupId(Integer workflowgroupId) {
		this.workflowgroupId = workflowgroupId;
	}

	public String getWorkFlowId() {
		return workFlowId;
	}

	public void setWorkFlowId(String workFlowId) {
		this.workFlowId = workFlowId;
	}

	/**
	 * public void setEnabled(boolean enabled) { this.enabled = enabled; }
	 */

	@Override
	public String toString() {
		return "WorkflowDto [id=" + id + ", workFlowId=" + workFlowId + ", workflowgroupId=" + workflowgroupId
				+ ", name=" + name + ", responseCodeIdRule=" + responseCodeIdRule + ", defaultStr=" + defaultStr
				+ ", enabled=" + enabled + ", services=" + services + "]";
	}
}
