package com.bnt.ruleengine.sample;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.google.common.collect.Lists;
import com.bnt.core.orchestation.rule.ConditionalDecisionRule;
import com.bnt.core.orchestation.rule.SpringElResponseCodeRule;
import com.bnt.core.orchestation.services.DecisionalServiceOperation;
import com.bnt.core.orchestation.services.ParallelServices;
import com.bnt.core.orchestation.services.ResponseCodeEvaluator;
import com.bnt.core.orchestation.services.Service;
import com.bnt.core.orchestation.services.ServicesOperation;
import com.bnt.common.util.JsonObjectUtil;
import com.bnt.rest.wrapper.dto.workflow.PrecedingDecisionUiWrapper;
import com.bnt.rest.wrapper.dto.workflow.WSGroupJsonWrapper;
import com.bnt.rest.wrapper.dto.workflow.WSResponseWrapper;
import com.bnt.rest.wrapper.dto.workflow.WorkFlowServicesUiWrapper;
import com.bnt.rest.wrapper.dto.workflow.WorkFlowUiWrapper;
import com.bnt.service.mapper.TagsMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class FinalJsonUtiity {

	private static final Logger logger = LogManager.getLogger(FinalJsonUtiity.class);
	private static final String SAFEXC = "safexc_";
	private static final String AREC = "are_";
	private static final String ARFC = "arc_";

	private FinalJsonUtiity() {
	}

	private static final String OPTION_1 = "setResponseOfService('";
	private static final String OPTION_2 = "setIpcConsiderFail('";
	private static final String OPTION_3 = "setIpcConsiderFail('";

	public static ResponseCodeEvaluator fetchWFResponseCodeEval(WorkFlowUiWrapper wrapper) {
		ResponseCodeEvaluator rce = null;
		WSResponseWrapper wsDto = wrapper.getResponseCode();
		if (wsDto != null && wsDto.getValue() != null) {
			String str = wsDto.getValue().replace("'", "");
			if (wsDto.getType().equalsIgnoreCase("option1")) {
				str = OPTION_1 + str + "')";
			} else if (wsDto.getType().equalsIgnoreCase("option2")) {
				str = OPTION_2 + str + "')";
			} else if (wsDto.getType().equalsIgnoreCase("option3")) {
				str = OPTION_3 + str + "')";
			}
			rce = new ResponseCodeEvaluator(new SpringElResponseCodeRule(str));
		}
		return rce;
	}

	/**
	 * Q1. how to replace group structure
	 * Q2. how to replace service condition
	 * Q3. how to handle group details
	 */
	public static ServicesOperation processServices(WorkFlowUiWrapper workFlowUiWrapper,
			Map<String, ConditionalDecisionRule> servicesConditions) {
		boolean isSingle = true;
		if (workFlowUiWrapper.getWorkFlowServices().size() > 1) {
			isSingle = false;
		}
		final int workflow_id = (workFlowUiWrapper.getId() != null) ? workFlowUiWrapper.getId() : 1;
		List<ServicesOperation> listService = new ArrayList<>();
		for (WorkFlowServicesUiWrapper workFlowServicesUiWrapper : workFlowUiWrapper.getWorkFlowServices()) {
			ServicesOperation servicesOperation = null;
			if (workFlowServicesUiWrapper.getServiceType().equalsIgnoreCase("GROUP")) {
				servicesOperation = getGroupServices(workFlowUiWrapper.getServiceGroupJson(),
						workFlowServicesUiWrapper.getGroupName(), workflow_id, servicesConditions);
			} else {
				servicesOperation = new Service(workFlowServicesUiWrapper.getServiceName());
				processDecision(workFlowServicesUiWrapper, servicesOperation, workflow_id, servicesConditions,
						workFlowUiWrapper.getServiceGroupJson());
				processChild(workFlowServicesUiWrapper, servicesOperation, workFlowUiWrapper.getServiceGroupJson(),
						workflow_id, servicesConditions);
			}

			if (isSingle) {
				return servicesOperation;
			} else {
				listService.add(servicesOperation);
			}
		}
		if (listService.size() > 1) {
			return new ParallelServices(listService);
		}
		return null;
	}

	private static void processChild(WorkFlowServicesUiWrapper parentWorkFlowServicesUiWrapper,
			ServicesOperation serviceOp, List<WSGroupJsonWrapper> listGroup, int workflowId,
			Map<String, ConditionalDecisionRule> servicesConditions) {
		List<ServicesOperation> listService = new ArrayList<>();
		if (parentWorkFlowServicesUiWrapper != null && parentWorkFlowServicesUiWrapper.getServices() != null) {
			for (WorkFlowServicesUiWrapper childWorkFlowServicesUiWrapper : parentWorkFlowServicesUiWrapper
					.getServices()) {
				ServicesOperation servicesOperation = null;
				if (childWorkFlowServicesUiWrapper.getServiceType() != null
						&& childWorkFlowServicesUiWrapper.getServiceType().equalsIgnoreCase("GROUP")) {
					servicesOperation = getGroupServices(listGroup, childWorkFlowServicesUiWrapper.getGroupName(),
							workflowId, servicesConditions);
				} else {
					servicesOperation = new Service(childWorkFlowServicesUiWrapper.getServiceName());
					processDecision(childWorkFlowServicesUiWrapper, servicesOperation, workflowId, servicesConditions,
							listGroup);
					processChild(childWorkFlowServicesUiWrapper, servicesOperation, listGroup, workflowId,
							servicesConditions);
				}
				listService.add(servicesOperation);
			}
		}

		if (!listService.isEmpty()) {
			List<ServicesOperation> oldDependents = serviceOp.getDependents();
			if (oldDependents != null) {
				oldDependents.addAll(listService);
			} else {
				oldDependents = listService;
			}
			serviceOp.setDependents(oldDependents);
		}
	}

	private static void processDecision(WorkFlowServicesUiWrapper ws, ServicesOperation s0, int workflowId,
			Map<String, ConditionalDecisionRule> servicesConditions, List<WSGroupJsonWrapper> listGroup) {
		if (ws.getPrecedingDecisionUi() != null) {
			PrecedingDecisionUiWrapper pdw = ws.getPrecedingDecisionUi();
			setDecisionDependents(ws, s0, workflowId, pdw, listGroup, servicesConditions);
			if (ws.getPostDecision() != null) {
				ConditionalDecisionRule conditionalRule;
				try {
					conditionalRule = new com.fasterxml.jackson.databind.ObjectMapper().readValue(ws.getPostDecision(),
							ConditionalDecisionRule.class);
					servicesConditions.put(
							"dec_" + workflowId + "_" + (ws.getGroupName() != null ? ws.getGroupName() : ws.getId()),
							conditionalRule);

				} catch (IOException e) {
					logger.error(e);
				}
			} else {
				servicesConditions.put(
						"dec_" + workflowId + "_" + (ws.getGroupName() != null ? ws.getGroupName() : ws.getId()),
						JsonObjectUtil.getGenericObjectFromJsonString(
								TagsMapper.getConditionalDecisionRuleFromConditionString(ws.getPostDecisionRuleJson()),
								ConditionalDecisionRule.class));
			}
		}
		if (ws.getSafingConditionJsonUi() != null) {
			if (ws.getSafingCondition() != null) {
				ConditionalDecisionRule conditionalRule;
				try {
					conditionalRule = new com.fasterxml.jackson.databind.ObjectMapper()
							.readValue(ws.getSafingCondition(), ConditionalDecisionRule.class);
					servicesConditions.put(
							"saf_" + workflowId + "_" + (ws.getGroupName() != null ? ws.getGroupName() : ws.getId()),
							conditionalRule);
					((Service) s0).setSafingCondition(
							"saf_" + workflowId + "_" + (ws.getGroupName() != null ? ws.getGroupName() : ws.getId()));
				} catch (IOException e) {
					logger.error(e);
				}

			} else {
				servicesConditions.put(
						"saf_" + workflowId + "_" + (ws.getGroupName() != null ? ws.getGroupName() : ws.getId()),
						JsonObjectUtil.getGenericObjectFromJsonString(
								TagsMapper.getConditionalDecisionRuleFromConditionString(ws.getSafingConditionJson()),
								ConditionalDecisionRule.class));
				((Service) s0).setSafingCondition(
						"saf_" + workflowId + "_" + (ws.getGroupName() != null ? ws.getGroupName() : ws.getId()));
			}
		}
		if (ws.getSafingExceptionConditionJsonUi() != null) {
			if (ws.getSafingExceptionCondition() != null) {
				ConditionalDecisionRule conditionalRule;
				try {
					conditionalRule = new com.fasterxml.jackson.databind.ObjectMapper()
							.readValue(ws.getSafingExceptionCondition(), ConditionalDecisionRule.class);
					servicesConditions.put(
							SAFEXC + workflowId + "_" + (ws.getGroupName() != null ? ws.getGroupName() : ws.getId()),
							conditionalRule);
					((Service) s0).setSafingExceptionCondition(
							SAFEXC + workflowId + "_" + (ws.getGroupName() != null ? ws.getGroupName() : ws.getId()));
				} catch (IOException e) {
					logger.error(e);
				}
			} else {
				servicesConditions.put(
						SAFEXC + workflowId + "_" + (ws.getGroupName() != null ? ws.getGroupName() : ws.getId()),
						JsonObjectUtil.getGenericObjectFromJsonString(
								TagsMapper.getConditionalDecisionRuleFromConditionString(ws.getSafingConditionJson()),
								ConditionalDecisionRule.class));
				((Service) s0).setSafingExceptionCondition(
						SAFEXC + workflowId + "_" + (ws.getGroupName() != null ? ws.getGroupName() : ws.getId()));
			}
		}
		if (ws.getAutoReversalEligibilityCondition() != null) {
			ConditionalDecisionRule conditionalRule;
			try {
				conditionalRule = new ConditionalDecisionRule(ws.getAutoReversalEligibilityCondition());
				servicesConditions.put(
						AREC + workflowId + "_" + (ws.getGroupName() != null ? ws.getGroupName() : ws.getId()),
						conditionalRule);
				((Service) s0).setAutoReversalEligibilityCondition(
						AREC + workflowId + "_" + (ws.getGroupName() != null ? ws.getGroupName() : ws.getId()));
			} catch (Exception e) {
				logger.error(e);
			}
		}
		if (ws.getAutoReversalFinalCondition() != null) {
			ConditionalDecisionRule conditionalRule;
			try {
				conditionalRule = new ConditionalDecisionRule(ws.getAutoReversalFinalCondition());
				servicesConditions.put(
						ARFC + workflowId + "_" + (ws.getGroupName() != null ? ws.getGroupName() : ws.getId()),
						conditionalRule);
				((Service) s0).setAutoReversalFinalCondition(
						ARFC + workflowId + "_" + (ws.getGroupName() != null ? ws.getGroupName() : ws.getId()));
			} catch (Exception e) {
				logger.error(e);
			}
		}
	}

	/**
	 * check if service is END check if service is group or not if group then create
	 * group structure If normal service then
	 */
	private static void setDecisionDependents(WorkFlowServicesUiWrapper ws, ServicesOperation servicesOperation,
			int workflowId, PrecedingDecisionUiWrapper decisionWrapper, List<WSGroupJsonWrapper> listGroup,
			Map<String, ConditionalDecisionRule> servicesConditionsMap) {
		Map<String, ServicesOperation> mapServices = fecthDecisionMap(decisionWrapper, listGroup, workflowId,
				servicesConditionsMap);
		servicesOperation.setDependents(Lists.newArrayList(new DecisionalServiceOperation(
				"dec_" + workflowId + "_" + (ws.getGroupName() != null ? ws.getGroupName() : ws.getId()),
				mapServices.get("T"), mapServices.get("F"))));
	}

	private static Map<String, ServicesOperation> fecthDecisionMap(PrecedingDecisionUiWrapper decisionWrapper,
			List<WSGroupJsonWrapper> listGroup, int workflowId,
			Map<String, ConditionalDecisionRule> servicesConditionsMap) {
		Map<String, ServicesOperation> mapServices = new HashMap<>();
		// True check

		validationServices(listGroup, mapServices, decisionWrapper, 0, workflowId, servicesConditionsMap);
		validationServices(listGroup, mapServices, decisionWrapper, 1, workflowId, servicesConditionsMap);

		return mapServices;
	}

	private static void validationServices(List<WSGroupJsonWrapper> listGroup,
			Map<String, ServicesOperation> mapServices, PrecedingDecisionUiWrapper decisionWrapper, int tFlag,
			int workflowId, Map<String, ConditionalDecisionRule> servicesConditionsMap) {
		String serviceName = (tFlag == 1) ? decisionWrapper.getOntrue() : decisionWrapper.getOnfalse();
		if (serviceName.equalsIgnoreCase("END")) {
			if (tFlag == 1) {
				mapServices.put("T", null);
			} else if (tFlag == 0) {
				mapServices.put("F", null);
			}

		} else {
			if (goupFlagCheck(serviceName, listGroup)) {
				if (tFlag == 1) {
					mapServices.put("T", getGroupServices(listGroup, serviceName, workflowId, servicesConditionsMap));
				} else if (tFlag == 0) {
					mapServices.put("F", getGroupServices(listGroup, serviceName, workflowId, servicesConditionsMap));
				}
			} else {
				if (tFlag == 1) {
					mapServices.put("T", new Service(decisionWrapper.getOntrue()));
				} else if (tFlag == 0) {
					mapServices.put("F", new Service(decisionWrapper.getOnfalse()));
				}
			}
		}
	}

	private static boolean goupFlagCheck(String serviceName, List<WSGroupJsonWrapper> listGroup) {
		for (WSGroupJsonWrapper group : listGroup) {
			if (group.getName().equalsIgnoreCase(serviceName))
				return true;
		}
		return false;
	}

	private static ServicesOperation getGroupServices(List<WSGroupJsonWrapper> serviceGroupJson, String groupName,
			int workflowId, Map<String, ConditionalDecisionRule> servicesConditions) {
		WSGroupJsonWrapper groupWrapper = fetchGroupWraper(serviceGroupJson, groupName);
		return processGroupServices(groupWrapper, serviceGroupJson, workflowId, servicesConditions);
	}

	private static WSGroupJsonWrapper fetchGroupWraper(List<WSGroupJsonWrapper> serviceGroupList, String groupName) {
		for (WSGroupJsonWrapper wrapper : serviceGroupList) {
			if (wrapper.getName().equalsIgnoreCase(groupName)) {
				return wrapper;
			}
		}
		return null;
	}

	private static ServicesOperation processGroupServices(WSGroupJsonWrapper groupWrapper,
			List<WSGroupJsonWrapper> serviceGroupJson, int workflowId,
			Map<String, ConditionalDecisionRule> servicesConditions) {
		if (groupWrapper == null)
			return null;
		boolean isSingle = true;
		if (groupWrapper.getWorkFlowServices().size() > 1) {
			isSingle = false;
		}
		List<ServicesOperation> listService = new ArrayList<>();
		for (WorkFlowServicesUiWrapper ws : groupWrapper.getWorkFlowServices()) {
			Service s0 = new Service(ws.getServiceName());
			processDecision(ws, s0, workflowId, servicesConditions, serviceGroupJson);
			processChild(ws, s0, serviceGroupJson, workflowId, servicesConditions);
			if (isSingle) {
				return s0;
			} else {
				listService.add(s0);
			}
		}
		if (listService.size() > 1) {
			return new ParallelServices(listService);
		}
		return null;
	}
}
