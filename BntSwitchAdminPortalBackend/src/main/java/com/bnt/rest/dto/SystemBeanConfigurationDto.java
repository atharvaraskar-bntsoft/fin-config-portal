package com.bnt.rest.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class SystemBeanConfigurationDto extends BaseDto {

	private String componentType;

	private String fileType;

	private Integer version;

	private String fileName;

	private String fileContent;

	private String fileContentSingle;

	public String getComponentType() {
		return componentType;
	}

	public void setComponentType(String componentType) {
		this.componentType = componentType;
	}

	public String getFileType() {
		return fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	public Integer getVersion() {
		return version;
	}

	public void setVersion(Integer version) {
		this.version = version;
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
