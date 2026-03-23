package com.bnt.rest.service;

import java.util.List;
import java.util.Map;

import com.bnt.common.ResponseWrapper;
import com.bnt.rest.dto.AdapterConfigurationDto;
import com.bnt.rest.dto.AdapterDto;
import com.bnt.rest.dto.DefaultCorePropertiesDto;
import com.bnt.rest.dto.PublishCorePropertiesDto;
import com.bnt.rest.wrapper.dto.CorePropertiesWrapperDto;
import com.bnt.rest.wrapper.dto.adapter.AdapterUiResponseWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface CorePropertiesService {

	public List<DefaultCorePropertiesDto> getDefaultProperties();

	public Integer draftCoreProperties(CorePropertiesWrapperDto ResponseWrapper, String requestToken);

	public CorePropertiesWrapperDto findCorePropertiesById(int id);

	public ResponseWrapper getAllCoreProperties(Map<String, Object> requestParamMap);

	List<PublishCorePropertiesDto> getPublishCoreProperties();

	boolean validateCorePropertiesName(String corePropertiesName);

	void deleteByCorePropertiesDetailsId(Integer id, String requestToken);

}
