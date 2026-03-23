package com.bnt.rest.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import org.hibernate.envers.Audited;
import org.hibernate.envers.NotAudited;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Audited
@Table(name = "acquirer_id_config")
public class AcquirerIdConfig extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Column(name = "deleted", nullable = false)
	private Character deleted;

	@Column(name = "advice_match")
	private Character adviceMatch;

	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "onus_validate")
	private String onusValidate;

	@Column(name = "refund_offline")
	private Character refundOffline;

	@Column(name = "code", nullable = false)
	private String code;

	@Column(name = "description", nullable = false)
	private String description;

	@Column(name = "active", nullable = false)
	private boolean active;

	@OneToOne
	@JoinColumn(name = "country_id", nullable = false)
	@NotAudited
	private Country country;

	@Column(name = "pos_sms", nullable = true)
	private String posSms;
	@Column(name = "pos_dms", nullable = true)
	private String posDms;
	@Column(name = "txntype_sms", nullable = true)
	private String txntypeSms;
	@Column(name = "txntype_dms", nullable = true)
	private String txntypeDms;
	@Column(name = "accounttype_sms", nullable = true)
	private String accounttypeSms;
	@Column(name = "accounttype_dms", nullable = true)
	private String accounttypeDms;

	public Character getRefundOffline() {
		return refundOffline;
	}

	public void setRefundOffline(Character refundOffline) {
		this.refundOffline = refundOffline;
	}

	public String getName() {
		return name;
	}

	public String getOnusValidate() {
		return onusValidate;
	}

	public void setOnusValidate(String onusValidate) {
		this.onusValidate = onusValidate;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Character getDeleted() {
		return deleted;
	}

	public void setDeleted(Character deleted) {
		this.deleted = deleted;
	}

	public Country getCountry() {
		return country;
	}

	public void setCountry(Country country) {
		this.country = country;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public boolean getActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	@Override
	public String toString() {
		return description;
	}

	public String getPosSms() {
		return posSms;
	}

	public void setPosSms(String posSms) {
		this.posSms = posSms;
	}

	public String getPosDms() {
		return posDms;
	}

	public void setPosDms(String posDms) {
		this.posDms = posDms;
	}

	public String getTxntypeSms() {
		return txntypeSms;
	}

	public void setTxntypeSms(String txntypeSms) {
		this.txntypeSms = txntypeSms;
	}

	public String getTxntypeDms() {
		return txntypeDms;
	}

	public void setTxntypeDms(String txntypeDms) {
		this.txntypeDms = txntypeDms;
	}

	public String getAccounttypeSms() {
		return accounttypeSms;
	}

	public void setAccounttypeSms(String accounttypeSms) {
		this.accounttypeSms = accounttypeSms;
	}

	public String getAccounttypeDms() {
		return accounttypeDms;
	}

	public void setAccounttypeDms(String accounttypeDms) {
		this.accounttypeDms = accounttypeDms;
	}

	public Character getAdviceMatch() {
		return adviceMatch;
	}

	public void setAdviceMatch(Character adviceMatch) {
		this.adviceMatch = adviceMatch;
	}
}
