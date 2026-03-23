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
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.DeviceDto;
import com.bnt.rest.entity.Device;
import com.bnt.rest.service.DeviceService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/device")
@CrossOrigin(origins = "${crossOriginUrl}")
public class DeviceController {

	private static final Logger logger = LogManager.getLogger(DeviceController.class);

	@Autowired
	private DeviceService deviceService;

	@Autowired
	private HttpServletRequest request;

	@GetMapping
	public ResponseEntity<Map<String, Object>> findAllDevices(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Find all device list");
		try {
			Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
			ResponseWrapper pageJPAData = deviceService.getDeviceList(requestParamMap);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find all Devices");
			Map<String, Object> data = RippsUtility.setPageJPAData(pageJPAData);
			data.put("devicesList", pageJPAData.getContent());
			responseEntityData.setData(data);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Find all Devices", null),
					HttpStatus.FORBIDDEN);
		}
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<Map<String, Object>> getDeviceById(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("id") int id) {
		logger.info("Find device ID:{}", id);
		Device device = deviceService.findDeviceById(id);
		DeviceDto deviceDto = ObjectMapper.mapToDto(device, DeviceDto.class);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find Device");
		responseEntityData.setData(deviceDto);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "/filter")
	public ResponseEntity<Map<String, Object>> getFilterData(@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Find filter device");
		Map<String, Object> map = deviceService.getFilterData();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setData(map);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

}
