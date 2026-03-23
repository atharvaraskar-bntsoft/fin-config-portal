package com.bnt.rest.repository.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import com.bnt.rest.entity.DeviceModel;
import com.bnt.rest.jpa.repository.DeviceModelPersistenceHelper;
import com.bnt.rest.repository.DeviceModelRepository;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Component
public class DeviceModelRepositoryImpl implements DeviceModelRepository {

	@Autowired
	private DeviceModelPersistenceHelper deviceModelPersistenceHelper;

	@Override
	public DeviceModel getDeviceModelById(Integer id) {
		return deviceModelPersistenceHelper.findById(id).orElse(null);
	}

	@Override
	public DeviceModel getDeviceModelByDeviceType(Integer deviceType) {
		return null;
	}

	@Override
	public DeviceModel getDeviceModelByDeviceTypeAndModelName(Integer deviceTypeId, String modelName) {
		return deviceModelPersistenceHelper.getDeviceModelByDeviceTypeAndModelName(deviceTypeId, modelName);
	}

	@Override
	public Page<DeviceModel> getPagbleDeviceModel(Pageable pageable) {
		return deviceModelPersistenceHelper.findAll(pageable);
	}

	@Override
	public Iterable<DeviceModel> findAll() {
		return deviceModelPersistenceHelper.findAll();
	}

}
