package com.bnt.rest.controller;

import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bnt.common.ResponseEntityData;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.FileUtil;
import com.bnt.common.util.RippsUtility;
import com.bnt.constant.Constants;
import com.bnt.constant.RippsRestConstant;
import com.bnt.rest.dto.DataFilesDto;
import com.bnt.rest.service.DataFilesService;
import com.bnt.rest.wrapper.dto.IdAndNameWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/data-files")
@CrossOrigin(origins = "${crossOriginUrl}")
public class DataFilesController {

	private static final Logger logger = LogManager.getLogger(DataFilesController.class);

	@Autowired
	private DataFilesService dataFilesService;

	@Autowired
	private HttpServletRequest request;

	@PostMapping("/upload")
	public ResponseEntity<Map<String, Object>> uplaodImage(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@RequestParam("uplodedFile") MultipartFile uplodedFile) {

		long count = uplodedFile.getOriginalFilename().chars().filter(ch -> ch == '.').count();

		if (count == 1 && (uplodedFile.getOriginalFilename().contains(".jks")
				|| uplodedFile.getOriginalFilename().contains(".jar")
				|| uplodedFile.getOriginalFilename().contains(".json"))) {
			logger.info("inside uplaodImage");
			Map<String, String[]> paramMap = request.getParameterMap();
			String allowedFileType = "";
			if (paramMap.get("allowed-file-type") != null) {
				allowedFileType = paramMap.get("allowed-file-type")[0];
			}
			try {
				IdAndNameWrapper idAndNameWrapper = dataFilesService.uploadFile(uplodedFile, request, allowedFileType);
				ResponseEntityData responseEntityData = new ResponseEntityData();
				responseEntityData.setStatus(RippsRestConstant.SUCCESS);
				responseEntityData.setMessage("File Uploaded");
				responseEntityData.setData(idAndNameWrapper);
				if (idAndNameWrapper != null) {
					logger.info("File Uploaded with id: {}", idAndNameWrapper.getId());
					return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData),
							HttpStatus.CREATED);
				} else {

					logger.error("File Not Uploaded");
					return new ResponseEntity<>(
							RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "File Not Uploaded", null),
							HttpStatus.CREATED);
				}
			} catch (RippsAdminException ripException) {
				return new ResponseEntity<>(
						RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, ripException.getMessage(), null),
						HttpStatus.CREATED);
			} catch (Exception e) {
				logger.error(e);
				return new ResponseEntity<>(
						RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "File Upload failed", null),
						HttpStatus.CREATED);
			}
		} else {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Please upload valid file", null),
					HttpStatus.OK);
		}
	}

	@GetMapping(value = "id/{id}")
	public ResponseEntity<Map<String, Object>> getFileById(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("id") int id) {

		logger.info("inside getFileById");
		try {
			DataFilesDto dataFilesDto = dataFilesService.getFile(id);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find Data-Files");
			responseEntityData.setData(dataFilesDto);
			logger.info("sending response");
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		}
	}

	@GetMapping(value = "name/{fileName}")
	public ResponseEntity<Map<String, Object>> getFileByFileName(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("fileName") String fileName) {

		logger.info("inside getFileByFileName");
		if (FileUtil.validateFileName(fileName)) {
			try {

				DataFilesDto dataFilesDto = dataFilesService.getFile(fileName);
				ResponseEntityData responseEntityData = new ResponseEntityData();
				responseEntityData.setStatus(RippsRestConstant.SUCCESS);
				responseEntityData.setMessage("Find Data-Files");
				responseEntityData.setData(dataFilesDto);
				logger.info("sending response");
				return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
			} catch (RippsAdminException e) {
				return new ResponseEntity<>(
						RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null),
						HttpStatus.OK);
			}
		} else {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Invalid file name", null),
					HttpStatus.OK);
		}
	}

	@GetMapping("download/{id}")
	@ResponseBody
	public ResponseEntity<Resource> downloadFileById(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("id") int id) {
		logger.info("inside downloadFileById with templateId: {}", id);
		try {
			Map<String, Object> resultMap = dataFilesService.getFileResource(id);
			Resource resource = (Resource) resultMap.get(Constants.RESOURCE);
			DataFilesDto dataFilesDto = (DataFilesDto) resultMap.get(Constants.DTO);

			String fileName = dataFilesDto.getFileName();
			String contentType = dataFilesDto.getFileMimeType();
			String contentLength = "" + dataFilesDto.getFileSizeKb();
			return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType))
					.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
					.header(HttpHeaders.CONTENT_LENGTH, contentLength).body(resource);
		} catch (RippsAdminException e) {
			logger.error("downloadFileById failed--> {}", e.getMessage());
			return ResponseEntity.notFound().build();
		}
	}
}
