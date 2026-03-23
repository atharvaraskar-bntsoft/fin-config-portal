package com.bnt.rest.service;

import java.util.List;
import java.util.Map;

import com.bnt.rest.dto.DtoWrapper;
import com.bnt.rest.dto.LookupValueDto;
import com.bnt.rest.wrapper.dto.IdAndNameWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface LookupValueService {

	void addUpdateRLookupValue(List<LookupValueDto> lookupValueDtoList, String requestToken, Integer id);

	List<LookupValueDto> findLookupValueById(int lookupTypeid, Map<String, Object> requestParamMap);

	List<IdAndNameWrapper> getServicesList();

	List<String> getTxnTypes();

	List<DtoWrapper> getTagRules();

}
