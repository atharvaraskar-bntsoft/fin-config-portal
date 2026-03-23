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
import com.bnt.rest.dto.BinMasterDto;
import com.bnt.rest.service.BinMasterService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/bin-master")
@CrossOrigin(origins = "${crossOriginUrl}")
public class BinMasterController {

	private static final String FIND_ALL_BIN_MASTER = "Find all BinMaster";

	private static final Logger logger = LogManager.getLogger(BinMasterController.class);

	@Autowired
	private BinMasterService binMasterService;

	@Autowired
	private HttpServletRequest request;

	@GetMapping(value = "/{id}")
	public ResponseEntity<Map<String, Object>> findBinMasterById(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("id") int id) {
		logger.info("inside findBinMasterById");
		try {
			BinMasterDto response = binMasterService.findBinMasterDtoById(id);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find Bin-Master");
			responseEntityData.setData(response);
			logger.info("sending response");
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		}
	}

	@GetMapping
	public ResponseEntity<Map<String, Object>> getPagedBinMaster(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info(FIND_ALL_BIN_MASTER);
		try {
			Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
			ResponseWrapper pageJPAData = binMasterService.findPagedBinMaster(requestParamMap);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage(FIND_ALL_BIN_MASTER);
			Map<String, Object> data = RippsUtility.setPageJPAData(pageJPAData);
			if (null != pageJPAData)
				data.put("BinMasterList", pageJPAData.getContent());
			responseEntityData.setData(data);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, FIND_ALL_BIN_MASTER, null),
					HttpStatus.OK);
		}

	}

	@GetMapping("all")
	public ResponseEntity<Map<String, Object>> getAllBinMaster(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info(FIND_ALL_BIN_MASTER);
		try {
			List<BinMasterDto> binMasterDtoList = binMasterService.findAll();
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find all bin-Master List");
			responseEntityData.setData(binMasterDtoList);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, FIND_ALL_BIN_MASTER, null),
					HttpStatus.OK);
		}
	}
}
