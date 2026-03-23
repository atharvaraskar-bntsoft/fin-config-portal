package com.bnt.rest.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.util.RippsUtility;
import com.bnt.common.util.exception.RippsAdminRestException;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.CountryStateDto;
import com.bnt.rest.entity.CountryState;
import com.bnt.rest.repository.CountryRepository;
import com.bnt.rest.repository.CountryStateRepository;
import com.bnt.rest.service.CountryStateService;
import com.bnt.service.mapper.ListMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service("countryStateService")
@Transactional
public class CountryStateServiceImpl implements CountryStateService {

	@Autowired
	private CountryStateRepository countryStateRepository;

	@Autowired
	private CountryRepository countryRepository;

	@Override
	public ResponseWrapper findPagedCountryStates(Map<String, Object> requestParamMap) throws RippsAdminRestException {
		return countryStateRepository.findPagedCountryStates(requestParamMap);
	}

	@Override
	public List<Map<String, String>> findAllStatesIdAndNames() throws RippsAdminRestException {
		return this.countryStateRepository.findAll();
	}

	@Override
	public CountryState findStateById(int id) {
		return countryStateRepository.findOne(id);
	}

	public Map<String, Object> getFilterData() {
		Map<String, Object> map = new HashMap<>();
		map.put("status", ListMapper.getStatus());
		List<Map<String, String>> country = countryRepository.findAll();
		map.put("country", country);
		return map;
	}

	public CountryStateDto findCountryStateDtoById(Integer id1) {
		CountryState countryState = countryStateRepository.findOne(id1);
		CountryStateDto countryStateDto = ObjectMapper.mapToDto(countryState, CountryStateDto.class);
		countryStateDto.setActive(RippsUtility.convertActiveToBoolean(countryState.getActive()));
		return countryStateDto;
	}

}
