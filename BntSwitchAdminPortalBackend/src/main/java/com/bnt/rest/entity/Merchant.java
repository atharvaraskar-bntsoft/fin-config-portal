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
@Table(name = "merchant")
public class Merchant extends BaseEntity {

	private static final long serialVersionUID = -6441043639437893962L;

	@OneToOne(fetch = FetchType.EAGER)
	@Audited
	@JoinColumn(name = "merchant_institution_id")
	private MerchantInstitution merchantInstitution;

	@Column(name = "code", nullable = false)
	private String code;

	public Integer getTotalLocation() {
		return totalLocation;
	}

	public void setTotalLocation(Integer totalLocation) {
		this.totalLocation = totalLocation;
	}

	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "description", nullable = false)
	private String description;

	@Column(name = "activate_on", nullable = false)
	private Timestamp activateOn;

	@Column(name = "expiry_on", nullable = false)
	private Timestamp expiryOn;

	@Column(name = "locked", nullable = false)
	private Character locked;

	@Column(name = "deleted", nullable = false)
	private Character deleted;

	public String getAdditionalAttribute() {
		return additionalAttribute;
	}

	public void setAdditionalAttribute(String additionalAttribute) {
		this.additionalAttribute = additionalAttribute;
	}

	@Column(name = "additional_attributes")
	private String additionalAttribute;

//	@Column(name = "acquirerid", nullable = true)
//	private Integer acquirerID;

	@OneToOne(cascade = CascadeType.ALL, mappedBy = "merchant", orphanRemoval = true, fetch = FetchType.EAGER)
	@JoinColumn(name = "id", insertable = true, updatable = true)
	@Audited
	private MerchantDetail merchantDetail;

	@OneToOne(cascade = CascadeType.ALL, mappedBy = "merchant", fetch = FetchType.EAGER)
	@JoinColumn(name = "id", insertable = true, updatable = true)
	@Audited
	private MerchantProfile merchantProfile;

	@Formula("(SELECT COUNT(loc.id) FROM location as loc where loc.merchant_id = id and loc.deleted = '0')")
	@NotAudited
	private Integer totalLocation;

	@Formula("(select count(dev.id) from device as dev where dev.merchant_id = id  and dev.deleted = '0')")
	@NotAudited
	private Integer totalDevice;

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

	public MerchantInstitution getMerchantInstitution() {
		return merchantInstitution;
	}

	public void setMerchantInstitution(MerchantInstitution institution) {
		this.merchantInstitution = institution;
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

	public Character getLocked() {
		return locked;
	}

	public void setLocked(Character locked) {
		this.locked = locked;
	}

	public Integer getTotalDevice() {
		return totalDevice;
	}

	public void setTotalDevice(Integer totalDevice) {
		this.totalDevice = totalDevice;
	}

	public Character getDeleted() {
		return deleted;
	}

	public void setDeleted(Character deleted) {
		this.deleted = deleted;
	}

	public MerchantDetail getMerchantDetail() {
		return merchantDetail;
	}

	public void setMerchantDetail(MerchantDetail merchantDetail) {
		merchantDetail.setMerchant(this);
		this.merchantDetail = merchantDetail;
	}

	public MerchantProfile getMerchantProfile() {

		return merchantProfile;
	}

	public void setMerchantProfile(MerchantProfile merchantProfile) {
		merchantProfile.setMerchant(this);
		this.merchantProfile = merchantProfile;
	}
}
