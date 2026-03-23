package com.bnt.rest.repository.impl;

import java.util.List;

import jakarta.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import com.bnt.common.util.JPACriteriaUtils;
import com.bnt.rest.entity.WorkFlow;
import com.bnt.rest.jpa.repository.WorkFlowPersistenceHelper;
import com.bnt.rest.repository.WorkFlowRepository;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Component
public class WorkFlowRepositoryImpl implements WorkFlowRepository {

	@Autowired
	private WorkFlowPersistenceHelper workFlowPersistenceHelper;

	@Autowired
	private EntityManager entityManager;

	@Override
	public WorkFlow findWorkFlowById(Integer id) {
		return workFlowPersistenceHelper.findById(id).orElse(null);
	}

	@Override
	public WorkFlow save(WorkFlow workFlow) {
		return workFlowPersistenceHelper.save(workFlow);
	}

	@Override
	public List<WorkFlow> findWorkFlowByName(String name) {
		return workFlowPersistenceHelper.findWorkFlowByName(name);
	}

	@Override
	public Page<WorkFlow> getPagableWorkFlowList(Pageable pageable) {
		return workFlowPersistenceHelper.findAll(pageable);
	}

	@Override
	public Integer getMaxVersionForWorkFlow(String name) {
		return workFlowPersistenceHelper.getMaxVersionForWorkFlow(name);
	}

	@Override
	public WorkFlow getWorkFlowByNameAndVersion(String name, Integer version) {
		return workFlowPersistenceHelper.getWorkFlowByNameAndVersion(name, version);
	}

	@Override
	public void deleteById(Integer id) {
		workFlowPersistenceHelper.deleteById(id);
	}

	@Override
	public Integer getWorkflowIdToBeCreated() {
		return workFlowPersistenceHelper.getWorkflowIdToBeCreated();
	}

	@Override
	public Integer getWorkflowIdExistingByName(String name) {
		return workFlowPersistenceHelper.getWorkflowIdExistingByName(name);
	}

	@Override
	public Iterable<WorkFlow> getWorkFlowNotInDeployedComponent() {
		return workFlowPersistenceHelper.findAllNotinDeployedComponent();
	}

	@Override
	public List<Object[]> findAllNotinDeployedComponentNew() {
		return workFlowPersistenceHelper.findAllNotinDeployedComponentNew();
	}

	@Override
	public List<Object[]> getNameAndWorkFlowId() {
		return workFlowPersistenceHelper.getNameAndWorkFlowId();
	}

	@Override
	public boolean validateWorkFlowNameByConvention(String name) {
		return JPACriteriaUtils.validateName(entityManager, WorkFlow.class, name, "name");
	}

	@Override
	public String getNormalisedWorkFlowNameIfAny(String name) {
		String normalisedName = "";
		WorkFlow wf = JPACriteriaUtils.getEntityByName(entityManager, WorkFlow.class, name, "name");
		if (wf != null) {
			normalisedName = wf.getName();
		}
		return normalisedName;
	}
}
