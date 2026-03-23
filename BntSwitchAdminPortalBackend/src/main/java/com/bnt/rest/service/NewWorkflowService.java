package com.bnt.rest.service;

import java.util.List;
import java.util.Map;

import com.bnt.common.ResponseWrapper;
import com.bnt.rest.dto.WorkFlowDto;
import com.bnt.rest.dto.WorkFlowServicesDto;
import com.bnt.rest.entity.WorkFlow;
import com.bnt.rest.wrapper.dto.IdAndNameWrapper;
import com.bnt.rest.wrapper.dto.workflow.WorkFlowUiWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface NewWorkflowService {

	public List<String> getServiceList();

	public List<IdAndNameWrapper> getServicesList();

	public ResponseWrapper getPagableUIList(Map<String, Object> requestParamMap);

	public boolean validateWorkFlowByName(String workFlowName);

	public WorkFlowDto getWorkFlowDtoById(Integer id);

	public WorkFlowUiWrapper getWorkFlowUiById(Integer id);

	public Integer createWorkFlow(WorkFlowUiWrapper workFlowUiWrapper, WorkFlow workFlow, String requestToken,
			String savetype);

	public Integer draftWorkFlow(WorkFlowUiWrapper workFlowUiWrapper, String requestToken);

	public Integer updateWorkFlow(WorkFlowUiWrapper workFlowUiWrapper, WorkFlow workFlow, String requestToken,
			String savetype);

	public Integer versionItWorkFlow(WorkFlowUiWrapper workFlowUiWrapper, String requestToken);

	public boolean deleteDraftedWorkFlowById(Integer id, String requestToken);

	public List<WorkFlowServicesDto> getWorkflowServiceList();

	List<WorkFlowDto> getWorkFlowNotInDeployedComponent();

	List<WorkFlowDto> findAllNotinDeployedComponentNew();

	List<IdAndNameWrapper> getNameAndWorkFlowId();

}
