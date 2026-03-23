package com.bnt.rest.service;

import java.util.List;
import java.util.Map;

import com.bnt.common.ResponseWrapper;

import com.bnt.common.RippsAdminException;
import com.bnt.common.util.exception.RippsAdminRestException;
import com.bnt.rest.dto.MerchantBillingDto;
import com.bnt.rest.dto.TransactionMerchantRequestDto;
import com.bnt.rest.dto.TxnLogJsonWrapper;
import com.bnt.rest.dto.TxnLogResponseWrapper;
import com.bnt.rest.entity.TxnLogEntity;
import com.bnt.rest.wrapper.dto.CommentWrapper;
import com.bnt.rest.wrapper.dto.TxnLogMatrix;
import com.bnt.rest.wrapper.dto.TxnLookupResponseWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface TxnLogBNTService {

	public ResponseWrapper findPagedTxnLogs(Map<String, Object> requestParamMap) throws RippsAdminRestException;

	Boolean markTransactionReview(String transactionId, boolean status, String authToken);

	TxnLogJsonWrapper findTxnJson(String transactionId);

	public List<CommentWrapper> findTxnComments(String transactionId);

	public Long addComment(CommentWrapper commentWrapper, String requestToken);

	// double getTransactionAmountByMerchant(MerchantBillingDto billDto) throws
	// RippsAdminException;

	// int getTransactionExit(MerchantBillingDto billDto) throws
	// RippsAdminException;

	public Map<String, Object> getFilterData();

	TxnLookupResponseWrapper getTotalsLookUp(String deviceId, Map<String, Object> requestParamMap);

	List<String> findTxnJournal(String deviceId, Map<String, Object> requestParamMap);

	// public String findTxnJsonById(String id);

	TxnLogResponseWrapper findTxnLogEntityById(String id);

//    ResponseWrapper findPagedReportTxnLogs(Map<String, Object> requestParamMap) throws RippsAdminRestException;

	List<TxnLogEntity> findCSVReportTxnLogs(Map<String, Object> requestParamMap) throws RippsAdminRestException;

	TxnLogMatrix findTxnLogMatrixById(String id, String destinations, String mappingType);

	String findTxnJsonString(String transactionId);

	String findMessageContext(String transactionId);

	List<String> findMerchantListByMerchantinstitution(TransactionMerchantRequestDto txnMerchantRequest);

	void deleteMerchantList(List<String> merchantList);

	long countTxnLogs(List<String> merchantList);

	// Object[] getFollowupTransaction(Long id, String txnId);

	// Object[] getFollowupReversalTransaction(Long id, String txnId);

	Object[] getFollowupAdviceTransaction(Long id, String txnId);

	public ResponseWrapper getSourceAcquirerIdCodeList(Map<String, Object> requestParamMap);

	public ResponseWrapper getDeviceCodeList(Map<String, Object> requestParamMap);

	public ResponseWrapper getDestinationEndpointList(Map<String, Object> requestParamMap);

	public ResponseWrapper getMerchantIdList(Map<String, Object> requestParamMap);

}
