package com.bnt.rest.dto;

import java.sql.Timestamp;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class MEKDto {

	private String clearText;

	private Boolean custodianTextExist;

	private Boolean otherCustodianTextExist;

	private String user;

	private Timestamp lastUpdatedTime;

	public String getClearText() {
		return clearText;
	}

	public void setClearText(String clearText) {
		this.clearText = clearText;
	}

	public Boolean getCustodianTextExist() {
		return custodianTextExist;
	}

	public void setCustodianTextExist(Boolean custodianTextExist) {
		this.custodianTextExist = custodianTextExist;
	}

	public Boolean getOtherCustodianTextExist() {
		return otherCustodianTextExist;
	}

	public void setOtherCustodianTextExist(Boolean otherCustodianTextExist) {
		this.otherCustodianTextExist = otherCustodianTextExist;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public Timestamp getLastUpdatedTime() {
		return lastUpdatedTime;
	}

	public void setLastUpdatedTime(Timestamp lastUpdatedTime) {
		this.lastUpdatedTime = lastUpdatedTime;
	}
}
