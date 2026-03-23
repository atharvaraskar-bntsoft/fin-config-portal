package com.bnt.common;

import static com.bnt.constant.ParameterConstant.DEFAULT_PAGE_NO;
import static com.bnt.constant.ParameterConstant.DEFAULT_PAGE_SIZE;
import static com.bnt.constant.ParameterConstant.DEFAULT_SORT_ORDER;
import static com.bnt.constant.ParameterConstant.FILTERS;
import static com.bnt.constant.ParameterConstant.PAGE_NO;
import static com.bnt.constant.ParameterConstant.PAGE_SIZE;
import static com.bnt.constant.ParameterConstant.SEARCH;
import static com.bnt.constant.ParameterConstant.SORT_COLUMN;
import static com.bnt.constant.ParameterConstant.SORT_ORDER;

import java.util.HashMap;
import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.servlet.HandlerMapping;

import com.bnt.common.util.RippsUtility;
import com.bnt.constant.Constants;
import com.bnt.constant.HttpConstants;
import com.bnt.constant.ParameterConstant;
import com.bnt.constant.RippsRestConstant;

/**************************
 * @author vaibhav.shejol *
 **************************/

public final class HttpCommons {

	private HttpCommons() {
	}

	public static Map<String, Object> createRequestParamMap(HttpServletRequest req) {
		Map<String, Object> requestParamMap = new HashMap<>();

		// try to replace null with blank string and check at repo layer
		requestParamMap.put(ParameterConstant.PAGE_NO, getProcessedParamValFromReq(req, PAGE_NO, DEFAULT_PAGE_NO));
		requestParamMap.put(SORT_ORDER, getProcessedParamValFromReq(req, SORT_ORDER, DEFAULT_SORT_ORDER));
		requestParamMap.put(SORT_COLUMN, getProcessedParamValFromReq(req, SORT_COLUMN, null));
		requestParamMap.put(PAGE_SIZE, getProcessedParamValFromReq(req, PAGE_SIZE, DEFAULT_PAGE_SIZE));
		requestParamMap.put(SEARCH, getProcessedParamValFromReq(req, SEARCH, null));
		requestParamMap.put(FILTERS, getFilterArray(getProcessedParamValFromReq(req, FILTERS, null)));
		return requestParamMap;
	}

	public static Map<String, Object> createSmartFilterRequestParamMap(HttpServletRequest req) {
		Map<String, Object> requestParamMap = createRequestParamMap(req);
		requestParamMap.put(ParameterConstant.SMARTQUERYID,
				getProcessedParamValFromReq(req, ParameterConstant.SMARTQUERYID, null));
		requestParamMap.put(ParameterConstant.SMARTQUERYPARAMS, getParameterFilterMap(
				getFilterArray(getProcessedParamValFromReq(req, ParameterConstant.SMARTQUERYPARAMS, null))));
		return requestParamMap;
	}

	/**
	 * gets the value of given param from request and does a null & empty check to
	 * replace with default value
	 */
	private static String getProcessedParamValFromReq(HttpServletRequest request, String paramString, String defaultValue) {
		String paramValue = request.getParameter(paramString);
		paramValue = (paramValue != null && !(paramValue.isEmpty())) ? paramValue : defaultValue;
		return paramValue;
	}

	public static Map<String, String> getParameterFilterMap(String[] filters) {
		Map<String, String> map = new HashMap<>();
		if (filters != null) {
			for (String filter : filters) {
				String[] filterValue = filter.split(":");
				map.put(filterValue[0], filterValue[1]);
			}
		}
		return map;
	}

	private static String[] getFilterArray(String filtersParam) {
		String[] filterArray = null;
		if (filtersParam != null) {
			filterArray = filtersParam.split(",");
		}
		return filterArray;
	}

