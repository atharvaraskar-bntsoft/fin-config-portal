package com.bnt.rest.entity;

import java.math.BigInteger;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Table(name = "ext_etl_job")
public class ExtEtlJob extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Column(name = "job_name")
	private String jobName;

	@Column(name = "description")
	private String description;

	@Column(name = "cron_expression")
	private String cronExpression;

	@Column(name = "destination_id")
	private Integer destinationId;

	@Column(name = "batch_mode")
	private String batchMode;

	@Column(name = "batch_size")
	private Integer batchSize;

	@Column(name = "cron_job")
	private Character cronJob;

	@Column(name = "etl_json")
	private String etlJson;

	@Column(name = "sender_properties")
	private String senderProperties;

	@Column(name = "config_properites")
	private String configProperties;

	@Column(name = "job_class")
	private String jobClass;

	@Column(name = "job_group")
	private String jobGroup;

	@Column(name = "repeat_time")
	private BigInteger repeatTime;

	@Column(name = "active")
	private Character active;

	@Column(name = "deleted")
	private Character deleted;

	@Column(name = "job_status")
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
		this.etlJson = etlJson;
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
