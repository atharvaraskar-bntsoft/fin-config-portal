package com.bnt.service.mapper;

import java.io.IOException;
import java.io.StringReader;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.Set;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.json.JSONObject;

import com.bnt.common.RippsAdminException;
import com.bnt.common.util.StringUtil;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class SoapPackager {
	private static final Logger logger = LogManager.getLogger(SoapPackager.class);

	private SoapPackager() {
	}

	public static JSONObject getJsonFromSoapPackager(String soapData) {
		JSONObject jsonObject = null;
		if (soapData != null) {
			soapData = soapData.trim();
			if (StringUtil.isNotNullOrBlank(soapData)) {
				jsonObject = processSOAPSchema(soapData);
			}
		}
		return jsonObject;
	}

	public static JSONObject processSOAPSchema(String soapData) {
		JSONObject jsonObject = null;
		try {
			Properties properties = buildProperties(soapData);
			Map<String, String> propMap = readProperties(properties);
			jsonObject = getMapToJson(propMap);
		} catch (IOException e) {
			logger.error(e);
			throw new RippsAdminException("Issue in SOAP tempalte data");
		}
		return jsonObject;
	}

	public static Properties buildProperties(String propertiesFromString) throws IOException {
		Properties properties = new Properties();
		if (!StringUtil.isNotNullOrBlank(propertiesFromString)) {
			return properties;
		}
		properties.load(new StringReader(propertiesFromString));
		return properties;
	}

	public static Map<String, String> readProperties(Properties properties) {
		Map<String, String> propMap = new HashMap<>();
		Set<Object> keySet = properties.keySet();
		String key = "";
		String value = "";
		for (Object object : keySet) {
			key = (String) object;
			value = (String) properties.get(key);
			propMap.put(key, value);
		}
		return propMap;
	}

	public static JSONObject getMapToJson(Map<String, String> propMap) {
		JSONObject jsonObject = null;
		jsonObject = new JSONObject();
		Set<String> keySet = propMap.keySet();
		for (String key : keySet) {
			jsonObject.put(key, propMap.get(key));
		}
		return jsonObject;
	}
}
