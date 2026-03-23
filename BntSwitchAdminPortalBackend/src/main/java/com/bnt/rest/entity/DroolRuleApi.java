package com.bnt.rest.entity;

import java.io.Serializable;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Table(name = "drool_rule_api")
public class DroolRuleApi implements Serializable {

	private static final long serialVersionUID = 8215575019263837379L;
	@Id
	@Column(name = "id", nullable = false)
	private int id;

	@Column(name = "api_version", nullable = false)
	private String apiVersion;

	@Column(name = "dynamic_class_name", nullable = false)
	private String dynamicClassName;

	@Column(name = "drool_type", nullable = false)
	private String type;

	@OneToMany(mappedBy = "apiId", cascade = CascadeType.ALL)
	private List<DroolRuleApiDetail> droolRuleApiDetail;

	@OneToMany(mappedBy = "apiId", cascade = CascadeType.ALL)
	private List<DroolRuleParameter> droolRuleParameter;

	@OneToMany(mappedBy = "droolRuleApi", cascade = CascadeType.ALL)
	private List<RuleInputFields> inputField;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getApiVersion() {
		return apiVersion;
	}

	public void setApiVersion(String apiVersion) {
		this.apiVersion = apiVersion;
	}

	public String getDynamicClassName() {
		return dynamicClassName;
	}

	public void setDynamicClassName(String dynamicClassName) {
		this.dynamicClassName = dynamicClassName;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public List<DroolRuleApiDetail> getDroolRuleApiDetail() {
		return droolRuleApiDetail;
	}

	public void setDroolRuleApiDetail(List<DroolRuleApiDetail> droolRuleApiDetail) {
		this.droolRuleApiDetail = droolRuleApiDetail;
	}

	public List<RuleInputFields> getInputField() {
		return inputField;
	}

	public void setInputField(List<RuleInputFields> inputField) {
		this.inputField = inputField;
	}

	public List<DroolRuleParameter> getDroolRuleParameter() {
		return droolRuleParameter;
	}

	public void setDroolRuleParameter(List<DroolRuleParameter> droolRuleParameter) {
		this.droolRuleParameter = droolRuleParameter;
	}
}
