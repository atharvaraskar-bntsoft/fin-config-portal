package com.bnt.rest.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class AdapterConfigurationDto extends BaseDto {

	private Integer version;

	@JsonIgnoreProperties({ "imf" })
	private ImfStructureDto imfId;

	private String messageSchemaPackager;

	private String requestMapping;

	private String responseMapping;

	private String imfLeg;

	private String properties;

	private String guid;

	private AdapterDto adapter;

	private String responseCode;

	private String status;

	private String responsePackager;

	private String fileType;

	public Integer getVersion() {
		return version;
	}

	public void setVersion(Integer version) {
		this.version = version;
	}

	public ImfStructureDto getImfId() {
		return imfId;
	}

	public void setImfId(ImfStructureDto imfId) {
		this.imfId = imfId;
	}

	public String getMessageSchemaPackager() {
		return messageSchemaPackager;
	}

	public void setMessageSchemaPackager(String messageSchemaPackager) {
		this.messageSchemaPackager = messageSchemaPackager;
	}

	public String getRequestMapping() {
		return requestMapping;
	}

	public void setRequestMapping(String requestMapping) {
		this.requestMapping = requestMapping;
	}

	public String getResponseMapping() {
		return responseMapping;
	}

	public void setResponseMapping(String responseMapping) {
		this.responseMapping = responseMapping;
	}

	public String getImfLeg() {
		return imfLeg;
	}

	public void setImfLeg(String imfLeg) {
		this.imfLeg = imfLeg;
	}

	public String getProperties() {
		return properties;
	}

	public void setProperties(String properties) {
		this.properties = properties;
	}

	public String getGuid() {
		return guid;
	}

	public void setGuid(String guid) {
		this.guid = guid;
	}

	public AdapterDto getAdapter() {
		return adapter;
	}

	public void setAdapter(AdapterDto adapter) {
		this.adapter = adapter;
	}

	public String getResponseCode() {
		return responseCode;
	}

	public void setResponseCode(String responseCode) {
		this.responseCode = responseCode;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getResponsePackager() {
		return responsePackager;
	}

	public void setResponsePackager(String responsePackager) {
		this.responsePackager = responsePackager;
	}

	public String getFileType() {
		return fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}
}
