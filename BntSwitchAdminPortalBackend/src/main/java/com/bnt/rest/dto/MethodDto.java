package com.bnt.rest.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class MethodDto {
	/**
	 * { "methodName":"SIGN_OFF", "beanName": "", "jmxURL":"" }
	 */
	private String methodName;

	private String beanName;

	private String jmxURL;

	private String connectionName;

	public String getMethodName() {
		return methodName;
	}

	public void setMethodName(String methodName) {
		this.methodName = methodName;
	}

	public String getBeanName() {
		return beanName;
	}

	public void setBeanName(String beanName) {
		this.beanName = beanName;
	}

	public String getJmxURL() {
		return jmxURL;
	}

	public void setJmxURL(String jmxURL) {
		this.jmxURL = jmxURL;
	}

	public String getConnectionName() {
		return connectionName;
	}

	public void setConnectionName(String connectionName) {
		this.connectionName = connectionName;
	}
}
