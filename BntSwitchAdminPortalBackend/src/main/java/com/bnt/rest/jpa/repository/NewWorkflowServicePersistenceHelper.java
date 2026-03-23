package com.bnt.rest.jpa.repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.WorkFlowServices;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface NewWorkflowServicePersistenceHelper extends CrudRepository<WorkFlowServices, Integer> {

	@Query("delete from WorkFlowServices ws where ws.workFlow.id=?1 ")
	@Modifying
	public void deleteServices(Integer workflowId);

}