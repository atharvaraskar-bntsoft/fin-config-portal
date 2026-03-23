package com.bnt.rest.service;

import java.util.Map;

import com.bnt.common.ResponseWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface HolidayCalenderService {

	ResponseWrapper findAllHolidayList(Map<String, Object> requestParamMap);
}
