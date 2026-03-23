package com.bnt.rest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class PedsInfo {

	private String terminalId;
	private String pedId;
	private String pedSerialNo;
	private String pedAddress;
	private String pedStatus;

	public PedsInfo(String terminalId, String pedId, String pedStatus) {
		super();
		this.terminalId = terminalId;
		this.pedId = pedId;
		this.pedStatus = pedStatus;
	}

	@JsonProperty("terminal_id")
	public String getTerminalId() {
		return terminalId;
	}

	public void setTerminalId(String terminalId) {
		this.terminalId = terminalId;
	}

	@JsonProperty("ped_id")
	public String getPedId() {
		return pedId;
	}

	public void setPedId(String pedId) {
		this.pedId = pedId;
	}

	@JsonProperty("ped_serial_no")
	public String getPedSerialNo() {
		return pedSerialNo;
	}

	public void setPedSerialNo(String pedSerialNo) {
		this.pedSerialNo = pedSerialNo;
	}

	@JsonProperty("ped_address")
	public String getPedAddress() {
		return pedAddress;
	}

	public void setPedAddress(String pedAddress) {
		this.pedAddress = pedAddress;
	}

	@JsonProperty("ped_status")
	public String getPedStatus() {
		return pedStatus;
	}

	public void setPedStatus(String pedStatus) {
		this.pedStatus = pedStatus;
	}

	@Override
	public String toString() {
		return "PedsInfo [pedId=" + pedId + ", pedSerialNo=" + pedSerialNo + ", pedAddress=" + pedAddress
				+ ", pedStatus=" + pedStatus + "]";
	}
}
