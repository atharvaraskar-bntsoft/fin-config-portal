package com.bnt.rest.wrapper.dto;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ServiceConditionDto {

	// lookup-value-list/SERVICE_TYPE
	private List<String> service;

	private List<Fields> fields;

	public ServiceConditionDto(List<String> service, List<Fields> fields) {
		super();
		this.service = service;
		this.fields = fields;
	}

	public ServiceConditionDto() {
		super();
	}

	public List<String> getService() {
		return service;
	}

	public void setService(List<String> service) {
		this.service = service;
	}

	public List<Fields> getFields() {
		return fields;
	}

	public void setFields(List<Fields> fields) {
		this.fields = fields;
	}
}
