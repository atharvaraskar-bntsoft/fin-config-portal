package com.bnt.rest.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.bnt.rest.entity.CustomBeanConfiguration;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface CustomBeanConfigurationRepository {

	public CustomBeanConfiguration findCustomBeanConfigurationById(Integer id);

	public CustomBeanConfiguration save(CustomBeanConfiguration customBeanConfiguration);

	public Page<CustomBeanConfiguration> getPagableCustomBeanConfigurationList(Pageable pageable);

	public void deleteById(Integer id);

	public List<CustomBeanConfiguration> findBeanByComponentTypeByComponentId(String componentType,
			Integer componentId);

	public Iterable<CustomBeanConfiguration> saveAll(Iterable<CustomBeanConfiguration> customBeanConfigurationList);

	void deleteBeansByComponentTypeByComponentId(String componentType, Integer componentId);

}
