package com.bnt.rest.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ToggleMaintenanceDto {

	private String jmxURL;

	private String connectionName;

	public String getJmxURL() {
		return jmxURL;
	}

	public void setJmxURL(String jmxURL) {
		this.jmxURL = jmxURL;
	}

	public String getConnectionName() {
		return connectionName;
	}

	public void setConnectionName(String connectionName) {
		this.connectionName = connectionName;
	}
}
