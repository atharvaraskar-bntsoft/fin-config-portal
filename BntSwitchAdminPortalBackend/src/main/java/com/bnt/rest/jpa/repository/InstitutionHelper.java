package com.bnt.rest.jpa.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.Institution;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface InstitutionHelper extends CrudRepository<Institution, Integer> {

	public List<Institution> findByLockedAndDeleted(Character locked, Character deleted);

}
