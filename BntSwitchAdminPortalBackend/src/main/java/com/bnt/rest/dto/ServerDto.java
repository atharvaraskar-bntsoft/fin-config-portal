package com.bnt.rest.dto;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ServerDto {

	private Integer id;

	private String title;

	private boolean monitoring;

	private String location;

	private List<RippsInstanceDto> instances;

	private Integer dataCenter;

	private Integer dataCenterId;

	public Integer getId() {
		return id;
	}

	public Integer getDataCenter() {
		return dataCenter;
	}

	public void setDataCenter(Integer dataCenter) {
		this.dataCenter = dataCenter;
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

	public List<RippsInstanceDto> getInstances() {
		return instances;
	}

	public Integer getDataCenterId() {
		return dataCenterId;
	}

	public void setDataCenterId(Integer dataCenterId) {
		this.dataCenterId = dataCenterId;
	}

	public void setInstances(List<RippsInstanceDto> instances) {
		this.instances = instances;
	}
}
