package com.bnt.rest.wrapper.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ApplyToWrapper {

	private IdAndNameCodeWrapper type;

	private IdAndNameWrapper merchantInstitution;

	private IdAndNameWrapper merchant;

	private IdAndNameWrapper location;

	private IdAndNameWrapper device;

	public IdAndNameCodeWrapper getType() {
		return type;
	}

	public void setType(IdAndNameCodeWrapper type) {
		this.type = type;
	}

	public IdAndNameWrapper getMerchantInstitution() {
		return merchantInstitution;
	}

	public void setMerchantInstitution(IdAndNameWrapper merchantInstitution) {
		this.merchantInstitution = merchantInstitution;
	}

	public IdAndNameWrapper getMerchant() {
		return merchant;
	}

	public void setMerchant(IdAndNameWrapper merchant) {
		this.merchant = merchant;
	}

	public IdAndNameWrapper getLocation() {
		return location;
	}

	public void setLocation(IdAndNameWrapper location) {
		this.location = location;
	}

	public IdAndNameWrapper getDevice() {
		return device;
	}

	public void setDevice(IdAndNameWrapper device) {
		this.device = device;
	}
}
