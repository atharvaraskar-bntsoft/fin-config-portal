package com.bnt.rest.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class BinAccountTransactionTypeDto extends BaseDto {

	@JsonBackReference
	private BinAccountTypeDto binAccountTypeId;

	@JsonProperty("transactionType")
	@JsonIgnoreProperties({ "lookupType", "modifiable", "active", "modifiable" })
	private LookupValueDto transactionTypesId;

	private Character active;

	private String txnTypeCode;

	public BinAccountTypeDto getBinAccountTypeId() {
		return binAccountTypeId;
	}

	public void setBinAccountTypeId(BinAccountTypeDto binAccountTypeId) {
		this.binAccountTypeId = binAccountTypeId;
	}

	public LookupValueDto getTransactionTypesId() {
		return transactionTypesId;
	}

	public void setTransactionTypesId(LookupValueDto transactionTypesId) {
		this.transactionTypesId = transactionTypesId;
	}

	public Character getActive() {
		return active;
	}

	public void setActive(Character active) {
		this.active = active;
	}

	public String getTxnTypeCode() {
		return txnTypeCode;
	}

	public void setTxnTypeCode(String txnTypeCode) {
		this.txnTypeCode = txnTypeCode;
	}
}
