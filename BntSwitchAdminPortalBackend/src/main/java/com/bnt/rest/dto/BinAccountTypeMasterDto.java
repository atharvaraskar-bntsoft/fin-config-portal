package com.bnt.rest.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.bnt.common.util.JsonObjectUtil;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class BinAccountTypeMasterDto extends BaseDto {

	private String accountName;

	private String accountTypeCode;

	private String authenticationMethod;

	private String messageProtocolVariation;

	private String minimumBudgetAmount;

	private String displayPrompt;

	private Character budgetAllowed;

	private Character allowManualTransaction;

	@JsonIgnore
	private String budgetPeriods;

	@JsonProperty("budgetPeriods")
	private Object budgetPeriodsUi;

	private Character active;

	@JsonIgnore
	private List<String> linkedTransactionTypes;

	public String getAccountName() {
		return accountName;
	}

	public void setAccountName(String accountName) {
		this.accountName = accountName;
	}

	public String getAccountTypeCode() {
		return accountTypeCode;
	}

	public void setAccountTypeCode(String accountTypeCode) {
		this.accountTypeCode = accountTypeCode;
	}

	public String getAuthenticationMethod() {
		return authenticationMethod;
	}

	public void setAuthenticationMethod(String authenticationMethod) {
		this.authenticationMethod = authenticationMethod;
	}

	public String getMessageProtocolVariation() {
		return messageProtocolVariation;
	}

	public void setMessageProtocolVariation(String messageProtocolVariation) {
		this.messageProtocolVariation = messageProtocolVariation;
	}

	public String getMinimumBudgetAmount() {
		return minimumBudgetAmount;
	}

	public void setMinimumBudgetAmount(String minimumBudgetAmount) {
		this.minimumBudgetAmount = minimumBudgetAmount;
	}

	public String getDisplayPrompt() {
		return displayPrompt;
	}

	public void setDisplayPrompt(String displayPrompt) {
		this.displayPrompt = displayPrompt;
	}

	public Character getBudgetAllowed() {
		return budgetAllowed;
	}

	public void setBudgetAllowed(Character budgetAllowed) {
		this.budgetAllowed = budgetAllowed;
	}

	public Character getAllowManualTransaction() {
		return allowManualTransaction;
	}

	public void setAllowManualTransaction(Character allowManualTransaction) {
		this.allowManualTransaction = allowManualTransaction;
	}

	public String getBudgetPeriods() {
		return budgetPeriods;
	}

	public void setBudgetPeriods(String budgetPeriods) {
		this.budgetPeriodsUi = JsonObjectUtil.getObjectFromJsonString(budgetPeriods);
		this.budgetPeriods = budgetPeriods;
	}

	public Character getActive() {
		return active;
	}

	public void setActive(Character active) {
		this.active = active;
	}

	public List<String> getLinkedTransactionTypes() {
		return linkedTransactionTypes;
	}

	public void setLinkedTransactionTypes(List<String> linkedTransactionTypes) {
		this.linkedTransactionTypes = linkedTransactionTypes;
	}

	public Object getBudgetPeriodsUi() {
		return budgetPeriodsUi;
	}

	public void setBudgetPeriodsUi(Object budgetPeriodsUi) {
		this.budgetPeriods = JsonObjectUtil.getJsonStringFromObject(budgetPeriodsUi);
		this.budgetPeriodsUi = budgetPeriodsUi;
	}
}
