package com.bnt.rest.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import org.hibernate.annotations.Where;
import org.hibernate.envers.Audited;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Audited
@Table(name = "currency")
@Where(clause = "deleted='0'")
public class Currency extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Column(name = "code", nullable = false)
	private String code;

	@Column(name = "iso_code", nullable = false)
	private String isoCode;

	@Column(name = "display_name", nullable = false)
	private String currencyName;

	@Column(name = "active", nullable = false)
	private Character active;

	@Column(name = "currency_minor_unit", nullable = false)
	private String currencyMinorUnit;

	public Character getDeleted() {
		return deleted;
	}

	public void setDeleted(Character deleted) {
		this.deleted = deleted;
	}

	@Column(name = "deleted", nullable = false)
	private Character deleted;

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

	public Character getActive() {
		return active;
	}

	public void setActive(Character active) {
		this.active = active;
	}

	public String getCurrencyMinorUnit() {
		return currencyMinorUnit;
	}

	public void setCurrencyMinorUnit(String currencyMinorUnit) {
		this.currencyMinorUnit = currencyMinorUnit;
	}
}
