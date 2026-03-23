package com.bnt.rest.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Table(name = "adapter_configuration")
public class AdapterConfiguration extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Column(name = "version", nullable = false)
	private Integer version;

	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "imf_id")
	private ImfStructure imfId;

	@Column(name = "message_schema_packager")
	private String messageSchemaPackager;

	@Column(name = "response_packager")
	private String responsePackager;

	@Column(name = "request_mapping")
	private String requestMapping;

	@Column(name = "response_mapping")
	private String responseMapping;

	@Column(name = "imf_leg")
	private String imfLeg;

	@Column(name = "properties")
	private String properties;

	@Column(name = "guid")
	private String guid;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "adapter_id")
	@JsonBackReference
	private Adapter adapter;

	@Column(name = "response_code")
	private String responseCode;

	@Column(name = "status", nullable = false)
	private String status;

	public Integer getVersion() {
		return version;
	}

	public void setVersion(Integer version) {
		this.version = version;
	}

	public ImfStructure getImfId() {
		return imfId;
	}

	public void setImfId(ImfStructure imfId) {
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

	public Adapter getAdapter() {
		return adapter;
	}

	public void setAdapter(Adapter adapter) {
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
}
