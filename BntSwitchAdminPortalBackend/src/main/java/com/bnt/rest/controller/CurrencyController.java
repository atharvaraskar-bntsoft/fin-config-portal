package com.bnt.rest.controller;

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
import com.bnt.constant.RippsRestConstant;
import com.bnt.rest.service.CurrencyService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "${crossOriginUrl}")
public class CurrencyController {

	private static final Logger logger = LogManager.getLogger(CurrencyController.class);

	private static final String FIND_CURRENCY_MESSAGE = "null";

	@Autowired
	private CurrencyService currencyService;

	@Autowired
	private HttpServletRequest request;

	@GetMapping(value = "currencies")
	public ResponseEntity<Map<String, Object>> findAllCurrencies(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Find all currencies list");
		try {
			Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
			ResponseWrapper pageJPAData = currencyService.findPagedCurrencies(requestParamMap);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage(FIND_CURRENCY_MESSAGE);
			Map<String, Object> data = RippsUtility.setPageJPAData(pageJPAData);
			data.put("currencyList", pageJPAData.getContent());
			responseEntityData.setData(data);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Find all user", null),
					HttpStatus.FORBIDDEN);
		}
	}

	@GetMapping(value = "currencies/filter")
	public ResponseEntity<Map<String, Object>> getFilterData(@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Find Filter Currency");
		Map<String, Object> map = currencyService.getFilterData();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setData(map);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

}
