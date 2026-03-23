package com.bnt.rest.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.util.RippsUtility;
import com.bnt.common.util.exception.RippsAdminRestException;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.CurrencyDto;
import com.bnt.rest.entity.Currency;
import com.bnt.rest.jpa.repository.CurrencyPersistenceHelper;
import com.bnt.rest.repository.CurrencyRepository;
import com.bnt.rest.service.CurrencyService;
import com.bnt.service.mapper.ListMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class CurrencyServiceImpl implements CurrencyService {

	@Autowired
	private CurrencyRepository currencyRepository;

	@Autowired
	private CurrencyPersistenceHelper currencyPersistenceHelper;

	@Override
	public ResponseWrapper findPagedCurrencies(Map<String, Object> requestParamMap) throws RippsAdminRestException {
		return currencyRepository.findPagedCurrencies(requestParamMap);
	}

	@Override
	public String getCurrencyIsoCodeByCode(String code) {
		Currency currency = currencyPersistenceHelper.findCurrencyByCode(code);
		return currency.getIsoCode();
	}

	@Override
	public Currency findCurrencyById(int id) {
		Optional<Currency> optCurrency = currencyPersistenceHelper.findById(id);
		if (optCurrency.isPresent()) {
			return optCurrency.get();
		}
		return null;
	}

	@Override
	public Map<String, Object> getFilterData() {
		Map<String, Object> map = new HashMap<>();
		map.put("status", ListMapper.getStatus());

		return map;
	}

	@Override
	public Map<String, String> getCurrencyIsoCodeAndCode() {
		Map<String, String> map = new HashMap<>();
		List<Object[]> currencyMap = currencyPersistenceHelper.findCurrencyByIsoCodeAndCode();
		for (Object[] currency : currencyMap) {
			map.put(currency[0].toString(), currency[1].toString());
		}
		return map;
	}

}
