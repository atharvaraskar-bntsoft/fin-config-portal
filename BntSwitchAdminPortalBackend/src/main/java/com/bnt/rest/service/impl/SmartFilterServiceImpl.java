package com.bnt.rest.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.StringUtil;
import com.bnt.constant.ParameterConstant;
import com.bnt.rest.repository.SmartFilterRepository;
import com.bnt.rest.service.SmartFilterService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class SmartFilterServiceImpl implements SmartFilterService {

	@Autowired
	private SmartFilterRepository smartFilterRepository;

	@SuppressWarnings("unchecked")
	@Override
	public ResponseWrapper getQueryDropdown(Map<String, Object> requestParamMap) {
		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		String[] filters = (String[]) requestParamMap.get(ParameterConstant.FILTERS);
		String queryIdentifier = (String) requestParamMap.get(ParameterConstant.SMARTQUERYID);
		Map<String, Object> queryParameters = (Map<String, Object>) requestParamMap
				.get(ParameterConstant.SMARTQUERYPARAMS);
		if (StringUtil.isNotNullOrBlank(queryIdentifier)) {
			return smartFilterRepository.getQueryDropdown(queryParameters, pageable, filters, queryIdentifier);
		} else {
			throw new RippsAdminException("Invalid " + ParameterConstant.SMARTQUERYID);
		}

	}

}
