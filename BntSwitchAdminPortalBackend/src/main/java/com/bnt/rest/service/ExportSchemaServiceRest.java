package com.bnt.rest.service;

import java.util.Map;

import com.bnt.common.ResponseWrapper;
import com.bnt.rest.wrapper.dto.ExportRequestWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface ExportSchemaServiceRest {

	ResponseWrapper findAllRecords(Map<String, Object> requestParamMap);

	ResponseWrapper findAllRecordsNew(Map<String, Object> requestParamMap);

	Map<String, String> exportSchema(ExportRequestWrapper exportRequest, String authToken);
}
