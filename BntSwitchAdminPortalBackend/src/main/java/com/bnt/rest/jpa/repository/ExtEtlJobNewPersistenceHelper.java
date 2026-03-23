package com.bnt.rest.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.bnt.rest.entity.ExtEtlJobNew;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface ExtEtlJobNewPersistenceHelper extends CrudRepository<ExtEtlJobNew, Integer> {

	@Query("SELECT ac.id,a.jobName,a.type,ac.version,ac.jobStatus,ac.createdBy,ac.createdOn,ac.updatedBy,ac.updatedOn "
			+ "FROM ExtEtlJobNewDetail ac " + "LEFT JOIN ExtEtlJobNew a ON ac.extEtlJobId.id = a.id "
			+ "LEFT JOIN DeploymentComponent dc "
			+ " ON dc.name = a.jobName and dc.version = ac.version and dc.componentType IN ('EX')  "
			+ "LEFT JOIN Deployment d ON dc.deployment.id=d.id "
			+ "WHERE ac.version != 0 AND d.status IS NULL OR d.status not in ('Deployed\','Scheduled') ORDER BY ac.version DESC")
	public List<Object[]> findAllNotinDeployedComponentNew();

}
