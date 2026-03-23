package com.bnt.rest.repository;

import java.util.Map;

import org.springframework.data.domain.Pageable;

import com.bnt.common.ResponseWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface SmartFilterRepository {

	ResponseWrapper getQueryDropdown(Map<String, Object> queryParameters, Pageable pageable, String[] filters,
			String queryIdentifier);

}
