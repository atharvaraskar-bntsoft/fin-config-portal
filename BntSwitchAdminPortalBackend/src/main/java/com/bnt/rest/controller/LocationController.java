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
import com.bnt.rest.dto.LocationDto;
import com.bnt.rest.entity.Location;
import com.bnt.rest.service.LocationService;
import com.bnt.rest.wrapper.dto.AddressWrapper;
import com.bnt.rest.wrapper.dto.CoordinateDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/location")
@CrossOrigin(origins = "${crossOriginUrl}")
public class LocationController {

	private static final Logger logger = LogManager.getLogger(LocationController.class);
	@Autowired
	private LocationService locationService;

	@Autowired
	private HttpServletRequest request;

	@GetMapping
	public ResponseEntity<Map<String, Object>> getAllLocations(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Find all Locations");
		try {
			Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
			ResponseWrapper pageJPAData = locationService.getAllLocations(requestParamMap);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find all locations");
			Map<String, Object> data = RippsUtility.setPageJPAData(pageJPAData);
			data.put("locationList", pageJPAData.getContent());
			responseEntityData.setData(data);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Find all location", null),
					HttpStatus.FORBIDDEN);
		}
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<Map<String, Object>> getLocationById(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("id") int id) {
		logger.info("Find Location ID: {}", id);
		Location location = locationService.findLocationById(id);
		LocationDto locationDto = ObjectMapper.mapToDto(location, LocationDto.class);
		CoordinateDto coordinate = new CoordinateDto();
		coordinate.setLat(location.getLatitude());
		coordinate.setLng(location.getLongitude());
		locationDto.setCoordinates(coordinate);

		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find Location");
		responseEntityData.setData(locationDto);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "/address")
	public ResponseEntity<Map<String, Object>> getLocationAddressList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Find Location Adresses List");
		List<AddressWrapper> addressList = locationService.getAddressList();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find Address list");
		responseEntityData.setData(addressList);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "/filter")
	public ResponseEntity<Map<String, Object>> getFilterData(@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Find Filter Locations");
		Map<String, Object> map = locationService.getFilterData();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setData(map);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

}
