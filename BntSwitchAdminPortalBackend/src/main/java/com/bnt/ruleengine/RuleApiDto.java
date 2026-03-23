package com.bnt.ruleengine;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class RuleApiDto {

	private Integer id;

	private Integer apiversion;

	private String drooltype;

	private String dynamicclassname;

	private List<RuleApiDetailDto> ruleApiDetail;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getApiversion() {
		return apiversion;
	}

	public void setApiversion(Integer apiversion) {
		this.apiversion = apiversion;
	}

	public String getDrooltype() {
		return drooltype;
	}

	public void setDrooltype(String drooltype) {
		this.drooltype = drooltype;
	}

	public String getDynamicclassname() {
		return dynamicclassname;
	}

	public void setDynamicclassname(String dynamicclassname) {
		this.dynamicclassname = dynamicclassname;
	}

	public List<RuleApiDetailDto> getRuleApiDetail() {
		return ruleApiDetail;
	}

	public void setRuleApiDetail(List<RuleApiDetailDto> ruleApiDetail) {
		this.ruleApiDetail = ruleApiDetail;
	}
}
