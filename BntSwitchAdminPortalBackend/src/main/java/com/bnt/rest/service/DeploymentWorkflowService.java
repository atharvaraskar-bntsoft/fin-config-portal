package com.bnt.rest.service;

import java.util.Map;
import java.util.Set;

import com.bnt.common.ResponseWrapper;
import com.bnt.rest.dto.DeploymentDto;
import com.bnt.rest.dto.DeploymentWorkflowDto;
import com.bnt.rest.dto.IdNameVersionTypeWrapper;
import com.bnt.rest.entity.DeploymentWorkflow;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface DeploymentWorkflowService {

	ResponseWrapper getDeploymentWorkflow(Map<String, Object> requestParamMap);

	DeploymentWorkflow findSwitchClusterById(int id);

	void addDeploymentWorkflow(DeploymentWorkflowDto deploymentWorkflowDto);

	Set<IdNameVersionTypeWrapper> getComponentListForDeploymentWorkFlowJSON();

	int saveUpdateJson(DeploymentDto dto, Integer deploymentId);

}
