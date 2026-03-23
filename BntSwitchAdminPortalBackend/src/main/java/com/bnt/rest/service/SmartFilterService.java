package com.bnt.rest.service;

import java.util.Map;

import com.bnt.common.ResponseWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface SmartFilterService {

	ResponseWrapper getQueryDropdown(Map<String, Object> requestParamMap);

}
