package com.bnt.rest.jpa.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.DroolRuleParameter;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface DroolRuleWebuiHelper extends CrudRepository<DroolRuleParameter, Integer> {

}
