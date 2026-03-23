package com.bnt.rest.service.impl;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.RippsUtility;
import com.bnt.common.util.exception.ExceptionLog;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.DeploymentDto;
import com.bnt.rest.dto.DeploymentHistoryWrapper;
import com.bnt.rest.dto.DeploymentStatusDto;
import com.bnt.rest.dto.SystemUserDto;
import com.bnt.rest.entity.Deployment;
import com.bnt.rest.entity.DeploymentCluster;
import com.bnt.rest.entity.SwitchCluster;
import com.bnt.rest.entity.SystemUser;
import com.bnt.rest.jpa.repository.DeploymentClusterPersistenceHelper;
import com.bnt.rest.jpa.repository.DeploymentPersistenceHelper;
import com.bnt.rest.jpa.repository.SwitchClusterPersistenceHelper;
import com.bnt.rest.jpa.repository.UserPersistenceHelper;
import com.bnt.rest.repository.DeploymentRepository;
import com.bnt.rest.service.AdapterService;
import com.bnt.rest.service.DeploymentComponentService;
import com.bnt.rest.service.DeploymentService;
import com.bnt.rest.service.DeploymentWorkflowService;
import com.bnt.rest.service.NewWorkflowService;
import com.bnt.rest.service.RoutingService;
import com.bnt.service.mapper.DeploymentMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class DeploymentServiceImpl implements DeploymentService {

	private static Log logger = LogFactory.getLog(DeploymentServiceImpl.class);
	@Autowired
	AdapterService adapterService;

	@Autowired
	RoutingService routingService;

	@Autowired
	NewWorkflowService workflowService;

	@Autowired
	DeploymentRepository deploymentRepo;

	@Autowired
	DeploymentPersistenceHelper deploymentJpaHelper;

	@Autowired
	DeploymentComponentService deploymentComponentService;

	@Autowired
	SwitchClusterPersistenceHelper switchClusterPersistenceHelper;

	@Autowired
	DeploymentClusterPersistenceHelper deploymentClusterPersistenceHelper;

	@Autowired
	private UserPersistenceHelper userPersistenceHelper;

	@Autowired
	private DeploymentWorkflowService deploymentWorkflowService;

	@Override
	public Map<String, List<DeploymentHistoryWrapper>> getDeploymentHistoryMap(
			List<DeploymentStatusDto> deploymentStatusList) {

		Map<String, List<DeploymentHistoryWrapper>> map = DeploymentMapper.getHistoryMap(deploymentStatusList);

		Map<String, List<DeploymentHistoryWrapper>> filterDeployedMap = DeploymentMapper.filterHistoryMapByStatus(map,
				DeploymentMapper.deployedAndScheduledStatus, true);
		// Now fetch latest history and set of all history in DTO
		DeploymentMapper.setLatestHistory(deploymentStatusList, filterDeployedMap);

		return map;

	}

	@Override
	public DeploymentDto findRecordById(Integer id) {
		Deployment entity = deploymentRepo.findRecordById(id);
		return ObjectMapper.mapToDto(entity, DeploymentDto.class);
	}

	@Transactional
	@Override
	public Integer updateRecord(DeploymentDto dto, Integer id, String xAuthToken) {
		logger.info("Inside updateRecord ");
		Deployment prevDeployment = deploymentJpaHelper.findById(id).orElse(null);
		if (prevDeployment == null) {
			throw new RippsAdminException("Record not Exist");
		}
		Deployment deployment = ObjectMapper.mapToEntity(dto, Deployment.class);
		deployment.setId(prevDeployment.getId());
		deployment.setName(prevDeployment.getName());
		deployment.setStatus(DeploymentMapper.SCHEDULED);
		deployment.getDeploymentComponent().stream()
				.forEach(deploymentComponent -> deploymentComponent.setDeployment(deployment));
		setDeploymentCluster(deployment, dto.getSwitchCluster().getId());
		Deployment savedDeployment = null;
		try {
			savedDeployment = deploymentJpaHelper.save(deployment);
		} catch (Exception e) {
			logger.error(ExceptionLog.printStackTraceToString(e));
			throw new RippsAdminException("Error in deployment update");
		}

		return savedDeployment.getId();

		/**
		 * if (savedDeployment == null) { throw new RippsAdminException("update
		 * failed"); } else { deploymentId = savedDeployment.getId(); } return
		 * deploymentId;
		 */

	}

	@Transactional
	@Override
	public Integer addRecord(DeploymentDto dto) {
		logger.info("Inside addRecord ");
		Deployment deployment = ObjectMapper.mapToEntity(dto, Deployment.class);
		String date = RippsUtility.getCurrentDate("dd-MM-YYYY");
		Integer recordCount = deploymentJpaHelper.getDeploymentNewRecordCount();
		String deploymentName = "Deployment#" + recordCount + "(" + date + ")";
		deployment.setName(deploymentName);
		deployment.setStatus(DeploymentMapper.SCHEDULED);
		deployment.getDeploymentComponent().stream()
				.forEach(deploymentComponent -> deploymentComponent.setDeployment(deployment));

		setDeploymentCluster(deployment, dto.getSwitchCluster().getId());
		Deployment savedDeployment = null;
		try {
			savedDeployment = deploymentJpaHelper.save(deployment);
		} catch (Exception e) {
			logger.error(ExceptionLog.printStackTraceToString(e));
			throw new RippsAdminException("Error in saving deployment");
		}
		Integer deploymentId = null;
		try {
			deploymentId = savedDeployment.getId();
			dto.setScheduledAndDeployedInfo(deploymentComponentService.getScheduledAndDeployedComponentWrapperList());
			deploymentWorkflowService.saveUpdateJson(dto, deploymentId);
		} catch (Exception e) {
			throw new RippsAdminException("Error in saving deployment");
		}

		/**
		 * if (savedDeployment == null) { throw new RippsAdminException("Error in saving
		 * deployment"); } else { deploymentId = savedDeployment.getId();
		 * dto.setScheduledAndDeployedInfo(deploymentComponentService.
		 * getScheduledAndDeployedComponentWrapperList());
		 * deploymentWorkflowService.saveUpdateJson(dto, deploymentId); }
		 */
		return deploymentId;
	}

	public void setDeploymentCluster(Deployment deployment, Integer switchClusterId) {
		logger.info("Inside saveDeploymentCluster with switchClusterId:" + switchClusterId);
		DeploymentCluster deploymentCluster = null;
		SwitchCluster switchCluster = switchClusterPersistenceHelper.findById(switchClusterId).orElse(null);
		if (switchCluster == null) {
			throw new RippsAdminException("Cluster is not valid");
		}
		if (deployment.getId() != null) {
			deploymentCluster = deploymentClusterPersistenceHelper
					.getClusterByDeploymentIdBySwitchClusterId(deployment.getId(), switchCluster.getId());
		}
		if (deploymentCluster == null) {
			deploymentCluster = new DeploymentCluster();
		}
		deploymentCluster.setDeploymentId(deployment);
		deploymentCluster.setSwitchClusterId(switchCluster);
		deploymentCluster.setStatus(DeploymentMapper.SCHEDULED);

		deployment.setDeploymentCluster(deploymentCluster);
	}

	@Override
	public Map<String, Object> getFilterData() {
		Map<String, Object> map = new LinkedHashMap<>();
		map.put("status", DeploymentMapper.getStatusList());
		map.put("cluster", switchClusterPersistenceHelper.getKeyList());

		return map;
	}

	@Override
	public ResponseWrapper findScheduleRecords(Map<String, Object> requestParamMap) {

		ResponseWrapper response = deploymentRepo.findAllScheduledRecords(requestParamMap);
		JPAUtils.mapEntityListToDto(response, DeploymentDto.class);
		return response;
	}

	@Override
	public Map<String, List<DeploymentHistoryWrapper>> getHistoryMap(Map<String, List<DeploymentStatusDto>> statusMap) {

		List<DeploymentStatusDto> resultList = new ArrayList<>();

		resultList.addAll(statusMap.get(DeploymentMapper.UNSCHEDULED));
		resultList.addAll(statusMap.get(DeploymentMapper.DEPLOYED_OR_SCHEDULED));

		DeploymentMapper.sortStatusList(resultList);

		return getDeploymentHistoryMap(resultList);

	}

	@Override
	public List<DeploymentStatusDto> groupUnscheduledListOnSchedulePage(
			Map<String, List<DeploymentHistoryWrapper>> historyMap, List<DeploymentStatusDto> unscheduledList) {
		List<DeploymentStatusDto> resultList = DeploymentMapper.groupUnscheduledStatusListOnSchedulePage(historyMap,
				unscheduledList);
		if (resultList != null) {
			List<SystemUser> objList = (List<SystemUser>) userPersistenceHelper.findAll();
			List<SystemUserDto> objDtoList = ObjectMapper.mapListObjectToListDto(objList, SystemUserDto.class);
			Map<Integer, String> userMap = DeploymentMapper.userMap(objDtoList);
			List<DeploymentStatusDto> newList = new ArrayList<>();
			for (DeploymentStatusDto dto : resultList) {
				dto.setUserName(userMap.get(dto.getLastModifiedBy()));
				newList.add(dto);
			}
			return newList;
		}

		return resultList;
	}

}
