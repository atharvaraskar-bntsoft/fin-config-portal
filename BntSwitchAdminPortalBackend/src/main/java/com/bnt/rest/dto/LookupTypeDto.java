package com.bnt.rest.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class LookupTypeDto extends BaseDto {

	private String name;

	private String description;

	public Character getModifiable() {
		return modifiable;
	}

	public void setModifiable(Character modifiable) {
		this.modifiable = modifiable;
	}

	private Character modifiable;

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
}
