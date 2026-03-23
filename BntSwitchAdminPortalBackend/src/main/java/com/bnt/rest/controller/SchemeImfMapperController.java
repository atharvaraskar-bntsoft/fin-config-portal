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

import com.bnt.common.HttpCommons;
import com.bnt.common.ResponseEntityData;
import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.RippsUtility;
import com.bnt.constant.RippsRestConstant;
import com.bnt.rest.dto.SchemeImfMapperDto;
import com.bnt.rest.service.SchemeImfMapperService;
import com.bnt.rest.wrapper.dto.adapter.SchemeImfMapperUiWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/scheme-imf-mapper")
@CrossOrigin(origins = "${crossOriginUrl}")
public class SchemeImfMapperController {

	private static final String FIND_ALL_SCHEME_IMF_MAPPER = "Find all SchemeImfMapper";

	private static final Logger logger = LogManager.getLogger(SchemeImfMapperController.class);

	@Autowired
	private SchemeImfMapperService schemeImfMapperService;

	@Autowired
	private HttpServletRequest request;

	@GetMapping(value = "/get-scheme-imf-mapper/{messageStandard}/{fieldId}")
	public ResponseEntity<Map<String, Object>> getSchemeImfMapper(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("messageStandard") Integer messageStandard, @PathVariable("fieldId") String fieldId) {
		logger.info("Find getSchemeImfMapperList");
		logger.info("messageStandard: {}", messageStandard);
		logger.info("fieldId: {}", fieldId);
		try {
			SchemeImfMapperDto schemeImfMapperDto = schemeImfMapperService.getSchemeImfMapper(messageStandard, fieldId);

			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find Scheme-Imf-Mapper");
			responseEntityData.setData(schemeImfMapperDto);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		}
	}

	@GetMapping
	public ResponseEntity<Map<String, Object>> getSchemeImfMapper(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info(FIND_ALL_SCHEME_IMF_MAPPER);
		try {
			Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
			ResponseWrapper pageJPAData = schemeImfMapperService.findPagedSchemeImfMapper(requestParamMap);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage(FIND_ALL_SCHEME_IMF_MAPPER);
			Map<String, Object> data = RippsUtility.setPageJPAData(pageJPAData);
			data.put("SchemeImfMapperList", pageJPAData.getContent());
			responseEntityData.setData(data);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, FIND_ALL_SCHEME_IMF_MAPPER, null),
					HttpStatus.OK);
		}
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<Map<String, Object>> getSchemeImfMapperById(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("id") int id) {
		logger.info("inside getSchemeImfMapperById ID: {}", id);
		try {
			SchemeImfMapperDto schemeImfMapperDto = schemeImfMapperService.getSchemeImfMapperDtoById(id);

			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find SchemeImfMapper");
			responseEntityData.setData(schemeImfMapperDto);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		}
	}

	@GetMapping(value = "get-data/{type}/{id}")
	public ResponseEntity<Map<String, Object>> getSchemeImfMapperByTypeAndId(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("type") String type,
			@PathVariable("id") int id) {
		logger.info("inside getSchemeImfMapperByTypeAndId ID: {}", id);
		try {
			SchemeImfMapperUiWrapper schemeImfMapperUiWrapper = schemeImfMapperService
					.getSchemeImfMapperUiWrapperByTypeID(type, id);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find SchemeImfMapperUiWrapper");
			responseEntityData.setData(schemeImfMapperUiWrapper);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		}
	}
}
