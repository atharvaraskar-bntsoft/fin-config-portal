package com.bnt.rest.service;

import java.util.List;
import java.util.Map;

import com.bnt.common.ResponseWrapper;
import com.bnt.rest.dto.DtoWrapper;
import com.bnt.rest.dto.MerchantDto;
import com.bnt.rest.entity.Merchant;
import com.bnt.rest.wrapper.dto.AddressWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface MerchantServiceRest {

	ResponseWrapper findAllMerchants(Map<String, Object> requestParamMap);

	Merchant findMerchantById(int id);

	ResponseWrapper findAllMerchants();

	List<DtoWrapper> getCategoryCode();

	List<AddressWrapper> getAddressList();

	MerchantDto findMerchantDtoById(int id);

	Map<String, Object> getFilterData();

	List<DtoWrapper> getMerchantByIntitutionId(int id);

	String findMerchantNameByCode(String code);

	String getCodeByMerchantInstitution(Integer merchantInstitutionId);
}
