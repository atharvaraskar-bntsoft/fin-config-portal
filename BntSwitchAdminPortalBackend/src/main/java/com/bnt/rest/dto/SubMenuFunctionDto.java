package com.bnt.rest.dto;

import com.bnt.rest.wrapper.dto.PermissionData;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class SubMenuFunctionDto {

	private int id;

	private String name;

	private String url;

	private String mappingUrl;

	private PermissionData permissionData;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getMappingUrl() {
		return mappingUrl;
	}

	public void setMappingUrl(String mappingUrl) {
		this.mappingUrl = mappingUrl;
	}

	public PermissionData getPermissionData() {
		return permissionData;
	}

	public void setPermissionData(PermissionData permissionData) {
		this.permissionData = permissionData;
	}

	@Override
	public String toString() {
		return "SubMenuFunctionDto [id=" + id + ", name=" + name + ", url=" + url + ", mappingUrl=" + mappingUrl
				+ ", permissionData=" + permissionData + "]";
	}
}
