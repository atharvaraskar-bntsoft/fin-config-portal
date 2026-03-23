package com.bnt.rest.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.MerchantInstitutionDetail;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface MerchantInsDetailPersistenceRepository extends CrudRepository<MerchantInstitutionDetail, Integer> {

	@Query("select DISTINCT m.city,m.country.countryName from MerchantInstitutionDetail m")
	public List<Object[]> findCityAndCountry();

}
