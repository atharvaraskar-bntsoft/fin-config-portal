package com.bnt.rest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class RoleFunctionDto extends BaseDto {

	private SubMenuFunctionDto subMenuFunction;

	@JsonProperty("view")
	private boolean canView;

	@JsonProperty("create")
	private boolean canCreate;

	@JsonProperty("modify")
	private boolean canModify;

	@JsonProperty("delete")
	private boolean candelete;

	@JsonProperty("check")
	private boolean canCheck;

	public boolean isCanCheck() {
		return canCheck;
	}

	public void setCanCheck(boolean canCheck) {
		this.canCheck = canCheck;
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

	public SubMenuFunctionDto getSubMenuFunction() {
		return subMenuFunction;
	}

	public void setSubMenuFunction(SubMenuFunctionDto subMenuFunction) {
		this.subMenuFunction = subMenuFunction;
	}

	@Override
	public String toString() {
		return "RoleFunctionDto [subMenuFunction=" + subMenuFunction + ", canView=" + canView + ", canCreate="
				+ canCreate + ", canModify=" + canModify + ", candelete=" + candelete + ", canCheck=" + canCheck + "]";
	}
}
