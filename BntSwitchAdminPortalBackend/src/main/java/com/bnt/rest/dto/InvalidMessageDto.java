package com.bnt.rest.dto;

import java.util.Date;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class InvalidMessageDto {

	private String id;
	private String processingStatus;
	private String adapterId;
	private String clientAddress;
	private String serverAddress;
	private String clientRequestMessage;
	private String clientResponseMessage;

	public String getAdapterId() {
		return adapterId;
	}

	public void setAdapterId(String adapterId) {
		this.adapterId = adapterId;
	}

	public String getClientAddress() {
		return clientAddress;
	}

	public void setClientAddress(String clientAddress) {
		this.clientAddress = clientAddress;
	}

	public String getServerAddress() {
		return serverAddress;
	}

	public void setServerAddress(String serverAddress) {
		this.serverAddress = serverAddress;
	}

	public String getClientRequestMessage() {
		return clientRequestMessage;
	}

	public void setClientRequestMessage(String clientRequestMessage) {
		this.clientRequestMessage = clientRequestMessage;
	}

	public String getClientResponseMessage() {
		return clientResponseMessage;
	}

	public void setClientResponseMessage(String clientResponseMessage) {
		this.clientResponseMessage = clientResponseMessage;
	}

	public Date getTransactionTime() {
		return transactionTime;
	}

	public void setTransactionTime(Date transactionTime) {
		this.transactionTime = transactionTime;
	}

	private Date transactionTime;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getProcessingStatus() {
		return processingStatus;
	}

	public void setProcessingStatus(String processingStatus) {
		this.processingStatus = processingStatus;
	}
}
