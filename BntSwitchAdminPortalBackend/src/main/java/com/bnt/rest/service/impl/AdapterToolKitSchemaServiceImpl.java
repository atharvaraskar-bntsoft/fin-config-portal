package com.bnt.rest.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.bnt.common.RippsAdminException;
import com.bnt.constant.Constants;
import com.bnt.rest.dto.AdapterConfigurationDto;
import com.bnt.rest.dto.AdapterDto;
import com.bnt.rest.dto.ImfStructureDto;
import com.bnt.rest.dto.StandardMessageSpecificationDto;
import com.bnt.rest.repository.AdapterConfigurationRepository;
import com.bnt.rest.repository.AdapterRepository;
import com.bnt.rest.service.AdapterService;
import com.bnt.rest.service.AdapterToolKitNetworkService;
import com.bnt.rest.service.AdapterToolKitSchemaService;
import com.bnt.rest.service.AdapterToolKitTransformService;
import com.bnt.rest.service.ImfStructureService;
import com.bnt.rest.service.SchemeImfMapperService;
import com.bnt.rest.service.StandardMessageSpecificationService;
import com.bnt.rest.wrapper.dto.adapter.AdapterUiResponseWrapper;
import com.bnt.rest.wrapper.dto.adapter.NetworkPropertiesResponseWrapper;
import com.bnt.rest.wrapper.dto.adapter.NetworkUiResponseWrapper;
import com.bnt.rest.wrapper.dto.adapter.SchemaUiResponseWrapper;
import com.bnt.service.mapper.AdapterToolkitNetworkMapper;
import com.bnt.service.mapper.AdapterWrapperDtoMapper;
import com.bnt.service.mapper.FileToSchemaDataMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class AdapterToolKitSchemaServiceImpl implements AdapterToolKitSchemaService {

	private static final Logger logger = LogManager.getLogger(AdapterToolKitSchemaServiceImpl.class);

	@Autowired
	StandardMessageSpecificationService standardMessageSpecificationService;

	@Autowired
	AdapterRepository adapterRepository;

	@Autowired
	AdapterConfigurationRepository adapterConfigurationRepository;

	@Autowired
	AdapterService adapterService;

	@Autowired
	private ImfStructureService imfStructureService;

	@Autowired
	SchemeImfMapperService schemeImfMapperService;

	@Autowired
	private AdapterToolKitTransformService adapterToolKitTransformService;

	@Autowired
	private AdapterToolKitNetworkService adapterToolKitNetworkService;

	@Value("${bean.tab.hide}")
	private String beanTabDisplayDisable;

	@Override
	public AdapterDto getMessageSpecification(Integer messageStandard) {
		logger.info("inside getMessageSpecification()...");
		AdapterDto adapterDto = new AdapterDto();
		StandardMessageSpecificationDto standardMessageSpecificationDto = standardMessageSpecificationService
				.getMessageSpecificationByTemplateId(messageStandard);
		if (standardMessageSpecificationDto == null) {
			throw new RippsAdminException("Standard-Message-Specification is not maintained for this Template.");
		}
		String schemaXml = standardMessageSpecificationDto.getMessageSchemaPackager();
		adapterDto.setStandardMessageSpecification(standardMessageSpecificationDto);
		List<AdapterConfigurationDto> adapterConfigurationDtoList = new ArrayList<>();
		AdapterConfigurationDto adapterConfigurationDto = new AdapterConfigurationDto();
		adapterConfigurationDto.setMessageSchemaPackager(schemaXml);
		adapterConfigurationDtoList.add(adapterConfigurationDto);

		adapterDto.setAdapterConfiguration(adapterConfigurationDtoList);
		ImfStructureDto imfStructureDto = imfStructureService.findMaxVersionImfStructure();
		adapterDto.getAdapterConfiguration().get(0).setImfId(imfStructureDto);
		logger.info("getMessageSpecification() completed.");
		return adapterDto;
	}

	@Override
	public AdapterUiResponseWrapper getUIResponse(int templateId, String adapterType) {
		logger.info("inside getUIResponse() with id: {}", templateId);

		AdapterDto adapterDto = getMessageSpecification(templateId);
		adapterDto.setType(adapterType);
		NetworkUiResponseWrapper networkData = new NetworkUiResponseWrapper();
		List<String> transformExcludedFieldList = adapterToolKitTransformService
				.getFieldExcludedList(adapterDto.getStandardMessageSpecification().getMessageStandard().getValue());
		AdapterUiResponseWrapper response = AdapterWrapperDtoMapper.adapterDtoToUiWrapper(adapterDto,
				transformExcludedFieldList);
		NetworkPropertiesResponseWrapper networkProperties = null;
		networkProperties = AdapterToolkitNetworkMapper
				.getPropertiesByType(adapterDto.getStandardMessageSpecification().getProperties(), adapterType);
		networkData.setProperties(networkProperties);
		response.setNetworkData(networkData);
		response = adapterToolKitNetworkService.enrichListValue(response);
		response = adapterService.getBeans(adapterDto.getType(), null, response);
		response = AdapterWrapperDtoMapper.setTabPersistantRequired(response);
		response.setBeanTabDisable(Boolean.valueOf(beanTabDisplayDisable));
		logger.info("going to return with data");
		logger.info("getUIResponse completed");
		return response;
	}

	@Override
	public Map<String, Object> downloadTemplateFile(int templateId) {
		logger.info("inside downloadTemplateFile() with templateId:{}", templateId);

		Map<String, Object> map = new HashMap<>();
		StandardMessageSpecificationDto standardMessageSpecificationDto = standardMessageSpecificationService
				.getMessageSpecificationByTemplateId(templateId);
		if (standardMessageSpecificationDto == null) {
			throw new RippsAdminException("Standard-Message-Specification is not maintained for this Template");
		}
		String filename = standardMessageSpecificationDto.getMessageStandard().getValue();
		filename = filename.replace(" ", "");
		if (filename.contains(Constants.ISO)) {
			filename = filename + ".xml";
		} else {
			filename = filename + ".json";
		}
		logger.info("filename->{}", filename);
		String templateDate = standardMessageSpecificationDto.getMessageSchemaPackager();

		Resource resource = new ByteArrayResource(templateDate.getBytes());
		map.put(Constants.RESOURCE, resource);
		map.put(Constants.FILE_NAME, filename);

		return map;
	}

	@Override
	public AdapterUiResponseWrapper uploadSchemaFile(String requestToken, Integer templateId, String adapterName,
			MultipartFile templateFile, Integer imfId, String adapterType, String fileType) {
		logger.info("inside uploadSchemaFile()...");

		AdapterUiResponseWrapper adapterUiResponseWrapper = null;
		adapterUiResponseWrapper = getUIResponse(templateId, adapterType);

		String templateName = adapterUiResponseWrapper.getMasterData().getAdapterDto().getStandardMessageSpecification()
				.getMessageStandard().getValue();
		String packagerFileData = adapterUiResponseWrapper.getMasterData().getAdapterDto()
				.getStandardMessageSpecification().getMessageSchemaPackager();
		String schemaPackager = "";

		if (FileToSchemaDataMapper.validateUploadedFile(templateFile, templateName, packagerFileData)) {

			logger.info("file validation is successfull now started drafting schema");

			schemaPackager = FileToSchemaDataMapper.getSchemaDataFromFile(templateFile, templateName);
			adapterUiResponseWrapper.getMasterData().getAdapterDto().setName(adapterName);
			SchemaUiResponseWrapper schemaUiResponseWrapper = new SchemaUiResponseWrapper();
			schemaUiResponseWrapper.setPersistRequired("U");
			schemaUiResponseWrapper.setFileType(fileType);

			if (fileType.equalsIgnoreCase(Constants.ADAPTER_FILE_TYPE_REQUEST)) {
				schemaUiResponseWrapper.setMessageSchemaPackager(schemaPackager);
				schemaUiResponseWrapper.setResponsePackager(null);
			} else {
				schemaUiResponseWrapper.setResponsePackager(schemaPackager);
				schemaUiResponseWrapper.setMessageSchemaPackager(null);
			}

			adapterUiResponseWrapper.setSchemaData(schemaUiResponseWrapper);
			adapterUiResponseWrapper.getImfId().setId(imfId);
			Integer id = adapterService.draftAdapter(adapterUiResponseWrapper, requestToken);
			logger.info("Adapter drafted for id:{}", id);
			adapterUiResponseWrapper = adapterService.findAdapterByConfigurationId(id);
			logger.info("Name:{}", adapterUiResponseWrapper.getMasterData().getAdapterDto().getName());
		} else {
			throw new RippsAdminException("Invalid uploded file");
		}
		logger.info("uploadSchemaFile completed");
		return adapterUiResponseWrapper;
	}

	@Override
	public Map<String, Object> downloadAdapterPackagerFile(int adapterConfigId) {
		logger.info("inside downloadAdapterPackagerFile() with adapterConfigId:{}", adapterConfigId);

		Map<String, Object> map = new HashMap<>();

		AdapterUiResponseWrapper response = adapterService.findAdapterByConfigurationId(adapterConfigId);
		String filename = response.getMasterData().getAdapterDto().getName();
		String templateName = response.getMasterData().getAdapterDto().getStandardMessageSpecification()
				.getMessageStandard().getValue();
		filename = filename.replace(" ", "");
		if (templateName.contains(Constants.ISO)) {
			filename = filename + ".xml";
		} else {
			filename = filename + ".json";
		}
		logger.info("filename-> {}", filename);
		String packgerData = response.getSchemaData().getMessageSchemaPackager();
		Resource resource = new ByteArrayResource(packgerData.getBytes());
		map.put(Constants.RESOURCE, resource);
		map.put(Constants.FILE_NAME, filename);

		return map;
	}

	@Override
	public Map<String, Object> downloadPackagerFileByFileType(int adapterConfigId, String fileType) {
		logger.info("inside downloadPackagerFileByFileType() with adapterConfigId:{}", adapterConfigId);

		Map<String, Object> map = new HashMap<>();
		String packagerData;

		AdapterUiResponseWrapper response = adapterService.findAdapterByConfigurationId(adapterConfigId);
		String filename = response.getMasterData().getAdapterDto().getName();
		String templateName = response.getMasterData().getAdapterDto().getStandardMessageSpecification()
				.getMessageStandard().getValue();

		filename = filename.replace(" ", "");
		if (templateName.contains(Constants.ISO)) {
			filename = filename + ".xml";
		} else {
			filename = filename + ".json";
		}

		logger.info("filename-> {}", filename);
		if (fileType.equalsIgnoreCase(Constants.ADAPTER_FILE_TYPE_REQUEST))
			packagerData = response.getSchemaData().getMessageSchemaPackager();
		else
			packagerData = response.getSchemaData().getResponsePackager();

		Resource resource = new ByteArrayResource(packagerData.getBytes());
		map.put(Constants.RESOURCE, resource);
		map.put(Constants.FILE_NAME, filename);

		return map;
	}
}
