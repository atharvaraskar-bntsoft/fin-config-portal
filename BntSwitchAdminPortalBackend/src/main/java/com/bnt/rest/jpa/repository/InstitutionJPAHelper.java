package com.bnt.rest.jpa.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.Institution;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface InstitutionJPAHelper extends CrudRepository<Institution, Integer> {

	public Institution findByName(String name);

}
