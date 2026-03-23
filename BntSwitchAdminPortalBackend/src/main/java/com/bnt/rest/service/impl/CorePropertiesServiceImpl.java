package com.bnt.rest.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.bnt.bswitch.shared.lib.common.properties.conf.PropertyNames;
import com.bnt.bswitch.shared.lib.common.properties.conf.SystemProperties;
import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.RippsUtility;
import com.bnt.common.util.StringUtil;
import com.bnt.common.util.exception.ExceptionLog;
import com.bnt.constant.Constants;
import com.bnt.rest.dto.CorePropertiesDto;
import com.bnt.rest.dto.DefaultCorePropertiesDto;
import com.bnt.rest.dto.PublishCorePropertiesDto;
import com.bnt.rest.entity.AuthSession;
import com.bnt.rest.entity.CoreProperties;
import com.bnt.rest.entity.CorePropertiesDetails;
import com.bnt.rest.jpa.repository.CorePropertiesDetailsHelper;
import com.bnt.rest.jpa.repository.CorePropertiesHelper;
import com.bnt.rest.service.impl.AuthSessionService;
import com.bnt.rest.repository.CorePropertiesDetailsRepository;
import com.bnt.rest.repository.CorePropertiesRepository;
import com.bnt.rest.service.CorePropertiesService;
import com.bnt.rest.wrapper.dto.CorePropertiesWrapperDto;
import com.bnt.rest.wrapper.dto.IdAndVersionWrapper;
import com.bnt.rest.wrapper.dto.PropertiesDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class CorePropertiesServiceImpl implements CorePropertiesService {

	private static final Logger logger = LogManager.getLogger(CorePropertiesServiceImpl.class);

	@Autowired
	private AuthSessionService authSessionService;

	@Autowired
	private CorePropertiesRepository corePropertiesRepository;

	@Autowired
	private CorePropertiesDetailsRepository corePropertiesDetailsRepository;

	@Autowired
	private CorePropertiesHelper corePropertiesHelper;

	@Autowired
	private CorePropertiesDetailsHelper corePropertiesDetailsHelper;

	@Value("${bean.tab.hide}")
	private String beanTabDisplayDisable;

	@Override
	public List<DefaultCorePropertiesDto> getDefaultProperties() {

		List<DefaultCorePropertiesDto> defautpropertiesList = new ArrayList<>();
		List<SystemProperties> componentPropList = null;
		componentPropList = PropertyNames.ComponentProperties.S2_CORE.getProperties();
		if (componentPropList != null && !componentPropList.isEmpty()) {
			for (SystemProperties properties : componentPropList) {
				DefaultCorePropertiesDto dto = new DefaultCorePropertiesDto();
				String name = properties.getName();
				dto.setField(name);
				if (name.contains(".")) {
					dto.setLabel(properties.getName().replace('.', ' '));
				} else {
					dto.setLabel(properties.getName());
				}
				dto.setHidden(false);

				dto.setFormat("");
				dto.setListvalues(null);
				dto.setFileName(null);
				dto.setIsEditable(true);
				if (properties.getDefaultValue() != null) {
					dto.setValue(properties.getDefaultValue().toString());
				}
				if (properties.getClazz1().isAssignableFrom(Integer.class)) {
					dto.setDatatype("Integer");
				} else if (properties.getClazz1().isAssignableFrom(String.class)) {
					dto.setDatatype("String");
				} else if (properties.getClazz1().isAssignableFrom(Long.class)) {
					dto.setDatatype("Long");
				} else if (properties.getClazz1().isAssignableFrom(List.class)) {
					dto.setDatatype("List");
				} else if (properties.getClazz1().isAssignableFrom(Map.class)) {
					dto.setDatatype("Map");
				} else if (properties.getClazz1().isAssignableFrom(Boolean.class)) {
					dto.setDatatype("Boolean");
				}
				defautpropertiesList.add(dto);
			}
		}

		return defautpropertiesList;
	}

	@Transactional
	@Override
	public Integer draftCoreProperties(CorePropertiesWrapperDto responseWrapper, String requestToken) {
		logger.info("inside draftCoreProperties()...");
		CoreProperties coreProperties = null;
		Integer corePropertiesId = null;
		boolean validAdapterName = true;

		if (responseWrapper.getName() != null && !"".equalsIgnoreCase(responseWrapper.getName())
				&& !"null".equalsIgnoreCase(responseWrapper.getName())) {
			validAdapterName = corePropertiesRepository.validateName(responseWrapper.getName());
		} else {
			throw new RippsAdminException("Name is mandatory");
		}
		if (responseWrapper.getId() != null) {
			corePropertiesId = updateCoreProperties(responseWrapper, coreProperties, requestToken,
					CorePropertiesWrapperDto.SAVETYPE_DRAFT);
		} else {
			if (validAdapterName) {
				coreProperties = new CoreProperties();
				corePropertiesId = createCoreProperties(responseWrapper, coreProperties, requestToken,
						CorePropertiesWrapperDto.SAVETYPE_DRAFT);
			} else {
				throw new RippsAdminException(Constants.COREPROPERTY_EXISTS);
			}

		}

		return corePropertiesId;
	}

	@Transactional
	public Integer createCoreProperties(CorePropertiesWrapperDto corePropertiesWrapperDto,
			CoreProperties coreProperties, String requestToken, String saveType) {
		CoreProperties savedcodeID = null;

		coreProperties.setType(corePropertiesWrapperDto.getType());
		coreProperties.setName(corePropertiesWrapperDto.getName());
		coreProperties.setSubType(corePropertiesWrapperDto.getSubType());
		coreProperties.setCreatedBy(authSessionService.getCreatedBy());
		coreProperties.setCreatedOn(RippsUtility.getCurrentTimeStamp());
		CorePropertiesDetails corePropertiesDetails = new CorePropertiesDetails();
		List<CorePropertiesDetails> corePropertiesDetailsList = new ArrayList<>();

//		Gson gson = new Gson();
		Gson gson = new GsonBuilder().serializeNulls().create();
		coreProperties.setCreatedOn(RippsUtility.getCurrentTimeStamp());
		String jsonCartList = gson.toJson(corePropertiesWrapperDto.getProperties());
		corePropertiesDetails.setProperties(jsonCartList);

		corePropertiesDetails.setCreatedBy(authSessionService.getCreatedBy());
		corePropertiesDetails.setCreatedOn(RippsUtility.getCurrentTimeStamp());
		if (Boolean.TRUE.equals(corePropertiesWrapperDto.getSaveDraft())) {
			corePropertiesDetails.setVersion(0);
		} else {
			corePropertiesDetails.setVersion(1);
		}
		corePropertiesDetails.setCoreProperties(coreProperties);
		corePropertiesDetailsList.add(corePropertiesDetails);
		coreProperties.setCorePropertiesDetails(corePropertiesDetailsList);
		try {
			savedcodeID = corePropertiesRepository.save(coreProperties);
		} catch (Exception e) {
			logger.error(ExceptionLog.printStackTraceToString(e));
			throw new RippsAdminException("Error in saving CoreProperties");
		}

		return savedcodeID.getId();
	}

	public Integer getVersion(Integer id) {
		logger.info("inside getVersion with saveType:{}");
		return corePropertiesDetailsRepository.getMaxVersionForCoreProperties(id);
	}

	@Override
	public ResponseWrapper getAllCoreProperties(Map<String, Object> requestParamMap) {
		// TODO Auto-generated method stub
		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		Page<CoreProperties> corePropertiesPage = corePropertiesHelper.findAll(pageable);
		long count = corePropertiesHelper.count();
		ResponseWrapper pageJPAData = JPAUtils.getResponseWrapperByPage(corePropertiesPage, count);
		pageJPAData.setContent(corePropertiesPage.getContent().stream().map(this::setCorePropertiesDto).toList());
		return pageJPAData;

	}

	private CorePropertiesDto setCorePropertiesDto(CoreProperties coreProperties) {
		CorePropertiesDto dto = new CorePropertiesDto();
		dto.setCorePropertyId(coreProperties.getId());
		dto.setName(coreProperties.getName());
		dto.setSubType(coreProperties.getSubType());
		dto.setType(coreProperties.getType());
		List<IdAndVersionWrapper> corePropertyDetailUIWapper = new ArrayList<>();
		for (CorePropertiesDetails corePropertiesDetails : coreProperties.getCorePropertiesDetails()) {
			IdAndVersionWrapper idAndVersionWrapper = new IdAndVersionWrapper();
			idAndVersionWrapper.setId(corePropertiesDetails.getId());
			idAndVersionWrapper.setVersion(corePropertiesDetails.getVersion());
			corePropertyDetailUIWapper.add(idAndVersionWrapper);
		}
		dto.setCorePropertiesDetails(corePropertyDetailUIWapper);
		return dto;
	}

	@Override
	public CorePropertiesWrapperDto findCorePropertiesById(int id) {
		logger.info("inside findCorePropertiesById()...");
		CoreProperties coreProperties = null;
		PropertiesDto participantJson = new PropertiesDto();
		CorePropertiesWrapperDto corePropertiesWrapperDto = new CorePropertiesWrapperDto();
		CorePropertiesDetails corePropertiesDetails = corePropertiesDetailsRepository.findById(id);
		if (corePropertiesDetails != null) {
			coreProperties = corePropertiesRepository
					.findCorePropertiesById(corePropertiesDetails.getCoreProperties().getId());
		}

		if (coreProperties != null) {
			corePropertiesWrapperDto.setSubType(coreProperties.getSubType());
			corePropertiesWrapperDto.setType(coreProperties.getType());
			corePropertiesWrapperDto.setName(coreProperties.getName());
			corePropertiesWrapperDto.setId(corePropertiesDetails.getCoreProperties().getId());
			corePropertiesWrapperDto.setVersion(corePropertiesDetails.getVersion());
			ObjectMapper mapper = new ObjectMapper();

			try {
				participantJson = mapper.readValue(corePropertiesDetails.getProperties(),
						new TypeReference<PropertiesDto>() {
						});
			} catch (JsonProcessingException e) {
				throw new RippsAdminException("Error in CoreProperties json parser");
			}

			Map<String, SystemProperties> map = new HashMap<>();

			for (SystemProperties systemProperty : SystemProperties.values()) {
				map.put(systemProperty.getName(), systemProperty);
			}
			for (DefaultCorePropertiesDto defaultCorePropertiesDto : participantJson.getCore()) {
				if (map.get(defaultCorePropertiesDto.getField()) != null) {
					SystemProperties props = map.get(defaultCorePropertiesDto.getField());
					defaultCorePropertiesDto.setIsEditable(props.isEditable());
				} else {
					defaultCorePropertiesDto.setIsEditable(true);
				}
			}
		}

		corePropertiesWrapperDto.setProperties(participantJson);

		return corePropertiesWrapperDto;
	}

	@Override
	public List<PublishCorePropertiesDto> getPublishCoreProperties() {
		logger.info("inside getPublishCoreProperties");
		corePropertiesDetailsRepository.getPublishCoreProperties();
		List<CoreProperties> corePropertiesList = corePropertiesHelper.findAll();
		List<PublishCorePropertiesDto> publishCorePropertiesDto = new ArrayList<>();
		for (CoreProperties cp : corePropertiesList) {
			List<CorePropertiesDetails> corePropertiesDetailsList = cp.getCorePropertiesDetails();
			for (CorePropertiesDetails properties : corePropertiesDetailsList) {
				PublishCorePropertiesDto publishCoreProperties = new PublishCorePropertiesDto();
				if (properties.getVersion() != 0) {
					publishCoreProperties.setId(properties.getId());
					publishCoreProperties.setCorePropertiesName(cp.getName() + "_" + properties.getVersion());
					publishCorePropertiesDto.add(publishCoreProperties);
				}
			}
		}

		return publishCorePropertiesDto;
	}

	public Integer updateCoreProperties(CorePropertiesWrapperDto corePropertiesWrapperDto,
			CoreProperties coreProperties, String requestToken, String saveType) {
		CorePropertiesDetails savedcodeID = null;

		CorePropertiesDetails corePropertiesDetailsVersion = corePropertiesDetailsRepository
				.findById(corePropertiesWrapperDto.getId());
//		CoreProperties corePropertiessave = corePropertiesRepository.findCorePropertiesById(corePropertiesDetailsVersion.getCoreProperties().getId());
		if (corePropertiesDetailsVersion != null && corePropertiesDetailsVersion.getVersion() == 0) {

			Gson gson = new Gson();
			String jsonCartList = gson.toJson(corePropertiesWrapperDto.getProperties());
			corePropertiesDetailsVersion.setProperties(jsonCartList);
			if (Boolean.TRUE.equals(corePropertiesWrapperDto.getSaveDraft())) {
				corePropertiesDetailsVersion.setUpdatedBy(authSessionService.getCreatedBy());
				corePropertiesDetailsVersion.setUpdatedOn(RippsUtility.getCurrentTimeStamp());
				corePropertiesDetailsVersion.setVersion(0);
			} else {
				Integer version = getVersion(corePropertiesDetailsVersion.getCoreProperties().getId());
				corePropertiesDetailsVersion.setVersion(version + 1);
				corePropertiesDetailsVersion.setUpdatedBy(authSessionService.getCreatedBy());
				corePropertiesDetailsVersion.setUpdatedOn(RippsUtility.getCurrentTimeStamp());
			}
			// corePropertiesDetails.setCoreProperties(coreProperties);
			// coreProperties.setCorePropertiesDetails(corePropertiesDetailsList);
			try {
				savedcodeID = corePropertiesDetailsHelper.save(corePropertiesDetailsVersion);
			} catch (Exception e) {
				logger.error(ExceptionLog.printStackTraceToString(e));
				throw new RippsAdminException("Error in saving CoreProperties");
			}
		} else if (corePropertiesDetailsVersion != null) {
			CorePropertiesDetails corePropertiesDetails = null;
			if (Boolean.TRUE.equals(corePropertiesWrapperDto.getSaveDraft())) {
				corePropertiesDetails = corePropertiesDetailsHelper
						.getZoreVersion(corePropertiesDetailsVersion.getCoreProperties().getId(), 0);
				if (corePropertiesDetails == null) {
					corePropertiesDetails = new CorePropertiesDetails();
				}
				corePropertiesDetails.setVersion(0);
			} else {
				corePropertiesDetails = new CorePropertiesDetails();
				Integer version = getVersion(corePropertiesDetailsVersion.getCoreProperties().getId());
				corePropertiesDetails.setVersion(version + 1);
			}
			Gson gson = new Gson();
			String jsonCartList = gson.toJson(corePropertiesWrapperDto.getProperties());
			corePropertiesDetails.setProperties(jsonCartList);

			corePropertiesDetails.setCreatedBy(authSessionService.getCreatedBy());
			corePropertiesDetails.setCreatedOn(RippsUtility.getCurrentTimeStamp());
			corePropertiesDetails.setCoreProperties(corePropertiesDetailsVersion.getCoreProperties());
			try {
				savedcodeID = corePropertiesDetailsHelper.save(corePropertiesDetails);
			} catch (Exception e) {
				logger.error(ExceptionLog.printStackTraceToString(e));
				throw new RippsAdminException("Error in saving CoreProperties");
			}
		}

		return (savedcodeID != null ? savedcodeID.getId() : 0);
	}

	@Override
	public boolean validateCorePropertiesName(String corePropertiesName) {
		logger.info("Inside validateCorePropertiesName: {}", corePropertiesName);
		boolean existCoreProperties = false;
		if (StringUtil.isNotNullOrBlank(corePropertiesName)) {
			corePropertiesName = corePropertiesName.trim();
			String regex = "^[a-zA-Z0-9_]*$";
			if (StringUtil.validateText(corePropertiesName, regex)) {
				boolean validAdapterName = corePropertiesRepository.validateName(corePropertiesName);
				if (validAdapterName) {
					existCoreProperties = true;
				} else {
					throw new RippsAdminException(Constants.COREPROPERTY_EXISTS);
				}
			} else {
				throw new RippsAdminException(Constants.INVALID_COREPROPERTY_NAME);
			}
		} else {
			throw new RippsAdminException(Constants.INVALID_COREPROPERTY_NAME);
		}
		return existCoreProperties;
	}

	@Override
	@Transactional
	public void deleteByCorePropertiesDetailsId(Integer id, String requestToken) {
		logger.info("deleteById: {}", id);
		CorePropertiesDetails corePropertiesDetails = corePropertiesDetailsRepository.findById(id);
		if (corePropertiesDetails == null) {
			throw new RippsAdminException("core property not found");
		}
		if (corePropertiesDetails.getVersion() == 0) {
			Integer maxVersion = getVersion(corePropertiesDetails.getCoreProperties().getId());
			if (maxVersion > 0) {
				corePropertiesDetailsRepository.deleteById(id);
			} else if (maxVersion == 0) {
				corePropertiesRepository.deleteById(corePropertiesDetails.getCoreProperties().getId());
			}
			logger.info("record deleted successfully");
		} else {
			throw new RippsAdminException("ore property  with only '0' version can be deleted");
		}
	}

}
