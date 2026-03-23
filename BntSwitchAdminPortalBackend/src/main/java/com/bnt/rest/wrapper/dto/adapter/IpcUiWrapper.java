package com.bnt.rest.wrapper.dto.adapter;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class IpcUiWrapper {

	// @JsonProperty("ipcWrapperList")
	private List<IpcWrapper> ipcList = new ArrayList<>();

	private String defaultResponseCode;

	@JsonInclude(Include.NON_NULL)
	private String defaultResponseDesc;

	@JsonInclude(Include.NON_NULL)
	private String defaultStatusCode;

	private String componentResponseCodeField;

	public List<IpcWrapper> getIpcList() {
		return ipcList;
	}

	public void setIpcList(List<IpcWrapper> ipcList) {
		this.ipcList = ipcList;
	}

	public String getDefaultResponseCode() {
		return defaultResponseCode;
	}

	public void setDefaultResponseCode(String defaultResponseCode) {
		this.defaultResponseCode = defaultResponseCode;
	}

	public String getDefaultResponseDesc() {
		return defaultResponseDesc;
	}

	public void setDefaultResponseDesc(String defaultResponseDesc) {
		this.defaultResponseDesc = defaultResponseDesc;
	}

	public String getDefaultStatusCode() {
		return defaultStatusCode;
	}

	public void setDefaultStatusCode(String defaultStatusCode) {
		this.defaultStatusCode = defaultStatusCode;
	}

	public String getComponentResponseCodeField() {
		return componentResponseCodeField;
	}

	public void setComponentResponseCodeField(String componentResponseCodeField) {
		this.componentResponseCodeField = componentResponseCodeField;
	}

}
