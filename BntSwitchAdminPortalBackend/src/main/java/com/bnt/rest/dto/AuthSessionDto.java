package com.bnt.rest.dto;

import java.sql.Timestamp;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class AuthSessionDto extends BaseDto {

	private Timestamp expireTime;

	private Timestamp startTime;

	private String token;

	private String invalidated;

	public Timestamp getExpireTime() {
		return expireTime;
	}

	public void setExpireTime(Timestamp expireTime) {
		this.expireTime = expireTime;
	}

	public Timestamp getStartTime() {
		return startTime;
	}

	public void setStartTime(Timestamp startTime) {
		this.startTime = startTime;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getInvalidated() {
		return invalidated;
	}

	public void setInvalidated(String invalidated) {
		this.invalidated = invalidated;
	}
}
