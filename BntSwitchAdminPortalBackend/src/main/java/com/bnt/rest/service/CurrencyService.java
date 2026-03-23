package com.bnt.rest.service;

import java.util.Map;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.util.exception.RippsAdminRestException;
import com.bnt.rest.dto.CurrencyDto;
import com.bnt.rest.entity.Currency;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface CurrencyService {

	public ResponseWrapper findPagedCurrencies(Map<String, Object> requestParamMap) throws RippsAdminRestException;

	public String getCurrencyIsoCodeByCode(String code);

	public Currency findCurrencyById(int id);

	public Map<String, Object> getFilterData();

	Map<String, String> getCurrencyIsoCodeAndCode();

}
