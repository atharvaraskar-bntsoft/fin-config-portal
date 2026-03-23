package com.bnt.rest.service;

import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.bnt.rest.dto.AdapterDto;

import com.bnt.rest.wrapper.dto.adapter.AdapterUiResponseWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface AdapterToolKitSchemaService {

	public AdapterDto getMessageSpecification(Integer messageStandard);

	public AdapterUiResponseWrapper getUIResponse(int templateId, String adapterType);

	public Map<String, Object> downloadTemplateFile(int templateId);

	public AdapterUiResponseWrapper uploadSchemaFile(String requestToken, Integer templateId, String adapterName,
			MultipartFile templateFile, Integer imfId, String adapterType, String fileType);

	Map<String, Object> downloadAdapterPackagerFile(int adapterConfigId);

	Map<String, Object> downloadPackagerFileByFileType(int adapterConfigId, String fileType);

}
