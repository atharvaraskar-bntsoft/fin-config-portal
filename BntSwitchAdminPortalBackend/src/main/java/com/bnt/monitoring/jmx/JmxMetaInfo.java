package com.bnt.monitoring.jmx;

import javax.management.MBeanServerConnection;
import javax.management.remote.JMXConnector;
import javax.management.remote.JMXServiceURL;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class JmxMetaInfo {

	private String jmxURL;
	private String monitoringMbeanName;
	private String switchControlMbeanName;
	private int pollDelaySeconds;
	private JMXServiceURL url;
	private JMXConnector jmxc;
	private MBeanServerConnection mbsc;
	private boolean serviceStatus = Boolean.FALSE;
	private boolean isConnected = Boolean.FALSE;

	public String getJmxURL() {
		return jmxURL;
	}

	public void setJmxURL(String jmxURL) {
		this.jmxURL = jmxURL;
	}

	public String getMonitoringMbeanName() {
		return monitoringMbeanName;
	}

	public void setMonitoringMbeanName(String monitoringMbeanName) {
		this.monitoringMbeanName = monitoringMbeanName;
	}

	public String getSwitchControlMbeanName() {
		return switchControlMbeanName;
	}

	public void setSwitchControlMbeanName(String switchControlMbeanName) {
		this.switchControlMbeanName = switchControlMbeanName;
	}

	public int getPollDelaySeconds() {
		return pollDelaySeconds;
	}

	public void setPollDelaySeconds(int pollDelaySeconds) {
		this.pollDelaySeconds = pollDelaySeconds;
	}

	public JMXServiceURL getUrl() {
		return url;
	}

	public void setUrl(JMXServiceURL url) {
		this.url = url;
	}

	public JMXConnector getJmxc() {
		return jmxc;
	}

	public void setJmxc(JMXConnector jmxc) {
		this.jmxc = jmxc;
	}

	public MBeanServerConnection getMbsc() {
		return mbsc;
	}

	public void setMbsc(MBeanServerConnection mbsc) {
		this.mbsc = mbsc;
	}

	public boolean isServiceStatus() {
		return serviceStatus;
	}

	public void setServiceStatus(boolean serviceStatus) {
		this.serviceStatus = serviceStatus;
	}

	public boolean isConnected() {
		return isConnected;
	}

	public void setConnected(boolean isConnected) {
		this.isConnected = isConnected;
	}
}
