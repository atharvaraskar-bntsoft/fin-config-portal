package com.bnt.ruleengine;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

/**************************
 * @author vaibhav.shejol *
 **************************/

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Nodes {

	private boolean group;

	private String relation;

	private String key;

	private String operator;

	private String value;

	private List<Nodes> nodes;

	private String id;

	private String fieldName;

	private String service;

	private String message;

	public String getRelation() {
		return relation;
	}

	public void setRelation(String relation) {
		this.relation = relation;
	}

	public String getOperator() {
		return operator;
	}

	public void setOperator(String operator) {
		this.operator = operator;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public List<Nodes> getNodes() {
		return nodes;
	}

	public void setNodes(List<Nodes> nodes) {
		this.nodes = nodes;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public boolean isGroup() {
		return group;
	}

	public void setGroup(boolean group) {
		this.group = group;
	}

	public String getFieldName() {
		return fieldName;
	}

	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}

	public String getService() {
		return service;
	}

	public void setService(String service) {
		this.service = service;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}
