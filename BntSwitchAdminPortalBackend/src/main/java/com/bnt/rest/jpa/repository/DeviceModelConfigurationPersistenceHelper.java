package com.bnt.rest.jpa.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.DeviceModelConfiguration;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface DeviceModelConfigurationPersistenceHelper extends CrudRepository<DeviceModelConfiguration, Integer> {

	// @Query("select max(version) from DeviceModelConfiguration config where
	// config.deviceModel.id = (select model.id DeviceModel model where
	// model.deviceType.id=?1 and model.modelName=?2 )")
	@Query("select max(version) from DeviceModelConfiguration config where config.deviceModel.deviceType.id=?1 and config.deviceModel.modelName=?2")
	Integer getMaxVersionByDeviceTypeAndModelName(Integer deviceTypeId, String modelName);

	// @Query("select config from DeviceModelConfiguration config where
	// config.active='1' and config.deviceModel.id = (select model.id DeviceModel
	// model where model.deviceType.id=?1 and model.modelName=?2 )")
	@Query("select config from DeviceModelConfiguration config where config.active='1' and config.deviceModel.deviceType.id=?1 and config.deviceModel.modelName=?2 ")
	DeviceModelConfiguration getActiveConfigByDeviceTypeAndModelName(Integer deviceTypeId, String modelName);

	@Query("select max(version) from DeviceModelConfiguration config where config.deviceModel.id= ?1 ")
	Integer getMaxVersionByDeviceModelId(Integer deviceModelId);

	@Query("select config from DeviceModelConfiguration config where config.active='1' and config.deviceModel.id= ?1 ")
	DeviceModelConfiguration getActiveConfigByDeviceModelId(Integer deviceModelId);

}
