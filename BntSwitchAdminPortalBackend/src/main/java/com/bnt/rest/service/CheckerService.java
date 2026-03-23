package com.bnt.rest.service;

import java.util.Map;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.util.exception.AccessDeniedException;
import com.bnt.rest.wrapper.dto.CheckerDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface CheckerService {

	ResponseWrapper getCheckerList(Map<String, Object> requestParamMap, String token) throws AccessDeniedException;

	ResponseWrapper getCount(Map<String, Object> requestParamMap, String token) throws AccessDeniedException;

	ResponseWrapper getNotification(Map<String, Object> requestParamMap, String token) throws AccessDeniedException;

	String getCheckerEnabledEntity(String token, int subMenuFunctionId) throws AccessDeniedException;

	Object updateChecker(String entityName, String entityId, String requestJsontoUpdate, String status);

	boolean updateChecker(CheckerDto checkerDto);

	int addChecker(String entityName, String requestJsontoUpdate);

	String approveChecker(CheckerDto checkerDto);

}
