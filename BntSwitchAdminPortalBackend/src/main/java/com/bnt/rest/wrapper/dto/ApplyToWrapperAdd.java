package com.bnt.rest.wrapper.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ApplyToWrapperAdd {

	private IdAndNameWrapper type;

	private Integer institution;

	private Integer merchant;

	private Integer location;

	private Integer device;

	public IdAndNameWrapper getType() {
		return type;
	}

	public void setType(IdAndNameWrapper type) {
		this.type = type;
	}

	public Integer getInstitution() {
		return institution;
	}

	public void setInstitution(Integer institution) {
		this.institution = institution;
	}

	public Integer getMerchant() {
		return merchant;
	}

	public void setMerchant(Integer merchant) {
		this.merchant = merchant;
	}

	public Integer getLocation() {
		return location;
	}

	public void setLocation(Integer location) {
		this.location = location;
	}

	public Integer getDevice() {
		return device;
	}

	public void setDevice(Integer device) {
		this.device = device;
	}
}
