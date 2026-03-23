package com.bnt.rest.dto;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.bnt.rest.wrapper.dto.KeyValueGenericWrapper;
import com.bnt.rest.wrapper.dto.KeyValueWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@SuppressWarnings("unused")
public class TxnLogResponseWrapper {

	Long id;
	@JsonIgnore
	List<String> destinationCodes = new ArrayList<>();

	@JsonIgnore
	String approvedAmountCurrencyCode;

	Map<String, List<KeyValueWrapper>> additionalParamsRequest = new HashMap<>();
	Map<String, List<KeyValueWrapper>> additionalParamsResponse = new HashMap<>();
	Map<String, List<KeyValueWrapper>> additionalFields = new HashMap<>();

	List<KeyValueWrapper> additionalParams = new ArrayList<>();
	List<KeyValueWrapper> errors = new ArrayList<>();

	List<OperationWrapper> operations = new ArrayList<>();

	List<TxnInfoWrapper> infoParams = new ArrayList<>();

	Timestamp date;

	TxnStatusWrapper txnResponse;

	TxnStatusWrapper txnStatus;

	boolean forReview;

	String transactionName;

	String requestType;

	String actionType;

	@JsonIgnore
	Map<String, String> currencyMap;

	@JsonIgnore
	Map<String, String> destinationMap;

	@JsonIgnore
	String requestedAmountCurrencyCode;

	Double requestedAmount;

	String requestedCurrency;

	Double approvedAmount;

	String approvedCurrency;
	String destinations;
	String txnId;
	String parentTxnId;
	String pspRefId;
	String txnType;
	String messageTypeIndicator;
	String rrn;
	String deviceCode;
	String acqInstitutionSource;
	String responseCode;
	String acqInstitutionDestination;
	String processingStatus;
	Boolean safprocessed;
	String merchantCode;
	String localDateTime;
	String dateString;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Boolean getSafprocessed() {
		return safprocessed;
	}

	public void setSafprocessed(Boolean safprocessed) {
		this.safprocessed = safprocessed;
	}

	public String getAcqInstitutionDestination() {
		return acqInstitutionDestination;
	}

	public void setAcqInstitutionDestination(String acqInstitutionDestination) {
		this.acqInstitutionDestination = acqInstitutionDestination;
	}

	public String getAcqInstitutionSource() {
		return acqInstitutionSource;
	}

	public void setAcqInstitutionSource(String acqInstitutionSource) {
		this.acqInstitutionSource = acqInstitutionSource;
	}

	public String getRrn() {
		return rrn;
	}

	public void setRrn(String rrn) {
		this.rrn = rrn;
	}

	public String getProcessingStatus() {
		return processingStatus;
	}

	public void setProcessingStatus(String processingStatus) {
		this.processingStatus = processingStatus;
	}

	public String getParentTxnId() {
		return parentTxnId;
	}

	public void setParentTxnId(String parentTxnId) {
		this.parentTxnId = parentTxnId;
	}

	public String getPspRefId() {
		return pspRefId;
	}

	public void setPspRefId(String pspRefId) {
		this.pspRefId = pspRefId;
	}

	public String getMessageTypeIndicator() {
		return messageTypeIndicator;
	}

	public void setMessageTypeIndicator(String messageTypeIndicator) {
		this.messageTypeIndicator = messageTypeIndicator;
	}

	public String getResponseCode() {
		return responseCode;
	}

	public void setResponseCode(String responseCode) {
		this.responseCode = responseCode;
	}

	public String getDeviceCode() {
		return deviceCode;
	}

	public void setDeviceCode(String deviceCode) {
		this.deviceCode = deviceCode;
	}

	public String getMerchantCode() {
		return merchantCode;
	}

	public void setMerchantCode(String merchantCode) {
		this.merchantCode = merchantCode;
	}

	public String getTxnType() {
		return txnType;
	}

	public void setTxnType(String txnType) {
		this.txnType = txnType;
	}

	public String getRequestType() {
		return requestType;
	}

	public void setRequestType(String requestType) {
		this.requestType = requestType;
	}

	public String getActionType() {
		return actionType;
	}

	public void setActionType(String actionType) {
		this.actionType = actionType;
	}

	public String getTransactionName() {
		return transactionName;
	}

	public void setTransactionName(String transactionName) {
		this.transactionName = transactionName;
	}

	public List<TxnInfoWrapper> getInfoParams() {
		return infoParams;
	}

	public void setInfoParams(List<TxnInfoWrapper> infoParams) {
		this.infoParams = infoParams;
	}

	public Timestamp getDate() {
		return date;
	}

	public void setDate(Timestamp date) {
		this.date = date;
	}

	public void setDestinationCodes(List<String> destinationCodes) {
		this.destinationCodes = destinationCodes;
	}

	public class TxnInfoWrapper {

		private String name;

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public List<KeyValueGenericWrapper> getParams() {
			return params;
		}

		public void setParams(List<KeyValueGenericWrapper> params) {
			this.params = params;
		}

		List<KeyValueGenericWrapper> params;

	}

	public class TxnStatusWrapper {

		public Integer getType() {
			return type;
		}

		public void setType(Integer type) {
			this.type = type;
		}

		public String getText() {
			return text;
		}

		public void setText(String text) {
			this.text = text;
		}

		private Integer type;

		private String text;

		public String getLabel() {
			return label;
		}

		public void setLabel(String label) {
			this.label = label;
		}

		private String label;

	}

	public class OperationWrapper {

