package com.bnt.rest.dto;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class RoleDto {

	private Integer id;

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

	public List<RoleFunctionDto> getRoleFunctions() {
		return roleFunctions;
	}

	public void setRoleFunctions(List<RoleFunctionDto> roleFunctions) {
		this.roleFunctions = roleFunctions;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public boolean getActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}
}
