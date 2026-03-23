package com.bnt.rest.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.bnt.rest.entity.SystemBeanConfiguration;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface SystemBeanConfigurationRepository {

	public SystemBeanConfiguration findSystemBeanConfigurationById(Integer id);

	public SystemBeanConfiguration save(SystemBeanConfiguration systemBeanConfiguration);

	public Page<SystemBeanConfiguration> getPagableSystemBeanConfigurationList(Pageable pageable);

	public void deleteById(Integer id);

	public List<SystemBeanConfiguration> findBeanByComponentTypeByMaxVersion(String componentType);

	public List<SystemBeanConfiguration> findBeanByComponentTypeByVersion(String componentType, Integer version);

}
