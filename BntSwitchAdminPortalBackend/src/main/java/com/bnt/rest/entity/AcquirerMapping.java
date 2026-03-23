package com.bnt.rest.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import org.hibernate.envers.Audited;
import org.hibernate.envers.RelationTargetAuditMode;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Audited
@Table(name = "acquirer_mapping")
public class AcquirerMapping extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@OneToOne
	@JoinColumn(name = "location_id")
	private Location location;

	@OneToOne
	@JoinColumn(name = "merchant_id")
	private Merchant merchant;

	@OneToOne
	@JoinColumn(name = "device_id")
	private Device device;

	@OneToOne
	@JoinColumn(name = "acquirer_id")
	private AcquirerIdConfig acquirerIdConfig;

	@Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
	@OneToOne(optional = true)
	@JoinColumn(name = "payment_method")
	private LookupValue paymentMethod;

	@Column(name = "deleted", nullable = false)
	private Character deleted;

	@Column(name = "active", nullable = false)
	private Character active;

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public Merchant getMerchant() {
		return merchant;
	}

	public void setMerchant(Merchant merchant) {
		this.merchant = merchant;
	}

	public Device getDevice() {
		return device;
	}

	public void setDevice(Device device) {
		this.device = device;
	}

	public AcquirerIdConfig getAcquirerIdConfig() {
		return acquirerIdConfig;
	}

	public void setAcquirerIdConfig(AcquirerIdConfig acquirerIdConfig) {
		this.acquirerIdConfig = acquirerIdConfig;
	}

	public LookupValue getPaymentMethod() {
		return paymentMethod;
	}

	public void setPaymentMethod(LookupValue paymentMethod) {
		this.paymentMethod = paymentMethod;
	}

	public Character getDeleted() {
		return deleted;
	}

	public void setDeleted(Character deleted) {
		this.deleted = deleted;
	}

	public Character getActive() {
		return active;
	}

	public void setActive(Character active) {
		this.active = active;
	}
}
