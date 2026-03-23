package com.bnt.rest.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class StandardMessageSpecificationDto extends BaseDto {

	@JsonIgnore
	private String messageSchemaPackager;

	@JsonIgnore
	private String properties;

	@JsonIgnore
	private Character active;

	private LookupValueDto messageStandard;

	private LookupValueDto messageProtocol;

	private LookupValueDto transmissionProtocol;

	public String getMessageSchemaPackager() {
		return messageSchemaPackager;
	}

	public void setMessageSchemaPackager(String messageSchemaPackager) {
		this.messageSchemaPackager = messageSchemaPackager;
	}

	public String getProperties() {
		return properties;
	}

	public void setProperties(String properties) {
		this.properties = properties;
	}

	public Character getActive() {
		return active;
	}

	public void setActive(Character active) {
		this.active = active;
	}

	public LookupValueDto getMessageStandard() {
		return messageStandard;
	}

	public void setMessageStandard(LookupValueDto messageStandard) {
		this.messageStandard = messageStandard;
	}

	public LookupValueDto getMessageProtocol() {
		return messageProtocol;
	}

	public void setMessageProtocol(LookupValueDto messageProtocol) {
		this.messageProtocol = messageProtocol;
	}

	public LookupValueDto getTransmissionProtocol() {
		return transmissionProtocol;
	}

	public void setTransmissionProtocol(LookupValueDto transmissionProtocol) {
		this.transmissionProtocol = transmissionProtocol;
	}
}
