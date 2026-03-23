package com.bnt.rest.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.Country;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository()
public interface CountryPersistenceHelper
		extends PagingAndSortingRepository<Country, Integer>, CrudRepository<Country, Integer> {

	@Query("select s.countryName, s.id from Country s")
	public List<String> findCountryName();

	public Country findByCountryName(String displayName);
}