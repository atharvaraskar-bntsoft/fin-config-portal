package com.bnt.rest.controller;

import java.util.Map;
import java.util.Set;

import jakarta.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.reflections.Reflections;
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
import com.bnt.rest.entity.BaseEntity;
import com.bnt.rest.jpa.repository.EntityListRequest;
import com.bnt.rest.service.ExportSchemaServiceRest;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/export-schema")
@CrossOrigin(origins = "${crossOriginUrl}")
public class ExportSchemaController {

	private static final Logger logger = LogManager.getLogger(ExportSchemaController.class);

	@Autowired
	private ExportSchemaServiceRest exportSchemaServiceRest;

	@Autowired
	private HttpServletRequest request;

	@PostMapping(consumes = "application/json")
	public ResponseEntity<Map<String, Object>> listAllData(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@RequestBody EntityListRequest entityRequest) {
		logger.info("Create new ExportSchema");
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Schema exported succcesfuly");
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping
	public ResponseEntity<Map<String, Object>> getEntityList(@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Find All ExportSchema");
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Schema exported succcesfuly");

		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	public Set<Class<? extends BaseEntity>> getAllEntities() {
		Reflections reflections = new Reflections("com.bnt.rest.entity");
		return reflections.getSubTypesOf(BaseEntity.class);
	}

	@GetMapping(value = "/entity-list")
	public ResponseEntity<Map<String, Object>> getAllEntityLists(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Find All EEntity List");
		try {
			Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
			ResponseWrapper pageJPAData = exportSchemaServiceRest.findAllRecordsNew(requestParamMap);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find all entities");
			Map<String, Object> data = RippsUtility.setPageJPAData(pageJPAData);
			data.put("entitiesList", pageJPAData.getContent());
			responseEntityData.setData(data);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Find all Institution Groups", null),
					HttpStatus.FORBIDDEN);
		}
	}
}
