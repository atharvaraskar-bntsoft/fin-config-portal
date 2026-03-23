package com.bnt.rest.repository;

import java.util.Map;

import com.bnt.common.ResponseWrapper;
import com.bnt.rest.dto.AcquirerMappingDto;
import com.bnt.rest.entity.AcquirerMapping;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface AcquirerMappingServiceRest {

	AcquirerMappingDto findAcquirerMappingById(int id);

	ResponseWrapper getAcquirerMappingList(Map<String, Object> requestParamMap);

	Integer addAcquirerMapping(AcquirerMappingDto acquirerMappingDto, String requestToken);

	AcquirerMapping getAcquirerMappingById(int id);

	Integer updateAcquirerMapping(AcquirerMappingDto acquirerMappingDto, Integer id, String requestToken);

	void deleteAcquirerMappingById(Integer id);

}
