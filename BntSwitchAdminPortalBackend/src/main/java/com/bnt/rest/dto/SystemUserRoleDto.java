package com.bnt.rest.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class SystemUserRoleDto extends BaseDto {

	private RoleDto roleID;

	private SystemUserDto systemUserID;

	public RoleDto getRoleID() {
		return roleID;
	}

	public void setRoleID(RoleDto roleID) {
		this.roleID = roleID;
	}

	public SystemUserDto getSystemUserID() {
		return systemUserID;
	}

	public void setSystemUserID(SystemUserDto systemUserID) {
		this.systemUserID = systemUserID;
	}
}
