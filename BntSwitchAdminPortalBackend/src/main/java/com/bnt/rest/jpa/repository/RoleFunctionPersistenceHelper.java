package com.bnt.rest.jpa.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.Role;
import com.bnt.rest.entity.RoleFunction;
import com.bnt.rest.entity.SubMenuFunction;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository()
public interface RoleFunctionPersistenceHelper extends CrudRepository<RoleFunction, Integer> {

	public List<RoleFunction> findRoleFunctionByRoleId(int id);

	public RoleFunction findByRoleAndSubMenuFunction(Role role, SubMenuFunction subMenuFunction);

	public void deleteByRoleAndSubMenuFunction(Role role, SubMenuFunction subMenuFunction);

}
