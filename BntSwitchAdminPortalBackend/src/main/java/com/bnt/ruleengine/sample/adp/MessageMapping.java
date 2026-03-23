package com.bnt.ruleengine.sample.adp;

import java.util.List;

import com.bnt.bswitch.query.parser.Condition;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class MessageMapping {

	private String messageType;

	private String apiName;

	private Condition condition;

	private AdapterReqResMapping requestMapping;

	private List<AdapterReqResMapping> listResponseMapping;

	private boolean multiResponse;

	private String networkService;

	private List<String> listEchoMapping;

	public String getMessageType() {
		return messageType;
	}

	public void setMessageType(String messageType) {
		this.messageType = messageType;
	}

	public String getApiName() {
		return apiName;
	}

	public void setApiName(String apiName) {
		this.apiName = apiName;
	}

	public Condition getCondition() {
		return condition;
	}

	public void setCondition(Condition condition) {
		this.condition = condition;
	}

	public AdapterReqResMapping getRequestMapping() {
		return requestMapping;
	}

	public void setRequestMapping(AdapterReqResMapping requestMapping) {
		this.requestMapping = requestMapping;
	}

	public List<AdapterReqResMapping> getListResponseMapping() {
		return listResponseMapping;
	}

	public void setListResponseMapping(List<AdapterReqResMapping> listResponseMapping) {
		this.listResponseMapping = listResponseMapping;
	}

	public boolean isMultiResponse() {
		return multiResponse;
	}

	public void setMultiResponse(boolean multiResponse) {
		this.multiResponse = multiResponse;
	}

	public String getNetworkService() {
		return networkService;
	}

	public void setNetworkService(String networkService) {
		this.networkService = networkService;
	}

	public List<String> getListEchoMapping() {
		return listEchoMapping;
	}

	public void setListEchoMapping(List<String> listEchoMapping) {
		this.listEchoMapping = listEchoMapping;
	}
}
