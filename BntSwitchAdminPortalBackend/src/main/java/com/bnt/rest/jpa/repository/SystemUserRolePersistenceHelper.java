package com.bnt.rest.jpa.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.SystemUser;
import com.bnt.rest.entity.SystemUserRole;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface SystemUserRolePersistenceHelper extends CrudRepository<SystemUserRole, Integer> {

	public SystemUserRole findSystemUserRoleBySystemUserID(SystemUser systemUser);

	public List<SystemUserRole> findBySystemUserIDId(int id);
}
