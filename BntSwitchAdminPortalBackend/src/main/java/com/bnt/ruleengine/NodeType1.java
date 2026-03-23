package com.bnt.ruleengine;

import com.fasterxml.jackson.annotation.JsonSetter;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class NodeType1 {

	private String type;

	public String getType() {
		return type;
	}

	@JsonSetter
	public void setType(String type) {
		this.type = type;
	}
}
