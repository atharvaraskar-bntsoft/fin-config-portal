package com.bnt.rest.dto;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.atomic.AtomicLong;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.bnt.monitoring.jmx.JmxMetaInfo;
import com.bnt.rest.wrapper.dto.IdAndCodeWrapperString;
import com.bnt.ruleengine.sample.MethodWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class MonitoringScreenWrapper {

	private static final Logger logger = LogManager.getLogger(MonitoringScreenWrapper.class);
	private String id;
	private String restURL;
	private String name;
	private Long instanceId;
	private String jmxURL;
	private Long statusChanged;

	private int inflight;
	private boolean isSafeToKill;
	private java.sql.Timestamp runningSince;
	private String queue;
	private String loggerName;
	private String loggerLevel;

	private MethodWrapper methodWrapper;
	private List<String> listNetworkRequest;
	private List<IdAndNameStringWrapper> propertiesMap;
	private List<String> listConnectionNames;
	private String beanName;

	private List<String> secretNames;

	private Map<String, Object> connectionDetailsMap;

	private int connectionCount;
	private String currentStatus = "";

	private Boolean isDefault;

	public Boolean getIsDefault() {
		return isDefault;
	}

	public void setIsDefault(Boolean isDefault) {
		this.isDefault = isDefault;
	}

	public int getConnectionCount() {
		return connectionCount;
	}

	public void setConnectionCount(int connectionCount) {
		this.connectionCount = connectionCount;
	}

	public String getCurrentStatus() {
		return currentStatus;
	}

	public void setCurrentStatus(String currentStatus) {
		this.currentStatus = currentStatus;
	}

	private boolean isEnableNetworkDump;

	private Map<String, Map<String, String>> componentPerformanceMap = new HashMap<>();

	private Map<String, AtomicLong> getMessageRecieved = new HashMap<>();
	private Map<String, AtomicLong> getMessageSent = new HashMap<>();

	private List<IdAndCodeWrapperString> allNetworkStatusList;

	private String networkStatusForConnectionName;

	public Long getStatusChanged() {
		return statusChanged;
	}

	public void setStatusChanged(Long statusChanged) {
		this.statusChanged = statusChanged;
	}

	public Map<String, Map<String, String>> getComponentPerformanceMap() {
		return componentPerformanceMap;
	}

	public void setComponentPerformanceMap(Map<String, Map<String, String>> componentPerformanceMap) {
		this.componentPerformanceMap = componentPerformanceMap;
	}

	private String isClosed;

	private String isLog4jEnable;

	private Set<String> loggerList = new HashSet<>();

	public MonitoringScreenWrapper() {
	}

	public Map<String, AtomicLong> getGetMessageRecieved() {
		return getMessageRecieved;
	}

	public void setGetMessageRecieved(Map<String, AtomicLong> getMessageRecieved) {
		this.getMessageRecieved = getMessageRecieved;
	}

	public Map<String, AtomicLong> getGetMessageSent() {
		return getMessageSent;
	}

	public void setGetMessageSent(Map<String, AtomicLong> getMessageSent) {
		this.getMessageSent = getMessageSent;
	}

	@JsonIgnore
	private JmxMetaInfo jmxMetaInfo;

	public boolean isEnableNetworkDump() {
		return isEnableNetworkDump;
	}

	public void setEnableNetworkDump(boolean isEnableNetworkDump) {
		this.isEnableNetworkDump = isEnableNetworkDump;
	}

	public JmxMetaInfo getJmxMetaInfo() {
		return jmxMetaInfo;
	}

	public void setJmxMetaInfo(JmxMetaInfo jmxMetaInfo) {
		this.jmxMetaInfo = jmxMetaInfo;
	}

	public String getPerformanceStats() {
		return performanceStats;
	}

	public void setPerformanceStats(String performanceStats) {
		this.performanceStats = performanceStats;
	}

	public String getComponentPerformance() {
		return componentPerformance;
	}

	public void setComponentPerformance(String componentPerformance) {
		this.componentPerformance = componentPerformance;
	}

	private String performanceStats;
	private String componentPerformance;

	public Long getInstanceId() {
		return instanceId;
	}

	public void setInstanceId(Long instanceId) {
		this.instanceId = instanceId;
	}

	private String latency;
	private String logLebel;
	private String status;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getJmxURL() {
		return jmxURL;
	}

	public void setJmxURL(String jmxURL) {
		this.jmxURL = jmxURL;
	}

	public boolean isSafeToKill() {
		return isSafeToKill;
	}

	public void setSafeToKill(boolean isSafeToKill) {
		this.isSafeToKill = isSafeToKill;
	}

	public java.sql.Timestamp getRunningSince() {
		return runningSince;
	}

	public void setRunningSince(java.sql.Timestamp runningSince) {
		this.runningSince = runningSince;
	}

	public String getQueue() {
		return queue;
	}

	public void setQueue(String queue) {
		this.queue = queue;
	}

	public String getLatency() {
		return latency;
	}

	public void setLatency(String latency) {
		this.latency = latency;
	}

	public String getLogLebel() {
		return logLebel;
	}

	public void setLogLebel(String logLebel) {
		this.logLebel = logLebel;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getIsClosed() {
		return isClosed;
	}

	public void setIsClosed(String isClosed) {
		this.isClosed = isClosed;
	}

	public String getIsLog4jEnable() {
		return isLog4jEnable;
	}

	public void setIsLog4jEnable(String isLog4jEnable) {
		this.isLog4jEnable = isLog4jEnable;
	}

	public Set<String> getLoggerList() {
		return loggerList;
	}

	public void setLoggerList(Set<String> log4jObject) {
		this.loggerList = log4jObject;
	}

	public String getLoggerName() {
		return loggerName;
	}

	public void setLoggerName(String loggerName) {
		this.loggerName = loggerName;
	}

	public String getLoggerLevel() {
		return loggerLevel;
	}

	public void setLoggerLevel(String loggerLevel) {
		this.loggerLevel = loggerLevel;
	}

	public MethodWrapper getMethodWrapper() {
		return methodWrapper;
	}

	public void setMethodWrapper(MethodWrapper methodWrapper) {
		this.methodWrapper = methodWrapper;
	}

	public List<String> getListNetworkRequest() {
		return listNetworkRequest;
	}

	public void setListNetworkRequest(List<String> listNetworkRequest) {
		this.listNetworkRequest = listNetworkRequest;
	}

	public String getBeanName() {
		return beanName;
	}

	public void setBeanName(String beanName) {
		this.beanName = beanName;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public List<String> getListConnectionNames() {
		return listConnectionNames;
	}

	public void setListConnectionNames(List<String> listConnectionNames) {
		this.listConnectionNames = listConnectionNames;
	}

	public Map<String, Object> getConnectionDetailsMap() {
		return connectionDetailsMap;
	}

	public void setConnectionDetailsMap(Map<String, Object> connectionDetailsMap) {
		this.connectionDetailsMap = connectionDetailsMap;
	}

	public List<IdAndNameStringWrapper> getPropertiesMap() {
		return propertiesMap;
	}

	public void setPropertiesMap(List<IdAndNameStringWrapper> propertiesMap) {
		this.propertiesMap = propertiesMap;
	}

	public String getRestURL() {
		return restURL;
	}

	public void setRestURL(String restURL) {
		this.restURL = restURL;
	}

	public List<String> getSecretNames() {
		return secretNames;
	}

	public void setSecretNames(List<String> secretNames) {
		this.secretNames = secretNames;
	}

	public List<IdAndCodeWrapperString> getAllNetworkStatusList() {
		return allNetworkStatusList;
	}

	public void setAllNetworkStatusList(List<IdAndCodeWrapperString> allNetworkStatusList) {
		this.allNetworkStatusList = allNetworkStatusList;
	}

	public String getNetworkStatusForConnectionName() {
		return networkStatusForConnectionName;
	}

	public void setNetworkStatusForConnectionName(String networkStatusForConnectionName) {
		this.networkStatusForConnectionName = networkStatusForConnectionName;
	}

	public int getInflight() {
		return inflight;
	}

	public void setInflight(int inflight) {
		this.inflight = inflight;
	}
}
