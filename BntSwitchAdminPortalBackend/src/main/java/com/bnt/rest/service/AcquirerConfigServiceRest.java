package com.bnt.rest.service;

import java.util.List;
import java.util.Map;

import com.bnt.common.ResponseWrapper;
import com.bnt.rest.dto.AcquirerIdConfigDto;
import com.bnt.rest.dto.NameAndCodeWrapper;
import com.bnt.rest.entity.AcquirerIdConfig;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface AcquirerConfigServiceRest {

	ResponseWrapper findAllAcquirer(Map<String, Object> requestParamMap);

	public List<NameAndCodeWrapper> getAcqConfList();

	AcquirerIdConfig findAcquirerIdConfig(int id);

	AcquirerIdConfigDto findAcquirerIdConfigDto(int id);
}
