package com.bnt.rest.wrapper.dto.adapter;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class NetworkGroupConnection {

	private String group;

	private List<String> connections;

	private String isLBGroup;

	public String getGroup() {
		return group;
	}

	public void setGroup(String group) {
		this.group = group;
	}

	public List<String> getConnections() {
		return connections;
	}

	public void setConnections(List<String> connections) {
		this.connections = connections;
	}

	public String getIsLBGroup() {
		return isLBGroup;
	}

	public void setIsLBGroup(String isLBGroup) {
		this.isLBGroup = isLBGroup;
	}

}
