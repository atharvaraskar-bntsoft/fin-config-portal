package com.bnt.rest.wrapper.dto;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class LookuptypeUi {

	private String lookuptype;

	private List<LookupValueUi> values;

	public String getLookuptype() {
		return lookuptype;
	}

	public void setLookuptype(String lookuptype) {
		this.lookuptype = lookuptype;
	}

	public List<LookupValueUi> getValues() {
		return values;
	}

	public void setValues(List<LookupValueUi> values) {
		this.values = values;
	}
}
