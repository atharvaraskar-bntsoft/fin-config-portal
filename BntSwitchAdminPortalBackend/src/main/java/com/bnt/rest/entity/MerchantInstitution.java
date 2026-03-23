package com.bnt.rest.entity;

import java.sql.Timestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

import org.hibernate.annotations.Formula;
import org.hibernate.envers.Audited;
import org.hibernate.envers.NotAudited;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Table(name = "merchant_institution")
@Audited
public class MerchantInstitution extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "institution_id")
	@NotAudited
	private Institution institution;

	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "acquirer_id")
	@NotAudited
	private AcquirerIdConfig acquirer;

	@Formula("(select count(mer.id) from merchant as mer where mer.merchant_institution_id=id and mer.deleted = '0')")
	@NotAudited
//	@Transient
	private Integer totalMerchant;

	// @Formula("(SELECT COUNT(loc.id) FROM location as loc where
	// loc.merchantinstitutionid=id and loc.deleted = '0')")
	@NotAudited
	@Transient
	private Integer totalLocation;

	// create query when device module be completed
	// @Formula("(select count(dev.id) from device as dev where
	// dev.merchantinstitutionid=id and dev.deleted = '0')")
	@NotAudited
	@Transient
	private Integer totalDevice;

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

	@OneToOne(cascade = CascadeType.ALL, mappedBy = "merchantInstitution", fetch = FetchType.EAGER)
	@JoinColumn(name = "id", insertable = true, updatable = true)
	@Audited
	private MerchantInstitutionDetail merchantInstitutionDetail;

	public AcquirerIdConfig getAcquirer() {
		return acquirer;
	}

	public void setAcquirer(AcquirerIdConfig acquirer) {
		this.acquirer = acquirer;
	}

	public Institution getInstitution() {
		return institution;
	}

	public void setInstitution(Institution institutionID) {
		this.institution = institutionID;
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

	public MerchantInstitutionDetail getMerchantInstitutionDetail() {
		return merchantInstitutionDetail;
	}

	public void setMerchantInstitutionDetail(MerchantInstitutionDetail institutionDetail) {
		this.merchantInstitutionDetail = institutionDetail;
	}

	public Character getLocked() {
		return locked;
	}

	public void setLocked(Character locked) {
		this.locked = locked;
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
}
