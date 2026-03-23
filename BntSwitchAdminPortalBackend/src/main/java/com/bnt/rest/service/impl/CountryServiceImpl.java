package com.bnt.rest.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.util.RippsUtility;
import com.bnt.common.util.exception.RippsAdminRestException;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.CountryDto;
import com.bnt.rest.entity.Country;
import com.bnt.rest.repository.CountryRepository;
import com.bnt.rest.service.CountryService;
import com.bnt.service.mapper.ListMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service("countryService")
@Transactional
public class CountryServiceImpl implements CountryService {

	@Autowired
	private CountryRepository countryRepository;

	@PersistenceContext
	public EntityManager entityManager;

	@Override
	public List<Map<String, String>> findAllCountriesIdAndNames() throws RippsAdminRestException {
		return this.countryRepository.findAll();
	}

	@Override
	public ResponseWrapper findPagedCountries(Map<String, Object> requestParamMap) {
		return this.countryRepository.findAll(requestParamMap);
	}

	@Override
	public Country findCountryById(int id) {
		return countryRepository.findOne(id);
	}

	@Override
	public Map<String, Object> getFilterData() {
		Map<String, Object> map = new HashMap<>();
		map.put("status", ListMapper.getStatus());

		return map;
	}

	@Override
	public Object findCountryDtoById(Integer countryId) {
		Country country = countryRepository.findOne(countryId);
		CountryDto countryDto = ObjectMapper.mapToDto(country, CountryDto.class);
		countryDto.setActive(RippsUtility.convertActiveToBoolean(country.getActive()));
		return countryDto;
	}

}
