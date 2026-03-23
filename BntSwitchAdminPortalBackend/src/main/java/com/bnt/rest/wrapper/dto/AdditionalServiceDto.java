package com.bnt.rest.wrapper.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class AdditionalServiceDto {

	private boolean fraudService;

	private boolean loyaltyService;

	public boolean isFraudService() {
		return fraudService;
	}

	public boolean isLoyaltyService() {
		return loyaltyService;
	}

	public void setFraudService(boolean fraudService) {
		this.fraudService = fraudService;
	}

	public void setLoyaltyService(boolean loyaltyService) {
		this.loyaltyService = loyaltyService;
	}
}
