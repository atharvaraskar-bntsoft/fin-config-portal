package com.bnt.rest.repository;

import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.bnt.common.ResponseWrapper;
import com.bnt.rest.entity.SystemUser;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface UserRepository {

	public SystemUser findSystemUserByEmail(String emailId);

	public SystemUser findOne(int id);

	public Page<SystemUser> findSystemUserByRoleId(String roleId, Pageable pageable);

	public Page<SystemUser> findAll(Pageable pageable);

	public ResponseWrapper findAllUsers(Map<String, Object> requestParamMap);

	public SystemUser saveUser(SystemUser systemUser);

	String getName(int id);
}
