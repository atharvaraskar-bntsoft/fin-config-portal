package com.bnt.rest.service;

import java.util.List;

import com.bnt.rest.dto.CustomBeanConfigurationDto;
import com.bnt.rest.dto.uiwrapper.CustomBeanConfigurationUiWrapper;
import com.bnt.rest.entity.CustomBeanConfiguration;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface CustomBeanConfigurationService {

	CustomBeanConfigurationDto findCustomBeanConfigurationDtoById(Integer id);

	void deleteByid(Integer id);

	Integer create(CustomBeanConfiguration customBeanConfiguration, String requestToken);

	List<CustomBeanConfigurationUiWrapper> findUiBeanListByTypeByComponentId(String componentType, Integer componentId);

	boolean createConfigurationList(List<CustomBeanConfigurationDto> customBeanConfigurationList, String requestToken);

	List<CustomBeanConfigurationDto> findBeanByComponentTypeByComponentId(String componentType, Integer componentId);

	void createConfigurationList(List<CustomBeanConfigurationDto> customBeanConfigurationList, Integer componentId,
			String componentType, String requestToken, boolean isSingleProperty);

	void deleteBeansByComponentTypeByComponentId(String componentType, Integer componentId);

}
