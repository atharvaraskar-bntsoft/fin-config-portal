package com.bnt.rest.wrapper.dto.adapter;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class TransformSchemeMapperUIDto {

	private String name;

	private String type;

	private String fieldId;

	private Object requestJson;

	private Object parametersUi;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getFieldId() {
		return fieldId;
	}

	public void setFieldId(String fieldId) {
		this.fieldId = fieldId;
	}

	public Object getRequestJson() {
		return requestJson;
	}

	public void setRequestJson(Object requestJson) {
		this.requestJson = requestJson;
	}

	public Object getParametersUi() {
		return parametersUi;
	}

	public void setParametersUi(Object parametersUi) {
		this.parametersUi = parametersUi;
	}

}
