package com.bnt.rest.wrapper.dto.workflow;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class WSGroupJsonWrapper {

	private String name;

	private List<WorkFlowServicesUiWrapper> workFlowServices;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<WorkFlowServicesUiWrapper> getWorkFlowServices() {
		return workFlowServices;
	}

	public void setWorkFlowServices(List<WorkFlowServicesUiWrapper> workFlowServices) {
		this.workFlowServices = workFlowServices;
	}

}
