package com.bnt.rest.controller;

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
import com.bnt.constant.RippsRestConstant;
import com.bnt.rest.dto.VelocityLimitsDto;
import com.bnt.rest.entity.TransactionVelocity;
import com.bnt.rest.service.VelocityLimitsService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/velocity-limits")
@CrossOrigin(origins = "${crossOriginUrl}")
public class VelocityLimitsController {
	private static final Logger logger = LogManager.getLogger(VelocityLimitsController.class);

	@Autowired
	private VelocityLimitsService velocityLimitsService;

	@Autowired
	private HttpServletRequest request;

	@GetMapping
	public ResponseEntity<Map<String, Object>> getVelocityLimits(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Find all Velocity Limits");
		try {
			Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
			ResponseWrapper pageJPAData = velocityLimitsService.getvelocityLimitsServiceList(requestParamMap);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find all velocityLimitsList Limits");
			Map<String, Object> data = RippsUtility.setPageJPAData(pageJPAData);
			data.put("velocityLimitsList", pageJPAData.getContent());
			responseEntityData.setData(data);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Find all velocityLimitsList", null),
					HttpStatus.FORBIDDEN);
		}
	}

	@PostMapping
	public ResponseEntity<Map<String, Object>> createVelocityLimits(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@RequestBody VelocityLimitsDto velocityLimitsDto) {
		logger.info("Create Velocity Limit");
		String requestToken = RippsUtility.getToken(request);
		ResponseWrapper pageJPAData = velocityLimitsService.addVelocityLimits(velocityLimitsDto, requestToken);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Velocity Limits Created");
		responseEntityData.setData(pageJPAData.getContent());
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);

	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<Map<String, Object>> getVelocityLimitsById(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("id") int id) {
		logger.info("Find Velocity Limit Id: {}", id);
		VelocityLimitsDto velocityLimitsDto = velocityLimitsService.findVelocityLimitsById(id);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find Velocity Limits");
		responseEntityData.setData(velocityLimitsDto);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@PutMapping(value = "/{id}")
	public ResponseEntity<Map<String, Object>> updateVelocityLimits(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("id") int id,
			@RequestBody VelocityLimitsDto velocityLimitsDto) {
		logger.info("Update Velocity Limit Id: {}", id);
		String requestToken = RippsUtility.getToken(request);
		ResponseWrapper pageJPAData = velocityLimitsService.updateVelocityLimits(velocityLimitsDto, requestToken, id);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Velocity Limits Updated");
		responseEntityData.setData(pageJPAData.getContent());
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "/filter")
	public ResponseEntity<Map<String, Object>> getFilterData(@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Find Filter Velocity Limit");
		Map<String, Object> map = velocityLimitsService.getFilterData();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setData(map);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Map<String, Object>> deleteUser(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("id") int id) {
		logger.info("Delete Velocity Limit Id: {}", id);
		try {
			TransactionVelocity velocity = velocityLimitsService.findTransactionVelocityById(id);
			if (velocity == null) {
				return new ResponseEntity<>(
						RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Velocity Not Found", ""),
						HttpStatus.NOT_FOUND);
			}
			velocityLimitsService.deleteById(velocity);
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.SUCCESS, "Velocity deleted", null),
					HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE,
					"Delete failed: Contact System Admin", null), HttpStatus.OK);
		}
	}
}
