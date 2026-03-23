package com.bnt.rest.entity;

import java.io.Serializable;
import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import org.hibernate.annotations.Formula;
import org.hibernate.envers.NotAudited;

import com.bnt.common.util.annotations.ExcludeExportMarker;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Table(name = "txn_log")
@ExcludeExportMarker
public class TxnLogEntity extends AuditTimeEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@Column(name = "created_on")
	private Timestamp createdOn;

	@Column(name = "updated_on")
	private Timestamp updatedOn;

	@Column(name = "txn_id", nullable = false)
	private String txnId;

	@Column(name = "txn_recv_date_time", nullable = false)
	private Timestamp txnRecDateTime;

	@Column(name = "txn_type", nullable = false)
	private String txnType;

	@Column(name = "txn_data", columnDefinition = "jsonb")
	private String transactionData;

	@Column(name = "txn_originator_reference", nullable = true)
	private String txnOriginatorReference;

	@Column(name = "txn_psp_reference", nullable = true)
	private String txnPspReference;

	@Column(name = "merchant_id", nullable = false)
	private String merchantId;

	@Column(name = "terminal_id", nullable = false)
	private String terminalId;

	@Column(name = "ipc", nullable = false)
	private String ipc;

	@Formula("(json_unquote(json_extract(txn_data,'$.message_collection[0].message_exchange.request_message.rrn')))")
	@NotAudited
	private String rrn;

	@Formula("(json_unquote(json_extract(txn_data,'$.message_collection[0].message_exchange.request_message.amounts.amount_transaction.value')))")
	@NotAudited
	private String amount;

	public String getRrn() {
		return rrn;
	}

	public void setRrn(String rrn) {
		this.rrn = rrn;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Override
	public Timestamp getCreatedOn() {
		return createdOn;
	}

	@Override
	public Timestamp getUpdatedOn() {
		return updatedOn;
	}

	@Override
	public void setCreatedOn(Timestamp createdOn) {
		this.createdOn = createdOn;
	}

	@Override
	public void setUpdatedOn(Timestamp updatedOn) {
		this.updatedOn = updatedOn;
	}

	public String getTxnId() {
		return txnId;
	}

	public Timestamp getTxnRecDateTime() {
		return txnRecDateTime;
	}

	public String getTxnType() {
		return txnType;
	}

	public String getTransactionData() {
		return transactionData;
	}

	public String getTxnOriginatorReference() {
		return txnOriginatorReference;
	}

	public String getTxnPspReference() {
		return txnPspReference;
	}

	public String getMerchantId() {
		return merchantId;
	}

	public String getTerminalId() {
		return terminalId;
	}

	public void setTxnId(String txnId) {
		this.txnId = txnId;
	}

	public void setTxnRecDateTime(Timestamp txnRecDateTime) {
		this.txnRecDateTime = txnRecDateTime;
	}

	public void setTxnType(String txnType) {
		this.txnType = txnType;
	}

	public void setTransactionData(String transactionData) {
		this.transactionData = transactionData;
	}

	public void setTxnOriginatorReference(String txnOriginatorReference) {
		this.txnOriginatorReference = txnOriginatorReference;
	}

	public void setTxnPspReference(String txnPspReference) {
		this.txnPspReference = txnPspReference;
	}

	public void setMerchantId(String merchantId) {
		this.merchantId = merchantId;
	}

	public void setTerminalId(String terminalId) {
		this.terminalId = terminalId;
	}

	public String getIpc() {
		return ipc;
	}

	public void setIpc(String ipc) {
		this.ipc = ipc;
	}

	public String getAmount() {
		return amount;
	}

	public void setAmount(String amount) {
		this.amount = amount;
	}
}
