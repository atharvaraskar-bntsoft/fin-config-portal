package com.bnt.rest.wrapper.dto.adapter;

import com.bnt.rest.dto.LookupValueDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class SchemeImfMapperUiWrapper {

	private Integer id;

	private LookupValueDto messageStandard;

	private String fieldId;

	private String fieldType;

	private String imfExpression;

	private String responseImfLeg;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

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

	public String getFieldType() {
		return fieldType;
	}

	public void setFieldType(String fieldType) {
		this.fieldType = fieldType;
	}

	public String getImfExpression() {
		return imfExpression;
	}

	public void setImfExpression(String imfExpression) {
		this.imfExpression = imfExpression;
	}

	public String getResponseImfLeg() {
		return responseImfLeg;
	}

	public void setResponseImfLeg(String responseImfLeg) {
		this.responseImfLeg = responseImfLeg;
	}

}
