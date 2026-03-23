package com.bnt.rest.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class EncryptionKeysDto extends BaseDto {

	private String dek;

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
