package com.bnt.rest.repository;

import java.util.Map;
import java.util.Set;

import com.bnt.common.ResponseWrapper;
import com.bnt.rest.dto.IdNameVersionTypeWrapper;
import com.bnt.rest.entity.Deployment;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface DeploymentRepository {

	Deployment findRecordById(Integer id);

	ResponseWrapper findAllScheduledRecords(Map<String, Object> requestParamMap);

	Integer getDeploymentNewRecordCount();

	Set<IdNameVersionTypeWrapper> getComponentListForDeploymentWorkFlowJSON();

}
