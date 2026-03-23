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
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.MerchantInstitutionDto;
import com.bnt.rest.entity.MerchantInstitution;
import com.bnt.rest.service.MerchantInstitutionService;
import com.bnt.rest.wrapper.dto.AddressWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/merchant-institution")
@CrossOrigin(origins = "${crossOriginUrl}")
public class MerchantInstitutionController {

	private static final Logger logger = LogManager.getLogger(MerchantInstitutionController.class);

	@Autowired
	private MerchantInstitutionService institutionService;

	@Autowired
	private HttpServletRequest request;

	@GetMapping
	public ResponseEntity<Map<String, Object>> findAllMerchantInstitutions(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Find all Institution/Merchant Group");
		try {
			Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
			ResponseWrapper pageJPAData = institutionService.getMerchantInstitutionList(requestParamMap);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find all Merchant Groups");
			Map<String, Object> data = RippsUtility.setPageJPAData(pageJPAData);
			data.put("institutionList", pageJPAData.getContent());
			responseEntityData.setData(data);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Find all Merchant Groups", null),
					HttpStatus.FORBIDDEN);
		}
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<Map<String, Object>> getMerchantInsById(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("id") int id) {
		logger.info("Find Institution/Merchant Group ID: {}", id);
		MerchantInstitution merchantInstitution = institutionService.findInstitutionById(id);
		MerchantInstitutionDto merchantInstitutionDto = ObjectMapper.mapToDto(merchantInstitution,
				MerchantInstitutionDto.class);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find Merchant Group");
		responseEntityData.setData(merchantInstitutionDto);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "/address")
	public ResponseEntity<Map<String, Object>> getInstitutionAddressList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Find all Institution/Merchant Group");
		List<AddressWrapper> addressList = institutionService.getAddressList();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find Address list");
		responseEntityData.setData(addressList);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "/filter")
	public ResponseEntity<Map<String, Object>> getFilterData(@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Find filter Institution/Merchant Group");
		Map<String, Object> map = institutionService.getFilterData();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setData(map);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}
}
