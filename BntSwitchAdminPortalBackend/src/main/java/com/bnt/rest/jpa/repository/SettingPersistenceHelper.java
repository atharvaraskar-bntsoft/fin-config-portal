package com.bnt.rest.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import com.bnt.rest.entity.Setting;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface SettingPersistenceHelper extends CrudRepository<Setting, Integer> {

	public List<Setting> findAll();

	@Transactional(readOnly = false)
	@Query(value = "select CURRENT_TIMESTAMP from ripps.system_user", nativeQuery = true)
	public List<Object[]> getCurrentTime();

	@Transactional(readOnly = false)
	@Query(value = "select NOW()", nativeQuery = true)
	public Object[] getCurrentDateTime();

	public Setting findBySystemUserIdId(Integer id);

}
