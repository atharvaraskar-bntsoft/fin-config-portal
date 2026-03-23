package com.bnt.rest.service.impl;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.ResourceBundle;
import java.util.Set;
import java.util.TreeMap;
import java.util.TreeSet;

import org.apache.commons.lang3.EnumUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import com.bnt.bswitch.shared.lib.services.MapFactory;
import com.bnt.common.util.ResourceBundleToMap;
import com.bnt.common.util.RippsUtility;
import com.bnt.monitoring.MonitoringRestServiceHelper;
import com.bnt.monitoring.enums.MonitoringComponentTypeDetails;
import com.bnt.monitoring.enums.MonitoringComponentTypeDetails.ConfigLoaderAllowedEndPoint;
import com.bnt.monitoring.enums.MonitoringComponentTypeDetails.HzServerAllowedEndPoint;
import com.bnt.monitoring.enums.MonitoringComponentTypeDetails.L1AmexAllowedEndPoint;
import com.bnt.monitoring.enums.MonitoringComponentTypeDetails.L1HttpServerAllowedEndPoint;
import com.bnt.monitoring.enums.MonitoringComponentTypeDetails.L1TcpClientAllowedEndPoint;
import com.bnt.monitoring.enums.MonitoringComponentTypeDetails.L1TcpServerAllowedEndPoint;
import com.bnt.monitoring.enums.MonitoringComponentTypeDetails.L2CoreAllowedEndPoint;
import com.bnt.monitoring.enums.MonitoringComponentTypeDetails.L3HttpClientAllowedEndPoint;
import com.bnt.monitoring.enums.MonitoringComponentTypeDetails.L3TcpClientAllowedEndPoint;
import com.bnt.monitoring.enums.MonitoringComponentTypeDetails.L3TcpServerAllowedEndPoint;
import com.bnt.rest.dto.ComponentProfile;
import com.bnt.rest.dto.MapMetaDataWrapper;
import com.bnt.rest.dto.MonitoringData;
import com.bnt.rest.dto.MonitoringResponseWrapper;
import com.bnt.rest.dto.MonitoringScreenWrapper;
import com.bnt.rest.service.RestMonitoringService;
import com.bnt.rest.wrapper.dto.IdAndCodeWrapperString;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class RestMonitoringServiceImpl implements RestMonitoringService {

	/** The Constant LOGGER. */
	private static final Logger LOGGER = LogManager.getLogger(RestMonitoringServiceImpl.class);

	@Autowired(required = false)
	@Lazy
	private MapFactory mapFactory;

	@Value("${monitoring.health.rest.url}")
	private String MONITORING_HELTH_REST_URL;

	@Value("${monitoring.component.profile.mapping.rest.url}")
	private String MONITORING_COMPONENT_PROFILE_LOADER_HELTH_REST_URL;

	@Value("${monitoring.health.rest.url.isSSL.enabled}")
	private boolean isSSLEnabledForMonitoring;

	@Override
	public Optional<MonitoringResponseWrapper> getMonitoringData(List<ComponentProfile> componentProfile) {
		LOGGER.info("inside getMonitoringData()..");
		Map<String, Integer> componentStatusMap = null;
		MonitoringScreenWrapper monitoringScreenWrapper = null;
		Map<String, List<Object>> healthData = new HashMap<>();
		MonitoringResponseWrapper responseWrapper = new MonitoringResponseWrapper();
		List<MonitoringData> restMonitoringData = null;
		try {
			restMonitoringData = getMonitoringHelthData(componentProfile);
		} catch (Exception e) {
			LOGGER.error("Exception in getMonitoringData()");
			return null;
		}
		if (restMonitoringData == null || restMonitoringData.size() == 0) {
			return null;
		}

		int count = 0;
		for (MonitoringData monitoringData : restMonitoringData) {

			String componentStatus = monitoringData.getStatus();
			String componentType = monitoringData.getComponentType();
			if (null != componentStatusMap) {
				if (null != componentStatusMap.get(componentStatus)) {
					componentStatusMap.put(componentStatus, componentStatusMap.get(componentStatus) + 1);
				} else {
					componentStatusMap.put(componentStatus, 1);
				}
			} else {
				componentStatusMap = new HashMap<>();
				componentStatusMap.put(componentStatus, 1);
			}

			ComponentProfile profile = componentProfile.stream().filter(s -> s.getComponentName().equals(componentType))
					.findFirst().orElse(null);

			monitoringScreenWrapper = setCommonFieldsMonitoringData(monitoringData);

			if (count == 0) {
				monitoringScreenWrapper = getMonitoringScreenDetail(monitoringScreenWrapper, profile, monitoringData);
				monitoringScreenWrapper.setIsDefault(Boolean.TRUE);
			}

			count++;
			groupHealthData(healthData, componentType, monitoringScreenWrapper);

		}
		List<MapMetaDataWrapper> healthDataList = mapDataToMetaInfoWrapper(healthData);
		responseWrapper.setNodeStatusMap(componentStatusMap);
		responseWrapper.setHealthDataList(healthDataList);

		return Optional.ofNullable(responseWrapper);
//		return responseWrapper;
	}

	@Override
	public Optional<MonitoringResponseWrapper> getMonitoringData(List<ComponentProfile> componentProfile,
			MonitoringData requestedComponent) {
		LOGGER.info("getMonitoringData() called..");
		Map<String, Integer> componentStatusMap = null;
		MonitoringScreenWrapper monitoringScreenWrapper = null;
		Map<String, List<Object>> healthData = new TreeMap<>();
		MonitoringResponseWrapper responseWrapper = new MonitoringResponseWrapper();
		List<MonitoringData> restMonitoringData = null;
		try {
			restMonitoringData = getMonitoringHelthData(componentProfile);
		} catch (Exception e) {
			LOGGER.error("Exception in getMonitoringData()");
			return null;
		}
		if (restMonitoringData == null || restMonitoringData.size() == 0) {
			return null;
		}

		for (MonitoringData monitoringData : restMonitoringData) {
			String componentStatus = monitoringData.getStatus();
			String componentType = monitoringData.getComponentType();
			if (null != componentStatusMap) {
				if (null != componentStatusMap.get(componentStatus)) {
					componentStatusMap.put(componentStatus, componentStatusMap.get(componentStatus) + 1);
				} else {
					componentStatusMap.put(componentStatus, 1);
				}
			} else {
				componentStatusMap = new HashMap<>();
				componentStatusMap.put(componentStatus, 1);
			}

			ComponentProfile profile = componentProfile.stream().filter(s -> s.getComponentName().equals(componentType))
					.findFirst().orElse(null);

			monitoringScreenWrapper = setCommonFieldsMonitoringData(monitoringData);
			if (requestedComponent.getName().equalsIgnoreCase(monitoringData.getName())
					&& monitoringData.getRestURL().contains(requestedComponent.getRestURL())) {
				LOGGER.info("requested component is... {}...and monitoringData is...{}", requestedComponent.getName(),
						monitoringData.getName());
				LOGGER.info("requested component url is... {}...and monitoringData url is...{}",
						requestedComponent.getRestURL(), monitoringData.getRestURL());
				monitoringScreenWrapper = getMonitoringScreenDetail(monitoringScreenWrapper, profile, monitoringData);
				monitoringScreenWrapper.setIsDefault(Boolean.TRUE);
			}

			groupHealthData(healthData, componentType, monitoringScreenWrapper);

		}
		List<MapMetaDataWrapper> healthDataList = mapDataToMetaInfoWrapper(healthData);
		responseWrapper.setNodeStatusMap(componentStatusMap);
		responseWrapper.setHealthDataList(healthDataList);

		return Optional.ofNullable(responseWrapper);
	}

	private void groupHealthData(Map<String, List<Object>> healthData, String commonHealthName,
			MonitoringScreenWrapper monitoringScreenWrapper) {
		if (null != healthData.get(commonHealthName)) {
			healthData.get(commonHealthName).add(RippsUtility.getJsonObject(monitoringScreenWrapper));
			healthData.put(commonHealthName, healthData.get(commonHealthName));
		} else {
			List<Object> healthList = new ArrayList<>();
			healthList.add(RippsUtility.getJsonObject(monitoringScreenWrapper));
			healthData.put(commonHealthName, healthList);
		}

//		LOGGER.info(" {} current count is  {}", commonHealthName, healthData.size());
	}

	private List<MapMetaDataWrapper> mapDataToMetaInfoWrapper(Map<String, List<Object>> healthData) {

		List<MapMetaDataWrapper> healthTotalList = new ArrayList<>();
		for (Map.Entry<String, List<Object>> entry : healthData.entrySet()) {

			MapMetaDataWrapper data = new MapMetaDataWrapper();
			data.setData(entry.getValue());

			Map<String, Object> metaInfoMap = new HashMap<>();
			metaInfoMap.put("header", entry.getKey());

			setGroupOptions(metaInfoMap);
			setLoggerSet(metaInfoMap);

			data.setMetaInfo(metaInfoMap);
			healthTotalList.add(data);
		}
		return healthTotalList;
	}

	private void setLoggerSet(Map<String, Object> metaInfoMap) {
		Set<String> loggerLevelSet = new TreeSet<>();

		loggerLevelSet.add("INFO");
		loggerLevelSet.add("DEBUG");
		loggerLevelSet.add("ERROR");
		loggerLevelSet.add("WARN");
		loggerLevelSet.add("FATAL");
		loggerLevelSet.add("OFF");
		loggerLevelSet.add("TRACE");
		loggerLevelSet.add("ALL");
		metaInfoMap.put("loggerLevelSet", loggerLevelSet);

	}

	private void setGroupOptions(Map<String, Object> metaInfoMap) {
		Map<String, String> groupSettingMap = getGroupOptions();
		String headerGroup = (String) metaInfoMap.get("header");
		if (groupSettingMap.containsKey(headerGroup)) {
			List<String> groupOptions = new ArrayList<>(Arrays.asList(groupSettingMap.get(headerGroup).split(",")));
			Map<String, Boolean> groupOptionsMap = new HashMap<>();
			for (String eachOption : groupOptions) {
				groupOptionsMap.put(eachOption, true);
			}
			metaInfoMap.put("groupOptions", groupOptionsMap);
		}
	}

	private Map<String, String> getGroupOptions() {

		ResourceBundle resource = ResourceBundle.getBundle("groupMonitoringOptions", Locale.UK);

		// Call the convertResourceBundleTopMap method to convert the resource
		// bundle into a Map object.
		return ResourceBundleToMap.convertResourceBundleToMap(resource);
	}

	private MonitoringScreenWrapper getMonitoringScreenDetail(MonitoringScreenWrapper monitoringScreenWrapper,
			ComponentProfile componentProfile, MonitoringData componentHealth) {

		LOGGER.info("inside getMonitoringScreenDetail()...");
//		LOGGER.info("get detailed info for component profile: {} and name : {}", componentProfile.getComponentName(),
//				componentHealth.getName());
//		MonitoringScreenWrapper monitoringScreenWrapper = setCommonFieldsMonitoringData(componentHealth);
		if (componentProfile != null) {
			if (componentProfile.getComponentName() != null) {
				if (EnumUtils.isValidEnum(MonitoringComponentTypeDetails.ComponentTypes.class,
						componentProfile.getComponentName())) {
					setL1ISOMonitoringData(componentProfile, componentHealth, monitoringScreenWrapper);
					setL3ISOMonitoringData(componentProfile, componentHealth, monitoringScreenWrapper);
					setL1JSONMonitoringData(componentProfile, componentHealth, monitoringScreenWrapper);
					setL3JSONMonitoringData(componentProfile, componentHealth, monitoringScreenWrapper);
					setLoaderMonitoringData(componentProfile, componentHealth, monitoringScreenWrapper);
					setHZMonitoringData(componentProfile, componentHealth, monitoringScreenWrapper);
					setCoreMonitoringData(componentProfile, componentHealth, monitoringScreenWrapper);
				}
			}
		}
		return monitoringScreenWrapper;
	}

	private MonitoringScreenWrapper setCommonFieldsMonitoringData(MonitoringData componentHealth) {
		MonitoringScreenWrapper monitoringScreenWrapper = new MonitoringScreenWrapper();
		monitoringScreenWrapper.setId(componentHealth.getId());
		monitoringScreenWrapper.setStatus(componentHealth.getStatus());
		monitoringScreenWrapper.setJmxURL(componentHealth.getJmxLocation());
		monitoringScreenWrapper.setName(componentHealth.getName());
		monitoringScreenWrapper.setRestURL(componentHealth.getRestURL());
		Object latency1 = componentHealth.getStatusChanged();
		Long statusChanged = Long.parseLong(latency1.toString());
		Timestamp ts = new Timestamp(statusChanged);
		monitoringScreenWrapper.setRunningSince(ts);
		monitoringScreenWrapper.setStatusChanged(statusChanged);
		return monitoringScreenWrapper;
	}

	private void setCoreMonitoringData(ComponentProfile componentProfile, MonitoringData componentHealth,
			MonitoringScreenWrapper monitoringScreenWrapper) {
		LOGGER.info("inside setCoreMonitoringData()...");
		// L2 Core
		if (componentProfile.getComponentName()
				.equalsIgnoreCase(MonitoringComponentTypeDetails.L2CoreComponentType.L2_CORE.name())) {
			setL2CoreMonitoringData(componentProfile, componentHealth, monitoringScreenWrapper);
		}
	}

	private void setHZMonitoringData(ComponentProfile componentProfile, MonitoringData componentHealth,
			MonitoringScreenWrapper monitoringScreenWrapper) {
		LOGGER.info("inside setHZMonitoringData()...");

		// HZ-SERVER
		if (componentProfile.getComponentName()
				.equalsIgnoreCase(MonitoringComponentTypeDetails.HZServerComponentType.HAZELCAST_SERVER.name())) {
			setHZServerMonitoringData(componentProfile, componentHealth, monitoringScreenWrapper);
		}
	}

	private void setLoaderMonitoringData(ComponentProfile componentProfile, MonitoringData componentHealth,
			MonitoringScreenWrapper monitoringScreenWrapper) {

		LOGGER.info("inside setLoderMonitoringData()...");
		// config loader
		if (componentProfile.getComponentName()
				.equalsIgnoreCase(MonitoringComponentTypeDetails.ConfigLoaderComponentType.CONFIG_LOADER.name())) {

			setConfigLoaderMonitoringData(componentProfile, componentHealth, monitoringScreenWrapper);
		}
	}

	private void setL3JSONMonitoringData(ComponentProfile componentProfile, MonitoringData componentHealth,
			MonitoringScreenWrapper monitoringScreenWrapper) {

		LOGGER.info("inside setL3JSONMonitoringData()...");

		// L3_JSON or L3_HTTP_CLIENT
		if (componentProfile.getComponentName()
				.equalsIgnoreCase(MonitoringComponentTypeDetails.L3JSONComponentType.L3_JSON.name())
				|| componentProfile.getComponentName()
						.equalsIgnoreCase(MonitoringComponentTypeDetails.L3JSONComponentType.L3_HTTP_CLIENT.name())) {
			setL3HttpClientMonitoringData(componentProfile, componentHealth, monitoringScreenWrapper);
		}
		// L3_HTTP_CLIENT
//		if (componentProfile.getComponentName().equalsIgnoreCase(MonitoringComponentTypeDetails.L3JSONComponentType.L3_HTTP_CLIENT.name())) {
//			setL3HttpClientMonitoringData(componentProfile, componentHealth, monitoringScreenWrapper);
//		}
	}

	private void setL1JSONMonitoringData(ComponentProfile componentProfile, MonitoringData componentHealth,
			MonitoringScreenWrapper monitoringScreenWrapper) {
		LOGGER.info("inside setL1JSONMonitoringData()...");

		// L1_JSON of L1_HTTP_SERVER
		if (componentProfile.getComponentName()
				.equalsIgnoreCase(MonitoringComponentTypeDetails.L1JSONComponentType.L1_JSON.name())
				|| componentProfile.getComponentName()
						.equalsIgnoreCase(MonitoringComponentTypeDetails.L1JSONComponentType.L1_HTTP_SERVER.name())) {
			setL1HttpServerMonitoringData(componentProfile, componentHealth, monitoringScreenWrapper);
		}
		// L1_HTTP_SERVER
//		if (componentProfile.getComponentName().equalsIgnoreCase(MonitoringComponentTypeDetails.L1JSONComponentType.L1_HTTP_SERVER.name())) {
//			setL1HttpServerMonitoringData(componentProfile, componentHealth, monitoringScreenWrapper);
//		}
	}

	private void setL3ISOMonitoringData(ComponentProfile componentProfile, MonitoringData componentHealth,
			MonitoringScreenWrapper monitoringScreenWrapper) {

		LOGGER.info("inside setL3ISOMonitoringData()...");

		// L3_TCP_SERVER
		if (componentProfile.getComponentName()
				.equalsIgnoreCase(MonitoringComponentTypeDetails.L3ISOComponentType.L3_TCP_SERVER.name())) {
			setL3TCPServerMonitoringData(componentProfile, componentHealth, monitoringScreenWrapper);// TODO: SOME ISSUE
		}
		// L3_TCP_CLIENT, L3_ISO
		if (componentProfile.getComponentName()
				.equalsIgnoreCase(MonitoringComponentTypeDetails.L3ISOComponentType.L3_TCP_CLIENT.name())
				|| componentProfile.getComponentName()
						.equalsIgnoreCase(MonitoringComponentTypeDetails.L3ISOComponentType.L3_ISO.name())) {
			setL3TCPClientMonitoringData(componentProfile, componentHealth, monitoringScreenWrapper);
		}
//		//L3_ISO
//		if (componentProfile.getComponentName().equalsIgnoreCase(MonitoringComponentTypeDetails.L3ISOComponentType.L3_ISO.name())) {
//			setL3TCPClientMonitoringData(componentProfile, componentHealth, monitoringScreenWrapper);
//		}
	}

	private void setL1ISOMonitoringData(ComponentProfile componentProfile, MonitoringData componentHealth,
			MonitoringScreenWrapper monitoringScreenWrapper) {

		LOGGER.info("inside setL1ISOMonitoringData()...");
		// L1_TCP_SERVER
		if (componentProfile.getComponentName()
				.equalsIgnoreCase(MonitoringComponentTypeDetails.L1ISOComponentType.L1_TCP_SERVER.name())) {
			setL1TCPServerMonitoringData(componentProfile, componentHealth, monitoringScreenWrapper);
		}
		// L1_TCP_CLIENT or L1_ISO
		if (componentProfile.getComponentName()
				.equalsIgnoreCase(MonitoringComponentTypeDetails.L1ISOComponentType.L1_TCP_CLIENT.name())
				|| componentProfile.getComponentName()
						.equalsIgnoreCase(MonitoringComponentTypeDetails.L1ISOComponentType.L1_ISO.name())) {
			setL1TCPClientMonitoringData(componentProfile, componentHealth, monitoringScreenWrapper);
		}
		// L1_ISO
//		if (componentProfile.getComponentName().equalsIgnoreCase(MonitoringComponentTypeDetails.L1ISOComponentType.L1_ISO.name())) {
//			setL1TCPClientMonitoringData(componentProfile, componentHealth, monitoringScreenWrapper);
//		}
		// L1_Amex
		if (componentProfile.getComponentName()
				.equalsIgnoreCase(MonitoringComponentTypeDetails.L1ISOComponentType.L1_AMEX.name())) {
			setL1AmexMonitoringData(componentProfile, componentHealth, monitoringScreenWrapper);
		}
	}

	private void setL1TCPServerMonitoringData(ComponentProfile componentProfile, MonitoringData componentHealth,
			MonitoringScreenWrapper monitoringScreenWrapper) {

		LOGGER.info("inside setL1TCPServerMonitoringData()...");

//		L1ISOComponentType s1 = MonitoringComponentTypeDetails.L1ISOComponentType.valueOf(componentProfile.getComponentName());
		// if componentType is L1_TCP_SERVER in s1.getS1() then call
		// L1TcpServerAllowedEndPoint to get equivalent end points.
		Map<String, String> providedEendPointsMap = componentProfile.getEndpoints();
		L1TcpServerAllowedEndPoint[] allowedEndPointForL1TcpServer = MonitoringComponentTypeDetails.L1TcpServerAllowedEndPoint
				.values();
		for (L1TcpServerAllowedEndPoint endpoint : allowedEndPointForL1TcpServer) {
			switch (endpoint) {
			case CONN_COUNT:
				setConnectionCount(monitoringScreenWrapper,
						getRestUrl(isSSLEnabledForMonitoring, componentHealth.getRestURL(), providedEendPointsMap
								.get(MonitoringComponentTypeDetails.L1TcpServerAllowedEndPoint.CONN_COUNT.name())));
				break;
			case IS_SAFE_TO_KILL:
				isSafeToKill(monitoringScreenWrapper,
						getRestUrl(isSSLEnabledForMonitoring, componentHealth.getRestURL(), providedEendPointsMap.get(
								MonitoringComponentTypeDetails.L1TcpServerAllowedEndPoint.IS_SAFE_TO_KILL.name())));
				break;
			case INFLIGHT_TXN_COUNT:
				setInflight(monitoringScreenWrapper,
						getRestUrl(isSSLEnabledForMonitoring, componentHealth.getRestURL(), providedEendPointsMap.get(
								MonitoringComponentTypeDetails.L1TcpServerAllowedEndPoint.INFLIGHT_TXN_COUNT.name())));
				break;
			case NET_ID:
				setAllNetworkStatusList(monitoringScreenWrapper,
						getRestUrl(isSSLEnabledForMonitoring, componentHealth.getRestURL(), providedEendPointsMap
								.get(MonitoringComponentTypeDetails.L1TcpServerAllowedEndPoint.NET_ID.name())));
				break;
			case LOGGERS_DETAIL:
				getLoggerAttribute(monitoringScreenWrapper,
						getRestUrl(isSSLEnabledForMonitoring, componentHealth.getRestURL(), providedEendPointsMap
								.get(MonitoringComponentTypeDetails.L1TcpServerAllowedEndPoint.LOGGERS_DETAIL.name())));
				break;
			default:
				break;
			}
		}
		monitoringScreenWrapper.setEnableNetworkDump(Boolean.FALSE);// TODO : hardcoded as no mbean method for
																	// getDumpRequestResponse found
	}

	private void setL1TCPClientMonitoringData(ComponentProfile componentProfile, MonitoringData componentHealth,
			MonitoringScreenWrapper monitoringScreenWrapper) {

		LOGGER.info("inside setL1TCPClientMonitoringData()...");
//		L1ISOComponentType s1 = MonitoringComponentTypeDetails.L1ISOComponentType.valueOf(componentProfile.getComponentName());
		// if componentType is L1_TCP_CLIENT or L1_ISO in s1.getS1() then call
		// L1TcpClientAllowedEndPoint to get equivalent end points.
		Map<String, String> providedEendPointsMap = componentProfile.getEndpoints();
		L1TcpClientAllowedEndPoint[] allowedEndPointForL1TcpClient = MonitoringComponentTypeDetails.L1TcpClientAllowedEndPoint
				.values();
		for (L1TcpClientAllowedEndPoint endpoint : allowedEndPointForL1TcpClient) {
			switch (endpoint) {
			case CONN_COUNT:
				setConnectionCount(monitoringScreenWrapper,
						getRestUrl(isSSLEnabledForMonitoring, componentHealth.getRestURL(), providedEendPointsMap
								.get(MonitoringComponentTypeDetails.L1TcpClientAllowedEndPoint.CONN_COUNT.name())));
				break;
			case IS_SAFE_TO_KILL:
				isSafeToKill(monitoringScreenWrapper,
						getRestUrl(isSSLEnabledForMonitoring, componentHealth.getRestURL(), providedEendPointsMap.get(
								MonitoringComponentTypeDetails.L1TcpClientAllowedEndPoint.IS_SAFE_TO_KILL.name())));
				break;
			case INFLIGHT_TXN_COUNT:
				setInflight(monitoringScreenWrapper,
						getRestUrl(isSSLEnabledForMonitoring, componentHealth.getRestURL(), providedEendPointsMap.get(
								MonitoringComponentTypeDetails.L1TcpClientAllowedEndPoint.INFLIGHT_TXN_COUNT.name())));
				break;
			case NET_ID:
				setAllNetworkStatusList(monitoringScreenWrapper,
						getRestUrl(isSSLEnabledForMonitoring, componentHealth.getRestURL(), providedEendPointsMap
								.get(MonitoringComponentTypeDetails.L1TcpClientAllowedEndPoint.NET_ID.name())));
				break;
			case LOGGERS_DETAIL:
				getLoggerAttribute(monitoringScreenWrapper,
						getRestUrl(isSSLEnabledForMonitoring, componentHealth.getRestURL(), providedEendPointsMap
								.get(MonitoringComponentTypeDetails.L1TcpClientAllowedEndPoint.LOGGERS_DETAIL.name())));
				break;
			default:
				break;
			}
		}
		monitoringScreenWrapper.setEnableNetworkDump(Boolean.FALSE);// TODO : hardcoded as no mbean method for
																	// getDumpRequestResponse found
	}

	private void setL1AmexMonitoringData(ComponentProfile componentProfile, MonitoringData componentHealth,
			MonitoringScreenWrapper monitoringScreenWrapper) {

		LOGGER.info("inside setL1AmexMonitoringData()...");

//		L1ISOComponentType s1 = MonitoringComponentTypeDetails.L1ISOComponentType.valueOf(componentProfile.getComponentName());
		// if componentType is L1_Amex in s1.getS1() then call L1AmexAllowedEndPoint to
		// get equivalent end points.
		Map<String, String> providedEendPointsMap = componentProfile.getEndpoints();
		L1AmexAllowedEndPoint[] allowedEndPointForL1Amex = MonitoringComponentTypeDetails.L1AmexAllowedEndPoint
				.values();
		for (L1AmexAllowedEndPoint endpoint : allowedEndPointForL1Amex) {
			switch (endpoint) {
			case CONN_COUNT:
				setConnectionCount(monitoringScreenWrapper,
						getRestUrl(isSSLEnabledForMonitoring, componentHealth.getRestURL(), providedEendPointsMap
								.get(MonitoringComponentTypeDetails.L1AmexAllowedEndPoint.CONN_COUNT.name())));
				break;
			case LOGGERS_DETAIL:
				getLoggerAttribute(monitoringScreenWrapper,
						getRestUrl(isSSLEnabledForMonitoring, componentHealth.getRestURL(), providedEendPointsMap
								.get(MonitoringComponentTypeDetails.L1AmexAllowedEndPoint.LOGGERS_DETAIL.name())));
				break;
			default:
				break;
			}

			monitoringScreenWrapper.setSafeToKill(false); // no end-point, hence setting default value
			monitoringScreenWrapper.setInflight(0);// no end-point, hence setting default value
			monitoringScreenWrapper.setAllNetworkStatusList(convertNetworkStatusMapToList(null));// no end-point, hence
																									// setting default
																									// value
			monitoringScreenWrapper.setEnableNetworkDump(Boolean.FALSE);// TODO : hardcoded as no mbean method for
																		// getDumpRequestResponse found
		}
	}

	private void setL3TCPServerMonitoringData(ComponentProfile componentProfile, MonitoringData componentHealth,
			MonitoringScreenWrapper monitoringScreenWrapper) {

		LOGGER.info("inside setL3TCPServerMonitoringData()...");

//		L3ISOComponentType s1 = MonitoringComponentTypeDetails.L3ISOComponentType.valueOf(componentProfile.getComponentName());
		// if componentType is L3_TCP_SERVER in s1.getS1() then call
		// L3TcpServerAllowedEndPoint to get equivalent end points.
		Map<String, String> providedEendPointsMap = componentProfile.getEndpoints();
		L3TcpServerAllowedEndPoint[] allowedEndPointForL3TcpServer = MonitoringComponentTypeDetails.L3TcpServerAllowedEndPoint
				.values();
		for (L3TcpServerAllowedEndPoint endpoint : allowedEndPointForL3TcpServer) {
			switch (endpoint) {
			case CONN_COUNT:
				setConnectionCount(monitoringScreenWrapper,
						getRestUrl(isSSLEnabledForMonitoring, componentHealth.getRestURL(), providedEendPointsMap
								.get(MonitoringComponentTypeDetails.L3TcpServerAllowedEndPoint.CONN_COUNT.name())));
				break;
			case IS_SAFE_TO_KILL:
				isSafeToKill(monitoringScreenWrapper,
						getRestUrl(isSSLEnabledForMonitoring, componentHealth.getRestURL(), providedEendPointsMap.get(
								MonitoringComponentTypeDetails.L3TcpServerAllowedEndPoint.IS_SAFE_TO_KILL.name())));
				break;
			case INFLIGHT_TXN_COUNT:
				setInflight(monitoringScreenWrapper,
						getRestUrl(isSSLEnabledForMonitoring, componentHealth.getRestURL(), providedEendPointsMap.get(
								MonitoringComponentTypeDetails.L3TcpServerAllowedEndPoint.INFLIGHT_TXN_COUNT.name())));
				break;
			case NET_ID:
				setAllNetworkStatusList(monitoringScreenWrapper,
						getRestUrl(isSSLEnabledForMonitoring, componentHealth.getRestURL(), providedEendPointsMap
								.get(MonitoringComponentTypeDetails.L3TcpServerAllowedEndPoint.NET_ID.name())));
				break;
			case LOGGERS_DETAIL:
				getLoggerAttribute(monitoringScreenWrapper,
						getRestUrl(isSSLEnabledForMonitoring, componentHealth.getRestURL(), providedEendPointsMap
								.get(MonitoringComponentTypeDetails.L3TcpServerAllowedEndPoint.LOGGERS_DETAIL.name())));
				break;
			default:
				break;
			}
		}

		monitoringScreenWrapper.setEnableNetworkDump(Boolean.FALSE);// TODO : hardcoded as no mbean method for
																	// getDumpRequestResponse found
	}

	private void setL3TCPClientMonitoringData(ComponentProfile componentProfile, MonitoringData componentHealth,
			MonitoringScreenWrapper monitoringScreenWrapper) {

		LOGGER.info("inside setL3TCPClientMonitoringData()...");

//		L3ISOComponentType s1 = MonitoringComponentTypeDetails.L3ISOComponentType.valueOf(componentProfile.getComponentName());
		// if componentType is L3_TCP_CLIENT or L3_ISO in s1.getS1() then call
		// L3TcpClientAllowedEndPoint to get equivalent end points.
		Map<String, String> providedEendPointsMap = componentProfile.getEndpoints();
		L3TcpClientAllowedEndPoint[] allowedEndPointForL3TcpClient = MonitoringComponentTypeDetails.L3TcpClientAllowedEndPoint
				.values();
		for (L3TcpClientAllowedEndPoint endpoint : allowedEndPointForL3TcpClient) {
			switch (endpoint) {
			case CONN_COUNT:
				setConnectionCount(monitoringScreenWrapper,
						getRestUrl(isSSLEnabledForMonitoring, componentHealth.getRestURL(), providedEendPointsMap
								.get(MonitoringComponentTypeDetails.L3TcpClientAllowedEndPoint.CONN_COUNT.name())));
				break;
			case IS_SAFE_TO_KILL:
				isSafeToKill(monitoringScreenWrapper,
						getRestUrl(isSSLEnabledForMonitoring, componentHealth.getRestURL(), providedEendPointsMap.get(
								MonitoringComponentTypeDetails.L3TcpClientAllowedEndPoint.IS_SAFE_TO_KILL.name())));
				break;
			case INFLIGHT_TXN_COUNT:
				setInflight(monitoringScreenWrapper,
						getRestUrl(isSSLEnabledForMonitoring, componentHealth.getRestURL(), providedEendPointsMap.get(
								MonitoringComponentTypeDetails.L3TcpClientAllowedEndPoint.INFLIGHT_TXN_COUNT.name())));
				break;
			case NET_ID:
				setAllNetworkStatusList(monitoringScreenWrapper,
						getRestUrl(isSSLEnabledForMonitoring, componentHealth.getRestURL(), providedEendPointsMap
								.get(MonitoringComponentTypeDetails.L3TcpClientAllowedEndPoint.NET_ID.name())));
				break;
			case LOGGERS_DETAIL:
				getLoggerAttribute(monitoringScreenWrapper,
						getRestUrl(isSSLEnabledForMonitoring, componentHealth.getRestURL(), providedEendPointsMap
								.get(MonitoringComponentTypeDetails.L3TcpClientAllowedEndPoint.LOGGERS_DETAIL.name())));
				break;
			default:
				break;
			}
		}
		monitoringScreenWrapper.setEnableNetworkDump(Boolean.FALSE);// TODO : hardcoded as no mbean method for
																	// getDumpRequestResponse found
	}

	private void setL1HttpServerMonitoringData(ComponentProfile componentProfile, MonitoringData componentHealth,
			MonitoringScreenWrapper monitoringScreenWrapper) {

		LOGGER.info("inside setL1HttpServerMonitoringData()...");
//		L1JSONComponentType s1 = MonitoringComponentTypeDetails.L1JSONComponentType.valueOf(componentProfile.getComponentName());
		// if componentType is L1_HTTP_SERVER, L1_JSON in s1.getS1() then call
		// L1HttpServerAllowedEndPoint to get equivalent end points.
		Map<String, String> providedEendPointsMap = componentProfile.getEndpoints();
		L1HttpServerAllowedEndPoint[] allowedEndPointForL1HttpServer = MonitoringComponentTypeDetails.L1HttpServerAllowedEndPoint
				.values();
		for (L1HttpServerAllowedEndPoint endpoint : allowedEndPointForL1HttpServer) {
			switch (endpoint) {
			case CONN_COUNT:
				setConnectionCount(monitoringScreenWrapper,
						getRestUrl(isSSLEnabledForMonitoring, componentHealth.getRestURL(), providedEendPointsMap
								.get(MonitoringComponentTypeDetails.L1HttpServerAllowedEndPoint.CONN_COUNT.name())));
				break;
			case IS_SAFE_TO_KILL:
				isSafeToKill(monitoringScreenWrapper,
						getRestUrl(isSSLEnabledForMonitoring, componentHealth.getRestURL(), providedEendPointsMap.get(
								MonitoringComponentTypeDetails.L1HttpServerAllowedEndPoint.IS_SAFE_TO_KILL.name())));
				break;
			case INFLIGHT_TXN_COUNT:
				setInflight(monitoringScreenWrapper,
						getRestUrl(isSSLEnabledForMonitoring, componentHealth.getRestURL(), providedEendPointsMap.get(
								MonitoringComponentTypeDetails.L1HttpServerAllowedEndPoint.INFLIGHT_TXN_COUNT.name())));
				break;
			case NET_ID:
				setAllNetworkStatusList(monitoringScreenWrapper,
						getRestUrl(isSSLEnabledForMonitoring, componentHealth.getRestURL(), providedEendPointsMap
								.get(MonitoringComponentTypeDetails.L1HttpServerAllowedEndPoint.NET_ID == null ? null
										: providedEendPointsMap
												.get(MonitoringComponentTypeDetails.L1HttpServerAllowedEndPoint.NET_ID
														.name()))));
				break;
			case LOGGERS_DETAIL:
				getLoggerAttribute(monitoringScreenWrapper,
						getRestUrl(isSSLEnabledForMonitoring, componentHealth.getRestURL(), providedEendPointsMap.get(
								MonitoringComponentTypeDetails.L1HttpServerAllowedEndPoint.LOGGERS_DETAIL.name())));
				break;
			default:
				break;
			}
		}

		monitoringScreenWrapper.setEnableNetworkDump(Boolean.FALSE);// TODO : hardcoded as no mbean method for
																	// getDumpRequestResponse found
	}

	private void setL3HttpClientMonitoringData(ComponentProfile componentProfile, MonitoringData componentHealth,
			MonitoringScreenWrapper monitoringScreenWrapper) {

		LOGGER.info("inside setL3HttpClientMonitoringData()...");

//		L3JSONComponentType s1 = MonitoringComponentTypeDetails.L3JSONComponentType.valueOf(componentProfile.getComponentName());
		// if componentType is L3_HTTP_CLIENT or L3_JSON in s1.getS1() then call
		// L3HttpClientAllowedEndPoint to get equivalent end points.
		Map<String, String> providedEendPointsMap = componentProfile.getEndpoints();
		L3HttpClientAllowedEndPoint[] allowedEndPointForL3HttpClient = MonitoringComponentTypeDetails.L3HttpClientAllowedEndPoint
				.values();
		for (L3HttpClientAllowedEndPoint endpoint : allowedEndPointForL3HttpClient) {
			switch (endpoint) {
			case CONN_COUNT:
				setConnectionCount(monitoringScreenWrapper,
						getRestUrl(isSSLEnabledForMonitoring, componentHealth.getRestURL(), providedEendPointsMap
								.get(MonitoringComponentTypeDetails.L3HttpClientAllowedEndPoint.CONN_COUNT.name())));
				break;
			case IS_SAFE_TO_KILL:
				isSafeToKill(monitoringScreenWrapper,
						getRestUrl(isSSLEnabledForMonitoring, componentHealth.getRestURL(), providedEendPointsMap.get(
								MonitoringComponentTypeDetails.L3HttpClientAllowedEndPoint.IS_SAFE_TO_KILL.name())));
				break;
			case INFLIGHT_TXN_COUNT:
				setInflight(monitoringScreenWrapper,
						getRestUrl(isSSLEnabledForMonitoring, componentHealth.getRestURL(), providedEendPointsMap.get(
								MonitoringComponentTypeDetails.L3HttpClientAllowedEndPoint.INFLIGHT_TXN_COUNT.name())));
				break;
			case NET_ID:
				setAllNetworkStatusList(monitoringScreenWrapper,
						getRestUrl(isSSLEnabledForMonitoring, componentHealth.getRestURL(), providedEendPointsMap
								.get(MonitoringComponentTypeDetails.L3HttpClientAllowedEndPoint.NET_ID.name())));
				break;
			case LOGGERS_DETAIL:
				getLoggerAttribute(monitoringScreenWrapper,
						getRestUrl(isSSLEnabledForMonitoring, componentHealth.getRestURL(), providedEendPointsMap.get(
								MonitoringComponentTypeDetails.L3HttpClientAllowedEndPoint.LOGGERS_DETAIL.name())));
				break;
			default:
				break;
			}
		}

		monitoringScreenWrapper.setEnableNetworkDump(Boolean.FALSE);// TODO : hardcoded as no mbean method for
																	// getDumpRequestResponse found
	}

	private void setConfigLoaderMonitoringData(ComponentProfile componentProfile, MonitoringData componentHealth,
			MonitoringScreenWrapper monitoringScreenWrapper) {

		LOGGER.info("inside setConfigLoaderMonitoringData()...");

		setConnectionCount(monitoringScreenWrapper, null);
		isSafeToKill(monitoringScreenWrapper, null); // no end-point, hence setting default value
		setInflight(monitoringScreenWrapper, null);// no end-point, hence setting default value
		setAllNetworkStatusList(monitoringScreenWrapper, null);// no end-point, hence setting default value
		monitoringScreenWrapper.setEnableNetworkDump(Boolean.FALSE);// TODO : hardcoded as no mbean method for
																	// getDumpRequestResponse found
//		ConfigLoaderComponentType s1 = MonitoringComponentTypeDetails.ConfigLoaderComponentType.valueOf(componentProfile.getComponentName());
		// if componentType is CONFIG_LOADER then call ConfigLoaderAllowedEndPoint to
		// get equivalent end points.
		Map<String, String> providedEendPointsMap = componentProfile.getEndpoints();
		ConfigLoaderAllowedEndPoint[] allowedEndPointForConfigLoader = MonitoringComponentTypeDetails.ConfigLoaderAllowedEndPoint
				.values();
		for (ConfigLoaderAllowedEndPoint endpoint : allowedEndPointForConfigLoader) {
			switch (endpoint) {

			case LOGGERS_DETAIL:
				getLoggerAttribute(monitoringScreenWrapper,
						getRestUrl(isSSLEnabledForMonitoring, componentHealth.getRestURL(), providedEendPointsMap.get(
								MonitoringComponentTypeDetails.ConfigLoaderAllowedEndPoint.LOGGERS_DETAIL.name())));
				break;
			default:
				break;
			}
		}

		monitoringScreenWrapper.setEnableNetworkDump(Boolean.FALSE);// TODO : hardcoded as no mbean method for
																	// getDumpRequestResponse found
	}

	private void setHZServerMonitoringData(ComponentProfile componentProfile, MonitoringData componentHealth,
			MonitoringScreenWrapper monitoringScreenWrapper) {

		LOGGER.info("inside setHZServerMonitoringData()...");
		setConnectionCount(monitoringScreenWrapper, null);
		isSafeToKill(monitoringScreenWrapper, null); // no end-point, hence setting default value
		setInflight(monitoringScreenWrapper, null);// no end-point, hence setting default value
		setAllNetworkStatusList(monitoringScreenWrapper, null);// no end-point, hence setting default value
		monitoringScreenWrapper.setEnableNetworkDump(Boolean.FALSE);// TODO : hardcoded as no mbean method for
																	// getDumpRequestResponse found
//		HZServerComponentType s1 = MonitoringComponentTypeDetails.HZServerComponentType.valueOf(componentProfile.getComponentName());
		// if componentType is HZ_SERVER then call HzServerAllowedEndPoint to get
		// equivalent end points.
		Map<String, String> providedEendPointsMap = componentProfile.getEndpoints();
		HzServerAllowedEndPoint[] allowedEndPointForHzServer = MonitoringComponentTypeDetails.HzServerAllowedEndPoint
				.values();
		for (HzServerAllowedEndPoint endpoint : allowedEndPointForHzServer) {
			switch (endpoint) {
			case LOGGERS_DETAIL:
				getLoggerAttribute(monitoringScreenWrapper,
						getRestUrl(isSSLEnabledForMonitoring, componentHealth.getRestURL(), providedEendPointsMap
								.get(MonitoringComponentTypeDetails.HzServerAllowedEndPoint.LOGGERS_DETAIL.name())));
				break;
			default:
				break;
			}
		}

		monitoringScreenWrapper.setEnableNetworkDump(Boolean.FALSE);// TODO : hardcoded as no mbean method for
																	// getDumpRequestResponse found
	}

	private void setL2CoreMonitoringData(ComponentProfile componentProfile, MonitoringData componentHealth,
			MonitoringScreenWrapper monitoringScreenWrapper) {

		LOGGER.info("inside setL2CoreMonitoringData()...");
		setConnectionCount(monitoringScreenWrapper, null);
//		isSafeToKill(monitoringScreenWrapper, null); // no end-point, hence setting default value
		setInflight(monitoringScreenWrapper, null);// no end-point, hence setting default value
		setAllNetworkStatusList(monitoringScreenWrapper, null);// no end-point, hence setting default value
		monitoringScreenWrapper.setEnableNetworkDump(Boolean.FALSE);// TODO : hardcoded as no mbean method for
																	// getDumpRequestResponse found

//		L2CoreComponentType s1 = MonitoringComponentTypeDetails.L2CoreComponentType.valueOf(componentProfile.getComponentName());
		// if componentType isL2_CORE in s1.getS1() then call L2CoreAllowedEndPoint to
		// get equivalent end points.
		Map<String, String> providedEendPointsMap = componentProfile.getEndpoints();
		L2CoreAllowedEndPoint[] allowedEndPointForL2Core = MonitoringComponentTypeDetails.L2CoreAllowedEndPoint
				.values();
		for (L2CoreAllowedEndPoint endpoint : allowedEndPointForL2Core) {
			switch (endpoint) {
			case IS_SAFE_TO_KILL:
				isSafeToKill(monitoringScreenWrapper,
						getRestUrl(isSSLEnabledForMonitoring, componentHealth.getRestURL(), providedEendPointsMap
								.get(MonitoringComponentTypeDetails.L2CoreAllowedEndPoint.IS_SAFE_TO_KILL.name())));
				break;
			case LOGGERS_DETAIL:
				getLoggerAttribute(monitoringScreenWrapper,
						getRestUrl(isSSLEnabledForMonitoring, componentHealth.getRestURL(), providedEendPointsMap
								.get(MonitoringComponentTypeDetails.L2CoreAllowedEndPoint.LOGGERS_DETAIL.name())));
				break;
			default:
				break;
			}
		}

		monitoringScreenWrapper.setEnableNetworkDump(Boolean.FALSE);// TODO : hardcoded as no mbean method for
																	// getDumpRequestResponse found
	}

	private List<MonitoringData> getMonitoringHelthData(List<ComponentProfile> componentProfileList) {

		LOGGER.info("inside getMonitoringHelthData()...");

		ComponentProfile componentProfile = componentProfileList.stream()
				.filter(s -> s.getComponentName().equals("HAZELCAST_SERVER")).findFirst().orElse(null);
		Map<String, String> providedEendPointsMap = componentProfile.getEndpoints();
		String endPoint = providedEendPointsMap
				.get(MonitoringComponentTypeDetails.HzServerAllowedEndPoint.HZ_MONITORING_DATA.name());
		String restUrl = getRestUrl(isSSLEnabledForMonitoring, MONITORING_HELTH_REST_URL, endPoint);
		// LOGGER.info("getMonitoringHelthData() url..{}", restUrl);

		return MonitoringRestServiceHelper.getMonitoringHealthData(restUrl);
	}

	@Override
	public List<ComponentProfile> getComponentProfileMapping() {

		LOGGER.info("inside getComponentProfileMapping()...");

		String restUrl = getRestUrl(isSSLEnabledForMonitoring, MONITORING_HELTH_REST_URL,
				MONITORING_COMPONENT_PROFILE_LOADER_HELTH_REST_URL);
		return MonitoringRestServiceHelper.getComponentProfileMapping(restUrl);
	}

	private void setConnectionCount(MonitoringScreenWrapper monitoringScreenWrapper, String restUrl) {
		if (restUrl != null && !restUrl.contains("null")) {
			Optional<String> response = MonitoringRestServiceHelper.restGetApiResponse(restUrl);
			if (response == null || response.isEmpty() || response.get().contains("\"status\":404")
					|| response.get().contains("\"status\":500"))
				monitoringScreenWrapper.setConnectionCount(0);
			else
				monitoringScreenWrapper.setConnectionCount(Integer.parseInt(response.get()));
		} else {
			monitoringScreenWrapper.setConnectionCount(0);
		}

	}

	private void isSafeToKill(MonitoringScreenWrapper monitoringScreenWrapper, String restUrl) {
		if (restUrl != null && !restUrl.contains("null")) {
			Optional<String> response = MonitoringRestServiceHelper.restGetApiResponse(restUrl);
			if (response == null || response.isEmpty() || response.get().contains("\"status\":404")
					|| response.get().contains("\"status\":500"))
				monitoringScreenWrapper.setSafeToKill(false);
			else
				monitoringScreenWrapper.setSafeToKill(Boolean.parseBoolean(response.get()));
		} else {
			monitoringScreenWrapper.setSafeToKill(false);
		}

	}

	private void setInflight(MonitoringScreenWrapper monitoringScreenWrapper, String restUrl) {
		if (restUrl != null && !restUrl.contains("null")) {
			Optional<String> response = MonitoringRestServiceHelper.restGetApiResponse(restUrl);
			if (response == null || response.isEmpty() || response.get().contains("\"status\":404")
					|| response.get().contains("\"status\":500"))
				monitoringScreenWrapper.setInflight(0);
			else
				monitoringScreenWrapper.setInflight(Float.floatToIntBits(Float.parseFloat(response.get())));

		} else {
			monitoringScreenWrapper.setInflight(0);
		}

	}

	@SuppressWarnings("unchecked")
	private void setAllNetworkStatusList(MonitoringScreenWrapper monitoringScreenWrapper, String restUrl) {
		if (restUrl != null) {
			@SuppressWarnings("rawtypes")
			Optional<Map> response = MonitoringRestServiceHelper.restGetApiResponseMap(restUrl);
			if (response == null || response.isEmpty() || response.get().containsKey("error"))
				// sometime respose may be error json like :
				// {"timestamp":"2024-01-15T12:37:11.319+00:00","status":404,"error":"Not
				// Found","path":"/network-ids"}
				monitoringScreenWrapper.setAllNetworkStatusList(convertNetworkStatusMapToList(null));
			else
				monitoringScreenWrapper.setAllNetworkStatusList(convertNetworkStatusMapToList(response.get()));
		} else {
			monitoringScreenWrapper.setAllNetworkStatusList(convertNetworkStatusMapToList(null));
		}
	}

	private static List<IdAndCodeWrapperString> convertNetworkStatusMapToList(
			Map<Object, Object> networkStatusDetails) {
		List<IdAndCodeWrapperString> list = new ArrayList<>();

		if (networkStatusDetails != null) {
			for (Map.Entry<Object, Object> entry : networkStatusDetails.entrySet()) {
				IdAndCodeWrapperString obj = new IdAndCodeWrapperString();
				obj.setId(entry.getKey().toString());
				obj.setCode(entry.getValue().toString());
				list.add(obj);
			}
		}

		return list;
	}

	private String getRestUrl(Boolean isSecure, String restUrl, String relativePath) {

		String url = null;

		if (restUrl != null && restUrl.contains("http"))
			url = new StringBuilder().append(restUrl).append(relativePath).toString();
		else
			url = new StringBuilder().append((isSecure) ? "https" : "http").append("://").append(restUrl)
					.append(relativePath).toString();

		LOGGER.debug("inside getRestUrl() prepared url..{}", url);

		return url;
	}

	private void getLoggerAttribute(MonitoringScreenWrapper monitoringScreenWrapper, String restUrl) {

		if (restUrl == null || restUrl.contains("null")) {
			defaultLogger(monitoringScreenWrapper); // TODO: commented . need confirm if required or not.
		} else {
			Optional<String> response = MonitoringRestServiceHelper.restGetApiResponse(restUrl);
			if (response == null || response.isEmpty() || response.get().contains("\"status\":404")
					|| response.get().contains("\"status\":500")) {
				defaultLogger(monitoringScreenWrapper);
			} else {
				try {
					JSONObject json = new JSONObject(response.get());
					JSONArray array = (JSONArray) json.get("loggerList");
					Set<String> loggerList = new HashSet<>();
					for (Object object : array) {
						loggerList.add(object.toString());
					}

					monitoringScreenWrapper.setLoggerList(loggerList);
					monitoringScreenWrapper.setLoggerName(json.get("loggerName").toString());
					monitoringScreenWrapper.setLoggerLevel(json.get("loggerLevel").toString());
				} catch (Exception e1) {
					defaultLogger(monitoringScreenWrapper);
					LOGGER.error("Exception occuring while fetching logging attribute rest data for url {}, error {}",
							"/logger", e1);
				}
			}

		}
	}

	private void defaultLogger(MonitoringScreenWrapper monitoringScreenWrapper) {
		Set<String> loggerList = new HashSet<>();

		monitoringScreenWrapper.setLoggerList(loggerList);
		monitoringScreenWrapper.setLoggerName("loggerName");
		monitoringScreenWrapper.setLoggerLevel("loggerLevel");
	}

	@Override
	public String getLoggerLevel(List<ComponentProfile> componentProfileList, String url, String loggerName) {

		ComponentProfile componentProfile = componentProfileList.stream()
				.filter(s -> s.getComponentName().equals("COMMON_API")).findFirst().orElse(null);

		Map<String, String> providedEendPointsMap = componentProfile.getEndpoints();
		String endPoint = providedEendPointsMap
				.get(MonitoringComponentTypeDetails.CommonApiAllowedEndPoint.LOGGERS_GET_LEVEL.toString());
		String restUrl = getRestUrl(isSSLEnabledForMonitoring, url, endPoint.replace("{value1}", loggerName));

		String value = "ERROR";
		if (restUrl != null) {
			Optional<String> response = MonitoringRestServiceHelper.restGetApiResponse(restUrl);
			try {
				if (response.isEmpty() || response.get().contains("\"status\":404")
						|| response.get().contains("\"status\":400") || response.get().contains("\"status\":500")) {
					value = "ERROR";
				} else {
					JSONObject json = new JSONObject(response.get());
					value = (String) json.get("configuredLevel");
				}
			} catch (JSONException e) {
				LOGGER.error("Exception occuring while fetching logging attribute rest data for url {}, error {}",
						"/logger", e.getMessage());
			}
		}
		return value;
	}

	/**
	 * updateLoggerLevel()
	 */
	@Override
	public Boolean updateLoggerLevel(List<ComponentProfile> componentProfileList, String url, String loggerName,
			String loggerLevel) {

		ComponentProfile componentProfile = componentProfileList.stream()
				.filter(s -> s.getComponentName().equals("COMMON_API")).findFirst().orElse(null);

		Map<String, String> providedEendPointsMap = componentProfile.getEndpoints();
		String endPoint = providedEendPointsMap
				.get(MonitoringComponentTypeDetails.CommonApiAllowedEndPoint.LOGGERS_POST_LEVEL.name());
		String restUrl = getRestUrl(isSSLEnabledForMonitoring, url, endPoint.replace("{value1}", loggerName));

		String jsonBody = "{\"configuredLevel\": \"DEBUG\"}";

		if (restUrl != null) {
			Optional<String> response = MonitoringRestServiceHelper.restPostApiResponse(restUrl,
					jsonBody.replace("DEBUG", loggerLevel));
			try {
				if (!response.isEmpty()
						&& (response.get().contains("\"status\":404") || response.get().contains("\"status\":500"))) {
					return Boolean.FALSE;
				} else {
					return Boolean.TRUE;
				}
			} catch (JSONException e) {
				e.printStackTrace();
			}
		}
		return Boolean.TRUE;
	}

	/**
	 * killComponentConnection()
	 */
	@Override
	public Boolean killComponentConnection(List<ComponentProfile> componentProfileList, String url) {
		ComponentProfile componentProfile = componentProfileList.stream()
				.filter(s -> s.getComponentName().equals("COMMON_API")).findFirst().orElse(null);

		Map<String, String> providedEendPointsMap = componentProfile.getEndpoints();
		String endPoint = providedEendPointsMap
				.get(MonitoringComponentTypeDetails.CommonApiAllowedEndPoint.SYS_SHUTDOWN_PROCESSED.toString());
		String restUrl = getRestUrl(isSSLEnabledForMonitoring, url, endPoint);

		if (restUrl != null) {
			Optional<String> response = MonitoringRestServiceHelper.restGetApiResponse(restUrl);
			try {
				if (response == null || response.isEmpty() || response.get().contains("\"status\":404")
						|| response.get().contains("\"status\":500")) {
					return Boolean.FALSE;
				} else {
					return Boolean.TRUE;
				}
			} catch (JSONException e) {
				e.printStackTrace();
			}
		}
		return Boolean.FALSE;
	}

	/**
	 * pauseConsumerConnection()
	 */
	@Override
	public Boolean pauseConsumerConnection(List<ComponentProfile> componentProfileList, String url,
			String componentName) {
		ComponentProfile componentProfile = null;
		String restUrl = null;
		if (componentName.equalsIgnoreCase("HAZELCAST_SERVER")) {
			componentProfile = componentProfileList.stream()
					.filter(s -> s.getComponentName().equals("HAZELCAST_SERVER")).findFirst().orElse(null);
			Map<String, String> providedEendPointsMap = componentProfile.getEndpoints();
			String endPoint = providedEendPointsMap
					.get(MonitoringComponentTypeDetails.HzServerAllowedEndPoint.HZ_SHUTDOWN_INST.toString());
			restUrl = getRestUrl(isSSLEnabledForMonitoring, url, endPoint);
		} else {
			componentProfile = componentProfileList.stream().filter(s -> s.getComponentName().equals("COMMON_API"))
					.findFirst().orElse(null);
			Map<String, String> providedEendPointsMap = componentProfile.getEndpoints();
			String endPoint = providedEendPointsMap
					.get(MonitoringComponentTypeDetails.CommonApiAllowedEndPoint.STOP_CONSUMERS.toString());
			restUrl = getRestUrl(isSSLEnabledForMonitoring, url, endPoint);
		}
		if (restUrl != null) {
			Optional<String> response = MonitoringRestServiceHelper.restGetApiResponse(restUrl);
			try {
				if (response == null || response.get().contains("\"status\":404")
						|| response.get().contains("\"status\":500")) {
					return Boolean.FALSE;
				} else {
					return Boolean.TRUE;
				}
			} catch (JSONException e) {
				e.printStackTrace();
			}
		}
		return Boolean.FALSE;
	}

	/**
	 * startConsumerConnection()
	 */
	@Override
	public Boolean startConsumerConnection(List<ComponentProfile> componentProfileList, String url,
			String componentName) {

		ComponentProfile componentProfile = null;
		String restUrl = null;
		if (componentName.equalsIgnoreCase("HAZELCAST_SERVER")) {
			componentProfile = componentProfileList.stream()
					.filter(s -> s.getComponentName().equals("HAZELCAST_SERVER")).findFirst().orElse(null);
			Map<String, String> providedEendPointsMap = componentProfile.getEndpoints();
			String endPoint = providedEendPointsMap
					.get(MonitoringComponentTypeDetails.HzServerAllowedEndPoint.HZ_NEW_INST.toString());
			restUrl = getRestUrl(isSSLEnabledForMonitoring, url, endPoint);
		} else {
			componentProfile = componentProfileList.stream().filter(s -> s.getComponentName().equals("COMMON_API"))
					.findFirst().orElse(null);

			Map<String, String> providedEendPointsMap = componentProfile.getEndpoints();
			String endPoint = providedEendPointsMap
					.get(MonitoringComponentTypeDetails.CommonApiAllowedEndPoint.START_CONSUMERS.toString());
			restUrl = getRestUrl(isSSLEnabledForMonitoring, url, endPoint);
		}

		if (restUrl != null) {
			Optional<String> response = MonitoringRestServiceHelper.restGetApiResponse(restUrl);
			try {
				if (response == null || response.get().contains("\"status\":404")
						|| response.get().contains("\"status\":500")) {
					return Boolean.FALSE;
				} else {
					return Boolean.TRUE;
				}
			} catch (JSONException e) {
				e.printStackTrace();
			}
		}
		return Boolean.FALSE;
	}

	/**
	 * getNetworkStatus()
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public String getNetworkStatus(List<ComponentProfile> componentProfileList, String url, String connectionName) {

		ComponentProfile componentProfile = componentProfileList.stream()
				.filter(s -> s.getComponentName().equals("COMMON_API")).findFirst().orElse(null);
		Map<String, String> providedEendPointsMap = componentProfile.getEndpoints();
		List<IdAndCodeWrapperString> statusList = new ArrayList<>();
		String restUrl = getRestUrl(isSSLEnabledForMonitoring, url, providedEendPointsMap
				.get(MonitoringComponentTypeDetails.CommonApiAllowedEndPoint.NET_ID.toString()).toString());
		try {
			if (restUrl != null) {
				Optional<Map> response = MonitoringRestServiceHelper.restGetApiResponseMap(restUrl);

				if (response.get().get("status") != null
						&& (Integer.parseInt(response.get().get("status").toString()) != 404
								|| Integer.parseInt(response.get().get("status").toString()) != 500)) {
					return "";
				}
				if (response != null && (!response.isEmpty() || !(response.get().size() == 0))) {
					statusList = convertNetworkStatusMapToList(response.get());
					IdAndCodeWrapperString idAndCodeWrapperString = statusList.stream()
							.filter(s -> s.getId().equals(connectionName)).findFirst().orElse(null);
					return idAndCodeWrapperString == null ? "" : idAndCodeWrapperString.getCode();
				}
			}
		} catch (Exception e) {
			e.printStackTrace();

		}
		return "";
	}
}
