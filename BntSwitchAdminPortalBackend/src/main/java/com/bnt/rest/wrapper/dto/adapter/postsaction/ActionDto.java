package com.bnt.rest.wrapper.dto.adapter.postsaction;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ActionDto {

	private String actionName;

	private List<ActionParametersDto> parameters;

	private String tooltip;

	private String type;

	private boolean request = true;

	private boolean response = true;

	private boolean parametersOptional = false;

	public String getActionName() {
		return actionName;
	}

	public void setActionName(String actionName) {
		this.actionName = actionName;
	}

	public List<ActionParametersDto> getParameters() {
		return parameters;
	}

	public void setParameters(List<ActionParametersDto> parameters) {
		this.parameters = parameters;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getTooltip() {
		return tooltip;
	}

	public void setTooltip(String tooltip) {
		this.tooltip = tooltip;
	}

	public boolean isRequest() {
		return request;
	}

	public void setRequest(boolean request) {
		this.request = request;
	}

	public boolean isResponse() {
		return response;
	}

	public void setResponse(boolean response) {
		this.response = response;
	}

	public boolean isParametersOptional() {
		return parametersOptional;
	}

	public void setParametersOptional(boolean parametersOptional) {
		this.parametersOptional = parametersOptional;
	}
}
