package com.bnt.rest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class AcquirerIdConfigDto extends BaseDto {

	private static final long serialVersionUID = 1L;

	private String code;

	private String description;

	private boolean active;

	private char deleted;

	private Character adviceMatch;

	private String name;

	private String onusValidate;

	private Character refundOffline;

	@JsonProperty("pos_sms")
	private String posSms;

	@JsonProperty("pos_dms")
	private String posDms;

	@JsonProperty("txntype_sms")
	private String txntypeSms;

	@JsonProperty("txntype_dms")
	private String txntypeDms;

	@JsonProperty("accounttype_sms")
	private String accounttypeSms;

	@JsonProperty("accounttype_dms")
	private String accounttypeDms;

	public Character getRefundOffline() {
		return refundOffline;
	}

	public void setRefundOffline(Character refundOffline) {
		this.refundOffline = refundOffline;
	}

	public String getOnusValidate() {
		return onusValidate;
	}

	public void setOnusValidate(String onusValidate) {
		this.onusValidate = onusValidate;
	}

	private CountryDto country;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public CountryDto getCountry() {
		return country;
	}

	public void setCountry(CountryDto country) {
		this.country = country;
	}

	public char getDeleted() {
		return deleted;
	}

	public void setDeleted(char deleted) {
		this.deleted = deleted;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public boolean getActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public String getPosSms() {
		return posSms;
	}

	public void setPosSms(String posSms) {
		this.posSms = posSms;
	}

	public String getPosDms() {
		return posDms;
	}

	public void setPosDms(String posDms) {
		this.posDms = posDms;
	}

	public String getTxntypeSms() {
		return txntypeSms;
	}

	public void setTxntypeSms(String txntypeSms) {
		this.txntypeSms = txntypeSms;
	}

	public String getTxntypeDms() {
		return txntypeDms;
	}

	public void setTxntypeDms(String txntypeDms) {
		this.txntypeDms = txntypeDms;
	}

	public String getAccounttypeSms() {
		return accounttypeSms;
	}

	public void setAccounttypeSms(String accounttypeSms) {
		this.accounttypeSms = accounttypeSms;
	}

	public String getAccounttypeDms() {
		return accounttypeDms;
	}

	public void setAccounttypeDms(String accounttypeDms) {
		this.accounttypeDms = accounttypeDms;
	}

	public Character getAdviceMatch() {
		return adviceMatch;
	}

	public void setAdviceMatch(Character adviceMatch) {
		this.adviceMatch = adviceMatch;
	}
}
