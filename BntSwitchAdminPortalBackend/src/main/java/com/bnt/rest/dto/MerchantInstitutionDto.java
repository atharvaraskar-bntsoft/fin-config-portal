package com.bnt.rest.dto;

import java.sql.Timestamp;

import jakarta.validation.Valid;

import com.fasterxml.jackson.annotation.JsonIgnore;

import com.bnt.rest.wrapper.dto.IdAndNameWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class MerchantInstitutionDto extends BaseDto {

	private IdAndNameWrapper institution;

	private AcquirerIdConfigDto acquirer;

	public AcquirerIdConfigDto getAcquirer() {
		return acquirer;
	}

	public void setAcquirer(AcquirerIdConfigDto acquirer) {
		this.acquirer = acquirer;
	}

	private String code;

	private String name;

	private String description;

	private Timestamp activateOn;

	private Timestamp expiryOn;

	private Integer totalMerchant;

	private Integer totalLocation;

	private Integer totalDevice;

	@Valid
	private MerchantInstitutionDetailDto merchantInstitutionDetail;

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Timestamp getActivateOn() {
		return activateOn;
	}

	public void setActivateOn(Timestamp activateOn) {
		this.activateOn = activateOn;
	}

	public Timestamp getExpiryOn() {
		return expiryOn;
	}

	public void setExpiryOn(Timestamp expiryOn) {
		this.expiryOn = expiryOn;
	}

	public MerchantInstitutionDetailDto getMerchantInstitutionDetail() {
		return merchantInstitutionDetail;
	}

	public void setMerchantInstitutionDetail(MerchantInstitutionDetailDto institutionDetail) {
		this.merchantInstitutionDetail = institutionDetail;
	}

	public Integer getTotalMerchant() {
		return totalMerchant;
	}

	public void setTotalMerchant(Integer totalMerchant) {
		this.totalMerchant = totalMerchant;
	}

	public Integer getTotalLocation() {
		return totalLocation;
	}

	public void setTotalLocation(Integer totalLocation) {
		this.totalLocation = totalLocation;
	}

	public Integer getTotalDevice() {
		return totalDevice;
	}

	public void setTotalDevice(Integer totalDevice) {
		this.totalDevice = totalDevice;
	}

	private Character locked;

	@JsonIgnore
	private Character deleted;

	public IdAndNameWrapper getInstitution() {
		return institution;
	}

	public void setInstitution(IdAndNameWrapper institutionID) {
		this.institution = institutionID;
	}

	public Character getLocked() {
		return locked;
	}

	public void setLocked(Character locked) {
		this.locked = locked;
	}

	public Character getDeleted() {
		return deleted;
	}

	public void setDeleted(Character deleted) {
		this.deleted = deleted;
	}

	@JsonIgnore
	private String menuId;

	public String getMenuId() {
		return menuId;
	}

	public void setMenuId(String menuId) {
		this.menuId = menuId;
	}
}
