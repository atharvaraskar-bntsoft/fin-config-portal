package com.bnt.rest.service;

import java.util.Map;

import com.bnt.common.ResponseWrapper;
import com.bnt.rest.dto.TxnLabelDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface TxnKeyLabelService {

	ResponseWrapper findAllRecords(Map<String, Object> requestParamMap);

	TxnLabelDto getTxnKeyLabelById(int id);

	TxnLabelDto addTxnKeyLabel(TxnLabelDto txnLabelDto, String requestToken);

	TxnLabelDto updateTxnKeyLabel(int id, TxnLabelDto txnLabelDto, String requestToken);

	void deleteById(int id);

}
