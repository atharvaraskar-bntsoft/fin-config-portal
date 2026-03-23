package com.bnt.rest.dto;

import java.sql.Timestamp;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.gson.JsonElement;
import com.bnt.common.util.GsonUtil;

import com.bnt.common.util.JsonObjectUtil;
import com.bnt.rest.wrapper.dto.IdAndNameCodeWrapper;
import com.bnt.rest.wrapper.dto.IdAndNameWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class MerchantDto extends BaseDto {

	private IdAndNameWrapper merchantInstitution;

	public IdAndNameWrapper getMerchantInstitution() {
		return merchantInstitution;
	}

	public void setMerchantInstitution(IdAndNameWrapper merchantInstitution) {
		this.merchantInstitution = merchantInstitution;
	}

	public IdAndNameCodeWrapper getCurrency() {
		return currency;
	}

	public void setCurrency(IdAndNameCodeWrapper currency) {
		this.currency = currency;
	}

	private String code;

	@NotEmpty(message = "Name should not be empty")
	private String name;

	private String description;

	private Timestamp activateOn;

	private Timestamp expiryOn;

	private Integer totalLocation;

	private Integer totalDevice;

	private Character locked;

	public String getAdditionalAttribute() {
		return additionalAttribute;
	}

	public void setAdditionalAttribute(String additionalAttribute) {
		this.additionalAttributeUi = JsonObjectUtil.getObjectFromJsonString(additionalAttribute);
		this.additionalAttribute = additionalAttribute;
	}

	@JsonIgnore
	private String additionalAttribute;

	@JsonProperty("additionalAttribute")
	private Object additionalAttributeUi;

	private Character posSafetyFlag;

	public Character getPosSafetyFlag() {
		return posSafetyFlag;
	}

	public void setPosSafetyFlag(Character posSafetyFlag) {
		this.posSafetyFlag = posSafetyFlag;
	}

	public String getReversalTimeout() {
		return reversalTimeout;
	}

	public void setReversalTimeout(String reversalTimeout) {
		this.reversalTimeout = reversalTimeout;
	}

	private String reversalTimeout;

	public Object getAdditionalAttributeUi() {
		return additionalAttributeUi;
	}

	public void setAdditionalAttributeUi(Object additionalAttributeUi) {
		this.additionalAttribute = null;
		if (additionalAttributeUi != null) {
			JsonElement jsonElementCode = GsonUtil.getJsonObjectFromType(additionalAttributeUi, true);
			this.additionalAttribute = jsonElementCode.toString();
		}
		this.additionalAttributeUi = additionalAttributeUi;
	}

	public Character getLocked() {
		return locked;
	}

	public void setLocked(Character locked) {
		this.locked = locked;
	}

	public Character getDeleted() {
		return deleted;
	}

	public void setDeleted(Character deleted) {
		this.deleted = deleted;
	}

	@JsonIgnore
	private Character deleted;

	@Valid
	private MerchantProfileDto merchantProfile;

	private Integer acquirerID;

	@Valid
	private MerchantDetailDto merchantDetail;

	private IdAndNameCodeWrapper currency;

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Timestamp getActivateOn() {
		return activateOn;
	}

	public void setActivateOn(Timestamp activateOn) {
		this.activateOn = activateOn;
	}

	public Timestamp getExpiryOn() {
		return expiryOn;
	}

	public void setExpiryOn(Timestamp expiryOn) {
		this.expiryOn = expiryOn;
	}

	public Integer getAcquirerID() {
		return acquirerID;
	}

	public void setAcquirerID(Integer acquirerID) {
		this.acquirerID = acquirerID;
	}

	public Integer getTotalLocation() {
		return totalLocation;
	}

	public void setTotalLocation(Integer totalLocation) {
		this.totalLocation = totalLocation;
	}

	public Integer getTotalDevice() {
		return totalDevice;
	}

	public void setTotalDevice(Integer totalDevice) {
		this.totalDevice = totalDevice;
	}

	public MerchantProfileDto getMerchantProfile() {
		return merchantProfile;
	}

	public void setMerchantProfile(MerchantProfileDto merchantProfile) {
		this.merchantProfile = merchantProfile;
	}

	public MerchantDetailDto getMerchantDetail() {
		return merchantDetail;
	}

	public void setMerchantDetail(MerchantDetailDto merchantDetail) {
		this.merchantDetail = merchantDetail;
	}

	private String bankName;

	private String accountNumber;

	public String getBankName() {
		return bankName;
	}

	public void setBankName(String bankName) {
		this.bankName = bankName;
	}

	public String getAccountNumber() {
		return accountNumber;
	}

	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}

	/**
	 * public IdAndNameWrapper getInstitution() { return merchantInstitution; }
	 */

	public void setInstitution(IdAndNameWrapper institution) {
		this.merchantInstitution = institution;
	}

	/**
	 * public IdAndNameCodeWrapper getDefaultCurrencyID() { return currency; }
	 */

	public void setDefaultCurrencyID(IdAndNameCodeWrapper defaultCurrencyID) {
		this.currency = defaultCurrencyID;
	}
}
