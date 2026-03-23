
package com.bnt.rest.jpa.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.bnt.multi.database.ReadOnlyRepository;
import com.bnt.rest.entity.Device;
import com.bnt.rest.entity.Location;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
@ReadOnlyRepository
public interface DevicePersistenceRepository
		extends CrudRepository<Device, Integer>, QuerydslPredicateExecutor<Device> {

	public Page<Device> findDeviceByDeleted(Character deleted, Pageable pageable);

	public List<Device> findDeviceByLocationAndLockedAndDeleted(Location location, char locked, char delted);

	@Query("select d.id, d.code,d.locked from Device d")
	public List<Object> getIdCodeAndLocked();

	@Query("select d.id, d.code from Device d where d.locked='0' and d.deleted='0'")
	public List<Object[]> getIdAndCode();

	@Query("select d.code from Device d where d.location = :location")
	public List<String> findDeviceCodeByLocation(@Param("location") Location location);

	@Query("SELECT l.code  FROM Device d INNER JOIN Location l ON d.location.id = l.id  where d.code= :deviceCode")
	public Object findLocationCode(@Param("deviceCode") String deviceCode);

}
