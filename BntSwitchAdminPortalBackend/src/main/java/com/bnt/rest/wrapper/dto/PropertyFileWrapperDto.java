package com.bnt.rest.wrapper.dto;

import java.util.List;

import com.bnt.rest.dto.PropertyFileContentDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class PropertyFileWrapperDto {

	private String parentPath;

	private String fileName;

	private List<PropertyFileContentDto> propertyList;

	public String getParentPath() {
		return parentPath;
	}

	public void setParentpath(String parentPath) {
		this.parentPath = parentPath;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public List<PropertyFileContentDto> getPropertyList() {
		return propertyList;
	}

	public void setPropertyList(List<PropertyFileContentDto> propertyList) {
		this.propertyList = propertyList;
	}
}
