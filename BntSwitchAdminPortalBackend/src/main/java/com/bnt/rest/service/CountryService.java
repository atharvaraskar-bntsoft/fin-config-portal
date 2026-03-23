package com.bnt.rest.service;

import java.util.List;
import java.util.Map;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.util.exception.RippsAdminRestException;
import com.bnt.rest.entity.Country;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface CountryService {

	public ResponseWrapper findPagedCountries(Map<String, Object> requestParamMap) throws RippsAdminRestException;

	List<Map<String, String>> findAllCountriesIdAndNames() throws RippsAdminRestException;

	public Country findCountryById(int id);

	public Map<String, Object> getFilterData();

	public Object findCountryDtoById(Integer countryId);

}
