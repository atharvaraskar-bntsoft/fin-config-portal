package com.bnt.service.mapper;

import java.util.LinkedList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.bnt.rest.wrapper.dto.KeyValueTypeWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class DeployedRouterMapper {

	private DeployedRouterMapper() {
	}

	private static final Logger logger = LogManager.getLogger(DeployedRouterMapper.class);

	public static String getRoutingRuleDataFromMBean(String jmxUrl, String objectType) {

		return null;
	}

	public static List<KeyValueTypeWrapper> parseRouterResponse(List<KeyValueTypeWrapper> responseList,
			String inputData, String type) {
		logger.info("Something went wrong: {} ", type);

		if (inputData != null) {
			if (responseList == null) {
				responseList = new LinkedList<>();
			}
			Pattern keyPattern = Pattern.compile("\\{key:");
			Matcher keyMatcher = keyPattern.matcher(inputData);
			KeyValueTypeWrapper keyValueTypeWrapper = null;
			String key = "";
			String value = "";
			int keyBeginIndex;
			int keyEndIndex;
			int valueBeginIndex;
			int valueEndIndex;
			String valueInputData;

			while (keyMatcher.find()) {

				keyBeginIndex = keyMatcher.end();
				try {
					keyEndIndex = inputData.indexOf(",", keyBeginIndex);

					key = inputData.substring(keyBeginIndex, keyEndIndex);
					logger.info("key: {}.", key);
					keyValueTypeWrapper = new KeyValueTypeWrapper();
					keyValueTypeWrapper.setKey(key);
					keyValueTypeWrapper.setType(type);

					// Set value now
					valueInputData = inputData.substring(keyEndIndex);

					valueBeginIndex = valueInputData.indexOf("value:") + 6;
					valueEndIndex = valueInputData.indexOf("}");
					value = valueInputData.substring(valueBeginIndex, valueEndIndex);
					value = value.replaceAll("import com.bnt.bswitch.route.RouteRuleParam;", "");
					logger.info("value:  {}.", value);

					keyValueTypeWrapper.setValue(value);
				} catch (Exception e) {
					logger.error("Error in parsing  deployed rule for type : {} key {}:", type, key);
				}
				responseList.add(keyValueTypeWrapper);
			}
		}
		return responseList;
	}
}
