package com.bnt.rest.jpa.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.DroolRuleApiDetail;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface DroolRuleApiDetailHelper extends CrudRepository<DroolRuleApiDetail, Integer> {

}
