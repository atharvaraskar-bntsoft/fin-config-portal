package com.bnt.rest.dto;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonProperty;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class RestMonitoringData {

	@JsonProperty("monitoring-data")
	List<MonitoringData> monitoringData;

	public List<MonitoringData> getMonitoringData() {
		return monitoringData;
	}

	public void setMonitoringData(List<MonitoringData> monitoringData) {
		this.monitoringData = monitoringData;
	}
}
