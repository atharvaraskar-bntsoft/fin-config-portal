package com.bnt.rest.dto;

import org.hibernate.validator.constraints.NotEmpty;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class CurrencyDto extends BaseDto {

	@NotEmpty(message = "Code should not be Empty")
	private String code;

	@NotEmpty(message = "IsoCode should not be Empty")
	private String isoCode;

	@NotEmpty(message = "CurrencyName should not be Empty")
	private String currencyName;

	private boolean active;

	private String currencyMinorUnit;

	private Character deleted;

	public Character getDeleted() {
		return deleted;
	}

	public void setDeleted(Character deleted) {
		this.deleted = deleted;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getIsoCode() {
		return isoCode;
	}

	public void setIsoCode(String isoCode) {
		this.isoCode = isoCode;
	}

	public String getCurrencyName() {
		return currencyName;
	}

	public void setCurrencyName(String currencyName) {
		this.currencyName = currencyName;
	}

	public String getCurrencyMinorUnit() {
		return currencyMinorUnit;
	}

	public void setCurrencyMinorUnit(String currencyMinorUnit) {
		this.currencyMinorUnit = currencyMinorUnit;
	}

	public boolean getActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	@Override
	public String toString() {
		return "Country [code=" + code + ", currencyName=" + currencyName + ", currencyMinorUnit=" + currencyMinorUnit
				+ ", active=" + active + "]";
	}
}
