package com.bnt.rest.entity.component;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Configuration
@PropertySource("classpath:txnLog.properties")
public class TxnLogConfigurationDto {

	@Value("${msg.request}")
	String msgRequest;

	@Value("${service.type}")
	String msgServiceTypeEnum;

	@Value("${adapter.id}")
	String adapterId;

	@Value("${pos.txn.type}")
	String posTxnType;

	@Value("${pos.payment.method}")
	String posPaymentMethod;

	@Value("${inflight.transactions}")
	String msgCollection;

	@Value("${msg.exchange}")
	String msgExchange;

	@Value("${internal.processingCode}")
	String internalProceCode;

	@Value("${msg.route}")
	String msgRoute;

	@Value("${msg.response}")
	String msgResponse;

	@Value("${auditInfo.createdOn}")
	String createdOn;

	@Value("${processingStatus}")
	String processingStatus;

	@Value("${response.code}")
	String responseCode;

	@Value("${transaction.response}")
	String transactionResponse;

	@Value("${txn.amount}")
	String amount;

	@Value("${txn.currency}")
	String currency;

	@Value("${txn.amounts}")
	String amounts;

	@Value("${txn.amount_transaction}")
	String amountTransaction;

	@Value("${txn.amount_auth_transaction}")
	String amountAuthTxn;

	@Value("${on_us}")
	String onUs;

	@Value("${message_type_indicator}")
	String messageTypeIndicator;

	@Value("${transaction_type_indicator}")
	String transactionTypeIndicator;

	@Value("${type}")
	String type;

	@Value("${rrn}")
	String rrn;

	@Value("${acquirer_institution_code}")
	String acqInstitution;

	@Value("${safProcessed}")
	String isSafProcessed;

	public String getIsSafProcessed() {
		return isSafProcessed;
	}

	public void setIsSafProcessed(String isSafProcessed) {
		this.isSafProcessed = isSafProcessed;
	}

	public String getAcqInstitution() {
		return acqInstitution;
	}

	public void setAcqInstitution(String acqInstitution) {
		this.acqInstitution = acqInstitution;
	}

	public String getRrn() {
		return rrn;
	}

	public void setRrn(String rrn) {
		this.rrn = rrn;
	}

	public String getMsgRequest() {
		return msgRequest;
	}

	public String getMsgServiceTypeEnum() {
		return msgServiceTypeEnum;
	}

	public String getAdapterId() {
		return adapterId;
	}

	public String getPosTxnType() {
		return posTxnType;
	}

	public String getPosPaymentMethod() {
		return posPaymentMethod;
	}

	public String getMsgCollection() {
		return msgCollection;
	}

	public String getMsgExchange() {
		return msgExchange;
	}

	public String getInternalProceCode() {
		return internalProceCode;
	}

	public String getMsgRoute() {
		return msgRoute;
	}

	public String getMsgResponse() {
		return msgResponse;
	}

	public String getCreatedOn() {
		return createdOn;
	}

	public String getProcessingStatus() {
		return processingStatus;
	}

	public String getResponseCode() {
		return responseCode;
	}

	public void setResponseCode(String responseCode) {
		this.responseCode = responseCode;
	}

	public String getTransactionResponse() {
		return transactionResponse;
	}

	public String getAmount() {
		return amount;
	}

	public String getCurrency() {
		return currency;
	}

	public String getAmounts() {
		return amounts;
	}

	public String getAmountTransaction() {
		return amountTransaction;
	}

	public String getOnUs() {
		return onUs;
	}

	public String getMessageTypeIndicator() {
		return messageTypeIndicator;
	}

	public String getTransactionTypeIndicator() {
		return transactionTypeIndicator;
	}

	public String getType() {
		return type;
	}

	public String getAmountAuthTxn() {
		return amountAuthTxn;
	}
}
