package com.bnt.rest.controller;

import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import org.apache.commons.lang3.StringUtils;
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
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.RippsUtility;
import com.bnt.constant.RippsRestConstant;
import com.bnt.rest.dto.ComponentProfile;
import com.bnt.rest.dto.MonitoringData;
import com.bnt.rest.service.RestMonitoringService;
import com.bnt.rest.service.impl.MonitoringScheduler;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/monitoring-screen")
@CrossOrigin(origins = "${crossOriginUrl}")
public class MonitoringScreenController {

	private static final Logger logger = LogManager.getLogger(MonitoringScreenController.class);

	private static final String RESULT = "result";

	private static final String ERROR_MESSAGE = "Error while retrieving monitoring information";

	private static final String MONITORING_ERROR_MESSAGE = "Unable to fetch Monitoring data.Please try after sometime.";

	private static final String NETWORK_STATUS_ERROR_MESSAGE = "Unable to fetch Network status.Please try after sometime.";

	@Autowired
	private RestMonitoringService restMonitoringService;

	@Autowired
	private MonitoringScheduler monitoringScheduler;

	@GetMapping
	public ResponseEntity<Map<String, Object>> getMonitoringData(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Find all Monitoring Screen Data");
		try {
			Map<String, Object> data = new TreeMap<>();
			monitoringScheduler.scheduleTaskWithFixedRate();
			Object data1 = monitoringScheduler.getMonitoringData();
			if (null != data1) {
				data.put(RESULT, data1);
			} else {
				return new ResponseEntity<>(
						RippsUtility.setResponseEntityData(RippsRestConstant.SUCCESS, MONITORING_ERROR_MESSAGE, null),
						HttpStatus.OK);
			}
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find Data");
			responseEntityData.setData(data);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		}
	}

	@PostMapping(value = "component-monitoring-data")
	public ResponseEntity<Map<String, Object>> getComponentMonitoringData(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @RequestBody MonitoringData monitoringData) {
		logger.info("Find all Monitoring Screen Data");
		try {
			Map<String, Object> data = new TreeMap<>();
			Object data1 = monitoringScheduler.individualComponentMonitoringDetail(monitoringData);
			if (null != data1) {
				data.put(RESULT, data1);
			} else {
				return new ResponseEntity<>(
						RippsUtility.setResponseEntityData(RippsRestConstant.SUCCESS, MONITORING_ERROR_MESSAGE, null),
						HttpStatus.OK);
			}
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find Data");
			responseEntityData.setData(data);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		}
	}

	@GetMapping(value = "monitoring-screen-detail/{url}/start/{componentName}")
	public ResponseEntity<ResponseEntityData> startInstance(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("url") String url, @PathVariable("componentName") String componentName) {
		logger.info("Find all Monitoring Screen Start Opration Data: {}", url);

		List<ComponentProfile> componentProfileList = monitoringScheduler.getComponentProfile();

		Boolean isStarted = Boolean.FALSE;
		if (componentProfileList != null)
			isStarted = restMonitoringService.startConsumerConnection(componentProfileList, url, componentName);

		if (isStarted.booleanValue()) {
			return HttpCommons.setResponseEntityPageDataObject(isStarted, "Resume request sent.",
					"Resume request sent.");
		} else {
			return HttpCommons.setResponseEntityPageDataObject(isStarted.booleanValue(),
					"Resume request couldn't sent.", "Resume request couldn't sent.");
		}

	}

	@GetMapping(value = "monitoring-screen-detail/{url}/stop/{componentName}")
	public ResponseEntity<ResponseEntityData> pauseInstance(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("url") String url, @PathVariable("componentName") String componentName) {
		logger.info("Find all Monitoring Screen Stop Opration Data: {}", url);

		List<ComponentProfile> componentProfileList = monitoringScheduler.getComponentProfile();

		Boolean isStopped = Boolean.FALSE;
		if (componentProfileList != null)
			isStopped = restMonitoringService.pauseConsumerConnection(componentProfileList, url, componentName);

		if (isStopped.booleanValue()) {
			return HttpCommons.setResponseEntityPageDataObject(isStopped, "Suspend request sent.",
					"Suspend request sent.");
		} else {
			return HttpCommons.setResponseEntityPageDataObject(isStopped.booleanValue(),
					"Suspend request couldn't sent.", "Suspend request couldn't sent.");
		}
	}

