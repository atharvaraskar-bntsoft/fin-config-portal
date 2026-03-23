package com.bnt.rest.service;

import java.util.Map;

import com.bnt.common.ResponseWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface HistoryServiceRest {

	ResponseWrapper getHistory(Map<String, Object> requestParamMap);

}
