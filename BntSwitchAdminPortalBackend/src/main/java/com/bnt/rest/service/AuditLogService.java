package com.bnt.rest.service;

import java.util.Map;

import com.bnt.common.ResponseWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface AuditLogService {

	ResponseWrapper findAllAuditLogs(Map<String, Object> requestParamMap);

	Map<String, Object> getFilterData();

}
