package com.bnt.rest.dto;

import org.hibernate.validator.constraints.NotEmpty;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class CountryZoneSchemeDto extends BaseDto {

	@NotEmpty(message = "Code should not be Empty")
	private String countryCode;

	private String countryName;

	@NotEmpty(message = "Scheme should not be Empty")
	private String scheme;

	@NotEmpty(message = "ZoneCode should not be Empty")
	private String zoneCode;

	public String getCountryCode() {
		return countryCode;
	}

	public void setCountryCode(String countryCode) {
		this.countryCode = countryCode;
	}

	public String getCountryName() {
		return countryName;
	}

	public void setCountryName(String countryName) {
		this.countryName = countryName;
	}

	public String getScheme() {
		return scheme;
	}

	public void setScheme(String scheme) {
		this.scheme = scheme;
	}

	public String getZoneCode() {
		return zoneCode;
	}

	public void setZoneCode(String zoneCode) {
		this.zoneCode = zoneCode;
	}

	public boolean getActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public boolean getDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	private boolean active;

	private boolean deleted;
}
