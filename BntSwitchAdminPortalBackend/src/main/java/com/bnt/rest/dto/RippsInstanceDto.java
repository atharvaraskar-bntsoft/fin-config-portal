package com.bnt.rest.dto;

import java.util.List;

import com.bnt.rest.wrapper.dto.MonitoringElements;
import com.bnt.rest.wrapper.dto.TitleAndStatusWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class RippsInstanceDto {

	private Integer id;

	private String title;

	private boolean monitoring;

	private String location;

	private String primaryText;

	private String jmxLink;

	private String jmx;

	private boolean ping = true;

	private boolean running = true;

	private Integer server;

	private Integer dataCenter;

	private List<MonitoringElements> monitoringElements;

	private List<TitleAndStatusWrapper> info;

	public Integer getDataCenter() {
		return dataCenter;
	}

	public void setDataCenter(Integer dataCenter) {
		this.dataCenter = dataCenter;
	}

	public Integer getServer() {
		return server;
	}

	public void setServer(Integer server) {
		this.server = server;
	}

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

	public String getPrimaryText() {
		return primaryText;
	}

	public void setPrimaryText(String primaryText) {
		this.primaryText = primaryText;
	}

	public String getJmxLink() {
		return jmxLink;
	}

	public void setJmxLink(String jmxLink) {
		this.jmxLink = jmxLink;
	}

	public boolean isPing() {
		return ping;
	}

	public void setPing(boolean ping) {
		this.ping = ping;
	}

	public boolean isRunning() {
		return running;
	}

	public void setRunning(boolean running) {
		this.running = running;
	}

	public String getJmx() {
		return jmx;
	}

	public void setJmx(String jmx) {
		this.jmx = jmx;
	}

	public List<MonitoringElements> getMonitoringElements() {
		return monitoringElements;
	}

	public void setMonitoringElements(List<MonitoringElements> monitoringElements) {
		this.monitoringElements = monitoringElements;
	}

	public List<TitleAndStatusWrapper> getInfo() {
		return info;
	}

	public void setInfo(List<TitleAndStatusWrapper> info) {
		this.info = info;
	}
}
