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
import com.bnt.rest.service.DeviceTypeService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "${crossOriginUrl}")
public class DeviceTypeController {

	private static final Logger logger = LogManager.getLogger(DeviceTypeController.class);

	private static final String ERROR_MESSAGE = "Error while retrieving device types";

	@Autowired
	private DeviceTypeService deviceTypeService;

	@Autowired
	private HttpServletRequest request;

	@GetMapping(value = "device-types")
	public ResponseEntity<Map<String, Object>> getAllDeviceTypes(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Find All device-types");
		try {
			Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
			ResponseWrapper pageJPAData = deviceTypeService.findPagedDeviceTypes(requestParamMap);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find all Device Types");
			Map<String, Object> data = RippsUtility.setPageJPAData(pageJPAData);
			data.put("deviceTypeList", pageJPAData.getContent());
			responseEntityData.setData(data);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, ERROR_MESSAGE, null),
					HttpStatus.FORBIDDEN);
		}
	}

	@GetMapping(value = "device-types/filter")
	public ResponseEntity<Map<String, Object>> getFilterData(@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Find Filter device-type");
		Map<String, Object> map = deviceTypeService.getFilterData();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setData(map);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}
}
