package com.bnt.ruleengine.sample;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class RowDto {

	private String ipc;

	private String txnType;

	private Integer counter;

	public RowDto(String ipc, String txnType, int counter) {
		this.setIpc(ipc);
		this.setTxnType(txnType);
		this.setCounter(counter);
	}

	public String getIpc() {
		return ipc;
	}

	public void setIpc(String ipc) {
		this.ipc = ipc;
	}

	public String getTxnType() {
		return txnType;
	}

	public void setTxnType(String txnType) {
		this.txnType = txnType;
	}

	public Integer getCounter() {
		return counter;
	}

	public void setCounter(Integer counter) {
		this.counter = counter;
	}
}
