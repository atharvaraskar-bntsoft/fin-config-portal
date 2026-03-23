package com.bnt.rest.repository.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import com.bnt.rest.entity.SystemBeanConfiguration;
import com.bnt.rest.jpa.repository.SystemBeanConfigurationPersistenceHelper;
import com.bnt.rest.repository.SystemBeanConfigurationRepository;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Component
public class SystemBeanConfigurationRepositoryImpl implements SystemBeanConfigurationRepository {

	@Autowired
	private SystemBeanConfigurationPersistenceHelper systemBeanConfigurationPersistenceHelper;

	@Override
	public SystemBeanConfiguration findSystemBeanConfigurationById(Integer id) {
		return systemBeanConfigurationPersistenceHelper.findById(id).orElse(null);
	}

	@Override
	public SystemBeanConfiguration save(SystemBeanConfiguration systemBeanConfiguration) {
		return systemBeanConfigurationPersistenceHelper.save(systemBeanConfiguration);
	}

	@Override
	public Page<SystemBeanConfiguration> getPagableSystemBeanConfigurationList(Pageable pageable) {
		return systemBeanConfigurationPersistenceHelper.findAll(pageable);
	}

	@Override
	public void deleteById(Integer id) {
		systemBeanConfigurationPersistenceHelper.deleteById(id);
	}

	@Override
	public List<SystemBeanConfiguration> findBeanByComponentTypeByMaxVersion(String componentType) {
		return systemBeanConfigurationPersistenceHelper.findBeanByComponentTypeByMaxVersion(componentType);
	}

	@Override
	public List<SystemBeanConfiguration> findBeanByComponentTypeByVersion(String componentType, Integer version) {
		return systemBeanConfigurationPersistenceHelper.findBeanByComponentTypeByVersion(componentType, version);
	}
}
