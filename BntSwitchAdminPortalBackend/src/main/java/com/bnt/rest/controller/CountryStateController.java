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
import com.bnt.rest.service.CountryStateService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping(value = "/")
@CrossOrigin(origins = "${crossOriginUrl}")
public class CountryStateController {

	private static final Logger logger = LogManager.getLogger(CountryStateController.class);
	private static final String ERROR_MESSAGE = "Error while retrieving country states";
	private static final String FIND_COUNTRIES_MESSAGE = "Find all countries";

	@Autowired
	private CountryStateService countryStateService;
	@Autowired
	private HttpServletRequest request;

	@GetMapping(value = "states")
	public ResponseEntity<Map<String, Object>> getAllCountryStates(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) throws RippsAdminRestException {
		logger.info("Find all country-states list");
		try {
			Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
			ResponseWrapper pageJPAData = countryStateService.findPagedCountryStates(requestParamMap);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage(FIND_COUNTRIES_MESSAGE);
			Map<String, Object> data = RippsUtility.setPageJPAData(pageJPAData);
			data.put("stateList", pageJPAData.getContent());
			responseEntityData.setData(data);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Find all user", null),
					HttpStatus.FORBIDDEN);
		}
	}

	@GetMapping(value = "country-states-list")
	public ResponseEntity<Map<String, Object>> getAllCountriesIdAndNames(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Find all country-states list(ID & Name)");
		List<Map<String, String>> countryList;
		try {
			countryList = countryStateService.findAllStatesIdAndNames();
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage(FIND_COUNTRIES_MESSAGE);
			responseEntityData.setData(RippsUtility.getMapData("countryStateList", countryList));
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, ERROR_MESSAGE, null),
					HttpStatus.FORBIDDEN);
		}
	}

	@GetMapping(value = "states/filter")
	public ResponseEntity<Map<String, Object>> getFilterData(@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Get Filtered country-state");
		Map<String, Object> map = countryStateService.getFilterData();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setData(map);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}
}
