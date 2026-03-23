package com.bnt.rest.wrapper.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class LimitWrapper {

	private String singleTransaction;

	private String perTime;

	private String perDay;

	private String perMonth;

	public String getSingleTransaction() {
		return singleTransaction;
	}

	public void setSingleTransaction(String singleTransaction) {
		this.singleTransaction = singleTransaction;
	}

	public String getPerTime() {
		return perTime;
	}

	public void setPerTime(String perTime) {
		this.perTime = perTime;
	}

	public String getPerDay() {
		return perDay;
	}

	public void setPerDay(String perDay) {
		this.perDay = perDay;
	}

	public String getPerMonth() {
		return perMonth;
	}

	public void setPerMonth(String perMonth) {
		this.perMonth = perMonth;
	}
}
