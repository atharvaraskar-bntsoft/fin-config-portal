package com.bnt.rest.repository.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.bnt.rest.entity.DeviceModelConfiguration;
import com.bnt.rest.jpa.repository.DeviceModelConfigurationPersistenceHelper;
import com.bnt.rest.repository.DeviceModelConfigurationRepository;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Component
public class DeviceModelConfigurationRepositoryImpl implements DeviceModelConfigurationRepository {

	@Autowired
	private DeviceModelConfigurationPersistenceHelper deviceModelConfigurationPersistenceHelper;

	@Override
	public Integer getMaxVersionByDeviceTypeAndModelName(Integer deviceTypeId, String modelName) {
		return deviceModelConfigurationPersistenceHelper.getMaxVersionByDeviceTypeAndModelName(deviceTypeId, modelName);
	}

	@Override
	public DeviceModelConfiguration getActiveConfigByDeviceTypeAndModelName(Integer deviceTypeId, String modelName) {
		return deviceModelConfigurationPersistenceHelper.getActiveConfigByDeviceTypeAndModelName(deviceTypeId,
				modelName);
	}

	@Override
	public Integer getMaxVersionByDeviceModelId(Integer deviceModelId) {
		return deviceModelConfigurationPersistenceHelper.getMaxVersionByDeviceModelId(deviceModelId);
	}

	@Override
	public DeviceModelConfiguration getActiveConfigByDeviceModelId(Integer deviceModelId) {
		return deviceModelConfigurationPersistenceHelper.getActiveConfigByDeviceModelId(deviceModelId);
	}
}
