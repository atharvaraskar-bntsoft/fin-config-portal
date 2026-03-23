package com.bnt.rest.controller;

import java.util.List;
import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bnt.common.HttpCommons;
import com.bnt.common.ResponseEntityData;
import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.RippsUtility;
import com.bnt.constant.RippsRestConstant;
import com.bnt.rest.dto.BinAccountTypeDto;
import com.bnt.rest.service.BinAccountTypeService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/bin-account-type")
@CrossOrigin(origins = "${crossOriginUrl}")
public class BinAccountTypeController {

	private static final String FIND_ALL_BIN_ACCOUNT_TYPE = "Find all BinAccountType";

	private static final String SENDING_RESPONSE = "sending response";

	private static final Logger logger = LogManager.getLogger(BinAccountTypeController.class);

	@Autowired
	private BinAccountTypeService binAccountTypeService;

	@Autowired
	private HttpServletRequest request;

	@GetMapping(value = "/{id}")
	public ResponseEntity<Map<String, Object>> findBinAccountTypeById(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("id") int id) {
		logger.info("inside findBinAccountTypeById");
		try {
			BinAccountTypeDto response = binAccountTypeService.findBinAccountTypeDtoById(id);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find Bin-Table");
			responseEntityData.setData(response);
			logger.info(SENDING_RESPONSE);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		}
	}

	@GetMapping
	public ResponseEntity<Map<String, Object>> getPagedBinAccountType(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("inside getPagedBinAccountType");
		try {
			Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
			ResponseWrapper pageJPAData = binAccountTypeService.findPagedBinAccountType(requestParamMap);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage(FIND_ALL_BIN_ACCOUNT_TYPE);
			Map<String, Object> data = RippsUtility.setPageJPAData(pageJPAData);
			data.put("BinAccountTypeList", pageJPAData.getContent());
			responseEntityData.setData(data);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, FIND_ALL_BIN_ACCOUNT_TYPE, null),
					HttpStatus.OK);
		}

	}

	@GetMapping("/pagable/{bin-table-id}")
	public ResponseEntity<Map<String, Object>> getPagedBinAccountType(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable(value = "bin-table-id") Integer bintableId) {
		logger.info(FIND_ALL_BIN_ACCOUNT_TYPE);
		try {
			Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
			ResponseWrapper pageJPAData = binAccountTypeService.findBinAccountTypeByBinTableId(bintableId,
					requestParamMap);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage(FIND_ALL_BIN_ACCOUNT_TYPE);
			Map<String, Object> data = RippsUtility.setPageJPAData(pageJPAData);
			data.put("BinAccountTypeList", pageJPAData.getContent());
			responseEntityData.setData(data);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, FIND_ALL_BIN_ACCOUNT_TYPE, null),
					HttpStatus.OK);
		}

	}

	@GetMapping(value = "/all-accounts-for-bin-id/{id}")
	public ResponseEntity<Map<String, Object>> getAllBinAccountTypeByBinTableId(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("id") int id) {
		logger.info("inside findBinAccountTypeById");
		try {
			List<BinAccountTypeDto> response = binAccountTypeService.getAllBinAccountTypeByBinTableId(id);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find Bin-Table List");
			responseEntityData.setData(response);
			logger.info(SENDING_RESPONSE);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		}
	}

	@GetMapping(value = "/all-bin-account-types")
	public ResponseEntity<Map<String, Object>> getAllBinAccountType(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("inside getAllBinAccountType");
		try {
			List<BinAccountTypeDto> response = binAccountTypeService.findAll();
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find Bin-Table List");
			responseEntityData.setData(response);
			logger.info(SENDING_RESPONSE);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		}
	}

}
