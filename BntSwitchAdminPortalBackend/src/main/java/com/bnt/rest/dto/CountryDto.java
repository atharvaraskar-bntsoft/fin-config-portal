package com.bnt.rest.dto;

import jakarta.validation.Valid;

import org.hibernate.validator.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonProperty;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class CountryDto extends BaseDto {

	@NotEmpty(message = "Code should not be Empty")
	private String code;

	@NotEmpty(message = "Name should not be Empty")
	private String countryName;

	@JsonProperty(access = com.fasterxml.jackson.annotation.JsonProperty.Access.READ_ONLY)
	@Valid
	private CurrencyDto currency;

	@JsonProperty(access = com.fasterxml.jackson.annotation.JsonProperty.Access.WRITE_ONLY)
	private Integer currencyId;

	@NotEmpty(message = "IsoCode should not be Empty")
	private String isoCode;

	@NotEmpty(message = "ShortCode should not be Empty")
	private String shortCode;

	public Integer getCurrencyId() {
		return currencyId;
	}

	public void setCurrencyId(Integer currencyId) {
		this.currencyId = currencyId;
	}

	public Character getDeleted() {
		return deleted;
	}

	public void setDeleted(Character deleted) {
		this.deleted = deleted;
	}

	private String isdCode;

	private boolean active;

	private Character deleted;

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getCountryName() {
		return countryName;
	}

	public void setCountryName(String countryName) {
		this.countryName = countryName;
	}

	public CurrencyDto getCurrency() {
		return currency;
	}

	public void setCurrency(CurrencyDto currency) {
		this.currency = currency;
	}

	public String getIsoCode() {
		return isoCode;
	}

	public void setIsoCode(String isoCode) {
		this.isoCode = isoCode;
	}

	public String getShortCode() {
		return shortCode;
	}

	public void setShortCode(String shortCode) {
		this.shortCode = shortCode;
	}

	public String getIsdCode() {
		return isdCode;
	}

	public void setIsdCode(String isdCode) {
		this.isdCode = isdCode;
	}

	public final boolean getActive() {
		return active;
	}

	public final void setActive(boolean active) {
		this.active = active;
	}
}
