package com.bnt.rest.dto;

import java.sql.Timestamp;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.gson.JsonElement;
import com.bnt.common.util.GsonUtil;

import com.bnt.common.util.JsonObjectUtil;
import com.bnt.rest.wrapper.dto.CoordinateDto;
import com.bnt.rest.wrapper.dto.IdAndNameWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class LocationDto extends BaseDto {

	private Integer totalDevice;

	private String code;

	@NotEmpty
	private String name;

	private IdAndNameWrapper merchant;

	private IdAndNameWrapper merchantInstitution;

	private String description;

	private Timestamp activateOn;

	private Timestamp expiryOn;

	private String storeId;

	@JsonIgnore
	private Character deleted;

	private Character posSafetyFlag;

	public Character getPosSafetyFlag() {
		return posSafetyFlag;
	}

	public void setPosSafetyFlag(Character posSafetyFlag) {
		this.posSafetyFlag = posSafetyFlag;
	}

	public String getReversalTimeout() {
		return reversalTimeout;
	}

	public void setReversalTimeout(String reversalTimeout) {
		this.reversalTimeout = reversalTimeout;
	}

	private String reversalTimeout;

	public String getAdditionalAttribute() {
		return additionalAttribute;
	}

	public void setAdditionalAttribute(String additionalAttribute) {
		this.additionalAttributeUi = JsonObjectUtil.getObjectFromJsonString(additionalAttribute);
		this.additionalAttribute = additionalAttribute;
	}

	@JsonIgnore
	private String additionalAttribute;

	@JsonProperty("additionalAttribute")
	private Object additionalAttributeUi;

	public Object getAdditionalAttributeUi() {
		return additionalAttributeUi;
	}

	public void setAdditionalAttributeUi(Object additionalAttributeUi) {
		this.additionalAttribute = null;
		if (additionalAttributeUi != null) {
			JsonElement jsonElementCode = GsonUtil.getJsonObjectFromType(additionalAttributeUi, true);
			this.additionalAttribute = jsonElementCode.toString();
		}
		this.additionalAttributeUi = additionalAttributeUi;
	}

	private Character locked;

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

	@Valid
	private LocationDetailDto locationDetail;

	private CoordinateDto coordinates;

	public Integer getTotalDevice() {
		return totalDevice;
	}

	public void setTotalDevice(Integer totalDevice) {
		this.totalDevice = totalDevice;
	}

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

	public LocationDetailDto getLocationDetail() {
		return locationDetail;
	}

	public void setLocationDetail(LocationDetailDto locationDetail) {
		this.locationDetail = locationDetail;
	}

	public CoordinateDto getCoordinates() {
		return coordinates;
	}

	public void setCoordinates(CoordinateDto coordinates) {
		this.coordinates = coordinates;
	}

	public IdAndNameWrapper getMerchant() {
		return merchant;
	}

	@Override
	public String toString() {
		return "LocationDto [code=" + code + ", name=" + name + ", merchant=" + merchant + ", merchantInstitution="
				+ merchantInstitution + ", description=" + description + ", activateOn=" + activateOn + ", expiryOn="
				+ expiryOn + ", locked=" + locked + ", locationDetail=" + locationDetail + ", coordinates="
				+ coordinates + "]";
	}

	public void setMerchant(IdAndNameWrapper merchant) {
		this.merchant = merchant;
	}

	public IdAndNameWrapper getMerchantInstitution() {
		return merchantInstitution;
	}

	public void setMerchantInstitution(IdAndNameWrapper merchantInstitution) {
		this.merchantInstitution = merchantInstitution;
	}

	public String getStoreId() {
		return storeId;
	}

	public void setStoreId(String storeId) {
		this.storeId = storeId;
	}
}
