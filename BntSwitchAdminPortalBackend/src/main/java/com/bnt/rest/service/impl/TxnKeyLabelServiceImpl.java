package com.bnt.rest.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bnt.common.ResponseWrapper;
import com.bnt.rest.dto.TxnLabelDto;
import com.bnt.rest.repository.TxnKeyLabelRepository;
import com.bnt.rest.service.TxnKeyLabelService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class TxnKeyLabelServiceImpl implements TxnKeyLabelService {

	@Autowired
	private TxnKeyLabelRepository repository;

	@Override
	public ResponseWrapper findAllRecords(Map<String, Object> requestParamMap) {
		return repository.findAllRecords(requestParamMap);
	}

	@Override
	public TxnLabelDto getTxnKeyLabelById(int id) {
		return repository.getTxnKeyLabelById(id);
	}

	@Override
	public TxnLabelDto addTxnKeyLabel(TxnLabelDto txnLabelDto, String requestToken) {
		return repository.addTxnKeyLabel(txnLabelDto, requestToken);
	}

	@Override
	public TxnLabelDto updateTxnKeyLabel(int id, TxnLabelDto txnLabelDto, String requestToken) {
		return repository.updateTxnKeyLabel(id, txnLabelDto, requestToken);
	}

	@Override
	public void deleteById(int id) {
		repository.delete(id);
	}

}
