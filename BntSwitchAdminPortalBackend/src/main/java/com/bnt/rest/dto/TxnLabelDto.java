package com.bnt.rest.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class TxnLabelDto extends BaseDto {

	private String locale;

	private String txnKey;

	private String label;

	private Character preSeeded;

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
