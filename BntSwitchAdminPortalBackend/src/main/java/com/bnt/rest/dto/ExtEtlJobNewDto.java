package com.bnt.rest.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ExtEtlJobNewDto extends BaseDto {

	private String jobName;

	private String jobDesc;

	private String jobGroup;

	private Boolean active;

	private String type;

	private String saveDarft;

	private ExtEtlJobNewDetailDto details;

	public String getJobName() {
		return jobName;
	}

	public void setJobName(String jobName) {
		this.jobName = jobName;
	}

	public String getJobDesc() {
		return jobDesc;
	}

	public void setJobDesc(String jobDesc) {
		this.jobDesc = jobDesc;
	}

	public String getJobGroup() {
		return jobGroup;
	}

	public void setJobGroup(String jobGroup) {
		this.jobGroup = jobGroup;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getSaveDarft() {
		return saveDarft;
	}

	public void setSaveDarft(String saveDarft) {
		this.saveDarft = saveDarft;
	}

	public ExtEtlJobNewDetailDto getDetails() {
		return details;
	}

	public void setDetails(ExtEtlJobNewDetailDto details) {
		this.details = details;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}
}
