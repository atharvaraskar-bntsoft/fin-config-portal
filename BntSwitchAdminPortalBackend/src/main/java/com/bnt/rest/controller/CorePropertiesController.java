package com.bnt.rest.controller;

import java.util.HashMap;
import java.util.List;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bnt.common.HttpCommons;
import com.bnt.common.ResponseEntityData;
import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.HTMLInjectionUtil;
import com.bnt.common.util.RippsUtility;
import com.bnt.common.util.StringUtil;
import com.bnt.constant.Constants;
import com.bnt.constant.RippsRestConstant;
import com.bnt.rest.dto.DefaultCorePropertiesDto;
import com.bnt.rest.dto.PublishCorePropertiesDto;
import com.bnt.rest.wrapper.dto.CorePropertiesWrapperDto;
import com.bnt.rest.service.CorePropertiesService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/coreProperties")
@CrossOrigin(origins = "${crossOriginUrl}")
public class CorePropertiesController {

	private static final Logger logger = LogManager.getLogger(CorePropertiesController.class);

	@Autowired
	private CorePropertiesService corePropertiesService;

	@Autowired
	private HttpServletRequest request;

	private String logMsg = "sending response";

	@GetMapping
	public ResponseEntity<Map<String, Object>> getCoreProperties(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Find Core Properties");
		Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		ResponseWrapper pageJPAData = corePropertiesService.getAllCoreProperties(requestParamMap);
		Map<String, Object> data = RippsUtility.setPageJPAData(pageJPAData);
		data.put("corePropertiesList", pageJPAData.getContent());
		responseEntityData.setData(data);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "/getPublishCoreProperties")
	public ResponseEntity<Map<String, Object>> getPublishCoreProperties(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {

		logger.info("inside getPublishCoreProperties");
		try {

			List<PublishCorePropertiesDto> response = corePropertiesService.getPublishCoreProperties();
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find CoreProperties");
			responseEntityData.setData(response);
			logger.info(logMsg);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		}
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<Map<String, Object>> findCorePropertiesById(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("id") int id) {

		logger.info("inside findCorePropertiesById");
		try {

			CorePropertiesWrapperDto response = corePropertiesService.findCorePropertiesById(id);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find CoreProperties");
			responseEntityData.setData(response);
			logger.info(logMsg);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		}
	}

	@GetMapping(value = "/getDefaultCoreProperties")
	public ResponseEntity<Map<String, Object>> findAdapterByConfigurationId(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {

		logger.info("getDefaultProperties");
		try {
			List<DefaultCorePropertiesDto> response = corePropertiesService.getDefaultProperties();
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("GET defaultProperties");
			responseEntityData.setData(response);
			logger.info(logMsg);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		}
	}

	@PostMapping(value = "/draft")
	public ResponseEntity<Map<String, Object>> draftAdapter(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@RequestBody CorePropertiesWrapperDto responseWrapper) {
		logger.info("***********Draft CoreProperties**********");

		Map<String, Integer> map = new HashMap<>();

		if (!StringUtil.isEmptyOrNull(responseWrapper.getName())) {
			responseWrapper.setName(HTMLInjectionUtil.validateHTMLInjection(responseWrapper.getName()));
		}
		if (!StringUtil.isEmptyOrNull(responseWrapper.getType())) {
			responseWrapper.setType(HTMLInjectionUtil.validateHTMLInjection(responseWrapper.getType()));
		}
		if (StringUtil.isEmptyOrNull(responseWrapper.getSubType())) {
			responseWrapper.setSubType(HTMLInjectionUtil.validateHTMLInjection(responseWrapper.getSubType()));
		}

		String requestToken = RippsUtility.getToken(request);
		if (StringUtil.isEmptyOrNull(responseWrapper.getName())) {
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE,
					"Core Properties Name is missing", null), HttpStatus.CREATED);
		}

		try {
			Integer corePropertiesId = corePropertiesService.draftCoreProperties(responseWrapper, requestToken);
			map.put("id", corePropertiesId);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Core Properties drafted");
			responseEntityData.setData(map);
			if (corePropertiesId > 0) {
				logger.info("Core Properties drafted with id: {}", corePropertiesId);
				return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.CREATED);
			} else {

				logger.error("Core Properties Not drafted");
				return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE,
						"Core Properties  Not Drafted", null), HttpStatus.CREATED);
			}
		} catch (RippsAdminException ripException) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, ripException.getMessage(), null),
					HttpStatus.CREATED);
		}

	}

	@GetMapping(value = "/validate-coreProperties-name/{corePropertiesName}")
	public ResponseEntity<Map<String, Object>> validateCorePropertiesName(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("corePropertiesName") String corePropertyName) {
		logger.info("inside validateCorePropertiesName:  {}", corePropertyName);
		try {
			boolean existCoreProperties = corePropertiesService.validateCorePropertiesName(corePropertyName);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			if (existCoreProperties) {
				responseEntityData.setMessage(Constants.INVALID_COREPROPERTY_NAME);
			} else {
				responseEntityData.setMessage(Constants.COREPROPERTY_EXISTS);
			}
			responseEntityData.setData(existCoreProperties);
			logger.info("completed...");
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException ripException) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, ripException.getMessage(), false),
					HttpStatus.CREATED);
		}
	}

	@DeleteMapping(value = "corepropertydetail/{id}")
	public ResponseEntity<Map<String, Object>> deleteByCorePropertiesDetailsId(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("id") int id) {
		logger.info("inside deleteByCorePropertiesDetailsId ID: {}", id);
		String requestToken = RippsUtility.getToken(request);
		try {
			corePropertiesService.deleteByCorePropertiesDetailsId(id, requestToken);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.SUCCESS,
					"coreProperty with version '0' is deleted successfully", null), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		}
	}
}
