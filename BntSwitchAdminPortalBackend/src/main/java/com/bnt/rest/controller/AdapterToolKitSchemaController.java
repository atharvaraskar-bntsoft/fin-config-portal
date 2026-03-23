package com.bnt.rest.controller;

import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
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
import com.bnt.common.util.RippsUtility;
import com.bnt.constant.Constants;
import com.bnt.constant.RippsRestConstant;
import com.bnt.rest.service.AdapterToolKitSchemaService;
import com.bnt.rest.wrapper.dto.adapter.AdapterUiResponseWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/AdapterToolKit-Schema")
@CrossOrigin(origins = "${crossOriginUrl}")
public class AdapterToolKitSchemaController {

	private static final Logger logger = LogManager.getLogger(AdapterToolKitSchemaController.class);

	@Autowired
	private AdapterToolKitSchemaService adapterToolKitSchemaService;

	@Autowired
	private HttpServletRequest request;

	@GetMapping(value = "/load-template/{templateId}")
	public ResponseEntity<Map<String, Object>> getSchemaResponse(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("templateId") int templateId) {

		logger.info("inside getSchemaResponse()...");
		logger.info("templateId...: {}", templateId);
		try {
			AdapterUiResponseWrapper response = adapterToolKitSchemaService.getUIResponse(templateId,
					Constants.ADAPTER_TYPE_L1);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find Adapter-JSON");
			responseEntityData.setData(response);
			logger.info("completed getSchemaResponse()...");
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		}

	}

	@PostMapping(value = "upload")
	public ResponseEntity<Map<String, Object>> uploadSchemaFile(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@RequestParam("templateFile") MultipartFile templateFile, String fileType) {

		long count = templateFile.getOriginalFilename().chars().filter(ch -> ch == '.').count();

		if (count == 1 && templateFile.getOriginalFilename().contains(".xml")) {
			logger.info("uploadSchemaFile");
			logger.info("***********************uploadSchemaFile Operation***********************");
			String requestToken = RippsUtility.getToken(request);
			Map<String, String[]> paramMap = request.getParameterMap();

			logger.info("templateId--> {}", paramMap.get("templateId")[0]);
			logger.info("name-->  {}", paramMap.get("name")[0]);
			logger.info("fileName-> {}", templateFile.getName());

			Integer templateId = Integer.parseInt(paramMap.get("templateId")[0]);
			String adapterName = paramMap.get("name")[0];
			Integer imfId = Integer.parseInt(paramMap.get("imfId")[0]);

			if (StringUtils.isEmpty(fileType))
				fileType = Constants.ADAPTER_FILE_TYPE_REQUEST;
			else if (fileType.equals("Responce")) {
				fileType = Constants.ADAPTER_FILE_TYPE_RESPONSE;
			}
			String adapterType = "";
			if (paramMap.get("type") == null) {
				adapterType = "L1";
			} else {
				adapterType = paramMap.get("type")[0];
			}
			try {
				AdapterUiResponseWrapper response = adapterToolKitSchemaService.uploadSchemaFile(requestToken,
						templateId, adapterName, templateFile, imfId, adapterType, fileType);
				ResponseEntityData responseEntityData = new ResponseEntityData();
				responseEntityData.setStatus(RippsRestConstant.SUCCESS);
				responseEntityData.setMessage("Upload Completed Successfully");
				responseEntityData.setData(response);
				logger.info("completed getSchemaResponse");
				return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
			} catch (RippsAdminException e) {
				return new ResponseEntity<>(
						RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null),
						HttpStatus.OK);
			}
		} else {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Please upload valid file", null),
					HttpStatus.OK);
		}
	}

	@GetMapping("download/{templateId}")
	@ResponseBody
	public ResponseEntity<Resource> downloadSchemaFile(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("templateId") int templateId) {
		logger.info("inside downloadSchemaFile() with templateId: {}", templateId);
		try {
			Map<String, Object> resultMap = adapterToolKitSchemaService.downloadTemplateFile(templateId);
			Resource resource = (Resource) resultMap.get(Constants.RESOURCE);
			String fileName = (String) resultMap.get(Constants.FILE_NAME);
			String contentType = "application/octet-stream";
			return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType))
					.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
					.body(resource);
		} catch (RippsAdminException e) {
			logger.info("downloadSchemaFile failed--> {}", e.getMessage());
			return ResponseEntity.notFound().build();
		}
	}

	@GetMapping(value = "/load-template/{type}/{templateId}")
	public ResponseEntity<Map<String, Object>> getSchemaResponse(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("type") String type,
			@PathVariable("templateId") int templateId) {
		logger.info("inside getSchemaResponse() with type : {} ,and templateId : {}", type, templateId);
		try {
			AdapterUiResponseWrapper response = adapterToolKitSchemaService.getUIResponse(templateId, type);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find Adapter-JSON");
			responseEntityData.setData(response);
			logger.info("completed getSchemaResponse");
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		}
	}

	@GetMapping("download-packager/{adapterConfigId}")
	@ResponseBody
	public ResponseEntity<Resource> downloadAdapterPackagerFile(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("adapterConfigId") int adapterConfigId) {
		logger.info("inside downloadAdapterPackagerFile() with adapterConfigId.: {}", adapterConfigId);
		try {
			Map<String, Object> resultMap = adapterToolKitSchemaService.downloadAdapterPackagerFile(adapterConfigId);
			Resource resource = (Resource) resultMap.get(Constants.RESOURCE);
			String fileName = (String) resultMap.get(Constants.FILE_NAME);
			String contentType = "application/octet-stream";
			return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType))
					.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
					.body(resource);
		} catch (RippsAdminException e) {
			logger.info("downloadAdapterPackagerFile failed--> {} ", e.getMessage());
			return ResponseEntity.notFound().build();
		}
	}

	@GetMapping("download-packager/{fileType}/{adapterConfigId}")
	@ResponseBody
	public ResponseEntity<Resource> downloadAdapterPackagerFile(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("fileType") String fileType,
			@PathVariable("adapterConfigId") int adapterConfigId) {
		logger.info("inside downloadAdapterPackagerFile() with adapterId: {}", adapterConfigId);
		try {
			Map<String, Object> resultMap = adapterToolKitSchemaService.downloadPackagerFileByFileType(adapterConfigId,
					fileType);
			Resource resource = (Resource) resultMap.get(Constants.RESOURCE);
			String fileName = (String) resultMap.get(Constants.FILE_NAME);
			String contentType = "application/octet-stream";
			return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType))
					.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
					.body(resource);
		} catch (RippsAdminException e) {
			logger.info("downloadAdapterPackagerFile failed--> {} ", e.getMessage());
			return ResponseEntity.notFound().build();
		}
	}
}
