package com.bnt.rest.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class MasterConfigurationDto extends BaseDto {

	private String properties;

	private LookupValueDto messageStandard;

	private LookupValueDto messageProtocol;

	public String getProperties() {
		return properties;
	}

	public void setProperties(String properties) {
		this.properties = properties;
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

	private LookupValueDto transmissionProtocol;
}
