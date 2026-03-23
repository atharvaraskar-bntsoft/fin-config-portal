package com.bnt.rest.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class TxnLogJsonWrapper {

	String jsonData;
	String txnType;

	public String getJsonData() {
		return jsonData;
	}

	public void setJsonData(String jsonData) {
		this.jsonData = jsonData;
	}

	public String getTxnType() {
		return txnType;
	}

	public void setTxnType(String txnType) {
		this.txnType = txnType;
	}
}
