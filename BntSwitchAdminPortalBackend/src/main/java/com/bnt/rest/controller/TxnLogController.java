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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.bnt.common.HttpCommons;
import com.bnt.common.ResponseEntityData;
import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.RippsUtility;
import com.bnt.constant.Constants;
import com.bnt.constant.RippsRestConstant;
import com.bnt.rest.dto.TransactionMerchantRequestDto;
import com.bnt.rest.dto.TxnLogJsonWrapper;
import com.bnt.rest.dto.TxnLogRequestWrapper;
import com.bnt.rest.dto.TxnLogResponseWrapper;
import com.bnt.rest.service.TxnLogBNTService;
import com.bnt.rest.wrapper.dto.CommentWrapper;
import com.bnt.rest.wrapper.dto.TxnLogMatrix;
import com.bnt.rest.wrapper.dto.TxnLookupResponseWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "${crossOriginUrl}")
public class TxnLogController {

	private static final String FIND_TXN_MESSAGE = "Find Txn logs";

	private static final Logger logger = LogManager.getLogger(TxnLogController.class);

	@Autowired
	private TxnLogBNTService txnLogBNTService;

	@Autowired
	private HttpServletRequest request;

	@GetMapping(value = "logs-transactions")
	public ResponseEntity<Map<String, Object>> getAllTxnLogs(@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Find all Transaction Logs");
		try {
			Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
			ResponseWrapper pageJPAData = null;
			pageJPAData = txnLogBNTService.findPagedTxnLogs(requestParamMap);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage(FIND_TXN_MESSAGE);
			Map<String, Object> data = RippsUtility.setPageJPAData(pageJPAData);
			data.put("logsList", pageJPAData.getContent());
			responseEntityData.setData(data);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {

			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		}
	}

	@GetMapping(value = "logs-transactions/{id}")
	public ResponseEntity<ResponseEntityData> getTxnEntityById(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("id") String id) {
		logger.info("Find Transaction Log Id:{} ", id);
		TxnLogResponseWrapper response = null;
		String errorMessage = "";
		try {
			response = txnLogBNTService.findTxnLogEntityById(id);
		} catch (Exception e) {
			errorMessage = e.getMessage();
			logger.error(errorMessage);
		}
		return HttpCommons.setResponseEntityPageDataObject(response, "get txn by id", errorMessage);
	}

	@GetMapping(value = "logs-transactions/{id}/json")
	public ResponseEntity<Map<String, Object>> getTxnJson(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("id") String id) {
		logger.info("Find Transaction Log Json:{} ", id);
		TxnLogJsonWrapper txnJson = null;
		String errorMessage = "";
		try {
			txnJson = txnLogBNTService.findTxnJson(id);
		} catch (Exception e) {
			errorMessage = e.getMessage();
			logger.error(errorMessage);
		}
		if (txnJson == null) {
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, errorMessage, ""),
					HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(
				RippsUtility.setResponseEntityData(RippsRestConstant.SUCCESS, "find txn Json", txnJson), HttpStatus.OK);
	}

	@PutMapping(value = "logs-transactions/{id}/review")
	public ResponseEntity<Map<String, Object>> markTransactionReview(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("id") String transactionId,
			@RequestBody TxnLogRequestWrapper txnLogRequestWrapper) {
		logger.info("Update Transaction Log Mark For Review");
		String requestToken = RippsUtility.getToken(request);
		Boolean status = txnLogRequestWrapper.isForReview();
		Boolean flag = null;
		String errorMessage = "";
		try {
			flag = txnLogBNTService.markTransactionReview(transactionId, status, requestToken);
		} catch (Exception e) {
			errorMessage = e.getMessage();
			logger.error(errorMessage);
		}
		if (flag == null) {
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, errorMessage, ""),
					HttpStatus.NOT_FOUND);
		}
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		String message = "";
		if (Boolean.TRUE.equals(flag)) {
			if (Boolean.TRUE.equals(status)) {
				message = "Transaction marked for review";
			} else {
				message = "Transaction unmarked for review";
			}
		}
		responseEntityData.setMessage(message);
		responseEntityData.setData(flag);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.SUCCESS, message, null),
				HttpStatus.OK);
	}

	@GetMapping(value = "logs-transactions/{transaction-id}/comments")
	public ResponseEntity<Map<String, Object>> getComments(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("transaction-id") String transactionId) {
		logger.info("Find Transaction Comments");
		List<CommentWrapper> response = null;

		String errorMessage = "";
		try {
			response = txnLogBNTService.findTxnComments(transactionId);
		} catch (Exception e) {
			errorMessage = e.getMessage();
			logger.error(errorMessage);
		}
		if (response == null) {
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, errorMessage, ""),
					HttpStatus.NOT_FOUND);
		}
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Get comment");
		Map<String, Object> map = new HashMap<>();
		map.put("commentList", response);
		responseEntityData.setData(map);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@PostMapping(value = "logs-transactions/{transaction-id}/comments")
	@ResponseBody
	public ResponseEntity<Map<String, Object>> addComments(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("transaction-id") String transactionId, @RequestBody CommentWrapper commentWrapper) {
		logger.info("Add Transaction Comments");
		String requestToken = RippsUtility.getToken(request);
		Long commmentId = null;
		String errorMessage = "";
		try {
			commmentId = txnLogBNTService.addComment(commentWrapper, requestToken);
		} catch (Exception e) {
			errorMessage = e.getMessage();
			logger.error(errorMessage);
		}
		if (commmentId != null) {
			Map<String, Object> map = new HashMap<>();
			map.put("id", commmentId);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Comment added");
			responseEntityData.setData(map);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.CREATED);
		} else {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, errorMessage, null),
					HttpStatus.CREATED);
		}
	}

	@GetMapping(value = "logs-transactions/filter")
	public ResponseEntity<Map<String, Object>> getFilterData(@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("getFilterData() Find Filter Transaction Log");
		Map<String, Object> map = txnLogBNTService.getFilterData();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setData(map);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "logs-transactions/source-acquirer")
	public ResponseEntity<Map<String, Object>> getSourceAcquirerIdCodeList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("getSourceAcquirerIdCodeList() Find Filter Transaction Log");
		Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
		ResponseWrapper sourceAcquirerIdCodeList = txnLogBNTService.getSourceAcquirerIdCodeList(requestParamMap);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setData(sourceAcquirerIdCodeList);
		logger.info("To fetch sourceAcquire-code-list complete..");
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "logs-transactions/device")
	public ResponseEntity<Map<String, Object>> getDeviceCodeList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("getDeviceCodeList() Find Filter Transaction Log");
		Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
		ResponseWrapper sourceAcquirerIdCodeList = txnLogBNTService.getDeviceCodeList(requestParamMap);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setData(sourceAcquirerIdCodeList);
		logger.info("To fetch sourceAcquire-code-list complete...");
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "logs-transactions/location")
	public ResponseEntity<Map<String, Object>> getMerchantIdList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("getMerchantIdList() Find Filter Transaction Log");
		Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
		ResponseWrapper sourceAcquirerIdCodeList = txnLogBNTService.getMerchantIdList(requestParamMap);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setData(sourceAcquirerIdCodeList);
		logger.info("To fetch sourceAcquire-code-list complete.");
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "logs-transactions/destination-endpoint")
	public ResponseEntity<Map<String, Object>> getDestinationEndpointList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("getDestinationEndpointList() Find Filter Transaction Log");
		Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
		ResponseWrapper sourceAcquirerIdCodeList = txnLogBNTService.getDestinationEndpointList(requestParamMap);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setData(sourceAcquirerIdCodeList);
		logger.info("To fetch sourceAcquire-code-list complete");
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "logs-transactions/total-lookup/{device-code}", produces = "application/json")
	public @ResponseBody ResponseEntity<ResponseEntityData> getTotalsLookUp(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("device-code") String deviceCode,
			@RequestParam(value = "filters", required = false) String filters) {
		logger.info("Find Total Look Up");
		Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
		TxnLookupResponseWrapper responseObj = null;
		String errorMessage = "";
		try {
			responseObj = txnLogBNTService.getTotalsLookUp(deviceCode, requestParamMap);
		} catch (Exception e) {
			errorMessage = e.getMessage();
			logger.error(errorMessage);
		}
		return HttpCommons.setResponseEntityPageDataObject(responseObj, "get total look-up", errorMessage);
	}

	@GetMapping(value = "logs-transactions/journal-lookup/{device-code}")
	public @ResponseBody ResponseEntity<ResponseEntityData> getTxnJournal(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("device-code") String deviceCode,
			@RequestParam(value = "filters", required = false) String filters) {
		logger.info("Find Transaction Journal");
		Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
		List<String> txnJournal = null;
		String errorMessage = "";
		try {
			txnJournal = txnLogBNTService.findTxnJournal(deviceCode, requestParamMap);
		} catch (Exception e) {
			errorMessage = e.getMessage();
			logger.error(errorMessage);
		}
		return HttpCommons.setResponseEntityPageDataObject(txnJournal, "get txn journal ", errorMessage);
	}

	@GetMapping(value = "logs-transactions/{id}/request-row-matrix")
	public ResponseEntity<Map<String, Object>> getTxnRequestMatrixById(@PathVariable("id") String id,
			@RequestParam(name = "destination") String destinations) {
		logger.info("Find Transaction Log Request Row Matrix");
		TxnLogMatrix response = null;
		try {
			response = txnLogBNTService.findTxnLogMatrixById(id, destinations, Constants.REQUEST_MAPPING_TYPE_MATRIX);
		} catch (Exception e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), ""), HttpStatus.OK);
		}
		if (response == null) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Cannot find Data for the id", ""),
					HttpStatus.OK);
		}
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find Txn Request Matrix");
		responseEntityData.setData(response);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "logs-transactions/{id}/response-row-matrix")
	public ResponseEntity<Map<String, Object>> getTxnResponseMatrixById(@PathVariable("id") String id,
			@RequestParam(name = "destination") String destinations) {
		logger.info("Find Transaction Log Response Row Matrix");
		TxnLogMatrix response = null;
		try {
			response = txnLogBNTService.findTxnLogMatrixById(id, destinations, Constants.RESPONSE_MAPPING_TYPE_MATRIX);
		} catch (Exception e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), ""), HttpStatus.OK);
		}
		if (response == null) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Cannot find Data for the id", ""),
					HttpStatus.OK);
		}
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find Txn Response Matrix");
		responseEntityData.setData(response);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@PutMapping(value = "logs-transactions/merchant")
	public ResponseEntity<Map<String, Object>> deleteTxnLogOfMerchants(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@RequestBody TransactionMerchantRequestDto txnMerchantRequest) {
		logger.info("Delete Merchant List By MerchantInstitution");
		try {
			List<String> merchantList = txnLogBNTService.findMerchantListByMerchantinstitution(txnMerchantRequest);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find MerchantList");
			Map<String, Object> data = new HashMap<>();
			data.put("merchantList", merchantList);
			responseEntityData.setData(data);

			txnLogBNTService.deleteMerchantList(merchantList);
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.SUCCESS, "Txn deleted", data), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null),
					HttpStatus.FORBIDDEN);
		}
	}

	@PutMapping(value = "logs-transactions/count")
	public ResponseEntity<Map<String, Object>> countTxn(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@RequestBody TransactionMerchantRequestDto txnMerchantRequest) {
		logger.info("Count transation");
		try {
			List<String> merchantList = txnLogBNTService.findMerchantListByMerchantinstitution(txnMerchantRequest);
			long count = txnLogBNTService.countTxnLogs(merchantList);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find MerchantList");
			Map<String, Object> data = new HashMap<>();
			data.put("merchantList", merchantList);
			data.put("txnCount", count);
			responseEntityData.setData(data);
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.SUCCESS, "txn counts", data), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null),
					HttpStatus.FORBIDDEN);
		}
	}
}
