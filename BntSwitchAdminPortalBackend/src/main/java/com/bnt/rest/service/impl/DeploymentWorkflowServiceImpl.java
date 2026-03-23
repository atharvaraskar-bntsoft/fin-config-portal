package com.bnt.rest.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.google.common.collect.Maps;
import com.bnt.core.orchestation.Orchestration;
import com.bnt.core.orchestation.WorkFlows;
import com.bnt.core.orchestation.rule.ConditionalDecisionRule;
import com.bnt.core.orchestation.rule.DecisionalRoutingRule;
import com.bnt.core.orchestation.rule.DecisionalWorkFlowRule;
import com.bnt.core.orchestation.services.ResponseCodeEvaluator;
import com.bnt.core.orchestation.services.ServicesOperation;
import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.GsonUtil;
import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.JsonObjectUtil;
import com.bnt.common.util.exception.ExceptionLog;
import com.bnt.constant.ParameterConstant;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.DeploymentDto;
import com.bnt.rest.dto.DeploymentWorkflowDto;
import com.bnt.rest.dto.IdNameVersionTypeWrapper;
import com.bnt.rest.entity.ConfiguredRoutes;
import com.bnt.rest.entity.Deployment;
import com.bnt.rest.entity.DeploymentWorkflow;
import com.bnt.rest.entity.RoutingVersion;
import com.bnt.rest.entity.RuleConfiguration;
import com.bnt.rest.jpa.repository.DeploymentWorkflowPersistenceHelper;
import com.bnt.rest.jpa.repository.HistoryPersistenceHelper;
import com.bnt.rest.jpa.repository.RoutingVersionHelper;
import com.bnt.rest.service.DeploymentComponentService;
import com.bnt.rest.service.DeploymentWorkflowService;
import com.bnt.rest.service.NewWorkflowService;
import com.bnt.rest.wrapper.dto.workflow.WorkFlowUiWrapper;
import com.bnt.ruleengine.ParentDto;
import com.bnt.ruleengine.sample.FinalJsonUtiity;
import com.bnt.service.mapper.DeploymentMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class DeploymentWorkflowServiceImpl implements DeploymentWorkflowService {

	private static Log log = LogFactory.getLog(DeploymentWorkflowServiceImpl.class.getName());

	@Autowired
	private DeploymentWorkflowPersistenceHelper deploymentWorkflowPersistenceHelper;

	@Autowired
	private HistoryPersistenceHelper historyPersistenceHelper;

	@Autowired
	private DeploymentComponentService deploymentComponentService;

	@Autowired
	private RoutingVersionHelper routingVersionHelper;

	@Autowired
	private NewWorkflowService newWorkflowService;

	@Override
	public ResponseWrapper getDeploymentWorkflow(Map<String, Object> requestParamMap) {
		String sortColumn = (String) requestParamMap.get(ParameterConstant.SORT_COLUMN);
		if (sortColumn != null && sortColumn.equalsIgnoreCase("status")) {
			requestParamMap.put(ParameterConstant.SORT_COLUMN, "locked");
		}
		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		Page<DeploymentWorkflow> pageDeploymentWorkflow = null;
		ResponseWrapper pageJPAData;
		try {
			pageDeploymentWorkflow = deploymentWorkflowPersistenceHelper.findAll(pageable);
			List<DeploymentWorkflowDto> list = new ArrayList<>();
			for (DeploymentWorkflow deploymentWorkflow : pageDeploymentWorkflow.getContent()) {
				DeploymentWorkflowDto dto = new DeploymentWorkflowDto();
				dto.setId(deploymentWorkflow.getId());
				dto.setDeploymentId(deploymentWorkflow.getDeploymentId());
				Optional<Deployment> optional = historyPersistenceHelper.findById(deploymentWorkflow.getDeploymentId());

				if (optional.isPresent()) {
					Deployment deployment = optional.get();
					DeploymentDto deploymentDto = new DeploymentDto();
					deploymentDto.setId(deployment.getId());
					deploymentDto.setName(deployment.getName());
					dto.setDeploymentDto(deploymentDto);
					list.add(dto);
				}

			}
			long count = deploymentWorkflowPersistenceHelper.count();
			pageJPAData = JPAUtils.getResponseWrapperByPage(pageDeploymentWorkflow, count);
			pageJPAData.setContent(list);
			return pageJPAData;
		} catch (Exception e) {
			log.error(e);
		}
		return null;
	}

	@Override
	public DeploymentWorkflow findSwitchClusterById(int id) {
		Optional<DeploymentWorkflow> optional = deploymentWorkflowPersistenceHelper.findById(id);

		if (optional.isPresent()) {
			return optional.get();
		}
		return null;
	}

	@Override
	public void addDeploymentWorkflow(DeploymentWorkflowDto deploymentWorkflowDto) {
		DeploymentWorkflow entity = ObjectMapper.mapToEntity(deploymentWorkflowDto, DeploymentWorkflow.class);
		entity.setCorePropertyDetailId(deploymentWorkflowDto.getCorePropertyDetailId());
		try {
			deploymentWorkflowPersistenceHelper.save(entity);
		} catch (Exception e) {
			log.error(e);
		}
	}

	@Override
	public Set<IdNameVersionTypeWrapper> getComponentListForDeploymentWorkFlowJSON() {
		return deploymentComponentService.getComponentListForDeploymentWorkFlowJSON();
	}

	@Transactional
	@Override
	public int saveUpdateJson(DeploymentDto dto, Integer deploymentId) {
		WorkFlows workflowObject = fetchWorkflowUnit();
		/** if (workflowObject != null) { */
		DeploymentWorkflowDto deploymentWorkflowDto = new DeploymentWorkflowDto();
		String workflowJson = null;
		try {
			workflowJson = new com.fasterxml.jackson.databind.ObjectMapper().writeValueAsString(workflowObject);
		} catch (JsonProcessingException e) {
			log.error(e);
		}
		deploymentWorkflowDto.setDeploymentId(deploymentId);
		deploymentWorkflowDto.setCorePropertyDetailId(dto.getCorePropertyDetailId());
		deploymentWorkflowDto.setWorkflowJson(workflowJson);

		deploymentWorkflowDto
				.setComponentDetailsJson(JsonObjectUtil.getJsonStringFromObject(dto.getScheduledAndDeployedInfo()));

		addDeploymentWorkflow(deploymentWorkflowDto);
		return 1;
		/**
		 * } return 0;
		 */
	}

	private WorkFlows fetchWorkflowUnit() {
		Map<String, DecisionalWorkFlowRule> workFlowRuleMap = Maps.newHashMap();
		List<String> workFlowRouter = new ArrayList<>();
		Map<String, DecisionalRoutingRule> destinationRuleMap = Maps.newHashMap();
		Map<String, List<String>> destinationRouters = Maps.newHashMap();
		Map<String, ConditionalDecisionRule> servicesConditionsMap = Maps.newHashMap();
		Map<String, Orchestration> workflowOrchestrations = Maps.newHashMap();
		String defaultWorkflow = "1";
		Set<IdNameVersionTypeWrapper> newWorkflowList = getComponentListForDeploymentWorkFlowJSON();
		for (IdNameVersionTypeWrapper component : newWorkflowList) {
			log.info("HERE TEST:: " + component.getId() + ":" + component.getName() + ":" + component.getVersion());
			switch (component.getType()) {
			case DeploymentMapper.ROUTER:
				setRouterJSON(component, workFlowRuleMap, destinationRuleMap, workFlowRouter, destinationRouters);
				break;
			case DeploymentMapper.WF:
				setWorkflowJSON(component, servicesConditionsMap, workflowOrchestrations);
				break;
			default:
				// Do Nothing
			}
		}
		try {
			return new WorkFlows(workFlowRuleMap, destinationRuleMap, servicesConditionsMap, workFlowRouter,
					destinationRouters, workflowOrchestrations, defaultWorkflow);
		} catch (Exception e) {
			log.error(ExceptionLog.printStackTraceToString(e));
			throw new RippsAdminException(e.getMessage());
		}
	}

	private void setWorkflowJSON(IdNameVersionTypeWrapper component,
			Map<String, ConditionalDecisionRule> servicesConditionsMap,
			Map<String, Orchestration> workflowOrchestrations) {
		WorkFlowUiWrapper workFlowUiWrapper = newWorkflowService.getWorkFlowUiById(component.getId());
		ServicesOperation workflowService = FinalJsonUtiity.processServices(workFlowUiWrapper, servicesConditionsMap);
		ResponseCodeEvaluator responseCodeEvaluator = FinalJsonUtiity.fetchWFResponseCodeEval(workFlowUiWrapper);
		Orchestration orchestrationWorkflow = new Orchestration(workflowService, responseCodeEvaluator);
		workflowOrchestrations.put(workFlowUiWrapper.getWorkflowId().toString(), orchestrationWorkflow);
	}

	private void setRouterJSON(IdNameVersionTypeWrapper component, Map<String, DecisionalWorkFlowRule> workFlowRuleMap,
			Map<String, DecisionalRoutingRule> destinationRuleMap, List<String> workFlowRouter,
			Map<String, List<String>> destinationRouters) {

		Optional<RoutingVersion> optional = routingVersionHelper.findById(component.getId());

		if (optional.isPresent()) {
			RoutingVersion routingVersion = optional.get();

			for (ConfiguredRoutes configuredRoutes : routingVersion.getConfiguredRoutes()) {
				try {
					RuleConfiguration configuration = configuredRoutes.getRuleConfiguration();
					ParentDto parentDto = GsonUtil.getObjectFromString(configuration.getJson(), ParentDto.class);
					ConditionalDecisionRule conditionalRule = new com.fasterxml.jackson.databind.ObjectMapper()
							.readValue(configuration.getRuleJson(), ConditionalDecisionRule.class);
					if (routingVersion.getRouting().getRuletype().equalsIgnoreCase("route")) {
						DecisionalRoutingRule routingRule = new DecisionalRoutingRule(conditionalRule,
								parentDto.getDestinations().stream().map(dest -> dest.getId().toString()).toList()
										.toArray(String[]::new));
						destinationRuleMap.put(parentDto.getName(), routingRule);
						String service = routingVersion.getRouting().getRoutetypevalue();
						if (destinationRouters.containsKey(service)) {
							destinationRouters.get(service).add(parentDto.getName());
						} else {
							List<String> listRule = new ArrayList<>();
							listRule.add(parentDto.getName());
							destinationRouters.put(service, listRule);
						}
					} else if (routingVersion.getRouting().getRuletype().equalsIgnoreCase("workflow")) {
						DecisionalWorkFlowRule workflowRule = new DecisionalWorkFlowRule(conditionalRule,
								parentDto.getDestinations().get(0).getId().toString());
						workFlowRuleMap.put(parentDto.getName(), workflowRule);
						workFlowRouter.add(parentDto.getName());
					}
				} catch (Exception exception) {
					log.error("Error in deployment: parsing of component ID- " + component.getId());
				}
			}
		}

	}

}
