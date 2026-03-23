package com.bnt.rest.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Table(name = "scheme_imf_mapper")
public class SchemeImfMapper extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "message_standard")
	private LookupValue messageStandard;

	@Column(name = "field_id")
	private String fieldId;

	@Column(name = "request_imf_expression")
	private String requestImfExpression;

	@Column(name = "response_imf_expression")
	private String responseImfExpression;

	@Column(name = "response_imf_leg")
	private String responseImfLeg;

	@Column(name = "request_imf_field")
	private String requestImfField;

	@Column(name = "response_imf_field")
	private String responseImfField;

	@Column(name = "name")
	private String name;

	@Column(name = "parameters")
	private String parameters;

	public LookupValue getMessageStandard() {
		return messageStandard;
	}

	public void setMessageStandard(LookupValue messageStandard) {
		this.messageStandard = messageStandard;
	}

	public String getFieldId() {
		return fieldId;
	}

	public void setFieldId(String fieldId) {
		this.fieldId = fieldId;
	}

	public String getRequestImfExpression() {
		return requestImfExpression;
	}

	public void setRequestImfExpression(String requestImfExpression) {
		this.requestImfExpression = requestImfExpression;
	}

	public String getResponseImfExpression() {
		return responseImfExpression;
	}

	public void setResponseImfExpression(String responseImfExpression) {
		this.responseImfExpression = responseImfExpression;
	}

	public String getResponseImfLeg() {
		return responseImfLeg;
	}

	public void setResponseImfLeg(String responseImfLeg) {
		this.responseImfLeg = responseImfLeg;
	}

	public String getRequestImfField() {
		return requestImfField;
	}

	public void setRequestImfField(String requestImfField) {
		this.requestImfField = requestImfField;
	}

	public String getResponseImfField() {
		return responseImfField;
	}

	public void setResponseImfField(String responseImfField) {
		this.responseImfField = responseImfField;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getParameters() {
		return parameters;
	}

	public void setParameters(String parameters) {
		this.parameters = parameters;
	}
}
