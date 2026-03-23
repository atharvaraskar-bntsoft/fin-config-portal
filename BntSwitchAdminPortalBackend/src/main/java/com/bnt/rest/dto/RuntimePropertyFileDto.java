package com.bnt.rest.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class RuntimePropertyFileDto {

	private String name;

	private String parent;

	private String path;

	private Boolean isFolder;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getParent() {
		return parent;
	}

	public void setParent(String parent) {
		this.parent = parent;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public Boolean getIsFolder() {
		return isFolder;
	}

	public void setIsFolder(Boolean isFolder) {
		this.isFolder = isFolder;
	}
}
