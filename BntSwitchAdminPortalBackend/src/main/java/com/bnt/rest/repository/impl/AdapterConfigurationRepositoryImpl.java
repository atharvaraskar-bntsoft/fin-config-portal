package com.bnt.rest.repository.impl;

import java.util.ArrayList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import com.bnt.rest.dto.AdapterConfigurationDto;
import com.bnt.rest.dto.AdapterDto;
import com.bnt.rest.entity.AdapterConfiguration;
import com.bnt.rest.jpa.repository.AdapterConfigurationPersistenceHelper;
import com.bnt.rest.repository.AdapterConfigurationRepository;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Component
public class AdapterConfigurationRepositoryImpl implements AdapterConfigurationRepository {

	private static final Logger LOGGER = LogManager.getLogger(AdapterConfigurationRepositoryImpl.class);

	@Autowired
	private AdapterConfigurationPersistenceHelper adapterConfigurationPersistenceHelper;

	@Override
	public Integer getMaxVersionForAdaptor(Integer adapterId) {
		return adapterConfigurationPersistenceHelper.getMaxVersionForAdaptor(adapterId);
	}

	@Override
	public AdapterConfiguration getConfigurationForMaxVersion(Integer adapterId) {
		return adapterConfigurationPersistenceHelper.getMaxVersionAdapterConfiguration(adapterId);
	}

	@Override
	public AdapterConfiguration getConfigurationForVersion(Integer adapterId, Integer version) {
		return adapterConfigurationPersistenceHelper.getConfigurationForVersion(adapterId, version);
	}

	@Override
	public List<AdapterConfiguration> getAllConfiguration() {
		return (List<AdapterConfiguration>) adapterConfigurationPersistenceHelper.findAll();
	}

	@Override
	public AdapterConfiguration getAdapterConfigurationById(Integer id) {
		return adapterConfigurationPersistenceHelper.findById(id).orElse(null);
	}

	@Override
	public Page<AdapterConfiguration> getPagableConfigurationList(Pageable pageable) {
		return adapterConfigurationPersistenceHelper.findAll(pageable);
	}

	@Override
	public List<AdapterConfiguration> getConfigListDescVesrionByAdapterId(Integer adapterId) {
		return adapterConfigurationPersistenceHelper.getConfigListDescVesrionByAdapterId(adapterId);
	}

	@Override
	public void deleteById(Integer id) {
		adapterConfigurationPersistenceHelper.deleteById(id);
	}

	@Override
	public List<AdapterConfiguration> findAllNotinDeployedComponent() {
		return adapterConfigurationPersistenceHelper.findAllNotinDeployedComponent();
	}

	@Override
	public List<Object[]> findAllNotinDeployedComponentNew() {
		return adapterConfigurationPersistenceHelper.findAllNotinDeployedComponentNew();
	}

	@Override
	public List<AdapterConfigurationDto> getConfigDtoListDescVesrionByAdapterId(Integer adapterId) {
		LOGGER.info("inside getConfigDtoListDescVesrionByAdapterId with id: {}", adapterId);
		List<AdapterConfigurationDto> listConfig = null;
		List<Object[]> dbData = adapterConfigurationPersistenceHelper.getNewConfigListDescVesrionByAdapterId(adapterId);
		AdapterConfigurationDto adapterConfiguration = null;
		if (dbData != null) {
			AdapterDto adapter = new AdapterDto();
			adapter.setAdapterConfiguration(null);
			adapter.setId(adapterId);
			listConfig = new ArrayList<>();
			for (Object[] data : dbData) {
				adapterConfiguration = new AdapterConfigurationDto();
				adapterConfiguration.setId((Integer) data[0]);
				adapterConfiguration.setVersion((Integer) data[1]);
				adapterConfiguration.setStatus((String) data[2]);
				adapterConfiguration.setAdapter(adapter);
				listConfig.add(adapterConfiguration);
			}
		}
		LOGGER.info("completed getConfigDtoListDescVesrionByAdapterId");
		return listConfig;
	}

	@Override
	public List<AdapterConfiguration> findAllVersionedAdapterConfiguration() {
		return adapterConfigurationPersistenceHelper.findAllVersionedAdapterConfiguration();
	}

}
