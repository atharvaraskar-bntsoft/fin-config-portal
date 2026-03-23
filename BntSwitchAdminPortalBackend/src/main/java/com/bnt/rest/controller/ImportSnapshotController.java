package com.bnt.rest.controller;

import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bnt.common.HttpCommons;
import com.bnt.common.ResponseEntityData;
import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.RippsUtility;
import com.bnt.constant.RippsRestConstant;
import com.bnt.rest.service.ImportSnapshotService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/import-snapshot")
@CrossOrigin(origins = "${crossOriginUrl}")
public class ImportSnapshotController {

	private static final Logger logger = LogManager.getLogger(ImportSnapshotController.class);

	@Autowired
	private ImportSnapshotService importSnapshotService;

	@Autowired
	private HttpServletRequest request;

	@PostMapping(consumes = "application/json")
	public ResponseEntity<ResponseEntityData> importSnapshot(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@RequestBody String importJson) {
		logger.info("Create new Export Snapshot");

		return HttpCommons.setResponseEntityForPost("Snapshot has been exported", true);

	}

	@PostMapping("/upload")
	public ResponseEntity<Map<String, Object>> uploadSnapshot(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@RequestParam("uplodedFile") MultipartFile uplodedFile) {
		logger.info("inside uploadSnapshot");

		if (uplodedFile.getOriginalFilename().contains(".json") || uplodedFile.getOriginalFilename().contains(".zip")) {
			try {
				Integer id = importSnapshotService.uploadSnapshot(uplodedFile, request);
				if (id != null) {
					logger.info("SnapShot import id: {}", id);
					String responseData = (String) request.getAttribute("responseData");
					ResponseEntityData responseEntityData = new ResponseEntityData();
					responseEntityData.setStatus(RippsRestConstant.SUCCESS);
					responseEntityData.setMessage("Snapshot imported");
					if (responseData != null) {
						responseEntityData.setData(responseData);
					} else {
						responseEntityData.setData(id);
					}
					return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData),
							HttpStatus.CREATED);
				} else {
					logger.error("Snapshot-Data Not imported");
					return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE,
							"Snapshot data Not imported", null), HttpStatus.CREATED);
				}
			} catch (RippsAdminException ripException) {
				return new ResponseEntity<>(
						RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, ripException.getMessage(), null),
						HttpStatus.CREATED);
			}

		} else {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Please upload valid file", null),
					HttpStatus.OK);
		}

	}

	@PostMapping("/import_confirmation")
	public ResponseEntity<Map<String, Object>> importConfirmation(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @RequestBody String confirmationValue) {

		JSONObject ob = new JSONObject(confirmationValue);
		logger.info("inside importConfirmation");
		Integer id;
		try {

			if (ob.get("confirmation").toString().equalsIgnoreCase("Y")) {
				id = importSnapshotService.adapterImportConfirmation(ob, request);
				logger.info("inside importConfirmation id {}", id);
				ResponseEntityData responseEntityData = new ResponseEntityData();
				responseEntityData.setStatus(RippsRestConstant.SUCCESS);
				responseEntityData.setMessage("Snapshot imported");
				responseEntityData.setData("Imported Successfully.");
				return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.CREATED);
			} else {
				ResponseEntityData responseEntityData = new ResponseEntityData();
				responseEntityData.setStatus(RippsRestConstant.SUCCESS);
				responseEntityData.setMessage("Snapshot not imported");
				responseEntityData.setData("Not Imported");
				return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.CREATED);
			}
		} catch (RippsAdminException ripException) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, ripException.getMessage(), null),
					HttpStatus.CREATED);
		}
	}

	@GetMapping
	public ResponseEntity<Map<String, Object>> getAllSnapshotImportDetail(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Find all getAllSnapshotImportDetail");
		try {
			Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
			ResponseWrapper pageJPAData = importSnapshotService.getPagedSnapshotImportDetail(requestParamMap);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find all Snapshot-Import-Detail");
			Map<String, Object> data = RippsUtility.setPageJPAData(pageJPAData);
			if (pageJPAData != null) {
				data.put("snapshotImportDetail", pageJPAData.getContent());
			}
			responseEntityData.setData(data);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Find all imfStructure", null),
					HttpStatus.OK);
		}
	}
}
