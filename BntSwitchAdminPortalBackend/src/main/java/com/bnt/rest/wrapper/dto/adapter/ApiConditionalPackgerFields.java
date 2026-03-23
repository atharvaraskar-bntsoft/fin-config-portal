package com.bnt.rest.wrapper.dto.adapter;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ApiConditionalPackgerFields {

	private String outgoingPackagerName;

	private List<AdapterTransformData> outGoingFields;

	public String getOutgoingPackagerName() {
		return outgoingPackagerName;
	}

	public void setOutgoingPackagerName(String outgoingPackagerName) {
		this.outgoingPackagerName = outgoingPackagerName;
	}

	public List<AdapterTransformData> getOutGoingFields() {
		return outGoingFields;
	}

	public void setOutGoingFields(List<AdapterTransformData> outGoingFields) {
		this.outGoingFields = outGoingFields;
	}

}
