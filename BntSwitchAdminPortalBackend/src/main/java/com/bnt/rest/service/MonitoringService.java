package com.bnt.rest.service;

import org.springframework.http.ResponseEntity;

import com.bnt.rest.dto.MonitoringResponseWrapper;
import com.bnt.rest.dto.MonitoringScreenWrapper;
import com.bnt.rest.dto.ToggleMaintenanceDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface MonitoringService {

	Object getMonitoringData();

	MonitoringScreenWrapper getMonitoringDataByName(String name);

	public MonitoringResponseWrapper getRefreshedGraphData();

	Boolean pauseJmxConnection(String jmxUrl);

	Boolean startJmxConnection(String url);

	Boolean toggleNetworkRequestResponse(String url, boolean isEnable);

	Boolean killJmxConnection(String url);

	Boolean toggleLogging(String url, boolean isEnable);

	String getLoggerLevel(String url, String loggerName);

	Boolean updateLoggerLevel(String url, String loggerName, String loggerLevel);

	Boolean executeNetworkRequestMethod(String url, String methodName, String connectionName);

	Boolean updateProperty(String jmxURL, Object propertyKey, Object propertyValue);

	void toggleMaintenance(ToggleMaintenanceDto toggleMaintenanceDto);

	ResponseEntity setSecretManagerStatus(String restUrl);

	public String getNetworkStatus(String jmxUrl, String connectionName);

}
