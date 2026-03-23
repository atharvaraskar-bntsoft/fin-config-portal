package com.bnt.rest.dto;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class MonitoringData {

	private static final Logger logger = LogManager.getLogger(MonitoringData.class);

	private String restURL;
	private String componentType;
	private String name;
	private Long statusChanged;
	private String id;
	private String status;
	private String jmxLocation;

	public String getRestURL() {
		return restURL;
	}

	public void setRestURL(String restURL) {
		this.restURL = restURL;
	}

	public String getComponentType() {
		return componentType;
	}

	public void setComponentType(String componentType) {
		this.componentType = componentType;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getStatusChanged() {
		return statusChanged;
	}

	public void setStatusChanged(Long statusChanged) {
		this.statusChanged = statusChanged;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getJmxLocation() {
		return jmxLocation;
	}

	public void setJmxLocation(String jmxLocation) {
		this.jmxLocation = jmxLocation;
	}

	public static Logger getLogger() {
		return logger;
	}
}
