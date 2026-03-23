package com.bnt.rest.service;

import java.util.List;
import java.util.Map;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.util.exception.RippsAdminRestException;
import com.bnt.rest.dto.CountryStateDto;
import com.bnt.rest.entity.CountryState;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface CountryStateService {

	public ResponseWrapper findPagedCountryStates(Map<String, Object> requestParamMap) throws RippsAdminRestException;

	List<Map<String, String>> findAllStatesIdAndNames() throws RippsAdminRestException;

	public CountryState findStateById(int id);

	public Map<String, Object> getFilterData();

	public CountryStateDto findCountryStateDtoById(Integer id1);

}
