package com.bnt.rest.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Table(name = "custom_bean_configuration")
public class CustomBeanConfiguration extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Column(name = "component_type", nullable = false)
	private String componentType;

	@Column(name = "component_id", nullable = false)
	private Integer componentId;

	@Column(name = "file_type", nullable = false)
	private String fileType;

	@Column(name = "file_name", nullable = false)
	private String fileName;

	@Column(name = "file_content", nullable = false)
	private String fileContent;

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
}
