package com.bnt.service.mapper;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.json.JSONObject;

import com.bnt.common.util.JsonObjectUtil;
import com.bnt.common.util.exception.ExceptionLog;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class NonIsoJsonPacker {

	private NonIsoJsonPacker() {

	}

	private static final Logger logger = LogManager.getLogger(NonIsoJsonPacker.class);

	static JSONObject getJsonFromJsonPackager(String jsonPackager) {
		logger.info("Inside getJsonObjectFromJsonPackager");
		JSONObject jsonObject = null;
		try {
			jsonObject = JsonObjectUtil.getJsonObjectFromString(jsonPackager);
		} catch (Exception e) {
			logger.error(ExceptionLog.printStackTraceToString(e));
		}
//		logger.info("------------------------------------------------------> {}", jsonObject);
		return jsonObject;
	}
}
