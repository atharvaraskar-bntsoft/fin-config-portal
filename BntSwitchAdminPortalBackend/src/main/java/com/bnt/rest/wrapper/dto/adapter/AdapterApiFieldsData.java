package com.bnt.rest.wrapper.dto.adapter;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class AdapterApiFieldsData {

	private List<AdapterTransformData> headerFields;

	private List<AdapterApiFields> apiFields;

	public List<AdapterTransformData> getHeaderFields() {
		return headerFields;
	}

	public void setHeaderFields(List<AdapterTransformData> headerFields) {
		this.headerFields = headerFields;
	}

	public List<AdapterApiFields> getApiFields() {
		return apiFields;
	}

	public void setApiFields(List<AdapterApiFields> apiFields) {
		this.apiFields = apiFields;
	}

}
