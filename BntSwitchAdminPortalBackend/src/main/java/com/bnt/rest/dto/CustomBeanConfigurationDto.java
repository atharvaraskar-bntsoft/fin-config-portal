package com.bnt.rest.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class CustomBeanConfigurationDto extends BaseDto {

	private String componentType;

	private Integer componentId;

	private String fileType;

	private String fileName;

	private String fileContent;

	private String fileContentSingle;

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

	public String getFileContentSingle() {
		return fileContentSingle;
	}

	public void setFileContentSingle(String fileContentSingle) {
		this.fileContentSingle = fileContentSingle;
	}
}
