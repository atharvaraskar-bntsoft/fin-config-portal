package com.bnt.rest.service.impl;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.SystemBeanConfigurationDto;
import com.bnt.rest.entity.SystemBeanConfiguration;
import com.bnt.rest.repository.SystemBeanConfigurationRepository;
import com.bnt.rest.service.SystemBeanConfigurationService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class SystemBeanConfigurationServiceImpl implements SystemBeanConfigurationService {

	private static Log logger = LogFactory.getLog(SystemBeanConfigurationServiceImpl.class);

	@Autowired
	private SystemBeanConfigurationRepository systemBeanConfigurationRepository;

	@Override
	public SystemBeanConfigurationDto findSystemBeanConfigurationDtoById(Integer id) {
		logger.info("inside findSystemBeanConfigurationDtoById with id:" + id);
		SystemBeanConfigurationDto systemBeanConfigurationDto = null;
		SystemBeanConfiguration systemBeanConfiguration = systemBeanConfigurationRepository
				.findSystemBeanConfigurationById(id);
		if (systemBeanConfiguration != null) {
			systemBeanConfigurationDto = ObjectMapper.mapToDto(systemBeanConfiguration,
					SystemBeanConfigurationDto.class);
		}
		return systemBeanConfigurationDto;
	}

	@Override
	public List<SystemBeanConfigurationDto> findBeanByComponentTypeByMaxVersion(String componentType) {
		logger.info("inside findBeanByComponentTypeByComponentId");
		logger.info("with componentType:" + componentType);
		List<SystemBeanConfigurationDto> systemBeanConfigurationDtoList = null;
		List<SystemBeanConfiguration> listEntity = systemBeanConfigurationRepository
				.findBeanByComponentTypeByMaxVersion(componentType);
		if (listEntity != null) {
			systemBeanConfigurationDtoList = ObjectMapper.mapListObjectToListDto(listEntity,
					SystemBeanConfigurationDto.class);
		}
		return systemBeanConfigurationDtoList;
	}

	@Override
	public List<SystemBeanConfigurationDto> findBeanByComponentTypeByVersion(String componentType, Integer version) {
		logger.info("inside findBeanByComponentTypeByComponentId");
		logger.info("with componentType:" + componentType);
		List<SystemBeanConfigurationDto> systemBeanConfigurationDtoList = null;
		List<SystemBeanConfiguration> listEntity = systemBeanConfigurationRepository
				.findBeanByComponentTypeByVersion(componentType, version);
		if (listEntity != null) {
			systemBeanConfigurationDtoList = ObjectMapper.mapListObjectToListDto(listEntity,
					SystemBeanConfigurationDto.class);
		}
		return systemBeanConfigurationDtoList;
	}

}
