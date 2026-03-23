package com.bnt.rest.service;

import java.util.Map;

import com.bnt.common.ResponseWrapper;
import com.bnt.rest.entity.Device;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface DeviceService {

	ResponseWrapper getDeviceList(Map<String, Object> requestParamMap);

	Device findDeviceById(int id);

	Map<String, Object> getFilterData();
}
