package com.bnt.service.mapper;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.w3c.dom.Document;

import com.bnt.common.util.XmlObjectUtil;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.CustomBeanConfigurationDto;
import com.bnt.rest.dto.SystemBeanConfigurationDto;
import com.bnt.rest.dto.uiwrapper.CustomBeanConfigurationUiWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class BeanConfigurationMapper {

	private static Log logger = LogFactory.getLog(BeanConfigurationMapper.class);

	private BeanConfigurationMapper() {
	}

	public static Boolean isModifiedConfiguartionFileContent(String standardFileContent, String customFileContent,
			String fileType) {
		logger.info("inside isModifiedConfiguartionFileContent");
		logger.info("file:" + fileType);

		Boolean isModified = true;
		if (fileType.toUpperCase().contains(".XML")) {
			Integer standardFileContentHashCode = xmlHashCode(standardFileContent);
			Integer customFileContentHashCode = xmlHashCode(customFileContent + " ");
			logger.info("standardFileContentHashCode:" + standardFileContentHashCode);
			logger.info("customFileContentHashCode:" + customFileContentHashCode);
			if (standardFileContentHashCode.equals(customFileContentHashCode)) {
				isModified = false;
			} else {
				isModified = true;
			}
		}
		return isModified;
	}

	public static Integer xmlHashCode(String xmlFileContent) {
		Integer hashcode = null;
		InputStream inputStream = new ByteArrayInputStream(xmlFileContent.getBytes(StandardCharsets.UTF_8));
		Document xmlDocument = XmlObjectUtil.getXmlDocumentFromInputStream(inputStream);
		String xmlStr = XMLtoJsonSchemaMapper.xmlToString(xmlDocument);
		hashcode = xmlStr.hashCode();
		return hashcode;
	}

	public static List<CustomBeanConfigurationDto> customUiWrapperToCustomDto(
			List<CustomBeanConfigurationUiWrapper> wrapperList) {
		logger.info("Inside customUiWrapperToCustomDto with size:" + wrapperList.size());
		List<CustomBeanConfigurationDto> dtoList = null;
		if (!wrapperList.isEmpty()) {
			dtoList = ObjectMapper.mapListObjectToListDto(wrapperList, CustomBeanConfigurationDto.class);
		}
		return dtoList;
	}

	public static List<CustomBeanConfigurationUiWrapper> customDtoToCustomUiWrapper(
			List<CustomBeanConfigurationDto> dtoList) {
		logger.info("Inside customDtoToCustomUiWrapper with size:" + dtoList.size());
		List<CustomBeanConfigurationUiWrapper> wrapperList = null;
		if (!dtoList.isEmpty()) {
			wrapperList = ObjectMapper.mapListObjectToListDto(dtoList, CustomBeanConfigurationUiWrapper.class);
		}
		return wrapperList;
	}

	public static List<CustomBeanConfigurationUiWrapper> customUiWrapperFromSystemBeanConfigurationDto(
			List<SystemBeanConfigurationDto> dtoList) {
		logger.info("Inside customDtoToCustomUiWrapper with size:" + dtoList.size());
		List<CustomBeanConfigurationUiWrapper> wrapperList = null;
		if (!dtoList.isEmpty()) {
			wrapperList = ObjectMapper.mapListObjectToListDto(dtoList, CustomBeanConfigurationUiWrapper.class);
		}
		return wrapperList;
	}

	public static List<CustomBeanConfigurationDto> enrichDtoWithComponentId(
			List<CustomBeanConfigurationDto> dtoListToEnrich, Integer componentId) {
		logger.info("Inside enrichDtoWithComponentId with size:" + dtoListToEnrich.size());
		List<CustomBeanConfigurationDto> dtoList = null;
		if (!dtoListToEnrich.isEmpty()) {
			for (CustomBeanConfigurationDto customBeanConfigurationDto : dtoListToEnrich) {
				customBeanConfigurationDto.setComponentId(componentId);
				if (dtoList == null) {
					dtoList = new ArrayList<>();
				}
				dtoList.add(customBeanConfigurationDto);
			}
		}
		return dtoList;
	}

	public static List<CustomBeanConfigurationDto> filterListToSave(List<CustomBeanConfigurationDto> customList,
			List<SystemBeanConfigurationDto> sysList, boolean isSingleProperty) {
		Map<String, SystemBeanConfigurationDto> sysBeanMap = getSysBeanMap(sysList);
		String key = "";
		SystemBeanConfigurationDto sysBean = null;
		List<CustomBeanConfigurationDto> newCustomList = null;
		for (CustomBeanConfigurationDto customBean : customList) {
			key = customBean.getComponentType() + "~" + customBean.getFileType();
			sysBean = sysBeanMap.get(key);
			if (Boolean.TRUE.equals(isModifiedConfiguartionFileContent(
					(isSingleProperty ? sysBean.getFileContentSingle() : sysBean.getFileContent()),
					(isSingleProperty ? customBean.getFileContentSingle() : customBean.getFileContent()),
					customBean.getFileName()))) {
				if (newCustomList == null) {
					newCustomList = new ArrayList<>();
				}
				newCustomList.add(customBean);
			}
		}

		return newCustomList;
	}

	public static Map<String, SystemBeanConfigurationDto> getSysBeanMap(List<SystemBeanConfigurationDto> sysList) {
		Map<String, SystemBeanConfigurationDto> sysBeanMap = new HashMap<>();
		String key = "";
		for (SystemBeanConfigurationDto sysBean : sysList) {
			key = sysBean.getComponentType() + "~" + sysBean.getFileType();
			sysBeanMap.put(key, sysBean);
		}
		return sysBeanMap;
	}

	public static List<CustomBeanConfigurationUiWrapper> mergeSystemAndCustomBean(
			List<CustomBeanConfigurationUiWrapper> wrapperList, List<SystemBeanConfigurationDto> sysList) {
		Map<String, SystemBeanConfigurationDto> sysBeanMap = getSysBeanMap(sysList);
		String key = "";
		if (wrapperList == null) {
			wrapperList = new ArrayList<>();
		}
		for (CustomBeanConfigurationUiWrapper custBean : wrapperList) {
			key = custBean.getComponentType() + "~" + custBean.getFileType();
			sysBeanMap.remove(key);
		}
		List<SystemBeanConfigurationDto> sysListToadd = new ArrayList<>();
		sysListToadd.addAll(sysBeanMap.values());
		List<CustomBeanConfigurationUiWrapper> customBeanConfigurationUiWrapperList = BeanConfigurationMapper
				.customUiWrapperFromSystemBeanConfigurationDto(sysListToadd);
		wrapperList.addAll(customBeanConfigurationUiWrapperList);
		return wrapperList;
	}
}
