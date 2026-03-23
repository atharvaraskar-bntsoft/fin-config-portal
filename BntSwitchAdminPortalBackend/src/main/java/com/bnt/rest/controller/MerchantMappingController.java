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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bnt.common.HttpCommons;
import com.bnt.common.ResponseEntityData;
import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.RippsUtility;
import com.bnt.constant.RippsRestConstant;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.MerchantCodeMappingDto;
import com.bnt.rest.dto.StatusWrapper;
import com.bnt.rest.entity.MerchantCodeMapping;
import com.bnt.rest.service.MerchantMappingServiceRest;
import com.bnt.rest.service.ProcessorAdapterService;
import com.bnt.rest.wrapper.dto.IdAndCodeWrapperString;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/merchant-mapping")
@CrossOrigin(origins = "${crossOriginUrl}")
public class MerchantMappingController {
	private static final String ERROR_MESSAGE = "Error while retrieving mapping";
	private static final Logger logger = LogManager.getLogger(MerchantMappingController.class);

	@Autowired
	private HttpServletRequest request;

	@Autowired
	private MerchantMappingServiceRest service;

	@Autowired
	private ProcessorAdapterService processorService;

	@GetMapping(value = "/{id}")
	public ResponseEntity<Map<String, Object>> getMerchantMappingById(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("id") int id) {
		logger.info("Find Merchant Mapping Id: {}", id);
		MerchantCodeMapping mapping = service.findMerchantCodeMappingById(id);
		MerchantCodeMappingDto mappingDto = ObjectMapper.mapToDto(mapping, MerchantCodeMappingDto.class);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find by Id");

		responseEntityData.setData(mappingDto);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping
	public ResponseEntity<Map<String, Object>> getAllMerchantMapping(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Find all Merchant Mapping");
		try {
			Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
			ResponseWrapper pageJPAData = service.findPagedMerchantMapping(requestParamMap);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find all Merchant Mapping");
			Map<String, Object> data = RippsUtility.setPageJPAData(pageJPAData);
			data.put("merchantMappingList", pageJPAData.getContent());

			responseEntityData.setData(data);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, ERROR_MESSAGE, null),
					HttpStatus.FORBIDDEN);
		}
	}

	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Map<String, Object>> deleteUser(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("id") int id) {
		logger.info("Delete Merchant Mapping Id: {}", id);
		MerchantCodeMapping merchantMapping = service.findMerchantCodeMappingById(id);
		if (merchantMapping == null) {
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "NOT_FOUND", ""),
					HttpStatus.NOT_FOUND);
		}
		service.deleteById(merchantMapping.getId());
		return new ResponseEntity<>(
				RippsUtility.setResponseEntityData(RippsRestConstant.SUCCESS, "Merchant mapping deleted", null),
				HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<Map<String, Object>> createMerchantCodeMapping(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@Valid @RequestBody MerchantCodeMappingDto mappingDto) {
		logger.info("Create Merchant Mapping");
		try {
			Integer mappingId = service.saveMerchantCodeMapping(mappingDto);
			Map<String, Integer> map = new HashMap<>();
			map.put("id", mappingId);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Merchant Mapping Created");
			responseEntityData.setData(map);
			if (mappingId > 0) {
				return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.CREATED);
			} else {
				return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.SUCCESS,
						"MerchantMapping Not created", null), HttpStatus.CREATED);
			}
		} catch (RippsAdminException ripException) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, ripException.getMessage(), null),
					HttpStatus.CREATED);
		}
	}

	@PutMapping(value = "/{id}")
	public ResponseEntity<Map<String, Object>> updateMerchantCodeMapping(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("id") int id,
			@RequestBody MerchantCodeMappingDto mappingDto,
			@RequestParam(name = "type", defaultValue = "default") String type) {
		logger.info("Edit Merchant Mapping Id: {}", id);
		try {
			MerchantCodeMapping mapping = service.findMerchantCodeMappingById(id);
			if (mapping == null) {
				return new ResponseEntity<>(
						RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "MAPPING_NOT_FOUND", ""),
						HttpStatus.NOT_FOUND);
			}
			service.updateMerchantCodeMapping(mappingDto, mapping);
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.SUCCESS, "Mapping Updated", mappingDto),
					HttpStatus.OK);
		} catch (RippsAdminException ripException) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, ripException.getMessage(), null),
					HttpStatus.CREATED);
		}
	}

	@PutMapping(value = "/status/{id}")
	public ResponseEntity<Map<String, Object>> updateStatus(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("id") int id, @RequestParam(name = "type", defaultValue = "default") String type,
			@RequestBody StatusWrapper wrapper) {
		logger.info("Edit Merchant Mapping Status: {}", id);
		MerchantCodeMapping mapping = service.findMerchantCodeMappingById(id);
		if (mapping == null || wrapper.getActive() == null) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "MAPPING_NOT_FOUND", ""),
					HttpStatus.NOT_FOUND);
		}
		String active = wrapper.getActive();
		service.updateStatusMerchantCodeMapping(active, mapping);
		return new ResponseEntity<>(
				RippsUtility.setResponseEntityData(RippsRestConstant.SUCCESS, "Mapping Updated", null), HttpStatus.OK);
	}

	@GetMapping(value = "/filter")
	public ResponseEntity<Map<String, Object>> getFilterData(@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Get Filter Merchant Mapping");
		Map<String, Object> map = service.getFilterData();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setData(map);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping("/configure-options")
	public ResponseEntity<Map<String, Object>> getAllConfigureOptions(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Find all getAllConfigureOptions");
		try {
			List<IdAndCodeWrapperString> list = service.getAllConfigureOptions();
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find all configure-options");
			responseEntityData.setData(list);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Issue in configure-options", null),
					HttpStatus.FORBIDDEN);
		}
	}
}
