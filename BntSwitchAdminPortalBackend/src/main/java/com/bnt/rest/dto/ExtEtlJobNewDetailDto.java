package com.bnt.rest.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ExtEtlJobNewDetailDto {

	private String batchMode;

	private String cronExp;

	private String batchSize;

	private String repeatTime;

	@JsonIgnoreProperties({ "imf" })
	private ImfStructureDto imfId;

	private String mapping;

	private String jobClass;

	private String packager;

	private String etlJson;

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

	public String getRepeatTime() {
		return repeatTime;
	}

	public void setRepeatTime(String repeatTime) {
		this.repeatTime = repeatTime;
	}

	public String getMapping() {
		return mapping;
	}

	public void setMapping(String mapping) {
		this.mapping = mapping;
	}

	public String getJobClass() {
		return jobClass;
	}

	public void setJobClass(String jobClass) {
		this.jobClass = jobClass;
	}

	public String getPackager() {
		return packager;
	}

	public void setPackager(String packager) {
		this.packager = packager;
	}

	public String getEtlJson() {
		return etlJson;
	}

	public void setEtlJson(String etlJson) {
		this.etlJson = etlJson;
	}

	public ImfStructureDto getImfId() {
		return imfId;
	}

	public void setImfId(ImfStructureDto imfId) {
		this.imfId = imfId;
	}

	public String getCronExp() {
		return cronExp;
	}

	public void setCronExp(String cronExp) {
		this.cronExp = cronExp;
	}
}
