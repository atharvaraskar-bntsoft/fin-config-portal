package com.bnt.ruleengine;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class RuleApiDetailDto {

	private Integer id;

	@JsonIgnore
	private RuleApiDto ruleApi;

	private String sourcefieldname;

	private String contextfieldname;

	private String label;

	private String allowedvalues;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public RuleApiDto getRuleApi() {
		return ruleApi;
	}

	public void setRuleApi(RuleApiDto ruleApi) {
		this.ruleApi = ruleApi;
	}

	public String getSourcefieldname() {
		return sourcefieldname;
	}

	public void setSourcefieldname(String sourcefieldname) {
		this.sourcefieldname = sourcefieldname;
	}

	public String getContextfieldname() {
		return contextfieldname;
	}

	public void setContextfieldname(String contextfieldname) {
		this.contextfieldname = contextfieldname;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public String getAllowedvalues() {
		return allowedvalues;
	}

	public void setAllowedvalues(String allowedvalues) {
		this.allowedvalues = allowedvalues;
	}
}
