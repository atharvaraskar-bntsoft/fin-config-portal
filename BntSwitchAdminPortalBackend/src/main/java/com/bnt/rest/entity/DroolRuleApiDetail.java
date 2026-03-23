package com.bnt.rest.entity;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Table(name = "drool_rule_api_detail")
public class DroolRuleApiDetail extends BaseEntity implements Serializable {

	private static final long serialVersionUID = 8215575019263837379L;

	@Column(name = "drool_rule_api_id", nullable = false)
	private String apiId;

	@Column(name = "source_field_name", nullable = false)
	private String sourceFieldName;

	@Column(name = "context_field_name")
	private String contextFieldName;

	@Column(name = "field_type", nullable = false)
	private String fieldType;

	@Column(name = "label")
	private String label;

	@Column(name = "allowed_values")
	private String allowedValues;

	@Column(name = "operator")
	private String operator;

	@Column(name = "table_name", nullable = false)
	private String tableName;

	@Column(name = "column_name", nullable = false)
	private String columnName;

	@Column(name = "validation", nullable = false)
	private String validation;

	public String getValidation() {
		return validation;
	}

	public void setValidation(String validation) {
		this.validation = validation;
	}

	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

	public String getColumnName() {
		return columnName;
	}

	public void setColumnName(String columnName) {
		this.columnName = columnName;
	}

	public String getApiId() {
		return apiId;
	}

	public void setApiId(String apiId) {
		this.apiId = apiId;
	}

	public String getSourceFieldName() {
		return sourceFieldName;
	}

	public void setSourceFieldName(String sourcefieldname) {
		this.sourceFieldName = sourcefieldname;
	}

	public String getContextFieldName() {
		return contextFieldName;
	}

	public void setContextFieldName(String contextfieldname) {
		this.contextFieldName = contextfieldname;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public String getFieldType() {
		return fieldType;
	}

	public void setFieldType(String fieldType) {
		this.fieldType = fieldType;
	}

	public String getAllowedValues() {
		return allowedValues;
	}

	public void setAllowedValues(String allowedValues) {
		this.allowedValues = allowedValues;
	}

	public String getOperator() {
		return operator;
	}

	public void setOperator(String operator) {
		this.operator = operator;
	}
}
