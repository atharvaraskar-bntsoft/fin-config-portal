package com.bnt.rest.repository;

import java.util.List;

import com.bnt.rest.entity.WorkFlowServices;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface WorkFlowServicesRepository {

	public void deleteWorkFlowServicesById(Integer id);

	public void deleteWorkFlowServicesEntityAll(List<WorkFlowServices> entities);

	public List<WorkFlowServices> findAll();

}
