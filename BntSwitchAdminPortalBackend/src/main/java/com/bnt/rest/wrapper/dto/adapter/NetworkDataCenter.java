package com.bnt.rest.wrapper.dto.adapter;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class NetworkDataCenter {

	private String dataCenter;

	private String loadBalancer;

	private List<String> group;

	public String getDataCenter() {
		return dataCenter;
	}

	public void setDataCenter(String dataCenter) {
		this.dataCenter = dataCenter;
	}

	public String getLoadBalancer() {
		return loadBalancer;
	}

	public void setLoadBalancer(String loadBalancer) {
		this.loadBalancer = loadBalancer;
	}

	public List<String> getGroup() {
		return group;
	}

	public void setGroup(List<String> group) {
		this.group = group;
	}

}
