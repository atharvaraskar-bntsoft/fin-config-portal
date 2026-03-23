package com.bnt.service.mapper;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.google.gson.JsonElement;
import com.bnt.common.util.GsonUtil;
import com.bnt.rest.wrapper.dto.adapter.NetworkPropertiesResponseWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class AdapterToolkitNetworkMapper {

	private AdapterToolkitNetworkMapper() {
	}

	private static final Logger logger = LogManager.getLogger(AdapterToolkitNetworkMapper.class);

	public static void parseNetworkPropertiesJson(String properties) {

		try {
			NetworkPropertiesResponseWrapper propertiesWrapper = GsonUtil.getObjectFromString(properties,
					NetworkPropertiesResponseWrapper.class);
			logger.debug("Network Properties Json has been parsed {}", propertiesWrapper);
		}

		catch (Exception e) {
			logger.info("Exception in parsing Network properties Json {}", properties);
		}
	}

	public static NetworkPropertiesTemplate parseNetworkPropertiesTemplateJson(String properties) {
		logger.info("parseNetworkPropertiesTemplateJson");
		NetworkPropertiesTemplate networkPropertiesTemplate = null;
		try {
			networkPropertiesTemplate = GsonUtil.getObjectFromString(properties, NetworkPropertiesTemplate.class);
			logger.debug("Network Properties Json has been parsed {}", networkPropertiesTemplate);
		} catch (Exception e) {
			logger.info("Exception in parsing Network properties Json {}", properties);
		}
		return networkPropertiesTemplate;
	}

	public static NetworkPropertiesResponseWrapper getPropertiesByType(String properties, String adapterType) {
		logger.info("getPropertiesByType with adapterType:{}", adapterType);
		NetworkPropertiesResponseWrapper networkPropertiesResponseWrapper = null;
		try {
			NetworkPropertiesTemplate networkPropertiesTemplate = parseNetworkPropertiesTemplateJson(properties);
			if (networkPropertiesTemplate != null) {
				if (AdapterWrapperDtoMapper.ADAPTR_TYPE_L1.equalsIgnoreCase(adapterType)) {
					networkPropertiesResponseWrapper = networkPropertiesTemplate.getL1configuration();
				} else if (AdapterWrapperDtoMapper.ADAPTR_TYPE_L3.equalsIgnoreCase(adapterType)) {
					networkPropertiesResponseWrapper = networkPropertiesTemplate.getL3configuration();
				}
			}
		} catch (Exception e) {

			logger.error("Issue in loading network-properties from standard-template ", e);
		}
		return networkPropertiesResponseWrapper;
	}

	public static String convertNetworkPropertiesResponseWrapperToString(
			NetworkPropertiesResponseWrapper networkPropertiesResponseWrapper) {
		String properties = "";
		if (networkPropertiesResponseWrapper != null) {
			JsonElement jsonElement = GsonUtil.getJsonObjectFromType(networkPropertiesResponseWrapper, true);
			properties = jsonElement.toString();
		}
		return properties;
	}

	public static String getPropertiesStringByType(String properties, String adapterType) {
		NetworkPropertiesResponseWrapper networkPropertiesResponseWrapper = getPropertiesByType(properties,
				adapterType);
		return convertNetworkPropertiesResponseWrapperToString(networkPropertiesResponseWrapper);
	}
}
