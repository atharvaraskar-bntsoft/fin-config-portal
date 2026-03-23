package com.bnt.rest.repository;

import java.util.Map;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.util.exception.RippsAdminRestException;
import com.bnt.rest.entity.DeviceType;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface DeviceTypeRepository {

	public ResponseWrapper findPagedDeviceTypes(Map<String, Object> requestParamMap) throws RippsAdminRestException;

	DeviceType findOne(int id);

}
