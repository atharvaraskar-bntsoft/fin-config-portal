package com.bnt.rest.controller;

import java.util.HashMap;
import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bnt.common.HttpCommons;
import com.bnt.common.ResponseEntityData;
import com.bnt.common.util.RippsUtility;
import com.bnt.constant.RippsRestConstant;
import com.bnt.rest.service.AlertService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Controller
@RestController
@RequestMapping("/alerts")
@CrossOrigin(origins = "${crossOriginUrl}")
public class AlertController {

	private static final Logger logger = LogManager.getLogger(AlertController.class);

	@Autowired
	private AlertService alertService;

	@GetMapping
	public ResponseEntity<Map<String, Object>> getAllAlerts(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			HttpServletRequest request) {
		logger.info("Find all Alerts list");
		Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		Map<String, Object> data = new HashMap<>();
		data.put("alertList", alertService.getAlertMessage(requestParamMap).getContent());
		responseEntityData.setData(data);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}
}
