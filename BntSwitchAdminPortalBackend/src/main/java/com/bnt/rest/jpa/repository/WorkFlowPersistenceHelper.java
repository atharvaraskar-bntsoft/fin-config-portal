package com.bnt.rest.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.WorkFlow;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface WorkFlowPersistenceHelper
		extends PagingAndSortingRepository<WorkFlow, Integer>, CrudRepository<WorkFlow, Integer> {

	public List<WorkFlow> findWorkFlowByName(String name);

	@Query("select max(version) from WorkFlow where name=?1 ")
	public Integer getMaxVersionForWorkFlow(String name);

	@Query("select workFlow from WorkFlow workFlow where name=?1 and version=?2")
	public WorkFlow getWorkFlowByNameAndVersion(String name, Integer version);

	@Query("select (ifnull(max(workflowId),0)+1) from WorkFlow  ")
	public Integer getWorkflowIdToBeCreated();

	@Query("select max(workflowId) from WorkFlow where name=?1")
	public Integer getWorkflowIdExistingByName(String name);

	@Query("Select wf from WorkFlow wf LEFT JOIN DeploymentComponent dc ON (wf.id=dc.componentId and upper(dc.componentType)='WF' ) "
			+ " LEFT JOIN Deployment d ON dc.deployment.id=d.id \r\n"
			+ " where  wf.version > 0 AND (d.status IS NULL OR d.status not in ('Deployed','Scheduled')) ORDER BY wf.version DESC ")
	public Iterable<WorkFlow> findAllNotinDeployedComponent();

	@Query("Select wf.id, wf.name, wf.version,wf.workflowId,wf.deleted, wf.status,wf.createdBy,wf.createdOn,wf.updatedBy,wf.updatedOn"
			+ " from WorkFlow wf LEFT JOIN DeploymentComponent dc ON (wf.id=dc.componentId and upper(dc.componentType)='WF' ) "
			+ " LEFT JOIN Deployment d ON dc.deployment.id=d.id \r\n"
			+ " where  wf.version > 0 AND (d.status IS NULL OR d.status not in ('Deployed','Scheduled')) ORDER BY wf.version DESC ")
	public List<Object[]> findAllNotinDeployedComponentNew();

	@Query("select distinct workflowId,name  from WorkFlow")
	public List<Object[]> getNameAndWorkFlowId();

}
