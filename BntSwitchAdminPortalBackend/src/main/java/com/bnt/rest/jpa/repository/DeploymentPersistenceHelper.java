package com.bnt.rest.jpa.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.Deployment;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface DeploymentPersistenceHelper extends CrudRepository<Deployment, Integer> {
	@Query("select d from Deployment d where d.status = 'SCHEDULED'")
	public Page<Deployment> findAllScheduledRecords(Pageable pageable);

	@Query("select count(1)+1 from Deployment d ")
	public Integer getDeploymentNewRecordCount();

	@Query("select  d.status from Deployment d where d.id =?1 ")
	public String findStatusById(int parseInt);
	
	@Query("SELECT COUNT(d) FROM Deployment d WHERE d.name LIKE 'Workflow Upload%'")
	Integer countWorkflowUploads();
}
