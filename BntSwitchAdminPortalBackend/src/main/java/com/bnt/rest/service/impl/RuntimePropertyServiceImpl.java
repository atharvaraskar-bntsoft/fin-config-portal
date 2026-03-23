package com.bnt.rest.service.impl;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import org.apache.commons.configuration.PropertiesConfiguration;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.bnt.bswitch.shared.lib.common.properties.conf.SystemProperties;
import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.FileUtil;
import com.bnt.common.util.exception.ExceptionLog;
import com.bnt.rest.dto.PropertyFileContentDto;
import com.bnt.rest.dto.RuntimePropertyFileDto;
import com.bnt.rest.service.RuntimePropertyService;
import com.bnt.rest.wrapper.dto.PropertyFileWrapperDto;
import com.bnt.service.mapper.PropertyFileMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class RuntimePropertyServiceImpl implements RuntimePropertyService {

	private static final String DELIMITER = "/";

	private static final String FILE_NAME = "File Name:{}";

	private static final String INCORRECT_PATH = "Incorrect Path";

	private static Log logger = LogFactory.getLog(RuntimePropertyServiceImpl.class);

	@Value("${runtime.property.file.location}")
	private String path;

	public static final String ROOT = "root";

	@Override
	public ResponseWrapper getFolderList() {
		File files = null;
		try {
			files = new File(FileUtil.cleanString(FilenameUtils.normalize(path)));
			logger.info("root path:{} " + path);
		} catch (Exception e) {
			logger.error(ExceptionLog.printStackTraceToString(e));

		}
		if (files == null) {
			throw new RippsAdminException(INCORRECT_PATH);
		}
		logger.info("path of the folder:{}" + files.getPath());
		List<RuntimePropertyFileDto> runtimePropertyFileDtoList = new ArrayList<>();
		ResponseWrapper pageJPAData = new ResponseWrapper();
		pageJPAData.setContent(getFolderDirectory(files.getPath(), files, runtimePropertyFileDtoList));
		return pageJPAData;

	}

	private void getPropertyFileContent(String prefixPath, File file, RuntimePropertyFileDto runtimePropertyFileDto,
			List<RuntimePropertyFileDto> runtimePropertyFileDtoList) {
		runtimePropertyFileDto.setName(file.getName());
		runtimePropertyFileDto.setIsFolder(false);

		runtimePropertyFileDto.setPath(file.getPath().replace(prefixPath, ""));
		if (file.getParent().equalsIgnoreCase(prefixPath)) {
			runtimePropertyFileDto.setParent(ROOT);
		} else {
			runtimePropertyFileDto.setParent(file.getParentFile().getName());
		}
		runtimePropertyFileDtoList.add(runtimePropertyFileDto);
	}

	private void getDataInPropertyFileDto(String prefixPath, File file, RuntimePropertyFileDto runtimePropertyFileDto,
			List<RuntimePropertyFileDto> runtimePropertyFileDtoList) {
		runtimePropertyFileDto.setName(file.getName());
		runtimePropertyFileDto.setIsFolder(true);
		runtimePropertyFileDto.setPath(file.getPath().replace(prefixPath, ""));
		if (file.getParent().equalsIgnoreCase(prefixPath)) {
			runtimePropertyFileDto.setParent(ROOT);
		} else {
			runtimePropertyFileDto.setParent(file.getParentFile().getName());
		}
		runtimePropertyFileDtoList.add(runtimePropertyFileDto);
	}

	private List<RuntimePropertyFileDto> getFolderDirectory(String prefixPath, File files,
			List<RuntimePropertyFileDto> runtimePropertyFileDtoList) {
		if (files != null && files.isDirectory()) {
			RuntimePropertyFileDto runtimePropertyFileDto = null;
			for (File file : files.listFiles()) {
				runtimePropertyFileDto = new RuntimePropertyFileDto();
				if (file.isDirectory()) {
					getDataInPropertyFileDto(prefixPath, file, runtimePropertyFileDto, runtimePropertyFileDtoList);
					getFolderDirectory(prefixPath, file, runtimePropertyFileDtoList);

				} else if (file.getName().contains(".")
						&& file.getName().substring(file.getName().lastIndexOf("."), file.getName().length())
								.equalsIgnoreCase(".properties")) {
					getPropertyFileContent(prefixPath, file, runtimePropertyFileDto, runtimePropertyFileDtoList);
				}

			}
		}
		return runtimePropertyFileDtoList;
	}

	@Override
	public PropertyFileWrapperDto getPropertyFileContent(PropertyFileWrapperDto propertyFileWrapperDto) {
		String fileName;
		File files = null;
		try {
			files = new File(FileUtil.cleanString(FilenameUtils.normalize(path)));
			logger.info("root path: {}" + path);
		} catch (Exception e) {
			logger.error(ExceptionLog.printStackTraceToString(e));

		}
		if (files == null) {
			throw new RippsAdminException(INCORRECT_PATH);
		}
		String path2 = files.getPath();
		logger.info("root path :{}" + path2);
		if (propertyFileWrapperDto.getFileName() == null || propertyFileWrapperDto.getParentPath() == null) {
			throw new RippsAdminException(INCORRECT_PATH);
		} else if (propertyFileWrapperDto.getParentPath().equalsIgnoreCase(ROOT)) {
			fileName = path2 + DELIMITER + propertyFileWrapperDto.getFileName();
			logger.info(FILE_NAME + fileName);
		} else {
			fileName = path2 + propertyFileWrapperDto.getParentPath() + DELIMITER
					+ propertyFileWrapperDto.getFileName();
			logger.info(FILE_NAME + fileName);
		}
		try {
			PropertyFileContentDto propertyFileContentDto = null;
			List<PropertyFileContentDto> propertyFileContentDtoList = new ArrayList<>();
			Properties properties = new Properties();
			fileName = FilenameUtils.normalize(fileName);
			extracted(fileName, properties);
			Enumeration<Object> enuKeys = properties.keys();

			Map<String, SystemProperties> map = new HashMap<>();

			for (SystemProperties systemProperty : SystemProperties.values()) {
				map.put(systemProperty.getName(), systemProperty);
			}
			while (enuKeys.hasMoreElements()) {
				propertyFileContentDto = new PropertyFileContentDto();
				String key = (String) enuKeys.nextElement();
				String value = properties.getProperty(key);
				propertyFileContentDto.setKey(key);
				propertyFileContentDto.setModified(false);
				propertyFileContentDto.setValue(value);
				propertyFileContentDto.setLabel(key);

				if (map.get(key) != null) {
					SystemProperties props = map.get(key);
					propertyFileContentDto.setDefaultValue(props.getDefaultValue());
					propertyFileContentDto.setIsEditable(props.isEditable());
					propertyFileContentDto.setDataType(props.getClazz1());
				} else {
					propertyFileContentDto.setIsEditable(false);
				}
				propertyFileContentDtoList.add(propertyFileContentDto);
			}
			propertyFileWrapperDto.setPropertyList(propertyFileContentDtoList);
		} catch (IOException e) {
			logger.error(ExceptionLog.printStackTraceToString(e));
		}

		return propertyFileWrapperDto;
	}

	private void extracted(String fileName, Properties properties) throws IOException {
		File file = new File(FileUtil.cleanString(FilenameUtils.normalize(fileName)));
		try (FileInputStream fileInput = new FileInputStream(file)) {
			properties.load(fileInput);
		} catch (IOException e) {
			logger.error(ExceptionLog.printStackTraceToString(e));
			throw new RippsAdminException("File not found");
		}
	}

	@Override
	public PropertyFileWrapperDto editPropertyFileContent(PropertyFileWrapperDto propertyFileWrapperDto) {
		File files = null;
		try {
			files = new File(FileUtil.cleanString(FilenameUtils.normalize(path)));
			logger.info("root path:{}" + path);
		} catch (Exception e) {
			logger.error(ExceptionLog.printStackTraceToString(e));

		}
		if (files == null) {
			throw new RippsAdminException(INCORRECT_PATH);
		}
		String path2 = files.getPath();
		String fileName;
		if (propertyFileWrapperDto.getFileName() == null || propertyFileWrapperDto.getParentPath() == null) {
			throw new RippsAdminException(INCORRECT_PATH);
		} else if (propertyFileWrapperDto.getParentPath().equalsIgnoreCase(ROOT)) {
			fileName = path2 + DELIMITER + propertyFileWrapperDto.getFileName();
			logger.info(FILE_NAME + fileName);
		} else {
			fileName = path2 + propertyFileWrapperDto.getParentPath() + DELIMITER
					+ propertyFileWrapperDto.getFileName();
			logger.info(FILE_NAME + fileName);
		}
		for (PropertyFileContentDto propertyFileContentDto : propertyFileWrapperDto.getPropertyList()) {
			if (Boolean.TRUE.equals(propertyFileContentDto.getIsEditable())
					&& Boolean.TRUE.equals(propertyFileContentDto.getModified())) {
				PropertiesConfiguration properties = PropertyFileMapper.getpropertyConfiguration(fileName);
				PropertyFileMapper.updatePropertyfile(properties, propertyFileContentDto.getKey(),
						propertyFileContentDto.getValue());
			}
		}
		return propertyFileWrapperDto;
	}

}