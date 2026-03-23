package com.bnt.ruleengine.sample.adp;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ValidationFunctionUI {

	private String name;

	private List<ValidationFunctionArgs> listValidationFunctionArgs;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<ValidationFunctionArgs> getListValidationFunctionArgs() {
		return listValidationFunctionArgs;
	}

	public void setListValidationFunctionArgs(List<ValidationFunctionArgs> listValidationFunctionArgs) {
		this.listValidationFunctionArgs = listValidationFunctionArgs;
	}
}
