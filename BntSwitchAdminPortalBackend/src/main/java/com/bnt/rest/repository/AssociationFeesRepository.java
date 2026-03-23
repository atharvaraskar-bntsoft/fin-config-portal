package com.bnt.rest.repository;

import java.util.Map;

import com.bnt.common.ResponseWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface AssociationFeesRepository {

	ResponseWrapper getAllFeesRecords(Map<String, Object> requestParamMap);

}
