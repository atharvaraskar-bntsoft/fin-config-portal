package com.bnt.rest.service;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.util.exception.AccessDeniedException;
import com.bnt.rest.entity.Role;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface PermissionService {

	boolean isPermission(String mappingUrl, String method, Role role);

	ResponseWrapper findPermission(int user, int role);

	public ResponseWrapper findCurrentUserPermission() throws AccessDeniedException;

}
