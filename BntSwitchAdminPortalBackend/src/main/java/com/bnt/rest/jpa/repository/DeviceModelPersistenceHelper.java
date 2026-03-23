package com.bnt.rest.jpa.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.DeviceModel;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface DeviceModelPersistenceHelper
		extends PagingAndSortingRepository<DeviceModel, Integer>, CrudRepository<DeviceModel, Integer> {

	@Query("select deviceModel from DeviceModel deviceModel where deviceModel.deviceType.id=?1 and deviceModel.modelName=?2")
	DeviceModel getDeviceModelByDeviceTypeAndModelName(Integer deviceTypeId, String modelName);

}
