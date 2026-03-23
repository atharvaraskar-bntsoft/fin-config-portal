package com.bnt.enums.lookup;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**************************
 * @author vaibhav.shejol *
 **************************/

@JsonInclude(Include.NON_NULL)
public enum TransactionType {
	PRE_AUTHORIZATION,
	AUTHORIZATION,
	AUTHORIZATION_NOTIFICATION,
	PURCHASE,
	REFUND,
	REVERSAL,
	CAPTURE,
	CAPTURE_NOTIFICATION,
	ACCOUNT_VERIFICATION,
	CARD_VERIFICATION,
	BALANCE_INQUIRY,
	DEBIT,
	DEBIT_CONFIRM,
	ACCOUNT_TRANSFER,
	HOST_TOTAL,
	CUSTOMER_REQUEST,
	ACCOUNTS_REQUEST,
	DEPOSIT_START,
	DEPOSIT_ITEMS,
	NETWORK_TRANSACTION,
	SIGN_ON,
	SIGN_OFF,
	ECHO,
	RECONCILATION,
	BATCH_UPLOAD,
	PIN_CHANGE;
}
