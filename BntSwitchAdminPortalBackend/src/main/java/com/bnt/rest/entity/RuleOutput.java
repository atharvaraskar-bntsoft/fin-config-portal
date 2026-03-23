package com.bnt.rest.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Table(name = "rule_output")
public class RuleOutput {

	@Id
	@Column(name = "id", nullable = false)
	private int id;

	@Column(name = "label", nullable = false)
	private String label;

	@Column(name = "multiple", nullable = false)
	private String multiple;

	@Column(name = "editable", nullable = false)
	private String editable;

	@Column(name = "value", nullable = false)
	private String value;

	@Column(name = "value_type", nullable = false)
	private String valueType;

	@Column(name = "value_source", nullable = false)
	private String valueSource;

	@Column(name = "droolruleapi", nullable = false)
	private Integer droolRuleApi;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public String getMultiple() {
		return multiple;
	}

	public void setMultiple(String multiple) {
		this.multiple = multiple;
	}

	public String getEditable() {
		return editable;
	}

	public void setEditable(String editable) {
		this.editable = editable;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public Integer getDroolRuleApi() {
		return droolRuleApi;
	}

	public void setDroolRuleApi(Integer droolRuleApi) {
		this.droolRuleApi = droolRuleApi;
	}

	public String getValueType() {
		return valueType;
	}

	public void setValueType(String valueType) {
		this.valueType = valueType;
	}

	public String getValueSource() {
		return valueSource;
	}

	public void setValueSource(String valueSource) {
		this.valueSource = valueSource;
	}
}
