package com.bnt.rest.wrapper.dto.adapter;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class AdapterApiFields {

	private String apiName;

	private String apiurl;

	private String isMutliResponse;

	private List<AdapterTransformData> incomingFields;

	private List<AdapterTransformData> OutGoingFields;

	private List<ApiConditionalPackgerFields> apiConditionalPackgerFields;

	public String getApiName() {
		return apiName;
	}

	public void setApiName(String apiName) {
		this.apiName = apiName;
	}

	public String getApiurl() {
		return apiurl;
	}

	public void setApiurl(String apiurl) {
		this.apiurl = apiurl;
	}

	public List<AdapterTransformData> getIncomingFields() {
		return incomingFields;
	}

	public void setIncomingFields(List<AdapterTransformData> incomingFields) {
		this.incomingFields = incomingFields;
	}

	public List<AdapterTransformData> getOutGoingFields() {
		return OutGoingFields;
	}

	public void setOutGoingFields(List<AdapterTransformData> outGoingFields) {
		OutGoingFields = outGoingFields;
	}

	public String getIsMutliResponse() {
		return isMutliResponse;
	}

	public void setIsMutliResponse(String isMutliResponse) {
		this.isMutliResponse = isMutliResponse;
	}

	public List<ApiConditionalPackgerFields> getApiConditionalPackgerFields() {
		return apiConditionalPackgerFields;
	}

	public void setApiConditionalPackgerFields(List<ApiConditionalPackgerFields> apiConditionalPackgerFields) {
		this.apiConditionalPackgerFields = apiConditionalPackgerFields;
	}

}
