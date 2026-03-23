package com.bnt.rest.dto;

import jakarta.validation.Valid;

import org.hibernate.validator.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonProperty;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class CountryStateDto extends BaseDto {

	@NotEmpty(message = "Code should not be Empty")
	private String code;

	private Character deleted;

	public Character getDeleted() {
		return deleted;
	}

	public void setDeleted(Character deleted) {
		this.deleted = deleted;
	}

	public Integer getCountryId() {
		return countryId;
	}

	public void setCountryId(Integer countryId) {
		this.countryId = countryId;
	}

	@NotEmpty(message = "StateName should not be Empty")
	private String stateName;

	@JsonProperty(access = com.fasterxml.jackson.annotation.JsonProperty.Access.READ_ONLY)
	@Valid
	private CountryDto country;

	@JsonProperty(access = com.fasterxml.jackson.annotation.JsonProperty.Access.WRITE_ONLY)
	private Integer countryId;

	public CountryDto getCountry() {
		return country;
	}

	public void setCountry(CountryDto country) {
		this.country = country;
	}

	public String getStateName() {
		return stateName;
	}

	public void setStateName(String stateName) {
		this.stateName = stateName;
	}

	private boolean active;

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}
}
