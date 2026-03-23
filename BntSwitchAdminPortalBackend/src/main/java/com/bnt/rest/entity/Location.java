package com.bnt.rest.entity;

import java.sql.Timestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import org.hibernate.annotations.Formula;
import org.hibernate.envers.Audited;
import org.hibernate.envers.NotAudited;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Audited
@Table(name = "location")
public class Location extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Formula("(select count(dev.id) from device as dev where dev.location_id=id and dev.deleted = '0')")
	@NotAudited
	private Integer totalDevice;

	@OneToOne(fetch = FetchType.EAGER)

	@JoinColumn(name = "merchant_id")
	private Merchant merchant;

	/**
	 * @OneToOne(fetch = FetchType.EAGER) // Because there is no relationship on DB
	 * 
	 * @JoinColumn(name = "merchantinstitutionid") private MerchantInstitution
	 *                  merchantInstitution;
	 */

	@Column(name = "code", nullable = false)
	private String code;

	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "description", nullable = false)
	private String description;

	@Column(name = "activate_on", nullable = false)
	private Timestamp activateOn;

	@Column(name = "expiry_on", nullable = false)
	private Timestamp expiryOn;

	@Column(name = "deleted", nullable = false)
	private Character deleted;

	@Column(name = "locked", nullable = false)
	private Character locked;

	@Column(name = "store_id")
	private String storeId;

	@OneToOne(cascade = CascadeType.ALL, mappedBy = "location", orphanRemoval = true, fetch = FetchType.EAGER)
	@JoinColumn(name = "id", insertable = true, updatable = true)
	@NotAudited
	private LocationDetail locationDetail;

	@Column(name = "additional_attributes")
	private String additionalAttribute;

	@Column(name = "latitude", nullable = true)
	private Double latitude;

	@Column(name = "longitude", nullable = true)
	private Double longitude;

	@Column(name = "pos_safty_flag")
	private Character posSafetyFlag;

	@Column(name = " reversal_timeout")
	private String reversalTimeout;

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

	public String getAdditionalAttribute() {
		return additionalAttribute;
	}

	public void setAdditionalAttribute(String additionalAttribute) {
		this.additionalAttribute = additionalAttribute;
	}

	public Integer getTotalDevice() {
		return totalDevice;
	}

	public void setTotalDevice(Integer totalDevice) {
		this.totalDevice = totalDevice;
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

	public Character getDeleted() {
		return deleted;
	}

	public void setDeleted(Character deleted) {
		this.deleted = deleted;
	}

	public Character getLocked() {
		return locked;
	}

	public void setLocked(Character locked) {
		this.locked = locked;
	}

	public LocationDetail getLocationDetail() {
		return locationDetail;
	}

	public void setLocationDetail(LocationDetail locationDetail) {
		this.locationDetail = locationDetail;
	}

	public Double getLatitude() {
		return latitude;
	}

	public void setLatitude(Double latitude) {
		this.latitude = latitude;
	}

	public Double getLongitude() {
		return longitude;
	}

	public void setLongitude(Double longitude) {
		this.longitude = longitude;
	}

	public String getStoreId() {
		return storeId;
	}

	public void setStoreId(String storeId) {
		this.storeId = storeId;
	}
}
