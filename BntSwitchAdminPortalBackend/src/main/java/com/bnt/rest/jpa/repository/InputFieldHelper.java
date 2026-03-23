package com.bnt.rest.jpa.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.RuleInputFields;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface InputFieldHelper extends CrudRepository<RuleInputFields, Integer> {

}
