package com.bnt.rest.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bnt.common.ResponseEntityData;
import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.RippsUtility;
import com.bnt.constant.RippsRestConstant;
import com.bnt.rest.service.RuntimePropertyService;
import com.bnt.rest.wrapper.dto.PropertyFileWrapperDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping(value = "/runtime-property")
@CrossOrigin(origins = "${crossOriginUrl}")
public class RuntimePropertyController {

	@Autowired
	private RuntimePropertyService runtimePropertyService;

	// Fetch all Files list data
	@GetMapping
	public ResponseEntity<Map<String, Object>> getFolderList(@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		try {
			ResponseEntityData responseEntityData = new ResponseEntityData();
			ResponseWrapper map = runtimePropertyService.getFolderList();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Get all files");
			responseEntityData.setData(map);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Unable to get Files", null),
					HttpStatus.OK);
		}
	}

	// Get Property File content by POST request.
	@PostMapping
	public ResponseEntity<Map<String, Object>> getPropertyList(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@RequestBody PropertyFileWrapperDto propertyFileWrapperDto) {
		try {
			ResponseEntityData responseEntityData = new ResponseEntityData();
			PropertyFileWrapperDto map = runtimePropertyService.getPropertyFileContent(propertyFileWrapperDto);
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Get Property file Data");
			responseEntityData.setData(map);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE,
					"Unable to fetch Property file Data", null), HttpStatus.OK);
		}
	}

	// Update Property File content by POST request.
	@PostMapping(value = "/property")
	public ResponseEntity<Map<String, Object>> editPropertyList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@RequestBody PropertyFileWrapperDto propertyFileWrapperDto) {
		try {
			ResponseEntityData responseEntityData = new ResponseEntityData();
			PropertyFileWrapperDto map = runtimePropertyService.editPropertyFileContent(propertyFileWrapperDto);
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Property File updated");
			responseEntityData.setData(map);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Unable To Update File", null),
					HttpStatus.OK);
		}
	}
}
