package com.bnt.rest.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ProcessorDto extends BaseDto {

	private String processorCode;

	private String processorName;

	private String processorDescription;

	public String getProcessorCode() {
		return processorCode;
	}

	public void setProcessorCode(String processorCode) {
		this.processorCode = processorCode;
	}

	public String getProcessorName() {
		return processorName;
	}

	public void setProcessorName(String processorName) {
		this.processorName = processorName;
	}

	public String getProcessorDescription() {
		return processorDescription;
	}

	public void setProcessorDescription(String processorDescription) {
		this.processorDescription = processorDescription;
	}
}
