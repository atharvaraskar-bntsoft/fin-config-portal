package com.bnt.rest.repository;

import java.util.List;
import java.util.Map;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.util.exception.RippsAdminRestException;
import com.bnt.rest.entity.CountryState;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface CountryStateRepository {

	public ResponseWrapper findPagedCountryStates(Map<String, Object> requestParamMap) throws RippsAdminRestException;

	public CountryState findOne(int id);

	List<Map<String, String>> findAll();

	public CountryState findByStateName(String stateName);
}
