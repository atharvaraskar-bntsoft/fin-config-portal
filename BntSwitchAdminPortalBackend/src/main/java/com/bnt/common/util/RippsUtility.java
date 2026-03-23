package com.bnt.common.util;

import java.security.SecureRandom;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.google.gson.Gson;
import com.bnt.common.ResponseEntityData;
import com.bnt.common.ResponseWrapper;
import com.bnt.constant.ParameterConstant;
import com.bnt.rest.dto.IdAndNameStringWrapper;
import com.bnt.rest.entity.AuditEntity;
import com.bnt.rest.wrapper.dto.IdAndNameWrapper;

import jakarta.servlet.http.HttpServletRequest;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class RippsUtility {

	private static final Logger log = LogManager.getLogger(RippsUtility.class.getName());

	private static final String ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	private static final Random RANDOM = new SecureRandom();

	private RippsUtility() {

	}

	public static Map<String, Object> setResponseEntityData(String status, String message, Object data) {
		log.info("inside setResponseEntityData()..");
		Map<String, Object> maps = new LinkedHashMap<>();
		maps.put("status", status);
		maps.put("message", message);
		maps.put("data", data);

		return maps;
	}

	public static <T> boolean isNotNull(T value) {
		return Optional.ofNullable(value).isPresent();
	}

	public static Map<String, Object> setResponseEntityData(ResponseEntityData responseEntityData) {
		Map<String, Object> maps = new LinkedHashMap<>();
		maps.put("status", responseEntityData.getStatus());
		maps.put("message", responseEntityData.getMessage());
		maps.put("data", responseEntityData.getData());

		return maps;
	}

	public static String convertListToStringWithComma(List<IdAndNameWrapper> list) {
		return list.stream().map(id -> id.getId().toString()).collect(Collectors.joining(","));
	}

	public static Timestamp getCurrentTime() {
		Calendar calendar = Calendar.getInstance();
		return new java.sql.Timestamp(calendar.getTime().getTime());
	}

	public static Map<String, Object> getMapData(String key, Object value) {
		Map<String, Object> map = new HashMap<>();
		map.put(key, value);
		return map;
	}

	public static String nextCodeLeftPad(String nextCode, int lengh, Character padChar) {
		return org.apache.commons.lang.StringUtils.leftPad(nextCode, lengh, padChar);
	}

	public static Timestamp getCurrentTimeStamp() {
		return new Timestamp(new Date().getTime());
	}

	public static Character convertBooleanToChar(boolean source) {
		if (source) {
			return '1';
		} else {
			return '0';
		}
	}

	public static Character convertBooleanToCharZeroOne(boolean source) {
		if (source) {
			return '1';
		} else {
			return '0';
		}
	}

	public static Character convertBooleanToCharUser(boolean source) {
		if (source) {
			return '0';
		} else {
			return '1';
		}
	}

	public static boolean convertCharToBooleanUser(Character source) {
		return (source == '1');
	}

	public static boolean convertActiveToBoolean(Character source) {
		return (source == '1');
	}

	public static Character convertBooleanToActive(boolean active) {
		if (active) {
			return '1';
		} else {
			return '0';
		}
	}

	public static String getToken(HttpServletRequest request) {
		return request.getHeader("X-Auth-Token");
	}

	public static Map<String, Object> setPageJPAData(ResponseWrapper pageJPAData) {
		if (pageJPAData == null) {
			return new HashMap<>();
		}
		Map<String, Object> data = new HashMap<>();
		data.put(ParameterConstant.PAGE_NO, pageJPAData.getPageNo());
		data.put(ParameterConstant.TOTAL_RECORD, pageJPAData.getTotalRecords());
		data.put(ParameterConstant.TOTAL_FILTERED_RECORD, pageJPAData.getTotalFilterRecords());
		return data;
	}

	public static IdAndNameStringWrapper getWrapper(String id, String value) {
		IdAndNameStringWrapper wrapper = new IdAndNameStringWrapper();
		wrapper.setId(id);
		wrapper.setName(value);
		return wrapper;
	}

	public static String getJson(Object s) {
		Gson gson = new Gson();
		return gson.toJson(s);
	}

	public static String getJsonObject(Object s) {
		Gson gson = new Gson();
		String json = "";
		ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
		try {
			json = ow.writeValueAsString(s);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
//		return gson.toJson(s);
		return json;
	}

	public static String getAuthorIdentifier(Integer id) {
		String authorId = "";
		if (id != null) {
			authorId = id + "_" + RippsUtility.getCurrentTimeStamp().getTime();
		} else {
			authorId = "" + RippsUtility.getCurrentTimeStamp().getTime();
		}
		return StringUtil.removeWhiteSpaces(authorId);
	}

	public static Integer fetchNextIntCode(List<String> listCodes) {
		Integer max = 0;
		if (listCodes != null && !listCodes.isEmpty()) {
			max = listCodes.parallelStream().filter(s -> s.matches("[0-9]+")).map(Integer::valueOf)
					.mapToInt(value -> value).max().orElse(0);
		}
		return max + 1;
	}

	static List<String> getNonExportableUriList() {
		List<String> list = new ArrayList<>();
		list.add("import-group");
		return list;
	}

	public static void setUpdated(AuditEntity auditEntity, Integer authorId) {
		auditEntity.setUpdatedOn(RippsUtility.getCurrentTime());
		auditEntity.setUpdatedBy(authorId);
	}

	public static void setCreated(AuditEntity auditEntity, Integer authorId) {
		auditEntity.setCreatedOn(RippsUtility.getCurrentTime());
		auditEntity.setCreatedBy(authorId);
	}

	public static Integer getVersion(Integer currentVersion) {
		if (currentVersion == null) {
			return 0;
		} else {
			return currentVersion + 1;
		}
	}

	public static String getCurrentDate(String datFormat) {
		Date date = new Date();
		SimpleDateFormat formatter = new SimpleDateFormat(datFormat);
		return formatter.format(date);
	}

	public static List<String> getKeyCloakRole(HttpServletRequest request, String rolePrefix) {
		String role = request.getHeader("kcrole");

		List<String> rolesList = Stream.of(role.split(",")).filter(value -> value.contains(rolePrefix))
				.map(value -> value.substring(rolePrefix.length() + 1, value.length())).collect(Collectors.toList());

		if (role.contains("BNT-CLOUD-ADMIN") && !(rolesList.contains("ADMIN"))) {
			rolesList.add("ADMIN");
		}
		return rolesList;
	}

	public static Timestamp convertStringToTimestamp1(String time) {
		Timestamp dd = new Timestamp(Long.parseLong(time + "000"));
		return dd;
	}

	public static int differenceTimeStamp(Timestamp t1, Timestamp t2) {
		long milliseconds = t1.getTime() - t2.getTime();
		int seconds = (int) milliseconds / 1000;
		int minutes = (seconds % 3600) / 60;
		seconds = (seconds % 3600) % 60;

		if (minutes == 0 && seconds > -60) {
			return 1;
		}
		int b3 = t1.compareTo(t2);
		if (b3 == 0) {
			return 2;
		} else if (b3 > 0) {
			return 2;
		}
		return 0;
	}

	public static boolean compareTimeStamp(Timestamp t1, Timestamp t2) {
		int b3 = t1.compareTo(t2);
		if (b3 == 0) {
			return true;
		} else if (b3 > 0) {
			return true;
		} else {
			return false;
		}
	}
}
