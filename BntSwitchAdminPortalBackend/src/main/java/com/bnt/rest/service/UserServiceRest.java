package com.bnt.rest.service;

import java.util.Map;

import com.bnt.common.ResponseWrapper;
import com.bnt.rest.dto.SystemUserDto;
import com.bnt.rest.entity.SystemUser;
import com.bnt.rest.wrapper.dto.SystemUserRoleWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface UserServiceRest {

	public ResponseWrapper findAllUsers(Map<String, Object> requestParamMap);

	public SystemUserDto findCurrentUser(String token) throws Exception;

	public void isUserExist(SystemUserDto user);

	public SystemUser findSystemUserById(int id);

	public int updateUser(SystemUserDto systemUserDto, SystemUser currentUser, String requestToken);

	public void deleteById(SystemUser currentUser);

	public Map<String, Object> getFilterData();

	public SystemUserRoleWrapper getUserRoleList(String requestToken);

	int saveUser(SystemUserDto systemUserDto, Character locked);

	SystemUser isUserExistByUserNameOrEmail(String userName, String email);

}
