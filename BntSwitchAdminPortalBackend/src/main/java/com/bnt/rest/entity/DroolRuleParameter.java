package com.bnt.rest.entity;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Table(name = "drool_rule_parameter")
public class DroolRuleParameter implements Serializable {

	private static final long serialVersionUID = 2998551929687800887L;

	@Id
	@Column(name = "id", nullable = false)
	private int id;

	@Column(name = "drool_rule_api_id", nullable = false)
	private String apiId;

	@Column(name = "type", nullable = false)
	private String type;

	@Column(name = "label", nullable = false)
	private String label;

	@Column(name = "multiple", nullable = false)
	private String multiple;

	@Column(name = "editable", nullable = false)
	private String editable;

	@Column(name = "value", nullable = false)
	private String value;

	@Column(name = "table_name", nullable = false)
	private String tableName;

	@Column(name = "columns", nullable = false)
	private String column;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getApiId() {
		return apiId;
	}

	public void setApiId(String apiId) {
		this.apiId = apiId;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
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

	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

	public String getColumn() {
		return column;
	}

	public void setColumn(String column) {
		this.column = column;
	}
}
