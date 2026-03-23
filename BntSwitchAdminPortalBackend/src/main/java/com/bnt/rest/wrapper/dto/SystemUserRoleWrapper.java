package com.bnt.rest.wrapper.dto;

import java.util.List;

import com.bnt.rest.dto.SystemUserRoleDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class SystemUserRoleWrapper {

	private List<SystemUserRoleDto> list;

	private Boolean isAdminEnabled = false;

	private String adminRole;

	public List<SystemUserRoleDto> getList() {
		return list;
	}

	public void setList(List<SystemUserRoleDto> list) {
		this.list = list;
	}

	public Boolean getIsAdminEnabled() {
		return isAdminEnabled;
	}

	public void setIsAdminEnabled(Boolean isAdminEnabled) {
		this.isAdminEnabled = isAdminEnabled;
	}

	public String getAdminRole() {
		return adminRole;
	}

	public void setAdminRole(String adminRole) {
		this.adminRole = adminRole;
	}
}
