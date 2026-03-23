package com.bnt.rest.controller;

import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bnt.common.ResponseEntityData;
import com.bnt.common.util.RippsUtility;
import com.bnt.constant.RippsRestConstant;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/common")
@CrossOrigin(origins = "${crossOriginUrl}")
public class PermissionMappingController {

	private static final Logger logger = LogManager.getLogger(PermissionMappingController.class);

	@GetMapping
	public ResponseEntity<Map<String, Object>> findAllAcquirer(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Find All Permission Mapping");
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.FAILURE);
		responseEntityData.setMessage("Access Denied");
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}
}
