package com.bnt.ruleengine;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class RuleDataUIDto {

	private String ruletype;

	private List<RuleFields> fields;

	public String getRuletype() {
		return ruletype;
	}

	public void setRuletype(String ruletype) {
		this.ruletype = ruletype;
	}

	public List<RuleFields> getFields() {
		return fields;
	}

	public void setFields(List<RuleFields> fields) {
		this.fields = fields;
	}
}
