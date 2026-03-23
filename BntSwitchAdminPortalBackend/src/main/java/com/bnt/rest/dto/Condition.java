package com.bnt.rest.dto;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class Condition {

	private Integer type;
	private String relation;
	private IdAndNameStringWrapper key;
	private IdAndNameStringWrapper function;
	private IdAndNameStringWrapper value;
	private String textValue;
	private List<Condition> conditions;

	public List<Condition> getConditions() {
		return conditions;
	}

	public void setConditions(List<Condition> conditions) {
		this.conditions = conditions;
	}

	public IdAndNameStringWrapper getFunction() {
		return function;
	}

	public void setFunction(IdAndNameStringWrapper function) {
		this.function = function;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public String getRelation() {
		return relation;
	}

	public void setRelation(String relation) {
		this.relation = relation;
	}

	public IdAndNameStringWrapper getKey() {
		return key;
	}

	public void setKey(IdAndNameStringWrapper key) {
		this.key = key;
	}

	public IdAndNameStringWrapper getValue() {
		return value;
	}

	public void setValue(IdAndNameStringWrapper value) {
		this.value = value;
	}

	public String getTextValue() {
		return textValue;
	}

	public void setTextValue(String textValue) {
		this.textValue = textValue;
	}

	@Override
	public String toString() {
		return "Condition [type=" + type + ", relation=" + relation + ", condition=" + key + ", function=" + function
				+ ", value=" + value + ", conditions=" + conditions + ", textValue=" + value + "]";
	}
}
