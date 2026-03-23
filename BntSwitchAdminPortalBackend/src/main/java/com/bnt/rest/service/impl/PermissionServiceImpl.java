package com.bnt.rest.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.util.exception.AccessDeniedException;
import com.bnt.rest.entity.Role;
import com.bnt.rest.entity.RoleFunction;
import com.bnt.rest.entity.SubMenuFunction;
import com.bnt.rest.entity.SystemUser;
import com.bnt.rest.jpa.repository.RoleFunctionPersistenceHelper;
import com.bnt.rest.jpa.repository.RolePersistenceHelper;
import com.bnt.rest.jpa.repository.SubMenuHelper;
import com.bnt.rest.service.PermissionService;
import com.bnt.rest.service.RoleRestService;
import com.bnt.rest.wrapper.dto.PermissionDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class PermissionServiceImpl implements PermissionService {

	@Autowired
	private RoleRestService roleService;

	@Autowired
	private SubMenuHelper subMenuHelper;

	@Autowired
	private RoleFunctionPersistenceHelper roleFunctionRepo;

	@Autowired
	private RolePersistenceHelper roleHelper;

	/** The Constant LOGGER. */
	private static final Logger log = LogManager.getLogger(PermissionServiceImpl.class);

	@Override
	public ResponseWrapper findCurrentUserPermission() throws AccessDeniedException {
		log.info("inside findCurrentUserPermission()..");
		List<PermissionDto> permissionDtosList = new ArrayList<>();
		Map<String, PermissionDto> map = new HashMap<>();
		List<Role> roleList = roleService.getRoleList();
		for (Role role : roleList) {
			List<RoleFunction> roleFunctionList = roleFunctionRepo.findRoleFunctionByRoleId(role.getId());
			addIntoMap(roleFunctionList, map);
		}
		map.forEach((k, v) -> permissionDtosList.add(v));
		ResponseWrapper responseWrapper = new ResponseWrapper();
		responseWrapper.setContent(permissionDtosList);

		return responseWrapper;
	}

	private void addIntoMap(List<RoleFunction> roleFunctionList, Map<String, PermissionDto> map) {
		for (RoleFunction roleFunction : roleFunctionList) {
			PermissionDto permissionDto = map.get(roleFunction.getSubMenuFunction().getUrl());
			if (permissionDto == null) {
				permissionDto = new PermissionDto();
			}
			if (roleFunction.isCanView()) {
				permissionDto.setRead(roleFunction.isCanView());
			}
			if (roleFunction.isCanCreate()) {
				permissionDto.setWrite(roleFunction.isCanCreate());
			}
			if (roleFunction.isCanModify()) {
				permissionDto.setUpdate(roleFunction.isCanModify());
			}
			if (roleFunction.isCandelete()) {
				permissionDto.setDelete(roleFunction.isCandelete());
			}
			if (roleFunction.isCanCheck()) {
				permissionDto.setCheck(roleFunction.isCanCheck());
			}
			permissionDto.setId(roleFunction.getSubMenuFunction().getUrl());
			map.put(roleFunction.getSubMenuFunction().getUrl(), permissionDto);
		}
	}

	@Override
	public ResponseWrapper findPermission(int user, int roleId) {
		SystemUser systemUser = new SystemUser();
		systemUser.setId(user);
		Optional<Role> optional = roleHelper.findById(roleId);

		if (optional.isPresent()) {
			Role role = optional.get();
			ResponseWrapper responseWrapper = new ResponseWrapper();
			responseWrapper.setContent(role);
			return responseWrapper;
		}
		return null;
	}

	@Override
	public boolean isPermission(String mappingUrl, String method, Role role) {
		SubMenuFunction subMenu = subMenuHelper.findSubMenuFunctionByMappingUrl(mappingUrl);

		if (subMenu == null) {
			return true;
		}

		RoleFunction roleFunction = roleFunctionRepo.findByRoleAndSubMenuFunction(role, subMenu);
		boolean permission = false;
		switch (method) {
		case "POST":
			permission = roleFunction.isCanCreate();
			break;

		case "PUT":
			permission = roleFunction.isCanModify();
			break;

		case "DELETE":
			permission = roleFunction.isCandelete();
			break;

		case "GET":
			permission = roleFunction.isCanView();
			break;

		default:
			break;
		}

		return permission;

	}

}