package com.bnt.rest.service;

import java.util.List;
import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.web.multipart.MultipartFile;

import com.bnt.rest.dto.DataFilesDto;
import com.bnt.rest.entity.DataFiles;
import com.bnt.rest.wrapper.dto.IdAndNameWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface DataFilesService {

	public IdAndNameWrapper uploadFile(MultipartFile uplodedFile, HttpServletRequest request, String allowedFileType);

	public DataFilesDto getFile(Integer id);

	public DataFilesDto getFile(String name);

	public Map<String, Object> getFileResource(Integer id);

	public boolean validateDataFilesAllowedFileType(String fileName, String allowedFileType);

	List<DataFilesDto> getDataFilesList(List<Integer> ids);

	DataFiles insertDataFile(DataFilesDto dataFilesDto);

}
