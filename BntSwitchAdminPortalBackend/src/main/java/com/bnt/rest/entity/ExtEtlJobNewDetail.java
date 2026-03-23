package com.bnt.rest.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Table(name = "ext_etl_job_detail")
public class ExtEtlJobNewDetail extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@ManyToOne(cascade = CascadeType.MERGE)
	@JoinColumn(name = "ext_etl_job_id")
	private ExtEtlJobNew extEtlJobId;

	@Column(name = "version")
	private String version;

	@Column(name = "batch_mode")
	private String batchMode;

	@Column(name = "batch_size")
	private String batchSize;

	@Column(name = "job_class")
	private String jobClass;

	@Column(name = "cron_exp")
	private String cornExp;

	@Column(name = "cron_job")
	private String cronJob;

	@Column(name = "repeat_time")
	private String repeatTime;

	@Column(name = "job_status")
	private String jobStatus;

	@Column(name = "etl_json")
	private String etlJson;

	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "imf_id")
	private ImfStructure imfId;

	@Column(name = "packager")
	private String packager;

	@Column(name = "request_mapping")
	private String requestMapping;

	@Column(name = "ui_mapping")
	private String uiMapping;

	public ExtEtlJobNew getExtEtlJobId() {
		return extEtlJobId;
	}

	public void setExtEtlJobId(ExtEtlJobNew extEtlJobId) {
		this.extEtlJobId = extEtlJobId;
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public String getBatchMode() {
		return batchMode;
	}

	public void setBatchMode(String batchMode) {
		this.batchMode = batchMode;
	}

	public String getBatchSize() {
		return batchSize;
	}

	public void setBatchSize(String batchSize) {
		this.batchSize = batchSize;
	}

	public String getJobClass() {
		return jobClass;
	}

	public void setJobClass(String jobClass) {
		this.jobClass = jobClass;
	}

	public String getCornExp() {
		return cornExp;
	}

	public void setCornExp(String cornExp) {
		this.cornExp = cornExp;
	}

	public String getCronJob() {
		return cronJob;
	}

	public void setCronJob(String cronJob) {
		this.cronJob = cronJob;
	}

	public String getRepeatTime() {
		return repeatTime;
	}

	public void setRepeatTime(String repeatTime) {
		this.repeatTime = repeatTime;
	}

	public String getJobStatus() {
		return jobStatus;
	}

	public void setJobStatus(String jobStatus) {
		this.jobStatus = jobStatus;
	}

	public String getEtlJson() {
		return etlJson;
	}

	public void setEtlJson(String etlJson) {
		this.etlJson = etlJson;
	}

	public String getPackager() {
		return packager;
	}

	public void setPackager(String packager) {
		this.packager = packager;
	}

	public String getRequestMapping() {
		return requestMapping;
	}

	public void setRequestMapping(String requestMapping) {
		this.requestMapping = requestMapping;
	}

	public String getUiMapping() {
		return uiMapping;
	}

	public void setUiMapping(String uiMapping) {
		this.uiMapping = uiMapping;
	}

	public ImfStructure getImfId() {
		return imfId;
	}

	public void setImfId(ImfStructure imfId) {
		this.imfId = imfId;
	}
}
