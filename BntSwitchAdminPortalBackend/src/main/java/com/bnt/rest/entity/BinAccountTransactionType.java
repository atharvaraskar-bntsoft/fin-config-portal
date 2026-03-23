package com.bnt.rest.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Table(name = "bin_account_transaction_type")
public class BinAccountTransactionType extends BaseEntity {

	private static final long serialVersionUID = -142061615824489028L;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "bin_account_type_id")
	@JsonBackReference
	private BinAccountType binAccountTypeId;

	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "transaction_types_id")
	private LookupValue transactionTypesId;

	@Column(name = "active", nullable = false)
	private Character active;

	@Column(name = "txn_type_code", nullable = true)
	private String txnTypeCode;

	public BinAccountType getBinAccountTypeId() {
		return binAccountTypeId;
	}

	public void setBinAccountTypeId(BinAccountType binAccountTypeId) {
		this.binAccountTypeId = binAccountTypeId;
	}

	public LookupValue getTransactionTypesId() {
		return transactionTypesId;
	}

	public void setTransactionTypesId(LookupValue transactionTypesId) {
		this.transactionTypesId = transactionTypesId;
	}

	public Character getActive() {
		return active;
	}

	public void setActive(Character active) {
		this.active = active;
	}

	public String getTxnTypeCode() {
		return txnTypeCode;
	}

	public void setTxnTypeCode(String txnTypeCode) {
		this.txnTypeCode = txnTypeCode;
	}
}