		private String name;

		private String client;

		private String deviceTypeCode;

		private Map<String, List<KeyValueWrapper>> request;

		private Map<String, List<KeyValueWrapper>> response;

		private Map<String, List<KeyValueWrapper>> additionalField;

		public String getDeviceTypeCode() {
			return deviceTypeCode;
		}

		public void setDeviceTypeCode(String deviceTypeCode) {
			this.deviceTypeCode = deviceTypeCode;
		}

		public String getClient() {
			return client;
		}

		public void setClient(String client) {
			this.client = client;
		}

		public Map<String, List<KeyValueWrapper>> getRequest() {
			return request;
		}

		public void setRequest(Map<String, List<KeyValueWrapper>> request) {
			this.request = request;
		}

		public Map<String, List<KeyValueWrapper>> getResponse() {
			return response;
		}

		public void setResponse(Map<String, List<KeyValueWrapper>> response) {
			this.response = response;
		}

		public Map<String, List<KeyValueWrapper>> getAdditionalField() {
			return additionalField;
		}

		public void setAdditionalField(Map<String, List<KeyValueWrapper>> additionalField) {
			this.additionalField = additionalField;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

	}

	public String getTxnId() {
		return txnId;
	}

	public void setTxnId(String txnId) {
		this.txnId = txnId;
	}

	public TxnStatusWrapper getTxnResponse() {
		return txnResponse;
	}

	public void setTxnResponse(TxnStatusWrapper txnResponse) {
		this.txnResponse = txnResponse;
	}

	public TxnStatusWrapper getTxnStatus() {
		return txnStatus;
	}

	public void setTxnStatus(TxnStatusWrapper txnStatus) {
		this.txnStatus = txnStatus;
	}

	public boolean isForReview() {
		return forReview;
	}

	public void setForReview(boolean forReview) {
		this.forReview = forReview;
	}

	public Map<String, List<KeyValueWrapper>> getAdditionalParamsRequest() {
		return additionalParamsRequest;
	}

	public void setAdditionalParamsRequest(Map<String, List<KeyValueWrapper>> additionalParamsRequest) {
		this.additionalParamsRequest = additionalParamsRequest;
	}

	public Map<String, List<KeyValueWrapper>> getAdditionalParamsResponse() {
		return additionalParamsResponse;
	}

	public void setAdditionalParamsResponse(Map<String, List<KeyValueWrapper>> additionalParamsResponse) {
		this.additionalParamsResponse = additionalParamsResponse;
	}

	public Map<String, List<KeyValueWrapper>> getAdditionalFields() {
		return additionalFields;
	}

	public void setAdditionalFields(Map<String, List<KeyValueWrapper>> additionalFields) {
		this.additionalFields = additionalFields;
	}

	public List<KeyValueWrapper> getAdditionalParams() {
		return additionalParams;
	}

	public void setAdditionalParams(List<KeyValueWrapper> additionalParams) {
		this.additionalParams = additionalParams;
	}

	public List<KeyValueWrapper> getErrors() {
		return errors;
	}

	public void setErrors(List<KeyValueWrapper> errors) {
		this.errors = errors;
	}

	public List<OperationWrapper> getOperations() {
		return operations;
	}

	public void setOperations(List<OperationWrapper> operations) {
		this.operations = operations;
	}

	public Map<String, String> getCurrencyMap() {
		return currencyMap;
	}

	public void setCurrencyMap(Map<String, String> currencyMap) {
		this.currencyMap = currencyMap;
	}

	public Map<String, String> getDestinationMap() {
		return destinationMap;
	}

	public void setDestinationMap(Map<String, String> destinationMap) {
		this.destinationMap = destinationMap;
	}

	public List<String> getDestinationCodes() {
		return destinationCodes;
	}

	public Double getApprovedAmount() {
		return approvedAmount;
	}

	public void setApprovedAmount(Double approvedAmount) {
		this.approvedAmount = approvedAmount;
	}

	public void setRequestedAmount(Double requestedAmount) {
		this.requestedAmount = requestedAmount;
	}

	public String getApprovedAmountCurrencyCode() {
		return approvedAmountCurrencyCode;
	}

	public void setApprovedAmountCurrencyCode(String approvedAmountCurrencyCode) {
		this.approvedAmountCurrencyCode = approvedAmountCurrencyCode;
	}

	public String getRequestedAmountCurrencyCode() {
		return requestedAmountCurrencyCode;
	}

	public void setRequestedAmountCurrencyCode(String requestedAmountCurrencyCode) {
		this.requestedAmountCurrencyCode = requestedAmountCurrencyCode;
	}

	public String getDestinations() {
		return destinations;
	}

	public void setDestinations(String destinations) {
		this.destinations = destinations;
	}

	public Double getRequestedAmount() {
		return requestedAmount;
	}

	public String getRequestedCurrency() {
		return requestedCurrency;
	}

	public void setRequestedCurrency(String requestedCurrency) {
		this.requestedCurrency = requestedCurrency;
	}

	public String getApprovedCurrency() {
		return approvedCurrency;
	}

	public void setApprovedCurrency(String approvedCurrency) {
		this.approvedCurrency = approvedCurrency;
	}

	public String getLocalDateTime() {
		return localDateTime;
	}

	public void setLocalDateTime(String localDateTime) {
		this.localDateTime = localDateTime;
	}

	public String getDateString() {
		return dateString;
	}

	public void setDateString(String dateString) {
		this.dateString = dateString;
	}
}
