package com.bnt.ruleengine.sample.adp;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ParametersUI {

	private String dataType;

	private String ordinal;

	private Object value;

	private String label;

	private String name;

	private List<ParameterMap> valueMap;

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public String getDataType() {
		return dataType;
	}

	public void setDataType(String dataType) {
		this.dataType = dataType;
	}

	public String getOrdinal() {
		return ordinal;
	}

	public void setOrdinal(String ordinal) {
		this.ordinal = ordinal;
	}

	public Object getValue() {
		return value;
	}

	public void setValue(Object value) {
		this.value = value;
	}

	public List<ParameterMap> getValueMap() {
		return valueMap;
	}

	public void setValueMap(List<ParameterMap> valueMap) {
		this.valueMap = valueMap;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
