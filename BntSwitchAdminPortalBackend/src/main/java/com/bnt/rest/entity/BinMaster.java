package com.bnt.rest.entity;

import java.sql.Timestamp;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Table(name = "bin_master")
public class BinMaster extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Column(name = "file_name", nullable = false)
	private String fileName;

	@Column(name = "uploaded_on", nullable = false)
	private Timestamp uploadedOn;

	@Column(name = "activate_on", nullable = false)
	private Timestamp activateOn;

	@Column(name = "active", nullable = false)
	private Character active;

	@OneToMany(mappedBy = "binMasterId", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JsonManagedReference
	private List<BinTable> binTable;

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

	public List<BinTable> getBinTable() {
		return binTable;
	}

	public void setBinTable(List<BinTable> binTable) {
		this.binTable = binTable;
	}
}
