package com.bnt.rest.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class AcquirerMappingDto extends BaseDto {

	private LocationDto location;

	private MerchantDto merchant;

	private AcquirerIdConfigDto acquirerIdConfig;

	private DeviceDto device;

	private LookupValueDto paymentMethod;

	public LocationDto getLocation() {
		return location;
	}

	public void setLocation(LocationDto location) {
		this.location = location;
	}

	public MerchantDto getMerchant() {
		return merchant;
	}

	public void setMerchant(MerchantDto merchant) {
		this.merchant = merchant;
	}

	public AcquirerIdConfigDto getAcquirerIdConfig() {
		return acquirerIdConfig;
	}

	public void setAcquirerIdConfig(AcquirerIdConfigDto acquirerIdConfig) {
		this.acquirerIdConfig = acquirerIdConfig;
	}

	public DeviceDto getDevice() {
		return device;
	}

	public void setDevice(DeviceDto device) {
		this.device = device;
	}

	public LookupValueDto getPaymentMethod() {
		return paymentMethod;
	}

	public void setPaymentMethod(LookupValueDto paymentMethod) {
		this.paymentMethod = paymentMethod;
	}

	private char deleted;

	private char active;

	public char getDeleted() {
		return deleted;
	}

	public void setDeleted(char deleted) {
		this.deleted = deleted;
	}

	public char getActive() {
		return active;
	}

	public void setActive(char active) {
		this.active = active;
	}
}
