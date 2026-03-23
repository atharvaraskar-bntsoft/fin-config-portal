package com.bnt.rest.controller;

import java.util.HashMap;
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
import com.bnt.rest.service.HolidayCalenderService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/holiday-calender")
@CrossOrigin(origins = "${crossOriginUrl}")
public class HolidayCalenderController {

	private static final Logger logger = LogManager.getLogger(HolidayCalenderController.class);

	@Autowired
	private HttpServletRequest request;

	@Autowired
	private HolidayCalenderService holidaycalenderservicerest;

	@GetMapping
	public ResponseEntity<Map<String, Object>> findAllHolidayList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Find all holiday list");
		Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
		ResponseWrapper pageJPAData = holidaycalenderservicerest.findAllHolidayList(requestParamMap);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find all holiday list");
		Map<String, Object> data = new HashMap<>();
		data.put(ParameterConstant.PAGE_NO, pageJPAData.getPageNo());
		data.put(ParameterConstant.TOTAL_RECORD, pageJPAData.getTotalRecords());
		data.put("holidayList", pageJPAData.getContent());
		responseEntityData.setData(data);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);

	}
}
