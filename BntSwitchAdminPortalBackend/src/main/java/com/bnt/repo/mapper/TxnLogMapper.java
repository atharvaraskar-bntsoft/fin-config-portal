package com.bnt.repo.mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.json.JSONObject;

import com.bnt.common.util.CollectionUtil;
import com.bnt.common.util.DateUtil;
import com.bnt.common.util.JsonObjectUtil;
import com.bnt.common.util.StringUtil;
import com.bnt.constant.TxnUiConstants;
import com.bnt.enums.lookup.InternalProcessingCode;
import com.bnt.rest.dto.CommentEntityDto;
import com.bnt.rest.dto.DtoWrapper;
import com.bnt.rest.dto.TxnLogResponseWrapper;
import com.bnt.rest.entity.TxnLogEntity;
import com.bnt.rest.entity.component.TxnLogConfigurationDto;
import com.bnt.rest.wrapper.dto.AuditInfoWrapper;
import com.bnt.rest.wrapper.dto.CommentWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class TxnLogMapper {

	private static final Logger logger = LogManager.getLogger(TxnLogMapper.class);

	private TxnLogMapper() {
	}

	public static List<String> getDestinationNameList(List<String> codeList, Map<String, String> destinationMap) {

		List<String> destinationCodeList = new ArrayList<>();
		for (String eachCode : codeList) {
			String name = destinationMap.get(eachCode);
			if (name == null) {
				logger.error("Destination not found in the system for the given route code: {}", eachCode);
				continue;
			}
			destinationCodeList.add(name);
		}
		return destinationCodeList;
	}

	public static List<CommentWrapper> mapCommentDtoToResponse(List<CommentEntityDto> commentList) {
		List<CommentWrapper> responseList = new ArrayList<>();
		for (CommentEntityDto eachComment : commentList) {
			CommentWrapper commentWrapper = new CommentWrapper();
			commentWrapper.setForReview(eachComment.isForReview());
			commentWrapper.setId(eachComment.getId());
			if (eachComment.getRemarks() != null) {
				commentWrapper.setRemarks(new String(eachComment.getRemarks()));
			}
			commentWrapper.setTransactionId(eachComment.getTransactionId());
			AuditInfoWrapper auditInfo = new AuditInfoWrapper();
			auditInfo.setCreatedOn(DateUtil.convertUtilDateToTimestamp(eachComment.getCreatedOn()));
			auditInfo.setUpdatedOn(DateUtil.convertUtilDateToTimestamp(eachComment.getUpdatedOn()));
			auditInfo.setCreatedBy(new DtoWrapper(eachComment.getCreatedBy(), "RippsAdmin"));
			auditInfo.setUpdatedBy(new DtoWrapper(eachComment.getUpdatedBy(), "RippsAdmin"));
			commentWrapper.setAuditInfo(auditInfo);
			responseList.add(commentWrapper);
		}
		return responseList;
	}

	public static CommentEntityDto mapRequestToCommentDto(CommentWrapper commentWrapper) {
		CommentEntityDto commentEntityDto = new CommentEntityDto();
		byte[] remarks = commentWrapper.getRemarks() == null ? null : (commentWrapper.getRemarks()).getBytes();
		commentEntityDto.setRemarks(remarks);
		commentEntityDto.setForReview(false);
		commentEntityDto.setTransactionId(commentWrapper.getTransactionId());
		return commentEntityDto;
	}

	public static List<String> mapJournal(List<TxnLogEntity> resultList) {
		String jsonData = null;
		List<String> jsonList = new ArrayList<>();
		for (TxnLogEntity entity : resultList) {
			jsonData = entity.getTransactionData();
			if (jsonData != null) {
				jsonList.add(jsonData);
			}
		}
		return jsonList;
	}

	/**
	 * Set status of transaction
	 */
	public static void setStatus(TxnLogEntity entity, TxnLogResponseWrapper txnLogResponse) {
		TxnLogResponseWrapper.TxnStatusWrapper status = txnLogResponse.new TxnStatusWrapper();
		if (entity.getIpc() != null) {
			status.setText(entity.getIpc());
		}
		if (status.getText() != null) {
			TxnLogMapper.setProcessingStatusToUI(status);
			txnLogResponse.setTxnResponse(status);
		}
	}

	public static String getProcessingStatusFromUI(String value) {
		String processingStatus = null;
		if (value.equals("0")) {
			processingStatus = "FAILURE";
		} else if (value.equals("1")) {
			processingStatus = InternalProcessingCode.IN_PROCESS.name();
		} else if (value.equals("2")) {
			processingStatus = InternalProcessingCode.APPROVED.name();
		}
		return processingStatus;
	}

	public static void setProcessingStatusToUI(TxnLogResponseWrapper.TxnStatusWrapper status) {
		String processingStatus = status.getText();
		Integer type = null;
		String label = null;
		List<String> approvedStatusList = getApprovedStatusList();
		if (approvedStatusList.contains(processingStatus) || processingStatus.toLowerCase().contains("approve")) {
			type = 2;
			label = processingStatus;
		} else if (processingStatus.equals(InternalProcessingCode.IN_PROCESS.name())) {
			type = 1;
			label = InternalProcessingCode.IN_PROCESS.name();
		} else {
			type = 0;
			label = TxnUiConstants.FAILURE;
		}
		status.setType(type);
		status.setLabel(label);
	}

	public static void setTxnStatusToUI(TxnLogResponseWrapper.TxnStatusWrapper txnStatus) {
		String status = txnStatus.getText();
		Integer type = null;
		String label = status;
		if (TxnUiConstants.PENDING.equals(status)) {
			type = 1;
		} else {
			type = 2;
		}
		txnStatus.setType(type);
		txnStatus.setLabel(label);
	}

	public static List<String> getApprovedStatusList() {
		List<String> approvedStatusList = new ArrayList<>();
		approvedStatusList.add(InternalProcessingCode.APPROVED.name());
		approvedStatusList.add(InternalProcessingCode.DCC_TXN.name());
		approvedStatusList.add(InternalProcessingCode.STANDIN_APPROVED.name());
		approvedStatusList.add("Approved_preauthed");
		approvedStatusList.add("APPROVED_PREAUTHED");
		approvedStatusList.add("SUCCESS");
		// APPROVED_STATUS_LIST.add(e)
		return approvedStatusList;
	}

	/**
	 * Convert id of processor adapter list into code list of processor adapter
	 */
	public static void setRouteInfo(TxnLogResponseWrapper txnLogResponse) {

		List<String> destinationCodes = txnLogResponse.getDestinationCodes();
		if (!(CollectionUtil.isCollectionEmptyOrNull(destinationCodes))) {
			List<String> destinationNameList = TxnLogMapper.getDestinationNameList(destinationCodes,
					txnLogResponse.getDestinationMap());
			String destinations = String.join(", ", destinationNameList);
			txnLogResponse.setDestinations(destinations);
		}
	}

	public static void setAmountInfo(TxnLogResponseWrapper txnResponse) {
		txnResponse.setRequestedCurrency(getCurrencyCode(txnResponse.getCurrencyMap(), txnResponse.getRequestedAmount(),
				txnResponse.getRequestedAmountCurrencyCode()));
		txnResponse.setApprovedCurrency(getCurrencyCode(txnResponse.getCurrencyMap(), txnResponse.getApprovedAmount(),
				txnResponse.getApprovedAmountCurrencyCode()));
	}

	private static String getCurrencyCode(Map<String, String> currencyMap, Double amountValue, String currencyCode) {
		if (amountValue != null && !(StringUtil.isEmptyOrNull(currencyCode)) && StringUtil.isNumeric(currencyCode)) {
			return currencyMap.get(currencyCode);
		}
		return currencyCode;
	}

	public static String getMessageTypeIndicator(JSONObject requestObject, TxnLogConfigurationDto txnConfig) {
		JSONObject messageTypeIndicator = JsonObjectUtil.getJSONObject(requestObject,
				txnConfig.getMessageTypeIndicator());
		if (messageTypeIndicator != null) {
			return JsonObjectUtil.getStringValue(messageTypeIndicator, txnConfig.getType());
		}
		return null;
	}
}
