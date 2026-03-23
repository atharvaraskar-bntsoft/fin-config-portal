package com.bnt.rest.service;

import java.util.List;
import java.util.Map;

import com.bnt.common.ResponseWrapper;
import com.bnt.rest.entity.MerchantInstitution;
import com.bnt.rest.wrapper.dto.AddressWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface MerchantInstitutionService {

	ResponseWrapper getMerchantInstitutionList(Map<String, Object> requestParamMap);

	public MerchantInstitution findInstitutionById(int id);

	List<AddressWrapper> getAddressList();

	Map<String, Object> getFilterData();
}
