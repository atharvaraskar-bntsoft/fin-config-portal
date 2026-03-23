package com.bnt.rest.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Table(name = "encryption_keys")
public class EncryptionKeys extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Column(name = "dek")
	private String dek;

	@Column(name = "mek_id")
	private int mekId;

	public String getDek() {
		return dek;
	}

	public void setDek(String dek) {
		this.dek = dek;
	}

	public int getMekId() {
		return mekId;
	}

	public void setMekId(int mekId) {
		this.mekId = mekId;
	}
}
