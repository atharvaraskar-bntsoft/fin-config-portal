package com.bnt.rest.repository;

import java.util.Map;

import com.bnt.common.ResponseWrapper;
import com.bnt.rest.entity.LookupType;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface LookupTypeRepository {

	ResponseWrapper findAllRecords(Map<String, Object> requestParamMap);

	LookupType getLookupTypeById(int id);

	LookupType getLookupTypeByName(String name);
}
