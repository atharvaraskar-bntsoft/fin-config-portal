package com.bnt.rest.wrapper.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class FunctionOperationDto {

	private Integer id;

	private String name;

	private Operation operation;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Operation getOperation() {
		return operation;
	}

	public void setOperation(Operation operation) {
		this.operation = operation;
	}

	@Override
	public String toString() {
		return "FunctionOperationDto [id=" + id + ", name=" + name + ", operation=" + operation + "]";
	}

	public FunctionOperationDto(Integer id, String name, Operation operation) {
		super();
		this.id = id;
		this.name = name;
		this.operation = operation;
	}
}
