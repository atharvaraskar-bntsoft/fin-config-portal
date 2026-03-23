package com.bnt.rest.wrapper.dto;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ConditionDto {

	public ConditionDto(List<Fields> fields, Output output, List<InputFields> inputfields) {
		this.fields = fields;
		this.output = output;
		this.inputfields = inputfields;
	}

	public ConditionDto() {

	}

	private List<Fields> fields;

	private Output output;

	private List<InputFields> inputfields;

	public List<Fields> getFields() {
		return fields;
	}

	public void setFields(List<Fields> fields) {
		this.fields = fields;
	}

	public Output getOutput() {
		return output;
	}

	public void setOutput(Output output) {
		this.output = output;
	}

	public List<InputFields> getInputfields() {
		return inputfields;
	}

	public void setInputfields(List<InputFields> inputfields) {
		this.inputfields = inputfields;
	}
}
