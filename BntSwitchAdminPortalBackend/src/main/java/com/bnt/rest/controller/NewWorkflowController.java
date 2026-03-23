package com.bnt.rest.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bnt.common.HttpCommons;
import com.bnt.common.ResponseEntityData;
import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.HTMLInjectionUtil;
import com.bnt.common.util.RippsUtility;
import com.bnt.constant.RippsRestConstant;
import com.bnt.rest.service.NewWorkflowService;
import com.bnt.rest.wrapper.dto.IdAndNameWrapper;
import com.bnt.rest.wrapper.dto.workflow.WorkFlowUiWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/workflow")
@CrossOrigin(origins = "${crossOriginUrl}")
public class NewWorkflowController {

	private static final String FIND_FILTER_WORKFLOW_GROUP = "Find Filter Workflow Group";

	private static Log log = LogFactory.getLog(NewWorkflowController.class.getName());

	@Autowired
	private HttpServletRequest request;

	@Autowired
	private NewWorkflowService newWorkflowService;

	private static final String WORKFLOW_CREATE_FAILURE_MESSAGE = "Workflow creation failed";

	@GetMapping(value = "service-list")
	public ResponseEntity<Map<String, Object>> getServiceList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		log.info(FIND_FILTER_WORKFLOW_GROUP);
		Map<String, Object> map = new HashMap<>();
		List<String> serviceList = newWorkflowService.getServiceList();
		map.put("servicelist", serviceList);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find Service-List");
		responseEntityData.setData(map);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "getworkflowlist")
	public ResponseEntity<Map<String, Object>> getWorkFlowList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		log.info(FIND_FILTER_WORKFLOW_GROUP);
		Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
		ResponseWrapper pageJPAData = newWorkflowService.getPagableUIList(requestParamMap);
		Map<String, Object> map = RippsUtility.setPageJPAData(pageJPAData);
		map.put("workflowlist", pageJPAData.getContent());
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find WorkFlow List");
		responseEntityData.setData(map);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "getworkflow/{id}")
	public ResponseEntity<Map<String, Object>> getWorkFlowById(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("id") int id) {
		log.info(FIND_FILTER_WORKFLOW_GROUP);
		Map<String, Object> map = new HashMap<>();
		WorkFlowUiWrapper workFlowUiWrapper = newWorkflowService.getWorkFlowUiById(id);
		map.put("workflow", workFlowUiWrapper);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find workflow");
		responseEntityData.setData(map);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "services-list")
	public ResponseEntity<Map<String, Object>> findServicesList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		try {
			List<IdAndNameWrapper> serviceList = newWorkflowService.getServicesList();
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find Services");
			responseEntityData.setData(serviceList);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Find all workflow_groups", null),
					HttpStatus.FORBIDDEN);
		}
	}

	@PostMapping(value = "create-workflow")
	public ResponseEntity<Map<String, Object>> createWorkflow(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@RequestBody WorkFlowUiWrapper workFlowUiWrapper) {
		log.info("inside createWorkflow");
		String requestToken = RippsUtility.getToken(request);
		try {
			Integer workflowId = newWorkflowService.draftWorkFlow(workFlowUiWrapper, requestToken);
			Map<String, Integer> map = new HashMap<>();
			map.put("id", workflowId);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Workflow Drafted");
			responseEntityData.setData(map);
			if (workflowId > 0) {
				return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.CREATED);
			} else {
				return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE,
						WORKFLOW_CREATE_FAILURE_MESSAGE, null), HttpStatus.ALREADY_REPORTED);
			}
		} catch (RippsAdminException ripException) {
			log.error(ripException);
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, ripException.getMessage(), null),
					HttpStatus.CREATED);
		} catch (Exception e) {
			log.error(e);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.SUCCESS,
					WORKFLOW_CREATE_FAILURE_MESSAGE, null), HttpStatus.CREATED);
		}
	}

	@PostMapping(value = "create-workflow/version-it")
	public ResponseEntity<Map<String, Object>> versionItWorkFlow(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@RequestBody WorkFlowUiWrapper workFlowUiWrapper) {

		log.info("inside versionItWorkFlow");
		String requestToken = RippsUtility.getToken(request);
		try {
			workFlowUiWrapper.setName(HTMLInjectionUtil.validateHTMLInjection(workFlowUiWrapper.getName()));
			Integer workflowId = newWorkflowService.versionItWorkFlow(workFlowUiWrapper, requestToken);
			Map<String, Integer> map = new HashMap<>();
			map.put("id", workflowId);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Workflow versioning successfully completed");
			responseEntityData.setData(map);
			if (workflowId > 0) {
				return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.CREATED);
			} else {
				return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE,
						WORKFLOW_CREATE_FAILURE_MESSAGE, null), HttpStatus.ALREADY_REPORTED);
			}
		} catch (RippsAdminException ripException) {
			log.error(ripException);
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, ripException.getMessage(), null),
					HttpStatus.CREATED);
		} catch (Exception e) {
			log.error(e);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.SUCCESS,
					WORKFLOW_CREATE_FAILURE_MESSAGE, null), HttpStatus.CREATED);
		}
	}

	@DeleteMapping(value = "delete/{id}")
	public ResponseEntity<Map<String, Object>> deleteWorkFlowDraftedById(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("id") int id) {
		log.info("inside deleteWorkFlowDraftedById ID:" + id);
		String requestToken = RippsUtility.getToken(request);
		try {
			boolean flag = newWorkflowService.deleteDraftedWorkFlowById(id, requestToken);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.SUCCESS,
					"WorkFlow with version '0' is deleted successfully", null), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "WorkFlow not Deleted", ""),
					HttpStatus.OK);
		}
	}

	@GetMapping(value = "/validate-workflow-name/{name}")
	public ResponseEntity<Map<String, Object>> validateWorkFlowName(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("name") String name) {
		log.info("inside validateWorkFlowName:" + name);
		try {
			boolean existWorkFlow = newWorkflowService.validateWorkFlowByName(name);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			if (existWorkFlow) {
				responseEntityData.setMessage("WorkFlow name is valid");
			} else {
				responseEntityData.setMessage("WorkFlow name already exist");
			}
			responseEntityData.setData(existWorkFlow);
			log.info("completed");
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException ripException) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, ripException.getMessage(), false),
					HttpStatus.CREATED);
		} catch (Exception e) {
			log.error(e);
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "WorkFlow Name is invalid", false),
					HttpStatus.OK);
		}
	}
}
