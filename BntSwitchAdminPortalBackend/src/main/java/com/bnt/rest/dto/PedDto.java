package com.bnt.rest.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class PedDto {

	public String pedId;

	public String pedSerialNo;

	public String pedAddress;

	public String pedStatus;

	public String getPedId() {
		return pedId;
	}

	public void setPedId(String pedId) {
		this.pedId = pedId;
	}

	public String getPedSerialNo() {
		return pedSerialNo;
	}

	public void setPedSerialNo(String pedSerialNo) {
		this.pedSerialNo = pedSerialNo;
	}

	public String getPedAddress() {
		return pedAddress;
	}

	public void setPedAddress(String pedAddress) {
		this.pedAddress = pedAddress;
	}

	public String getPedStatus() {
		return pedStatus;
	}

	public void setPedStatus(String pedStatus) {
		this.pedStatus = pedStatus;
	}
}
