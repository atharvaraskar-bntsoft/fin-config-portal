package com.bnt.rest.service;

import java.util.Map;

import com.bnt.common.ResponseWrapper;
import com.bnt.rest.entity.LookupType;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface LookupTypeService {

	ResponseWrapper findAllRecords(Map<String, Object> requestParamMap);

	LookupType getLookupTypeById(int id);

	LookupType getLookupTypeByName(String name);

}
