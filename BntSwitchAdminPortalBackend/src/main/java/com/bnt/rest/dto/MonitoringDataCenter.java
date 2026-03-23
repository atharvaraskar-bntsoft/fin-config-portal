package com.bnt.rest.dto;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class MonitoringDataCenter {

	private Integer id;

	private String title;

	private boolean monitoring;

	private String location;

	private List<ServerDto> servers;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public boolean isMonitoring() {
		return monitoring;
	}

	public void setMonitoring(boolean monitoring) {
		this.monitoring = monitoring;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public List<ServerDto> getServers() {
		return servers;
	}

	public void setServers(List<ServerDto> servers) {
		this.servers = servers;
	}
}
