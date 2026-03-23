package com.bnt.rest.jpa.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.DeviceType;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository()
public interface DeviceTypePersistenceHelper extends CrudRepository<DeviceType, Integer> {

	public DeviceType findByCode(String strip);

	public Page<DeviceType> findDeviceTypeByDeleted(Character deleted, Pageable pageable);
}
