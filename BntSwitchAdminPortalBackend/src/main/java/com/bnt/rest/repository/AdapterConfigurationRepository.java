package com.bnt.rest.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.bnt.rest.dto.AdapterConfigurationDto;
import com.bnt.rest.entity.AdapterConfiguration;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface AdapterConfigurationRepository {

	public Integer getMaxVersionForAdaptor(Integer adapterId);

	public AdapterConfiguration getConfigurationForMaxVersion(Integer adapterId);

	public AdapterConfiguration getConfigurationForVersion(Integer adapterId, Integer version);

	public List<AdapterConfiguration> getAllConfiguration();

	public AdapterConfiguration getAdapterConfigurationById(Integer id);

	public Page<AdapterConfiguration> getPagableConfigurationList(Pageable pageable);

	public List<AdapterConfiguration> getConfigListDescVesrionByAdapterId(Integer adapterId);

	public void deleteById(Integer id);

	public List<AdapterConfiguration> findAllNotinDeployedComponent();

	public List<Object[]> findAllNotinDeployedComponentNew();

	List<AdapterConfigurationDto> getConfigDtoListDescVesrionByAdapterId(Integer adapterId);

	List<AdapterConfiguration> findAllVersionedAdapterConfiguration();
}
