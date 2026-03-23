package com.bnt.rest.controller;

import java.util.HashMap;
import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
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
import com.bnt.rest.dto.ProcessorAdapterDto;
import com.bnt.rest.service.ProcessorAdapterService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Controller
@RestController
@RequestMapping("/processor-adapter")
@CrossOrigin(origins = "${crossOriginUrl}")

public class ProcessorAdapterController {

	private static Log logger = LogFactory.getLog(ProcessorAdapterController.class.getName());

	@Autowired
	private HttpServletRequest request;

	@Autowired
	ProcessorAdapterService processorAdapterService;

	private static final String FOUND = "Find All Processor Adapter";
	private static final String FAILED_TO_FIND = "Failed To Get Processor Adapter";
	private static final String CREATE = "Processor Adapter Created";
	private static final String FAILED_TO_CREATE = "Failed To Create Processor Adapter";
	private static final String UPDATE = "Processor Adapter Updated";
	private static final String FAILED_TO_UPDATE = "Failed To Update Processor Adapter";

	@GetMapping
	public ResponseEntity<Map<String, Object>> getAllProcessorAdapter(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.debug("Find all Processor Adapter");
		try {
			Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
			ResponseWrapper pageJPAData = processorAdapterService.findPagedProcessorAdapter(requestParamMap);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage(FOUND);
			Map<String, Object> data = RippsUtility.setPageJPAData(pageJPAData);
			data.put("processorAdapterList", pageJPAData.getContent());
			responseEntityData.setData(data);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			logger.error(FAILED_TO_FIND + e.getErrorMessage());
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, FAILED_TO_FIND, null),
					HttpStatus.FORBIDDEN);
		}
	}

	@PostMapping
	public ResponseEntity<Map<String, Object>> createProcessorAdapter(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@RequestBody ProcessorAdapterDto processorAdapterDto) {
		logger.info("Create Processor Adapter");
		String requestToken = RippsUtility.getToken(request);
		Map<String, Integer> map = new HashMap<>();
		try {
			Integer createdId = processorAdapterService.addProcessorAdapter(processorAdapterDto, requestToken);
			map.put("id", createdId);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage(CREATE);
			responseEntityData.setData(map);
			if (createdId > 0) {
				return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.CREATED);
			} else {
				return new ResponseEntity<>(
						RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, FAILED_TO_CREATE, null),
						HttpStatus.CREATED);
			}
		} catch (RippsAdminException ripException) {
			logger.error(ExceptionLog.printStackTraceToString(ripException));
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, ripException.getMessage(), null),
					HttpStatus.CREATED);
		} catch (Exception e) {
			logger.error(ExceptionLog.printStackTraceToString(e));
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, FAILED_TO_UPDATE, null),
					HttpStatus.CREATED);
		}
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<Map<String, Object>> getProcessorAdapterById(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("id") int id) {
		logger.info("Find Processor Adapter Id: " + id);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("find Processor-Adapter");
		responseEntityData.setData(processorAdapterService.findProcessorAdapterById(id));
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@PutMapping(value = "/{id}")
	public ResponseEntity<Map<String, Object>> updateProcessorAdapter(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("id") int id,
			@RequestBody ProcessorAdapterDto processorAdapterDto) {
		logger.info("Update Processor Adapter Id: " + id);
		String requestToken = RippsUtility.getToken(request);
		Map<String, Integer> map = new HashMap<>();

		try {
			Integer updatedId = processorAdapterService.updateProcessorAdapter(id, processorAdapterDto, requestToken);
			map.put("id", updatedId);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage(UPDATE);
			responseEntityData.setData(processorAdapterDto);
			if (updatedId > 0) {
				return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.CREATED);
			} else {
				return new ResponseEntity<>(
						RippsUtility.setResponseEntityData(RippsRestConstant.SUCCESS, FAILED_TO_UPDATE, null),
						HttpStatus.CREATED);
			}
		} catch (RippsAdminException ripException) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, ripException.getMessage(), null),
					HttpStatus.CREATED);
		} catch (Exception e) {
			logger.error(e);
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, FAILED_TO_UPDATE, null),
					HttpStatus.CREATED);
		}
	}
}
