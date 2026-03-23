package com.bnt.rest.dto;

import java.sql.Timestamp;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class BinMasterDto extends BaseDto {

	private String fileName;

	private Timestamp uploadedOn;

	private Timestamp activateOn;

	private Character active;

	@JsonManagedReference
	private List<BinTableDto> binTable;

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public Timestamp getUploadedOn() {
		return uploadedOn;
	}

	public void setUploadedOn(Timestamp uploadedOn) {
		this.uploadedOn = uploadedOn;
	}

	public Timestamp getActivateOn() {
		return activateOn;
	}

	public void setActivateOn(Timestamp activateOn) {
		this.activateOn = activateOn;
	}

	public Character getActive() {
		return active;
	}

	public void setActive(Character active) {
		this.active = active;
	}

	public List<BinTableDto> getBinTable() {
		return binTable;
	}

	public void setBinTable(List<BinTableDto> binTable) {
		this.binTable = binTable;
	}
}
