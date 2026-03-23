package com.bnt.rest.dto;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class TxnLogDto {

	private String id;

	public String getPosTerminalId() {
		return posTerminalId;
	}

	public void setPosTerminalId(String posTerminalId) {
		this.posTerminalId = posTerminalId;
	}

	public Date getPosTransactionDate() {
		return posTransactionDate;
	}

	public void setPosTransactionDate(Date posTransactionDate) {
		this.posTransactionDate = posTransactionDate;
	}

	private Date createdOn;

	private Date updatedOn;

	public Date getUpdatedOn() {
		return updatedOn;
	}

	public void setUpdatedOn(Date updatedOn) {
		this.updatedOn = updatedOn;
	}

	private String version;

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Date getCreatedOn() {
		return createdOn;
	}

	public void setCreatedOn(Date createdOn) {
		this.createdOn = createdOn;
	}

	private String posTxnType;
	private String posPaymentMethod;
	private String processingStatus;

	private String procCode;
	private String acquirerId;
	private String tokenType;
	private String parentTransactionId;
	private String retrivalReferenceNumber;

	private Timestamp respTxnDateTime;

	private Date posTxnDateTime;
	private String clientAddress;

	private Double txnAmount;
	private String txnCurrencyCode;
	private String txnAmountType;
	private String maskedToken;
	private String tokenCaptureMode;
	private String merchantCode;
	private String merchantCategoryCode;
	private String merchantCurrency;
	private Double approvedAmount;
	private String approvedCurrency;
	private String stan;
	private Boolean isPartialAuth;
	private String acquirerInstitutionId;
	private String authCode;

	public String getTxnAmountType() {
		return txnAmountType;
	}

	public void setTxnAmountType(String txnAmountType) {
		this.txnAmountType = txnAmountType;
	}

	private String rawHeader;
	private String deviceCode;
	private int currencyMinorUnit;
	private Date posTransactionTime;

	public Date getPosTransactionTime() {
		return posTransactionTime;
	}

	public void setPosTransactionTime(Date posTransactionTime) {
		this.posTransactionTime = posTransactionTime;
	}

	private String locationCode;

	private String cardType;

	private String hostAddress;

	public String getServiceType() {
		return serviceType;
	}

	public void setServiceType(String serviceType) {
		this.serviceType = serviceType;
	}

	public String getAdapterId() {
		return adapterId;
	}

	public void setAdapterId(String adapterId) {
		this.adapterId = adapterId;
	}

	private String cvIndicator;

	private String entryMode;

	private String posCategoryLevel;

	private String approvedType;

	private String encryptedPanNumber;

	private String posEnvironment;

	private String cardholderVerificationMethod;

	private String posCardholderVerificationMethod;

	private boolean forReview;

	private byte[] remarks;

	public String getPosCardholderVerificationMethod() {
		return posCardholderVerificationMethod;
	}

	public void setPosCardholderVerificationMethod(String posCardholderVerificationMethod) {
		this.posCardholderVerificationMethod = posCardholderVerificationMethod;
	}

	public boolean isForReview() {
		return forReview;
	}

	public void setForReview(boolean forReview) {
		this.forReview = forReview;
	}

	public byte[] getRemarks() {
		return remarks;
	}

	public void setRemarks(byte[] remarks) {
		this.remarks = remarks;
	}

	public String getApprovedType() {
		return approvedType;
	}

	public void setApprovedType(String approvedType) {
		this.approvedType = approvedType;
	}

	public Date getPosTxnDateTime() {
		return posTxnDateTime;
	}

	public void setPosTxnDateTime(Date posTxnDateTime) {
		this.posTxnDateTime = posTxnDateTime;
	}

	public String getEncryptedPanNumber() {
		return encryptedPanNumber;
	}

	public void setEncryptedPanNumber(String encryptedPanNumber) {
		this.encryptedPanNumber = encryptedPanNumber;
	}

	public String getPosEnvironment() {
		return posEnvironment;
	}

	public void setPosEnvironment(String posEnvironment) {
		this.posEnvironment = posEnvironment;
	}

	public String getCardholderVerificationMethod() {
		return cardholderVerificationMethod;
	}

	public void setCardholderVerificationMethod(String cardholderVerificationMethod) {
		this.cardholderVerificationMethod = cardholderVerificationMethod;
	}

	public String getTerminalCapibility() {
		return terminalCapibility;
	}

	public void setTerminalCapibility(String terminalCapibility) {
		this.terminalCapibility = terminalCapibility;
	}

	private String terminalCapibility;

	private String posTerminalId;

	private Date posTransactionDate;

	public String getEntryMode() {
		return entryMode;
	}

	public void setEntryMode(String entryMode) {
		this.entryMode = entryMode;
	}

	public String getPosCategoryLevel() {
		return posCategoryLevel;
	}

	public void setPosCategoryLevel(String posCategoryLevel) {
		this.posCategoryLevel = posCategoryLevel;
	}

	public String getHostAddress() {
		return hostAddress;
	}

	public void setHostAddress(String hostAddress) {
		this.hostAddress = hostAddress;
	}

	public String getCvIndicator() {
		return cvIndicator;
	}

	public void setCvIndicator(String cvIndicator) {
		this.cvIndicator = cvIndicator;
	}

	private List<String> routeIdList;

	public String getLocationCode() {
		return locationCode;
	}

	public List<String> getRouteIdList() {
		return routeIdList;
	}

	public void setRouteIdList(List<String> routeIdList) {
		this.routeIdList = routeIdList;
	}

	public void setLocationCode(String locationCode) {
		this.locationCode = locationCode;
	}

	public String getCardType() {
		return cardType;
	}

	public void setCardType(String cardType) {
		this.cardType = cardType;
	}

	public String getPosTxnType() {
		return posTxnType;
	}

	public void setPosTxnType(String posTxnType) {
		this.posTxnType = posTxnType;
	}

	public String getPosPaymentMethod() {
		return posPaymentMethod;
	}

	public void setPosPaymentMethod(String posPaymentMethod) {
		this.posPaymentMethod = posPaymentMethod;
	}

	public String getProcessingStatus() {
		return processingStatus;
	}

	public void setProcessingStatus(String processingStatus) {
		this.processingStatus = processingStatus;
	}

	public String getProcCode() {
		return this.procCode;
	}

	public void setProcCode(String procCode) {
		this.procCode = procCode;
	}

	public String getAcquirerId() {
		return this.acquirerId;
	}

	public void setAcquirerId(String acquirerId) {
		this.acquirerId = acquirerId;
	}

	public String getParentTransactionId() {
		return this.parentTransactionId;
	}

	public void setParentTransactionId(String parentTransactionId) {
		this.parentTransactionId = parentTransactionId;
	}

	public String getRetrivalReferenceNumber() {
		return this.retrivalReferenceNumber;
	}

	public void setRetrivalReferenceNumber(String retrivalReferenceNumber) {
		this.retrivalReferenceNumber = retrivalReferenceNumber;
	}

	public Timestamp getRespTxnDateTime() {
		return this.respTxnDateTime;
	}

	public void setRespTxnDateTime(Timestamp respTxnDateTime) {
		this.respTxnDateTime = respTxnDateTime;
	}

	public String getClientAddress() {
		return this.clientAddress;
	}

	public void setClientAddress(String clientAddress) {
		this.clientAddress = clientAddress;
	}

	public Double getTxnAmount() {
		return this.txnAmount;
	}

	public void setTxnAmount(Double txnAmount) {
		this.txnAmount = txnAmount;
	}

	public String getTxnCurrencyCode() {
		return this.txnCurrencyCode;
	}

	public void setTxnCurrencyCode(String txnCurrencyCode) {
		this.txnCurrencyCode = txnCurrencyCode;
	}

	public String getMaskedToken() {
		return this.maskedToken;
	}

	public void setMaskedToken(String maskedToken) {
		this.maskedToken = maskedToken;
	}

	public String getTokenType() {
		return this.tokenType;
	}

	public void setTokenType(String tokenType) {
		this.tokenType = tokenType;
	}

	public String getTokenCaptureMode() {
		return this.tokenCaptureMode;
	}

	public void setTokenCaptureMode(String tokenCaptureMode) {
		this.tokenCaptureMode = tokenCaptureMode;
	}

	public String getMerchantCode() {
		return this.merchantCode;
	}

	public void setMerchantCode(String merchantCode) {
		this.merchantCode = merchantCode;
	}

	public String getMerchantCategoryCode() {
		return this.merchantCategoryCode;
	}

	public void setMerchantCategoryCode(String merchantCategoryCode) {
		this.merchantCategoryCode = merchantCategoryCode;
	}

	public String getMerchantCurrency() {
		return this.merchantCurrency;
	}

	public void setMerchantCurrency(String merchantCurrency) {
		this.merchantCurrency = merchantCurrency;
	}

	public Double getApprovedAmount() {
		return this.approvedAmount;
	}

	public void setApprovedAmount(Double approvedAmount) {
		this.approvedAmount = approvedAmount;
	}

	public String getApprovedCurrency() {
		return this.approvedCurrency;
	}

	public void setApprovedCurrency(String approvedCurrency) {
		this.approvedCurrency = approvedCurrency;
	}

	public String getStan() {
		return this.stan;
	}

	public void setStan(String stan) {
		this.stan = stan;
	}

	public Boolean getIsPartialAuth() {
		return this.isPartialAuth;
	}

	public void setIsPartialAuth(Boolean isPartialAuth) {
		this.isPartialAuth = isPartialAuth;
	}

	public String getAcquirerInstitutionId() {
		return this.acquirerInstitutionId;
	}

	public void setAcquirerInstitutionId(String acquirerInstitutionId) {
		this.acquirerInstitutionId = acquirerInstitutionId;
	}

	public String getAuthCode() {
		return this.authCode;
	}

	public void setAuthCode(String authCode) {
		this.authCode = authCode;
	}

	public String getRawHeader() {
		return this.rawHeader;
	}

	public void setRawHeader(String rawHeader) {
		this.rawHeader = rawHeader;
	}

	public String getDeviceCode() {
		return this.deviceCode;
	}

	public void setDeviceCode(String deviceCode) {
		this.deviceCode = deviceCode;
	}

	public int getCurrencyMinorUnit() {
		return this.currencyMinorUnit;
	}

	public void setCurrencyMinorUnit(int currencyMinorUnit) {
		this.currencyMinorUnit = currencyMinorUnit;
	}

	private String serviceType;

	private String adapterId;

	private String requestType;

	private String domainRequestType;

	public String getDomainRequestType() {
		return domainRequestType;
	}

	public void setDomainRequestType(String domainRequestType) {
		this.domainRequestType = domainRequestType;
	}

	public void setRequestType(String requestType) {
		this.requestType = requestType;
	}

	public String getRequestType() {
		if ("GATEWAY_SERVICE".equals(serviceType)) {
			requestType = "com.bnt.ripps.kernel.msg.GatewayRequest";
		} else if ("PROVIDER_SERVICE".equals(serviceType)) {
			requestType = "com.bnt.ripps.kernel.msg.ProviderRequest";
		}

		return requestType;
	}

	private String currencyIso;

	public String getCurrencyIso() {
		return currencyIso;
	}

	public void setCurrencyIso(String currencyIso) {
		this.currencyIso = currencyIso;
	}
}
