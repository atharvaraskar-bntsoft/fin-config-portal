package com.bnt.rest.controller;

import java.util.HashMap;
import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
import com.bnt.constant.ParameterConstant;
import com.bnt.constant.RippsRestConstant;
import com.bnt.rest.dto.AcquirerIdConfigDto;
import com.bnt.rest.service.AcquirerConfigServiceRest;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/acquirer-mapping")
@CrossOrigin(origins = "${crossOriginUrl}")
public class AcquirerConfigMappingController {

	private static final Logger logger = LogManager.getLogger(AcquirerConfigMappingController.class);
	private static final String ERROR_MESSAGE = "Error while retrieving Acquirer Config Mapping";

	@Autowired
	private HttpServletRequest request;

	@Autowired
	private AcquirerConfigServiceRest acquirerConfigServiceRest;

	@Value("${acquirer.condition.flag}")
	private String conditionFlag;

	@GetMapping
	public ResponseEntity<Map<String, Object>> findAllAcquirer(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Find all aquirers list");
		try {
			Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
			ResponseWrapper pageJPAData = acquirerConfigServiceRest.findAllAcquirer(requestParamMap);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find all Acquirer");
			Map<String, Object> data = new HashMap<>();
			data.put(ParameterConstant.PAGE_NO, pageJPAData.getPageNo());
			data.put(ParameterConstant.TOTAL_RECORD, pageJPAData.getTotalRecords());
			data.put("acquirerMappingList", pageJPAData.getContent());
			responseEntityData.setData(data);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, ERROR_MESSAGE, null),
					HttpStatus.FORBIDDEN);
		}
	}

	@GetMapping(value = "/get-condition-flag")
	public Map<String, String> getConditionFlag(@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		Map<String, String> map = new HashMap<>();
		map.put("condition_Flag", conditionFlag);
		return map;
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<Map<String, Object>> getAcquirerIdConfigById(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("id") int id) {
		AcquirerIdConfigDto acquirerIdConfigDto = acquirerConfigServiceRest.findAcquirerIdConfigDto(id);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find by Id");

		responseEntityData.setData(acquirerIdConfigDto);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}
}
