package com.bnt.rest.controller;

import java.util.HashMap;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bnt.common.ResponseEntityData;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.RippsUtility;
import com.bnt.common.util.exception.ExceptionLog;
import com.bnt.constant.RippsRestConstant;
import com.bnt.rest.dto.ComponentDto;
import com.bnt.ruleengine.sample.adp.ComponentHelper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/component")
@CrossOrigin(origins = "${crossOriginUrl}")
public class ComponentController {

	private static final Logger logger = LogManager.getLogger(DeviceController.class);

	@PostMapping
	public ResponseEntity<Map<String, Object>> processJSON(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@RequestBody ComponentDto componentDto) {
		logger.info("Process JSON Started!");
		try {
			Map<String, Object> map = new HashMap<>();

			map.put("result", ComponentHelper.process(componentDto));
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Device Updated");
			responseEntityData.setData(map);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.CREATED);
		} catch (RippsAdminException ripException) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, ripException.getMessage(), null),
					HttpStatus.CREATED);
		} catch (Exception e) {
			logger.error(ExceptionLog.printStackTraceToString(e));
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "JSON Parse Failed", null),
					HttpStatus.OK);
		}
	}
}
