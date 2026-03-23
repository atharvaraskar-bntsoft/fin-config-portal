package com.bnt.rest.wrapper.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ServiceDto {

	private boolean authService = false;

	private boolean prepaidService = false;

	public boolean isAuthService() {
		return authService;
	}

	public boolean isPrepaidService() {
		return prepaidService;
	}

	public void setAuthService(boolean authService) {
		this.authService = authService;
	}

	public void setPrepaidService(boolean prepaidService) {
		this.prepaidService = prepaidService;
	}
}
