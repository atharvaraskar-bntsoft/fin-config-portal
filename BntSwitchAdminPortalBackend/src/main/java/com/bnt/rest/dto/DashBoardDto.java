package com.bnt.rest.dto;

import java.sql.Timestamp;
import java.util.List;
import java.util.Set;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class DashBoardDto {

	private String posTxnType;
	private String posPaymentMethod;
	private String processingStatus;
	private String acquirerId;
	private Timestamp respTxnDateTime;
	private String rawHeader;
	private String cardType;
	private List<String> routeIdList;
	private String adapterId;
	private String providerId;
	private String maskedToken;
	private Set<String> authorizedDestinations;
	private String merchantCode;
	private String merchantName;

	public String getMerchantName() {
		return merchantName;
	}

	public void setMerchantName(String merchantName) {
		this.merchantName = merchantName;
	}

	public String getMerchantCode() {
		return merchantCode;
	}

	public void setMerchantCode(String merchantCode) {
		this.merchantCode = merchantCode;
	}

	public Set<String> getAuthorizedDestinations() {
		return authorizedDestinations;
	}

	public void setAuthorizedDestinations(Set<String> authorizedDestinations) {
		this.authorizedDestinations = authorizedDestinations;
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

	public String getAcquirerId() {
		return acquirerId;
	}

	public void setAcquirerId(String acquirerId) {
		this.acquirerId = acquirerId;
	}

	public Timestamp getRespTxnDateTime() {
		return respTxnDateTime;
	}

	public void setRespTxnDateTime(Timestamp respTxnDateTime) {
		this.respTxnDateTime = respTxnDateTime;
	}

	public String getRawHeader() {
		return rawHeader;
	}

	public void setRawHeader(String rawHeader) {
		this.rawHeader = rawHeader;
	}

	public String getCardType() {
		return cardType;
	}

	public void setCardType(String cardType) {
		this.cardType = cardType;
	}

	public List<String> getRouteIdList() {
		return routeIdList;
	}

	public void setRouteIdList(List<String> routeIdList) {
		this.routeIdList = routeIdList;
	}

	public String getAdapterId() {
		return adapterId;
	}

	public void setAdapterId(String adapterId) {
		this.adapterId = adapterId;
	}

	public String getMaskedToken() {
		return maskedToken;
	}

	public void setMaskedToken(String maskedToken) {
		this.maskedToken = maskedToken;
	}

	public String getProviderId() {
		return providerId;
	}

	public void setProviderId(String providerId) {
		this.providerId = providerId;
	}
}
