package com.bnt.rest.wrapper.dto;

import java.util.ArrayList;
import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class TxnLogMatrix {

	private String posTransactionType;

	private Boolean requestFlag;

	private Boolean responseFlag;

	private String transactionId;

	private String mappingType;

	private String adapterId;

	private String fileUri;

	private String destinations;

	public String getDestinations() {
		return destinations;
	}

	public void setDestinations(String destinations) {
		this.destinations = destinations;
	}

	public String getFileUri() {
		return fileUri;
	}

	public void setFileUri(String fileUri) {
		this.fileUri = fileUri;
	}

	public String getAdapterId() {
		return adapterId;
	}

	public void setAdapterId(String adapterId) {
		this.adapterId = adapterId;
	}

	public String getMappingType() {
		return mappingType;
	}

	public void setMappingType(String mappingType) {
		this.mappingType = mappingType;
	}

	public Boolean getRequestFlag() {
		return requestFlag;
	}

	public void setRequestFlag(Boolean requestFlag) {
		this.requestFlag = requestFlag;
	}

	public String getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(String transactionId) {
		this.transactionId = transactionId;
	}

	public Boolean getResponseFlag() {
		return responseFlag;
	}

	public void setResponseFlag(Boolean responseFlag) {
		this.responseFlag = responseFlag;
	}

	public String getPosTransactionType() {
		return posTransactionType;
	}

	public void setPosTransactionType(String posTransactionType) {
		this.posTransactionType = posTransactionType;
	}

	private String headerLabel;

	public String getHeaderLabel() {
		return headerLabel;
	}

	public void setHeaderLabel(String headerLabel) {
		this.headerLabel = headerLabel;
	}

	private List<TxnLogMatrixWrapper> logsList = new ArrayList<>();

	public List<TxnLogMatrixWrapper> getLogsList() {
		return logsList;
	}

	public void setLogsList(List<TxnLogMatrixWrapper> logsList) {
		this.logsList = logsList;
	};
}
