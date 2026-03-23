package com.bnt.rest.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class AdapterDto extends BaseDto {

	private String type;

	private StandardMessageSpecificationDto standardMessageSpecification;

	private String name;

	private String adapterId;

	private Character active;

	private String guid;

	@JsonIgnore
	private List<AdapterConfigurationDto> adapterConfiguration;

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAdapterId() {
		return adapterId;
	}

	public void setAdapterId(String adapterId) {
		this.adapterId = adapterId;
	}

	public Character getActive() {
		return active;
	}

	public void setActive(Character active) {
		this.active = active;
	}

	public String getGuid() {
		return guid;
	}

	public void setGuid(String guid) {
		this.guid = guid;
	}

	public StandardMessageSpecificationDto getStandardMessageSpecification() {
		return standardMessageSpecification;
	}

	public void setStandardMessageSpecification(StandardMessageSpecificationDto standardMessageSpecification) {
		this.standardMessageSpecification = standardMessageSpecification;
	}

	public List<AdapterConfigurationDto> getAdapterConfiguration() {
		return adapterConfiguration;
	}

	public void setAdapterConfiguration(List<AdapterConfigurationDto> adapterConfiguration) {
		this.adapterConfiguration = adapterConfiguration;
	}
}
