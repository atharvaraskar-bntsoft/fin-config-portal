package com.bnt.rest.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class DeviceTypeDto extends BaseDto {

	@Override
	public String toString() {
		return "DeviceTypeDto [code=" + code + ", locked=" + locked + "]";
	}

	@JsonIgnore
	private Character deleted;

	public Character getDeleted() {
		return deleted;
	}

	public void setDeleted(Character deleted) {
		this.deleted = deleted;
	}

	private String code;

	private Character locked;

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public Character getLocked() {
		return locked;
	}

	public void setLocked(Character locked) {
		this.locked = locked;
	}
}
