package com.bnt.rest.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
//@Audited
@Table(name = "country")
public class Country extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Column(name = "code", nullable = false)
	private String code;

	@Column(name = "display_name", nullable = false)
	private String countryName;

	@OneToOne
	@JoinColumn(name = "currency")
	private Currency currency;

	@Column(name = "iso_code", nullable = false)
	private String isoCode;

	@Column(name = "short_code", nullable = false)
	private String shortCode;

	@Column(name = "isd_code", nullable = false)
	private String isdCode;

	@Column(name = "active", nullable = false)
	private Character active;

	public Character getActive() {
		return active;
	}

	public void setActive(Character active) {
		this.active = active;
	}

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

	public Currency getCurrency() {
		return currency;
	}

	public void setCurrency(Currency currency) {
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

	@Override
	public String toString() {
		return "Country [code=" + code + ", countryName=" + countryName + ", currency=" + currency + ", isoCode="
				+ isoCode + ", shortCode=" + shortCode + ", isdCode=" + isdCode + ", active=" + active + "]";
	}
}
