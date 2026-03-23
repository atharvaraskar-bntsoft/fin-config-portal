package com.bnt.rest.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import org.hibernate.envers.Audited;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Audited
@Table(name = "merchant_code_mapping")
public class MerchantCodeMapping extends BaseEntity {

	private static final long serialVersionUID = 4L;

	@OneToOne(cascade = CascadeType.MERGE)
	@JoinColumn(name = "processor_id")
	private ProcessorAdapter processorId;

	@OneToOne
	@JoinColumn(name = "source_acquirer_id")
	private AcquirerIdConfig sourceAcquirerId;

	@OneToOne
	@JoinColumn(name = "source_device_id")
	private Device sourceDeviceId;

	@OneToOne
	@JoinColumn(name = "source_location_id")
	private Location sourceLocationId;

	@OneToOne
	@JoinColumn(name = "source_merchant_id")
	private Merchant sourceMerchantId;

	@Column(name = "destination_device")
	private String destinationDevice;

	@Column(name = "destination_location")
	private String destinationLocation;

	@Column(name = "destination_merchant")
	private String destinationMerchant;

	@Column(name = "destination_acquirer")
	private String destinationAcquirer;

	@Column(name = "active", nullable = false)
	private Character active;

	@Column(name = "deleted", nullable = false)
	private Character deleted;

	public Character getDeleted() {
		return deleted;
	}

	public void setDeleted(Character deleted) {
		this.deleted = deleted;
	}

	public ProcessorAdapter getProcessorId() {
		return processorId;
	}

	public void setProcessorId(ProcessorAdapter processorId) {
		this.processorId = processorId;
	}

	public Character getActive() {
		return active;
	}

	public AcquirerIdConfig getSourceAcquirerId() {
		return sourceAcquirerId;
	}

	public void setSourceAcquirerId(AcquirerIdConfig sourceAcquirerId) {
		this.sourceAcquirerId = sourceAcquirerId;
	}

	public Device getSourceDeviceId() {
		return sourceDeviceId;
	}

	public void setSourceDeviceId(Device sourceDeviceId) {
		this.sourceDeviceId = sourceDeviceId;
	}

	public Location getSourceLocationId() {
		return sourceLocationId;
	}

	public void setSourceLocationId(Location sourceLocationId) {
		this.sourceLocationId = sourceLocationId;
	}

	public Merchant getSourceMerchantId() {
		return sourceMerchantId;
	}

	public void setSourceMerchantId(Merchant sourceMerchantId) {
		this.sourceMerchantId = sourceMerchantId;
	}

	public String getDestinationDevice() {
		return destinationDevice;
	}

	public void setDestinationDevice(String destinationDevice) {
		this.destinationDevice = destinationDevice;
	}

	public String getDestinationLocation() {
		return destinationLocation;
	}

	public void setDestinationLocation(String destinationLocation) {
		this.destinationLocation = destinationLocation;
	}

	public String getDestinationMerchant() {
		return destinationMerchant;
	}

	public void setDestinationMerchant(String destinationMerchant) {
		this.destinationMerchant = destinationMerchant;
	}

	public String getDestinationAcquirer() {
		return destinationAcquirer;
	}

	public void setDestinationAcquirer(String destinationAcquirer) {
		this.destinationAcquirer = destinationAcquirer;
	}

	public void setActive(Character active) {
		this.active = active;
	}
}
