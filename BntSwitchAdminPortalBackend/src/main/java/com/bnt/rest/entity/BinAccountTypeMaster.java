package com.bnt.rest.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Table(name = "bin_account_type_master")
public class BinAccountTypeMaster extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Column(name = "account_name", nullable = false)
	private String accountName;

	@Column(name = "account_type_code", nullable = false)
	private String accountTypeCode;

	@Column(name = "authentication_method")
	private String authenticationMethod;

	@Column(name = "message_protocol_variation")
	private String messageProtocolVariation;

	@Column(name = "minimum_budget_amount")
	private String minimumBudgetAmount;

	@Column(name = "display_prompt")
	private String displayPrompt;

	@Column(name = "budget_allowed")
	private Character budgetAllowed;

	@Column(name = "allow_manual_transaction")
	private Character allowManualTransaction;

	@Column(name = "budget_periods")
	private String budgetPeriods;

	@Column(name = "active", nullable = false)
	private Character active;

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
		this.budgetPeriods = budgetPeriods;
	}

	public Character getActive() {
		return active;
	}

	public void setActive(Character active) {
		this.active = active;
	}
}
