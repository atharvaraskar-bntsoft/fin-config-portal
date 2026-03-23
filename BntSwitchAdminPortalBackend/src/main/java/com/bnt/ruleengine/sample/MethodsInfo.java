package com.bnt.ruleengine.sample;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class MethodsInfo {

	private String methodName;

	private String returnType;

	private List<ParameterDetails> parameters;

	public String getMethodName() {
		return methodName;
	}

	public void setMethodName(String methodName) {
		this.methodName = methodName;
	}

	public String getReturnType() {
		return returnType;
	}

	public void setReturnType(String returnType) {
		this.returnType = returnType;
	}

	public List<ParameterDetails> getParameters() {
		return parameters;
	}

	public void setParameters(List<ParameterDetails> parameters) {
		this.parameters = parameters;
	}
}
