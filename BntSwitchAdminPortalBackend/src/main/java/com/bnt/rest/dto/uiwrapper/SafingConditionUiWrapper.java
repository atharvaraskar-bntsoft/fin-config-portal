package com.bnt.rest.dto.uiwrapper;

import com.bnt.common.util.JsonObjectUtil;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class SafingConditionUiWrapper {

	private String sourceType;

	private String sourceName;

	private String messageType;

	private Integer sourceId;

	private Integer version;

	private String condition;

	private Object conditionUi;

	private String status;

	public String getSourceType() {
		return sourceType;
	}

	public void setSourceType(String sourceType) {
		this.sourceType = sourceType;
	}

	public String getSourceName() {
		return sourceName;
	}

	public void setSourceName(String sourceName) {
		this.sourceName = sourceName;
	}

	public String getMessageType() {
		return messageType;
	}

	public void setMessageType(String messageType) {
		this.messageType = messageType;
	}

	public Integer getSourceId() {
		return sourceId;
	}

	public void setSourceId(Integer sourceId) {
		this.sourceId = sourceId;
	}

	public Integer getVersion() {
		return version;
	}

	public void setVersion(Integer version) {
		this.version = version;
	}

	public String getCondition() {
		return condition;
	}

	public void setCondition(String condition) {
		this.conditionUi = JsonObjectUtil.getObjectFromJsonString(condition);
		this.condition = condition;
	}

	public Object getConditionUi() {
		return conditionUi;
	}

	public void setConditionUi(Object conditionUi) {
		this.condition = JsonObjectUtil.getJsonStringFromObject(conditionUi);
		this.conditionUi = conditionUi;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
}
