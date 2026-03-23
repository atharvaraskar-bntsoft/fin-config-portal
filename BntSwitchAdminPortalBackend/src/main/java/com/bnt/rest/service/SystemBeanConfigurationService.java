package com.bnt.rest.service;

import java.util.List;

import com.bnt.rest.dto.SystemBeanConfigurationDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface SystemBeanConfigurationService {

	public SystemBeanConfigurationDto findSystemBeanConfigurationDtoById(Integer id);

	public List<SystemBeanConfigurationDto> findBeanByComponentTypeByMaxVersion(String componentType);

	public List<SystemBeanConfigurationDto> findBeanByComponentTypeByVersion(String componentType, Integer version);

}
