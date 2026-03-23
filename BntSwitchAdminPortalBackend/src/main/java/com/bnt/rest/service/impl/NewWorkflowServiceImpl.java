package com.bnt.rest.service.impl;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.ReflectionUtil;
import com.bnt.common.util.RippsUtility;
import com.bnt.common.util.StringUtil;
import com.bnt.common.util.exception.ExceptionLog;
import com.bnt.constant.Constants;
import com.bnt.constant.IgnoreCopyConstants;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.WorkFlowDto;
import com.bnt.rest.dto.WorkFlowServicesDto;
import com.bnt.rest.entity.AuthSession;
import com.bnt.rest.entity.LookupValue;
import com.bnt.rest.entity.WorkFlow;
import com.bnt.rest.entity.WorkFlowServices;
import com.bnt.rest.jpa.repository.NewWorkflowServicePersistenceHelper;
import com.bnt.rest.service.impl.AuthSessionService;
import com.bnt.rest.repository.LookupValueRepository;
import com.bnt.rest.repository.WorkFlowRepository;
import com.bnt.rest.repository.WorkFlowServicesRepository;
import com.bnt.rest.service.NewWorkflowService;
import com.bnt.rest.wrapper.dto.IdAndNameWrapper;
import com.bnt.rest.wrapper.dto.workflow.WorkFlowServicesUiWrapper;
import com.bnt.rest.wrapper.dto.workflow.WorkFlowUiWrapper;
import com.bnt.service.mapper.WorkFlowWrapperDtoMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class NewWorkflowServiceImpl implements NewWorkflowService {

	private static final Logger logger = LogManager.getLogger(NewWorkflowServiceImpl.class);

	@Autowired
	private WorkFlowRepository workFlowRepository;

	@Autowired
	private WorkFlowServicesRepository workFlowServicesRepository;

	@Autowired
	private AuthSessionService authSessionService;

	@Autowired
	private NewWorkflowServicePersistenceHelper workflowPersistenceHelper;

	@Autowired
	private LookupValueRepository lookupValueRepository;

	@Override
	public List<String> getServiceList() {
		logger.info("Inside getServiceList()...");
		List<LookupValue> lookupValueList = lookupValueRepository.getLookUpValueByType("SERVICE_TYPE");
		List<String> listService = new ArrayList<>();
		for (LookupValue LookupValue : lookupValueList) {
			listService.add(LookupValue.getValue());
		}
		logger.info("listService.size(): {}", listService.size());
		return listService;
	}

	@Override
	public List<IdAndNameWrapper> getServicesList() {
		return new ArrayList<>();
	}

	public ResponseWrapper getPagableUIList(Map<String, Object> requestParamMap) {
		logger.info("insid getPagableConfigUIList()...");
		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		List<WorkFlowUiWrapper> listUI = new ArrayList<>();
		Page<WorkFlow> pageListConfig = workFlowRepository.getPagableWorkFlowList(pageable);

		for (WorkFlow workFlow : pageListConfig.getContent()) {
			WorkFlowDto workFlowDto = WorkFlowDtoWrapper(workFlow);
			List<WorkFlowServicesDto> workFlowServicesDtoList = WorkFlowServiceDTOWrapper(
					workFlow.getWorkFlowServices());
			workFlowDto.setWorkFlowServices(workFlowServicesDtoList);
			WorkFlowUiWrapper workFlowUiWrapper = WorkFlowWrapperDtoMapper.convertWorkFlowDtoToWrapper(workFlowDto);
			listUI.add(workFlowUiWrapper);
		}
		ResponseWrapper pageJPAData = JPAUtils.getResponseWrapperByPage(pageListConfig,
				pageListConfig.getTotalElements());
		pageJPAData.setContent(listUI);
		return pageJPAData;
	}

	@Override
	public boolean validateWorkFlowByName(String workFlowName) {
		logger.info("Inside validateworkFlowName()...: {}", workFlowName);
		boolean existWorkFlow = false;
		if (StringUtil.isNotNullOrBlank(workFlowName)) {
			workFlowName = workFlowName.trim();
			if (workFlowName.length() > 0) {
				boolean validateWorkFlowNameByConvention = workFlowRepository
						.validateWorkFlowNameByConvention(workFlowName);
				if (validateWorkFlowNameByConvention) {
					existWorkFlow = true;
				} else {
					throw new RippsAdminException("Workflow name already exist");
				}
			} else {
				throw new RippsAdminException("Workflow name is invalid");
			}
		} else {
			throw new RippsAdminException("Workflow name is invalid");
		}
		return existWorkFlow;
	}

	@Override
	public WorkFlowDto getWorkFlowDtoById(Integer id) {
		WorkFlowDto workFlowDto = null;
		WorkFlow workFlow = workFlowRepository.findWorkFlowById(id);
		if (workFlow == null) {
			throw new RippsAdminException("Id not available");
		}
		workFlowDto = WorkFlowDtoWrapper(workFlow);
		try {
			List<WorkFlowServicesDto> workFlowServicesDtoList = WorkFlowServiceDTOWrapper(
					workFlow.getWorkFlowServices());
			workFlowDto.setWorkFlowServices(workFlowServicesDtoList);
		} catch (Exception e) {
			logger.error("error while getWorkFlowDtoById() ", e.getMessage());
		}
		return workFlowDto;
	}

	@Override
	public WorkFlowUiWrapper getWorkFlowUiById(Integer id) {
		WorkFlowDto workFlowDto = getWorkFlowDtoById(id);
		return WorkFlowWrapperDtoMapper.convertWorkFlowDtoToWrapper(workFlowDto);
	}

	public Integer getVersion(WorkFlow workFlow, String saveType) {
		logger.info("inside getVersion() with saveType: {}", saveType);
		Integer version = null;
		if (Constants.SAVETYPE_VERSIONIT.equalsIgnoreCase(saveType)) {
			version = workFlowRepository.getMaxVersionForWorkFlow(workFlow.getName());
			version = RippsUtility.getVersion(version);
			if (version == 0) {
				version = RippsUtility.getVersion(version);
			}
		} else {
			version = 0;
		}
		return version;
	}

	public List<WorkFlowServices> convertDtoToList(List<WorkFlowServicesDto> list) {
		List<WorkFlowServices> objList = new ArrayList<>();
		WorkFlowServices workFlowServices = new WorkFlowServices();
		for (WorkFlowServicesDto workFlowServicesDto : list) {
			try {
				ReflectionUtil.copy(workFlowServices, workFlowServicesDto);
			} catch (Exception e) {
				e.printStackTrace();
			}
			workFlowServices.setServiceName(workFlowServicesDto.getServiceName());
		}
		objList.add(workFlowServices);
		return objList;
	}

	@Override
	public Integer createWorkFlow(WorkFlowUiWrapper workFlowUiWrapper, WorkFlow workFlow, String requestToken,
			String savetype) {
		logger.info("inside createWorkFlow()... with name: {}", workFlowUiWrapper.getName());
		try {
			List<WorkFlowServicesUiWrapper> newWorkFlowUiWrapperList = WorkFlowWrapperDtoMapper
					.updateRuleJson(workFlowUiWrapper.getWorkFlowServices());
			workFlowUiWrapper.setWorkFlowServices(newWorkFlowUiWrapperList);
		} catch (Exception e1) {
			logger.error(ExceptionLog.printStackTraceToString(e1));
			throw new RippsAdminException("Issue in update-Rule-Json ");
		}
		WorkFlowDto workFlowDto = WorkFlowWrapperDtoMapper.convertWrapperToWorkFlowDto(workFlowUiWrapper);
		workFlowDto.setId(null);
		List<String> ignoreCopyAuditField = Arrays.asList(IgnoreCopyConstants.IGNORE_COPY_AUDITFIELDS_CREATE);

		List<WorkFlowServices> workFlowServicesList = null;
		Integer workFlowId = getWorkFlowId(workFlowDto.getName());
		try {
			ReflectionUtil.copy(workFlow, workFlowDto, ignoreCopyAuditField);
			workFlowServicesList = convertDtoToList(workFlowDto.getWorkFlowServices());
			workFlow.setWorkFlowServices(workFlowServicesList);
		} catch (Exception e) {
			logger.error(ExceptionLog.printStackTraceToString(e));
		}
		Integer version = getVersion(workFlow, savetype);
		workFlow.setVersion(version);
		workFlow.setWorkflowId(workFlowId);
		workFlow.setStatus('1');
		workFlow.setDeleted('0');
		workFlow.setCreatedBy(authSessionService.getCreatedBy());
		workFlow.setCreatedOn(RippsUtility.getCurrentTimeStamp());
		WorkFlowWrapperDtoMapper.createWorkFlowServices(workFlow);
		WorkFlow savedWorkFlow = null;
		try {
			savedWorkFlow = workFlowRepository.save(workFlow);
		} catch (Exception e) {
			logger.error(ExceptionLog.printStackTraceToString(e));
		}
		Integer workFlowIdSaved;
		if (savedWorkFlow == null) {
			throw new RippsAdminException("Error in saving WorkFlow");
		} else {
			workFlowIdSaved = savedWorkFlow.getId();
			logger.info("created successfully with Id: {}", workFlowIdSaved);
		}
		return workFlowIdSaved;
	}

	@Override
	@Transactional
	public Integer draftWorkFlow(WorkFlowUiWrapper workFlowUiWrapper, String requestToken) {
		logger.info("inside draftWorkFlow");
		WorkFlow workFlow = null;
		Integer workFlowId = null;

		if (workFlowUiWrapper.getName() != null && !"".equalsIgnoreCase(workFlowUiWrapper.getName())
				&& !"null".equalsIgnoreCase(workFlowUiWrapper.getName())) {
			String normalisedName = workFlowRepository.getNormalisedWorkFlowNameIfAny(workFlowUiWrapper.getName());
			if (StringUtil.isNotNullOrBlank(normalisedName)) {
				workFlow = workFlowRepository.getWorkFlowByNameAndVersion(normalisedName, 0);
			} else {
				workFlow = workFlowRepository.getWorkFlowByNameAndVersion(workFlowUiWrapper.getName(), 0);
			}
		} else {
			throw new RippsAdminException("Name is mandatory");
		}

		if (workFlow != null) {
			workFlowId = updateWorkFlow(workFlowUiWrapper, workFlow, requestToken, Constants.SAVETYPE_DRAFT);
		} else {
			workFlow = new WorkFlow();
			workFlowId = createWorkFlow(workFlowUiWrapper, workFlow, requestToken, Constants.SAVETYPE_DRAFT);
		}
		return workFlowId;
	}

	@Override
	@Transactional
	public Integer versionItWorkFlow(WorkFlowUiWrapper workFlowUiWrapper, String requestToken) {
		logger.info("inside versionItWorkFlow");
		WorkFlow workFlow = null;
		Integer workFlowId = null;
		if (workFlowUiWrapper.getName() != null && !"".equalsIgnoreCase(workFlowUiWrapper.getName())
				&& !"null".equalsIgnoreCase(workFlowUiWrapper.getName())) {
			String normalisedName = workFlowRepository.getNormalisedWorkFlowNameIfAny(workFlowUiWrapper.getName());
			if (StringUtil.isNotNullOrBlank(normalisedName)) {
				workFlow = workFlowRepository.getWorkFlowByNameAndVersion(normalisedName, 0);
			} else {
				workFlow = workFlowRepository.getWorkFlowByNameAndVersion(workFlowUiWrapper.getName(), 0);
			}
		} else {
			throw new RippsAdminException("Name is mandatory");
		}

		if (workFlow != null) {
			workFlowId = updateWorkFlow(workFlowUiWrapper, workFlow, requestToken, Constants.SAVETYPE_VERSIONIT);
		} else {
			workFlow = new WorkFlow();
			workFlowId = createWorkFlow(workFlowUiWrapper, workFlow, requestToken, Constants.SAVETYPE_VERSIONIT);
		}
		return workFlowId;
	}

	@Transactional
	@Override
	public Integer updateWorkFlow(WorkFlowUiWrapper workFlowUiWrapper, WorkFlow workFlow, String requestToken,
			String savetype) {
		logger.info("inside updateWorkFlow");
		Integer version = getVersion(workFlow, savetype);
		deleteExistingServicesIfExists(workFlow);
		logger.info("inside createWorkFlow with name: {}", workFlowUiWrapper.getName());
		try {
			List<WorkFlowServicesUiWrapper> newWorkFlowUiWrapperList = WorkFlowWrapperDtoMapper
					.updateRuleJson(workFlowUiWrapper.getWorkFlowServices());
			workFlowUiWrapper.setWorkFlowServices(newWorkFlowUiWrapperList);
		} catch (Exception e1) {
			logger.error(ExceptionLog.printStackTraceToString(e1));
			throw new RippsAdminException("Issue in update-Rule-Json ");
		}
		WorkFlowDto workFlowDto = WorkFlowWrapperDtoMapper.convertWrapperToWorkFlowDto(workFlowUiWrapper);
		workFlowDto.setId(null);
		workFlow.setWorkFlowServices(new ArrayList<>());
		List<WorkFlowServices> workFlowServicesList = null;
		try {
			workFlow.setServiceGroupJson(workFlowDto.getServiceGroupJson());

			workFlowServicesList = ObjectMapper.mapListObjectToListDto(workFlowDto.getWorkFlowServices(),
					WorkFlowServices.class);
			workFlow.setWorkFlowServices(workFlowServicesList);
			workFlow.setResponseCode(workFlowDto.getResponseCode());
			workFlow.setReverseCondition(workFlowDto.getReverseCondition());
		} catch (Exception e) {
			logger.error(ExceptionLog.printStackTraceToString(e));
		}
		workFlow.setVersion(version);
		workFlow.setStatus('1');
		workFlow.setDeleted('0');
		WorkFlowWrapperDtoMapper.createWorkFlowServices(workFlow);
		WorkFlow savedWorkFlow = null;
		try {
			savedWorkFlow = workFlowRepository.save(workFlow);
		} catch (Exception e) {
			logger.error(ExceptionLog.printStackTraceToString(e));
		}
		Integer workFlowId;
		if (savedWorkFlow == null) {
			throw new RippsAdminException("Error in saving WorkFlow");
		} else {
			workFlowId = savedWorkFlow.getId();
			logger.info("created successfully with Id: {}", workFlowId);
		}
		return workFlowId;

	}

	@Transactional
	public void deleteExistingServicesIfExists(WorkFlow workFlow) {
		try {
			workflowPersistenceHelper.deleteServices(workFlow.getId());
		} catch (Exception e) {
			logger.error(e);
		}
	}

	@Override
	public boolean deleteDraftedWorkFlowById(Integer id, String requestToken) {
		logger.info("deleteById: {}", id);
		boolean flag = false;
		WorkFlow workFlow = workFlowRepository.findWorkFlowById(id);
		if (workFlow == null) {
			throw new RippsAdminException("WorkFlow not found");
		}
		if (workFlow.getVersion() == 0) {
			workFlowRepository.deleteById(id);
			flag = true;
			logger.info("record deleted successfully");
		} else {
			throw new RippsAdminException("WorkFlow with only '0' version can be deleted");
		}
		return flag;
	}

	@Override
	public List<WorkFlowServicesDto> getWorkflowServiceList() {
		return ObjectMapper.mapListObjectToListDto(workFlowServicesRepository.findAll(), WorkFlowServicesDto.class);
	}

	public Integer getWorkFlowId(String name) {
		Integer workFlowId = null;
		workFlowId = workFlowRepository.getWorkflowIdExistingByName(name);
		if (workFlowId == null || 0 == workFlowId) {
			workFlowId = workFlowRepository.getWorkflowIdToBeCreated();
		}
		return workFlowId;
	}

	@Override
	public List<WorkFlowDto> getWorkFlowNotInDeployedComponent() {
		List<WorkFlow> workFlowList = (List<WorkFlow>) workFlowRepository.getWorkFlowNotInDeployedComponent();
		List<WorkFlowDto> workFlowDtoList = null;
		if (workFlowList != null) {
			workFlowDtoList = ObjectMapper.mapListObjectToListDto(workFlowList, WorkFlowDto.class);
		}
		return workFlowDtoList;
	}

	@Override
	public List<WorkFlowDto> findAllNotinDeployedComponentNew() {
		logger.info("findAllNotinDeployedComponentNew");
		List<WorkFlowDto> workFlowDtoList = new ArrayList<>();
		List<Object[]> result = workFlowRepository.findAllNotinDeployedComponentNew();
		if (result != null && !result.isEmpty()) {
			WorkFlowDto workFlowDto = null;
			for (Object[] data : result) {
				workFlowDto = new WorkFlowDto();
				workFlowDto.setId((Integer) data[0]);
				workFlowDto.setName((String) data[1]);
				workFlowDto.setVersion((Integer) data[2]);
				workFlowDto.setWorkflowId((Integer) data[3]);
				workFlowDto.setDeleted((Character) data[4]);
				workFlowDto.setStatus((Character) data[5]);
				workFlowDto.setCreatedBy((Integer) data[6]);
				workFlowDto.setCreatedOn((Timestamp) data[7]);
				workFlowDto.setUpdatedBy((Integer) data[8]);
				workFlowDto.setUpdatedOn((Timestamp) data[9]);
				workFlowDtoList.add(workFlowDto);
			}
		}
		return workFlowDtoList;
	}

	@Override
	public List<IdAndNameWrapper> getNameAndWorkFlowId() {
		List<IdAndNameWrapper> idNameList = new ArrayList<>();
		List<Object[]> dbObjectList = workFlowRepository.getNameAndWorkFlowId();
		if (dbObjectList != null) {
			dbObjectList.forEach(each -> {
				Object[] nameAndWorkFlowIdDto = each;
				IdAndNameWrapper idAndNameWrapper = new IdAndNameWrapper();
				idAndNameWrapper.setId((Integer) nameAndWorkFlowIdDto[0]);
				idAndNameWrapper.setName((String) nameAndWorkFlowIdDto[1]);
				idNameList.add(idAndNameWrapper);
			});
		}
		return idNameList;
	}

	private WorkFlowDto WorkFlowDtoWrapper(WorkFlow workflow) {
		WorkFlowDto workflowDTO = new WorkFlowDto();
		workflowDTO.setId(workflow.getId());
		workflowDTO.setName(workflow.getName());
		workflowDTO.setResponseCode(workflow.getResponseCode());
		workflowDTO.setReverseCondition(workflow.getReverseCondition());
		workflowDTO.setServiceGroupJson(workflow.getServiceGroupJson());
		workflowDTO.setStatus(workflow.getStatus());
		workflowDTO.setVersion(workflow.getVersion());
		workflowDTO.setWorkflowId(workflow.getWorkflowId());
		workflowDTO.setUpdatedBy(workflow.getUpdatedBy());
		workflowDTO.setUpdatedOn(workflow.getUpdatedOn());
		workflowDTO.setCreatedBy(workflow.getCreatedBy());
		workflowDTO.setCreatedOn(workflow.getCreatedOn());
		workflowDTO.setWorkFlowServices(WorkFlowServiceDTOWrapper(workflow.getWorkFlowServices()));
		return workflowDTO;
	}

	private List<WorkFlowServicesDto> WorkFlowServiceDTOWrapper(List<WorkFlowServices> workflowServices) {
		List<WorkFlowServicesDto> wfsDTOList = new ArrayList<>();
		WorkFlowServicesDto wfsDTO = null;
		try {
			for (WorkFlowServices wfs : workflowServices) {
				wfsDTO = new WorkFlowServicesDto();
				wfsDTO.setAutoReversalEligibilityCondition(wfs.getAutoReversalEligibilityCondition());
				wfsDTO.setAutoReversalFinalCondition(wfs.getAutoReversalFinalCondition());
				wfsDTO.setCreatedBy(wfs.getCreatedBy());
				wfsDTO.setCreatedOn(wfs.getCreatedOn());
				wfsDTO.setGroupName(wfs.getGroupName());
				wfsDTO.setId(wfs.getId());
				wfsDTO.setOrdinal(wfs.getOrdinal());
				wfsDTO.setPostDecision(wfs.getPostDecision());
				wfsDTO.setPostDecisionRuleJson(wfs.getPostDecisionRuleJson());
				wfsDTO.setPrecedingDecision(wfs.getPrecedingDecision());
				wfsDTO.setSafingCondition(wfs.getSafingCondition());
				wfsDTO.setSafingConditionJson(wfs.getSafingConditionJson());
				wfsDTO.setSafingExceptionCondition(wfs.getSafingExceptionCondition());
				wfsDTO.setSafingExceptionConditionJson(wfs.getSafingExceptionConditionJson());
				wfsDTO.setServiceName(wfs.getServiceName());
				wfsDTO.setServiceType(wfs.getServiceType());
				wfsDTO.setUpdatedBy(wfs.getUpdatedBy());
				wfsDTO.setUpdatedOn(wfs.getUpdatedOn());
				wfsDTO.setServiceType(wfs.getServiceType());
				wfsDTOList.add(wfsDTO);
			}
		} catch (Exception e) {
			logger.error("error while WorkFlowServiceDTOWrapper() ", e.getMessage());
		}
		return wfsDTOList;
	}

}
