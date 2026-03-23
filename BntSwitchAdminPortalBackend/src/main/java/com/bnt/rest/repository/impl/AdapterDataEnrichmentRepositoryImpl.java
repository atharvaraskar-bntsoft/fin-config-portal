package com.bnt.rest.repository.impl;

import java.util.List;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import org.springframework.stereotype.Component;

import com.bnt.common.util.JPAUtils;
import com.bnt.rest.repository.AdapterDataEnrichmentRepository;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Component
public class AdapterDataEnrichmentRepositoryImpl implements AdapterDataEnrichmentRepository {

	@PersistenceContext
	EntityManager entityManager;

	public <T> List<String> getentityFieldList(Class<T> entity) {
		return JPAUtils.entityFieldList(this.entityManager, entity);
	}
}
