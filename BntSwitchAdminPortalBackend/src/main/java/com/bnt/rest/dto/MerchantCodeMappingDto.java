package com.bnt.rest.dto;

import java.util.List;

import com.bnt.rest.entity.ProcessorAdapter;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class MerchantCodeMappingDto extends BaseDto {

	private DtoWrapper processorId;

	/**
	 * @NotEmpty(message = "Merchant Code should not be Empty") private String
	 *                   merchantCode;
	 * 
	 * @NotEmpty(message = "Processor-merchant code should not be Empty") private
	 *                   String processorMerchantCode;
	 */

	private AcquirerIdConfigDto sourceAcquirerId;

	private DeviceDto sourceDeviceId;

	private LocationDto sourceLocationId;

	private MerchantDto sourceMerchantId;

	private String destinationDevice;

	private String destinationLocation;

	private String destinationMerchant;

	private String destinationAcquirer;

	private boolean active;

	private List<ProcessorAdapter> processorList;

	private Character deleted;

	public Character getDeleted() {
		return deleted;
	}

	public void setDeleted(Character deleted) {
		this.deleted = deleted;
	}

	public DtoWrapper getProcessorId() {
		return processorId;
	}

	public void setProcessorId(DtoWrapper processorId) {
		this.processorId = processorId;
	}

	public boolean getActive() {
		return active;
	}

	public AcquirerIdConfigDto getSourceAcquirerId() {
		return sourceAcquirerId;
	}

	public void setSourceAcquirerId(AcquirerIdConfigDto sourceAcquirerId) {
		this.sourceAcquirerId = sourceAcquirerId;
	}

	public DeviceDto getSourceDeviceId() {
		return sourceDeviceId;
	}

	public void setSourceDeviceId(DeviceDto sourceDeviceId) {
		this.sourceDeviceId = sourceDeviceId;
	}

	public LocationDto getSourceLocationId() {
		return sourceLocationId;
	}

	public void setSourceLocationId(LocationDto sourceLocationId) {
		this.sourceLocationId = sourceLocationId;
	}

	public MerchantDto getSourceMerchantId() {
		return sourceMerchantId;
	}

	public void setSourceMerchantId(MerchantDto sourceMerchantId) {
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

	public void setActive(boolean active) {
		this.active = active;
	}

	public List<ProcessorAdapter> getProcessorList() {
		return processorList;
	}

	public void setProcessorList(List<ProcessorAdapter> processorList) {
		this.processorList = processorList;
	}
}
