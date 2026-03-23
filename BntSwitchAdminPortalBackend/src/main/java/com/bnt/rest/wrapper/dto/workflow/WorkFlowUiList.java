package com.bnt.rest.wrapper.dto.workflow;

import java.util.List;

import com.bnt.rest.dto.WorkFlowServicesDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class WorkFlowUiList {

	private Integer id;

	private Integer version;

	private String name;

	private String serviceName;

	List<WorkFlowServicesDto> serviceTree;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getVersion() {
		return version;
	}

	public void setVersion(Integer version) {
		this.version = version;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getServiceName() {
		return serviceName;
	}

	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}

	public List<WorkFlowServicesDto> getServiceTree() {
		return serviceTree;
	}

	public void setServiceTree(List<WorkFlowServicesDto> serviceTree) {
		this.serviceTree = serviceTree;
	}

}
