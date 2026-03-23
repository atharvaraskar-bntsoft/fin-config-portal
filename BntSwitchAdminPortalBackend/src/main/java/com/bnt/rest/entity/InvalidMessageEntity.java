package com.bnt.rest.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Table(name = "invalid_message")
public class InvalidMessageEntity implements java.io.Serializable {

	private static final Logger logger = LogManager.getLogger(InvalidMessageEntity.class);

	private static final long serialVersionUID = 1L;

	private String id;
	private String processingStatus;
	private String adapterId;
	private String clientAddress;
	private String serverAddress;
	private String clientRequestMessage;
	private String clientResponseMessage;
	private Date transactionTime;

	public InvalidMessageEntity() {
		logger.info("inside InvalidMessageEntity()..");
	}

	@Id
	@Column(name = "id", unique = true, nullable = false)
	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	@Column(name = "processing_status")
	public String getProcessingStatus() {
		return this.processingStatus;
	}

	public void setProcessingStatus(String processingStatus) {
		this.processingStatus = processingStatus;
	}

	@Column(name = "adapter_id")
	public String getAdapterId() {
		return adapterId;
	}

	public void setAdapterId(String adapterId) {
		this.adapterId = adapterId;
	}

	@Column(name = "client_address")
	public String getClientAddress() {
		return clientAddress;
	}

	public void setClientAddress(String clientAddress) {
		this.clientAddress = clientAddress;
	}

	@Column(name = "server_address")
	public String getServerAddress() {
		return serverAddress;
	}

	public void setServerAddress(String serverAddress) {
		this.serverAddress = serverAddress;
	}

	@Column(name = "client_request_message")
	public String getClientRequestMessage() {
		return clientRequestMessage;
	}

	public void setClientRequestMessage(String clientRequestMessage) {
		this.clientRequestMessage = clientRequestMessage;
	}

	@Column(name = "client_response_message")
	public String getClientResponseMessage() {
		return clientResponseMessage;
	}

	public void setClientResponseMessage(String clientResponseMessage) {
		this.clientResponseMessage = clientResponseMessage;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "transaction_time", length = 19)
	public Date getTransactionTime() {
		return this.transactionTime;
	}

	public void setTransactionTime(Date transactionTime) {
		this.transactionTime = transactionTime;
	}
}
