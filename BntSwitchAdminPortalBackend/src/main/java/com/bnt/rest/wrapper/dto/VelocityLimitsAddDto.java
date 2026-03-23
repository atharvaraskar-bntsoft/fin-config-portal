package com.bnt.rest.wrapper.dto;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class VelocityLimitsAddDto {

	private Integer id;

	private ApplyToWrapperAdd applyTo;

	private List<IdAndNameWrapper> transactionTypes;

	private String minutesCount;

	private LimitWrapper limitAmount;

	private LimitWrapper limitCount;

	private boolean status;

	public ApplyToWrapperAdd getApplyTo() {
		return applyTo;
	}

	public void setApplyTo(ApplyToWrapperAdd applyTo) {
		this.applyTo = applyTo;
	}

	public List<IdAndNameWrapper> getTransactionTypes() {
		return transactionTypes;
	}

	public void setTransactionTypes(List<IdAndNameWrapper> transactionTypes) {
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

	public boolean getStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
}
