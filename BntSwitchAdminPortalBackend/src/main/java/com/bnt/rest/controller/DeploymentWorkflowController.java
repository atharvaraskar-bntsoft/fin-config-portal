package com.bnt.rest.controller;

import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bnt.common.HttpCommons;
import com.bnt.common.ResponseEntityData;
import com.bnt.common.ResponseWrapper;
import com.bnt.common.util.RippsUtility;
import com.bnt.constant.RippsRestConstant;
import com.bnt.rest.service.DeploymentWorkflowService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/deployment-workflow")
@CrossOrigin(origins = "${crossOriginUrl}")
public class DeploymentWorkflowController {

	private static final Logger logger = LogManager.getLogger(DeploymentWorkflowController.class);

	@Autowired
	private DeploymentWorkflowService deploymentWorkflowService;

	@Autowired
	private HttpServletRequest request;

	@GetMapping
	public ResponseEntity<Map<String, Object>> listDeploymentWorkflow(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("get deployment workflow");
		Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
		ResponseWrapper pageJPAData = deploymentWorkflowService.getDeploymentWorkflow(requestParamMap);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("get deployment workflow");
		Map<String, Object> data = RippsUtility.setPageJPAData(pageJPAData);
		data.put("diploymentWorkkflowlist", pageJPAData.getContent());
		responseEntityData.setData(data);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<Map<String, Object>> getDeploymentWorkflowById(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("id") int id) {
		logger.info("Find DeploymentWorkflow By Id: {}", id);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setData(deploymentWorkflowService.findSwitchClusterById(id));
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

}
