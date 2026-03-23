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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bnt.common.ResponseEntityData;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.RippsUtility;
import com.bnt.constant.RippsRestConstant;
import com.bnt.rest.service.AdapterToolKitNetworkService;
import com.bnt.rest.wrapper.dto.adapter.AdapterUiResponseWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/adaptertoolKit-network")
@CrossOrigin(origins = "${crossOriginUrl}")
public class AdapterToolKitNetworkController {

	private static final Logger logger = LogManager.getLogger(AdapterToolKitNetworkController.class);

	@Autowired
	private AdapterToolKitNetworkService adapterToolKitNetworkService;

	@Autowired
	private HttpServletRequest request;

	@GetMapping(value = "/adapter-network-attribute/{templateId}")
	public ResponseEntity<Map<String, Object>> getNetworkdetail(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("templateId") int templateId) {

		logger.info("inside getNetworkdetail() with templateId:{}", templateId);
		try {
			AdapterUiResponseWrapper response = adapterToolKitNetworkService.getMessageSpecification(templateId, "L1");
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find netwrok-attribute in Adapter-JSON");
			responseEntityData.setData(response);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		}
	}

	@GetMapping(value = "/adapter-network-attribute/{type}/{templateId}")
	public ResponseEntity<Map<String, Object>> getNetworkdetail(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("type") String type,
			@PathVariable("templateId") int templateId) {
		logger.info("inside getNetworkdetail() with templateId:{}, and type: {}", templateId, type);
		try {
			AdapterUiResponseWrapper response = adapterToolKitNetworkService.getMessageSpecification(templateId, type);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find netwrok-attribute in Adapter-JSON");
			responseEntityData.setData(response);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		}
	}

}
