package com.bnt.rest.dto;

import java.math.BigInteger;

import com.bnt.rest.wrapper.dto.ServiceTypeDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ConnStatesFlowDto extends BaseDto {

	private ServiceTypeDto cartId;

	private boolean active;

	private String stateflow;

	private String defaultstate;

	private Integer maxEchoEntry;

	private BigInteger echoRetryInterval;

	private BigInteger loginRetryInterval;

	public Integer getMaxEchoEntry() {
		return maxEchoEntry;
	}

	public void setMaxEchoEntry(Integer maxEchoEntry) {
		this.maxEchoEntry = maxEchoEntry;
	}

	public BigInteger getEchoRetryInterval() {
		return echoRetryInterval;
	}

	public void setEchoRetryInterval(BigInteger echoRetryInterval) {
		this.echoRetryInterval = echoRetryInterval;
	}

	public BigInteger getLoginRetryInterval() {
		return loginRetryInterval;
	}

	public void setLoginRetryInterval(BigInteger loginRetryInterval) {
		this.loginRetryInterval = loginRetryInterval;
	}

	public ServiceTypeDto getCartId() {
		return cartId;
	}

	public void setCartId(ServiceTypeDto cartId) {
		this.cartId = cartId;
	}

	public String getStateflow() {
		return stateflow;
	}

	public void setStateflow(String stateflow) {
		this.stateflow = stateflow;
	}

	public String getDefaultstate() {
		return defaultstate;
	}

	public void setDefaultstate(String defaultstate) {
		this.defaultstate = defaultstate;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}
}
