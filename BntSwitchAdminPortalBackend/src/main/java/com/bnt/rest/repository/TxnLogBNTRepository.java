package com.bnt.rest.repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.rest.dto.MerchantBillingDto;
import com.bnt.rest.entity.TxnLogEntity;
import com.bnt.rest.wrapper.dto.TxnLookupResponseWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface TxnLogBNTRepository {

	public ResponseWrapper findPagedTxnLogs(Map<String, Object> requestParamMap);

	public List<Object[]> getIdAndNameList();

	double getTransactionAmountByMerchant(MerchantBillingDto billingDto) throws RippsAdminException;

	int getTransactionExit(MerchantBillingDto billingDto) throws RippsAdminException;

	TxnLookupResponseWrapper getTotalsLookUp(String code, Map<String, Object> requestParamMap);

	List<TxnLogEntity> getTxnJournal(String deviceCode, Map<String, Object> requestParamMap);

	ResponseWrapper findPagedReportTxnLogs(Map<String, Object> requestParamMap);

	Page<TxnLogEntity> getCustomReportFilter(String[] filters, Pageable pageable);

	List<TxnLogEntity> getAllReportFilter(String[] filters);

	long getCountById();

	public Object[] getFollowUpTxn(Long id, String txnId);

	Object[] getFollowUpReversalTxn(Long id, String parentTxnID);

	public Object[] getFollowUpTxnAdvice(Long id, String txnId);

	public ResponseWrapper getSourceAcquirerIdCodeList(Pageable pageable, String[] filters);

	public ResponseWrapper getDeviceCodeList(Pageable pageable, String[] filters);

	public ResponseWrapper getDestinationEndpointList(Pageable pageable, String[] filters);

	public ResponseWrapper getMerchantIdListList(Pageable pageable, String[] filters);

	Page<TxnLogEntity> getCustomFilter(String[] filters, Pageable pageable, boolean refreshCall);

}
