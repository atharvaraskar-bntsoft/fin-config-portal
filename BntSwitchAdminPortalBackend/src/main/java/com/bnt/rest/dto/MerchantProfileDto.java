package com.bnt.rest.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class MerchantProfileDto extends BaseDto {

	public String getVelocity() {
		return velocity;
	}

	public void setVelocity(String velocity) {
		this.velocity = velocity;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getServices() {
		return services;
	}

	public void setServices(String services) {
		this.services = services;
	}

	public String getAdditionalServices() {
		return additionalServices;
	}

	public void setAdditionalServices(String additionalServices) {
		this.additionalServices = additionalServices;
	}

	// @JsonProperty("name")
	private String partialAuth;

	public String getPartialAuth() {
		return partialAuth;
	}

	public void setPartialAuth(String partialAuth) {
		this.partialAuth = partialAuth;
	}

	private String velocity;

	private String category;

	private String services;

	private String additionalServices;

	@Override
	public String toString() {
		return "MerchantProfileDto [id=" + this.getId() + ", category=" + category + ", services=" + services
				+ ", additional_services=" + additionalServices + "]";
	}
}
