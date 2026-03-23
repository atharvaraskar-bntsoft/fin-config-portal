package com.bnt.rest.jpa.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.Role;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository()
public interface RolePersistenceHelper extends CrudRepository<Role, Integer> {

	public Page<Role> findRoleByDeleted(Character deleted, Pageable pageable);

	@Query("SELECT e FROM Role e WHERE e.name IN (:names)")
	public List<Role> findByRoleName(@Param("names") List<String> names);

	@Query("SELECT b.id, b.name from Role b ")
	public List<Object[]> findListRole();

}
