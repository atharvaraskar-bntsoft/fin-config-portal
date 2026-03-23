package com.bnt.rest.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.bnt.rest.jpa.repository.SubMenuHelper;
import com.bnt.rest.service.SubMenuFunctionService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class SubMenuFunctionServiceImpl implements SubMenuFunctionService {

	@Autowired
	private SubMenuHelper subMenuJpaHelper;

	/*
	 * Get Sub menu Id based on URL
	 */
	@Override
	@Cacheable("urls")
	public Integer getSubMenuIdByUrl(String requestUrl) {
		List<Object[]> list = subMenuJpaHelper.findEntityMappingData();
		for (Object[] each : list) {
			if (requestUrl.equals(each[2])) {
				return (Integer) each[0];
			}
		}
		return 0;
	}

}
