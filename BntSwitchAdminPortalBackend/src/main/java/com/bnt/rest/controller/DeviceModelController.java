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
import com.bnt.rest.dto.DeviceModelDto;
import com.bnt.rest.service.DeviceModelService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/device-model")
@CrossOrigin(origins = "${crossOriginUrl}")
public class DeviceModelController {

	private static final Logger logger = LogManager.getLogger(DeviceModelController.class);

	@Autowired
	private DeviceModelService deviceModelService;

	@Autowired
	private HttpServletRequest request;

	@GetMapping(value = "id/{id}")
	public ResponseEntity<Map<String, Object>> getFileById(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("id") int id) {

		logger.info("inside getFileById");
		try {
			DeviceModelDto deviceModelDto = deviceModelService.getDataModelById(id);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find Data-Files");
			responseEntityData.setData(deviceModelDto);
			logger.info("sending response");
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		}
	}

	@GetMapping
	public ResponseEntity<Map<String, Object>> getPagableDeviceModel(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Inside getPagableDeviceModel");
		try {
			Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
			ResponseWrapper pageJPAData = deviceModelService.getPagableDeviceModel(requestParamMap);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find all device-model");
			Map<String, Object> data = RippsUtility.setPageJPAData(pageJPAData);
			data.put("deviceModeList", pageJPAData.getContent());
			responseEntityData.setData(data);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Find all device-model", null),
					HttpStatus.OK);
		}

	}

	@GetMapping(value = "/validate-device-model-name/{deviceTypeId}/{modelName}")
	public ResponseEntity<Map<String, Object>> validateDeviceModelName(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("deviceTypeId") Integer deviceTypeId, @PathVariable("modelName") String modelName) {
		logger.info("inside validateDeviceModelName:{}", modelName);
		logger.info("deviceTypeId:{}", deviceTypeId);
		try {
			boolean existModelName = deviceModelService.validateDeviceModelName(deviceTypeId, modelName);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			if (existModelName) {
				responseEntityData.setMessage("Model-name is valid");
			} else {
				responseEntityData.setMessage("Model-name already exist");
			}
			responseEntityData.setData(existModelName);
			logger.info("complted");
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException ripException) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, ripException.getMessage(), false),
					HttpStatus.CREATED);
		} catch (Exception e) {
			logger.error(e);
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Model-Name is invalid", false),
					HttpStatus.OK);
		}
	}

	@GetMapping(value = "/get-device-type-device-model-map")
	public ResponseEntity<Map<String, Object>> getDeviceTypeDeviceModel(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("inside getDeviceTypeDeviceModel");
		Map<String, Object> map = new HashMap<>();
		map.put("deviceModelDataMap", deviceModelService.getDeviceTypeDeviceModel());
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find Adaptor Data Mapper");
		responseEntityData.setData(map);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);

	}

}
