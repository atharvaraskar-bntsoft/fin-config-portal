package com.bnt.rest.dto;

import jakarta.validation.Valid;

import com.fasterxml.jackson.annotation.JsonIgnore;

import com.bnt.rest.wrapper.dto.IdAndNameCodeWrapper;
import com.bnt.rest.wrapper.dto.IdAndNameWrapper;
import com.bnt.rest.wrapper.dto.LimitWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class VelocityLimitsDto extends BaseDto {

	private MerchantInstitutionDto merchantInstitutionId;

	private MerchantDto merchantId;

	private LocationDto locationId;

	private DeviceDto deviceId;

	private CurrencyDto baseCurrencyId;

	@JsonIgnore
	private String txnType;

	@Valid
	private IdAndNameWrapper transactionTypes;

	private String minutesCount;

	private LimitWrapper limitAmount;

	private LimitWrapper limitCount;

	private Character locked;

	private Character deleted;

	@Valid
	private IdAndNameCodeWrapper type;

	public MerchantInstitutionDto getMerchantInstitutionId() {
		return merchantInstitutionId;
	}

	public void setMerchantInstitutionId(MerchantInstitutionDto merchantInstitutionId) {
		this.merchantInstitutionId = merchantInstitutionId;
	}

	public MerchantDto getMerchantId() {
		return merchantId;
	}

	public void setMerchantId(MerchantDto merchantId) {
		this.merchantId = merchantId;
	}

	public LocationDto getLocationId() {
		return locationId;
	}

	public void setLocationId(LocationDto locationId) {
		this.locationId = locationId;
	}

	public DeviceDto getDeviceId() {
		return deviceId;
	}

	public void setDeviceId(DeviceDto deviceId) {
		this.deviceId = deviceId;
	}

	public CurrencyDto getBaseCurrencyId() {
		return baseCurrencyId;
	}

	public void setBaseCurrencyId(CurrencyDto baseCurrencyId) {
		this.baseCurrencyId = baseCurrencyId;
	}

	public String getTxnType() {
		return txnType;
	}

	public void setTxnType(String txnType) {
		this.txnType = txnType;
	}

	public IdAndNameWrapper getTransactionTypes() {
		return transactionTypes;
	}

	public void setTransactionTypes(IdAndNameWrapper transactionTypes) {
		this.transactionTypes = transactionTypes;
	}

	public String getMinutesCount() {
		return minutesCount;
	}

	public void setMinutesCount(String minutesCount) {
		this.minutesCount = minutesCount;
	}

	public LimitWrapper getLimitAmount() {
		return limitAmount;
	}

	public void setLimitAmount(LimitWrapper limitAmount) {
		this.limitAmount = limitAmount;
	}

	public LimitWrapper getLimitCount() {
		return limitCount;
	}

	public void setLimitCount(LimitWrapper limitCount) {
		this.limitCount = limitCount;
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

	public IdAndNameCodeWrapper getType() {
		return type;
	}

	public void setType(IdAndNameCodeWrapper type) {
		this.type = type;
	}
}
