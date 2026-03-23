package com.bnt.common.util.generic.rest.client;

import org.springframework.http.HttpMethod;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class PortalRestApiRequest {

	private String restApi;
	private HttpMethod requestType;

	public PortalRestApiRequest(String restApi, HttpMethod requestType) {
		super();
		this.restApi = restApi;
		this.requestType = requestType;
	}

	public String getRestApi() {
		return restApi;
	}

	public void setRestApi(String restApi) {
		this.restApi = restApi;
	}

	public HttpMethod getRequestType() {
		return requestType;
	}

	public void setRequestType(HttpMethod requestType) {
		this.requestType = requestType;
	}

	@Override
	public String toString() {
		return "RequestDetails [url=" + restApi + ", requestType=" + requestType + "]";
	}
}
