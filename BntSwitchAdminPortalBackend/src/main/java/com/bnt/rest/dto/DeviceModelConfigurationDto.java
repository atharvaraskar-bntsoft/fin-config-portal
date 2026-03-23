package com.bnt.rest.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class DeviceModelConfigurationDto extends BaseDto {

	@JsonBackReference
	private DeviceModelDto deviceModel;

	private Integer version;

	private String configurationData;

	private String emvData;

	private Character active;

	public DeviceModelDto getDeviceModel() {
		return deviceModel;
	}

	public void setDeviceModel(DeviceModelDto deviceModel) {
		this.deviceModel = deviceModel;
	}

	public Integer getVersion() {
		return version;
	}

	public void setVersion(Integer version) {
		this.version = version;
	}

	public String getConfigurationData() {
		return configurationData;
	}

	public void setConfigurationData(String configurationData) {
		this.configurationData = configurationData;
	}

	public String getEmvData() {
		return emvData;
	}

	public void setEmvData(String emvData) {
		this.emvData = emvData;
	}

	public Character getActive() {
		return active;
	}

	public void setActive(Character active) {
		this.active = active;
	}
}
