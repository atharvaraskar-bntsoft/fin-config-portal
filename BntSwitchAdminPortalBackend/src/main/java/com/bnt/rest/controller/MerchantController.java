package com.bnt.rest.controller;

import java.util.HashMap;
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
import com.bnt.common.util.RippsUtility;
import com.bnt.constant.RippsRestConstant;
import com.bnt.rest.dto.DtoWrapper;
import com.bnt.rest.service.MerchantServiceRest;
import com.bnt.rest.wrapper.dto.AddressWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/merchant")
@CrossOrigin(origins = "${crossOriginUrl}")
public class MerchantController {
	private static final Logger logger = LogManager.getLogger(MerchantController.class);

	@Autowired
	private MerchantServiceRest merchantServiceRest;

	@Autowired
	private HttpServletRequest request;

	@GetMapping
	public ResponseEntity<Map<String, Object>> listAllMerchants(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Find all Merchants");
		Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
		ResponseWrapper pageJPAData = merchantServiceRest.findAllMerchants(requestParamMap);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find all Merchants");
		Map<String, Object> data = RippsUtility.setPageJPAData(pageJPAData);
		data.put("merchantList", pageJPAData.getContent());
		responseEntityData.setData(data);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "/category-codes")
	public ResponseEntity<Map<String, Object>> getCategoryCodeList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Find all Category Codes");
		List<DtoWrapper> merchantList = merchantServiceRest.getCategoryCode();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find Category Code list");
		responseEntityData.setData(merchantList);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<Map<String, Object>> getMerchantById(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("id") int id) {
		logger.info("Find Merchant Id: {}", id);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setData(merchantServiceRest.findMerchantDtoById(id));
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "/address")
	public ResponseEntity<Map<String, Object>> getMerchantAddressList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Find Merchant Address");
		List<AddressWrapper> addressList = merchantServiceRest.getAddressList();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find Address list");
		responseEntityData.setData(addressList);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "/filter")
	public ResponseEntity<Map<String, Object>> getFilterData() {
		logger.info("Find Filter Merchants");
		Map<String, Object> map = merchantServiceRest.getFilterData();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setData(map);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "/merchant-list/{id}")
	public ResponseEntity<Map<String, Object>> getMerchantByIntitutionId(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("id") int id) {
		logger.info("Find Merchant List Id: {}", id);
		List<DtoWrapper> merchantList = merchantServiceRest.getMerchantByIntitutionId(id);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		Map<String, Object> map = new HashMap<>();
		map.put("merchantList", merchantList);
		responseEntityData.setMessage("Find merchant list by merchant id");
		responseEntityData.setData(map);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

}
