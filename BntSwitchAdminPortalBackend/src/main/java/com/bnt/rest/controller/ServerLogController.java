package com.bnt.rest.controller;

import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bnt.common.ResponseEntityData;
import com.bnt.common.util.RippsUtility;
import com.bnt.constant.RippsRestConstant;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Controller
@RestController
@RequestMapping("/")
@CrossOrigin(origins = "${crossOriginUrl}")
public class ServerLogController {

	@Value("${serverlog.url.base}")
	private String baseUrl;

	@Value("${serverlog.url.log}")
	private String logUrl;
	private static final Logger logger = LogManager.getLogger(ServerLogController.class);

	@GetMapping(value = "serverlog")
	public ResponseEntity<Map<String, Object>> showAdHocReportDesigner(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, HttpServletRequest request) {
		logger.info("Find all Server Logs");
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find Server Logs");
		responseEntityData.setData("https://localhost:8443/rippsadm/rest/serverlog/test");
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "serverlog/test")
	public String dymmyMethod(@RequestHeader(value = "X-Auth-Token") String xAuthToken, HttpServletRequest request) {

		return "new";
	}
}
