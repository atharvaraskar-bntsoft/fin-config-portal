package com.bnt.rest.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.JPAUtils;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.DeploymentComponentDto;
import com.bnt.rest.dto.DeploymentHistoryWrapper;
import com.bnt.rest.dto.DeploymentStatusDto;
import com.bnt.rest.dto.IdNameVersionTypeWrapper;
import com.bnt.rest.dto.SystemUserDto;
import com.bnt.rest.entity.DeploymentComponent;
import com.bnt.rest.entity.SystemUser;
import com.bnt.rest.jpa.repository.DeploymentComponentPeresistenceHelper;
import com.bnt.rest.jpa.repository.UserPersistenceHelper;
import com.bnt.rest.repository.DeploymentRepository;
import com.bnt.rest.service.AdapterService;
import com.bnt.rest.service.DeploymentComponentService;
import com.bnt.rest.service.ExtEtlJobNewService;
import com.bnt.rest.service.NewWorkflowService;
import com.bnt.rest.service.RoutingService;
import com.bnt.service.mapper.DeploymentMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class DeploymentCompontServiceImpl implements DeploymentComponentService {

	private static final Logger logger = LogManager.getLogger(DeploymentCompontServiceImpl.class);

	@Autowired
	DeploymentComponentPeresistenceHelper deploymentComponentJpaHelper;

	@Autowired
	AdapterService adapterService;

	@Autowired
	ExtEtlJobNewService extEtlJobNewService;

	@Autowired
	private RoutingService routingService;

	@Autowired
	private NewWorkflowService workflowService;

	@Autowired
	private DeploymentRepository deploymentRepo;

	@Autowired
	private UserPersistenceHelper userPersistenceHelper;

	@Override
	public ResponseWrapper findPagedDeploymentStatusRecords(Map<String, Object> requestParamMap) {
		/** Get all list of scheduled/deployed components */
		List<DeploymentStatusDto> resultList = getAllComponentsList();
		if (resultList != null) {
			List<SystemUser> objList = (List<SystemUser>) userPersistenceHelper.findAll();
			List<SystemUserDto> objDtoList = ObjectMapper.mapListObjectToListDto(objList, SystemUserDto.class);
			Map<Integer, String> userMap = DeploymentMapper.userMap(objDtoList);
			List<DeploymentStatusDto> newList = new ArrayList<>();
			for (DeploymentStatusDto dto : resultList) {
				dto.setUserName(userMap.get(dto.getLastModifiedBy()));
				newList.add(dto);
			}
			return JPAUtils.getResponseWrapperByList(requestParamMap, newList);
		}
		return JPAUtils.getResponseWrapperByList(requestParamMap, resultList);
	}

	@Override
	public List<DeploymentStatusDto> getAllComponentsList() {
		List<DeploymentStatusDto> resultList = new ArrayList<>();
		resultList.addAll(getAllDeploymentList());

		resultList.addAll(DeploymentMapper.groupUnscheduledStatusListOnStatusPage(getUnscheduledComponentList()));
		DeploymentMapper.sortStatusList(resultList);
		return resultList;
	}

	@Override
	public Map<String, List<DeploymentStatusDto>> getStatusMap() {
		Map<String, List<DeploymentStatusDto>> hashMap = new HashMap<>();
		hashMap.put(DeploymentMapper.UNSCHEDULED, getUnscheduledComponentList());
		hashMap.put(DeploymentMapper.DEPLOYED_OR_SCHEDULED, getAllDeploymentList());

		return hashMap;
	}

	@Override
	public List<DeploymentStatusDto> getAllDeploymentList() {
		List<DeploymentStatusDto> resultList = new ArrayList<>();
		/*** and all list for status page */
		List<DeploymentComponentDto> deployedList = getDeploymentComponentList();
		resultList.addAll(DeploymentMapper.getScheduledAndDeployedComponentStatus(deployedList));
		return resultList;
	}

	@Override
	public Set<IdNameVersionTypeWrapper> getScheduledAndDeployedComponentWrapperList() {

		/*** and all list for status page */
		Set<Object[]> deployedList = getOnlyScheduledAndDeployedComponents();
		return DeploymentMapper.getScheduledAndDeployedComponentWrapper(deployedList);

	}

	@Override
	public List<DeploymentStatusDto> getUnscheduledComponentList() {
		List<DeploymentStatusDto> resultList = new ArrayList<>();
		resultList.addAll(DeploymentMapper.getUnscheduledAdapterComponentStatus(
				adapterService.getAdapterConfigurationNotInDeployedComponentNew()));
		resultList.addAll(
				DeploymentMapper.getUnscheduledRouterStatus(routingService.getRoutingVersionNotInDeployedComponent()));
		resultList.addAll(
				DeploymentMapper.getUnscheduledWorkflowStatus(workflowService.findAllNotinDeployedComponentNew()));
		resultList.addAll(DeploymentMapper
				.getUnscheduleExtEtlComponentStatus(extEtlJobNewService.getExEtlNotInDeployedComponentNew()));

		resultList = DeploymentMapper.sortStatusList(resultList);
		return resultList;
	}

	@Override
	public List<DeploymentComponentDto> getDeploymentComponentList() {
		return ObjectMapper.mapListObjectToListDto(deploymentComponentJpaHelper.findAll(),
				DeploymentComponentDto.class);
	}

	@Override
	public Set<Object[]> getOnlyScheduledAndDeployedComponents() {
		return deploymentComponentJpaHelper.getDistinctScheduledAndDeployedComponents();
	}

	@Override
	public Map<String, List<DeploymentHistoryWrapper>> getDeploymentComponentHistory() {

		Map<String, List<DeploymentHistoryWrapper>> map = new HashMap<>();
		List<DeploymentComponent> deploymentComponentList = deploymentComponentJpaHelper.findAll();
		DeploymentMapper.getDeployedHistory(map, deploymentComponentList);

		return map;

	}

	@Override
	public void deleteById(int id) {

		try {
			deploymentComponentJpaHelper.deleteById(id);
			logger.info("Record deleted successfully");

		} catch (Exception e) {
			logger.info("Record deletion failed");
			throw new RippsAdminException("Record deletion failed");
		}

	}

	@Override
	public Set<IdNameVersionTypeWrapper> getComponentListForDeploymentWorkFlowJSON() {
		return deploymentRepo.getComponentListForDeploymentWorkFlowJSON();
	}

}
