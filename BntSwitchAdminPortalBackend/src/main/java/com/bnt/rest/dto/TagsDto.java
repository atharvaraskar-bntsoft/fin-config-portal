package com.bnt.rest.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import com.bnt.service.mapper.TagsMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class TagsDto extends BaseDto {

	private String name;

	@JsonProperty("condition")
	private Object conditionUi;

	@JsonIgnore
	private String condition;

	private String tag;

	private String serviceType;

	private String exchangeType;

	private Character deleted;

	private Character active;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCondition() {
		return condition;
	}

	public void setCondition(String condition) {
		this.conditionUi = TagsMapper.getConditionUiObjectFromConditionString(condition);
		this.condition = condition;
	}

	public String getTag() {
		return tag;
	}

	public void setTag(String tag) {
		this.tag = tag;
	}

	public String getServiceType() {
		return serviceType;
	}

	public void setServiceType(String serviceType) {
		this.serviceType = serviceType;
	}

	public String getExchangeType() {
		return exchangeType;
	}

	public void setExchangeType(String exchangeType) {
		this.exchangeType = exchangeType;
	}

	public Character getDeleted() {
		return deleted;
	}

	public void setDeleted(Character deleted) {
		this.deleted = deleted;
	}

	public Character getActive() {
		return active;
	}

	public void setActive(Character active) {
		this.active = active;
	}

	public Object getConditionUi() {
		return conditionUi;
	}

	public void setConditionUi(Object conditionUi) {
		this.condition = TagsMapper.getConditionStringFromConditionUiObject(conditionUi);
		this.conditionUi = conditionUi;
	}
}
