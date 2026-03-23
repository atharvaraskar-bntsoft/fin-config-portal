package com.bnt.rest.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Table(name = "bin_account_type")
public class BinAccountType extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "bin_table_id")
	@JsonBackReference
	private BinTable binTableId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "bin_account_type_id")
	private BinAccountTypeMaster binAccountTypeMasterId;

	@Column(name = "active", nullable = false)
	private Character active;

	@OneToMany(mappedBy = "binAccountTypeId", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JsonManagedReference
	private List<BinAccountTransactionType> binAccountTransactionType;

	public BinTable getBinTableId() {
		return binTableId;
	}

	public void setBinTableId(BinTable binTableId) {
		this.binTableId = binTableId;
	}

	public BinAccountTypeMaster getBinAccountTypeMasterId() {
		return binAccountTypeMasterId;
	}

	public void setBinAccountTypeMasterId(BinAccountTypeMaster binAccountTypeMasterId) {
		this.binAccountTypeMasterId = binAccountTypeMasterId;
	}

	public Character getActive() {
		return active;
	}

	public void setActive(Character active) {
		this.active = active;
	}

	public List<BinAccountTransactionType> getBinAccountTransactionType() {
		return binAccountTransactionType;
	}

	public void setBinAccountTransactionType(List<BinAccountTransactionType> binAccountTransactionType) {
		this.binAccountTransactionType = binAccountTransactionType;
	}
}
