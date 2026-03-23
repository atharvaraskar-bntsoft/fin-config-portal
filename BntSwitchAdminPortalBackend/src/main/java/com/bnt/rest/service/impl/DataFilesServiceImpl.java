package com.bnt.rest.service.impl;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

import jakarta.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.bnt.common.RippsAdminException;
import com.bnt.common.util.ReflectionUtil;
import com.bnt.common.util.RippsUtility;
import com.bnt.common.util.StringUtil;
import com.bnt.constant.Constants;
import com.bnt.constant.IgnoreCopyConstants;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.DataFilesDto;
import com.bnt.rest.entity.AuthSession;
import com.bnt.rest.entity.DataFiles;
import com.bnt.rest.service.impl.AuthSessionService;
import com.bnt.rest.repository.DataFilesRepository;
import com.bnt.rest.service.DataFilesService;
import com.bnt.rest.wrapper.dto.IdAndNameWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class DataFilesServiceImpl implements DataFilesService {

	private static final Logger logger = LogManager.getLogger(DataFilesServiceImpl.class.getName());

	@Value("${datafiles.file.allowed.type}")
	private String datafilesFileAllowedType;

	@Autowired
	DataFilesRepository dataFilesRepository;

	@Autowired
	private AuthSessionService authSessionService;

	@Override
	public IdAndNameWrapper uploadFile(MultipartFile uplodedFile, HttpServletRequest request, String allowedFileType) {

		logger.info("inside uploadFile");
		DataFilesDto dataFilesDto = new DataFilesDto();

		String fileName = uplodedFile.getOriginalFilename();
		if (fileName == null || "".equalsIgnoreCase(fileName)
				|| !(validateDataFilesAllowedFileType(fileName, allowedFileType))) {
			throw new RippsAdminException("Please upload a valid File");
		}
		dataFilesDto.setFileName(fileName);
		dataFilesDto.setFileMimeType(uplodedFile.getContentType());

		int fileSizeKb = (int) Math.ceil((double) uplodedFile.getSize() / 1024);
		dataFilesDto.setFileSizeKb(fileSizeKb);
		logger.info("file size before compress" + dataFilesDto.getFileSizeKb());
		try {
			dataFilesDto.setFileContent(uplodedFile.getBytes());
		} catch (IOException e) {

			logger.error("Error in uploadFile()");
		}

		List<String> ignoreUpdateAuditField = Arrays.asList(IgnoreCopyConstants.IGNORE_NONE);
		DataFiles entityDataFiles = new DataFiles();
		try {
			ReflectionUtil.copy(entityDataFiles, dataFilesDto, ignoreUpdateAuditField);

		} catch (Exception e) {
			throw new RippsAdminException("Exception in copying Dto to entity");
		}
		entityDataFiles.setDeleted('0');
		entityDataFiles.setCreatedBy(authSessionService.getCreatedBy());
		entityDataFiles.setCreatedOn(RippsUtility.getCurrentTimeStamp());
		entityDataFiles.setUpdatedOn(RippsUtility.getCurrentTimeStamp());
		DataFiles savedDataFiles = dataFilesRepository.save(entityDataFiles);
		IdAndNameWrapper uploadIdAndName = new IdAndNameWrapper();
		if (savedDataFiles == null) {
			throw new RippsAdminException("Error in saving Data-Files");
		} else {
			uploadIdAndName.setId(savedDataFiles.getId());
			uploadIdAndName.setName(savedDataFiles.getFileName());
			logger.info("created successfully with Id:" + uploadIdAndName.getId());
		}
		return uploadIdAndName;
	}

	/**
	 * uncompress the image bytes before returning it to the angular application
	 */
	public static byte[] decompressBytes(byte[] data) {
		Inflater inflater = new Inflater();
		inflater.setInput(data);
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
		byte[] buffer = new byte[1024];
		try {
			while (!inflater.finished()) {
				int count = inflater.inflate(buffer);
				outputStream.write(buffer, 0, count);
			}
			outputStream.close();
		} catch (IOException | DataFormatException e) {

			logger.error("Error in decompressBytes()");
		}
		return outputStream.toByteArray();
	}

	@Override
	public DataFilesDto getFile(Integer id) {
		logger.info("inside getFile with id:" + id);
		DataFiles entityDataFiles = dataFilesRepository.getDataFilesById(id);
		DataFilesDto dataFilesDto = null;
		if (entityDataFiles != null) {
			dataFilesDto = ObjectMapper.mapToDto(entityDataFiles, DataFilesDto.class);
			dataFilesDto.setFileContent(decompressBytes(dataFilesDto.getFileContent()));
		} else {
			dataFilesDto = null;
		}

		return dataFilesDto;
	}

	@Override
	public DataFilesDto getFile(String fileName) {
		logger.info("inside getFile with fileName:" + fileName);
		DataFiles entityDataFiles = dataFilesRepository.getDataFilesByFileName(fileName);
		DataFilesDto dataFilesDto = null;
		if (entityDataFiles != null) {
			dataFilesDto = ObjectMapper.mapToDto(entityDataFiles, DataFilesDto.class);
			dataFilesDto.setFileContent(decompressBytes(dataFilesDto.getFileContent()));
		} else {
			dataFilesDto = null;
		}
		return dataFilesDto;
	}

	@Override
	public Map<String, Object> getFileResource(Integer id) {
		logger.info("inside getFileResource with id:" + id);
		Map<String, Object> map = new HashMap<>();
		DataFiles entityDataFiles = dataFilesRepository.getDataFilesById(id);
		DataFilesDto dataFilesDto = null;
		if (entityDataFiles != null) {
			dataFilesDto = ObjectMapper.mapToDto(entityDataFiles, DataFilesDto.class);
			try {
				dataFilesDto.setFileContent(dataFilesDto.getFileContent());
			} catch (Exception e) {

				logger.error("error in setFileContent " + e);
			}
			Integer size = dataFilesDto.getFileSizeKb() * 1024;
			dataFilesDto.setFileSizeKb(size);
			Resource resource = new ByteArrayResource(dataFilesDto.getFileContent());
			map.put(Constants.RESOURCE, resource);
			map.put(Constants.DTO, dataFilesDto);

		} else {
			throw new RippsAdminException("Record not available");
		}
		return map;
	}

	@Override
	public boolean validateDataFilesAllowedFileType(String fileName, String allowedFileType) {
		boolean result = false;
		logger.info("inside validateAllowedFileType" + fileName);
		List<String> allowedFileList = null;
		logger.info("allowedFileType:" + allowedFileType);
		String allowedFileExtension = "";

		if (StringUtil.isNotNullOrBlank(allowedFileType)) {
			allowedFileExtension = allowedFileType;
		} else {
			allowedFileExtension = datafilesFileAllowedType;
		}

		logger.info("allowedFileExtension:" + allowedFileExtension);
		if (StringUtil.isNotNullOrBlank(allowedFileExtension)) {
			allowedFileList = Arrays.asList(allowedFileExtension.toUpperCase().split(","));
			result = extractedValidateDataFilesAllowedFileType(fileName, allowedFileList, allowedFileExtension);
		} else {
			logger.info("File extension validation not required, Hence returning true");
			result = true;
		}
		return result;
	}

	private boolean extractedValidateDataFilesAllowedFileType(String fileName, List<String> allowedFileList,
			String allowedFileExtension) {
		boolean allowedFlag = false;
		if (fileName != null) {
			fileName = fileName.trim();
			String fileExtension = fileName.substring(fileName.lastIndexOf("."), fileName.length());
			if ((fileExtension.isBlank() || fileExtension.isEmpty()) || (fileExtension.length() == fileName.length())) {
				// Do Nothing
			} else {
				fileExtension = fileExtension.toUpperCase();
				if (allowedFileList.contains(fileExtension)) {
					allowedFlag = true;
				}
			}
		}
		if (!allowedFlag) {
			throw new RippsAdminException("Invalid file format : Please upload file with extension "
					+ allowedFileExtension.replace(",", " or "));
		}

		return allowedFlag;
	}

	@Override
	public List<DataFilesDto> getDataFilesList(List<Integer> ids) {
		logger.info("inside getFilesResource");
		List<DataFiles> entityDataFiles = (List<DataFiles>) dataFilesRepository.getDataFilesByIds(ids);
		List<DataFilesDto> dataFilesDto = null;
		if (entityDataFiles != null) {
			dataFilesDto = ObjectMapper.mapListObjects(entityDataFiles, DataFilesDto.class);
		}
		return dataFilesDto;
	}

	@Override
	public DataFiles insertDataFile(DataFilesDto dataFilesDto) {
		List<String> ignoreUpdateAuditField = Arrays.asList(IgnoreCopyConstants.IGNORE_NONE);
		int fileSizeKb = (int) Math.ceil((double) dataFilesDto.getFileContent().length / 1024);
		dataFilesDto.setFileSizeKb(fileSizeKb);
		logger.info("file size before compress" + dataFilesDto.getFileSizeKb());
		DataFiles entityDataFiles = new DataFiles();
		try {
			ReflectionUtil.copy(entityDataFiles, dataFilesDto, ignoreUpdateAuditField);

		} catch (Exception e) {
			throw new RippsAdminException("Exception in copying Dto to entity");
		}
		entityDataFiles.setDeleted('0');
		return dataFilesRepository.save(entityDataFiles);
	}

}
