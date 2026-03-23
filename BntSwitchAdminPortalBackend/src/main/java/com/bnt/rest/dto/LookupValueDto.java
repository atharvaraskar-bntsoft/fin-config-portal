package com.bnt.rest.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class LookupValueDto extends BaseDto {

	private String value;

	private String description;

	private Character modifiable;

	private Character active;

	private LookupTypeDto lookupType;

	public Character getModifiable() {
		return modifiable;
	}

	public void setModifiable(Character modifiable) {
		this.modifiable = modifiable;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LookupTypeDto getLookupType() {
		return lookupType;
	}

	public void setLookupType(LookupTypeDto lookupType) {
		this.lookupType = lookupType;
	}

	public Character getActive() {
		return active;
	}

	public void setActive(Character active) {
		this.active = active;
	}
}
