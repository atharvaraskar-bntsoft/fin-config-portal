package com.bnt.rest.jpa.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.RuleOutput;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface OutputHelper extends CrudRepository<RuleOutput, Integer> {

}
