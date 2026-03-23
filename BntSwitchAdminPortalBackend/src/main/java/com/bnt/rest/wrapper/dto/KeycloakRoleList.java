package com.bnt.rest.wrapper.dto;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class KeycloakRoleList {

	private List<KeyclockRole> roleList;

	public List<KeyclockRole> getRoleList() {
		return roleList;
	}

	public void setRoleList(List<KeyclockRole> roleList) {
		this.roleList = roleList;
	}
}
