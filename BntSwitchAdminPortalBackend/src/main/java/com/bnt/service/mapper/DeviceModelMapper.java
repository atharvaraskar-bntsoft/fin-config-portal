package com.bnt.service.mapper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.bnt.rest.dto.DeviceModelDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class DeviceModelMapper {

	private static Log logger = LogFactory.getLog(DeviceModelMapper.class);

	private DeviceModelMapper() {

	}

	public static Map<String, List<DeviceModelDto>> getDeviceTypeDeviceModel(
			List<DeviceModelDto> deviceModelValueList) {
		logger.info("inside getDeviceTypeDeviceModel");
		Map<String, List<DeviceModelDto>> deviceModelMap = new HashMap<>();
		List<DeviceModelDto> deviceModelDtoList = null;
		String deviceTypeCode = "";
		if (deviceModelValueList != null) {
			for (DeviceModelDto deviceModelDto : deviceModelValueList) {
				{
					deviceTypeCode = deviceModelDto.getDeviceType().getCode();
					deviceModelDtoList = deviceModelMap.get(deviceTypeCode);
					if (deviceModelDtoList == null) {
						deviceModelDtoList = new ArrayList<>();
					}
					deviceModelDtoList.add(deviceModelDto);
					deviceModelMap.put(deviceTypeCode, deviceModelDtoList);
				}
			}
		}
		logger.info("completed getDeviceTypeDeviceModel");
		return deviceModelMap;
	}
}
