package com.bnt.rest.wrapper.dto.adapter;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class StationGroupStrategy {

	private String inMessage;

	private List<NetworkGroupConnection> groupConnections;

	private String strategyIntraGroups;

	private String strategyGroups;

	private List<NetworkDataCenter> dataCenters;

	private String strategyLoadBalancers;

	private String strategyDataCenter;

	public String getInMessage() {
		return inMessage;
	}

	public void setInMessage(String inMessage) {
		this.inMessage = inMessage;
	}

	public List<NetworkGroupConnection> getGroupConnections() {
		return groupConnections;
	}

	public void setGroupConnections(List<NetworkGroupConnection> groupConnections) {
		this.groupConnections = groupConnections;
	}

	public String getStrategyIntraGroups() {
		return strategyIntraGroups;
	}

	public void setStrategyIntraGroups(String strategyIntraGroups) {
		this.strategyIntraGroups = strategyIntraGroups;
	}

	public String getStrategyGroups() {
		return strategyGroups;
	}

	public void setStrategyGroups(String strategyGroups) {
		this.strategyGroups = strategyGroups;
	}

	public List<NetworkDataCenter> getDataCenters() {
		return dataCenters;
	}

	public void setDataCenters(List<NetworkDataCenter> dataCenters) {
		this.dataCenters = dataCenters;
	}

	public String getStrategyLoadBalancers() {
		return strategyLoadBalancers;
	}

	public void setStrategyLoadBalancers(String strategyLoadBalancers) {
		this.strategyLoadBalancers = strategyLoadBalancers;
	}

	public String getStrategyDataCenter() {
		return strategyDataCenter;
	}

	public void setStrategyDataCenter(String strategyDataCenter) {
		this.strategyDataCenter = strategyDataCenter;
	}

}
