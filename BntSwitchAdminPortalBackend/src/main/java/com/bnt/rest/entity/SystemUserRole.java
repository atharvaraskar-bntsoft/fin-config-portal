package com.bnt.rest.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import org.hibernate.envers.Audited;

import com.bnt.common.util.annotations.ExcludeExportMarker;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Audited
@Table(name = "system_user_role")
@ExcludeExportMarker
public class SystemUserRole extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "system_role_id")
	private Role roleID;

	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "system_user_id")
	private SystemUser systemUserID;

	public SystemUser getSystemUserID() {
		return systemUserID;
	}

	public Role getRoleID() {
		return roleID;
	}

	public void setRoleID(Role roleID) {
		this.roleID = roleID;
	}

	public void setSystemUserID(SystemUser systemUserID) {
		this.systemUserID = systemUserID;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.bnt.rest.entity.BaseEntity#toString()
	 */
	@Override
	public String toString() {
		return roleID != null ? roleID.getId().toString() : "";
	}
}
