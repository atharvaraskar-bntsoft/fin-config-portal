package com.bnt.rest.repository;

import java.util.List;
import java.util.Map;

import com.bnt.common.ResponseWrapper;
import com.bnt.rest.entity.Country;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface CountryRepository {

	ResponseWrapper findAll(Map<String, Object> requestParamMap);

	List<Map<String, String>> findAll();

	Country findOne(int i);

	void deleteById(int id);

	Country findByCountryName(String name);

}
