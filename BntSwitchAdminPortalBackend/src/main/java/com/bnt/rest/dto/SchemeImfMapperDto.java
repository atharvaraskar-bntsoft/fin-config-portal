package com.bnt.rest.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class SchemeImfMapperDto extends BaseDto {

	private LookupValueDto messageStandard;

	private String fieldId;

	private String requestImfExpression;

	private String responseImfExpression;

	private String responseImfLeg;

	private String requestImfField;

	private String responseImfField;

	private String name;

	private String parameters;

	public LookupValueDto getMessageStandard() {
		return messageStandard;
	}

	public void setMessageStandard(LookupValueDto messageStandard) {
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
