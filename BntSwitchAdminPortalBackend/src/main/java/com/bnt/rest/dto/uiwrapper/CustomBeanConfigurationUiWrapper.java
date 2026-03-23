package com.bnt.rest.dto.uiwrapper;

import com.bnt.constant.Constants;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class CustomBeanConfigurationUiWrapper {

	private String componentType;

	private Integer componentId;

	private String fileType;

	private String fileName;

	private String fileContent;

	private String fileContentSingle;

	private Integer version;

	private String packagingType;

	public String getComponentType() {
		return componentType;
	}

	public void setComponentType(String componentType) {
		this.componentType = componentType;
	}

	public Integer getComponentId() {
		return componentId;
	}

	public void setComponentId(Integer componentId) {
		this.packagingType = Constants.CUSTOM;
		this.componentId = componentId;
	}

	public String getFileType() {
		return fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFileContent() {
		return fileContent;
	}

	public void setFileContent(String fileContent) {
		this.fileContent = fileContent;
	}

	public Integer getVersion() {
		return version;
	}

	public void setVersion(Integer version) {
		this.packagingType = Constants.SYSTEM;
		this.version = version;
	}

	public String getPackagingType() {
		return packagingType;
	}

	public void setPackagingType(String packagingType) {
		this.packagingType = packagingType;
	}

	public String getFileContentSingle() {
		return fileContentSingle;
	}

	public void setFileContentSingle(String fileContentSingle) {
		this.fileContentSingle = fileContentSingle;
	}
}
