package com.bnt.rest.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import org.hibernate.envers.Audited;

import com.bnt.common.util.annotations.ExcludeExportMarker;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Audited
@Table(name = "system_role_function")
@ExcludeExportMarker
public class RoleFunction extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@ManyToOne(cascade = CascadeType.MERGE)
	@JoinColumn(name = "system_role_id", nullable = false)
	private Role role;

	@ManyToOne
	@JoinColumn(name = "submenu_function_id")
	private SubMenuFunction subMenuFunction;

	@Column(name = "canview", nullable = false)
	private boolean canView;

	@Column(name = "cancreate", nullable = false)
	private boolean canCreate;

	@Column(name = "canmodify", nullable = false)
	private boolean canModify;

	@Column(name = "candelete", nullable = false)
	private boolean candelete;

	@Column(name = "cancheck", nullable = false)
	private boolean canCheck;

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public SubMenuFunction getSubMenuFunction() {
		return subMenuFunction;
	}

	public void setSubMenuFunction(SubMenuFunction subMenuFunction) {
		this.subMenuFunction = subMenuFunction;
	}

	public boolean isCanView() {
		return canView;
	}

	public void setCanView(boolean canView) {
		this.canView = canView;
	}

	public boolean isCanCreate() {
		return canCreate;
	}

	public void setCanCreate(boolean canCreate) {
		this.canCreate = canCreate;
	}

	public boolean isCanCheck() {
		return canCheck;
	}

	public void setCanCheck(boolean canCheck) {
		this.canCheck = canCheck;
	}

	public boolean isCanModify() {
		return canModify;
	}

	public void setCanModify(boolean canModify) {
		this.canModify = canModify;
	}

	public boolean isCandelete() {
		return candelete;
	}

	public void setCandelete(boolean candelete) {
		this.candelete = candelete;
	}

	@Override
	public String toString() {
		return "RoleFunction [role=" + role + ", subMenuFunction=" + subMenuFunction + ", canView=" + canView
				+ ", canCreate=" + canCreate + ", canModify=" + canModify + ", candelete=" + candelete + ", canCheck="
				+ canCheck + "]";
	}
}
