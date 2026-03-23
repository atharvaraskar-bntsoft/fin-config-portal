package com.bnt.rest.jpa.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.DeviceType;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository()
public interface DeviceTypePersistenceRepository extends CrudRepository<DeviceType, Integer> {

	public DeviceType findDeviceTypeByCode(String code);

}
