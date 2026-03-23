package com.bnt.rest.wrapper.dto;

import java.util.ArrayList;
import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ConfigureRouteRuleWrapper {

	private Integer priority;
	private List<Integer> ruleConfigIdList = new ArrayList<>();
	private Integer routingVersion;

	public Integer getPriority() {
		return priority;
	}

	public void setPriority(Integer priority) {
		this.priority = priority;
	}

	public List<Integer> getRuleConfigIdList() {
		return ruleConfigIdList;
	}

	public void setRuleConfigIdList(List<Integer> ruleConfigIdList) {
		this.ruleConfigIdList = ruleConfigIdList;
	}

	public Integer getRoutingVersion() {
		return routingVersion;
	}

	public void setRoutingVersion(Integer routingVersion) {
		this.routingVersion = routingVersion;
	}
}
