package com.bnt.rest.dto;

import java.util.List;

import com.bnt.rest.wrapper.dto.IdAndNameWrapper;
import com.bnt.rest.wrapper.dto.RuleListForUpdateDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class RoutingUiDto {

	private String routeName;

	private String routeDesc;

	private IdAndNameWrapper routetypevalue;

	private String ruletype;

	private String routetype;

	private boolean ruleActive;

	private List<RuleListDto> ruleList;

	private List<RuleListForUpdateDto> ruleListUpdate;

	public String getRuletype() {
		return ruletype;
	}

	public void setRuletype(String ruletype) {
		this.ruletype = ruletype;
	}

	public String getRoutetype() {
		return routetype;
	}

	public void setRoutetype(String routetype) {
		this.routetype = routetype;
	}

	public String getRouteName() {
		return routeName;
	}

	public void setRouteName(String routeName) {
		this.routeName = routeName;
	}

	public String getRouteDesc() {
		return routeDesc;
	}

	public void setRouteDesc(String routeDesc) {
		this.routeDesc = routeDesc;
	}

	public boolean getRuleActive() {
		return ruleActive;
	}

	public void setRuleActive(boolean ruleActive) {
		this.ruleActive = ruleActive;
	}

	public List<RuleListDto> getRuleList() {
		return ruleList;
	}

	public void setRuleList(List<RuleListDto> ruleList) {
		this.ruleList = ruleList;
	}

	public List<RuleListForUpdateDto> getRuleListUpdate() {
		return ruleListUpdate;
	}

	public void setRuleListUpdate(List<RuleListForUpdateDto> ruleListUpdate) {
		this.ruleListUpdate = ruleListUpdate;
	}

	public IdAndNameWrapper getRoutetypevalue() {
		return routetypevalue;
	}

	public void setRoutetypevalue(IdAndNameWrapper routetypevalue) {
		this.routetypevalue = routetypevalue;
	}
}
