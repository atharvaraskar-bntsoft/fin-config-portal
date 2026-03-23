package com.bnt.rest.service;

import java.util.List;
import java.util.Map;
import java.util.Set;

import com.bnt.common.ResponseWrapper;
import com.bnt.rest.dto.DeploymentComponentDto;
import com.bnt.rest.dto.DeploymentHistoryWrapper;
import com.bnt.rest.dto.DeploymentStatusDto;
import com.bnt.rest.dto.IdNameVersionTypeWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface DeploymentComponentService {

	List<DeploymentComponentDto> getDeploymentComponentList();

	Map<String, List<DeploymentHistoryWrapper>> getDeploymentComponentHistory();

	ResponseWrapper findPagedDeploymentStatusRecords(Map<String, Object> requestParamMap);

	List<DeploymentStatusDto> getUnscheduledComponentList();

	List<DeploymentStatusDto> getAllComponentsList();

	List<DeploymentStatusDto> getAllDeploymentList();

	Map<String, List<DeploymentStatusDto>> getStatusMap();

	Set<Object[]> getOnlyScheduledAndDeployedComponents();

	Set<IdNameVersionTypeWrapper> getScheduledAndDeployedComponentWrapperList();

	void deleteById(int id);

	Set<IdNameVersionTypeWrapper> getComponentListForDeploymentWorkFlowJSON();
}
