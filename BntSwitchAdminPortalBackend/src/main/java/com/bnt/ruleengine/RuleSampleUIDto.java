package com.bnt.ruleengine;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class RuleSampleUIDto {

	private String version;

	private List<RuleDataUIDto> data;

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public List<RuleDataUIDto> getData() {
		return data;
	}

	public void setData(List<RuleDataUIDto> data) {
		this.data = data;
	}
}
