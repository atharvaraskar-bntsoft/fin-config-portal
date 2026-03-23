package com.bnt.rest.jpa.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.Country;
import com.bnt.rest.entity.CountryState;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository()
public interface CountryStatePersistenceHelper extends CrudRepository<CountryState, Integer> {
	public List<CountryState> findCountryStateByCountry(Country country);

	public CountryState findByStateName(String stateName);

	public Page<CountryState> findCountryStateByCountry(Character c, Pageable pageable);

}
