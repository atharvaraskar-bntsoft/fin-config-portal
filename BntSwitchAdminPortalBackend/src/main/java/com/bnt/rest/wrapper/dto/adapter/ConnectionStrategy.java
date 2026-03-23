package com.bnt.rest.wrapper.dto.adapter;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ConnectionStrategy {

	private String strategyConnections;

	private StationGroupStrategy stationGroupStrategy;

	private String custumStrategy;

	public String getStrategyConnections() {
		return strategyConnections;
	}

	public void setStrategyConnections(String strategyConnections) {
		this.strategyConnections = strategyConnections;
	}

	public StationGroupStrategy getStationGroupStrategy() {
		return stationGroupStrategy;
	}

	public void setStationGroupStrategy(StationGroupStrategy stationGroupStrategy) {
		this.stationGroupStrategy = stationGroupStrategy;
	}

	public String getCustumStrategy() {
		return custumStrategy;
	}

	public void setCustumStrategy(String custumStrategy) {
		this.custumStrategy = custumStrategy;
	}

}
