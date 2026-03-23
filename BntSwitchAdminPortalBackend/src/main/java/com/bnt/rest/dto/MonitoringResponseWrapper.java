package com.bnt.rest.dto;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class MonitoringResponseWrapper {

	List<MapMetaDataWrapper> healthDataList;

	Map<String, Object> groupMetaInfo;

	Map<String, Object> groupPerformanceMap = new HashMap<>();

	Map<String, ? extends Object> latencyTpsMap;

	Map<String, Integer> nodeStatusMap = new HashMap<>();

	public Map<String, ? extends Object> getLatencyTpsMap() {
		return latencyTpsMap;
	}

	public void setLatencyTpsMap(Map<String, ? extends Object> latencyTpsMap) {
		this.latencyTpsMap = latencyTpsMap;
	}

	public List<MapMetaDataWrapper> getHealthDataList() {
		return healthDataList;
	}

	public void setHealthDataList(List<MapMetaDataWrapper> healthDataList) {
		this.healthDataList = healthDataList;
	}

	public Map<String, Object> getGroupMetaInfo() {
		return groupMetaInfo;
	}

	public void setGroupMetaInfo(Map<String, Object> groupMetaInfo) {
		this.groupMetaInfo = groupMetaInfo;
	}

	public Map<String, Object> getGroupPerformanceMap() {
		return groupPerformanceMap;
	}

	public void setGroupPerformanceMap(Map<String, Object> groupPerformanceMap) {
		this.groupPerformanceMap = groupPerformanceMap;
	}

	public Map<String, Integer> getNodeStatusMap() {
		return nodeStatusMap;
	}

	public void setNodeStatusMap(Map<String, Integer> nodeStatusMap) {
		this.nodeStatusMap = nodeStatusMap;
	}
}
