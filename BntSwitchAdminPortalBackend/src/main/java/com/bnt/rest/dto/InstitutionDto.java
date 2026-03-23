package com.bnt.rest.dto;

import java.sql.Timestamp;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class InstitutionDto extends BaseDto {

	private String code;

	private String name;

	private String description;

	private Timestamp activateOn;

	private Timestamp expiryOn;

	private Character locked;

	private Character deleted;

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
}
