package com.bnt.rest.dto;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.gson.JsonElement;
import com.bnt.common.util.GsonUtil;

import com.bnt.common.util.JsonObjectUtil;
import com.bnt.rest.wrapper.dto.IdAndNameWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class DeviceDto extends BaseDto {

	private IdAndNameWrapper location;

	private IdAndNameWrapper merchant;

	private IdAndNameWrapper merchantInstitution;

	private String code;

	private DeviceTypeDto type;

	private String reversalTimeout;

	private Character posSafetyFlag;

	private String pedSerialNo;

	private String name;

	public String getReversalTimeout() {
		return reversalTimeout;
	}

	public void setReversalTimeout(String reversalTimeout) {
		this.reversalTimeout = reversalTimeout;
	}

	public Character getPosSafetyFlag() {
		return posSafetyFlag;
	}

	public void setPosSafetyFlag(Character posSafetyFlag) {
		this.posSafetyFlag = posSafetyFlag;
	}

	public IdAndNameWrapper getLocation() {
		return location;
	}

	public void setLocation(IdAndNameWrapper location) {
		this.location = location;
	}

	public IdAndNameWrapper getMerchant() {
		return merchant;
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

	private Timestamp activateOn;

	private Character locked;

	@JsonIgnore
	private Character deleted;

	private boolean hostCapture;

	private String pedId;

	public String getPedId() {
		return pedId;
	}

	public void setPedId(String pedId) {
		this.pedId = pedId;
	}

	public String getAdditionalAttribute() {
		return additionalAttribute;
	}

	public void setAdditionalAttribute(String additionalAttribute) {
		this.additionalAttributeUi = JsonObjectUtil.getObjectFromJsonString(additionalAttribute);
		this.additionalAttribute = additionalAttribute;
	}

	@JsonIgnore
	private String additionalAttribute;

	@JsonIgnoreProperties({ "deviceModelConfiguration", "deviceType" })
	private DeviceModelDto deviceModelId;

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

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public DeviceTypeDto getType() {
		return type;
	}

	public void setType(DeviceTypeDto type) {
		this.type = type;
	}

	public Timestamp getActivateOn() {
		return activateOn;
	}

	public void setActivateOn(Timestamp activateOn) {
		this.activateOn = activateOn;
	}

	public boolean isHostCapture() {
		return hostCapture;
	}

	public void setHostCapture(boolean hostCapture) {
		this.hostCapture = hostCapture;
	}

	public DeviceModelDto getDeviceModelId() {
		return deviceModelId;
	}

	public void setDeviceModelId(DeviceModelDto deviceModelId) {
		this.deviceModelId = deviceModelId;
	}

	public String getPedSerialNo() {
		return pedSerialNo;
	}

	public void setPedSerialNo(String pedSerialNo) {
		this.pedSerialNo = pedSerialNo;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "DeviceDto [location=" + location + ", merchant=" + merchant + ", merchantInstitution="
				+ merchantInstitution + ", code=" + code + ", type=" + type + ", activateOn=" + activateOn
				+ ",  locked=" + locked + ", deleted=" + deleted + ", hostCapture=" + hostCapture + "]";
	}
}
