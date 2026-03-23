package com.bnt.common.util;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class DatabaseUtil {

	private DatabaseUtil() {
	}

	public static Map<String, String> getDatabaseProperties(String connectionUrl) {
		Map<String, String> hashMap = new HashMap<>();

		String cleanURI = connectionUrl.substring(5);
		URI uri = URI.create(cleanURI);

		hashMap.put("DBMS", uri.getScheme());
		hashMap.put("IP", uri.getHost());
		hashMap.put("Port", String.valueOf(uri.getPort()));
		hashMap.put("Schema", uri.getPath().substring(1));
		return hashMap;
	}
}
