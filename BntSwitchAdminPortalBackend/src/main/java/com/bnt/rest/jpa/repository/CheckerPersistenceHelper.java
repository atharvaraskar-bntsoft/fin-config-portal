
package com.bnt.rest.jpa.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.Checker;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface CheckerPersistenceHelper extends CrudRepository<Checker, Integer> {
	public Page<Checker> findByStatusAndEntityTypeIn(String status, List<String> entityList, Pageable pageable);

	public Page<Checker> findByEntityTypeIn(List<String> entityList, Pageable pageable);

	public List<Checker> findByStatusAndEntityTypeIn(String status, List<String> entityList);

}
