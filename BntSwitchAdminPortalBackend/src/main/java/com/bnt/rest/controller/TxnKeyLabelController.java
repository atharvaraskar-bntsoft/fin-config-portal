package com.bnt.rest.controller;

import java.util.HashMap;
import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;

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
import com.bnt.common.util.HTMLInjectionUtil;
import com.bnt.common.util.RippsUtility;
import com.bnt.common.util.StringUtil;
import com.bnt.constant.RippsRestConstant;
import com.bnt.rest.dto.TxnLabelDto;
import com.bnt.rest.service.TxnKeyLabelService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/txn-label")
@CrossOrigin(origins = "${crossOriginUrl}")
public class TxnKeyLabelController {

	private static final Logger logger = LogManager.getLogger(TxnKeyLabelController.class);

	@Autowired
	private TxnKeyLabelService service;

	@Autowired
	private HttpServletRequest request;

	@GetMapping
	public ResponseEntity<Map<String, Object>> getTxnKeyLabel(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Find all TxnKeyLabel");
		Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
		ResponseWrapper pageJPAData = service.findAllRecords(requestParamMap);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find all Records");
		Map<String, Object> data = RippsUtility.setPageJPAData(pageJPAData);
		data.put("resultList", pageJPAData.getContent());
		responseEntityData.setData(data);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<Map<String, Object>> getById(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("id") int id) {
		TxnLabelDto txnLabel = service.getTxnKeyLabelById(id);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find By ID");
		responseEntityData.setData(txnLabel);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<Map<String, Object>> createTxnLabel(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@RequestBody TxnLabelDto txnLabelDto) {
		try {

			if (!StringUtil.isEmptyOrNull(txnLabelDto.getTxnKey()))
				txnLabelDto.setTxnKey(HTMLInjectionUtil.validateHTMLInjection(txnLabelDto.getTxnKey()));
			if (!StringUtil.isEmptyOrNull(txnLabelDto.getLabel()))
				txnLabelDto.setLabel(HTMLInjectionUtil.validateHTMLInjection(txnLabelDto.getLabel()));

			String requestToken = RippsUtility.getToken(request);
			TxnLabelDto txnLabel = service.addTxnKeyLabel(txnLabelDto, requestToken);
			Map<String, Integer> map = new HashMap<>();
			map.put("id", txnLabel.getId());
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("TxnLabel Created");
			responseEntityData.setData(map);
			if (txnLabel.getId() > 0) {
				return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.CREATED);
			} else {
				return new ResponseEntity<>(
						RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "TxnLabel Not created", null),
						HttpStatus.CREATED);
			}
		} catch (RippsAdminException ripException) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, ripException.getMessage(), null),
					HttpStatus.CREATED);
		} catch (Exception e) {
			logger.error(e);
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "TxnLabel Not created", null),
					HttpStatus.CREATED);
		}
	}

	@PutMapping(value = "/{id}")
	public ResponseEntity<Map<String, Object>> updateTxnLabel(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("id") int id, @RequestBody TxnLabelDto txnLabelDto) {
		String requestToken = RippsUtility.getToken(request);
		/**
		 * // TxnLabel txnLabel = service.getTxnKeyLabelById(id); // if (txnLabel ==
		 * null) { // return new ResponseEntity<>( //
		 * RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "TxnKeyLabel
		 * NOT FOUND", ""), // HttpStatus.NOT_FOUND); // }
		 */
		if (!StringUtil.isEmptyOrNull(txnLabelDto.getTxnKey()))
			txnLabelDto.setTxnKey(HTMLInjectionUtil.validateHTMLInjection(txnLabelDto.getTxnKey()));
		if (!StringUtil.isEmptyOrNull(txnLabelDto.getLabel()))
			txnLabelDto.setLabel(HTMLInjectionUtil.validateHTMLInjection(txnLabelDto.getLabel()));

		TxnLabelDto newTxnLabelDto = service.updateTxnKeyLabel(id, txnLabelDto, requestToken);
		return new ResponseEntity<>(
				RippsUtility.setResponseEntityData(RippsRestConstant.SUCCESS, "TxnKeyLabel Updated", newTxnLabelDto),
				HttpStatus.OK);
	}

	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Map<String, Object>> deleteTxnKeyLabel(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("id") int id) {
		logger.info("Delete TxnKeylabel Id: {}", id);
		service.deleteById(id);
		return new ResponseEntity<>(
				RippsUtility.setResponseEntityData(RippsRestConstant.SUCCESS, "TxnKeyLabel deleted", null),
				HttpStatus.OK);
	}
}
