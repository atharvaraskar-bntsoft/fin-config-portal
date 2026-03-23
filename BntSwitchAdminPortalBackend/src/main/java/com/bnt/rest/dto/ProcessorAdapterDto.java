package com.bnt.rest.dto;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ProcessorAdapterDto {

	private String code;
	private String name;
	private String description;
	private boolean active;
	private Integer id;
	private Timestamp createdOn;
	private Integer createdBy;
	private Timestamp updatedOn;
	private Integer updatedBy;
	private boolean isSAFEnabled;

	@JsonIgnoreProperties({ "lookupType", "modifiable" })
	private LookupValueDto lookupvalueId;

	@JsonIgnoreProperties({ "standardMessageSpecification", "adapterConfiguration", "guid", "active", "adapterId",
			"imfId" })
	private AdapterDto adapterId;

	public boolean getIsSAFEnabled() {
		return isSAFEnabled;
	}

	public void setIsSAFEnabled(boolean isSAFEnabled) {
		this.isSAFEnabled = isSAFEnabled;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public boolean getActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Timestamp getCreatedOn() {
		return createdOn;
	}

	public void setCreatedOn(Timestamp createdOn) {
		this.createdOn = createdOn;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	public Timestamp getUpdatedOn() {
		return updatedOn;
	}

	public void setUpdatedOn(Timestamp updatedOn) {
		this.updatedOn = updatedOn;
	}

	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public LookupValueDto getLookupvalueId() {
		return lookupvalueId;
	}

	public void setLookupvalueId(LookupValueDto lookupvalueId) {
		this.lookupvalueId = lookupvalueId;
	}

	public AdapterDto getAdapterId() {
		return adapterId;
	}

	public void setAdapterId(AdapterDto adapterId) {
		this.adapterId = adapterId;
	}

	@Override
	public String toString() {
		return "ProcessorAdapterDto [code=" + code + ", name=" + name + ", description=" + description + ", active="
				+ active + ", id=" + id + ", createdOn=" + createdOn + ", createdBy=" + createdBy + ", updatedOn="
				+ updatedOn + ", updatedBy=" + updatedBy + ", isSAFEnabled=" + isSAFEnabled + ", lookupvalueId="
				+ lookupvalueId + ", adapterId=" + adapterId + "]";
	}
}
