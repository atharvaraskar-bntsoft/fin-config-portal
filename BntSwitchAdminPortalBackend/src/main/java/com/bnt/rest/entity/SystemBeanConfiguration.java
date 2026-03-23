package com.bnt.rest.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Table(name = "system_bean_configuration")
public class SystemBeanConfiguration extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Column(name = "component_type", nullable = false)
	private String componentType;

	@Column(name = "file_type", nullable = false)
	private String fileType;

	@Column(name = "version", nullable = false)
	private Integer version;

	@Column(name = "file_name", nullable = false)
	private String fileName;

	@Column(name = "file_content", nullable = false)
	private String fileContent;

	@Column(name = "file_content_single", nullable = false)
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
