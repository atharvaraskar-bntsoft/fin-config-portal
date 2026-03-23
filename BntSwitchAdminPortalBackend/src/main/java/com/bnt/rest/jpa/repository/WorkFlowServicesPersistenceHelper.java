package com.bnt.rest.jpa.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.WorkFlowServices;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface WorkFlowServicesPersistenceHelper extends CrudRepository<WorkFlowServices, Integer> {

	public List<WorkFlowServices> findAll();
}
