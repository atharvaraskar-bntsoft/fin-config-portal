package com.bnt.rest.controller;

import java.util.ArrayList;
import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
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

import com.bnt.common.HttpCommons;
import com.bnt.common.ResponseEntityData;
import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.RippsUtility;
import com.bnt.constant.RippsRestConstant;
import com.bnt.rest.service.ExportSchemaServiceRest;
import com.bnt.rest.wrapper.dto.ExportRequestWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/export-group")
@CrossOrigin(origins = "${crossOriginUrl}")
public class ExportGroupController {

	private static final Logger logger = LogManager.getLogger(ExportGroupController.class);

	@Autowired
	private ExportSchemaServiceRest exportSchemaServiceRest;

	@Autowired
	private HttpServletRequest request;

	@PostMapping(consumes = "application/json")
	public ResponseEntity<ResponseEntityData> exportData(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@RequestBody ExportRequestWrapper entityRequest) {
		logger.info("Create new ExportSchema");

		Map<String, String> requestMap = exportSchemaServiceRest.exportSchema(entityRequest, xAuthToken);
		return HttpCommons.setResponseEntityForPost(requestMap);
	}

	@GetMapping
	public ResponseEntity<Map<String, Object>> getAllExportData(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Find All Entity List");
		try {
			Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
			ResponseWrapper pageJPAData = exportSchemaServiceRest.findAllRecords(requestParamMap);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find all entities");
			Map<String, Object> data = RippsUtility.setPageJPAData(pageJPAData);
			data.put("entitiesList", pageJPAData.getContent());
			responseEntityData.setData(data);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Find all export list", null),
					HttpStatus.FORBIDDEN);
		}
	}
}
