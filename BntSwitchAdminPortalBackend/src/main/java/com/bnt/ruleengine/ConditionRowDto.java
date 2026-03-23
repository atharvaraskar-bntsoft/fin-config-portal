package com.bnt.ruleengine;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ConditionRowDto {

	private String startParenthesis;
	private String endParenthesis;
	private String selectionCriteriaValue;
	private String selectionCriteria;
	private String logicalOperator;
	private String conditionalOperator;
	private String txnAmount;
	private Double transactionAmt;
	private String binRange;

	public String getStartParenthesis() {
		return startParenthesis;
	}

	public void setStartParenthesis(String startParenthesis) {
		this.startParenthesis = startParenthesis;
	}

	public String getEndParenthesis() {
		return endParenthesis;
	}

	public void setEndParenthesis(String endParenthesis) {
		this.endParenthesis = endParenthesis;
	}

	public String getSelectionCriteriaValue() {
		return selectionCriteriaValue;
	}

	public void setSelectionCriteriaValue(String selectionCriteriaValue) {
		this.selectionCriteriaValue = selectionCriteriaValue;
	}

	public String getSelectionCriteria() {
		return selectionCriteria;
	}

	public void setSelectionCriteria(String selectionCriteria) {
		this.selectionCriteria = selectionCriteria;
	}

	public String getLogicalOperator() {
		return logicalOperator;
	}

	public void setLogicalOperator(String logicalOperator) {
		this.logicalOperator = logicalOperator;
	}

	public String getConditionalOperator() {
		return conditionalOperator;
	}

	public void setConditionalOperator(String conditionalOperator) {
		this.conditionalOperator = conditionalOperator;
	}

	public String getTxnAmount() {
		return txnAmount;
	}

	public void setTxnAmount(String txnAmount) {
		this.txnAmount = txnAmount;
	}

	public Double getTransactionAmt() {
		return transactionAmt;
	}

	public void setTransactionAmt(Double transactionAmt) {
		this.transactionAmt = transactionAmt;
	}

	public String getBinRange() {
		return binRange;
	}

	public void setBinRange(String binRange) {
		this.binRange = binRange;
	}
}
