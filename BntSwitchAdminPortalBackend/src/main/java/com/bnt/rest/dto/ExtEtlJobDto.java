package com.bnt.rest.dto;

import java.math.BigInteger;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.bnt.common.util.JsonObjectUtil;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ExtEtlJobDto extends BaseDto {

	private String jobName;

	private String description;

	private String cronExpression;

	private Integer destinationId;

	private String batchMode;

	private Integer batchSize;

	private Character cronJob;

	@JsonIgnore
	private String etlJson;

	@JsonProperty("etlJson")
	private Object etlJsonUi;

	private String senderProperties;

	private String configProperties;

	private String jobClass;

	private String jobGroup;

	private BigInteger repeatTime;

	private Character active;

	private Character deleted;

	private String jobStatus;

	public String getJobName() {
		return jobName;
	}

	public void setJobName(String jobName) {
		this.jobName = jobName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getCronExpression() {
		return cronExpression;
	}

	public void setCronExpression(String cronExpression) {
		this.cronExpression = cronExpression;
	}

	public Integer getDestinationId() {
		return destinationId;
	}

	public void setDestinationId(Integer destinationId) {
		this.destinationId = destinationId;
	}

	public String getBatchMode() {
		return batchMode;
	}

	public void setBatchMode(String batchMode) {
		this.batchMode = batchMode;
	}

	public Integer getBatchSize() {
		return batchSize;
	}

	public void setBatchSize(Integer batchSize) {
		this.batchSize = batchSize;
	}

	public Character getCronJob() {
		return cronJob;
	}

	public void setCronJob(Character cronJob) {
		this.cronJob = cronJob;
	}

	public String getEtlJson() {
		return etlJson;
	}

	public void setEtlJson(String etlJson) {
		this.etlJsonUi = JsonObjectUtil.getObjectFromJsonString(etlJson);
		this.etlJson = etlJson;
	}

	public Object getEtlJsonUi() {
		return etlJsonUi;
	}

	public void setEtlJsonUi(Object etlJsonUi) {
		this.etlJson = JsonObjectUtil.getJsonStringFromObject(etlJsonUi);
		this.etlJsonUi = etlJsonUi;
	}

	public String getSenderProperties() {
		return senderProperties;
	}

	public void setSenderProperties(String senderProperties) {
		this.senderProperties = senderProperties;
	}

	public String getConfigProperties() {
		return configProperties;
	}

	public void setConfigProperties(String configProperties) {
		this.configProperties = configProperties;
	}

	public String getJobClass() {
		return jobClass;
	}

	public void setJobClass(String jobClass) {
		this.jobClass = jobClass;
	}

	public String getJobGroup() {
		return jobGroup;
	}

	public void setJobGroup(String jobGroup) {
		this.jobGroup = jobGroup;
	}

	public BigInteger getRepeatTime() {
		return repeatTime;
	}

	public void setRepeatTime(BigInteger repeatTime) {
		this.repeatTime = repeatTime;
	}

	public Character getActive() {
		return active;
	}

	public void setActive(Character active) {
		this.active = active;
	}

	public Character getDeleted() {
		return deleted;
	}

	public void setDeleted(Character deleted) {
		this.deleted = deleted;
	}

	public String getJobStatus() {
		return jobStatus;
	}

	public void setJobStatus(String jobStatus) {
		this.jobStatus = jobStatus;
	}
}
