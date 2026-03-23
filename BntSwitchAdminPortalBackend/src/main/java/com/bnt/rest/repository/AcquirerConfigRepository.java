package com.bnt.rest.repository;

import java.util.Map;

import com.bnt.common.ResponseWrapper;
import com.bnt.rest.entity.AcquirerIdConfig;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface AcquirerConfigRepository {

	ResponseWrapper findAllAcquirer(Map<String, Object> requestParamMap);

	AcquirerIdConfig findOne(int id);

	Integer acquirerIdConfig(AcquirerIdConfig acquirerIdConfigId);

	AcquirerIdConfig findByCode(String code);

}
