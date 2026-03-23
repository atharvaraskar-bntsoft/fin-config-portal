package com.bnt.rest.wrapper.dto.adapter;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class TransformUiSafingCondition {

	String txnType;

	Object conditionJson;

	String updateFlag;

	public String getTxnType() {
		return txnType;
	}

	public void setTxnType(String txnType) {
		this.txnType = txnType;
	}

	public Object getConditionJson() {
		return conditionJson;
	}

	public void setConditionJson(Object conditionJson) {
		this.conditionJson = conditionJson;
	}

	public String getUpdateFlag() {
		return updateFlag;
	}

	public void setUpdateFlag(String updateFlag) {
		this.updateFlag = updateFlag;
	}

}
