package com.bnt.rest.wrapper.dto.workflow;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ReverseConditionWrapper {

	private Object reverseCondition;

	private List<String> services;

	public Object getReverseCondition() {
		return reverseCondition;
	}

	public void setReverseCondition(Object reverseCondition) {
		this.reverseCondition = reverseCondition;
	}

	public List<String> getServices() {
		return services;
	}

	public void setServices(List<String> services) {
		this.services = services;
	}

}
