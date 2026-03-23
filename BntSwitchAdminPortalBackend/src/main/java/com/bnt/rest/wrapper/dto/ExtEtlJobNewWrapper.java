package com.bnt.rest.wrapper.dto;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ExtEtlJobNewWrapper {

	private Integer id;

	private String jobName;

	private String jobGroup;

	private List<IdVersionAndStatusWrapper> versions;

	public String getJobName() {
		return jobName;
	}

	public void setJobName(String jobName) {
		this.jobName = jobName;
	}

	public String getJobGroup() {
		return jobGroup;
	}

	public void setJobGroup(String jobGroup) {
		this.jobGroup = jobGroup;
	}

	public List<IdVersionAndStatusWrapper> getVersions() {
		return versions;
	}

	public void setVersions(List<IdVersionAndStatusWrapper> versions) {
		this.versions = versions;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
}
