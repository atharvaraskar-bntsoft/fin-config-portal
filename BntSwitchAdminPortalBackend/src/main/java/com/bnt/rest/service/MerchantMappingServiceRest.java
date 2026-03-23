package com.bnt.rest.service;

import java.util.List;
import java.util.Map;

import com.bnt.common.ResponseWrapper;
import com.bnt.rest.dto.MerchantCodeMappingDto;
import com.bnt.rest.entity.MerchantCodeMapping;
import com.bnt.rest.wrapper.dto.IdAndCodeWrapperString;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface MerchantMappingServiceRest {

	ResponseWrapper findPagedMerchantMapping(Map<String, Object> requestParamMap);

	MerchantCodeMapping findMerchantCodeMappingById(int id);

	Integer saveMerchantCodeMapping(MerchantCodeMappingDto mappingDto);

	void updateMerchantCodeMapping(MerchantCodeMappingDto mappingDto, MerchantCodeMapping mapping);

	void deleteById(Integer id);

	void updateStatusMerchantCodeMapping(String active, MerchantCodeMapping mapping);

	Map<String, Object> getFilterData();

	List<IdAndCodeWrapperString> getAllConfigureOptions();

}
