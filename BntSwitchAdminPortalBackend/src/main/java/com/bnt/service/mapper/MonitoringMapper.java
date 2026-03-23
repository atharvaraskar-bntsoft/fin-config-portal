package com.bnt.service.mapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class MonitoringMapper {

	private MonitoringMapper() {

	}

	private static Object monitoringData;

	public static Object getMonitoringData() {
		return monitoringData;
	}

	public static void setMonitoringData(Object monitoringData) {
		MonitoringMapper.monitoringData = monitoringData;
	}
}
