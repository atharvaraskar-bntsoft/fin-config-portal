package com.bnt.service.mapper;

import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import com.bnt.common.RippsAdminException;
import com.bnt.common.util.JsonPathUtil;
import com.bnt.common.util.StringUtil;
import com.bnt.common.util.exception.ExceptionLog;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class SmartFilterQueryMapper {

	private static Log log = LogFactory.getLog(SmartFilterQueryMapper.class);

	private static Map<String, Object> smartFilterQueryJsonData = null;

	public static Map<String, Object> getSmartFilterQueryJsonData() {
		log.info("inside getSmartFilterQueryJsonData");
		String jsonPath = "conf/smart_filter_query.json";
		log.info("EXPIMP_META_JSON_DATA is blank hence going to load from file:" + jsonPath);
		String jsonFilterData = null;
		try {
			Resource resource = new ClassPathResource(jsonPath);
			jsonFilterData = StringUtil.readFileAsString(resource.getFile().getPath());
		} catch (Exception e) {
			log.error(ExceptionLog.printStackTraceToString(e));
		}
		if (StringUtil.isNotNullOrBlank(jsonFilterData)) {
			smartFilterQueryJsonData = JsonPathUtil.getFlatMap(jsonFilterData, true);
		} else {
			log.error("Invalid JSON Data:JSON data is blank for smart query");
			throw new RippsAdminException("Issue in setup: Contact System Admin");
		}
		log.info("completed getSmartFilterQueryJsonData");
		return smartFilterQueryJsonData;
	}

	public static String getQueryByKey(String queryKey) {
		log.info("inside getQueryByKey");
		if (smartFilterQueryJsonData == null) {
			getSmartFilterQueryJsonData();
		}
		return (String) smartFilterQueryJsonData.get(queryKey);
	}
}
