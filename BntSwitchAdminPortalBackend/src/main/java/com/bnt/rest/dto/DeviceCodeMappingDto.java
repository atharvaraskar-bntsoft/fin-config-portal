package com.bnt.rest.dto;

import org.hibernate.validator.constraints.NotEmpty;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class DeviceCodeMappingDto extends BaseDto {

	private DtoWrapper processorId;

	@NotEmpty(message = "Device Code should not be Empty")
	private String deviceCode;

	public Character getDeleted() {
		return deleted;
	}

	public void setDeleted(Character deleted) {
		this.deleted = deleted;
	}

	@NotEmpty(message = "Processor Device Code should not be Empty")
	private String processorDeviceCode;

	private boolean active;

	private Character deleted;

	public DtoWrapper getProcessorId() {
		return processorId;
	}

	public void setProcessorId(DtoWrapper processorId) {
		this.processorId = processorId;
	}

	public String getDeviceCode() {
		return deviceCode;
	}

	public void setDeviceCode(String deviceCode) {
		this.deviceCode = deviceCode;
	}

	public String getProcessorDeviceCode() {
		return processorDeviceCode;
	}

	public void setProcessorDeviceCode(String processorDeviceCode) {
		this.processorDeviceCode = processorDeviceCode;
	}

	public boolean getActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}
}
