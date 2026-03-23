package com.bnt.rest.dto;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class RoleUiDto extends BaseDto {

	private String name;

	private String description;

	private boolean locked;

	private boolean active;

	private boolean deleted;

	private List<RoleFunctionDto> roleFunctions;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<RoleFunctionDto> getRoleFunctions() {
		return roleFunctions;
	}

	public void setRoleFunctions(List<RoleFunctionDto> roleFunctions) {
		this.roleFunctions = roleFunctions;
	}

	public boolean getDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	public boolean getLocked() {
		return locked;
	}

	public void setLocked(boolean locked) {
		this.locked = locked;
	}

	public boolean getActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}
}
