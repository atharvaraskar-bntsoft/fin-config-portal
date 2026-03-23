package com.bnt.rest.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class SecretManagerDto {

	private String secretName;
	private String processName;
	private String endPoint;

	public String getSecretName() {
		return secretName;
	}

	public void setSecretName(String secretName) {
		this.secretName = secretName;
	}

	public String getProcessName() {
		return processName;
	}

	public void setProcessName(String processName) {
		this.processName = processName;
	}

	public String getEndPoint() {
		return endPoint;
	}

	public void setEndPoint(String endPoint) {
		this.endPoint = endPoint;
	}
}
