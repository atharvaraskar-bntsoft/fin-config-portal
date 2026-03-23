package com.bnt.rest.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.ImfTemplate;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface ImfTemplatePersistenceHelper extends CrudRepository<ImfTemplate, Integer> {

	@Query("select id, name from ImfTemplate")
	public List<Object[]> getAllTemplateName();

}
