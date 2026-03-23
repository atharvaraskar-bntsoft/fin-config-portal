package com.bnt.rest.service;

import java.util.List;
import java.util.Optional;
import com.bnt.rest.dto.ComponentProfile;
import com.bnt.rest.dto.MonitoringData;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface RestMonitoringService {

	/**
	 * getMonitoringData() returns running switch components that hazelcast api
	 * returns.
	 * 
	 * @param componentProfile
	 * @return Optional
	 */
	Optional<?> getMonitoringData(List<ComponentProfile> componentProfile);

	/**
	 * getMonitoringData() returns running switch components that hazelcast api
	 * returns.Overriden to return detail information of selected component from UI.
	 * component based
	 * 
	 * @param componentProfile
	 * @param monitoringData
	 * @return
	 */
	Optional<?> getMonitoringData(List<ComponentProfile> componentProfile, MonitoringData monitoringData);

	/**
	 * getComponentProfileMapping() returns JSON string for exposed end-points for
	 * all components based on profiles.
	 * 
	 * @return Optional
	 */
	List<ComponentProfile> getComponentProfileMapping();

	/**
	 * getLoggerLevel() calls logger API exposed by switch components and return
	 * JSON String
	 * 
	 * @param componentProfileList
	 * @param url
	 * @param loggerName
	 * @return String
	 */
	String getLoggerLevel(List<ComponentProfile> componentProfileList, String url, String loggerName);

	/**
	 * updateLoggerLevel() get triggers update logging api exposed by switch for
	 * selected logger and returns true if success.
	 * 
	 * @param componentProfileList
	 * @param url
	 * @param loggerName
	 * @param loggerLevel
	 * @return Boolean
	 */
	Boolean updateLoggerLevel(List<ComponentProfile> componentProfileList, String url, String loggerName,
			String loggerLevel);

	/**
	 * killComponentConnection() triggers kill component API call exposed by switch
	 * and returns true if success.
	 * 
	 * @param componentProfileList
	 * @param url
	 * @return Boolean
	 */
	Boolean killComponentConnection(List<ComponentProfile> componentProfileList, String url);

	/**
	 * pauseConsumerConnection() triggers pause consumer connection api exposed by
	 * switch and returns true if success.
	 * 
	 * @param componentProfileList
	 * @param url
	 * @param componentName
	 * @return Boolean
	 */
	Boolean pauseConsumerConnection(List<ComponentProfile> componentProfileList, String url, String componentName);

	/**
	 * startConsumerConnection() triggers start consumer connection api exposed by
	 * switch and returns true if success.
	 * 
	 * @param componentProfileList
	 * @param url
	 * @return Boolean
	 */
	Boolean startConsumerConnection(List<ComponentProfile> componentProfileList, String url, String componentName);

	/**
	 * getNetworkStatus() to trigger updated network status api exposed by switch
	 * and return updated status as string.
	 * 
	 * @param componentProfile
	 * @param url
	 * @param connectionName
	 * @return String
	 */
	String getNetworkStatus(List<ComponentProfile> componentProfile, String url, String connectionName);
}
