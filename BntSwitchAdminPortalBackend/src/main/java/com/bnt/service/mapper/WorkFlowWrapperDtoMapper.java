package com.bnt.service.mapper;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.reflect.TypeToken;
import com.bnt.core.orchestation.rule.ConditionalDecisionRule;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.GsonUtil;
import com.bnt.common.util.HTMLInjectionUtil;
import com.bnt.common.util.JsonObjectUtil;
import com.bnt.common.util.ReflectionUtil;
import com.bnt.common.util.exception.ExceptionLog;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.WorkFlowDto;
import com.bnt.rest.dto.WorkFlowServicesDto;
import com.bnt.rest.entity.WorkFlow;
import com.bnt.rest.entity.WorkFlowServices;
import com.bnt.rest.wrapper.dto.workflow.PrecedingDecisionUiWrapper;
import com.bnt.rest.wrapper.dto.workflow.ReverseConditionWrapper;
import com.bnt.rest.wrapper.dto.workflow.WSGroupJsonWrapper;
import com.bnt.rest.wrapper.dto.workflow.WSResponseWrapper;
import com.bnt.rest.wrapper.dto.workflow.WorkFlowServicesUiWrapper;
import com.bnt.rest.wrapper.dto.workflow.WorkFlowUiWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class WorkFlowWrapperDtoMapper {

	private static Log logger = LogFactory.getLog(WorkFlowWrapperDtoMapper.class.getName());

	private WorkFlowWrapperDtoMapper() {

	}

	public static final String ROOT_ID = "0";

	public static WorkFlowUiWrapper convertWorkFlowDtoToWrapper(WorkFlowDto workFlowDto) {
		logger.info("inside convertWorkFlowDtoToWrapper");
		WorkFlowWrapperDtoMapper.convertDtoStructureToTree(workFlowDto);
		logger.info("Converted to Tree Structure");
		WorkFlowUiWrapper workFlowUiWrapper = new WorkFlowUiWrapper();
		try {
			ReflectionUtil.copy(workFlowUiWrapper, workFlowDto);
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
		List<WSGroupJsonWrapper> objectList = getserviceGroupJsonUiFromDto(workFlowDto.getServiceGroupJson());
		workFlowUiWrapper.setServiceGroupJson(objectList);

		WSResponseWrapper responseCode = getResponseCodeUiFromDto(workFlowDto.getResponseCode());
		workFlowUiWrapper.setResponseCode(responseCode);

		ReverseConditionWrapper reverseCondition = getReverseConditionWrapperFromDto(workFlowDto.getReverseCondition());
		workFlowUiWrapper.setReverseCondition(reverseCondition);

		List<WorkFlowServicesUiWrapper> services = workFlowServicesWrapper(workFlowDto.getWorkFlowServices());
		workFlowUiWrapper.setWorkFlowServices(services);
		return workFlowUiWrapper;
	}

	public static WorkFlowDto convertWrapperToWorkFlowDto(WorkFlowUiWrapper workFlowUiWrapper) {
		logger.info("inside convertWrapperToWorkFlowDto");
		WorkFlowDto workFlowDto = new WorkFlowDto();
		try {
			validateWorkFlowUiWrapperForHTMLInjection(workFlowUiWrapper);
			workFlowDto.setCreatedBy(null);
			workFlowDto.setCreatedOn(null);
			workFlowDto.setDeleted(null);
			workFlowDto.setId(null);
			workFlowDto.setName(workFlowUiWrapper.getName());
//			workFlowDto.setResponseCode(ROOT_ID);
//			workFlowDto.setReverseCondition(ROOT_ID);
//			workFlowDto.setServiceGroupJson(ROOT_ID);
			workFlowDto.setStatus(workFlowUiWrapper.getStatus());
			workFlowDto.setUpdatedBy(null);
			workFlowDto.setUpdatedOn(null);
			workFlowDto.setVersion(workFlowUiWrapper.getVersion());
			workFlowDto.setWorkflowId(workFlowUiWrapper.getWorkflowId());
			List<WorkFlowServicesUiWrapper> workFlowServicesUiWrapperList = workFlowUiWrapper.getWorkFlowServices();

			List<WorkFlowServicesDto> workFlowServices = new ArrayList<>();
			for (WorkFlowServicesUiWrapper workFlowServicesUiWrapper : workFlowServicesUiWrapperList) {
				WorkFlowServicesDto workFlowServicesDto = new WorkFlowServicesDto();

				workFlowServicesDto.setAutoReversalEligibilityCondition(
						workFlowServicesUiWrapper.getAutoReversalEligibilityCondition());
				workFlowServicesDto
						.setAutoReversalFinalCondition(workFlowServicesUiWrapper.getAutoReversalFinalCondition());
				workFlowServicesDto.setCreatedBy(null);
				workFlowServicesDto.setCreatedOn(null);
				workFlowServicesDto.setGroupName(workFlowServicesUiWrapper.getGroupName());
				workFlowServicesDto.setId(null);
				workFlowServicesDto.setOrdinal(workFlowServicesUiWrapper.getOrdinal());
				workFlowServicesDto.setParentWorkFlowServiceId(null);
				workFlowServicesDto.setPostDecision(workFlowServicesUiWrapper.getPostDecision());
				workFlowServicesDto.setPostDecisionRuleJson(workFlowServicesUiWrapper.getPostDecisionRuleJson());
				workFlowServicesDto.setPrecedingDecision(workFlowServicesUiWrapper.getPrecedingDecision());
				workFlowServicesDto.setSafingCondition(workFlowServicesUiWrapper.getSafingCondition());
				workFlowServicesDto.setSafingConditionJson(workFlowServicesUiWrapper.getSafingConditionJson());
				workFlowServicesDto
						.setSafingExceptionCondition(workFlowServicesUiWrapper.getSafingExceptionCondition());
				workFlowServicesDto
						.setSafingExceptionConditionJson(workFlowServicesUiWrapper.getSafingExceptionConditionJson());
				workFlowServicesDto.setServiceName(workFlowServicesUiWrapper.getServiceName());
				workFlowServicesDto.setServices(null);//
				workFlowServicesDto.setServiceType(workFlowServicesUiWrapper.getServiceType());
				workFlowServicesDto.setUpdatedBy(null);
				workFlowServicesDto.setUpdatedOn(null);
				workFlowServicesDto.setWorkFlow(null);//

				workFlowServices.add(workFlowServicesDto);
			}

			workFlowDto.setWorkFlowServices(workFlowServices);
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
		String serviceGroupJson = getDtoFromServiceGroupJsonUi(workFlowUiWrapper.getServiceGroupJson());
		workFlowDto.setServiceGroupJson(serviceGroupJson);
		String responseCode = getDtoFromResponseCodeUi(workFlowUiWrapper.getResponseCode());
		workFlowDto.setResponseCode(responseCode);
		String reverseCondition = getDtoFromReverseConditionWrapper(workFlowUiWrapper.getReverseCondition());
		workFlowDto.setReverseCondition(reverseCondition);
		return workFlowDto;
	}

	public static Map<String, List<WorkFlowServicesDto>> createParentChildRelationMap(
			List<WorkFlowServicesDto> listService) {
		logger.info("inside createParentChildRelationMap");
		Map<String, List<WorkFlowServicesDto>> mapIdServicesDtoList = new HashMap<>();
		List<WorkFlowServicesDto> childServiceDto = null;

		for (WorkFlowServicesDto workFlowServicesDto : listService) {
			childServiceDto = mapIdServicesDtoList.get(getParentId(workFlowServicesDto));
			if (childServiceDto == null) {
				childServiceDto = new ArrayList<>();
			}
			workFlowServicesDto.setWorkFlow(null);
			childServiceDto.add(workFlowServicesDto);
			mapIdServicesDtoList.put(getParentId(workFlowServicesDto), childServiceDto);
		}
		logger.info("mapIdServicesDtoList.size():" + mapIdServicesDtoList.size());
		return mapIdServicesDtoList;
	}

	private static String getParentId(WorkFlowServicesDto workFlowServicesDto) {
		String idParent = null;
		if (workFlowServicesDto.getParentWorkFlowServiceId() == null) {
			idParent = ROOT_ID;
		} else {
			idParent = workFlowServicesDto.getParentWorkFlowServiceId().getId().toString();
		}
		return idParent;
	}

	public static List<WorkFlowServicesDto> arrangeDtoTree(Map<String, List<WorkFlowServicesDto>> mapIdServicesDtoList,
			String parentId) {
		List<WorkFlowServicesDto> rootWorkFlowServicesDto = new ArrayList<>();
		List<WorkFlowServicesDto> childWorkFlowServicesDto = null;

		List<WorkFlowServicesDto> childServiceDto = mapIdServicesDtoList.get(parentId);
		if (childServiceDto != null) {
			for (WorkFlowServicesDto workFlowServicesDto : childServiceDto) {
				childWorkFlowServicesDto = arrangeDtoTree(mapIdServicesDtoList, "" + workFlowServicesDto.getId());
				workFlowServicesDto.setServices(childWorkFlowServicesDto);
				rootWorkFlowServicesDto.add(workFlowServicesDto);
			}
		}
		return rootWorkFlowServicesDto;
	}

	public static WorkFlowDto convertDtoStructureToTree(WorkFlowDto workFlowDto) {
		List<WorkFlowServicesDto> workFlowServicesDtoList = workFlowDto.getWorkFlowServices();
		if (workFlowServicesDtoList != null) {
			Map<String, List<WorkFlowServicesDto>> mapIdWorkFlowServicesDtoList = createParentChildRelationMap(
					workFlowServicesDtoList);
			List<WorkFlowServicesDto> service = arrangeDtoTree(mapIdWorkFlowServicesDtoList, ROOT_ID);
			workFlowDto.setWorkFlowServices(service);
		}
		return workFlowDto;
	}

	public static List<WorkFlowServices> setTreeToDtoWithParentWorkFlowServices(WorkFlow workFlow,
			WorkFlowServices workFlowServices) {
		List<WorkFlowServices> updateList = new ArrayList<>();
		List<WorkFlowServices> childList = null;
		List<WorkFlowServices> servicesList = null;
		workFlowServices.setWorkFlow(workFlow);
		workFlowServices.setId(null);
		updateList.add(workFlowServices);
		if (workFlowServices.getServices() != null && !workFlowServices.getServices().isEmpty()) {
			for (WorkFlowServices childworkFlowServices : workFlowServices.getServices()) {
				childworkFlowServices.setId(null);
				childworkFlowServices.setWorkFlow(workFlow);
				childworkFlowServices.setParentWorkFlowServiceId(workFlowServices);
				servicesList = childworkFlowServices.getServices();
				if (servicesList != null && !servicesList.isEmpty()) {
					childList = setTreeToDtoWithParentWorkFlowServices(workFlow, childworkFlowServices);
					updateList.addAll(childList);
				} else {
					updateList.add(childworkFlowServices);
				}
			}
		}
		return updateList;
	}

	public static void createWorkFlowServices(WorkFlow workFlow) {
		logger.info("Inside createWorkFlowServices");
		List<WorkFlowServices> workFlowServicesList = workFlow.getWorkFlowServices();
		List<WorkFlowServices> updatedWorkFlowServicesList = new ArrayList<>();
		List<WorkFlowServices> updateChildWorkFlowServiceList = null;
		if (workFlowServicesList != null && !workFlowServicesList.isEmpty()) {
			for (WorkFlowServices workFlowServices : workFlowServicesList) {
				workFlowServices.setWorkFlow(workFlow);
				updateChildWorkFlowServiceList = WorkFlowWrapperDtoMapper
						.setTreeToDtoWithParentWorkFlowServices(workFlow, workFlowServices);
				updatedWorkFlowServicesList.addAll(updateChildWorkFlowServiceList);
			}
		}
		logger.info("workflow Size=" + updatedWorkFlowServicesList.size());
		workFlow.setWorkFlowServices(updatedWorkFlowServicesList);
	}

	public static List<WSGroupJsonWrapper> getserviceGroupJsonUiFromDto(String serviceGroupJson) {
		List<WSGroupJsonWrapper> objectList = null;
		if (serviceGroupJson != null) {
			Type listType = new TypeToken<ArrayList<WSGroupJsonWrapper>>() {
			}.getType();
			objectList = new Gson().fromJson(serviceGroupJson, listType);
		} else {
			objectList = new ArrayList<>();
		}
		return objectList;
	}

	public static String getDtoFromServiceGroupJsonUi(List<WSGroupJsonWrapper> serviceGroupJsonUi) {
		String serviceGroupJson = null;
		if (serviceGroupJsonUi != null && !serviceGroupJsonUi.isEmpty()) {
			JsonElement jsonElement = GsonUtil.getJsonObjectFromType(serviceGroupJsonUi, true);
			serviceGroupJson = jsonElement.toString();
		}
		return serviceGroupJson;
	}

	public static WSResponseWrapper getResponseCodeUiFromDto(String responseCode) {
		WSResponseWrapper responseCodeUi = null;
		if (responseCode != null || "".equalsIgnoreCase(responseCode)) {
			responseCodeUi = JsonObjectUtil.getObjectFromString(responseCode, WSResponseWrapper.class);
		}
		return responseCodeUi;
	}

	public static String getDtoFromResponseCodeUi(WSResponseWrapper responseCode) {
		String responseCodeDto = null;
		if (responseCode != null) {
			JsonElement jsonElementCode = GsonUtil.getJsonObjectFromType(responseCode, true);
			responseCodeDto = jsonElementCode.toString();
		}
		return responseCodeDto;
	}

	public static ReverseConditionWrapper getReverseConditionWrapperFromDto(String reverseCondition) {
		ReverseConditionWrapper reverseConditionWrapper = null;
		if (reverseCondition != null || "".equalsIgnoreCase(reverseCondition)) {
			reverseConditionWrapper = GsonUtil.getObjectFromString(reverseCondition, ReverseConditionWrapper.class);
		}
		return reverseConditionWrapper;
	}

	public static String getDtoFromReverseConditionWrapper(ReverseConditionWrapper reverseConditionWrapper) {
		String reverseConditionDto = null;
		if (reverseConditionWrapper != null) {
			reverseConditionDto = JsonObjectUtil.deserializeObjectToString(reverseConditionWrapper);
		}
		return reverseConditionDto;
	}

	public static PrecedingDecisionUiWrapper getPrecedingDecisionUiWrapperFromDto(String precedingDecision) {
		PrecedingDecisionUiWrapper precedingDecisionUiWrapper = null;
		if (precedingDecision != null && !"".equalsIgnoreCase(precedingDecision)) {
			precedingDecisionUiWrapper = GsonUtil.getObjectFromString(precedingDecision,
					PrecedingDecisionUiWrapper.class);
		}
		return precedingDecisionUiWrapper;
	}

	public static String getDtoFromPrecedingDecisionUiWrapper(PrecedingDecisionUiWrapper precedingDecisionUiWrapper) {
		String precedingDecision = null;
		if (precedingDecisionUiWrapper != null) {

			JsonElement jsonElementCode = GsonUtil.getJsonObjectFromType(precedingDecisionUiWrapper, true);
			precedingDecision = jsonElementCode.toString();
		}
		return precedingDecision;
	}

	public static List<WorkFlowServicesUiWrapper> updateRuleJson(
			List<WorkFlowServicesUiWrapper> workFlowUiWrapperList) {
		logger.info("inside updateRuleJson");
		List<WorkFlowServicesUiWrapper> newWorkFlowUiWrapperList = null;
		if (workFlowUiWrapperList != null) {
			newWorkFlowUiWrapperList = new ArrayList<>();
			updateRuleJson1(workFlowUiWrapperList, newWorkFlowUiWrapperList);
		}
		logger.info("completed updateRuleJson");
		return newWorkFlowUiWrapperList;
	}

	private static void updateRuleJson1(List<WorkFlowServicesUiWrapper> workFlowUiWrapperList,
			List<WorkFlowServicesUiWrapper> newWorkFlowUiWrapperList) {
		for (WorkFlowServicesUiWrapper wfServiceWrapper : workFlowUiWrapperList) {
			try {
				ConditionalDecisionRule decisionRule = JsonObjectUtil.getGenericObjectFromJsonString(TagsMapper
						.getConditionalDecisionRuleFromConditionString(wfServiceWrapper.getPostDecisionRuleJson()),
						ConditionalDecisionRule.class);
				ConditionalDecisionRule saffingConditionRule = JsonObjectUtil.getGenericObjectFromJsonString(TagsMapper
						.getConditionalDecisionRuleFromConditionString(wfServiceWrapper.getSafingConditionJson()),
						ConditionalDecisionRule.class);
				ConditionalDecisionRule saffingExceptionConditionRule = JsonObjectUtil
						.getGenericObjectFromJsonString(
								TagsMapper.getConditionalDecisionRuleFromConditionString(
										wfServiceWrapper.getSafingExceptionConditionJson()),
								ConditionalDecisionRule.class);
				if (decisionRule != null) {
					String decisionRuleString = new com.fasterxml.jackson.databind.ObjectMapper()
							.writeValueAsString(decisionRule);
					wfServiceWrapper.setPostDecision(decisionRuleString);
				}
				if (saffingConditionRule != null) {
					String safingRuleString = new com.fasterxml.jackson.databind.ObjectMapper()
							.writeValueAsString(saffingConditionRule);
					wfServiceWrapper.setSafingCondition(safingRuleString);
				}
				if (saffingExceptionConditionRule != null) {
					String safingExceptionRuleString = new com.fasterxml.jackson.databind.ObjectMapper()
							.writeValueAsString(saffingExceptionConditionRule);
					wfServiceWrapper.setSafingExceptionCondition(safingExceptionRuleString);
				}
				List<WorkFlowServicesUiWrapper> newChildWorkFlowUiWrapperList = updateRuleJson(
						wfServiceWrapper.getServices());
				wfServiceWrapper.setServices(newChildWorkFlowUiWrapperList);
				newWorkFlowUiWrapperList.add(wfServiceWrapper);
			} catch (IOException e) {
				logger.error(ExceptionLog.printStackTraceToString(e));
				throw new RippsAdminException(e.getMessage());
			} catch (RippsAdminException e) {
				throw new RippsAdminException("Issue in update-Rule-Json ");
			}
		}
	}

	private static void validateWorkFlowUiWrapperForHTMLInjection(WorkFlowUiWrapper workFlowUiWrapper) {
		workFlowUiWrapper.setName(HTMLInjectionUtil.validateHTMLInjection(workFlowUiWrapper.getName()));
		workFlowUiWrapper.setWorkflowJson(HTMLInjectionUtil.validateHTMLInjection(workFlowUiWrapper.getWorkflowJson()));
		List<WSGroupJsonWrapper> serviceGroupJson = workFlowUiWrapper.getServiceGroupJson();
		List<WorkFlowServicesUiWrapper> workFlowServices = null;
		PrecedingDecisionUiWrapper pdw = null;
		if (null != serviceGroupJson) {
			for (WSGroupJsonWrapper obj : serviceGroupJson) {
				obj.setName(HTMLInjectionUtil.validateHTMLInjection(obj.getName()));
				workFlowServices = obj.getWorkFlowServices();
				if (null != workFlowServices) {
					for (WorkFlowServicesUiWrapper wfs : workFlowServices) {
						wfs.setGroupName(HTMLInjectionUtil.validateHTMLInjection(wfs.getGroupName()));
						wfs.setPostDecision(HTMLInjectionUtil.validateHTMLInjection(wfs.getPostDecision()));
						wfs.setPostDecisionRuleJson(
								HTMLInjectionUtil.validateHTMLInjection(wfs.getPostDecisionRuleJson()));
						wfs.setPrecedingDecision(HTMLInjectionUtil.validateHTMLInjection(wfs.getPrecedingDecision()));
						wfs.setSafingCondition(HTMLInjectionUtil.validateHTMLInjection(wfs.getSafingCondition()));
						wfs.setSafingConditionJson(
								HTMLInjectionUtil.validateHTMLInjection(wfs.getSafingConditionJson()));
						wfs.setSafingExceptionCondition(
								HTMLInjectionUtil.validateHTMLInjection(wfs.getSafingExceptionCondition()));
						wfs.setServiceName(HTMLInjectionUtil.validateHTMLInjection(wfs.getServiceName()));
						wfs.setServiceType(HTMLInjectionUtil.validateHTMLInjection(wfs.getServiceType()));
						wfs.setSafingExceptionConditionJson(
								HTMLInjectionUtil.validateHTMLInjection(wfs.getSafingExceptionConditionJson()));
						pdw = wfs.getPrecedingDecisionUi();
						if (null != pdw) {
							pdw.setOnfalse(HTMLInjectionUtil.validateHTMLInjection(pdw.getOnfalse()));
							pdw.setOntrue(HTMLInjectionUtil.validateHTMLInjection(pdw.getOntrue()));
							wfs.setPrecedingDecisionUi(pdw);
						}
						// workFlowServices.add(wfs);
					}
				}
				obj.setWorkFlowServices(workFlowServices);
			}
		}
	}

	private static List<WorkFlowServicesUiWrapper> workFlowServicesWrapper(List<WorkFlowServicesDto> workflowServices) {
		WorkFlowServicesUiWrapper wfs = null;
		List<WorkFlowServicesUiWrapper> wfsList = new ArrayList<>();
		for (WorkFlowServicesDto w : workflowServices) {
			wfs = new WorkFlowServicesUiWrapper();
			wfs.setAutoReversalEligibilityCondition(w.getAutoReversalEligibilityCondition());
			wfs.setAutoReversalFinalCondition(w.getAutoReversalFinalCondition());
			wfs.setGroupName(w.getGroupName());
			wfs.setId(w.getId());
			wfs.setOrdinal(w.getOrdinal());
			wfs.setPostDecision(w.getPostDecision());
			wfs.setPostDecisionRuleJson(w.getPostDecisionRuleJson());
			wfs.setPrecedingDecision(w.getPrecedingDecision());
			wfs.setSafingCondition(w.getSafingCondition());
			wfs.setSafingConditionJson(w.getSafingConditionJson());
			wfs.setServiceName(w.getServiceName());
			wfs.setServiceType(w.getServiceType());
			wfs.setSafingExceptionCondition(w.getSafingExceptionCondition());
			wfs.setSafingExceptionConditionJson(w.getSafingExceptionConditionJson());
			wfs.setSafingExceptionConditionJsonUi(w.getSafingExceptionConditionJson());
			wfs.setServiceType(w.getServiceType());
			wfsList.add(wfs);
		}
		return wfsList;
	}
}
