package com.bnt.rest.repository;

import com.bnt.rest.entity.DeviceModelConfiguration;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface DeviceModelConfigurationRepository {

	Integer getMaxVersionByDeviceTypeAndModelName(Integer deviceTypeId, String modelName);

	DeviceModelConfiguration getActiveConfigByDeviceTypeAndModelName(Integer deviceTypeId, String modelName);

	Integer getMaxVersionByDeviceModelId(Integer deviceModelId);

	DeviceModelConfiguration getActiveConfigByDeviceModelId(Integer deviceModelId);
}
