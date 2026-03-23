package com.bnt.rest.repository.impl;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import com.bnt.common.util.exception.ExceptionLog;
import com.bnt.rest.entity.CustomBeanConfiguration;
import com.bnt.rest.jpa.repository.CustomBeanConfigurationPersistenceHelper;
import com.bnt.rest.repository.CustomBeanConfigurationRepository;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Component
public class CustomBeanConfigurationRepositoryImpl implements CustomBeanConfigurationRepository {

	private static final Logger LOGGER = LogManager.getLogger(CustomBeanConfigurationRepositoryImpl.class);

	@Autowired
	private CustomBeanConfigurationPersistenceHelper customBeanConfigurationPersistenceHelper;

	@Override
	public CustomBeanConfiguration findCustomBeanConfigurationById(Integer id) {
		return customBeanConfigurationPersistenceHelper.findById(id).orElse(null);
	}

	@Override
	public CustomBeanConfiguration save(CustomBeanConfiguration customBeanConfiguration) {
		try {
			return customBeanConfigurationPersistenceHelper.save(customBeanConfiguration);
		} catch (Exception e) {
			LOGGER.error("Issue in save CustomBeanConfiguration-->");
			LOGGER.error(e.getStackTrace());
			return null;
		}
	}

	@Override
	public Iterable<CustomBeanConfiguration> saveAll(Iterable<CustomBeanConfiguration> customBeanConfigurationList) {
		try {
			// Auto-generated method stub
			return customBeanConfigurationPersistenceHelper.saveAll(customBeanConfigurationList);
		} catch (Exception e) {
			LOGGER.error("Issue in saveAll CustomBeanConfiguration-->");
			LOGGER.error(ExceptionLog.printStackTraceToString(e));
			LOGGER.error(e.getStackTrace());
			return null;
		}
	}

	@Override
	public Page<CustomBeanConfiguration> getPagableCustomBeanConfigurationList(Pageable pageable) {
		return customBeanConfigurationPersistenceHelper.findAll(pageable);
	}

	@Override
	public void deleteById(Integer id) {
		customBeanConfigurationPersistenceHelper.deleteById(id);
	}

	@Override
	public void deleteBeansByComponentTypeByComponentId(String componentType, Integer componentId) {
		customBeanConfigurationPersistenceHelper.deleteBeansByComponentTypeByComponentId(componentType, componentId);
	}

	@Override
	public List<CustomBeanConfiguration> findBeanByComponentTypeByComponentId(String componentType,
			Integer componentId) {
		return customBeanConfigurationPersistenceHelper.findBeanByComponentTypeByComponentId(componentType,
				componentId);
	}
}
