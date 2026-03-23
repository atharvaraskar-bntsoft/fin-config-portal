package com.bnt.rest.repository;

import java.util.Map;

import com.bnt.common.ResponseWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface ProcessorAdapterRepository {

	ResponseWrapper findAllRecords(Map<String, Object> requestParamMap);

	ResponseWrapper findAllRecords();

	boolean validateName(String name);
}
