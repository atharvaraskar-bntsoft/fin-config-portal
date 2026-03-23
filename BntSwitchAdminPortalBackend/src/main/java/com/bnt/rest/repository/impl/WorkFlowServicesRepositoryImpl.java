package com.bnt.rest.repository.impl;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.WorkFlowServices;
import com.bnt.rest.jpa.repository.WorkFlowServicesPersistenceHelper;
import com.bnt.rest.repository.WorkFlowServicesRepository;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public class WorkFlowServicesRepositoryImpl implements WorkFlowServicesRepository {

	private static final Logger logger = LogManager.getLogger(WorkFlowServicesRepositoryImpl.class);

	@Autowired
	private WorkFlowServicesPersistenceHelper workFlowServicesPersistenceHelper;

	public void deleteWorkFlowServicesEntity(WorkFlowServices workFlowServices) {
		workFlowServicesPersistenceHelper.delete(workFlowServices);
	}

	@Override
	public void deleteWorkFlowServicesById(Integer id) {
		workFlowServicesPersistenceHelper.deleteById(id);
	}

	@Override
	public void deleteWorkFlowServicesEntityAll(List<WorkFlowServices> entities) {
		logger.info("Inside deleteWorkFlowServicesEntityAll with entities size: {}", entities.size());
		workFlowServicesPersistenceHelper.deleteAll(entities);
	}

	@Override
	public List<WorkFlowServices> findAll() {
		return workFlowServicesPersistenceHelper.findAll();
	}

}
