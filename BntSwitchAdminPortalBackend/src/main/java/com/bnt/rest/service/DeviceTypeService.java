package com.bnt.rest.service;

import java.util.Map;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.util.exception.RippsAdminRestException;
import com.bnt.rest.entity.DeviceType;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface DeviceTypeService {

	public ResponseWrapper findPagedDeviceTypes(Map<String, Object> requestParamMap) throws RippsAdminRestException;

	DeviceType findDeviceTypeById(int id);

	public Map<String, Object> getFilterData();
}
