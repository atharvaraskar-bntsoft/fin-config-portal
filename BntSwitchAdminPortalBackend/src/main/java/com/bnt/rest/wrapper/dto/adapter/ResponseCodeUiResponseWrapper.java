package com.bnt.rest.wrapper.dto.adapter;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ResponseCodeUiResponseWrapper {

	private String persistRequired;

	private IpcUiWrapper ipcUiWrapper;

	public String getPersistRequired() {
		return persistRequired;
	}

	public void setPersistRequired(String persistRequired) {
		this.persistRequired = persistRequired;
	}

	public IpcUiWrapper getIpcUiWrapper() {
		return ipcUiWrapper;
	}

	public void setIpcUiWrapper(IpcUiWrapper ipcUiWrapper) {
		this.ipcUiWrapper = ipcUiWrapper;
	}

}
