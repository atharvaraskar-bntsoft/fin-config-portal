package com.bnt.common.util;

import java.util.Map;
import java.util.Set;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.github.wnameless.json.flattener.FlattenMode;
import com.github.wnameless.json.flattener.JsonFlattener;
import com.jayway.jsonpath.Configuration;
import com.jayway.jsonpath.DocumentContext;
import com.jayway.jsonpath.JsonPath;
import com.jayway.jsonpath.PathNotFoundException;
import com.jayway.jsonpath.spi.json.JacksonJsonNodeJsonProvider;
import com.jayway.jsonpath.spi.mapper.JacksonMappingProvider;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class JsonPathUtil {

	private JsonPathUtil() {
	}

	private static final Logger logger = LogManager.getLogger(JsonPathUtil.class);

	private static final Configuration configuration = Configuration.builder()
			.jsonProvider(new JacksonJsonNodeJsonProvider()).mappingProvider(new JacksonMappingProvider()).build();

	public static String removeFields(String json, Set<String> fields) {
		DocumentContext document = getDocumentContext(json);
		if (!(CollectionUtil.isCollectionEmptyOrNull(fields))) {
			for (String field : fields) {
				try {
					if (!(StringUtil.isEmptyOrNull(field))) {
						document.delete(field);
					}
				} catch (PathNotFoundException e) {
					logger.info("Path Not found for the given field: {} ", field);
				} catch (Exception e) {
					logger.info("error in deleting field {} : {}", field, e.getMessage());
				}
			}
		}
		return document.jsonString();
	}

	public static String renameKey(String json, String parentKeyPath, String oldKeyName, String newKeyName) {

		String jsonPath = "$." + parentKeyPath;

		return JsonPath.using(configuration).parse(json).renameKey(jsonPath.trim(), oldKeyName, newKeyName)
				.jsonString();
	}

	private static DocumentContext getDocumentContext(String json) {
		return JsonPath.parse(json);
	}

	public static Map<String, Object> getFlatMap(String json, boolean processArray) {

		Map<String, Object> flatMap = null;
		if (processArray) {
			flatMap = new JsonFlattener(json).withFlattenMode(FlattenMode.KEEP_ARRAYS).flattenAsMap();
		} else {
			flatMap = new JsonFlattener(json).withFlattenMode(FlattenMode.NORMAL).flattenAsMap();
		}
		if (flatMap != null) {
			// logger.info("Flat Map Key Set : {}", flatMap.keySet());
		}
		return flatMap;
	}
}
