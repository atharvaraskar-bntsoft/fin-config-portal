package com.bnt.rest.dto;

import java.io.Serializable;
import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class SessionUserDto extends BaseDto implements Serializable {

	private static final long serialVersionUID = 1L;

	private String userName;
	private String title;
	private String firstName;
	private String lastName;
	private String middleName;
	private String loginname;
	private String email;
	private String pagination;
	private boolean isPasswordExpire = false;
	private List<RoleDto> roleDto;
	private boolean locked;

	public String getPagination() {
		return pagination;
	}

	public void setPagination(String pagination) {
		this.pagination = pagination;
	}

	public boolean isPasswordExpire() {
		return isPasswordExpire;
	}

	public void setPasswordExpire(boolean isPasswordExpire) {
		this.isPasswordExpire = isPasswordExpire;
	}

	public boolean getLocked() {
		return locked;
	}

	public void setLocked(boolean locked) {
		this.locked = locked;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		if (userName != null && userName.trim().length() > 0) {
			this.userName = userName.trim();
		}
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		if (firstName != null && firstName.trim().length() > 0) {
			this.firstName = firstName.trim();
		}
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getMiddleName() {
		return middleName;
	}

	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}

	public String getLoginname() {
		return loginname;
	}

	public void setLoginname(String loginname) {
		this.loginname = loginname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		if (email != null && email.trim().length() > 0) {
			this.email = email.trim();
		}

	}

	public List<RoleDto> getRoleDto() {
		return roleDto;
	}

	public void setRoleDto(List<RoleDto> roleDto) {
		this.roleDto = roleDto;
	}
}
