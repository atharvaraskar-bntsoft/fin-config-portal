package com.bnt.rest.controller;

import java.util.HashMap;
import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bnt.common.HttpCommons;
import com.bnt.common.ResponseEntityData;
import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.RippsUtility;
import com.bnt.common.util.exception.ExceptionLog;
import com.bnt.constant.RippsRestConstant;
import com.bnt.rest.dto.SwitchClusterDto;
import com.bnt.rest.entity.SwitchCluster;
import com.bnt.rest.service.SwitchClusterServiceRest;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/switch-controller")
@CrossOrigin(origins = "${crossOriginUrl}")
public class SwitchClusterController {

	private static final Logger logger = LogManager.getLogger(SwitchClusterController.class);

	@Autowired
	private SwitchClusterServiceRest switchClusterServiceRest;

	@Autowired
	private HttpServletRequest request;

	@GetMapping
	public ResponseEntity<Map<String, Object>> listSwitchCluster(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("get switch cluster");
		Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
		ResponseWrapper pageJPAData = switchClusterServiceRest.getSwitchCluster(requestParamMap);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("get switch cluster");
		Map<String, Object> data = RippsUtility.setPageJPAData(pageJPAData);
		data.put("switchclusterlist", pageJPAData.getContent());
		responseEntityData.setData(data);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<Map<String, Object>> getSwitchClusterById(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("id") int id) {
		logger.info("Find SwitchCluster Id: {}", id);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setData(switchClusterServiceRest.findSwitchClusterById(id));
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<Map<String, Object>> createSwitchCluster(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @Valid @RequestBody SwitchClusterDto clusterDto) {
		logger.info("Create SwitchCluster");
		try {
			String requestToken = RippsUtility.getToken(request);
			Integer switchClusterId = switchClusterServiceRest.addSwitch(clusterDto, requestToken);
			if (switchClusterId > 0) {
				Map<String, Integer> map = new HashMap<>();
				map.put("id", switchClusterId);
				ResponseEntityData responseEntityData = new ResponseEntityData();
				responseEntityData.setStatus(RippsRestConstant.SUCCESS);
				responseEntityData.setMessage("SwitchCluster Created");
				responseEntityData.setData(map);
				return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.CREATED);
			} else {
				return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE,
						"SwitchCluster Not created", null), HttpStatus.CREATED);
			}
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		} catch (Exception e) {
			logger.error(ExceptionLog.printStackTraceToString(e));
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Not created", null), HttpStatus.OK);
		}
	}

	@PutMapping(value = "/{id}")
	public ResponseEntity<Map<String, Object>> updateSwitchCluster(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("id") int id,
			@RequestBody SwitchClusterDto clusterDto) {
		logger.info("Update SwitchCluster");
		String requestToken = RippsUtility.getToken(request);
		SwitchCluster cluster = switchClusterServiceRest.findSwitchClusterById(id);
		if (cluster == null) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Cluster Not Found", ""),
					HttpStatus.NOT_FOUND);
		}
		try {
			SwitchCluster switchCluster = switchClusterServiceRest.updateSwitchCluster(clusterDto, cluster,
					requestToken);
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.SUCCESS, "Cluster Updated", switchCluster),
					HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		} catch (Exception e) {
			logger.error(ExceptionLog.printStackTraceToString(e));
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Not Updated", null), HttpStatus.OK);
		}
	}
}
