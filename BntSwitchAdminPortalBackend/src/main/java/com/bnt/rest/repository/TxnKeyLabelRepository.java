package com.bnt.rest.repository;

import java.util.List;
import java.util.Map;

import com.bnt.common.ResponseWrapper;
import com.bnt.rest.dto.TxnLabelDto;
import com.bnt.rest.entity.TxnLabel;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface TxnKeyLabelRepository {

	ResponseWrapper findAllRecords(Map<String, Object> requestParamMap);

	TxnLabelDto getTxnKeyLabelById(int id);

	TxnLabelDto addTxnKeyLabel(TxnLabelDto txnLabelDto, String requestToken);

	TxnLabelDto updateTxnKeyLabel(int id, TxnLabelDto txnLabelDto, String requestToken);

	List<TxnLabel> findAllRecords();

	Map<String, String> getTxnKeyMap(Boolean updateFlag);

	void delete(int id);

}
