package com.bnt.rest.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Table(name = "data_files")
public class DataFiles extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Column(name = "file_name", nullable = false)
	private String fileName;

	@Column(name = "file_size_kb", nullable = false)
	private Integer fileSizeKb;

	@Column(name = "file_content", nullable = false)
	private byte[] fileContent;

	@Column(name = "file_mime_type", nullable = false)
	private String fileMimeType;

	@Column(name = "deleted", nullable = false)
	private Character deleted;

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public Integer getFileSizeKb() {
		return fileSizeKb;
	}

	public void setFileSizeKb(Integer fileSizeKb) {
		this.fileSizeKb = fileSizeKb;
	}

	public byte[] getFileContent() {
		return fileContent;
	}

	public void setFileContent(byte[] fileContent) {
		this.fileContent = fileContent;
	}

	public String getFileMimeType() {
		return fileMimeType;
	}

	public void setFileMimeType(String fileMimeType) {
		this.fileMimeType = fileMimeType;
	}

	public Character getDeleted() {
		return deleted;
	}

	public void setDeleted(Character deleted) {
		this.deleted = deleted;
	}
}
