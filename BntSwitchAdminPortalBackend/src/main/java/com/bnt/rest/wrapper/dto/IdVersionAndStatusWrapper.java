package com.bnt.rest.wrapper.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class IdVersionAndStatusWrapper {

	private Integer id;

	private Integer version;

	private String jobStatus;

	private boolean isDeployed;

	public boolean isDeployed() {
		return isDeployed;
	}

	public void setDeployed(boolean isDeployed) {
		this.isDeployed = isDeployed;
	}

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

	public String getJobStatus() {
		return jobStatus;
	}

	public void setJobStatus(String string) {
		this.jobStatus = string;
	}
}
