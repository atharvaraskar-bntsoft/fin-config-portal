package com.bnt.rest.service;

import java.util.List;
import java.util.Map;

import com.bnt.bswitch.message.packager.BNTPackager;
import com.bnt.common.ResponseWrapper;
import com.bnt.rest.dto.AdapterConfigurationDto;
import com.bnt.rest.dto.AdapterDto;
import com.bnt.rest.dto.JsonDataCompListDto;
import com.bnt.rest.wrapper.dto.adapter.AdapterTransformData;
import com.bnt.rest.wrapper.dto.adapter.AdapterUiResponseWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface AdapterService {

	public AdapterUiResponseWrapper findAdapterByConfigurationId(int id);

	public Integer draftAdapter(AdapterUiResponseWrapper adapterUiResponseWrapper, String requestToken);

	public Integer versionItAdapter(AdapterUiResponseWrapper adapterUiResponseWrapper, String requestToken);

	public boolean validateAdapterName(String adapterName);

	public ResponseWrapper getPagableAdapterUIList(Map<String, Object> requestParamMap, String adapterType);

	public void deleteByConfigId(Integer id, String requestToken);

	List<AdapterConfigurationDto> getAdapterConfigurationNotInDeployedComponentNew();

	public AdapterUiResponseWrapper getBeans(String adapterType, Integer adapterConfigurationId,
			AdapterUiResponseWrapper adapterUiResponseWrapper);

	void saveBean(Integer adapterId, Integer version, AdapterUiResponseWrapper adapterUiResponseWrapper,
			String requestToken, String saveType);

	public ResponseWrapper getCompTypeListForAdapter(Map<String, Object> requestParamMap, String adapterType);

	public ResponseWrapper getCompTypeJsonPropListForAdapter(Map<String, Object> requestParamMap,
			JsonDataCompListDto jsonDataCompListDto);

	List<AdapterDto> getL3ListForProcessorAdapter();

	AdapterUiResponseWrapper copyAdapterByConfigurationId(String adapterName, Integer imfId, Integer configuraionId,
			String requestToken);

	AdapterUiResponseWrapper convertAdapterUiData(AdapterUiResponseWrapper adapterUiResponseWrapper,
			String requestToken);

	List<AdapterTransformData> convertPackagerData(BNTPackager bntPackager);

}
