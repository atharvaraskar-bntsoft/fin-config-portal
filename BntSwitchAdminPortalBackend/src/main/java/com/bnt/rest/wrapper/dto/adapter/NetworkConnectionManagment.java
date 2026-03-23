package com.bnt.rest.wrapper.dto.adapter;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class NetworkConnectionManagment {

	private List<NetworkConnection> connections;

	private ConnectionStrategy strategyConnections;

	private String alternateConnection;

	public List<NetworkConnection> getConnections() {
		return connections;
	}

	public void setConnections(List<NetworkConnection> connections) {
		this.connections = connections;
	}

	public ConnectionStrategy getStrategyConnections() {
		return strategyConnections;
	}

	public void setStrategyConnections(ConnectionStrategy strategyConnections) {
		this.strategyConnections = strategyConnections;
	}

	public String getAlternateConnection() {
		return alternateConnection;
	}

	public void setAlternateConnection(String alternateConnection) {
		this.alternateConnection = alternateConnection;
	}

}
