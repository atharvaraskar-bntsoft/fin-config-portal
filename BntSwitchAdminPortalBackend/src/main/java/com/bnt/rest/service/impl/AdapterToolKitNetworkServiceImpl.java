package com.bnt.rest.service.impl;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.exception.ExceptionLog;
import com.bnt.rest.dto.AdapterConfigurationDto;
import com.bnt.rest.dto.AdapterDto;
import com.bnt.rest.dto.StandardMessageSpecificationDto;
import com.bnt.rest.repository.AdapterConfigurationRepository;
import com.bnt.rest.repository.AdapterRepository;
import com.bnt.rest.service.AdapterService;
import com.bnt.rest.service.AdapterToolKitNetworkService;
import com.bnt.rest.service.impl.ListService;
import com.bnt.rest.service.StandardMessageSpecificationService;
import com.bnt.rest.wrapper.dto.adapter.AdapterUiResponseWrapper;
import com.bnt.rest.wrapper.dto.adapter.NetworkPropertiesResponseWrapper;
import com.bnt.rest.wrapper.dto.adapter.NetworkPropertiesResponseWrapper.PropertiesWrapper;
import com.bnt.rest.wrapper.dto.adapter.NetworkUiResponseWrapper;
import com.bnt.service.mapper.AdapterToolkitNetworkMapper;
import com.bnt.service.mapper.AdapterWrapperDtoMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class AdapterToolKitNetworkServiceImpl implements AdapterToolKitNetworkService {

	private static final Logger logger = LogManager.getLogger(AdapterToolKitNetworkServiceImpl.class);
	@Autowired
	StandardMessageSpecificationService standardMessageSpecificationService;

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public AdapterUiResponseWrapper getMessageSpecification(Integer messageStandard, String adapterType) {
		logger.info("inside getMessageSpecificationTemplate");
		logger.info("With messageStandard {},", messageStandard);
		logger.info("With adapterType :{}", adapterType);
		AdapterDto adapterDto = new AdapterDto();
		StandardMessageSpecificationDto standardMessageSpecificationDto = standardMessageSpecificationService
				.getMessageSpecificationByTemplateId(messageStandard);
		adapterDto.setType(adapterType);
		adapterDto.setStandardMessageSpecification(standardMessageSpecificationDto);
		List<AdapterConfigurationDto> adapterConfigurationDtoList = new ArrayList<>();
		AdapterConfigurationDto adapterConfigurationDto = new AdapterConfigurationDto();
		adapterConfigurationDto.setProperties(AdapterToolkitNetworkMapper
				.getPropertiesStringByType(standardMessageSpecificationDto.getProperties(), adapterType));
		adapterConfigurationDtoList.add(adapterConfigurationDto);
		adapterDto.setAdapterConfiguration(adapterConfigurationDtoList);
		AdapterUiResponseWrapper adapterUiResponseWrapper = AdapterWrapperDtoMapper.adapterDtoToUiWrapper(adapterDto);
		adapterUiResponseWrapper = enrichListValue(adapterUiResponseWrapper);
		return adapterUiResponseWrapper;
	}

	@Override
	public AdapterUiResponseWrapper enrichListValue(AdapterUiResponseWrapper adapterUiResponseWrapper) {
		logger.info("inside enrichDefaultProperties");
		NetworkUiResponseWrapper networkData = adapterUiResponseWrapper.getNetworkData();
		NetworkPropertiesResponseWrapper networkPropertiesResponseWrapper = networkData.getProperties();
		if (networkPropertiesResponseWrapper != null) {
			List<PropertiesWrapper> messageList = new ArrayList<>();

			enrichListValue1(networkPropertiesResponseWrapper, messageList);
			networkPropertiesResponseWrapper.setMessage(messageList);

			List<PropertiesWrapper> newNetworkList = new ArrayList<>();
			enrichListValue2(networkPropertiesResponseWrapper, newNetworkList);
			networkPropertiesResponseWrapper.setNetwork(newNetworkList);
		}
		networkData.setProperties(networkPropertiesResponseWrapper);
		adapterUiResponseWrapper.setNetworkData(networkData);
		return adapterUiResponseWrapper;
	}

	private void enrichListValue2(NetworkPropertiesResponseWrapper networkPropertiesResponseWrapper,
			List<PropertiesWrapper> newNetworkList) {
		List<String> listData;
		for (PropertiesWrapper propertiesWrapper : networkPropertiesResponseWrapper.getNetwork()) {
			if (propertiesWrapper.getListvalues() != null
					&& propertiesWrapper.getListvalues().get(0).contains("DB_QUERY:")) {
				logger.info("DB_QUERY exist for field: {}", propertiesWrapper.getField());
				String sqlString = propertiesWrapper.getListvalues().get(0).split(":")[1];
				listData = getListFromNativeQuery(sqlString);
				propertiesWrapper.setListvalues(listData);
			}
			newNetworkList.add(propertiesWrapper);
		}
	}

	private void enrichListValue1(NetworkPropertiesResponseWrapper networkPropertiesResponseWrapper,
			List<PropertiesWrapper> messageList) {
		List<String> listData;
		for (PropertiesWrapper propertiesWrapper : networkPropertiesResponseWrapper.getMessage()) {
			if (propertiesWrapper.getListvalues() != null
					&& propertiesWrapper.getListvalues().get(0).contains("DB_QUERY:")) {
				logger.info("DB_QUERY exist for field: {}", propertiesWrapper.getField());
				String sqlString = propertiesWrapper.getListvalues().get(0).split(":")[1];
				listData = getListFromNativeQuery(sqlString);
				propertiesWrapper.setListvalues(listData);
			}
			messageList.add(propertiesWrapper);
		}
	}

	public List<String> getListFromNativeQuery(String sqlString) {
		logger.info("sqlString: {}", sqlString);
		List<String> listData = new ArrayList<>();
		try {
			List<Object[]> resultList = JPAUtils.getListFromNativeQuery(entityManager, sqlString);
			if (resultList != null && !resultList.isEmpty()) {
				for (Object dataArray : resultList) {
					if (dataArray instanceof String) {
						listData.add((String) dataArray);
					} else if (dataArray instanceof Object[]) {
						Object[] data = (Object[]) dataArray;
						listData.add(String.valueOf(data[0]));
					}
					logger.info("listData.size: {}", listData.size());
				}

			}
		} catch (Exception e) {
			logger.error("Issue in DB_Query : {}", ExceptionLog.printStackTraceToString(e));
		}
		return listData;
	}

}
