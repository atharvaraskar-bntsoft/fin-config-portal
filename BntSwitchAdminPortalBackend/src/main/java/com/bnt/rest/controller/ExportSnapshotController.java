package com.bnt.rest.controller;

import java.util.ArrayList;
import java.util.Arrays;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.bnt.common.HttpCommons;
import com.bnt.common.ResponseEntityData;
import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.RippsUtility;
import com.bnt.common.util.exception.ExceptionLog;
import com.bnt.constant.Constants;
import com.bnt.constant.RippsRestConstant;
import com.bnt.rest.dto.ExportImportSnapshotDto;
import com.bnt.rest.service.ExportSnapshotService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/export-snapshot")
@CrossOrigin(origins = "${crossOriginUrl}")
public class ExportSnapshotController {

	private static final Logger logger = LogManager.getLogger(ExportSnapshotController.class);

	@Autowired
	private ExportSnapshotService exportSnapshotService;

	@Autowired
	private HttpServletRequest request;

	@PostMapping(consumes = "application/json")
	public ResponseEntity<ResponseEntityData> exportSnapshot(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@RequestBody ExportImportSnapshotDto entityRequest) {
		logger.info("Create new Export Snapshot");

		try {
			exportSnapshotService.exportSnapshot(entityRequest);
		} catch (Exception e) {
			logger.error(ExceptionLog.printStackTraceToString(e));
			return HttpCommons.setResponseEntityForPost(e.getMessage(), false);
		}
		return HttpCommons.setResponseEntityForPost("Snapshot has been exported", true);

	}

	@GetMapping
	public ResponseEntity<Map<String, Object>> getAllExportSnapshots(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Find All records");
		try {
			Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
			ResponseWrapper pageJPAData = exportSnapshotService.findAllRecords(requestParamMap);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find all entities");
			Map<String, Object> data = RippsUtility.setPageJPAData(pageJPAData);
			data.put("entitiesList", pageJPAData.getContent());
			responseEntityData.setData(data);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Find all export list", null),
					HttpStatus.FORBIDDEN);
		}
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<ResponseEntityData> getRecordById(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("id") Integer id) {
		logger.info("Find record by Id:{} ", id);

		return HttpCommons.setResponseEntityPageDataObject(exportSnapshotService.findRecordById(id), "get record by id",
				"Error in getting record by Id");
	}

	@GetMapping("/all-versions")
	public ResponseEntity<Map<String, Object>> getAllVersionOfExortSnapshotCandidates(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Find All records");
		try {
			Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
			ResponseWrapper pageJPAData = exportSnapshotService.getAllVersionOfExortSnapshotCandidates(requestParamMap);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find all entities");
			Map<String, Object> data = RippsUtility.setPageJPAData(pageJPAData);
			data.put("entitiesList", pageJPAData.getContent());
			responseEntityData.setData(data);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Find all export list", null),
					HttpStatus.FORBIDDEN);
		}
	}

	@GetMapping("download/{id}")
	@ResponseBody
	public ResponseEntity<Resource> downloadFile(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("id") int id) {
		logger.info("inside downloadFile with id:{}", id);
		try {
			Map<String, Object> resultMap = exportSnapshotService.downloadFile(id, request);
			Resource resource = (Resource) resultMap.get(Constants.RESOURCE);
			String fileName = (String) resultMap.get(Constants.FILE_NAME);
			/**
			 * String contentType = "application/octet-stream"; return
			 * ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType))
			 * .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName
			 * + "\"") .body(resource);
			 */
			HttpHeaders headers = new HttpHeaders();
			headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"");
			headers.set("filename", fileName);
			headers.setAccessControlExposeHeaders(
					Arrays.asList(HttpHeaders.CONTENT_DISPOSITION, HttpHeaders.CONTENT_TYPE));
			return ResponseEntity.ok().headers(headers)
					.contentType(MediaType.parseMediaType(MediaType.APPLICATION_OCTET_STREAM_VALUE)).body(resource);
		} catch (RippsAdminException e) {
			logger.info("downloadSchemaFile failed-->{}", e.getMessage());
			return ResponseEntity.notFound().build();
		}
	}
}
