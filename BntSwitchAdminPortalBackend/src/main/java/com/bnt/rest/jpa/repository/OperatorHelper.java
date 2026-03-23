package com.bnt.rest.jpa.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.RuleOperator;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface OperatorHelper extends CrudRepository<RuleOperator, Integer> {

}
