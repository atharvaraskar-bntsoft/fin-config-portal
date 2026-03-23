package com.bnt.service.mapper;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.google.common.collect.Lists;
import com.bnt.common.util.CollectionUtil;
import com.bnt.rest.dto.AdapterConfigurationDto;
import com.bnt.rest.dto.AdapterDto;
import com.bnt.rest.dto.DeploymentComponentDto;
import com.bnt.rest.dto.DeploymentDto;
import com.bnt.rest.dto.DeploymentHistoryWrapper;
import com.bnt.rest.dto.DeploymentStatusDto;
import com.bnt.rest.dto.ExtEtlJobNewListDto;
import com.bnt.rest.dto.IdNameVersionTypeWrapper;
import com.bnt.rest.dto.RoutingDto;
import com.bnt.rest.dto.RoutingVersionDto;
import com.bnt.rest.dto.SystemUserDto;
import com.bnt.rest.dto.WorkFlowDto;
import com.bnt.rest.entity.DeploymentComponent;
import com.bnt.rest.entity.ExtEtlJobNew;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class DeploymentMapper {

	private DeploymentMapper() {
	}

	private static final Logger logger = LogManager.getLogger(DeploymentMapper.class);

	public static final String WF = "WF";

	public static final String ROUTER = "Router";

	private static final String ROUTE = "route";

	private static final String WORKFLOW = "workflow";

	public static final String UNSCHEDULED = "Non-scheduled";

	private static final String DEPLOYED_CAMELCASE = "Deployed";

	private static final String DEPLOYED_UPPERCASE = "DEPLOYED";

	private static final String UNDEPLOYED = "Undeployed";

	public static final String SCHEDULED = "Scheduled";

	private static final String CANCELLED = "Cancelled";

	public static final String DEPLOYED_OR_SCHEDULED = "DeployedOrScheduled";

	public static List<String> deployedAndScheduledStatus = Arrays.asList(DeploymentMapper.SCHEDULED,
			DeploymentMapper.DEPLOYED_CAMELCASE, DeploymentMapper.DEPLOYED_UPPERCASE);

	public static List<String> getStatusList() {
		return Lists.newArrayList(UNSCHEDULED, SCHEDULED, DEPLOYED_CAMELCASE, "Deployment Failed", UNDEPLOYED,
				CANCELLED);
	}

	public static List<DeploymentStatusDto> getUnscheduledAdapterComponentStatus(
			List<AdapterConfigurationDto> adapterList) {
		// Map List of AdapterConfigurationDto to List of DeploymentStatusDto
		List<DeploymentStatusDto> deploymentList = new ArrayList<>();
		adapterList.forEach(
				adapterConfigurationDto -> mapAdapterToDeploymentStatus(deploymentList, adapterConfigurationDto));
		return deploymentList;
	}

	public static List<DeploymentStatusDto> getUnscheduleExtEtlComponentStatus(
			List<ExtEtlJobNewListDto> extEtlJobNewDto) {
		// Map List of AdapterConfigurationDto to List of DeploymentStatusDto
		List<DeploymentStatusDto> deploymentList = new ArrayList<>();
		extEtlJobNewDto.forEach(
				adapterConfigurationDto -> mapExtEtlToDeploymentStatus(deploymentList, adapterConfigurationDto));
		return deploymentList;
	}

	private static void mapExtEtlToDeploymentStatus(List<DeploymentStatusDto> deploymentList,
			ExtEtlJobNewListDto extEtlJobNewDto) {

		ExtEtlJobNew extEtlJobNew = extEtlJobNewDto.getExtEtlJobNew();
		DeploymentStatusDto deploymentStatusDto = new DeploymentStatusDto();
		deploymentStatusDto.setComponentId(extEtlJobNewDto.getId());
		deploymentStatusDto.setComponentName(extEtlJobNew.getJobName());
		deploymentStatusDto.setComponentType(extEtlJobNew.getType());
		deploymentStatusDto.setCurrentVersion(Integer.parseInt(extEtlJobNewDto.getVersion()));
		deploymentStatusDto.setLastModifiedBy(extEtlJobNewDto.getCreatedBy());
		setLastModifiedOn(deploymentStatusDto, extEtlJobNewDto.getCreatedOn(), extEtlJobNewDto.getUpdatedOn());

		deploymentStatusDto.setStatus(UNSCHEDULED);
		deploymentList.add(deploymentStatusDto);
	}

	private static void mapAdapterToDeploymentStatus(List<DeploymentStatusDto> deploymentList,
			AdapterConfigurationDto adapterConfigurationDto) {

		AdapterDto adapterDto = adapterConfigurationDto.getAdapter();

		DeploymentStatusDto deploymentStatusDto = new DeploymentStatusDto();
		deploymentStatusDto.setComponentId(adapterConfigurationDto.getId());
		deploymentStatusDto.setComponentName(adapterDto.getName());
		deploymentStatusDto.setComponentType(adapterDto.getType());
		deploymentStatusDto.setCurrentVersion(adapterConfigurationDto.getVersion());
		deploymentStatusDto.setLastModifiedBy(adapterConfigurationDto.getCreatedBy());
		setLastModifiedOn(deploymentStatusDto, adapterConfigurationDto.getCreatedOn(),
				adapterConfigurationDto.getUpdatedOn());

		deploymentStatusDto.setStatus(UNSCHEDULED);
		deploymentList.add(deploymentStatusDto);
	}

	private static void setLastModifiedOn(DeploymentStatusDto deploymentStatusDto, Timestamp createdOn,
			Timestamp updatedOn) {
		if (updatedOn != null) {
			deploymentStatusDto.setLastModifiedOn(updatedOn);
		} else {
			deploymentStatusDto.setLastModifiedOn(createdOn);
		}
	}

	public static List<DeploymentStatusDto> getScheduledAndDeployedComponentStatus(
			List<DeploymentComponentDto> deployedList) {
		List<DeploymentStatusDto> deploymentList = new ArrayList<>();
		deployedList.forEach(
				deployedComponentDto -> mapDeployedComponentToDeploymentStatus(deploymentList, deployedComponentDto));
		return deploymentList;
	}

	private static void mapDeployedComponentToDeploymentStatus(List<DeploymentStatusDto> deploymentList,
			DeploymentComponentDto deployedComponentDto) {
		DeploymentDto deploymentDto = deployedComponentDto.getDeployment();

		DeploymentStatusDto deploymentStatusDto = new DeploymentStatusDto();
		// change-deployment - from where we will get component name and version
		deploymentStatusDto.setId(deployedComponentDto.getId());
		deploymentStatusDto.setComponentId(deployedComponentDto.getComponentId());
		deploymentStatusDto.setComponentName(deployedComponentDto.getName());
		deploymentStatusDto.setCurrentVersion(deployedComponentDto.getVersion());
		deploymentStatusDto.setComponentType(deployedComponentDto.getComponentType());

		deploymentStatusDto.setLastModifiedBy(deployedComponentDto.getCreatedBy());
		deploymentStatusDto.setLastModifiedOn(deployedComponentDto.getUpdatedOn());

		setLastModifiedOn(deploymentStatusDto, deployedComponentDto.getCreatedOn(),
				deployedComponentDto.getUpdatedOn());

		// Need to check if it needs deployment status or individual component status
		deploymentStatusDto.setStatus(deploymentDto.getStatus());

		deploymentList.add(deploymentStatusDto);

	}

	public static List<DeploymentStatusDto> getUnscheduledWorkflowStatus(List<WorkFlowDto> workflowList) {
		List<DeploymentStatusDto> deploymentList = new ArrayList<>();
		workflowList.forEach(workflowVersionDto -> mapWorkflowToDeploymentStatus(deploymentList, workflowVersionDto));
		return deploymentList;

	}

	private static void mapWorkflowToDeploymentStatus(List<DeploymentStatusDto> deploymentList,
			WorkFlowDto workFlowDto) {
		DeploymentStatusDto deploymentStatusDto = null;
		deploymentStatusDto = new DeploymentStatusDto();
		deploymentStatusDto.setComponentId(workFlowDto.getId());
		deploymentStatusDto.setComponentName(workFlowDto.getName());

		deploymentStatusDto.setComponentType(WF);
		deploymentStatusDto.setComponentTypeShowOnUI("L2(Workflow)");

		deploymentStatusDto.setCurrentVersion(workFlowDto.getVersion());
		deploymentStatusDto.setLastModifiedBy(workFlowDto.getCreatedBy());
		deploymentStatusDto.setLastModifiedOn(workFlowDto.getUpdatedOn());
		setLastModifiedOn(deploymentStatusDto, workFlowDto.getCreatedOn(), workFlowDto.getUpdatedOn());
		deploymentStatusDto.setStatus(UNSCHEDULED);

		deploymentList.add(deploymentStatusDto);
	}

	public static List<DeploymentStatusDto> getUnscheduledRouterStatus(List<RoutingVersionDto> routerList) {
		List<DeploymentStatusDto> deploymentList = new ArrayList<>();
		routerList.forEach(routingVersionDto -> mapRouterToDeploymentStatus(deploymentList, routingVersionDto));
		return deploymentList;

	}

	private static void mapRouterToDeploymentStatus(List<DeploymentStatusDto> deploymentList,
			RoutingVersionDto routingVersionDto) {
		RoutingDto routingDto = routingVersionDto.getRouting();

		DeploymentStatusDto deploymentStatusDto = new DeploymentStatusDto();
		deploymentStatusDto.setComponentId(routingVersionDto.getId());
		deploymentStatusDto.setComponentName(routingDto.getName());

		deploymentStatusDto.setComponentType(ROUTER);
		if (WORKFLOW.equals(routingDto.getRuletype())) {
			deploymentStatusDto.setComponentTypeShowOnUI("L2(Router:Workflow)");
		} else if (ROUTE.equals(routingDto.getRuletype())) {
			deploymentStatusDto.setComponentTypeShowOnUI("L2(Router:Destination)");
		}

		deploymentStatusDto.setCurrentVersion(routingVersionDto.getVersion());
		deploymentStatusDto.setLastModifiedBy(routingVersionDto.getCreatedBy());
		setLastModifiedOn(deploymentStatusDto, routingVersionDto.getCreatedOn(), routingVersionDto.getUpdatedOn());

		deploymentStatusDto.setStatus(UNSCHEDULED);
		deploymentList.add(deploymentStatusDto);

	}

	public static void sortHistoryMap(Map<String, List<DeploymentHistoryWrapper>> map) {
		map.forEach((key, value) -> {
			List<DeploymentHistoryWrapper> newList = value.stream()
					.sorted(Comparator.comparing(DeploymentHistoryWrapper::getLastModified).reversed()).toList();
			map.put(key, newList);

		});
	}

	public static List<DeploymentStatusDto> sortStatusList(List<DeploymentStatusDto> list) {
		return list.stream().sorted(Comparator.comparing(DeploymentStatusDto::getLastModifiedOn).reversed()).toList();
	}

	public static void processHistoryMap(Map<String, List<DeploymentHistoryWrapper>> map, String status,
			String componentName, Integer version, Timestamp deployedOn) {

		// Bug in this code
		map.putIfAbsent(componentName, processOnInitialization(status, version, deployedOn));
		map.compute(componentName, (key, value) -> {

			process(value, status, version, deployedOn);
			return value;
		});
	}

	public static List<DeploymentHistoryWrapper> processOnInitialization(String status, Integer version,
			Timestamp deployedOn) {
		List<DeploymentHistoryWrapper> value = new ArrayList<>();
		process(value, status, version, deployedOn);
		return value;
	}

	public static void process(List<DeploymentHistoryWrapper> value, String status, Integer version,
			Timestamp deployedOn) {
		value.add(new DeploymentHistoryWrapper(status, version, deployedOn));
	}

	public static Map<String, List<DeploymentHistoryWrapper>> filterHistoryMapByStatus(
			Map<String, List<DeploymentHistoryWrapper>> map, List<String> statusList, boolean flag) {
		final Map<String, List<DeploymentHistoryWrapper>> outputMap = map;

		// Now filter list based on status for each entry of Map
		outputMap.forEach((key, value) -> {
			if (flag) {
				outputMap.replace(key, value.parallelStream().filter(x -> statusList.contains(x.getStatus()))
						.sorted(Comparator.comparing(DeploymentHistoryWrapper::getLastModified).reversed()).toList());

			} else {
				outputMap.replace(key, value.parallelStream().filter(x -> !(statusList.contains(x.getStatus())))
						.sorted(Comparator.comparing(DeploymentHistoryWrapper::getLastModified).reversed()).toList());

			}

		});

		return outputMap;
	}

	public static void setLatestHistory(List<DeploymentStatusDto> deploymentStatusList,
			Map<String, List<DeploymentHistoryWrapper>> filterDeployedMap) {

		deploymentStatusList.forEach(x -> {
			DeploymentStatusDto component = (DeploymentStatusDto) x;
			DeploymentHistoryWrapper history = null;
			final List<DeploymentHistoryWrapper> list = filterDeployedMap.get(component.getComponentName());
			if (!(CollectionUtil.isCollectionEmptyOrNull(list))) {
				history = list.get(0);
				component.setLastDeploymentHistory(filterDeployedMap.get(component.getComponentName()).get(0));
				component.getLastDeploymentHistory().setLatestHistoryMessage(component.getStatus());

			}

			else {
				// Now search in Non filtered Map if required
				// Never deployed
				component.setLastDeploymentHistory(new DeploymentHistoryWrapper());
			}

		});
	}

	public static Map<String, List<DeploymentHistoryWrapper>> getHistoryMap(List<DeploymentStatusDto> statusList) {
		Map<String, List<DeploymentHistoryWrapper>> map = new TreeMap<>();

		statusList.forEach(component -> DeploymentMapper.processHistoryMap(map, component.getStatus(),
				component.getComponentName(), component.getCurrentVersion(), component.getLastModifiedOn()));
		DeploymentMapper.sortHistoryMap(map);
		return map;
	}

	public static void getDeployedHistory(Map<String, List<DeploymentHistoryWrapper>> map,
			List<DeploymentComponent> deploymentComponentList) {
		deploymentComponentList.forEach(component -> {
			if (component.getDeployment().getDeployedOn() != null) {
				DeploymentMapper.processHistoryMap(map, component.getDeployment().getStatus(), component.getName(),
						component.getVersion(), component.getDeployment().getDeployedOn());
			} else {
				DeploymentMapper.processHistoryMap(map, component.getDeployment().getStatus(), component.getName(),
						component.getVersion(),
						(component.getUpdatedOn() != null ? component.getUpdatedOn() : component.getCreatedOn()));
			}
		});

		DeploymentMapper.sortHistoryMap(map);
	}

	public static List<DeploymentComponentDto> convertDeploymentStatusToDTo(
			List<DeploymentStatusDto> deploymentStatus) {
		List<DeploymentComponentDto> deploymentComponent = null;
		DeploymentComponentDto deploymentComponentDto = null;
		if (deploymentStatus != null) {
			for (DeploymentStatusDto deploymentStatusDto : deploymentStatus) {
				deploymentComponentDto = new DeploymentComponentDto();
				deploymentComponentDto.setName(deploymentStatusDto.getComponentName());
				deploymentComponentDto.setComponentType(deploymentStatusDto.getComponentType());
				deploymentComponentDto.setComponentId(deploymentStatusDto.getComponentId());
				deploymentComponentDto.setVersion(deploymentStatusDto.getCurrentVersion());

				if (deploymentComponent == null) {
					deploymentComponent = new ArrayList<>();
				}
				deploymentComponent.add(deploymentComponentDto);
			}
		}
		return deploymentComponent;
	}

	public static List<DeploymentStatusDto> groupUnscheduledStatusListOnSchedulePage(
			Map<String, List<DeploymentHistoryWrapper>> historyMap, List<DeploymentStatusDto> nonScheduledStatusList) {

		List<DeploymentStatusDto> responseStatusList = new ArrayList<>();
		historyMap.forEach((key, value) -> {

			// Search element in the status list

			DeploymentStatusDto latestStatus = nonScheduledStatusList.stream()
					.filter(object -> key.equals(object.getComponentName())).findFirst().orElse(null);

			if (latestStatus != null) {
				DeploymentStatusDto statusDto = new DeploymentStatusDto();

				if (latestStatus != null) {
					statusDto.setId(latestStatus.getId());
					statusDto.setComponentName(latestStatus.getComponentName());
					statusDto.setComponentType(latestStatus.getComponentType());

					statusDto.setLastModifiedOn(latestStatus.getLastModifiedOn());
					statusDto.setLastModifiedBy(latestStatus.getLastModifiedBy());
					statusDto.setStatus(latestStatus.getStatus());
					Set<Integer> scheduledList = new HashSet<>();
					// further once we will get idAndVersionMap
					getVersionSetToSchedule(nonScheduledStatusList, key, scheduledList);
					Map<Integer, Integer> idAndVersionMapToSchedule = getIdAndVersionMapToSchedule(
							nonScheduledStatusList, key);

					statusDto.setIdVersionListToSchedule(GenericMapper.getIdAndVersionList(idAndVersionMapToSchedule));
					statusDto.setLastDeploymentHistory(latestStatus.getLastDeploymentHistory());
					responseStatusList.add(statusDto);
				}
			}

		});
		sortStatusList(responseStatusList);

		return responseStatusList;
	}

	public static List<DeploymentStatusDto> groupUnscheduledStatusListOnStatusPage(
			List<DeploymentStatusDto> unscheduledComponentList) {

		List<DeploymentStatusDto> resultList = new ArrayList<>();
		unscheduledComponentList.forEach(x -> {

			DeploymentStatusDto statusDto = x;

			if (!(resultList.contains(statusDto))) {
				resultList.add(statusDto);
			}

		});
		return resultList;
	}

	private static Set<Integer> getVersionSetToSchedule(List<DeploymentStatusDto> nonScheduledStatusList, String key,
			Set<Integer> scheduledList) {
		nonScheduledStatusList.stream().filter(object -> key.equals(object.getComponentName()))
				.forEach(x -> scheduledList.add(x.getCurrentVersion()));
		return CollectionUtil.sort(scheduledList);
	}

	private static Map<Integer, Integer> getIdAndVersionMapToSchedule(List<DeploymentStatusDto> nonScheduledStatusList,
			String key) {

		Map<Integer, Integer> idAndVersionMapToSchedule = new TreeMap<>(Collections.reverseOrder());

		nonScheduledStatusList.stream().filter(object -> key.equals(object.getComponentName()))
				.forEach(x -> idAndVersionMapToSchedule.put(x.getComponentId(), x.getCurrentVersion()));
		return idAndVersionMapToSchedule;
	}

	public static Set<IdNameVersionTypeWrapper> getScheduledAndDeployedComponentWrapper(Set<Object[]> deployedList) {
		Set<IdNameVersionTypeWrapper> resultList = new HashSet<>();
		deployedList.forEach(each -> {
			Object[] deployedComponentDto = (Object[]) each;
			mapDeployedComponentToDeploymentWrapper(resultList, deployedComponentDto);

		});
		return resultList;
	}

	private static void mapDeployedComponentToDeploymentWrapper(Set<IdNameVersionTypeWrapper> resultList,
			Object[] deployedComponentDto) {

		IdNameVersionTypeWrapper wrapperDto = new IdNameVersionTypeWrapper();

		wrapperDto.setId((Integer) deployedComponentDto[0]);
		wrapperDto.setName((String) deployedComponentDto[1]);
		wrapperDto.setType((String) deployedComponentDto[2]);
		wrapperDto.setVersion((Integer) deployedComponentDto[3]);

		resultList.add(wrapperDto);
	}

	public static Map<Integer, String> userMap(List<SystemUserDto> objList) {
		Map<Integer, String> map = new HashMap<>();
		for (SystemUserDto dto : objList) {
			map.put(dto.getId(), dto.getFirstName() + " " + dto.getLastName());
		}
		return map;
	}
}
