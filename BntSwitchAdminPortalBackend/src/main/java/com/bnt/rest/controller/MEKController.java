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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bnt.common.HttpCommons;
import com.bnt.common.ResponseEntityData;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.RippsUtility;
import com.bnt.common.util.exception.ExceptionLog;
import com.bnt.constant.RippsRestConstant;
import com.bnt.rest.dto.MEKDto;
import com.bnt.rest.service.MEKService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/mek")
@CrossOrigin(origins = "${crossOriginUrl}")
public class MEKController {

	private static final Logger logger = LogManager.getLogger(MEKController.class);

	@Autowired
	private MEKService mekService;

	@Autowired
	private HttpServletRequest request;

	@PostMapping(value = "/generate")
	public ResponseEntity<Map<String, Object>> generateMEK(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@RequestBody MEKDto dto) {
		logger.info("Generate MEK");
		String requestToken = RippsUtility.getToken(request);

		try {
			int executeFlag = mekService.addMek(dto, requestToken);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			if (executeFlag == 1) {
				responseEntityData.setMessage("Key submitted");
			} else if (executeFlag == 2) {
				responseEntityData.setMessage("Key generated");
			}
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.CREATED);
		} catch (RippsAdminException e) {
			logger.error(ExceptionLog.printStackTraceToString(e));
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		} catch (Exception e) {
			logger.error(ExceptionLog.printStackTraceToString(e));
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Creation failed", null),
					HttpStatus.OK);
		}
	}

	@GetMapping
	public ResponseEntity<Map<String, Object>> listAllMEK(@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Find all MEK");
		String requestToken = RippsUtility.getToken(request);
		Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
		MEKDto dto = mekService.findAllMEK(requestToken, requestParamMap);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		if (dto.getOtherCustodianTextExist().booleanValue()) {
			responseEntityData.setMessage("first clear text created by " + dto.getUser());
		} else {
			responseEntityData.setMessage("Last key generated on " + dto.getLastUpdatedTime());
		}
		responseEntityData.setData(dto);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

}