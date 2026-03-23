package com.bnt.rest.controller;

import java.util.Map;
import java.util.TreeMap;

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
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.RippsUtility;
import com.bnt.constant.RippsRestConstant;
import com.bnt.rest.service.DeployedRouterService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Controller
@RestController
@RequestMapping("/deployed-router")
@CrossOrigin(origins = "${crossOriginUrl}")
public class DeployedRouterController {

	private static final Logger logger = LogManager.getLogger(DeployedRouterController.class);

	private static final String ERROR_MESSAGE = "Error while retrieving jmx information";

	@Autowired
	private DeployedRouterService deployedRouterService;

	@GetMapping
	public ResponseEntity<Map<String, Object>> getAllDeployedRouterData(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Find Deployed Router Data");
		try {
			Map<String, Object> data = new TreeMap<>();
			data.put("deployedAlertList", deployedRouterService.getRoutingRuleData());
			return HttpCommons.setResponseEntityData(data, "Find All Deployed Router", ERROR_MESSAGE);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		}
	}
}
