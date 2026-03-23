package com.bnt.rest.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ELFunctionDto extends BaseDto {

	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getExpression() {
		return expression;
	}

	public void setExpression(String expression) {
		this.expression = expression;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	private String expression;

	private boolean active;

	private String expType;

	private String featureType;

	private String subType;

	private String parameters;

	private Integer paramCount;

	public String getExpType() {
		return expType;
	}

	public void setExpType(String expType) {
		this.expType = expType;
	}

	public String getFeatureType() {
		return featureType;
	}

	public String getSubType() {
		return subType;
	}

	public void setSubType(String subType) {
		this.subType = subType;
	}

	public void setFeatureType(String featureType) {
		this.featureType = featureType;
	}

	public String getParameters() {
		return parameters;
	}

	public void setParameters(String parameters) {
		this.parameters = parameters;
	}

	public Integer getParamCount() {
		return paramCount;
	}

	public void setParamCount(Integer paramCount) {
		this.paramCount = paramCount;
	}
}
