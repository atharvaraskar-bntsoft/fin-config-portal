package com.bnt.rest.service.impl;

import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.util.JPAUtils;
import com.bnt.constant.ParameterConstant;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.HolidayCalenderDto;
import com.bnt.rest.entity.Country;
import com.bnt.rest.entity.HolidayCalender;
import com.bnt.rest.jpa.repository.CountryPersistenceHelper;
import com.bnt.rest.jpa.repository.HolidayCalenderPersistenceHelper;
import com.bnt.rest.repository.HolidayCalenderRepository;
import com.bnt.rest.service.HolidayCalenderService;
import com.bnt.rest.wrapper.dto.IdAndNameWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class HolidayCalenderServiceImpl implements HolidayCalenderService {

	private static final Logger log = LogManager.getLogger(HolidayCalenderServiceImpl.class);

	@Autowired
	HolidayCalenderPersistenceHelper holidayCalenderPersistenceHelper;

	@Autowired
	HolidayCalenderRepository holidayCalenderRepository;

	@Autowired
	private CountryPersistenceHelper countryPersistenceHelper;

	@Override
	public ResponseWrapper findAllHolidayList(Map<String, Object> requestParamMap) {

		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		String[] filters = (String[]) requestParamMap.get(ParameterConstant.FILTERS);

		Page<HolidayCalender> holidayCalenderpage = null;

		holidayCalenderpage = holidayCalenderRepository.findFilterData(pageable, filters);

		ResponseWrapper pageJPAData = new ResponseWrapper();
		pageJPAData.setPageNo(holidayCalenderpage.getNumber() + 1);
		pageJPAData.setTotalRecords(holidayCalenderpage.getTotalElements());
		pageJPAData.setContent(holidayCalenderpage.getContent().stream().map(value -> {
			HolidayCalenderDto dto = ObjectMapper.mapToDto(value, HolidayCalenderDto.class);
			Country country = countryPersistenceHelper.findById(value.getCountryId()).get();
			IdAndNameWrapper countryId = new IdAndNameWrapper();
			countryId.setId(value.getCountryId());
			countryId.setName(country.getCountryName());
			dto.setCountryId(countryId);
			return dto;
		}).toList());
		return pageJPAData;
	}
}
