package com.bnt.rest.repository;

import java.util.Map;

import com.bnt.common.ResponseWrapper;
import com.bnt.rest.dto.MerchantCodeMappingDto;
import com.bnt.rest.entity.MerchantCodeMapping;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface MerchantMappingRepository {

	ResponseWrapper findMerchantMapping(Map<String, Object> requestParamMap);

	MerchantCodeMapping findOne(int id);

	void deleteById(int id);

	Integer saveMerchantCodeMapping(MerchantCodeMappingDto mappingDto);

	void updateMerchantCodeMapping(MerchantCodeMapping mapping);
}
