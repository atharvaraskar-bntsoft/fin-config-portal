package com.bnt.rest.repository.impl;

import java.util.List;
import java.util.Optional;

import jakarta.persistence.EntityManager;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import com.bnt.common.RippsAdminException;
import com.bnt.common.util.JPACriteriaUtils;
import com.bnt.common.util.exception.ExceptionLog;
import com.bnt.rest.entity.Adapter;
import com.bnt.rest.entity.CoreProperties;
import com.bnt.rest.jpa.repository.AdapterPersistenceHelper;
import com.bnt.rest.jpa.repository.CorePropertiesHelper;
import com.bnt.rest.repository.AdapterRepository;
import com.bnt.rest.repository.CorePropertiesRepository;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Component
public class CorePropertiesRepositoryImpl implements CorePropertiesRepository {

	private static final Logger LOGGER = LogManager.getLogger(CorePropertiesRepositoryImpl.class);

	@Autowired
	private CorePropertiesHelper corePropertiesHelper;

	@Autowired
	private EntityManager entityManager;

	@Override
	public CoreProperties findCorePropertiesById(Integer id) {
		return corePropertiesHelper.findById(id)
				.orElseThrow(() -> new RippsAdminException("Core Properties Data not found"));
	}

	@Override
	public CoreProperties save(CoreProperties coreProperties) {
		try {
			return corePropertiesHelper.save(coreProperties);
		} catch (Exception e) {
			LOGGER.error("Issue in saving CoreProperties--> {}", ExceptionLog.printStackTraceToString(e));
			return null;
		}
	}

	@Override
	public CoreProperties findCorePropertiesByName(String name) {
		return corePropertiesHelper.findCorePropertiesByName(name);
	}

	@Override
	public boolean validateName(String name) {
		return JPACriteriaUtils.validateName(entityManager, CoreProperties.class, name, "name");
	}

	@Override
	public void deleteById(Integer id) {
		corePropertiesHelper.deleteById(id);
	}
}
