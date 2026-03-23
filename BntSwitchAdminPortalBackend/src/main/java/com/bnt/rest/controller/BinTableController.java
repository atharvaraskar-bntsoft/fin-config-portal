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
import com.bnt.rest.dto.BinTableDto;
import com.bnt.rest.service.BinTableService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/bin-table")
@CrossOrigin(origins = "${crossOriginUrl}")
public class BinTableController {

	private static final String FIND_ALL_BIN_TABLE = "Find all BinTable";

	private static final String SENDING_RESPONSE = "sending response";

	private static final Logger logger = LogManager.getLogger(BinTableController.class);

	@Autowired
	private BinTableService binTableService;

	@Autowired
	private HttpServletRequest request;

	@GetMapping(value = "/{id}")
	public ResponseEntity<Map<String, Object>> findBinTableById(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("id") int id) {
		logger.info("inside findBinTableById");
		try {
			BinTableDto response = binTableService.findBinTableDtoById(id);
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
	public ResponseEntity<Map<String, Object>> getPagedBinTable(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info(FIND_ALL_BIN_TABLE);
		try {
			Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
			ResponseWrapper pageJPAData = binTableService.findPagedBinTable(requestParamMap);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage(FIND_ALL_BIN_TABLE);
			Map<String, Object> data = RippsUtility.setPageJPAData(pageJPAData);
			data.put("BinTableList", pageJPAData.getContent());
			responseEntityData.setData(data);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, FIND_ALL_BIN_TABLE, null),
					HttpStatus.OK);
		}

	}

	@GetMapping("/pagable/{bin-master-id}")
	public ResponseEntity<Map<String, Object>> getPagedBinTable(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable(value = "bin-master-id") Integer binMasterId) {
		logger.info(FIND_ALL_BIN_TABLE);
		try {
			Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
			ResponseWrapper pageJPAData = binTableService.findBinTableByBinMasterId(binMasterId, requestParamMap);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage(FIND_ALL_BIN_TABLE);
			Map<String, Object> data = RippsUtility.setPageJPAData(pageJPAData);
			data.put("BinTableList", pageJPAData.getContent());
			responseEntityData.setData(data);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, FIND_ALL_BIN_TABLE, null),
					HttpStatus.OK);
		}

	}

	@GetMapping(value = "/all-bin-tables-for-master-id/{id}")
	public ResponseEntity<Map<String, Object>> getAllBinTableByBinMasterId(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("id") int id) {
		logger.info("inside findBinTableById");
		try {
			List<BinTableDto> response = binTableService.getAllBinTableByBinMasterId(id);
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

	@GetMapping(value = "/all-bin-tables")
	public ResponseEntity<Map<String, Object>> getAllBinTable(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("inside getAllBinTable");
		try {
			List<BinTableDto> response = binTableService.findAll();
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
