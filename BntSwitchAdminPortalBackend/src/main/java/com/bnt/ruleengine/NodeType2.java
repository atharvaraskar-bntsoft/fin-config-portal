package com.bnt.ruleengine;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.fasterxml.jackson.annotation.JsonSetter;

/**************************
 * @author vaibhav.shejol *
 **************************/

@JsonPropertyOrder({ "type", "conditions" })
public class NodeType2 extends NodeType1 {

	private List<NodeType1> conditions;

	@JsonCreator
	public NodeType2(String type, List<NodeType1> conditions) {
		super();
		this.setType(type);
		this.conditions = conditions;
	}

	public List<NodeType1> getConditions() {
		return conditions;
	}

	@JsonSetter
	public void setConditions(List<NodeType1> conditions) {
		this.conditions = conditions;
	}
}
