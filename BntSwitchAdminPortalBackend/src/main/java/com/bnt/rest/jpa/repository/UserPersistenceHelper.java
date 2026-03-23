package com.bnt.rest.jpa.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.SystemUser;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface UserPersistenceHelper
		extends CrudRepository<SystemUser, Integer>, QuerydslPredicateExecutor<SystemUser> {

	public SystemUser findSystemUserByEmail(String emailId);

	public SystemUser findSystemUserByUserIdOrEmail(String userName, String email);

	public Page<SystemUser> findAll(Pageable pageable);

	public Page<SystemUser> findUserByDeleted(Character deleted, Pageable pageable);

	@Query("select s.id, concat(s.firstName,' ',s.lastName) from SystemUser s")
	List<Object[]> getIdAndNameOnly();

	@Query("select s.firstName from SystemUser s where s.id = ?1")
	public String getName(int id);
}
