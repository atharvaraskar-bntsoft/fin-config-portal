package com.bnt.rest.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bnt.common.RippsAdminException;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.CustomBeanConfigurationDto;
import com.bnt.rest.dto.SystemBeanConfigurationDto;
import com.bnt.rest.dto.uiwrapper.CustomBeanConfigurationUiWrapper;
import com.bnt.rest.entity.CustomBeanConfiguration;
import com.bnt.rest.repository.CustomBeanConfigurationRepository;
import com.bnt.rest.service.CustomBeanConfigurationService;
import com.bnt.rest.service.SystemBeanConfigurationService;
import com.bnt.service.mapper.BeanConfigurationMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class CustomBeanConfigurationServiceImpl implements CustomBeanConfigurationService {

	private static Log logger = LogFactory.getLog(CustomBeanConfigurationServiceImpl.class);

	@Autowired
	private CustomBeanConfigurationRepository customBeanConfigurationRepository;

	@Autowired
	private SystemBeanConfigurationService systemBeanConfigurationService;

	@Override
	public CustomBeanConfigurationDto findCustomBeanConfigurationDtoById(Integer id) {
		logger.info("inside findCustomBeanConfigurationDtoById with id:" + id);
		CustomBeanConfigurationDto customBeanConfigurationDto = null;
		CustomBeanConfiguration customBeanConfiguration = customBeanConfigurationRepository
				.findCustomBeanConfigurationById(id);
		if (customBeanConfiguration != null) {
			customBeanConfigurationDto = ObjectMapper.mapToDto(customBeanConfiguration,
					CustomBeanConfigurationDto.class);
		}
		return customBeanConfigurationDto;
	}

	@Override
	public void deleteByid(Integer id) {
		customBeanConfigurationRepository.deleteById(id);
	}

	@Override
	public Integer create(CustomBeanConfiguration customBeanConfiguration, String requestToken) {
		CustomBeanConfiguration savedcustomBeanConfiguration = customBeanConfigurationRepository
				.save(customBeanConfiguration);
		Integer customBeanConfigurationId;
		if (savedcustomBeanConfiguration == null) {
			throw new RippsAdminException("Error in saving Adapter");
		} else {
			customBeanConfigurationId = savedcustomBeanConfiguration.getId();
			logger.info("created successfully with Id:" + customBeanConfigurationId);
		}
		return customBeanConfigurationId;
	}

	@Override
	public List<CustomBeanConfigurationDto> findBeanByComponentTypeByComponentId(String componentType,
			Integer componentId) {
		logger.info("inside findBeanByComponentTypeByComponentId");
		logger.info("with component type:" + componentType);
		logger.info("and componentId:" + componentId);
		List<CustomBeanConfigurationDto> customBeanConfigurationDtoList = null;
		List<CustomBeanConfiguration> listEntity = customBeanConfigurationRepository
				.findBeanByComponentTypeByComponentId(componentType, componentId);
		if (listEntity != null) {
			customBeanConfigurationDtoList = ObjectMapper.mapListObjectToListDto(listEntity,
					CustomBeanConfigurationDto.class);
		}
		return customBeanConfigurationDtoList;
	}

	@Override
	public boolean createConfigurationList(List<CustomBeanConfigurationDto> customBeanConfigurationList,
			String requestToken) {
		logger.info("inside createConfigurationList with size" + customBeanConfigurationList.size());
		List<CustomBeanConfiguration> toSaveCustomBeanConfigurationList = null;
		CustomBeanConfiguration customBeanConfiguration = null;
		for (CustomBeanConfigurationDto dto : customBeanConfigurationList) {
			customBeanConfiguration = new CustomBeanConfiguration();
			toSaveCustomBeanConfigurationList = new ArrayList<>();
			customBeanConfiguration.setId(dto.getId());
			customBeanConfiguration.setComponentId(dto.getComponentId());
			customBeanConfiguration.setComponentType(dto.getComponentType());
			customBeanConfiguration.setFileContent(dto.getFileContent());
			customBeanConfiguration.setFileName(dto.getFileName());
			customBeanConfiguration.setFileType(dto.getFileType());
			toSaveCustomBeanConfigurationList.add(customBeanConfiguration);
		}
		List<CustomBeanConfiguration> savedCustomBeanConfigurationList = (List<CustomBeanConfiguration>) customBeanConfigurationRepository
				.saveAll(toSaveCustomBeanConfigurationList);
		if (savedCustomBeanConfigurationList == null) {
			throw new RippsAdminException("Error in saving Adapter");
		} else {
			logger.info("created successfully with Id:" + savedCustomBeanConfigurationList);
		}
		return true;
	}

	@Transactional
	@Override
	public void createConfigurationList(List<CustomBeanConfigurationDto> customBeanConfigurationList,
			Integer componentId, String componentType, String requestToken, boolean isSingleProperty) {
		logger.info("inside createConfigurationList with size" + customBeanConfigurationList.size());
		logger.info("with componentId:" + componentId);
		logger.info("with componentType:" + componentType);
		List<SystemBeanConfigurationDto> systemBeanConfigurationDto = systemBeanConfigurationService
				.findBeanByComponentTypeByMaxVersion(componentType);
		List<CustomBeanConfigurationDto> filterdCustumDtoList = BeanConfigurationMapper
				.filterListToSave(customBeanConfigurationList, systemBeanConfigurationDto, isSingleProperty);
		if (filterdCustumDtoList == null) {
			return;
		}
		List<CustomBeanConfigurationDto> newDtoList = BeanConfigurationMapper
				.enrichDtoWithComponentId(filterdCustumDtoList, componentId);
		if (newDtoList != null) {
			deleteBeansByComponentTypeByComponentId(componentType, componentId);
			createConfigurationList(newDtoList, requestToken);
		}
	}

	@Override
	public List<CustomBeanConfigurationUiWrapper> findUiBeanListByTypeByComponentId(String componentType,
			Integer componentId) {
		logger.info("inside findUiBeanListByTypeByComponentId");
		logger.info("with componentType:" + componentType);
		logger.info("and componentId:" + componentId);
		List<CustomBeanConfigurationUiWrapper> customBeanConfigurationUiWrapperList = null;
		List<SystemBeanConfigurationDto> systemBeanConfigurationDto = null;
		if (componentId != null) {
			List<CustomBeanConfigurationDto> customBeanConfigurationDtoList = findBeanByComponentTypeByComponentId(
					componentType, componentId);
			customBeanConfigurationUiWrapperList = BeanConfigurationMapper
					.customDtoToCustomUiWrapper(customBeanConfigurationDtoList);
			systemBeanConfigurationDto = systemBeanConfigurationService
					.findBeanByComponentTypeByMaxVersion(componentType);
			customBeanConfigurationUiWrapperList = BeanConfigurationMapper
					.mergeSystemAndCustomBean(customBeanConfigurationUiWrapperList, systemBeanConfigurationDto);
		}
		if (componentId == null || customBeanConfigurationUiWrapperList == null
				|| customBeanConfigurationUiWrapperList.isEmpty()) {
			if (systemBeanConfigurationDto == null) {
				systemBeanConfigurationDto = systemBeanConfigurationService
						.findBeanByComponentTypeByMaxVersion(componentType);
			}
			customBeanConfigurationUiWrapperList = BeanConfigurationMapper
					.customUiWrapperFromSystemBeanConfigurationDto(systemBeanConfigurationDto);
		}
		return customBeanConfigurationUiWrapperList;
	}

	@Transactional
	@Override
	public void deleteBeansByComponentTypeByComponentId(String componentType, Integer componentId) {
		customBeanConfigurationRepository.deleteBeansByComponentTypeByComponentId(componentType, componentId);
	}
}
