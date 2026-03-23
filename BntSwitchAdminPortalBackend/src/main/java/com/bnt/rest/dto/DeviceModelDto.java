
package com.bnt.rest.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class DeviceModelDto extends BaseDto {

	private DeviceTypeDto deviceType;

	private String modelName;

	@JsonManagedReference
	private List<DeviceModelConfigurationDto> deviceModelConfiguration;

	public DeviceTypeDto getDeviceType() {
		return deviceType;
	}

	public void setDeviceType(DeviceTypeDto deviceType) {
		this.deviceType = deviceType;
	}

	public String getModelName() {
		return modelName;
	}

	public void setModelName(String modelName) {
		this.modelName = modelName;
	}

	public List<DeviceModelConfigurationDto> getDeviceModelConfiguration() {
		return deviceModelConfiguration;
	}

	public void setDeviceModelConfiguration(List<DeviceModelConfigurationDto> deviceModelConfiguration) {
		this.deviceModelConfiguration = deviceModelConfiguration;
	}
}
