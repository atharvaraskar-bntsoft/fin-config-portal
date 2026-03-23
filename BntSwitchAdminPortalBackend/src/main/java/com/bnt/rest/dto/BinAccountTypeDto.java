package com.bnt.rest.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class BinAccountTypeDto extends BaseDto {

	@JsonBackReference
	private BinTableDto binTableId;

	private BinAccountTypeMasterDto binAccountTypeMasterId;

	private Character active;

	@JsonProperty("linkedTransactionTypes")
	@JsonManagedReference
	private List<BinAccountTransactionTypeDto> binAccountTransactionType;

	public BinTableDto getBinTableId() {
		return binTableId;
	}

	public void setBinTableId(BinTableDto binTableId) {
		this.binTableId = binTableId;
	}

	public BinAccountTypeMasterDto getBinAccountTypeMasterId() {
		return binAccountTypeMasterId;
	}

	public void setBinAccountTypeMasterId(BinAccountTypeMasterDto binAccountTypeMasterId) {
		this.binAccountTypeMasterId = binAccountTypeMasterId;
	}

	public Character getActive() {
		return active;
	}

	public void setActive(Character active) {
		this.active = active;
	}

	public List<BinAccountTransactionTypeDto> getBinAccountTransactionType() {
		return binAccountTransactionType;
	}

	public void setBinAccountTransactionType(List<BinAccountTransactionTypeDto> binAccountTransactionType) {
		this.binAccountTransactionType = binAccountTransactionType;
	}
}
