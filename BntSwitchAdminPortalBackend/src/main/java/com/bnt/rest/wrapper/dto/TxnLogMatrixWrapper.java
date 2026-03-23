package com.bnt.rest.wrapper.dto;

import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class TxnLogMatrixWrapper {

	private static final Logger logger = LogManager.getLogger(TxnLogMatrixWrapper.class);

	public TxnLogMatrixWrapper(String genericFieldName) {

		this.genericFieldName = genericFieldName;
	}

	public String getGenericFieldName() {
		return genericFieldName;
	}

	public void setGenericFieldName(String genericFieldName) {
		this.genericFieldName = genericFieldName;
	}

	public KeyValueWrapper getRequest() {
		return request;
	}

	public void setRequest(KeyValueWrapper request) {
		this.request = request;
	}

	public KeyValueWrapper getResponse() {
		return response;
	}

	public void setResponse(KeyValueWrapper response) {
		this.response = response;
	}

	String genericFieldName;

	KeyValueWrapper request;

	KeyValueWrapper response;

	public static TxnLogMatrixWrapper getInstance(Map<String, TxnLogMatrixWrapper> txnMatrixMap,
			String genericFieldName, String transactionId) {
		logger.info("getInstance() for transactionId {}", transactionId);
		TxnLogMatrixWrapper txnMatrix = txnMatrixMap.get(genericFieldName);

		if (txnMatrix == null) {
			txnMatrix = new TxnLogMatrixWrapper(genericFieldName);
		}
		return txnMatrix;
	}
}
