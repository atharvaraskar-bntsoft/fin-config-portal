package com.bnt.monitoring.jmx;

import java.sql.Timestamp;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class RuntimeMonitoringData implements Cloneable {

	private Timestamp serverMonitoringStartTime;
	private Timestamp serverLastStatsCollectedOn;
	private boolean isServerRunning = Boolean.FALSE;
	private boolean jmxConnectStatus;
	private Timestamp jmxLastStatConnectedOn;

	public Timestamp getServerMonitoringStartTime() {
		return serverMonitoringStartTime;
	}

	public void setServerMonitoringStartTime(Timestamp serverMonitoringStartTime) {
		this.serverMonitoringStartTime = serverMonitoringStartTime;
	}

	public Timestamp getServerLastStatsCollectedOn() {
		return serverLastStatsCollectedOn;
	}

	public void setServerLastStatsCollectedOn(Timestamp serverLastStatsCollectedOn) {
		this.serverLastStatsCollectedOn = serverLastStatsCollectedOn;
	}

	public boolean isServerRunning() {
		return isServerRunning;
	}

	public void setServerRunning(boolean isServerRunning) {
		this.isServerRunning = isServerRunning;
	}

	public boolean isJmxConnectStatus() {
		return jmxConnectStatus;
	}

	public void setJmxConnectStatus(boolean jmxConnectStatus) {
		this.jmxConnectStatus = jmxConnectStatus;
	}

	public Timestamp getJmxLastStatConnectedOn() {
		return jmxLastStatConnectedOn;
	}

	public void setJmxLastStatConnectedOn(Timestamp jmxLastStatConnectedOn) {
		this.jmxLastStatConnectedOn = jmxLastStatConnectedOn;
	}

	RuntimeMonitoringData copyOfRuntimeMonitoringData() throws CloneNotSupportedException {

		RuntimeMonitoringData copyObject = (RuntimeMonitoringData) super.clone();
		copyObject.setJmxLastStatConnectedOn(
				jmxLastStatConnectedOn != null ? (Timestamp) jmxLastStatConnectedOn.clone() : null);
		copyObject.setServerMonitoringStartTime(
				serverMonitoringStartTime != null ? (Timestamp) serverMonitoringStartTime.clone() : null);
		copyObject.setServerLastStatsCollectedOn(
				serverLastStatsCollectedOn != null ? (Timestamp) serverLastStatsCollectedOn.clone() : null);
		return copyObject;
	}
}
