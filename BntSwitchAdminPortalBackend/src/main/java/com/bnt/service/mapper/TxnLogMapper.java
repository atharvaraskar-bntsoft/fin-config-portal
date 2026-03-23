package com.bnt.service.mapper;

import java.util.HashMap;
import java.util.Map;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class TxnLogMapper {

	private TxnLogMapper() {

	}

	private static Map<String, String> txnKeysMap = new HashMap<>();

	public static Map<String, String> getTxnKeysMap() {
		return txnKeysMap;
	}

	public static void setTxnKeysMap(Map<String, String> txnKeysMap) {
		TxnLogMapper.txnKeysMap = txnKeysMap;
	}
}
