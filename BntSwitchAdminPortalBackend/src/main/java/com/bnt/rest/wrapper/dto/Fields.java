package com.bnt.rest.wrapper.dto;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class Fields {

	private String useCase;

	private String name;

	private String label;

	private String datatype;

	private List<Operator> operator;

	private List<String> data;

	private String toolTip;

	public String getDatatype() {
		return datatype;
	}

	public void setDatatype(String datatype) {
		this.datatype = datatype;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public List<Operator> getOperator() {
		return operator;
	}

	public void setOperator(List<Operator> operator) {
		this.operator = operator;
	}

	public List<String> getData() {
		return data;
	}

	public void setData(List<String> data) {
		this.data = data;
	}

	public String getUseCase() {
		return useCase;
	}

	public void setUseCase(String useCase) {
		this.useCase = useCase;
	}

	public String getToolTip() {
		return toolTip;
	}

	public void setToolTip(String toolTip) {
		this.toolTip = toolTip;
	}
}
