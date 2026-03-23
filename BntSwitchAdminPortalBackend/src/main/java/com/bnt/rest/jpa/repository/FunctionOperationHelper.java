package com.bnt.rest.jpa.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.FunctionOperation;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface FunctionOperationHelper extends CrudRepository<FunctionOperation, Integer> {

}
