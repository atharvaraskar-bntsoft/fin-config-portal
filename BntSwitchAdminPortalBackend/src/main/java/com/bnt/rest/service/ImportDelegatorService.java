package com.bnt.rest.service;

import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;

import org.json.JSONArray;
import org.json.JSONObject;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface ImportDelegatorService {

	Integer customImportEntityData(JSONArray entityList, String key, HttpServletRequest request,
			Map<String, Object> zipMap);

	Integer genericImportEntityData(JSONArray entityList, String key, HttpServletRequest request,
			Map<String, Object> zipMap);

	Integer customImportEntityDataConfirmation(JSONObject confirmationValue, HttpServletRequest request);

}
