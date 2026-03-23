package com.bnt.rest.repository.impl;

import java.util.Map;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.util.SmartFilterQueryUtils;
import com.bnt.rest.repository.SmartFilterRepository;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public class SmartFilterRepositoryImpl implements SmartFilterRepository {

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public ResponseWrapper getQueryDropdown(Map<String, Object> queryParameters, Pageable pageable, String[] filters,
			String queryIdentifier) {
		return SmartFilterQueryUtils.getFilteredDataUsingJsonQuery(entityManager, queryParameters, pageable, filters,
				queryIdentifier);
	}
}
