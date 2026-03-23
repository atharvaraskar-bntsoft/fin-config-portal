package com.bnt.rest.service;

import java.util.List;
import java.util.Map;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.util.exception.AccessDeniedException;
import com.bnt.rest.dto.DtoWrapper;
import com.bnt.rest.dto.RoleDto;
import com.bnt.rest.entity.Role;
import com.bnt.rest.entity.RoleFunction;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface RoleRestService {

	public ResponseWrapper getRoles(Map<String, Object> requestParamMap);

	public int addRole(RoleDto finalRoleDto);

	public Role findRoleById(int id);

	public void updateRole(RoleDto roleDto, Role role, String requestToken);

	public Map<String, Object> getFilterData();

	List<Role> getRoleList() throws AccessDeniedException;

	List<RoleFunction> getRoleFunctionList() throws AccessDeniedException;

	List<DtoWrapper> roleViewOnlyAdminPortalLinks();

}
