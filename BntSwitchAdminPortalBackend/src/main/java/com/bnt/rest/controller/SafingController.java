package com.bnt.rest.controller;

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
import com.bnt.rest.dto.IdAndNameStringWrapper;
import com.bnt.rest.service.SafingService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/safing")
@CrossOrigin(origins = "${crossOriginUrl}")
public class SafingController {

	private static final String FIND_FILTER_STATUS_LIST = "Find Filter Status List";

	private static final Logger logger = LogManager.getLogger(SafingController.class);

	@Autowired
	private HttpServletRequest request;

	@Autowired
	private SafingService safingService;

	@GetMapping(value = "/exception-queue-list")
	public ResponseEntity<Map<String, Object>> getPagableExceptionQueueList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {

		logger.info("inside getPagableAdapterUIList");
		Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
		ResponseWrapper pageJPAData = safingService.getPagableExceptionQueueList(requestParamMap);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find Excpetion-Queue-List");
		Map<String, Object> data = RippsUtility.setPageJPAData(pageJPAData);
		data.put("exceptionList", pageJPAData.getContent());
		responseEntityData.setData(data);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "/saf-queue-list")
	public ResponseEntity<Map<String, Object>> getPagableSafQueueList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {

		logger.info("inside getPagableSafQueueList");
		Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
		ResponseWrapper pageJPAData = safingService.getPagableSafQueueList(requestParamMap);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find Saf-Queue-List");
		Map<String, Object> data = RippsUtility.setPageJPAData(pageJPAData);
		data.put("safList", pageJPAData.getContent());
		responseEntityData.setData(data);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@DeleteMapping(value = "delete/{id}")
	public ResponseEntity<Map<String, Object>> deleteExceptionById(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("id") String id) {
		logger.info("inside deleteExceptionById ID: {}", id);
		String requestToken = RippsUtility.getToken(request);
		try {
			boolean flag = safingService.deleteExceptionById(id, requestToken);
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.SUCCESS, "Deleted successfully", null),
					HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Exception: Not Deleted", ""),
					HttpStatus.OK);
		}
	}

	@PutMapping(value = "deleteSaf")
	public ResponseEntity<Map<String, Object>> deleteRecords(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@RequestBody List<String> ids) {
		logger.info("inside deleteExceptionById ID: {}", ids);
		String requestToken = RippsUtility.getToken(request);
		try {
			boolean flag = safingService.deleteRecords(ids, requestToken);
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.SUCCESS, "Deleted successfully", null),
					HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Exception: Not Deleted", ""),
					HttpStatus.OK);
		}
	}

	@PutMapping(value = "move-to-saf/{id}")
	public ResponseEntity<Map<String, Object>> moveExceptionToSafById(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("id") String id) {
		logger.info("inside moveExceptionToSafById ID: {}", id);
		String requestToken = RippsUtility.getToken(request);
		try {
			String movedId = safingService.moveExceptionToSafById(id, requestToken);
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.SUCCESS, "Moved successfully", movedId),
					HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Exception: Not Moved", ""),
					HttpStatus.OK);
		}
	}

	@PutMapping(value = "exception-to-saf")
	public ResponseEntity<Map<String, Object>> moveExceptionToSaf(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @RequestBody List<String> ids) {
		logger.info("inside moveExceptionToSafById ID: {}", ids);
		String requestToken = RippsUtility.getToken(request);
		try {
			List<String> movedId = safingService.moveExceptionToSaf(ids, requestToken);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.SUCCESS,
					"Movement request placed successfully", movedId), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Exception: Not Moved", ""),
					HttpStatus.OK);
		}
	}

	@GetMapping("/pagable/{status}")
	public ResponseEntity<Map<String, Object>> getPagableByStatus(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable(value = "status") String status) {
		logger.info("Find all BinTable");
		try {
			logger.info("inside getPagableSafQueueList");
			Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
			ResponseWrapper pageJPAData = safingService.getPagableByStatus(status, requestParamMap);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find Saf-Queue-List");
			Map<String, Object> data = RippsUtility.setPageJPAData(pageJPAData);
			data.put("safList", pageJPAData.getContent());
			responseEntityData.setData(data);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Find all Saf-Queue", null),
					HttpStatus.OK);
		}
	}

	@GetMapping(value = "/saf-filter-list")
	public ResponseEntity<Map<String, Object>> getSafFilterList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("inside getSafFilterList");
		List<String> list = safingService.getSafFilterList();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage(FIND_FILTER_STATUS_LIST);
		responseEntityData.setData(list);
		logger.info("getSafFilterList:   ends");
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "/saf-status-filter-list")
	public ResponseEntity<Map<String, Object>> getSafStatusFilterList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("inside getSafStatusFilterList");
		List<IdAndNameStringWrapper> list = safingService.getSafStatusFilterList();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage(FIND_FILTER_STATUS_LIST);
		responseEntityData.setData(list);
		logger.info("getSafFilterList : ends");
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "/saf-processor-filter-list")
	public ResponseEntity<Map<String, Object>> getSafProcessorFilterList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("inside getSafFilterList");
		List<IdAndNameStringWrapper> list = safingService.getSafProcessorFilterList();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage(FIND_FILTER_STATUS_LIST);
		responseEntityData.setData(list);
		logger.info("getSafFilterList: ends");
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}
}
