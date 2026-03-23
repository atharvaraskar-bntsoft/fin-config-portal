package com.bnt.rest.dto;

import org.hibernate.validator.constraints.NotEmpty;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ErrorCodeMappingDto extends BaseDto {

	private DtoWrapper processorId;

	@NotEmpty(message = "Error Code should not be Empty")
	private String errorCode;

	@NotEmpty(message = "ErrorType should not be Empty")
	private String errorType;

	@NotEmpty(message = "ProcessorError Code should not be Empty")
	private String processorErrorCode;

	private boolean active;

	private Character deleted;

	public Character getDeleted() {
		return deleted;
	}

	public void setDeleted(Character deleted) {
		this.deleted = deleted;
	}

	public DtoWrapper getProcessorId() {
		return processorId;
	}

	public void setProcessorId(DtoWrapper processorId) {
		this.processorId = processorId;
	}

	public String getProcessorErrorCode() {
		return processorErrorCode;
	}

	public void setProcessorErrorCode(String processorErrorCode) {
		this.processorErrorCode = processorErrorCode;
	}

	public boolean getActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public String getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}

	public String getErrorType() {
		return errorType;
	}

	public void setErrorType(String errorType) {
		this.errorType = errorType;
	}
}
