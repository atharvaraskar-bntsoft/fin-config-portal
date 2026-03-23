package com.bnt.rest.wrapper.dto.adapter;

import com.bnt.constant.Constants;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class SchemaUiResponseWrapper {

	// Will create Wrapper for same if needed
	private String persistRequired;

	private Object schema;

	private Object responseSchema;

	private String messageSchemaPackager;

	private String responsePackager;

	private String fileType;

	private boolean defaultPackager;

	public String getPersistRequired() {
		return persistRequired;
	}

	public void setPersistRequired(String persistRequired) {
		this.persistRequired = persistRequired;
	}

	public Object getSchema() {
		return schema;
	}

	public void setSchema(Object schema) {
		this.schema = schema;
	}

	public String getMessageSchemaPackager() {
		return messageSchemaPackager;
	}

	public void setMessageSchemaPackager(String messageSchemaPackager) {
		this.messageSchemaPackager = messageSchemaPackager;
	}

	public String getResponsePackager() {
		return responsePackager;
	}

	public void setResponsePackager(String responsePackager) {
		this.responsePackager = responsePackager;
	}

	public String getFileType() {
		return fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	public boolean isDefaultPackager() {
		return defaultPackager;
	}

	public void setDefaultPackager(boolean defaultPackager) {
		this.defaultPackager = defaultPackager;
	}

	public Object getResponseSchema() {
		return responseSchema;
	}

	public void setResponseSchema(Object responseSchema) {
		this.responseSchema = responseSchema;
	}

}
