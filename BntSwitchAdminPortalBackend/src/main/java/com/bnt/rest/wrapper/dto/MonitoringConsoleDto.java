package com.bnt.rest.wrapper.dto;

import java.util.List;

import com.bnt.monitoring.charts.LinearRateData;
import com.bnt.monitoring.charts.MonitoringChart;
import com.bnt.monitoring.charts.Periods;
import com.bnt.rest.dto.RippsInstanceDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class MonitoringConsoleDto {

	private List<RippsInstanceDto> instances;
	private List<MonitoringChart> rateData;
	private LinearRateData linearRateData;
	private Periods periods;

	public List<RippsInstanceDto> getInstances() {
		return instances;
	}

	public void setInstances(List<RippsInstanceDto> instances) {
		this.instances = instances;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public List<MonitoringChart> getRateData() {
		return rateData;
	}

	public void setRateData(List<MonitoringChart> rateData) {
		this.rateData = rateData;
	}

	public LinearRateData getLinearRateData() {
		return linearRateData;
	}

	public void setLinearRateData(LinearRateData linearRateData) {
		this.linearRateData = linearRateData;
	}

	private String title;

	public Periods getPeriods() {
		return periods;
	}

	public void setPeriods(Periods periods) {
		this.periods = periods;
	}
}
