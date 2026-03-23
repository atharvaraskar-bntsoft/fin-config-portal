package com.bnt.rest.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.bnt.rest.entity.WorkFlow;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface WorkFlowRepository {

	public WorkFlow findWorkFlowById(Integer id);

	public WorkFlow save(WorkFlow workFlow);

	public List<WorkFlow> findWorkFlowByName(String name);

	public Page<WorkFlow> getPagableWorkFlowList(Pageable pageable);

	public Integer getMaxVersionForWorkFlow(String name);

	public WorkFlow getWorkFlowByNameAndVersion(String name, Integer version);

	public void deleteById(Integer id);

	public Integer getWorkflowIdToBeCreated();

	public Integer getWorkflowIdExistingByName(String name);

	Iterable<WorkFlow> getWorkFlowNotInDeployedComponent();

	List<Object[]> findAllNotinDeployedComponentNew();

	List<Object[]> getNameAndWorkFlowId();

	boolean validateWorkFlowNameByConvention(String name);

	String getNormalisedWorkFlowNameIfAny(String name);
}
