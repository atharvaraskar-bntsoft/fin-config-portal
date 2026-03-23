package com.bnt.common.util;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.ResourceBundle;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ResourceBundleToMap {

	private ResourceBundleToMap() {
	}

	/**
	 * Convert ResourceBundle into a Map object.
	 *
	 * @param resource a resource bundle to convert.
	 * @return Map a map version of the resource bundle.
	 */
	public static Map<String, String> convertResourceBundleToMap(ResourceBundle resource) {
		Map<String, String> map = new HashMap<>();
		Enumeration<String> keys = resource.getKeys();
		while (keys.hasMoreElements()) {
			String key = keys.nextElement();
			map.put(key, resource.getString(key));
		}
		return map;
	}
}
