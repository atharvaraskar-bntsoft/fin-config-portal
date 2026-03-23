package com.bnt.rest.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;

import com.bnt.common.util.annotations.PhoneFormat;
import com.bnt.rest.wrapper.dto.CountryWrapperDto;
import com.bnt.rest.wrapper.dto.StateWrapperDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class MerchantDetailDto extends BaseDto {

	private String address1;

	private String address2;

	private String city;

	private String zip;

	private CountryWrapperDto country;

	private StateWrapperDto countryState;

	@PhoneFormat
	private String phone;

	private String fax;
	@Pattern(regexp = ".+@.+\\.[a-z]+")
	@NotEmpty(message = "Email must not be empty")
	private String email;

	@NotEmpty(message = "Address1 should not be empty")
	public String getAddress1() {
		return address1;
	}

	public void setAddress1(String address1) {
		this.address1 = address1;
	}

	public String getAddress2() {
		return address2;
	}

	public void setAddress2(String address2) {
		this.address2 = address2;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getZip() {
		return zip;
	}

	public void setZip(String zip) {
		this.zip = zip;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getFax() {
		return fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public CountryWrapperDto getCountry() {
		return country;
	}

	public void setCountry(CountryWrapperDto country) {
		this.country = country;
	}

	public StateWrapperDto getCountryState() {
		return countryState;
	}

	public void setCountryState(StateWrapperDto countryState) {
		this.countryState = countryState;
	}

	@Override
	public String toString() {
		return "MerchantDetailDto [address1=" + address1 + ", address2=" + address2 + ", city=" + city + ", zip=" + zip
				+ ", country=" + country + ", countryState=" + countryState + ", phone=" + phone + ", fax=" + fax
				+ ", email=" + email + "]";
	}
}
