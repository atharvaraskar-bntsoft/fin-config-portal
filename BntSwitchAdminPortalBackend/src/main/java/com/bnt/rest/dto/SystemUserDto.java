package com.bnt.rest.dto;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.bnt.rest.entity.SystemUserCategory;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class SystemUserDto extends BaseDto {

	private String firstName;
	private String lastName;
	private String loginName = firstName + " " + lastName;
	private String userId;

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getLoginName() {
		return loginName;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}

	private String email;

	@JsonIgnore
	private SystemUserCategory systemUserCategory;

	@JsonIgnore
	private String password;

	@JsonIgnore
	private Timestamp passwordLastUpdatedOn;

	private boolean locked;

	private boolean active;

	@JsonIgnore
	private boolean deleted;

	@JsonIgnore
	private String lockedReason;

	private Integer roleId;

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public SystemUserCategory getSystemUserCategory() {
		return systemUserCategory;
	}

	public void setSystemUserCategory(SystemUserCategory systemUserCategory) {
		this.systemUserCategory = systemUserCategory;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Timestamp getPasswordLastUpdatedOn() {
		return passwordLastUpdatedOn;
	}

	public void setPasswordLastUpdatedOn(Timestamp passwordLastUpdatedOn) {
		this.passwordLastUpdatedOn = passwordLastUpdatedOn;
	}

	public boolean getLocked() {
		return locked;
	}

	public void setLocked(boolean locked) {
		this.locked = locked;
	}

	public boolean getDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	public String getLockedReason() {
		return lockedReason;
	}

	public void setLockedReason(String lockedReason) {
		this.lockedReason = lockedReason;
	}

	public Integer getRoleId() {
		return roleId;
	}

	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}

	@Override
	public String toString() {
		return "SystemUserDto [firstName=" + firstName + ", lastName=" + lastName + ", " + ", email=" + email
				+ ", systemUserCategory=" + systemUserCategory + ", passwordLastUpdatedOn=" + passwordLastUpdatedOn
				+ ", locked=" + locked + ", deleted=" + deleted + ", lockedReason=" + lockedReason + ", roleId="
				+ roleId + "]";
	}

	public boolean getActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}
}
