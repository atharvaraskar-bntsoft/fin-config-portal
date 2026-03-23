package com.bnt.rest.wrapper.dto.adapter;

import java.util.List;

import com.bnt.rest.wrapper.dto.IdAndCodeWrapperString;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class TransformUiResponseWrapper {

	private String persistRequired;

	private Object requestMapping;

	private Object responseMapping;

	private Object imfLeg;

	private List<FieldSchemeImfMapperUiWrapper> fieldSchemeImfMapperUiWrapper;

	private List<FieldSchemeImfMapperUiWrapper> responseFieldSchemeImfMapperUiWrapper;

	private List<IdAndCodeWrapperString> listIdRule;

	private List<IdAndCodeWrapperString> responseListIdRule;

	private List<TransformUiSafingCondition> safingCondition;

	private AdapterApiFieldsData apiFieldsData;

	public String getPersistRequired() {
		return persistRequired;
	}

	public void setPersistRequired(String persistRequired) {
		this.persistRequired = persistRequired;
	}

	public Object getRequestMapping() {
		return requestMapping;
	}

	public void setRequestMapping(Object requestMapping) {
		this.requestMapping = requestMapping;
	}

	public Object getResponseMapping() {
		return responseMapping;
	}

	public void setResponseMapping(Object responseMapping) {
		this.responseMapping = responseMapping;
	}

	public Object getImfLeg() {
		return imfLeg;
	}

	public void setImfLeg(Object imfLeg) {
		this.imfLeg = imfLeg;
	}

	public List<FieldSchemeImfMapperUiWrapper> getFieldSchemeImfMapperUiWrapper() {
		return fieldSchemeImfMapperUiWrapper;
	}

	public void setFieldSchemeImfMapperUiWrapper(List<FieldSchemeImfMapperUiWrapper> fieldSchemeImfMapperUiWrapper) {
		this.fieldSchemeImfMapperUiWrapper = fieldSchemeImfMapperUiWrapper;
	}

	public List<IdAndCodeWrapperString> getListIdRule() {
		return listIdRule;
	}

	public void setListIdRule(List<IdAndCodeWrapperString> listIdRule) {
		this.listIdRule = listIdRule;
	}

	public List<TransformUiSafingCondition> getSafingCondition() {
		return safingCondition;
	}

	public void setSafingCondition(List<TransformUiSafingCondition> safingCondition) {
		this.safingCondition = safingCondition;
	}

	public AdapterApiFieldsData getApiFieldsData() {
		return apiFieldsData;
	}

	public void setApiFieldsData(AdapterApiFieldsData apiFieldsData) {
		this.apiFieldsData = apiFieldsData;
	}

	public List<FieldSchemeImfMapperUiWrapper> getResponseFieldSchemeImfMapperUiWrapper() {
		return responseFieldSchemeImfMapperUiWrapper;
	}

	public void setResponseFieldSchemeImfMapperUiWrapper(
			List<FieldSchemeImfMapperUiWrapper> responseFieldSchemeImfMapperUiWrapper) {
		this.responseFieldSchemeImfMapperUiWrapper = responseFieldSchemeImfMapperUiWrapper;
	}

	public List<IdAndCodeWrapperString> getResponseListIdRule() {
		return responseListIdRule;
	}

	public void setResponseListIdRule(List<IdAndCodeWrapperString> responseListIdRule) {
		this.responseListIdRule = responseListIdRule;
	}

}
