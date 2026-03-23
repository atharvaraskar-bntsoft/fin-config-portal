package com.bnt.rest.jpa.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.DeploymentWorkflow;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface DeploymentWorkflowPersistenceHelper extends CrudRepository<DeploymentWorkflow, Integer> {

	Page<DeploymentWorkflow> findAll(Pageable pageable);

	Optional<DeploymentWorkflow> findByDeploymentId(int deploymentId);

}
