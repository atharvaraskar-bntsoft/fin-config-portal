package com.bnt.rest.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class DataFilesDto extends BaseDto {

	private String fileName;

	private Integer fileSizeKb;

	private byte[] fileContent;

	private String fileMimeType;

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
