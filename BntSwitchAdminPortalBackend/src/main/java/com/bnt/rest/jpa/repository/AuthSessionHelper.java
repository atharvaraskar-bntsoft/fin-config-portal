package com.bnt.rest.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.AuthSession;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository()
public interface AuthSessionHelper extends CrudRepository<AuthSession, Integer> {

	public AuthSession findAuthSessionByToken(String token);

	public AuthSession findByTokenAndInvalidated(String token, String invalidated);

	public List<AuthSession> findByCreatedBy(Integer id);

	public void deleteAuthSessionByCreatedBy(Integer id);

	public int deleteByToken(String token);

	@Modifying
	@Query("delete from AuthSession b where b.token=:token")
	void deleteToken(@Param("token") String token);
}
