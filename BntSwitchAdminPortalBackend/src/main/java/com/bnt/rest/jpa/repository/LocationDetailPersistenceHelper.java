package com.bnt.rest.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.LocationDetail;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface LocationDetailPersistenceHelper extends CrudRepository<LocationDetail, Integer> {
	@Query("select DISTINCT m.city,m.country.countryName from LocationDetail m")
	public List<Object[]> findCityAndCountry();

}