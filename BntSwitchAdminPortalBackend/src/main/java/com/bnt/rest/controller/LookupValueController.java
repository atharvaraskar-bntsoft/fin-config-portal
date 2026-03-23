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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bnt.common.HttpCommons;
import com.bnt.common.ResponseEntityData;
import com.bnt.common.util.RippsUtility;
import com.bnt.constant.RippsRestConstant;
import com.bnt.rest.dto.LookupValueDto;
import com.bnt.rest.entity.LookupType;
import com.bnt.rest.service.LookupTypeService;
import com.bnt.rest.service.LookupValueService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/lookup-value")
@CrossOrigin(origins = "${crossOriginUrl}")
public class LookupValueController {

	private static final Logger logger = LogManager.getLogger(LookupValueController.class);

	@Autowired
	private LookupValueService service;

	@Autowired
	private HttpServletRequest request;

	@Autowired
	private LookupTypeService lookupTypeService;

	@GetMapping(value = "/{id}")
	public ResponseEntity<Map<String, Object>> getLookupValueListById(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("id") int lookupTypeid) {
		Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
		List<LookupValueDto> lookupValueList = service.findLookupValueById(lookupTypeid, requestParamMap);
		LookupType lookupType = lookupTypeService.getLookupTypeById(lookupTypeid);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		Map<String, Object> map = new HashMap<>();
		map.put("lookupValueList", lookupValueList);
		map.put("lookupType", lookupType);
		responseEntityData.setMessage("Find Lookup Value list by id");
		responseEntityData.setData(map);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@PutMapping(value = "/{id}")
	public ResponseEntity<Map<String, Object>> createUpdateLookupValue(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@RequestBody List<LookupValueDto> lookupValueDtoList, @PathVariable(value = "id") Integer id) {
		logger.info("Create and Update Lookup Value");
		String requestToken = RippsUtility.getToken(request);
		service.addUpdateRLookupValue(lookupValueDtoList, requestToken, id);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Lookup Value Updated");
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

}
