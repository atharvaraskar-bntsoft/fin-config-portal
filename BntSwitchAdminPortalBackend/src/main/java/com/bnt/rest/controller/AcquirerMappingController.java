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
import org.springframework.web.bind.annotation.DeleteMapping;
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
import com.bnt.rest.dto.AcquirerMappingDto;
import com.bnt.rest.repository.AcquirerMappingServiceRest;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/acquirer")
@CrossOrigin(origins = "${crossOriginUrl}")
public class AcquirerMappingController {

	private static final Logger logger = LogManager.getLogger(AcquirerMappingController.class);

	@Autowired
	private AcquirerMappingServiceRest acquirerMappingServiceRest;

	@Autowired
	private HttpServletRequest request;

	@GetMapping
	public ResponseEntity<Map<String, Object>> findAllAcquirerMapping(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Find all device list");
		try {
			Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
			ResponseWrapper pageJPAData = acquirerMappingServiceRest.getAcquirerMappingList(requestParamMap);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find all Acquirer Mapping");
			Map<String, Object> data = RippsUtility.setPageJPAData(pageJPAData);
			data.put("acquirerMappingList", pageJPAData.getContent());
			responseEntityData.setData(data);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Find all Acquirer Mapping", null),
					HttpStatus.FORBIDDEN);
		}
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<Map<String, Object>> getDAcquirerMappingId(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("id") int id) {
		logger.info("Find device ID:{}", id);
		AcquirerMappingDto acquirerMapping = acquirerMappingServiceRest.findAcquirerMappingById(id);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find AcquirerMapping");
		responseEntityData.setData(acquirerMapping);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<Map<String, Object>> createAcquirerMapping(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@RequestBody AcquirerMappingDto acquirerMappingDto) {
		logger.info("Create new Acquirer Mapping");
		try {
			String requestToken = RippsUtility.getToken(request);
			Integer acquirerMappingId = acquirerMappingServiceRest.addAcquirerMapping(acquirerMappingDto, requestToken);
			Map<String, Integer> map = new HashMap<>();
			map.put("id", acquirerMappingId);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Acquirer Mapping Created");
			responseEntityData.setData(map);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.CREATED);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		}
	}

	@PutMapping(value = "/{id}")
	public ResponseEntity<Map<String, Object>> updateAcquirerMapping(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("id") int id,
			@RequestBody AcquirerMappingDto acquirerMappingDto) {
		String requestToken = RippsUtility.getToken(request);
		try {
			acquirerMappingServiceRest.updateAcquirerMapping(acquirerMappingDto, id, requestToken);

			return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.SUCCESS,
					"AcquirerMapping Updated", acquirerMappingDto), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		}
	}

	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Map<String, Object>> deleteAcquirerMapping(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("id") int id) {
		acquirerMappingServiceRest.deleteAcquirerMappingById(id);
		return new ResponseEntity<>(
				RippsUtility.setResponseEntityData(RippsRestConstant.SUCCESS, "AcquirerMapping deleted", null),
				HttpStatus.OK);
	}

}
