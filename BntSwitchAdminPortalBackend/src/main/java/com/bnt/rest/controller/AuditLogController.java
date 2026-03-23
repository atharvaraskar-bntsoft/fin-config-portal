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
import com.bnt.rest.service.AuditLogService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping(value = "/logs-audit")
@CrossOrigin(origins = "${crossOriginUrl}")
public class AuditLogController {
	@Autowired
	private AuditLogService auditLogService;

	@Autowired
	private HttpServletRequest request;

	// Fetch all audit logs records list
	private static final Logger LOGGER = LogManager.getLogger(AuditLogController.class);

	@GetMapping
	public ResponseEntity<Map<String, Object>> getAuditLog(@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		try {
			Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
			ResponseWrapper responsePage = auditLogService.findAllAuditLogs(requestParamMap);
			return HttpCommons.setResponseEntityPageData(responsePage, "logsList", "Find all audit logs",
					"Error in find all audit logs");
		} catch (RippsAdminException e) {
			LOGGER.error(ExceptionLog.printStackTraceToString(e));
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		} catch (Exception e) {
			LOGGER.error(ExceptionLog.printStackTraceToString(e));
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		}

	}

	// Fetch all audit logs records list based on selected filter option
	@GetMapping(value = "/filter")
	public ResponseEntity<Map<String, Object>> getFilterData(@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		Map<String, Object> map = auditLogService.getFilterData();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setData(map);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}
}
