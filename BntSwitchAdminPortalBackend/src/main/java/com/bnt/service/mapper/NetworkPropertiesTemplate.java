package com.bnt.service.mapper;

import com.bnt.rest.wrapper.dto.adapter.NetworkPropertiesResponseWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class NetworkPropertiesTemplate {

	private NetworkPropertiesResponseWrapper l1configuration;

	private NetworkPropertiesResponseWrapper l3configuration;

	public NetworkPropertiesResponseWrapper getL1configuration() {
		return l1configuration;
	}

	public void setL1configuration(NetworkPropertiesResponseWrapper l1configuration) {
		this.l1configuration = l1configuration;
	}

	public NetworkPropertiesResponseWrapper getL3configuration() {
		return l3configuration;
	}

	public void setL3configuration(NetworkPropertiesResponseWrapper l3configuration) {
		this.l3configuration = l3configuration;
	}
}
