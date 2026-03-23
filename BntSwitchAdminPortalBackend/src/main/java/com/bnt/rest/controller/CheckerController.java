package com.bnt.rest.controller;

import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bnt.common.HttpCommons;
import com.bnt.common.ResponseEntityData;
import com.bnt.common.ResponseWrapper;
import com.bnt.common.util.RippsUtility;
import com.bnt.common.util.exception.AccessDeniedException;
import com.bnt.constant.Constants;
import com.bnt.constant.RippsRestConstant;
import com.bnt.rest.service.CheckerService;
import com.bnt.rest.wrapper.dto.CheckerDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/checker")
@CrossOrigin(origins = "${crossOriginUrl}")
public class CheckerController {

	private static Log log = LogFactory.getLog(CheckerController.class.getName());

	@Autowired
	private CheckerService checkerService;

	@Autowired
	private HttpServletRequest request;

	@GetMapping
	public ResponseEntity<Map<String, Object>> getCheckList() throws AccessDeniedException {
		Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
		ResponseWrapper pageJPAData = checkerService.getCheckerList(requestParamMap, RippsUtility.getToken(request));
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		Map<String, Object> data = RippsUtility.setPageJPAData(pageJPAData);
		data.put("checkerList", pageJPAData.getContent());
		responseEntityData.setData(data);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@PutMapping
	public ResponseEntity<Map<String, Object>> editChecker(@RequestBody String requestBody,
			@RequestAttribute("entityId") String entityId, @RequestAttribute("entityName") String entityName,
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {

		log.info("Update an existing checker entry");

		Object object = checkerService.updateChecker(entityName, entityId, requestBody, Constants.PENDING);

		return HttpCommons.setResponseEntityData(object, "Sent for Approval");
	}

	@PostMapping(consumes = "application/json")
	public ResponseEntity<ResponseEntityData> addChecker(@RequestBody String requestBody,
			@RequestAttribute("entityName") String entityName,
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {

		log.info("Add a new  checker entry");

		checkerService.addChecker(entityName, requestBody);
		return HttpCommons.setResponseEntityForPost("Sent for Approval", true);
	}

	@GetMapping(value = "/notification")
	public ResponseEntity<Map<String, Object>> getNotification() throws AccessDeniedException {
		Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
		ResponseWrapper pageJPAData = checkerService.getNotification(requestParamMap, RippsUtility.getToken(request));
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		Map<String, Object> data = RippsUtility.setPageJPAData(pageJPAData);
		data.put("checkerList", pageJPAData.getContent());
		responseEntityData.setData(data);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "/count")
	public ResponseEntity<ResponseWrapper> getAllCheckerListCount() throws AccessDeniedException {

		Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
		ResponseWrapper pageJPAData = checkerService.getCount(requestParamMap, RippsUtility.getToken(request));
		return ResponseEntity.status(HttpStatus.OK).body(pageJPAData);
	}

	@PutMapping(value = "/approve")
	public ResponseEntity<Map<String, Object>> confirmOrDecline(@Valid @RequestBody CheckerDto checkerDto) {

		ResponseEntityData responseEntityData = new ResponseEntityData();
		try {
			checkerService.approveChecker(checkerDto);
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Approved");
		} catch (Exception e) {
			responseEntityData.setStatus(RippsRestConstant.FAILURE);
			responseEntityData.setMessage("Error in appoving entry");
		}

		log.info("Response send successfully for checker post");
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.CREATED);

	}

}
