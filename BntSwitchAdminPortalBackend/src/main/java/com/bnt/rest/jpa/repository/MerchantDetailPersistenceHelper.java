package com.bnt.rest.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.MerchantDetail;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface MerchantDetailPersistenceHelper extends CrudRepository<MerchantDetail, Integer> {

	@Query("select DISTINCT m.city,m.country.countryName from MerchantDetail m")
	public List<Object[]> findCityAndCountry();

}