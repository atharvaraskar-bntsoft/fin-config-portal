package com.bnt.rest.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.bnt.rest.entity.Device;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface DeviceRepository {

	public Page<Device> findFilterData(Pageable pageable, String[] filters);

	Device findDeviceById(Integer deviceId);

	String getDeviceCodeById(Integer id);

	public String getLocationCode(String deviceCode);

}
