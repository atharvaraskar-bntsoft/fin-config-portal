package com.bnt.rest.repository;

import java.util.Map;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.util.exception.RippsAdminRestException;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface CurrencyRepository {

	ResponseWrapper findPagedCurrencies(Map<String, Object> requestParamMap) throws RippsAdminRestException;

	String getCurrencyCodeById(Integer id);

}
