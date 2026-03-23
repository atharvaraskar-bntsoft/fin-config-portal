package com.bnt.rest.controller;

import java.util.List;
import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bnt.common.HttpCommons;
import com.bnt.common.ResponseEntityData;
import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.RippsUtility;
import com.bnt.common.util.exception.RippsAdminRestException;
import com.bnt.constant.RippsRestConstant;
import com.bnt.rest.service.CountryService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "${crossOriginUrl}")
public class CountryController {

	private static final Logger logger = LogManager.getLogger(CountryController.class);

	private static final String ERROR_MESSAGE = "Error while retrieving countries";

	private static final String FIND_COUNTRIES_MESSAGE = "Find all countries";

	@Autowired
	private CountryService countryService;

	@Autowired
	private HttpServletRequest request;

	@GetMapping(value = "countries")
	public ResponseEntity<Map<String, Object>> getAllCountries(@RequestHeader(value = "X-Auth-Token") String xAuthToken)
			throws RippsAdminRestException {
		logger.info("Find all countries list");
		try {
			Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
			ResponseWrapper pageJPAData = countryService.findPagedCountries(requestParamMap);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find all Country");
			Map<String, Object> data = RippsUtility.setPageJPAData(pageJPAData);
			data.put("countryList", pageJPAData.getContent());
			responseEntityData.setData(data);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Find all user", null),
					HttpStatus.FORBIDDEN);
		}
	}

	@GetMapping(value = "country-list")
	public ResponseEntity<Map<String, Object>> getAllCountriesIdAndNames(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Find all countries list(ID & Name)");
		List<Map<String, String>> countryList;
		try {
			countryList = countryService.findAllCountriesIdAndNames();
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage(FIND_COUNTRIES_MESSAGE);
			responseEntityData.setData(countryList);

			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, ERROR_MESSAGE, null),
					HttpStatus.FORBIDDEN);
		}
	}

	@GetMapping(value = "countries/filter")
	public ResponseEntity<Map<String, Object>> getFilterData(@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Find country filter data");
		Map<String, Object> map = countryService.getFilterData();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setData(map);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

}
