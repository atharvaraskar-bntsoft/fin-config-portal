package com.bnt.rest.dto;

import com.bnt.rest.entity.ExtEtlJobNew;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ExtEtlJobNewListDto extends BaseDto {

	private Integer id;
	private String type;
	private String version;
	private String jobName;
	private String jobStatus;
	private ExtEtlJobNew extEtlJobNew;

	public ExtEtlJobNew getExtEtlJobNew() {
		return extEtlJobNew;
	}

	public void setExtEtlJobNew(ExtEtlJobNew extEtlJobNew) {
		this.extEtlJobNew = extEtlJobNew;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getJobName() {
		return jobName;
	}

	public void setJobName(String jobName) {
		this.jobName = jobName;
	}

	public String getJobStatus() {
		return jobStatus;
	}

	public void setJobStatus(String jobStatus) {
		this.jobStatus = jobStatus;
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String data) {
		this.version = data;
	}
}
