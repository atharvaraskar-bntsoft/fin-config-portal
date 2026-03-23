package com.bnt.rest.wrapper.dto.adapter;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class NetworkUiResponseWrapper {

	private String persistRequired;

	private NetworkPropertiesResponseWrapper properties;

	private NetworkConnectionManagment connectionManagement;

	public NetworkPropertiesResponseWrapper getProperties() {
		return properties;
	}

	public void setProperties(NetworkPropertiesResponseWrapper properties) {
		this.properties = properties;
	}

	public String getPersistRequired() {
		return persistRequired;
	}

	public void setPersistRequired(String persistRequired) {
		this.persistRequired = persistRequired;
	}

	public NetworkConnectionManagment getConnectionManagement() {
		return connectionManagement;
	}

	public void setConnectionManagement(NetworkConnectionManagment connectionManagement) {
		this.connectionManagement = connectionManagement;
	}

}