	@GetMapping(value = "monitoring-screen-detail/{url}/kill")
	public ResponseEntity<ResponseEntityData> killInstance(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("url") String url) {
		logger.info("Find all Monitoring Screen Kill Opration Data: {}", url);
		List<ComponentProfile> componentProfileList = monitoringScheduler.getComponentProfile();

		Boolean isStopped = Boolean.FALSE;
		if (componentProfileList != null)
			isStopped = restMonitoringService.killComponentConnection(componentProfileList, url);

		if (isStopped.booleanValue()) {
			return HttpCommons.setResponseEntityPageDataObject(isStopped, "Server killed request sent.",
					"Server killed request sent.");
		} else {
			return HttpCommons.setResponseEntityPageDataObject(isStopped, "Server already killed.",
					"Server already killed.");
		}
	}

	@GetMapping(value = "monitoring-screen-detail/{url}/{loggerName}/logging")
	public ResponseEntity<ResponseEntityData> getLoggerLevel(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("url") String url, @PathVariable("loggerName") String loggerName) {
		logger.info("Find all Monitoring Screen Logger Name Operation Data:{} | {} ", url, loggerName);
		List<ComponentProfile> componentProfileList = monitoringScheduler.getComponentProfile();
		String logLevel = null;
		if (componentProfileList != null)
			logLevel = restMonitoringService.getLoggerLevel(componentProfileList, url, loggerName);
		if (logLevel == null)
			return HttpCommons.setResponseEntityPageDataObject(logLevel, "Logger level not updated.",
					"Logger level not updated.");
		else
			return HttpCommons.setResponseEntityPageDataObject(logLevel, "Logger level updated.",
					"Logger level updated.");
	}

	@PutMapping(value = "monitoring-screen-detail/{url}/logging/{loggerName}/{loggerLevel}")
	public ResponseEntity<ResponseEntityData> updateLoggerLevel(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("url") String url,
			@PathVariable("loggerName") String loggerName, @PathVariable("loggerLevel") String loggerLevel) {
		logger.info("Find all Monitoring Screen Logger Level Opration Data: {} : {}", loggerName, loggerLevel);

		List<ComponentProfile> componentProfileList = monitoringScheduler.getComponentProfile();
		Boolean isUpdateLoggerLevel = Boolean.FALSE;
		if (componentProfileList != null)
			isUpdateLoggerLevel = restMonitoringService.updateLoggerLevel(componentProfileList, url, loggerName,
					loggerLevel);
		if (isUpdateLoggerLevel.equals(true)) {
			return HttpCommons.setResponseEntityPageDataObject(isUpdateLoggerLevel,
					"Logging level change request sent.", "Logging level change request sent.");
		}
		return HttpCommons.setResponseEntityPageDataObject(isUpdateLoggerLevel, "Logging level not updated.",
				ERROR_MESSAGE);
	}

	@GetMapping(value = "/networkStatusForConnectionName/{url}/{connectionName}")
	public ResponseEntity<ResponseEntityData> getNetworkStatus(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("url") String restUrl, @PathVariable("connectionName") String connectionName) {
		logger.info("Get Network Status for Connection name");

		List<ComponentProfile> componentProfileList = monitoringScheduler.getComponentProfile();
		String networkStatus = restMonitoringService.getNetworkStatus(componentProfileList, restUrl, connectionName);

		if (!StringUtils.isEmpty(networkStatus)) {
			return HttpCommons.setResponseEntityPageDataObject(networkStatus, RippsRestConstant.SUCCESS, "Refreshed");
		} else {
			return HttpCommons.setResponseEntityPageDataObject(null, RippsRestConstant.FAILURE,
					NETWORK_STATUS_ERROR_MESSAGE);
		}
	}
}
