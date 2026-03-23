package com.bnt.rest.entity;

import java.sql.Timestamp;

import jakarta.annotation.PostConstruct;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

import org.hibernate.annotations.Where;
import org.hibernate.envers.Audited;

import com.bnt.common.util.annotations.ExcludeExportMarker;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Audited
@Table(name = "system_user")
@Where(clause = "locked=0 AND deleted=0")
@ExcludeExportMarker
public class SystemUser extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Transient
	private String loginName;

	@Column(name = "first_name", nullable = false)
	private String firstName;

	@Column(name = "last_name", nullable = false)
	private String lastName;

	@Column(name = "email", nullable = false)
	private String email;

	@Column(name = "user_id", nullable = false)
	private String userId;

	@Column(name = "password", nullable = false)
	private String password;

	@Column(name = "password_updated_on", nullable = false)
	private Timestamp passwordLastUpdatedOn;

	@Column(name = "locked", nullable = false)
	private Character locked;

	@Column(name = "deleted", nullable = false)
	private Character deleted;

	@Column(name = "locked_reason", nullable = true)
	private String lockedReason;

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

	public Character getLocked() {
		return locked;
	}

	public void setLocked(Character locked) {
		this.locked = locked;
	}

	public Character getDeleted() {
		return deleted;
	}

	public void setDeleted(Character deleted) {
		this.deleted = deleted;
	}

	public String getLockedReason() {
		return lockedReason;
	}

	public void setLockedReason(String lockedReason) {
		this.lockedReason = lockedReason;
	}

	public String getLoginName() {
		return loginName;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}

	@Override
	public String toString() {
		return "SystemUser [firstName=" + firstName + ", lastName=" + lastName + ",  email=" + email
				+ ", systemUserCategory=" + "," + ", passwordLastUpdatedOn=" + passwordLastUpdatedOn + ", locked="
				+ locked + ", deleted=" + deleted + ", lockedReason=" + lockedReason + "]";
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	@PostConstruct
	public void init() {
		loginName = firstName + " " + lastName;
	}
}
