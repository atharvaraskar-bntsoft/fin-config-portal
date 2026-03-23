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
import com.bnt.rest.dto.DeploymentDto;
import com.bnt.rest.dto.DeploymentHistoryWrapper;
import com.bnt.rest.dto.DeploymentStatusDto;
import com.bnt.rest.service.DeploymentComponentService;
import com.bnt.rest.service.DeploymentService;
import com.bnt.service.mapper.DeploymentMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/deployment")
@CrossOrigin(origins = "${crossOriginUrl}")
public class DeploymentController {

	private static final String DEPLOYMENT_SAVE_FAILED = "Deployment save failed";

	private static final String DEPLOYMENT_UPDATED_FAILED = "Deployment updated failed";

	private static final Logger logger = LogManager.getLogger(DeploymentController.class);

	@Autowired
	private DeploymentService deploymentService;

	@Autowired
	private DeploymentComponentService deploymentComponentService;

	@Autowired
	private HttpServletRequest request;

	@GetMapping(value = "/schedule")
	public ResponseEntity<Map<String, Object>> getAllDeployments(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Find all  records..");

		Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
		ResponseWrapper pageJPAData = deploymentService.findScheduleRecords(requestParamMap);

		return HttpCommons.setResponseEntityPageData(pageJPAData, "scheduleDeploymentList", "get record",
				"Error in getting record");
	}

	@GetMapping(value = "/non-schedule-component")
	public ResponseEntity<Map<String, Object>> getNonScheduleDeployments(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {

		logger.info("Find all  records.");
		Map<String, List<DeploymentStatusDto>> statusMap = deploymentComponentService.getStatusMap();

		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		Map<String, Object> data = new HashMap<>();
		Map<String, List<DeploymentHistoryWrapper>> historyMap = deploymentService.getHistoryMap(statusMap);

		data.put("historyMap", historyMap);
		data.put("resultList", deploymentService.groupUnscheduledListOnSchedulePage(historyMap,
				statusMap.get(DeploymentMapper.UNSCHEDULED)));

		responseEntityData.setData(data);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "/status")
	public ResponseEntity<Map<String, Object>> getAllDeploymentStatus(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Find all  records");

		Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);

		ResponseWrapper pageJPAData = deploymentComponentService.findPagedDeploymentStatusRecords(requestParamMap);
		Map<String, List<DeploymentHistoryWrapper>> history = deploymentService
				.getDeploymentHistoryMap((List<DeploymentStatusDto>) pageJPAData.getContent());
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		Map<String, Object> data = RippsUtility.setPageJPAData(pageJPAData);
		data.put("resultList", pageJPAData.getContent());
		data.put("historyMap", history);
		responseEntityData.setData(data);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);

	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<ResponseEntityData> getDeploymentById(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("id") Integer id) {
		logger.info("Find record by Id:{} ", id);
		DeploymentDto response = deploymentService.findRecordById(id);

		return HttpCommons.setResponseEntityPageDataObject(response, null, "get record by id");

	}

	@PostMapping
	public ResponseEntity<Map<String, Object>> addDeployment(@RequestBody DeploymentDto dto,
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Add  record ");

		Map<String, Integer> map = new HashMap<>();

		try {
			Integer result = deploymentService.addRecord(dto);
			if (result > 0) {
				map.put("id", result);
				ResponseEntityData responseEntityData = new ResponseEntityData();
				responseEntityData.setStatus(RippsRestConstant.SUCCESS);
				responseEntityData.setMessage("Deployment Saved Successfully");
				responseEntityData.setData(map);
				logger.info("Deployment saved successfully with id:{}", result);
				return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.CREATED);
			} else {

				logger.error(DEPLOYMENT_SAVE_FAILED);
				return new ResponseEntity<>(
						RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, DEPLOYMENT_SAVE_FAILED, null),
						HttpStatus.CREATED);
			}
		} catch (RippsAdminException ripException) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, ripException.getMessage(), null),
					HttpStatus.CREATED);
		} catch (Exception e) {
			logger.error(ExceptionLog.printStackTraceToString(e));
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, DEPLOYMENT_SAVE_FAILED, null),
					HttpStatus.CREATED);
		}
	}

	@PutMapping(value = "/{id}")
	public ResponseEntity<Map<String, Object>> updatDeployment(@RequestBody DeploymentDto dto,
			@PathVariable("id") int id, @RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Add  record ");

		Map<String, Integer> map = new HashMap<>();

		try {
			Integer result = deploymentService.updateRecord(dto, id, xAuthToken);
			map.put("id", result);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Deployment updated successfully");
			responseEntityData.setData(map);
			if (result > 0) {
				logger.info("Deployment updated successfully with id:{}", result);
				return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.CREATED);
			} else {

				logger.error("Deployment updated failed..");
				return new ResponseEntity<>(
						RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, DEPLOYMENT_UPDATED_FAILED, null),
						HttpStatus.CREATED);
			}
		} catch (RippsAdminException ripException) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, ripException.getMessage(), null),
					HttpStatus.CREATED);
		} catch (Exception e) {
			logger.error(e);
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, DEPLOYMENT_UPDATED_FAILED, null),
					HttpStatus.CREATED);
		}
	}

	@GetMapping(value = "/filter")
	public ResponseEntity<Map<String, Object>> getFilterData(@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Find Filter Transaction Log");
		Map<String, Object> map = deploymentService.getFilterData();
		return HttpCommons.setResponseEntityData(map, "Filter data");
	}

	@DeleteMapping(value = "/component/{id}")
	public ResponseEntity<Map<String, Object>> unschedule(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("id") int id) {
		deploymentComponentService.deleteById(id);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Record Deleted");
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

}
