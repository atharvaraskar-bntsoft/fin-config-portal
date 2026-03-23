package com.bnt.rest.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

/**************************
 * @author vaibhav.shejol *
 **************************/

//@Audited
@Entity
@Table(name = "ui_txn_label")
public class TxnLabel extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Column(name = "locale")
	private String locale;

	@Column(name = "txn_key")
	private String txnKey;

	@Column(name = "label")
	private String label;

	@Column(name = "pre_seeded")
	private Character preSeeded;

	@Column(name = "active")
	private Character active;

	public String getLocale() {
		return locale;
	}

	public void setLocale(String locale) {
		this.locale = locale;
	}

	public String getTxnKey() {
		return txnKey;
	}

	public void setTxnKey(String txnKey) {
		this.txnKey = txnKey;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public Character getPreSeeded() {
		return preSeeded;
	}

	public void setPreSeeded(Character preSeeded) {
		this.preSeeded = preSeeded;
	}

	public Character getActive() {
		return active;
	}

	public void setActive(Character active) {
		this.active = active;
	}
}
