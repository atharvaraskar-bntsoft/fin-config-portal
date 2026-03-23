package com.bnt.ruleengine.sample.adp;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class MappingMapper {

	private String type;

	private String name;

	private String packagerField;

	private List<ParametersUI> listParameters;

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<ParametersUI> getListParameters() {
		return listParameters;
	}

	public void setListParameters(List<ParametersUI> listParameters) {
		this.listParameters = listParameters;
	}

	public String getPackagerField() {
		return packagerField;
	}

	public void setPackagerField(String packagerField) {
		this.packagerField = packagerField;
	}
}
