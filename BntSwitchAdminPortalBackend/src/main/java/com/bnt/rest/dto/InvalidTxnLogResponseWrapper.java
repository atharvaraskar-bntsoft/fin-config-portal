package com.bnt.rest.dto;

import java.util.Date;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class InvalidTxnLogResponseWrapper {

	private String id;
	private DtoWrapper processingStatus;
	private String specificationId;
	private String localAddress;
	private String remoteAddress;
	private DtoWrapper localServerInstitution;
	private DtoWrapper remoteServerInstitution;
	private String rawMessage;
	private Date createdOn;
	private Date updatedOn;

	public String getRawMessage() {
		return rawMessage;
	}

	public void setRawMessage(String rawMessage) {
		this.rawMessage = rawMessage;
	}

	public Date getCreatedOn() {
		return createdOn;
	}

	public void setCreatedOn(Date createdOn) {
		this.createdOn = createdOn;
	}

	public Date getUpdatedOn() {
		return updatedOn;
	}

	public void setUpdatedOn(Date updatedOn) {
		this.updatedOn = updatedOn;
	}

	public DtoWrapper getProcessingStatus() {
		return processingStatus;
	}

	public void setProcessingStatus(DtoWrapper processingStatus) {
		this.processingStatus = processingStatus;
	}

	public String getRemoteAddress() {
		return remoteAddress;
	}

	public void setRemoteAddress(String remoteAddress) {
		this.remoteAddress = remoteAddress;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getSpecificationId() {
		return specificationId;
	}

	public void setSpecificationId(String specificationId) {
		this.specificationId = specificationId;
	}

	public String getLocalAddress() {
		return localAddress;
	}

	public void setLocalAddress(String localAddress) {
		this.localAddress = localAddress;
	}

	public DtoWrapper getLocalServerInstitution() {
		return localServerInstitution;
	}

	public void setLocalServerInstitution(DtoWrapper localServerInstitution) {
		this.localServerInstitution = localServerInstitution;
	}

	public DtoWrapper getRemoteServerInstitution() {
		return remoteServerInstitution;
	}

	public void setRemoteServerInstitution(DtoWrapper remoteServerInstitution) {
		this.remoteServerInstitution = remoteServerInstitution;
	}
}
