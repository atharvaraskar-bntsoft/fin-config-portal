package com.bnt.rest.controller;

import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bnt.common.ResponseEntityData;
import com.bnt.common.util.RippsUtility;
import com.bnt.common.util.StringUtil;
import com.bnt.constant.Constants;
import com.bnt.constant.RippsRestConstant;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/shutdowngracefully")
@CrossOrigin(origins = "${crossOriginUrl}")
public class ShutdownHookController {
	private static final Logger logger = LogManager.getLogger(ShutdownHookController.class);

	@Value("${shutdowndown.gracefully.wait_time}")
	private static String shutdownGraceTime;

	@GetMapping
	public static ResponseEntity<Map<String, Object>> shutdownGracefully() {

		logger.info("shutdownGracefully() called...");
		Constants.SHUTDOWN_ACTIVATED = true;
		try {
			int waitTimeBeforeShutdown = 5000;
			if (!StringUtil.isEmptyOrNull(shutdownGraceTime))
				waitTimeBeforeShutdown = Integer.valueOf(shutdownGraceTime);
			Thread.sleep(waitTimeBeforeShutdown);
		} catch (InterruptedException e) {
			logger.info("shutdownGracefully() interrupted...{}", e.getMessage());
			Thread.currentThread().interrupt();
		}

		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Shutdown graceefully.");
		responseEntityData.setData("Shutdown graceefully.");
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}
}
