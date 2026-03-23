package com.bnt.rest.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bnt.common.ResponseWrapper;
import com.bnt.rest.entity.DeviceType;
import com.bnt.rest.repository.DeviceTypeRepository;
import com.bnt.rest.service.DeviceTypeService;
import com.bnt.service.mapper.ListMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class DeviceTypeServiceImpl implements DeviceTypeService {

	@Autowired
	private DeviceTypeRepository deviceTypeRepository;

	@Override
	public ResponseWrapper findPagedDeviceTypes(Map<String, Object> requestParamMap) {
		return deviceTypeRepository.findPagedDeviceTypes(requestParamMap);

	}

	@Override
	public DeviceType findDeviceTypeById(int id) {
		return this.deviceTypeRepository.findOne(id);
	}

	@Override
	public Map<String, Object> getFilterData() {
		Map<String, Object> map = new HashMap<>();
		map.put("status", ListMapper.getStatus());

		return map;
	}

}