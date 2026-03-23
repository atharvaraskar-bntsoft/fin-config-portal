package com.bnt.rest.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bnt.common.HttpCommons;
import com.bnt.common.ResponseEntityData;
import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.RippsUtility;
import com.bnt.constant.Constants;
import com.bnt.constant.RippsRestConstant;
import com.bnt.rest.dto.IdNameVersionWrapper;
import com.bnt.rest.dto.ImfStructureDto;
import com.bnt.rest.dto.ImfTemplateDto;
import com.bnt.rest.service.ImfStructureService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/imf-structure")
@CrossOrigin(origins = "${crossOriginUrl}")
public class ImfStructureController {

	private static final String FIND_ALL_IMF_STRUCTURE = "Find all imfStructure";

	private static final Logger logger = LogManager.getLogger(ImfStructureController.class);

	@Autowired
	private HttpServletRequest request;

	@Autowired
	private ImfStructureService imfStructureService;

	@GetMapping
	public ResponseEntity<Map<String, Object>> getAllImfStructure(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info(FIND_ALL_IMF_STRUCTURE);
		try {
			Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
			ResponseWrapper pageJPAData = imfStructureService.findPagedImfStructure(requestParamMap);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage(FIND_ALL_IMF_STRUCTURE);
			Map<String, Object> data = RippsUtility.setPageJPAData(pageJPAData);
			data.put("imfStructureList", pageJPAData.getContent());
			responseEntityData.setData(data);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, FIND_ALL_IMF_STRUCTURE, null),
					HttpStatus.OK);
		}

	}

	// Create new entry in persistence by POST request.
	@PostMapping
	public ResponseEntity<Map<String, Object>> createImfStructure(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@Valid @RequestBody ImfStructureDto imfStructureDto) {
		logger.info("Create new ImfStructure");
		String requestToken = RippsUtility.getToken(request);
		try {
			Integer imfStructureId = imfStructureService.addImfStructure(imfStructureDto, requestToken);
			if (imfStructureId > 0) {
				Map<String, Integer> map = new HashMap<>();
				map.put("id", imfStructureId);
				ResponseEntityData responseEntityData = new ResponseEntityData();
				responseEntityData.setStatus(RippsRestConstant.SUCCESS);
				responseEntityData.setMessage("IMF Structure Created");
				responseEntityData.setData(map);
				return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.CREATED);
			} else {
				return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE,
						"IMF Structure Creation failed", null), HttpStatus.CREATED);
			}
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		}

	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<Map<String, Object>> getImfStructureById(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("id") int id) {
		logger.info("inside getImfStructureById ID: {}", id);
		try {
			ImfStructureDto imfStructureDto = imfStructureService.findImfStructureDtoById(id);

			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find ImfStructure");
			responseEntityData.setData(imfStructureDto);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		}
	}

	@PostMapping(value = "/runtime")
	public ResponseEntity<Map<String, Object>> getRunTimeImfStructure(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @Valid @RequestBody String imfJson) {
		logger.info("inside getRunTimeImfStructure: ");
		try {
			String runTimeJson = imfStructureService.getRunTimeImfStructure(imfJson);

			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find ImfStructure");
			responseEntityData.setData(runTimeJson);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		}
	}

	// Modifie new entry in persistence by PUT request.
	@PutMapping(value = "/{id}")
	public ResponseEntity<Map<String, Object>> updateImfStructure(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("id") int id,
			@RequestBody ImfStructureDto imfStructureFromUiDto) {
		logger.info("Update ImfStructure ID:{} ", id);
		String requestToken = RippsUtility.getToken(request);
		Map<String, Object> updateRecordMap = imfStructureService.updateImfStructure(imfStructureFromUiDto,
				requestToken, id);

		if (RippsRestConstant.SUCCESS.equalsIgnoreCase((String) updateRecordMap.get(Constants.STATUS))) {

			return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.SUCCESS,
					(String) updateRecordMap.get(Constants.MESSAGE),
					(ImfStructureDto) updateRecordMap.get(Constants.DTO)), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE,
					(String) updateRecordMap.get(Constants.MESSAGE), imfStructureFromUiDto), HttpStatus.OK);
		}
	}

	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Map<String, Object>> deleteImfStructure(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("id") int id) {
		logger.info("Delete ImfStructure ID: {}", id);
		String requestToken = RippsUtility.getToken(request);

		try {
			ImfStructureDto imfStructureDto = imfStructureService.findImfStructureDtoById(id);
			if (imfStructureDto == null) {
				logger.info("Record found for Id:{}", id);
				return new ResponseEntity<>(
						RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "IMF Structure Not Found", ""),
						HttpStatus.OK);
			}

			imfStructureService.deleteById(id, requestToken);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.SUCCESS,
					"IMF Structure with version '0' is deleted successfully", null), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "IMF Structure not Deleted", ""),
					HttpStatus.OK);
		}
	}

	// Get max version
	@GetMapping(value = "/version")
	public ResponseEntity<Map<String, Object>> getVersion(@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Find max Version in ImfStructure");
		ImfStructureDto imfStructureDto = imfStructureService.findMaxVersionImfStructure();
		if (imfStructureDto != null) {
			logger.info("max Version no: {}", imfStructureDto.getVersion());
		} else {
			logger.info("max Version no:NULL");
		}

		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find ImfStructure max Version");
		responseEntityData.setData(imfStructureDto);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);

	}

	@GetMapping(value = "/imf-template/{id}")
	public ResponseEntity<Map<String, Object>> getImfTemplate(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("id") int id) {
		logger.info("inside getImfTemplate ID: {}", id);
		try {

			ImfTemplateDto imfTemplateDto = imfStructureService.getImfTemplateDto(id);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find Imf Template");
			responseEntityData.setData(imfTemplateDto);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			logger.error(e.getMessage());
			logger.error("error message-> {}", e.getMessage());
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		}
	}

	@PostMapping(value = "version-it")
	public ResponseEntity<Map<String, Object>> versionImfStructure(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@Valid @RequestBody ImfStructureDto imfStructureDto) {
		logger.info("inside versionImfStructure");
		String requestToken = RippsUtility.getToken(request);
		try {
			Integer imfStructureId = imfStructureService.versionItImf(imfStructureDto, requestToken);
			if (imfStructureId >= 0) {
				Map<String, Integer> map = new HashMap<>();
				map.put("id", imfStructureId);
				ResponseEntityData responseEntityData = new ResponseEntityData();
				responseEntityData.setStatus(RippsRestConstant.SUCCESS);
				responseEntityData.setMessage("IMF Structure version saved successfully");
				responseEntityData.setData(map);
				return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.CREATED);
			} else {
				return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE,
						"IMF Structure version failed", null), HttpStatus.CREATED);
			}
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		}

	}

	@PostMapping(value = "draft")
	public ResponseEntity<Map<String, Object>> draftImfStructure(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@Valid @RequestBody ImfStructureDto imfStructureDto) {
		logger.info("inside draftImfStructure");
		String requestToken = RippsUtility.getToken(request);
		try {
			Integer imfStructureId = imfStructureService.draftImf(imfStructureDto, requestToken);
			if (imfStructureId >= 0) {
				Map<String, Integer> map = new HashMap<>();
				map.put("id", imfStructureId);
				ResponseEntityData responseEntityData = new ResponseEntityData();
				responseEntityData.setStatus(RippsRestConstant.SUCCESS);
				responseEntityData.setMessage("IMF Structure draft saved successfully");
				responseEntityData.setData(map);
				return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.CREATED);
			} else {
				return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE,
						"IMF Structure draft Failed", null), HttpStatus.CREATED);
			}
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		}

	}

	@GetMapping(value = "/get-imf-version-list")
	public ResponseEntity<Map<String, Object>> getImfVersionList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("inside getImfVersionList");
		try {

			List<IdNameVersionWrapper> resultVersionList = imfStructureService.getImfVersionList();

			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find Imf Version List");
			responseEntityData.setData(resultVersionList);
			logger.info("complted");
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, FIND_ALL_IMF_STRUCTURE, null),
					HttpStatus.OK);
		}

	}

	@GetMapping(value = "all")
	public ResponseEntity<Map<String, Object>> getAllImf(@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("getAllImf");
		try {
			List<ImfStructureDto> imfStructureDtoList = imfStructureService.findAllImf();
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find all IMFs");
			responseEntityData.setData(imfStructureDtoList);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			logger.error(e.getMessage());
			logger.error("error message-> {}", e.getMessage());
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		}
	}

}
