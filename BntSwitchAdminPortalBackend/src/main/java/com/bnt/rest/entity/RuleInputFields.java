package com.bnt.rest.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Table(name = "rule_input_fields")
public class RuleInputFields {

	@Id
	@Column(name = "id", nullable = false)
	private int id;

	@Column(name = "label", nullable = false)
	private String label;

	@Column(name = "dto_field", nullable = false)
	private String dtoField;

	@Column(name = "input_type", nullable = false)
	private String inputType;

	@Column(name = "validation", nullable = false)
	private String validation;

	@Column(name = "drool_rule_api_id", nullable = false)
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

	public String getDtoField() {
		return dtoField;
	}

	public void setDtoField(String dtoField) {
		this.dtoField = dtoField;
	}

	public String getInputType() {
		return inputType;
	}

	public void setInputType(String inputType) {
		this.inputType = inputType;
	}

	public String getValidation() {
		return validation;
	}

	public void setValidation(String validation) {
		this.validation = validation;
	}

	public Integer getDroolRuleApi() {
		return droolRuleApi;
	}

	public void setDroolRuleApi(Integer droolRuleApi) {
		this.droolRuleApi = droolRuleApi;
	}
}
