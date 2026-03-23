package com.bnt.rest.controller;

import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
import com.bnt.constant.RippsRestConstant;
import com.bnt.rest.dto.MasterConfigurationDto;
import com.bnt.rest.service.MasterConfigurationService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping(value = "/master-configuration")
@CrossOrigin(origins = "${crossOriginUrl}")
public class MasterConfigurationController {

	@Autowired
	private MasterConfigurationService masterConfigurationService;

	@Autowired
	private HttpServletRequest request;

	@GetMapping
	public ResponseEntity<Map<String, Object>> listStandardMessageSpecification(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
		ResponseWrapper pageJPAData = masterConfigurationService.findStandardMessageSpecification(requestParamMap);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find all StandardMessageSpecification");
		Map<String, Object> data = RippsUtility.setPageJPAData(pageJPAData);
		data.put("logsList", pageJPAData.getContent());
		responseEntityData.setData(data);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@PutMapping(value = "/{id}")
	public ResponseEntity<Map<String, Object>> updateProperties(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("id") int id,
			@RequestBody MasterConfigurationDto standardMessageSpecificationDto) {
		String requestToken = RippsUtility.getToken(request);
		try {
			Integer standardMessageSpecificationId = masterConfigurationService
					.updateStandardMessageSpecification(standardMessageSpecificationDto, id, requestToken);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.SUCCESS,
					"Standard Message Specification Updated", standardMessageSpecificationId), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		}
	}
}
