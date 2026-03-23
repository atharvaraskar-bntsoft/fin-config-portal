package com.bnt.rest.repository.impl;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;

import com.bnt.common.util.JPACriteriaUtils;
import com.bnt.rest.entity.SwitchCluster;
import com.bnt.rest.repository.SwitchClusterRepository;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public class SwitchClusterRepositoryImpl implements SwitchClusterRepository {

	@PersistenceContext
	public EntityManager entityManager;

	@Override
	public boolean validateName(String name) {
		return JPACriteriaUtils.validateName(entityManager, SwitchCluster.class, name, "data_centre");
	}
}
