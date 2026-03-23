package com.bnt.rest.wrapper.dto;

import java.sql.Timestamp;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class DeploymentResponseWrapper {

	private String name;
	private Timestamp scheduledOn;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Timestamp getScheduledOn() {
		return scheduledOn;
	}

	public void setScheduledOn(Timestamp scheduledOn) {
		this.scheduledOn = scheduledOn;
	}
}
