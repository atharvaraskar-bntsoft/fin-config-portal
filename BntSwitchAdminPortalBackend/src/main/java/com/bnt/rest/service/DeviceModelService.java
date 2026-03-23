package com.bnt.rest.service;

import java.util.List;
import java.util.Map;

import com.bnt.common.ResponseWrapper;
import com.bnt.rest.dto.DeviceModelDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface DeviceModelService {

	DeviceModelDto getDataModelById(Integer id);

	ResponseWrapper getPagableDeviceModel(Map<String, Object> requestParamMap);

	boolean validateDeviceModelName(Integer deviceTypeId, String modelName);

	List<DeviceModelDto> findAll();

	Map<String, List<DeviceModelDto>> getDeviceTypeDeviceModel();

}
