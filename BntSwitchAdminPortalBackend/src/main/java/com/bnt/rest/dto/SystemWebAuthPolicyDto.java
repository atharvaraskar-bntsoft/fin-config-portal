package com.bnt.rest.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class SystemWebAuthPolicyDto extends BaseDto {

	private Integer maxLoginAttemptsAllowed;

	private Character isPasswordExpireAutomatically;

	private Integer passwordExpireDays;

	private String passwordPattern;

	public Integer getMaxLoginAttemptsAllowed() {
		return maxLoginAttemptsAllowed;
	}

	public void setMaxLoginAttemptsAllowed(Integer maxLoginAttemptsAllowed) {
		this.maxLoginAttemptsAllowed = maxLoginAttemptsAllowed;
	}

	public Character getIsPasswordExpireAutomatically() {
		return isPasswordExpireAutomatically;
	}

	public void setIsPasswordExpireAutomatically(Character isPasswordExpireAutomatically) {
		this.isPasswordExpireAutomatically = isPasswordExpireAutomatically;
	}

	public Integer getPasswordExpireDays() {
		return passwordExpireDays;
	}

	public void setPasswordExpireDays(Integer passwordExpireDays) {
		this.passwordExpireDays = passwordExpireDays;
	}

	public String getPasswordPattern() {
		return passwordPattern;
	}

	public void setPasswordPattern(String passwordPattern) {
		this.passwordPattern = passwordPattern;
	}

	@Override
	public String toString() {
		return "SystemWebAuthPolicy [maxLoginAttemptsAllowed=" + maxLoginAttemptsAllowed
				+ ", isPasswordExpireAutomatically=" + isPasswordExpireAutomatically + ", passwordExpireDays="
				+ passwordExpireDays + ", passwordPattern=" + passwordPattern + " ]";
	}
}
