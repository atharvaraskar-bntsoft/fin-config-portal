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
import com.bnt.common.util.RippsUtility;
import com.bnt.constant.ParameterConstant;
import com.bnt.constant.RippsRestConstant;
import com.bnt.rest.service.SmartFilterService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/smart-filter")
@CrossOrigin(origins = "${crossOriginUrl}")
public class SmartFilterController {

	private static final Logger logger = LogManager.getLogger(SmartFilterController.class);

	@Autowired
	private HttpServletRequest request;

	@Autowired
	private SmartFilterService smartFilterService;

	@GetMapping(value = "/dropdown")
	public ResponseEntity<Map<String, Object>> getQueryDropdown(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Find dropdown data");
		Map<String, Object> requestParamMap = HttpCommons.createSmartFilterRequestParamMap(request);
		ResponseWrapper sourceAcquirerIdCodeList = smartFilterService.getQueryDropdown(requestParamMap);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setMessage((String) requestParamMap.get(ParameterConstant.SMARTQUERYID) + " result");
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setData(sourceAcquirerIdCodeList);
		logger.info("To fetch dropdown data");
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}
}
