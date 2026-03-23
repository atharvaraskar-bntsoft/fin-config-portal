package com.bnt.rest.service;

import java.util.Map;

import com.bnt.common.ResponseWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface TransactionTypeService {

	ResponseWrapper findAllRecords(Map<String, Object> requestParamMap);

	ResponseWrapper findAllRecords();
}