	public static ResponseEntity<Map<String, Object>> setResponseEntityPageData(ResponseWrapper responsePage, String objectName, String successMessage, String errorMessage) {
		if (responsePage == null || responsePage.getContent() == null) {
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, errorMessage, ""), HttpStatus.OK);
		}
		if (objectName == null) {
			objectName = "responseList";
		}
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		Map<String, Object> data = RippsUtility.setPageJPAData(responsePage);
		data.put(objectName, responsePage.getContent());
		responseEntityData.setData(data);
		responseEntityData.setMessage(successMessage);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	public static ResponseEntity<Map<String, Object>> setResponseEntityData(Object data, String successMessage, String errorMessage) {
		if (data == null) {
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, errorMessage, ""), HttpStatus.NOT_FOUND);
		}
		ResponseEntityData responseEntityData = createSuccessResponse(data, successMessage);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	public static ResponseEntity<Map<String, Object>> setResponseEntityData(Object data, String successMessage) {
		ResponseEntityData responseEntityData = createSuccessResponse(data, successMessage);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	private static ResponseEntityData createSuccessResponse(Object data, String successMessage) {
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage(successMessage);
		responseEntityData.setData(data);
		return responseEntityData;
	}

	public static ResponseEntity<ResponseEntityData> setResponseEntityPageDataObject(Object data, String successMessage, String errorMessage) {
		ResponseEntityData responseEntityData = new ResponseEntityData();
		if (data == null) {
			responseEntityData.setStatus(RippsRestConstant.FAILURE);
			responseEntityData.setMessage(errorMessage);
			responseEntityData.setData("");
			return new ResponseEntity<>(responseEntityData, HttpStatus.OK);
		}
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage(successMessage);
		responseEntityData.setData(data);
		return new ResponseEntity<>(responseEntityData, HttpStatus.OK);
	}

	public static ResponseEntity<ResponseEntityData> setResponseEntityForPost(String message, boolean isSuccess) {
		ResponseEntityData responseEntityData = new ResponseEntityData();
		if (!isSuccess) {
			responseEntityData.setStatus(RippsRestConstant.FAILURE);
		} else {
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		}
		responseEntityData.setData("");
		responseEntityData.setMessage(message);
		return new ResponseEntity<>(responseEntityData, HttpStatus.OK);
	}

	public static ResponseEntity<ResponseEntityData> setResponseEntityForPost(Map<String, String> statusMap) {
		ResponseEntityData responseEntityData = new ResponseEntityData();
		if (statusMap.get(Constants.ERROR) != null) {
			responseEntityData.setStatus(RippsRestConstant.FAILURE);
			responseEntityData.setMessage(statusMap.get(Constants.ERROR));
		} else {
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage(statusMap.get(Constants.SUCCESS));
		}
		responseEntityData.setData("");
		return new ResponseEntity<>(responseEntityData, HttpStatus.OK);

	}

	public static String getClientIP(HttpServletRequest request) {
		String remoteAddr = "";
		if (request != null) {
			/*
			 * get the client IP address via the HTTP request header X-Forwarded-For (XFF).
			 * For web application which is behind a proxy server, load balancer or the
			 * popular Cloudflare solution
			 */
			remoteAddr = request.getHeader("X-FORWARDED-FOR");
			if (remoteAddr == null || "".equals(remoteAddr)) {
				remoteAddr = request.getRemoteAddr();
			}
		}
		return remoteAddr;
	}

	@SuppressWarnings("unchecked")
	public static String getPathParamValue(HttpServletRequest request, String pathParam) {
		Map<String, String> map = (Map<String, String>) request
				.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
		return map.get(pathParam);
	}

	public static boolean isCheckerSupportedOperation(String requestMethod) {
		return isPostOrPUTOperation(requestMethod);
	}

	public static boolean isPostOrPUTOperation(String requestMethod) {
		return isPostOperation(requestMethod) || isPutOperation(requestMethod);
	}

	private static boolean isPostOperation(String requestMethod) {
		return (requestMethod.equals(HttpConstants.POST));
	}

	private static boolean isPutOperation(String requestMethod) {
		return (requestMethod.equals(HttpConstants.PUT));
	}
}
