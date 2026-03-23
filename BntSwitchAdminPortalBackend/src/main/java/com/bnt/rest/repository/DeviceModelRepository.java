package com.bnt.rest.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.bnt.rest.entity.DeviceModel;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface DeviceModelRepository {

	public DeviceModel getDeviceModelById(Integer id);

	public DeviceModel getDeviceModelByDeviceType(Integer deviceType);

	public DeviceModel getDeviceModelByDeviceTypeAndModelName(Integer deviceTypeId, String modelName);

	Page<DeviceModel> getPagbleDeviceModel(Pageable pageable);

	Iterable<DeviceModel> findAll();

}
