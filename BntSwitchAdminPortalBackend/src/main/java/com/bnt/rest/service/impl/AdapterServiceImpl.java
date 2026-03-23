package com.bnt.rest.service.impl;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bnt.bswitch.message.packager.BNTPackager;
import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.HTMLInjectionUtil;
import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.RippsUtility;
import com.bnt.common.util.StringUtil;
import com.bnt.common.util.exception.ExceptionLog;
import com.bnt.constant.Constants;
import com.bnt.rest.dto.AdapterConfigurationDto;
import com.bnt.rest.dto.AdapterDto;
import com.bnt.rest.dto.CustomBeanConfigurationDto;
import com.bnt.rest.dto.DifferenceResponseDto;
import com.bnt.rest.dto.ImfStructureDto;
import com.bnt.rest.dto.JsonDataCompListDto;
import com.bnt.rest.dto.NameVersionListDto;
import com.bnt.rest.dto.uiwrapper.CustomBeanConfigurationUiWrapper;
import com.bnt.rest.entity.Adapter;
import com.bnt.rest.entity.AdapterConfiguration;
import com.bnt.rest.entity.ImfStructure;
import com.bnt.rest.entity.StandardMessageSpecification;
import com.bnt.rest.repository.AdapterConfigurationRepository;
import com.bnt.rest.repository.AdapterRepository;
import com.bnt.rest.repository.StandardMessageSpecificationRepository;
import com.bnt.rest.service.AdapterService;
import com.bnt.rest.service.AdapterToolKitTransformService;
import com.bnt.rest.service.CustomBeanConfigurationService;
import com.bnt.rest.service.ImfStructureService;
import com.bnt.rest.wrapper.dto.adapter.AdapterSummaryUIWrapper;
import com.bnt.rest.wrapper.dto.adapter.AdapterTransformData;
import com.bnt.rest.wrapper.dto.adapter.AdapterUiResponseWrapper;
import com.bnt.service.mapper.AdapterFieldsMapper;
import com.bnt.service.mapper.AdapterToolkitNetworkMapper;
import com.bnt.service.mapper.AdapterWrapperDtoMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class AdapterServiceImpl implements AdapterService {

	private static final Logger logger = LogManager.getLogger(AdapterServiceImpl.class);

	@Autowired
	private StandardMessageSpecificationRepository standardMessageSpecificationRepository;

	@Autowired
	private AdapterRepository adapterRepository;

	@Autowired
	private AuthSessionService authSessionService;

	@Autowired
	private AdapterConfigurationRepository adapterConfigurationRepository;

	@Autowired
	private ImfStructureService imfStructureService;

	@Autowired
	private AdapterToolKitTransformService adapterToolKitTransformService;

	@Autowired
	private CustomBeanConfigurationService customBeanConfigurationService;
	@Value("${bean.tab.hide}")
	private String beanTabDisplayDisable;

	@Override
	public AdapterUiResponseWrapper findAdapterByConfigurationId(int id) {
		AdapterConfiguration adapterConfiguration = adapterConfigurationRepository.getAdapterConfigurationById(id);

		if (adapterConfiguration == null)
			throw new RippsAdminException("Adapter not found!");
		AdapterDto adapterDto = AdapterWrapperDtoMapper.getAdapterDtoFromConfig(adapterConfiguration);
		List<String> transformExcludedFieldList = adapterToolKitTransformService
				.getFieldExcludedList(adapterDto.getStandardMessageSpecification().getMessageStandard().getValue());
		AdapterUiResponseWrapper adapterUiResponseWrapper = AdapterWrapperDtoMapper.adapterDtoToUiWrapper(adapterDto,
				transformExcludedFieldList);

		// if(!Boolean.valueOf(beanTabDisplayDisable))
		adapterUiResponseWrapper = getBeans(adapterDto.getType(), id, adapterUiResponseWrapper);
		adapterUiResponseWrapper.setBeanTabDisable(Boolean.valueOf(beanTabDisplayDisable));
		return adapterUiResponseWrapper;
	}

	@Transactional
	@Override
	public Integer draftAdapter(AdapterUiResponseWrapper adapterUiResponseWrapper, String requestToken) {
		logger.info("inside draftAdapter()...");
		Adapter adapter = null;
		Integer adapterId = null;

		if (adapterUiResponseWrapper.getMasterData().getAdapterDto().getName() != null
				&& !"".equalsIgnoreCase(adapterUiResponseWrapper.getMasterData().getAdapterDto().getName())
				&& !"null".equalsIgnoreCase(adapterUiResponseWrapper.getMasterData().getAdapterDto().getName())) {
			adapter = adapterRepository
					.findAdapterByNormalisedName(adapterUiResponseWrapper.getMasterData().getAdapterDto().getName());
		} else {
			throw new RippsAdminException("Name is mandatory");
		}

		// if("1".equalsIgnoreCase(adapterUiResponseWrapper.getSchemaData().getPersistRequired()))
		// {
		/**
		 * StandardMessageSpecification
		 * standardMessageSpecification=standardMessageSpecificationRepository.
		 * getStandardMessageSpecificationbyId(adapterUiResponseWrapper.getMasterData().
		 * getAdapterDto().getStandardMessageSpecification().getId());
		 * adapterUiResponseWrapper.getSchemaData().setSchema(
		 * standardMessageSpecification.getMessageSchemaPackager());
		 * adapterUiResponseWrapper.getSchemaData().setSchema(adapterUiResponseWrapper.
		 * getSchemaData().getMessageSchemaPackager());
		 */
		// }

		if ("U".equalsIgnoreCase(adapterUiResponseWrapper.getSchemaData().getPersistRequired())) { // U flag for upload
																									// route
			adapterUiResponseWrapper.getSchemaData().setPersistRequired("1");
		}

		if (adapter != null) {
			adapterId = updateAdapter(adapterUiResponseWrapper, adapter, requestToken,
					AdapterWrapperDtoMapper.SAVETYPE_DRAFT);
		} else {
			adapter = new Adapter();
			adapterId = createAdapter(adapterUiResponseWrapper, adapter, requestToken,
					AdapterWrapperDtoMapper.SAVETYPE_DRAFT);
		}
		return adapterId;
	}

	@Transactional
	@Override
	public Integer versionItAdapter(AdapterUiResponseWrapper adapterUiResponseWrapper, String requestToken) {
		logger.info("inside versionItAdapter");
		Adapter adapter = null;
		Integer adapterId = null;

		if (adapterUiResponseWrapper.getMasterData().getAdapterDto().getName() != null
				&& !"".equalsIgnoreCase(adapterUiResponseWrapper.getMasterData().getAdapterDto().getName())) {
			adapter = adapterRepository.findAdapterByNormalisedName(HTMLInjectionUtil
					.validateHTMLInjection(adapterUiResponseWrapper.getMasterData().getAdapterDto().getName()));
		} else {
			throw new RippsAdminException("Name is mandatory");
		}
		if ("1".equalsIgnoreCase(adapterUiResponseWrapper.getSchemaData().getPersistRequired())) {
			adapterUiResponseWrapper.getSchemaData()
					.setSchema(adapterUiResponseWrapper.getSchemaData().getMessageSchemaPackager());
			adapterUiResponseWrapper.getSchemaData()
					.setResponseSchema(adapterUiResponseWrapper.getSchemaData().getResponseSchema());
		}
		if (adapter != null) {
			adapterId = updateAdapter(adapterUiResponseWrapper, adapter, requestToken,
					AdapterWrapperDtoMapper.SAVETYPE_VERSIONIT);
		} else {
			adapter = new Adapter();
			adapterId = createAdapter(adapterUiResponseWrapper, adapter, requestToken,
					AdapterWrapperDtoMapper.SAVETYPE_VERSIONIT);
		}
		return adapterId;
	}

	public Integer updateAdapter(AdapterUiResponseWrapper adapterUiResponseWrapper, Adapter adapter,
			String requestToken, String saveType) {
		logger.info("inside updateAdapter");
		AdapterDto adapterDto = AdapterWrapperDtoMapper.uiWrapperToDto(adapterUiResponseWrapper);

		List<AdapterConfiguration> adapterConfigurationList = new ArrayList<>();
		StandardMessageSpecification standardMessageSpecification = standardMessageSpecificationRepository
				.getStandardMessageSpecificationbyId(adapterDto.getStandardMessageSpecification().getId());
		String flowName = AdapterWrapperDtoMapper.getTabName(adapterUiResponseWrapper,
				AdapterWrapperDtoMapper.ACTION_EDIT);
		AdapterWrapperDtoMapper.validateConfigurationData(flowName, adapterDto.getAdapterConfiguration().get(0),
				adapterUiResponseWrapper);
		ImfStructure imfStructure = getImf(adapterUiResponseWrapper, adapter.getId(), saveType);
		adapter.setStandardMessageSpecification(standardMessageSpecification);
		AdapterConfiguration adapterConfiguration = adapterConfigurationRepository
				.getConfigurationForVersion(adapter.getId(), 0);
		if (adapterConfiguration == null) {
			AdapterConfiguration prevAdapterConfiguration = adapterConfigurationRepository
					.getConfigurationForMaxVersion(adapter.getId());
			adapterConfiguration = new AdapterConfiguration();
			adapterConfiguration.setAdapter(prevAdapterConfiguration.getAdapter());
			adapterConfiguration.setGuid(prevAdapterConfiguration.getGuid());
			adapterConfiguration.setImfId(prevAdapterConfiguration.getImfId());
			adapterConfiguration.setImfLeg(prevAdapterConfiguration.getImfLeg());
			adapterConfiguration.setVersion(prevAdapterConfiguration.getVersion());
			adapterConfiguration.setStatus(prevAdapterConfiguration.getStatus());
			adapterConfiguration.setResponseMapping(prevAdapterConfiguration.getResponseMapping());
			adapterConfiguration.setResponseCode(prevAdapterConfiguration.getResponseCode());
			adapterConfiguration.setRequestMapping(prevAdapterConfiguration.getResponseMapping());
			adapterConfiguration.setProperties(prevAdapterConfiguration.getProperties());
			adapterConfiguration.setMessageSchemaPackager(prevAdapterConfiguration.getMessageSchemaPackager());
			adapterConfiguration.setResponsePackager(prevAdapterConfiguration.getResponsePackager());
			adapterConfiguration.setId(null);
		}

		if (!StringUtils.isEmpty(adapterDto.getAdapterConfiguration().get(0).getMessageSchemaPackager()))
			adapterConfiguration
					.setMessageSchemaPackager(adapterDto.getAdapterConfiguration().get(0).getMessageSchemaPackager());
		if (adapterConfiguration.getMessageSchemaPackager() == null) {
			if (adapterUiResponseWrapper.getSchemaData().getMessageSchemaPackager() != null) {
				adapterConfiguration
						.setMessageSchemaPackager(adapterUiResponseWrapper.getSchemaData().getMessageSchemaPackager());
			} else {
				adapterConfiguration.setMessageSchemaPackager(standardMessageSpecification.getMessageSchemaPackager());
			}
		}

		if (adapterUiResponseWrapper.getNetworkData().getProperties().isMultiPackager()
				|| (!StringUtil.isEmptyOrNull(adapterUiResponseWrapper.getSchemaData().getFileType())
						&& Constants.ADAPTER_FILE_TYPE_RESPONSE.toLowerCase()
								.equals(adapterUiResponseWrapper.getSchemaData().getFileType().toLowerCase())))
			adapterConfiguration.setResponsePackager(adapterDto.getAdapterConfiguration().get(0).getResponsePackager());
		else if (StringUtils.isEmpty(adapterConfiguration.getResponsePackager()))
			adapterConfiguration.setResponsePackager(null);

		if (null != adapterUiResponseWrapper.getNetworkData()
				&& null != adapterUiResponseWrapper.getNetworkData().getProperties()) {
			String properties = adapterDto.getAdapterConfiguration().get(0).getProperties();
			AdapterToolkitNetworkMapper.parseNetworkPropertiesJson(properties);
			if (StringUtil.isEmptyOrNull(adapterUiResponseWrapper.getSchemaData().getFileType())) {
				adapterConfiguration.setProperties(properties);
			}
		}
		if (flowName.contains(AdapterWrapperDtoMapper.TAB_TRANSFORM)) {
			adapterConfiguration.setRequestMapping(adapterDto.getAdapterConfiguration().get(0).getRequestMapping());
			adapterConfiguration.setResponseMapping(adapterDto.getAdapterConfiguration().get(0).getResponseMapping());
			adapterConfiguration.setImfLeg(adapterDto.getAdapterConfiguration().get(0).getImfLeg());
		}
		if (flowName.contains(AdapterWrapperDtoMapper.TAB_RESPONSE_CODE)) {
			adapterConfiguration.setResponseCode(adapterDto.getAdapterConfiguration().get(0).getResponseCode());
		}
		adapterConfiguration.setImfId(imfStructure);
		Integer version = getVersion(adapter, saveType);
		adapterConfiguration.setVersion(version);
		adapterConfiguration.setUpdatedBy(authSessionService.getCreatedBy());
		adapterConfiguration.setUpdatedOn(RippsUtility.getCurrentTimeStamp());
		adapterConfiguration.setStatus(AdapterWrapperDtoMapper.NON_SCHEDULED);
		adapterConfigurationList.addAll(adapter.getAdapterConfiguration());
		adapterConfigurationList.add(adapterConfiguration);

		adapter.setAdapterConfiguration(adapterConfigurationList);
		Adapter savedAdapter = adapterRepository.save(adapter);
		Integer adapterId;
		if (savedAdapter == null) {
			throw new RippsAdminException("Error in saving Adapter");
		} else {
			adapterId = savedAdapter.getId();
			saveBean(adapterId, version, adapterUiResponseWrapper, requestToken, saveType);
			logger.info("created successfully with Id:{}", adapterId);
		}
		AdapterConfiguration savedAdapterConfiguration = adapterConfigurationRepository
				.getConfigurationForVersion(adapterId, version);
		return savedAdapterConfiguration.getId();
	}

	@Transactional
	public Integer createAdapter(AdapterUiResponseWrapper adapterUiResponseWrapper, Adapter adapter,
			String requestToken, String saveType) {
		logger.info("inside createAdapter");
		Integer configId = null;
		AdapterDto adapterDto = AdapterWrapperDtoMapper.uiWrapperToDto(adapterUiResponseWrapper);

		List<AdapterConfiguration> adapterConfigurationList = new ArrayList<>();
		StandardMessageSpecification standardMessageSpecification = standardMessageSpecificationRepository
				.getStandardMessageSpecificationbyId(adapterDto.getStandardMessageSpecification().getId());
		String flowName = AdapterWrapperDtoMapper.getTabName(adapterUiResponseWrapper,
				AdapterWrapperDtoMapper.ACTION_NEW);
		AdapterWrapperDtoMapper.validateConfigurationData(flowName, adapterDto.getAdapterConfiguration().get(0),
				adapterUiResponseWrapper);
		ImfStructure imfStructure = getImf(adapterUiResponseWrapper, adapter.getId(), saveType);
		try {
			AdapterWrapperDtoMapper.getAdapterFromAdapterDto(adapter, adapterDto);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		adapter.setId(null);
		adapter.setType(adapterDto.getType());
		adapter.setStandardMessageSpecification(standardMessageSpecification);
		adapter.setAdapterId(adapter.getName().toLowerCase().replace(" ", "_"));
		adapter.setActive('1');
		adapter.setCreatedBy(authSessionService.getCreatedBy());
		adapter.setCreatedOn(RippsUtility.getCurrentTimeStamp());
		adapter.setAdapterConfiguration(adapter.getAdapterConfiguration());

		AdapterConfiguration adapterConfiguration = adapter.getAdapterConfiguration().get(0);
		if (adapterConfiguration != null) {
			updateAdapterConfiguration(adapterUiResponseWrapper, adapter, standardMessageSpecification, flowName,
					imfStructure, adapterConfiguration);
			Integer version = getVersion(adapter, saveType);
			adapterConfiguration.setVersion(version);
			adapterConfigurationList.add(adapterConfiguration);
			adapter.setAdapterConfiguration(adapterConfigurationList);
			Adapter savedAdapter = adapterRepository.save(adapter);
			Integer adapterId;
			if (savedAdapter == null) {
				throw new RippsAdminException("Error in saving Adapter");
			} else {
				adapterId = savedAdapter.getId();
				saveBean(adapterId, version, adapterUiResponseWrapper, requestToken, saveType);
				logger.info("created successfully with Id:{}", adapterId);
			}
			AdapterConfiguration savedAdapterConfiguration = adapterConfigurationRepository
					.getConfigurationForVersion(adapterId, version);
			configId = savedAdapterConfiguration.getId();
			logger.info("created successfully with config Id: {}", configId);

		} else {
			throw new RippsAdminException("Adapter data is not valid");
		}

		return configId;
	}

	private void updateAdapterConfiguration(AdapterUiResponseWrapper adapterUiResponseWrapper, Adapter adapter,
			StandardMessageSpecification standardMessageSpecification, String flowName, ImfStructure imfStructure,
			AdapterConfiguration adapterConfiguration) {

		if (null != adapterUiResponseWrapper.getSchemaData().getFileType()) {
			if (adapterConfiguration.getMessageSchemaPackager() == null && adapterUiResponseWrapper.getSchemaData()
					.getFileType().equalsIgnoreCase(Constants.ADAPTER_FILE_TYPE_REQUEST)) {
				if (adapterUiResponseWrapper.getSchemaData().getMessageSchemaPackager() != null)
					adapterConfiguration.setMessageSchemaPackager(
							adapterUiResponseWrapper.getSchemaData().getMessageSchemaPackager());
				else
					adapterConfiguration
							.setMessageSchemaPackager(standardMessageSpecification.getMessageSchemaPackager());
			}

			if (adapterConfiguration.getResponsePackager() == null && adapterUiResponseWrapper.getSchemaData()
					.getFileType().equalsIgnoreCase(Constants.ADAPTER_FILE_TYPE_RESPONSE)) {
				if (adapterUiResponseWrapper.getSchemaData().getResponsePackager() != null)
					adapterConfiguration
							.setResponsePackager(adapterUiResponseWrapper.getSchemaData().getResponsePackager());
				else
					adapterConfiguration.setResponsePackager(standardMessageSpecification.getMessageSchemaPackager());
			}
		} else {
			if (adapterConfiguration.getMessageSchemaPackager() == null) {
				if (adapterUiResponseWrapper.getSchemaData().getMessageSchemaPackager() != null) {
					adapterConfiguration.setMessageSchemaPackager(HTMLInjectionUtil.validateHTMLInjection(
							adapterUiResponseWrapper.getSchemaData().getMessageSchemaPackager()));
				} else {
					adapterConfiguration
							.setMessageSchemaPackager(standardMessageSpecification.getMessageSchemaPackager());
				}

			}

			if (null != adapterUiResponseWrapper.getNetworkData()
					&& null != adapterUiResponseWrapper.getNetworkData().getProperties()) {
				String properties = adapter.getAdapterConfiguration().get(0).getProperties();
				AdapterToolkitNetworkMapper.parseNetworkPropertiesJson(properties);
				adapterConfiguration.setProperties(properties);
			}

			if (!flowName.contains(AdapterWrapperDtoMapper.TAB_TRANSFORM)) {
				adapterConfiguration.setRequestMapping(null);
				adapterConfiguration.setResponseMapping(null);
				adapterConfiguration.setImfLeg(null);
			}
			if (!flowName.contains(AdapterWrapperDtoMapper.TAB_RESPONSE_CODE)) {
				adapterConfiguration.setResponseCode(null);
			}
		}
		adapterConfiguration.setImfId(imfStructure);

		adapterConfiguration.setAdapter(adapter);
		adapterConfiguration.setStatus(AdapterWrapperDtoMapper.NON_SCHEDULED);
		adapterConfiguration.setCreatedBy(authSessionService.getCreatedBy());
		adapterConfiguration.setCreatedOn(RippsUtility.getCurrentTimeStamp());

	}

	public Integer getVersion(Adapter adapter, String saveType) {
		logger.info("inside getVersion with saveType:{}", saveType);
		Integer version = null;
		if (AdapterWrapperDtoMapper.SAVETYPE_VERSIONIT.equalsIgnoreCase(saveType)) {
			version = adapterConfigurationRepository.getMaxVersionForAdaptor(adapter.getId());
			version = RippsUtility.getVersion(version);
			if (version == 0) {
				version = RippsUtility.getVersion(version);
			}
		} else {
			version = 0;
		}

		return version;
	}

	@Override
	public boolean validateAdapterName(String adapterName) {
		logger.info("Inside validateAdapterName: {}", adapterName);
		boolean existAdapter = false;
		if (StringUtil.isNotNullOrBlank(adapterName)) {
			adapterName = adapterName.trim();
			if (adapterName.length() > 0) {
				String regex = "^[a-zA-Z0-9_]*$";
				if (StringUtil.validateText(adapterName, regex)) {
					boolean validAdapterName = adapterRepository.validateName(adapterName);
					if (validAdapterName) {
						existAdapter = true;
					} else {
						throw new RippsAdminException(Constants.ADAPTER_AREADY_EXISTS);
					}
				} else {
					throw new RippsAdminException(Constants.INVALID_ADATPER_NAME);
				}
			} else {
				throw new RippsAdminException(Constants.INVALID_ADATPER_NAME);
			}
		} else {
			throw new RippsAdminException(Constants.INVALID_ADATPER_NAME);
		}
		return existAdapter;
	}

	@Override
	public ResponseWrapper getPagableAdapterUIList(Map<String, Object> requestParamMap, String adapterType) {
		logger.info("inside getPagableConfigUIList()...");
		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		List<AdapterSummaryUIWrapper> listUI = new ArrayList<>();
//		List<AdapterConfigurationDto> configDtoList=null;

		// Page<Adapter>
		// pageListAdapter=adapterRepository.getPagableAdapterListByType(adapterType,pageable);
		List<Object[]> pageListAdapter = adapterRepository.getCustomListByType(adapterType, pageable);
		// AdapterDto adapterDto=null;
		for (Object[] customAdapterListDto : pageListAdapter) {
			try {
				// adapterDto =
				// AdapterWrapperDtoMapper.convertAdapterToAdapterDtoWithAdapterConfiguration(adapter,
				// adapterDto);
				// configDtoList =
				// adapterConfigurationRepository.getConfigDtoListDescVesrionByAdapterId(adapter.getId());
				// adapterDto.setAdapterConfiguration(configDtoList);
				AdapterSummaryUIWrapper adapterListUiWrapper = AdapterWrapperDtoMapper
						.customSummaryUIWapper(customAdapterListDto);
				listUI.add(adapterListUiWrapper);
			} catch (Exception e) {
				logger.error("failed in getting config data : {}", ExceptionLog.printStackTraceToString(e));
			}
		}
		ResponseWrapper pageJPAData = JPAUtils.getResponseWrapperByList(requestParamMap, pageListAdapter);
		pageJPAData.setContent(listUI);
		pageJPAData.setTotalRecords(adapterRepository.getCount(adapterType));
		return pageJPAData;
	}

	@Override
	@Transactional
	public void deleteByConfigId(Integer id, String requestToken) {
		logger.info("deleteById: {}", id);
		AdapterConfiguration adapterConfiguration = adapterConfigurationRepository.getAdapterConfigurationById(id);
		if (adapterConfiguration == null) {
			throw new RippsAdminException("Adapter not found");
		}
		if (adapterConfiguration.getVersion() == 0) {
			Integer maxVersion = adapterConfigurationRepository
					.getMaxVersionForAdaptor(adapterConfiguration.getAdapter().getId());
			if (maxVersion > 0) {
				adapterConfigurationRepository.deleteById(id);
			} else if (maxVersion == 0) {
				adapterRepository.deleteById(adapterConfiguration.getAdapter().getId());
			}
			logger.info("record deleted successfully");
		} else {
			throw new RippsAdminException("Adapter with only '0' version can be deleted");
		}
	}

	public List<AdapterConfigurationDto> getAdapterConfigurationNotInDeployedComponentNew() {
		logger.info("findAllNotinDeployedComponentNew");
		List<AdapterConfigurationDto> adapterConfigurationListDto = new ArrayList<>();
		List<Object[]> result = adapterConfigurationRepository.findAllNotinDeployedComponentNew();
		if (result != null && !result.isEmpty()) {
			AdapterConfigurationDto adapterConfigurationDto = null;
			AdapterDto adapterDto = null;
			for (Object[] data : result) {
				adapterConfigurationDto = new AdapterConfigurationDto();
				adapterDto = new AdapterDto();
				adapterConfigurationDto.setId((Integer) data[0]);
				adapterDto.setName((String) data[1]);
				adapterDto.setType((String) data[2]);
				adapterConfigurationDto.setVersion((Integer) data[3]);
				adapterConfigurationDto.setStatus((String) data[4]);
				adapterConfigurationDto.setCreatedBy((Integer) data[5]);
				adapterConfigurationDto.setCreatedOn((Timestamp) data[6]);
				adapterConfigurationDto.setUpdatedBy((Integer) data[7]);
				adapterConfigurationDto.setUpdatedOn((Timestamp) data[8]);
				adapterConfigurationDto.setAdapter(adapterDto);
				adapterConfigurationListDto.add(adapterConfigurationDto);
			}
		}
		return adapterConfigurationListDto;
	}

	@Override
	public AdapterUiResponseWrapper getBeans(String adapterType, Integer adapterConfigurationId,
			AdapterUiResponseWrapper adapterUiResponseWrapper) {
		logger.info("getBeans");
		List<CustomBeanConfigurationUiWrapper> beans = null;
		beans = customBeanConfigurationService.findUiBeanListByTypeByComponentId(adapterType, adapterConfigurationId);
		adapterUiResponseWrapper = AdapterWrapperDtoMapper
				.setBeanDtoInAdapterUiResponseWrapper(adapterUiResponseWrapper, beans);
		return adapterUiResponseWrapper;
	}

	@Override
	public void saveBean(Integer adapterId, Integer version, AdapterUiResponseWrapper adapterUiResponseWrapper,
			String requestToken, String saveType) {
		logger.info("saveBean");
		Integer componentId = null;
		AdapterConfiguration adapterConfiguration = null;
		if (AdapterWrapperDtoMapper.SAVETYPE_VERSIONIT.equalsIgnoreCase(saveType)) {
			adapterConfiguration = adapterConfigurationRepository.getConfigurationForVersion(adapterId, version);
			if (adapterConfiguration != null) {
				componentId = adapterConfiguration.getId();
				String componentType = HTMLInjectionUtil
						.validateHTMLInjection(adapterUiResponseWrapper.getMasterData().getAdapterDto().getType());
				List<CustomBeanConfigurationDto> customBeanConfigurationList = AdapterWrapperDtoMapper
						.getBeanDtofromUiWrapper(adapterUiResponseWrapper);
				customBeanConfigurationService.createConfigurationList(customBeanConfigurationList, componentId,
						componentType, requestToken,
						adapterUiResponseWrapper.getNetworkData().getProperties().isSingleProperty());
			}
		}

	}

	@Override
	public List<AdapterDto> getL3ListForProcessorAdapter() {
		List<Adapter> adapterList = adapterRepository.getL3ListForProcessorAdapter();
		List<AdapterDto> adapterDtoList = null;
		AdapterDto adapterDto = null;
		if (adapterList != null && !adapterList.isEmpty()) {
			adapterDtoList = new ArrayList<>();
			for (Adapter adp : adapterList) {
				adapterDto = new AdapterDto();
				adapterDto.setId(adp.getId());
				adapterDto.setName(adp.getName());
				adapterDtoList.add(adapterDto);
			}

		}
		return adapterDtoList;
	}

	public AdapterUiResponseWrapper copyAdapterByConfigurationId(int id) {
		AdapterConfiguration adapterConfiguration = adapterConfigurationRepository.getAdapterConfigurationById(id);

		if (adapterConfiguration == null) {
			throw new RippsAdminException("Id not available");
		}
		AdapterDto adapterDto = AdapterWrapperDtoMapper.getAdapterDtoFromConfig(adapterConfiguration);
		AdapterUiResponseWrapper adapterUiResponseWrapper = AdapterWrapperDtoMapper
				.copyAdapterDtoToUiWrapper(adapterDto);
		adapterUiResponseWrapper = getBeans(adapterDto.getType(), id, adapterUiResponseWrapper);
		return adapterUiResponseWrapper;
	}

	@Transactional
	@Override
	public AdapterUiResponseWrapper copyAdapterByConfigurationId(String adapterName, Integer imfId,
			Integer configuraionId, String requestToken) {
		logger.info("copyAdapterByConfigurationId");
		validateAdapterName(adapterName);
		ImfStructureDto imfStructureDto = imfStructureService.findImfStructureDtoById(imfId);
		if (imfStructureDto == null) {
			throw new RippsAdminException("Invalid IMF");
		}
		AdapterUiResponseWrapper adapterUiResponseWrapper = copyAdapterByConfigurationId(configuraionId);
		AdapterDto adapterDto = adapterUiResponseWrapper.getMasterData().getAdapterDto();
		adapterDto.setName(adapterName);
		adapterUiResponseWrapper.getMasterData().setAdapterDto(adapterDto);
		adapterUiResponseWrapper.setImfId(imfStructureDto);
		Integer id = draftAdapter(adapterUiResponseWrapper, requestToken);
		logger.info("Adapter drafted for id:{}", id);
		adapterUiResponseWrapper = findAdapterByConfigurationId(id);
		return adapterUiResponseWrapper;
	}

	@Override
	public AdapterUiResponseWrapper convertAdapterUiData(AdapterUiResponseWrapper adapterUiResponseWrapper,
			String requestToken) {
		logger.info("inside convertAdapterUiData");
		String templateName = HTMLInjectionUtil.validateHTMLInjection(adapterUiResponseWrapper.getMasterData()
				.getAdapterDto().getStandardMessageSpecification().getMessageStandard().getValue());
		List<String> transformExcludedFieldList = adapterToolKitTransformService.getFieldExcludedList(templateName);
		AdapterWrapperDtoMapper.convertAdapterUiData(adapterUiResponseWrapper, transformExcludedFieldList);
		return adapterUiResponseWrapper;
	}

	private ImfStructure getImf(AdapterUiResponseWrapper adapterUiResponseWrapper, Integer adapterId, String saveType) {
		logger.info("inside getImf() for adapterID :{} and saveType:{}", adapterId, saveType);
		ImfStructure imfStructure = null;
		ImfStructureDto imfStructureDto = adapterUiResponseWrapper.getImfId() != null
				? adapterUiResponseWrapper.getImfId()
				: imfStructureService.findMaxVersionImfStructure();

		if (imfStructureDto.getId() != null) {
			imfStructure = imfStructureService.findImfStructureById(imfStructureDto.getId());
			if (imfStructure == null) {
				throw new RippsAdminException("Incorrect IMF detail");
			}
		}
		return imfStructure;
	}

	@Override
	public List<AdapterTransformData> convertPackagerData(BNTPackager bntPackager) {
		logger.info("inside convertPackagerData()..");
		return AdapterFieldsMapper.processBNTPackager(bntPackager);
	}

	@Override
	public ResponseWrapper getCompTypeListForAdapter(Map<String, Object> requestParamMap, String compType) {
		logger.info("inside getCompTypeListForAdapter()...");
		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		List<NameVersionListDto> list = new ArrayList<>();
		List<Integer> version = new ArrayList<>();

		List<Object[]> pageListAdapter = adapterRepository.getDetailListByCompType(compType, pageable);
		for (Object[] customAdapterListDto : pageListAdapter) {
			try {
				if (compType.equalsIgnoreCase("IMF")) {
					// NameVersionListDto adapterList =
					// AdapterWrapperDtoMapper.customListDtoIMF(customAdapterListDto);
					String x = customAdapterListDto[2].toString();
					version.add(Integer.parseInt(x));
				} else {
					NameVersionListDto adapterList1 = AdapterWrapperDtoMapper.customListDto(customAdapterListDto);
					list.add(adapterList1);
				}

			} catch (Exception e) {
				logger.error("failed in getting config data : {}", ExceptionLog.printStackTraceToString(e));
			}
		}
		if (!version.isEmpty() && compType.equalsIgnoreCase("IMF")) {
			NameVersionListDto adapterList = new NameVersionListDto();
			adapterList.setType(compType);
			adapterList.setName(compType);
			adapterList.setVersions(version);
			list.add(adapterList);
		}
		ResponseWrapper pageJPAData = JPAUtils.getResponseWrapperByList(requestParamMap, pageListAdapter);
		pageJPAData.setContent(list);
		return pageJPAData;
	}

	@Override
	public ResponseWrapper getCompTypeJsonPropListForAdapter(Map<String, Object> requestParamMap,
			JsonDataCompListDto jsonDataCompListDto) {
		logger.info("inside getCompTypeListForAdapter()...");
		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		DifferenceResponseDto finalDto = new DifferenceResponseDto();
		finalDto.setType(jsonDataCompListDto.getType());
		finalDto.setSubtype(jsonDataCompListDto.getSubtype());
		List<Object[]> pageListAdapter = adapterRepository.getJsonDataByType(jsonDataCompListDto, pageable);
		for (Object[] customAdapterListDto : pageListAdapter) {
			try {
				finalDto.getJsondata().add(AdapterWrapperDtoMapper.customJsonListDto(customAdapterListDto));
			} catch (Exception e) {
				logger.error("failed in getting config data : {}", ExceptionLog.printStackTraceToString(e));
			}
		}
		ResponseWrapper pageJPAData = JPAUtils.getResponseWrapperByList(requestParamMap, pageListAdapter);
		pageJPAData.setContent(finalDto);
		return pageJPAData;
	}

}
