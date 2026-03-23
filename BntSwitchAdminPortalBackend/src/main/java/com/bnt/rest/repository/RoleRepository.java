package com.bnt.rest.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.bnt.rest.entity.Role;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface RoleRepository {

	public Page<Role> getFilterData(Pageable pageable, String[] filters);

	void deleteRoleFunctionByRole(Role role);

}
