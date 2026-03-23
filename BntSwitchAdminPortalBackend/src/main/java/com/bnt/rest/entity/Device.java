package com.bnt.rest.entity;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import org.hibernate.envers.Audited;
import org.hibernate.envers.NotAudited;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Audited
@Table(name = "device")

public class Device extends BaseEntity {

	public Character getLocked() {
		return locked;
	}

	public Character getDeleted() {
		return deleted;
	}

	private static final long serialVersionUID = 1L;

	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "location_id")
	private Location location;

	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "merchant_id")
	private Merchant merchant;

	@Column(name = "code", nullable = false)
	private String code;

	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "device_type")
	@NotAudited
	private DeviceType type;

	@Column(name = "activate_on", nullable = false)
	private Timestamp activateOn;

	@Column(name = "locked", nullable = false)
	private Character locked;

	@Column(name = "deleted", nullable = false)
	private Character deleted;

	@Column(name = "ped_serial")
	private String pedSerialNo;

	@Column(name = "additional_attributes")
	private String additionalAttribute;

	public String getReversalTimeout() {
		return reversalTimeout;
	}

	public void setReversalTimeout(String reversalTimeout) {
		this.reversalTimeout = reversalTimeout;
	}

	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "device_model_id")
	@NotAudited
	private DeviceModel deviceModelId;

	@Column(name = "ped_id")
	private String pedId;

	@Column(name = "pos_safty_flag")
	private Character posSafetyFlag;

	@Column(name = "reversal_timeout")
	private String reversalTimeout;

	@Column(name = "name")
	private String name;

	public Character getPosSafetyFlag() {
		return posSafetyFlag;
	}

	public void setPosSafetyFlag(Character posSafetyFlag) {
		this.posSafetyFlag = posSafetyFlag;
	}

	public DeviceModel getDeviceModelId() {
		return deviceModelId;
	}

	public void setDeviceModelId(DeviceModel deviceModelId) {
		this.deviceModelId = deviceModelId;
	}

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
		this.additionalAttribute = additionalAttribute;
	}

	public Merchant getMerchant() {
		return merchant;
	}

	public void setMerchant(Merchant merchant) {
		this.merchant = merchant;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public DeviceType getType() {
		return type;
	}

	public void setType(DeviceType type) {
		this.type = type;
	}

	public Timestamp getActivateOn() {
		return activateOn;
	}

	public void setActivateOn(Timestamp activateOn) {
		this.activateOn = activateOn;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public Character isLocked() {
		return locked;
	}

	public void setLocked(Character locked) {
		this.locked = locked;
	}

	public Character isDeleted() {
		return deleted;
	}

	public void setDeleted(Character deleted) {
		this.deleted = deleted;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((code == null) ? 0 : code.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Device other = (Device) obj;
		if (code == null) {
			if (other.code != null)
				return false;
		} else if (!code.equals(other.code))
			return false;
		return true;
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
}
