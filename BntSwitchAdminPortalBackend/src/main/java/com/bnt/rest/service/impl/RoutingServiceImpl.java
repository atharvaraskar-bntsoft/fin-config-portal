package com.bnt.rest.service.impl;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import javax.jdo.annotations.Transactional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.bnt.bswitch.shared.lib.entities.CollectionUtil;
import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.HTMLInjectionUtil;
import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.RippsUtility;
import com.bnt.common.util.StreamUtils;
import com.bnt.common.util.exception.DisplayMessageException;
import com.bnt.common.util.exception.RippsAdminRestException;
import com.bnt.constant.ParameterConstant;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.ConfiguredRoutesDto;
import com.bnt.rest.dto.RoutingDto;
import com.bnt.rest.dto.RoutingUiDto;
import com.bnt.rest.dto.RoutingVersionDto;
import com.bnt.rest.dto.RuleConfigurationDto;
import com.bnt.rest.dto.RuleDto;
import com.bnt.rest.dto.RuleListDto;
import com.bnt.rest.entity.ConfiguredRoutes;
import com.bnt.rest.entity.LookupValue;
import com.bnt.rest.entity.Routing;
import com.bnt.rest.entity.RoutingVersion;
import com.bnt.rest.entity.Rule;
import com.bnt.rest.entity.RuleConfiguration;
import com.bnt.rest.jpa.repository.DeploymentComponentPeresistenceHelper;
import com.bnt.rest.jpa.repository.LookupValuePersistenceHelper;
import com.bnt.rest.jpa.repository.RoutingPersistenceHelper;
import com.bnt.rest.jpa.repository.RoutingVersionHelper;
import com.bnt.rest.jpa.repository.RuleConfigurationHelper;
import com.bnt.rest.jpa.repository.RulePersistenceHelper;
import com.bnt.rest.jpa.repository.UserPersistenceHelper;
import com.bnt.rest.repository.LookupValueRepository;
import com.bnt.rest.repository.RoutingRepository;
import com.bnt.rest.service.LookupValueService;
import com.bnt.rest.service.RoutingService;
import com.bnt.rest.wrapper.dto.IdAndNameWrapper;
import com.bnt.rest.wrapper.dto.IdWrapper;
import com.bnt.rest.wrapper.dto.RuleListForUpdateDto;
import com.bnt.rest.wrapper.dto.SelectedRule;
import com.bnt.rest.wrapper.dto.ValueAndTextWrapper;
import com.bnt.service.mapper.RoutingMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class RoutingServiceImpl implements RoutingService {

	private static final String ALREADY_SCHEDULED = "Already scheduled";

	private static final Logger logger = LogManager.getLogger(RoutingServiceImpl.class);

	private static final String SERVICE = "service";

	@Autowired
	RulePersistenceHelper ruleRepo;

	@Autowired
	LookupValueRepository lookUpValueRepo;

	@Autowired
	LookupValuePersistenceHelper lookUpValuePersistenceHelper;

	@Autowired
	LookupValueService lookupValueService;
	@Autowired
	private RoutingPersistenceHelper repo;

	@Autowired
	private RoutingVersionHelper routingVersionRepo;

	@Autowired
	private AuthSessionService authSessionService;

	@Autowired
	private RoutingRepository routingRepo;

	@Autowired
	private RuleConfigurationHelper ruleConfigurationRepo;

	@Autowired
	private DeploymentComponentPeresistenceHelper deploymentComponentPeresistenceHelper;

	@Autowired
	UserPersistenceHelper userPersistenceHelper;

	@Override
	public ResponseWrapper getAllRouting(Map<String, Object> requestParamMap, String routeType) {
		String[] filters = (String[]) requestParamMap.get(ParameterConstant.FILTERS);
		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		ResponseWrapper pageJPAData = null;
		List<Routing> routingList = null;

		Page<Routing> routingPageList = routingRepo.getFilterData(filters, routeType, pageable);
		pageJPAData = JPAUtils.getResponseWrapperByPage(routingPageList, routingPageList.getContent().size());
		routingList = routingPageList.getContent();
		pageJPAData.setContent(getRoutingDto(routingList));
		return pageJPAData;
	}

	private List<RoutingDto> getRoutingDto(List<Routing> routingList) {
		List<RoutingDto> routeRuleDtoList = new ArrayList<>();

		if (routingList != null && !routingList.isEmpty()) {
			for (Routing routing : routingList) {
				RoutingDto routingDto = getRoutingDto(routing);
				List<RoutingVersionDto> versionDtos = new ArrayList<>();
				for (RoutingVersion routingVersion : routing.getRoutingVersion()) {
					RoutingVersionDto routingVersionDto = getRoutingVersionDto(routingVersion);
					routingVersionDto.setSelectedRuleList(getSelectedList(routingVersion.getConfiguredRoutes()));
					versionDtos.add(routingVersionDto);
				}
				routingDto.setRoutingVersion(versionDtos);
				routeRuleDtoList.add(routingDto);
			}
		}

		return routeRuleDtoList;
	}

	private List<SelectedRule> getSelectedList(List<ConfiguredRoutes> list) {
		List<SelectedRule> selectedRuleList = new ArrayList<>();
		for (ConfiguredRoutes configuredRoutes : list) {
			SelectedRule selectedRule = new SelectedRule();
			selectedRule.setName(configuredRoutes.getRuleConfiguration().getRule().getName());
			selectedRule.setDescription(configuredRoutes.getRuleConfiguration().getRule().getDescription());
			selectedRule.setPriority(configuredRoutes.getPriority() + "");
			selectedRule.setVersion(configuredRoutes.getRuleConfiguration().getVersion() + "");
			selectedRuleList.add(selectedRule);
		}
		return selectedRuleList;
	}

	private RoutingDto getRoutingDto(Routing routing) {
		RoutingDto routingDto = new RoutingDto();
		routingDto.setName(routing.getName());
		routingDto.setId(routing.getId());
		routingDto.setRouteDesc(routing.getRouteDesc());
		routingDto.setRoutetype(routing.getRoutetype());
		routingDto.setRoutetypevalue(routing.getRoutetypevalue());
		setServiceId(routing, routingDto);
		return routingDto;
	}

	private void setServiceId(Routing routing, RoutingDto routingDto) {
		if (SERVICE.equals(routing.getRoutetype())) {
			// Fetch Look Up type where name is Service_Type
			routingDto.setServiceTypeId(lookUpValueRepo.getLookUpValueId(routing.getRoutetypevalue()));
		}
	}

	private RoutingVersionDto getRoutingVersionDto(RoutingVersion routingVersion) {
		RoutingVersionDto routingVersionDto = new RoutingVersionDto();
		routingVersionDto.setId(routingVersion.getId());
		routingVersionDto.setVersion(routingVersion.getVersion());
		routingVersionDto.setStatus(routingVersion.getStatus());
		return routingVersionDto;
	}

	@Override
	@Transactional
	public Integer addRouting(RoutingUiDto routingDto, String requestToken, boolean isCommit) {

		Routing routing = setRouting(routingDto);
		RoutingVersion routingVersion = null;
		if (isCommit) {
			routingVersion = setRoutingVersion(routing, 1);
		} else {
			routingVersion = setRoutingVersion(routing, 0);
		}

		List<RoutingVersion> routingVersionsList = new ArrayList<>();
		routingVersionsList.add(routingVersion);
		routingVersion.setConfiguredRoutes(setConfiguredRoutes(routingDto.getRuleList(), routingVersion));
		routing.setRoutingVersion(routingVersionsList);
		return repo.save(routing).getId();

	}

	@Override
	@Transactional
	public Integer addRouting(RoutingDto routingDto) {
		Routing routing = ObjectMapper.map(routingDto, Routing.class);
		return repo.save(routing).getId();
	}

	@Override
	@Transactional
	public Integer updateRouting(String id, RoutingUiDto routingDto, String token, boolean isCommit)
			throws RippsAdminRestException {
		RoutingVersion routingVersion = routingVersionRepo.findById(Integer.parseInt(id)).orElse(null);
		if (null == routingVersion) {
			throw new RippsAdminException("Invalid request with id:.. " + id);
		} else if (routingVersion.getVersion() != 0) {
			return saveNonZeroVersion(isCommit, routingVersion, routingDto);
		} else {
			return saveZeroVersion(isCommit, routingVersion, routingDto);
		}
	}

	@Override
	public ResponseWrapper getRoutingVersionById(String id) {
		RoutingUiDto routingDto = getRoutingVersionUiDto(Integer.parseInt(id));
		ResponseWrapper pageJPAData = new ResponseWrapper();
		pageJPAData.setContent(routingDto);
		return pageJPAData;
	}

	@Override
	public RoutingUiDto getRoutingVersionUiDto(Integer id) {
		RoutingVersion routingVersion = routingVersionRepo.findById(id).orElse(null);
		if (null == routingVersion) {
			throw new RippsAdminException("Invalid request with  id: " + id);
		}
		RoutingUiDto routingDto = new RoutingUiDto();
		routingDto.setRouteName(routingVersion.getRouting().getName());
		routingDto.setRouteDesc(routingVersion.getRouting().getRouteDesc());
		if (routingVersion.getRouting().getRoutetype().equals(SERVICE)) {

			LookupValue service = lookUpValueRepo.getLookUpValue(routingVersion.getRouting().getRoutetypevalue());

			IdAndNameWrapper idAndNameWrapper = new IdAndNameWrapper();
			idAndNameWrapper.setId(service.getId());
			idAndNameWrapper.setName(service.getValue());
			routingDto.setRoutetypevalue(idAndNameWrapper);

		}

		routingDto.setRuletype(routingVersion.getRouting().getRuletype());
		routingDto.setRoutetype(routingVersion.getRouting().getRoutetype());
		List<RuleListForUpdateDto> ruleListDtoList = new ArrayList<>();
		List<Integer> selectedRuleList = new ArrayList<>();
		getSeclectedList(routingVersion, ruleListDtoList, selectedRuleList);
		getUnselectedList(ruleListDtoList, selectedRuleList, routingVersion.getRouting().getRuletype());
		routingDto.setRuleListUpdate(ruleListDtoList);
		return routingDto;
	}

	@Override
	public void getRoutingVersionDtoForExport(List<RoutingVersionDto> routingVersionList) {

		for (RoutingVersionDto versionDto : routingVersionList) {
			versionDto.getConfiguredRoutes().forEach(x -> {
				ConfiguredRoutesDto routeDetail = x;

				if (routeDetail.getRuleConfiguration().getId() != null) {
					RuleConfiguration ruleConfiguration = ruleConfigurationRepo
							.findById(routeDetail.getRuleConfiguration().getId()).get();
					RuleConfigurationDto ruleConfigurationDto = ObjectMapper.mapToDto(ruleConfiguration,
							RuleConfigurationDto.class);
					RoutingMapper.mapConfiguredRouteDto(routeDetail, ruleConfigurationDto, versionDto);
				}
			});
		}
	}

	@Override
	public RoutingUiDto getRoutingVersionUiDtoForImport(Integer id) {
		RoutingVersion routingVersion = routingVersionRepo.findById(id).orElse(null);
		if (null == routingVersion) {
			throw new RippsAdminException(" Invalid request with id: " + id);
		}
		RoutingUiDto routingDto = new RoutingUiDto();
		routingDto.setRouteName(routingVersion.getRouting().getName());
		routingDto.setRouteDesc(routingVersion.getRouting().getRouteDesc());
		if (routingVersion.getRouting().getRoutetype().equals(SERVICE)) {

			LookupValue service = lookUpValueRepo.getLookUpValue(routingVersion.getRouting().getRoutetypevalue());

			IdAndNameWrapper idAndNameWrapper = new IdAndNameWrapper();
			idAndNameWrapper.setId(service.getId());
			idAndNameWrapper.setName(service.getValue());
			routingDto.setRoutetypevalue(idAndNameWrapper);
		}

		routingDto.setRuletype(routingVersion.getRouting().getRuletype());
		routingDto.setRoutetype(routingVersion.getRouting().getRoutetype());
		List<RuleListDto> ruleListDtoList = new ArrayList<>();
		List<Integer> selectedRuleList = new ArrayList<>();
		getSelectedListForAdd(routingVersion, ruleListDtoList, selectedRuleList);
		getSelectedList(routingVersion.getConfiguredRoutes());
		routingDto.setRuleList(ruleListDtoList);
		return routingDto;
	}

	private void getUnselectedList(List<RuleListForUpdateDto> ruleListDtoList, List<Integer> selectedRuleList,
			String ruletype) {
		List<Rule> ruleList = ruleRepo.findByRuleTypeAndActive(ruletype, '1');
		for (Rule rule : ruleList) {
			if (!selectedRuleList.contains(rule.getId())) {
				List<ValueAndTextWrapper> versionList = getVersionList(rule);
				if (!versionList.isEmpty()) {
					RuleListForUpdateDto ruleListDto = new RuleListForUpdateDto();
					ruleListDto.setName(rule.getName());
					ruleListDto.setDescription(rule.getDescription());
					ruleListDto.setVersionList(versionList);
					ruleListDto.setActive(false);
					ruleListDtoList.add(ruleListDto);
				}
			}
		}
	}

	@Override
	@Transactional
	public Integer deleteVersion(int id) {
		RoutingVersion routingVersion = routingVersionRepo.findById(id).orElse(null);
		if (null == routingVersion) {
			throw new RippsAdminException("Invalid request with id:.. " + id);
		}
		logger.info("Find the version for delete");
		int sizeOfVersion = routingVersion.getRouting().getRoutingVersion().size();
		logger.info("Size of version of router : {}", sizeOfVersion);
		routingRepo.deleteVersion(id, routingVersion);
		logger.info("Version deleted : {}", sizeOfVersion);
		if (sizeOfVersion == 1 && routingVersion.getRouting().getRoutingVersion().get(0).getVersion() == 0) {
			repo.deleteById(routingVersion.getRouting().getId());
			logger.info("Only 0 version is available and deleted");
		}
		return 1;
	}

	@Override
	public Integer deleteRouting(int id) {
		boolean flag = isDeployed(Integer.toString(id));
		if (flag) {
			logger.info("Router is Already scheduled for id : {}", id);
			throw new DisplayMessageException("failure", ALREADY_SCHEDULED, HttpStatus.OK);
		} else {
			repo.deleteById(id);
			logger.info("Router have been deleted : {}", id);
			return 1;
		}

	}

	@Override
	@Transactional
	public String updateStatus(String id, boolean ruleActive, String token) {
		if (ruleActive) {
			return saveRoutingStatus(id, ruleActive, token);
		} else {
			boolean flag = isSchedule(id);
			if (flag) {
				throw new DisplayMessageException(ALREADY_SCHEDULED, HttpStatus.OK);
			} else {
				return saveRoutingStatus(id, ruleActive, token);
			}
		}
	}

	@Override
	@Transactional
	public Integer updateRoutingVersionStatus(String id, boolean ruleActive, String token) {
		if (ruleActive) {
			return saveRoutingVersionStatus(id, ruleActive, token);
		} else {
			boolean flag = isSchedule(id);
			if (flag) {
				throw new DisplayMessageException(ALREADY_SCHEDULED, HttpStatus.OK);
			} else {
				return saveRoutingVersionStatus(id, ruleActive, token);
			}
		}
	}

	private boolean isSchedule(String id) {
		boolean flag = false;
		List<Integer> listRoutingVersion = new ArrayList<>();
		listRoutingVersion.add(Integer.parseInt(id));
		List<String> componentTypes = deploymentComponentPeresistenceHelper
				.getComponentTypeListByIdList(listRoutingVersion);
		if (componentTypes != null && !componentTypes.isEmpty())
			return true;
		return flag;
	}

	private boolean isDeployed(String routingId) {
		/**
		 * Fetch routing version IDs using routingId Iterate through routing version IDs
		 * to match in deployment_component table component_id where component_type==
		 * "Router" If found then send TRUE otherwise FALSE
		 */
		boolean flag = false;
		Routing routing = repo.findRoutingById(Integer.parseInt(routingId));
		if (null != routing) {
			List<Integer> listRoutingVersion = routing.getRoutingVersion().stream().map(RoutingVersion::getId).toList();

			List<String> componentTypes = deploymentComponentPeresistenceHelper
					.getComponentTypeListByIdList(listRoutingVersion);
			if (componentTypes != null && !componentTypes.isEmpty())
				return true;
		}
		return flag;
	}

	@Override
	public Integer updateVersionLive(String id, boolean live, String token) {
		RoutingVersion routingVersionLive = routingVersionRepo.findById(Integer.parseInt(id)).orElse(null);
		if (null == routingVersionLive) {
			throw new RippsAdminException("Invalid  request with id: " + id);
		}
		routingVersionLive.setStatus(live);
		routingVersionLive.setUpdatedBy(authSessionService.getCreatedBy());
		routingVersionLive.setUpdatedOn(RippsUtility.getCurrentTime());
		return routingVersionRepo.save(routingVersionLive).getId();
	}

	private Integer saveRoutingVersionStatus(String id, boolean ruleActive, String token) {
		RoutingVersion routingVersionLive = routingVersionRepo.findById(Integer.parseInt(id)).orElse(null);
		if (null == routingVersionLive) {
			throw new RippsAdminException("Invalid   request with id: " + id);
		}
		routingVersionLive.setStatus(ruleActive);
		routingVersionLive.setUpdatedBy(authSessionService.getCreatedBy());
		routingVersionLive.setUpdatedOn(RippsUtility.getCurrentTime());

		return routingVersionRepo.save(routingVersionLive).getId();
	}

	private String saveRoutingStatus(String id, boolean ruleActive, String token) {
		Routing routingLive = repo.findById(Integer.parseInt(id)).orElse(null);
		if (null == routingLive) {
			throw new RippsAdminException("Invalid request with id: " + id);
		}
		routingLive.setRuleActive(ruleActive);
		routingLive.setUpdatedBy(authSessionService.getCreatedBy());
		routingLive.setUpdatedOn(RippsUtility.getCurrentTime());
		repo.save(routingLive);
		return routingLive.getName();
	}

	private void getSeclectedList(RoutingVersion routingVersion, List<RuleListForUpdateDto> ruleListDtoList,
			List<Integer> selectedRuleList) {
		for (ConfiguredRoutes configuredRoutes : routingVersion.getConfiguredRoutes()) {
			RuleListForUpdateDto ruleListDto = new RuleListForUpdateDto();
			RuleConfiguration configuration = configuredRoutes.getRuleConfiguration();
			selectedRuleList.add(configuration.getRule().getId());
			ruleListDto.setName(configuration.getRule().getName());
			ruleListDto.setDescription(configuration.getRule().getDescription());

			ruleListDto.setVersionList(getVersionList(configuration.getRule()));

			ruleListDto.setLiveVersion(configuration.getId().toString());
			ruleListDto.setPriority(configuredRoutes.getPriority().toString());
			ruleListDto.setActive(true);
			ruleListDtoList.add(ruleListDto);
		}
	}

	private void getSelectedListForAdd(RoutingVersion routingVersion, List<RuleListDto> ruleListDtoList,
			List<Integer> selectedRuleList) {
		for (ConfiguredRoutes configuredRoutes : routingVersion.getConfiguredRoutes()) {
			RuleListDto ruleListDto = new RuleListDto();
			RuleConfiguration configuration = configuredRoutes.getRuleConfiguration();
			selectedRuleList.add(configuration.getRule().getId());
			ruleListDto.setPriority(configuredRoutes.getPriority());
			ruleListDto.setActive(true);
			ruleListDto.setVersion(new ValueAndTextWrapper("1", configuration.getRule().getDescription()));
			ruleListDto.setActive(true);
			ruleListDtoList.add(ruleListDto);
		}
	}

	private List<ValueAndTextWrapper> getVersionList(Rule rule) {
		List<RuleConfiguration> configurationsList = ruleConfigurationRepo.findByRule(rule);
		List<ValueAndTextWrapper> versionList = new ArrayList<>();
		for (RuleConfiguration ruleConfiguration : configurationsList) {
			if (ruleConfiguration.getVersion() != 0) {
				ValueAndTextWrapper wrapper = new ValueAndTextWrapper();
				// Workaround until rule until DROOL depreciate
				wrapper.setValue(ruleConfiguration.getId().toString());
				wrapper.setText(ruleConfiguration.getVersion().toString());

				versionList.add(wrapper);
			}
		}
		return versionList;
	}

	private Integer saveZeroVersion(boolean isCommit, RoutingVersion routingVersion, RoutingUiDto routingDto)
			throws RippsAdminRestException {
		Routing routing = new Routing();
		routing.setId(routingVersion.getRouting().getId());
		routingRepo.deleteConfiguredRoutes(routingVersion);
		if (isCommit) {
			routingVersion.setConfiguredRoutes(setConfiguredRoutes(routingDto.getRuleList(), routingVersion));
			routingVersion.setVersion(routingVersionRepo.findMax(routing.getId()));
			return routingVersionRepo.save(routingVersion).getId();
		} else {
			routingVersion.setConfiguredRoutes(setConfiguredRoutes(routingDto.getRuleList(), routingVersion));
			return routingVersionRepo.save(routingVersion).getId();
		}

	}

	private Integer saveNonZeroVersion(boolean isCommit, RoutingVersion routingVersion, RoutingUiDto routingDto)
			throws RippsAdminRestException {
		RoutingVersion routingVersion1 = null;
		if (isCommit) {
			routingVersion1 = setRoutingVersion(routingVersion.getRouting(),
					routingVersionRepo.findMax(routingVersion.getRouting().getId()));
			routingVersion1.setConfiguredRoutes(setConfiguredRoutes(routingDto.getRuleList(), routingVersion1));
			return routingVersionRepo.save(routingVersion1).getId();
		} else {
			Integer minVal = routingVersionRepo.findMin(routingVersion.getRouting().getId());

			if (minVal == 0) {
				RoutingVersion routingVersion0 = routingVersionRepo
						.findRoutingVersionByRoutingAndVersion(routingVersion.getRouting(), 0);
				routingRepo.deleteConfiguredRoutes(routingVersion0);
				routingVersion0.setConfiguredRoutes(setConfiguredRoutes(routingDto.getRuleList(), routingVersion0));
				return routingVersionRepo.save(routingVersion0).getId();
			} else {
				routingRepo.deleteConfiguredRoutes(routingVersion);
				routingVersion.setConfiguredRoutes(setConfiguredRoutes(routingDto.getRuleList(), routingVersion));
				return routingVersionRepo.save(routingVersion).getId();
			}
		}
	}

	private Routing setRouting(RoutingUiDto routingDto) {
		Routing routing = new Routing();
		routing.setName(HTMLInjectionUtil.validateHTMLInjection(routingDto.getRouteName()));
		routing.setRouteDesc(HTMLInjectionUtil.validateHTMLInjection(routingDto.getRouteDesc()));
		routing.setRuleActive(true);
		routing.setRoutetype(HTMLInjectionUtil.validateHTMLInjection(routingDto.getRoutetype()));
		routing.setRuletype(HTMLInjectionUtil.validateHTMLInjection(routingDto.getRuletype()));
		routing.setCreatedBy(authSessionService.getCreatedBy());
		routing.setCreatedOn(RippsUtility.getCurrentTime());
		if (SERVICE.equals(routing.getRoutetype())) {
			// Fetch Look Up type where name is Service_Type
			routing.setRoutetypevalue(
					HTMLInjectionUtil.validateHTMLInjection(routingDto.getRoutetypevalue().getName()));
		}
		return routing;
	}

	private RoutingVersion setRoutingVersion(Routing routing, Integer version) {
		RoutingVersion routingVersion = new RoutingVersion();
		routingVersion.setRouting(routing);
		routingVersion.setStatus(true);
		routingVersion.setVersion(version);
		routingVersion.setCreatedBy(authSessionService.getCreatedBy());
		routingVersion.setCreatedOn(RippsUtility.getCurrentTime());
		return routingVersion;
	}

	private List<ConfiguredRoutes> setConfiguredRoutes(List<RuleListDto> ruleListDto, RoutingVersion routingVersion6)
			throws RippsAdminRestException {
		List<ConfiguredRoutes> configuredRoutesList = new ArrayList<>();
		for (RuleListDto ruleDto : ruleListDto) {
			if (ruleDto.getActive() && ruleDto.getVersion() != null
					&& Integer.parseInt(ruleDto.getVersion().getValue()) > 0 && ruleDto.getPriority() > 0) {
				ConfiguredRoutes configuredRoutes = new ConfiguredRoutes();
				configuredRoutes.setRoutingVersion(routingVersion6);
				configuredRoutes.setPriority(ruleDto.getPriority());
				if (ruleDto.getVersion().getValue() == null || ruleDto.getVersion().getValue().equalsIgnoreCase("")) {
					throw new RippsAdminRestException("Please select version", HttpStatus.OK);
				} else {
					RuleConfiguration ruleConfiguration = ruleConfigurationRepo
							.findById(Integer.parseInt(ruleDto.getVersion().getValue())).orElse(null);
					if (RippsUtility.isNotNull(ruleConfiguration)) {
						configuredRoutes.setRuleConfiguration(ruleConfiguration);
					} else {
						logger.debug("Route rule configuration data is null");
						throw new RippsAdminRestException("Route rule configuration data is null ", HttpStatus.OK);
					}
				}
				configuredRoutes.setCreatedBy(authSessionService.getCreatedBy());
				configuredRoutes.setCreatedOn(RippsUtility.getCurrentTime());
				configuredRoutesList.add(configuredRoutes);
			}
		}
		if (configuredRoutesList.isEmpty()) {
			throw new RippsAdminRestException("Please select atleast one rule", HttpStatus.OK);
		}
		return configuredRoutesList;
	}

	public Map<String, Object> getServicesForFilter() {
		Map<String, Object> map = new HashMap<>();
		List<IdAndNameWrapper> multihopServiceWrapperDtoList = lookupValueService.getServicesList();

		map.put(SERVICE, multihopServiceWrapperDtoList);
		return map;
	}

	@Override
	public List<RoutingVersionDto> getRoutingVersionNotInDeployedComponent() {
		return ObjectMapper.mapListObjectToListDto(routingRepo.findAllNotinDeployedComponent(),
				RoutingVersionDto.class);

	}

	@Override
	public List<RoutingVersionDto> getRoutingVersionNotInDeployedComponentNew() {
		List<RoutingVersionDto> routingVersionDtoList = new ArrayList<>();
		List<Object[]> result = routingRepo.findAllNotinDeployedComponentNew();
		if (result != null && !result.isEmpty()) {
			RoutingVersionDto routingVersionDto = null;
			RoutingDto routingDto = null;
			for (Object[] data : result) {
				routingVersionDto = new RoutingVersionDto();
				routingDto = new RoutingDto();
				routingVersionDto.setId((Integer) data[0]);
				routingDto.setName((String) data[1]);
				routingDto.setRuletype((String) data[2]);
				routingVersionDto.setVersion((Integer) data[3]);
				routingVersionDto.setStatus((Boolean) data[4]);
				routingVersionDto.setCreatedBy((Integer) data[5]);
				routingVersionDto.setCreatedOn((Timestamp) data[6]);
				routingVersionDto.setUpdatedBy((Integer) data[7]);
				routingVersionDto.setUpdatedOn((Timestamp) data[8]);
				routingVersionDto.setRouting(routingDto);
				routingVersionDtoList.add(routingVersionDto);
			}
		}
		return routingVersionDtoList;
	}

	@Override
	@Transactional
	public Integer importRouting(RoutingDto dtoObject) {
		dtoObject.setId(null);
		try {
			if (dtoObject.getRoutingVersion() != null) {
				importRuleAndRoutingData(dtoObject);
				return 1;
			}
		} catch (Exception e) {
			logger.error(e);
		}
		return 0;
	}

	private void importRuleAndRoutingData(RoutingDto routingDto) {

		Routing existingRouting;
		Routing routing;
		try {
			existingRouting = repo.findRoutingByName(routingDto.getName());
			if (existingRouting != null) {
				routingDto.setId(existingRouting.getId());
			}
			int index = 0;
			Set<Integer> ruleConfigIdsAdded = null;
			for (RoutingVersionDto routingVersionDto : routingDto.getRoutingVersion()) {
				routingVersionDto.setRouting(routingDto);
				setRoutingVersionData(routingVersionDto, index);

				ruleConfigIdsAdded = importRule(routingVersionDto);
				routingVersionDto.setId(null);
				setConfiguredRoute(routingVersionDto, ruleConfigIdsAdded);
				index++;
			}
			routing = ObjectMapper.mapToEntity(routingDto, Routing.class);
			repo.save(routing);
		} catch (Exception e) {
			logger.error(e);
		}
	}

	public void setConfiguredRoute(RoutingVersionDto routingVersionDto, Set<Integer> ruleConfigIdsAdded) {
		List<ConfiguredRoutesDto> configuredRoutes = new ArrayList<>();
		ConfiguredRoutesDto configuredRoute = null;
		IdWrapper ruleWrapper = null;

		IdWrapper versionWrapper = null;

		for (Integer eachId : ruleConfigIdsAdded) {
			configuredRoute = new ConfiguredRoutesDto();
			configuredRoute.setPriority(1);
			ruleWrapper = new IdWrapper();
			ruleWrapper.setId(eachId);
			configuredRoute.setRuleConfiguration(ruleWrapper);
			versionWrapper = new IdWrapper();
			versionWrapper.setId(routingVersionDto.getId());

			configuredRoute.setRoutingVersion(versionWrapper);
			configuredRoutes.add(configuredRoute);
		}
		routingVersionDto.setConfiguredRoutes(configuredRoutes);
	}

	private void setRoutingVersionData(RoutingVersionDto routingVersionDto, int index) {
		Integer maxRoutingVersion = null;
		Integer routingVersion = null;
		if (routingVersionDto.getRouting().getId() != null) {
			try {
				maxRoutingVersion = routingVersionRepo.findMax(routingVersionDto.getRouting().getName());
				if (maxRoutingVersion != null) {
					routingVersion = maxRoutingVersion + index;
				} else {
					routingVersion = 1;
				}
			} catch (Exception e) {
				logger.error(e);
			}
		} else {
			routingVersion = index + 1;
		}
		routingVersionDto.setVersion(routingVersion);
	}

	private Set<Integer> importRule(RoutingVersionDto routingVersionDto) {
		Rule existingRule;
		Set<Integer> existingRuleConfigIds = new HashSet<>();
		Set<Integer> ruleConfigIds;
		Rule updatedRule = null;
		Set<Integer> ruleConfigIdsAdded = new HashSet<>();
		for (ConfiguredRoutesDto eachRouteMapper : routingVersionDto.getConfiguredRoutes()) {
			eachRouteMapper.setId(null);

			RuleDto ruleDto = RoutingMapper.getRule(eachRouteMapper.getRouteWrapper());
			logger.info("Before config list size :{}", ruleDto.getRuleConfiguration().size());
			existingRule = ruleRepo.findRuleByName(ruleDto.getName());
			logger.info("After config list size :{}", ruleDto.getRuleConfiguration().size());
			if (existingRule != null) {
				ruleDto.setId(existingRule.getId());
			}
			setRuleConfigData(ruleDto, eachRouteMapper);
			if (existingRule == null) {
				updatedRule = ruleRepo.save(ObjectMapper.mapToEntity(ruleDto, Rule.class));
				Set<Integer> eachRuleConfigIdsAdded = updatedRule.getRuleConfiguration().stream().map(x -> x.getId())
						.collect(Collectors.toSet());
				if (!(CollectionUtil.isCollectionEmptyOrNull(eachRuleConfigIdsAdded))) {
					ruleConfigIdsAdded.addAll(eachRuleConfigIdsAdded);
				}
			} else {

				Set<Integer> eachExistingRuleConfigIds = existingRule.getRuleConfiguration().stream()
						.map(x -> x.getId()).collect(Collectors.toSet());
				existingRuleConfigIds.addAll(eachExistingRuleConfigIds);
				/**
				 * if(!(CollectionUtil.isCollectionEmptyOrNull(eachExistingRuleConfigIds))) {
				 * 
				 * }
				 */
				updatedRule = ruleRepo.save(ObjectMapper.mapToEntity(ruleDto, Rule.class));

				ruleConfigIds = updatedRule.getRuleConfiguration().stream().map(x -> x.getId())
						.collect(Collectors.toSet());
				Set<Integer> eachRuleConfigIdsAdded = StreamUtils.disjointSet(ruleConfigIds, existingRuleConfigIds);
				ruleConfigIdsAdded.addAll(eachRuleConfigIdsAdded);
			}
		}
		return ruleConfigIdsAdded;
	}

	private void setRuleConfigData(RuleDto ruleDto, ConfiguredRoutesDto eachRouteMapper) {
		int index = 0;
		logger.info("Inside setRuleConfigData:{}", eachRouteMapper);
		for (RuleConfigurationDto ruleConfigDto : ruleDto.getRuleConfiguration()) {
			setRuleConfigVersionData(ruleConfigDto, index);
		}
	}

	private void setRuleConfigVersionData(RuleConfigurationDto ruleConfigDto, int index) {
		Integer maxRuleConfigVersion = null;
		Integer version = null;
		if (ruleConfigDto.getRule().getId() != null) {

			try {
				maxRuleConfigVersion = ruleConfigurationRepo.findMax(ruleConfigDto.getRule().getName());
				if (maxRuleConfigVersion != null) {
					version = maxRuleConfigVersion + index;
				} else {
					version = 1;
				}
			} catch (Exception e) {
				logger.error(e);
			}
		} else {
			version = index + 1;
		}
		ruleConfigDto.setId(null);
		ruleConfigDto.setVersion(version);
	}
}
