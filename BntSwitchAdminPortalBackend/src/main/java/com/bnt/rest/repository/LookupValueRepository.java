package com.bnt.rest.repository;

import java.util.List;

import com.bnt.rest.entity.LookupValue;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface LookupValueRepository {

	List<LookupValue> getLookUpValueByType(String lookupName);

	Integer getLookUpValueId(String lookupValue);

	LookupValue getLookUpValue(String lookupValue);

	Iterable<LookupValue> getLookUpValueAll();

}
