package com.bnt.rest.service;

import java.util.List;
import java.util.Map;

import com.bnt.common.ResponseWrapper;
import com.bnt.rest.dto.DeploymentDto;
import com.bnt.rest.dto.DeploymentHistoryWrapper;
import com.bnt.rest.dto.DeploymentStatusDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface DeploymentService {

	DeploymentDto findRecordById(Integer id);

	Integer addRecord(DeploymentDto dto);

	Map<String, Object> getFilterData();

	ResponseWrapper findScheduleRecords(Map<String, Object> requestParamMap);

	Map<String, List<DeploymentHistoryWrapper>> getDeploymentHistoryMap(List<DeploymentStatusDto> deploymentStatusList);

	Integer updateRecord(DeploymentDto dto, Integer id, String xAuthToken);

	Map<String, List<DeploymentHistoryWrapper>> getHistoryMap(Map<String, List<DeploymentStatusDto>> statusMap);

	List<DeploymentStatusDto> groupUnscheduledListOnSchedulePage(Map<String, List<DeploymentHistoryWrapper>> historyMap,
			List<DeploymentStatusDto> unscheduledList);

}
