package com.bnt.rest.jpa.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.DeploymentCluster;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface DeploymentClusterPersistenceHelper extends CrudRepository<DeploymentCluster, Integer> {

	@Query("select cluster from DeploymentCluster cluster where deploymentId.id=?1 and switchClusterId.id=?2")
	DeploymentCluster getClusterByDeploymentIdBySwitchClusterId(Integer deploymentId, Integer switchClusterId);
}
