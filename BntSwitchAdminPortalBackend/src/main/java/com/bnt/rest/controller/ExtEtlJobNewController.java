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
import com.bnt.common.util.HTMLInjectionUtil;
import com.bnt.common.util.RippsUtility;
import com.bnt.common.util.StringUtil;
import com.bnt.constant.RippsRestConstant;
import com.bnt.rest.dto.ExtEtlJobDto;
import com.bnt.rest.dto.ExtEtlJobNewDto;
import com.bnt.rest.service.AdapterDataEnrichmentService;
import com.bnt.rest.service.ExtEtlJobNewService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/ext-etl-job-new")
@CrossOrigin(origins = "${crossOriginUrl}")
public class ExtEtlJobNewController {

	private static final Logger logger = LogManager.getLogger(ExtEtlJobNewController.class);

	@Autowired
	private HttpServletRequest request;

	@Autowired
	private ExtEtlJobNewService extEtlJobNewService;

	@Autowired
	private AdapterDataEnrichmentService adapterDataEnrichmentService;

	@GetMapping
	public ResponseEntity<Map<String, Object>> findAllExtEtlJobNew() {
		logger.info("Inside findAllExtEtlJobNew get mapping");
		Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
		ResponseWrapper pageJPAData = extEtlJobNewService.findAllExtEtlJobNew(requestParamMap);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("jobgroup");
		Map<String, Object> data = RippsUtility.setPageJPAData(pageJPAData);
		data.put("jobgroup", pageJPAData.getContent());
		responseEntityData.setData(data);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "get-messagecontext-fieldList-by-imf-version/{id}")
	public ResponseEntity<Map<String, Object>> getMessageContextFieldListByImfVersion(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("id") int id) {
		logger.info("inside getMessageContextFieldListByImfVersion");
		Map<String, Object> map = new HashMap<>();
		map.put("messageContextFieldsByVersion",
				adapterDataEnrichmentService.getFromListFieldListByImfVersionExtract(id));
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find MessageContextFields JSON");
		responseEntityData.setData(map);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<Map<String, Object>> getExtEtlJobById(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("id") int id) {
		logger.info("Find device ID:{}", id);
		ExtEtlJobNewDto extEtlJobDto = extEtlJobNewService.findExtEtlJobById(id);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find Device");
		responseEntityData.setData(extEtlJobDto);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<Map<String, Object>> createUser(@RequestBody ExtEtlJobNewDto extEtlJobDto) {

		if (!StringUtil.isEmptyOrNull(extEtlJobDto.getJobName())) {
			extEtlJobDto.setJobName(HTMLInjectionUtil.validateHTMLInjection(extEtlJobDto.getJobName()));
		}
		if (!StringUtil.isEmptyOrNull(extEtlJobDto.getJobDesc())) {
			extEtlJobDto.setJobDesc(HTMLInjectionUtil.validateHTMLInjection(extEtlJobDto.getJobDesc()));
		}
		if (!StringUtil.isEmptyOrNull(extEtlJobDto.getJobGroup())) {
			extEtlJobDto.setJobGroup(HTMLInjectionUtil.validateHTMLInjection(extEtlJobDto.getJobGroup()));
		}

		extEtlJobNewService.saveEtlJob(extEtlJobDto);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("User Created");
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.CREATED);

	}

	@PutMapping(value = "/{id}")
	public ResponseEntity<Map<String, Object>> updateProperties(@PathVariable("id") int id,
			@RequestBody ExtEtlJobNewDto extEtlJobDto) {
		String requestToken = RippsUtility.getToken(request);
		try {
			Integer jobId = extEtlJobNewService.updateJob(extEtlJobDto, id, requestToken);
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.SUCCESS, "Job Updated", jobId), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Job Update Failed", null),
					HttpStatus.OK);
		}
	}

}
