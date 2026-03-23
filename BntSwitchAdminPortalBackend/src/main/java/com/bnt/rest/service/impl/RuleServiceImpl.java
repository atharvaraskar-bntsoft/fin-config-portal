package com.bnt.rest.service.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.CollectionUtil;
import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.RippsUtility;
import com.bnt.common.util.StringUtil;
import com.bnt.common.util.exception.CommonException;
import com.bnt.common.util.exception.DisplayMessageException;
import com.bnt.constant.ParameterConstant;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.IdAndNameStringWrapper;
import com.bnt.rest.dto.RuleConfigurationDto;
import com.bnt.rest.dto.RuleDto;
import com.bnt.rest.entity.AuthSession;
import com.bnt.rest.entity.ConfiguredRoutes;
import com.bnt.rest.entity.DroolRuleApi;
import com.bnt.rest.entity.DroolRuleParameter;
import com.bnt.rest.entity.Rule;
import com.bnt.rest.entity.RuleConfiguration;
import com.bnt.rest.jpa.repository.ConfiguredRoutesHelper;
import com.bnt.rest.jpa.repository.DroolRuleApiHelper;
import com.bnt.rest.jpa.repository.DroolRuleWebuiHelper;
import com.bnt.rest.jpa.repository.RuleConfigurationHelper;
import com.bnt.rest.jpa.repository.RulePersistenceHelper;
import com.bnt.rest.service.impl.AuthSessionService;
import com.bnt.rest.repository.RuleRepository;
import com.bnt.rest.service.impl.ListService;
import com.bnt.rest.service.ProcessorAdapterService;
import com.bnt.rest.service.RuleService;
import com.bnt.rest.wrapper.dto.ConditionDto;
import com.bnt.rest.wrapper.dto.IdAndNameWrapper;
import com.bnt.rest.wrapper.dto.InputFields;
import com.bnt.rest.wrapper.dto.Output;
import com.bnt.ruleengine.ParentDto;
import com.bnt.ruleengine.RuleEngineUtility;
import com.bnt.ruleengine.RuleExtDto;
import com.bnt.service.mapper.TagsMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class RuleServiceImpl implements RuleService {

	private static final Logger log = LogManager.getLogger(RuleServiceImpl.class.getName());

	@Autowired
	private RulePersistenceHelper rulePersistanceHelper;

	@Autowired
	private AuthSessionService authSessionService;

	@Autowired
	private ProcessorAdapterService processorAdapterService;

	@Autowired
	private RuleConfigurationHelper ruleConfigurationHelper;

	@Autowired
	private ConfiguredRoutesHelper configuredRoutesHelper;

	@Autowired
	private RuleRepository ruleRepository;

	@Autowired
	private DroolRuleApiHelper droolRuleApiHelper;

	@Autowired
	private DroolRuleWebuiHelper droolRuleWebuiHelper;

	@Autowired
	private ListService listService;

	@Override
	public ResponseWrapper getRules(Map<String, Object> requestParamMap) {
		String ruleType = (String) requestParamMap.get("ruletype");
		log.info("Fetching data from RULE table");
		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		String[] filters = (String[]) requestParamMap.get(ParameterConstant.FILTERS);

		Page<Rule> rulePageList = null;
		if (filters == null) {
			rulePageList = rulePersistanceHelper.findByRuleType(ruleType, pageable);
		} else {
			rulePageList = ruleRepository.getFilterData(filters, ruleType, pageable);
		}
		List<RuleExtDto> ruleExtDto = populateRuleDto(rulePageList.getContent());
		ResponseWrapper pageJPAData = JPAUtils.getResponseWrapperByPage(rulePageList, rulePageList.getContent().size());
		prepareRuleDto(ruleExtDto);
		pageJPAData.setContent(ruleExtDto);
		return pageJPAData;
	}

	private List<RuleExtDto> populateRuleDto(List<Rule> ruleList) {
		return ruleList.stream().map(rule -> {
			RuleExtDto ruleExtDto = new RuleExtDto();
			ruleExtDto.setId(rule.getId());
			ruleExtDto.setName(rule.getName());
			ruleExtDto.setActive(rule.getActive());
			ruleExtDto.setDescription(rule.getDescription());
			ruleExtDto.setRuleType(rule.getRuleType());
			List<RuleConfigurationDto> rcd = ObjectMapper.mapListObjects(rule.getRuleConfiguration(),
					RuleConfigurationDto.class);
			ruleExtDto.setRuleConfiguration(rcd);
			List<ConfiguredRoutes> configuredRoutesList = configuredRoutesHelper
					.findByRuleConfigurationIn(rule.getRuleConfiguration());
			if (null != configuredRoutesList) {
				configuredRoutesList.stream().map(cr -> {
					ruleExtDto.setRouterName(cr.getRoutingVersion().getRouting().getName());
					ruleExtDto.setRouterStatus(cr.getRoutingVersion().getStatus());
					ruleExtDto.setRouterVersion(cr.getRoutingVersion().getVersion());
					return ruleExtDto;
				});
			}
			return ruleExtDto;
		}).toList();

	}

	@Override
	public ResponseWrapper getRuleById(String id) {
		log.info("Fetching RuleByID: " + id);
		Optional<RuleConfiguration> optRuleConfiguration = ruleConfigurationHelper.findById(Integer.parseInt(id));
		ParentDto finalDto = null;

		if (optRuleConfiguration.isPresent()) {
			String samplejson = optRuleConfiguration.get().getJson();
			finalDto = RuleEngineUtility.mapJsonToParentDto(samplejson);
		}
		if (RippsUtility.isNotNull(finalDto)) {
			ResponseWrapper pageJPAData = new ResponseWrapper();
			pageJPAData.setContent(finalDto);
			return pageJPAData;
		} else {
			throw new DisplayMessageException("Id not found", HttpStatus.OK);
		}

	}

	/**
	 * @param ruleDtoList
	 */
	private void prepareRuleDto(List<RuleExtDto> ruleDtoList) {
		for (RuleExtDto ruleDto : ruleDtoList) {
			List<RuleConfigurationDto> ruleConfigurationDtoList = ruleDto.getRuleConfiguration();
			int size = ruleConfigurationDtoList.size();
			List<RuleConfigurationDto> updatedList = new ArrayList<>();
			innerPrepDto(ruleDto, size, updatedList);
			ruleDto.setRuleConfiguration(updatedList);
		}
	}

	private void innerPrepDto(RuleExtDto ruleDto, int size, List<RuleConfigurationDto> updatedList) {
		for (RuleConfigurationDto RuleConfiguration : ruleDto.getRuleConfiguration()) {
			RuleConfiguration.setDestination(
					RuleEngineUtility.convertListToStringWithComma(getDestination(RuleConfiguration.getDestination())));
			updatedList.add(RuleConfiguration);
		}
		int i = 0;
		for (RuleConfigurationDto RuleConfiguration : ruleDto.getRuleConfiguration()) {
			if (size > i) {
				updatedList.set(i, RuleConfiguration);
				i++;
			}
		}
		ruleDto.setZeroVersion(false);
	}

	private List<IdAndNameWrapper> getDestination(String value) {
		List<IdAndNameWrapper> destinationList = new ArrayList<>();
		String[] destinationArray = value.split(",");
		Map<String, String> destinationMap = getDestinationMap();

		for (String des : destinationArray) {
			IdAndNameWrapper idAndNameWrapper = new IdAndNameWrapper();
			idAndNameWrapper.setId(Integer.parseInt(des));
			idAndNameWrapper.setName(destinationMap.get(des));
			destinationList.add(idAndNameWrapper);
		}

		return destinationList;
	}

	private List<IdAndNameWrapper> getWorkflowDestination(String value) {
		return Stream.of(value.split(",")).map(des -> new IdAndNameWrapper(Integer.parseInt(des), "WorkflowID" + des))
				.toList();
	}

	private Map<String, String> getDestinationMap() {
		return processorAdapterService.findAll().stream()
				.collect(Collectors.toMap(IdAndNameStringWrapper::getId, IdAndNameStringWrapper::getName));
	}

	@Override
	@Transactional
	public Integer addRule(ParentDto parentDto, String token) {
		String json = RuleEngineUtility.getJson(parentDto);
		log.info("Convert dto to json");
		String destinationStr = RuleEngineUtility.convertListToStringWithComma(parentDto.getDestinations());
		RuleDto ruleDto = mapParentDtoToRuleDto(parentDto);
		if (parentDto.isCommit()) {
			mapRuleConfiguration(destinationStr, ruleDto, 1, json, parentDto);
		} else {
			mapRuleConfiguration(destinationStr, ruleDto, 0, json, parentDto);
		}
		Rule rule = ObjectMapper.map(ruleDto, Rule.class);
		if (rule.getDescription() == null) {
			rule.setDescription("");
		}
		rule.setActive('1');
		rule.setCreatedBy(authSessionService.getCreatedBy());
		rule.setCreatedOn(RippsUtility.getCurrentTimeStamp());

		for (RuleConfiguration eachConfig : rule.getRuleConfiguration()) {
			eachConfig.setRule(rule);
			eachConfig.setActive('1');
		}

		rulePersistanceHelper.save(rule);

		log.info("Rule persisted");
		return 1;
	}

	private RuleDto mapParentDtoToRuleDto(ParentDto parentDto) {
		RuleDto ruleDto = new RuleDto();
		boolean validName = ruleRepository.validateName(parentDto.getName());
		if (!validName) {
			throw new RippsAdminException("Name already exist");
		}
		ruleDto.setName(parentDto.getName());
		ruleDto.setDescription(parentDto.getDescription());

		ruleDto.setActive(RippsUtility.convertBooleanToActive(parentDto.isActive()));

		ruleDto.setRuleType(parentDto.getRuleType());
		ruleDto.setCreatedBy(authSessionService.getCreatedBy());
		ruleDto.setCreatedOn(RippsUtility.getCurrentTimeStamp());
		return ruleDto;
	}

	private void mapRuleConfiguration(String destinations, RuleDto ruleDto, Integer version, String json,
			ParentDto parentDto) {
		List<RuleConfigurationDto> ruleConfigurationDtoList = new ArrayList<>();
		RuleConfigurationDto ruleConfigurationDto = new RuleConfigurationDto();
		ruleConfigurationDto.setCreatedBy(authSessionService.getCreatedBy());
		ruleConfigurationDto.setCreatedOn(RippsUtility.getCurrentTimeStamp());
		ruleConfigurationDto.setDestination(destinations);
		ruleConfigurationDto.setVersion(version);

		ruleConfigurationDto
				.setRuleJson(TagsMapper.getConditionalDecisionRuleFromConditionString(parentDto.getCondition()));

		ruleConfigurationDto.setVerified(1);
		ruleConfigurationDto.setJson(json);

		ruleConfigurationDto.setRule(ruleDto);
		ruleConfigurationDtoList.add(ruleConfigurationDto);
		ruleDto.setRuleConfiguration(ruleConfigurationDtoList);
	}

	@Override
	@Transactional
	public Integer updateRuleStatus(String id, ParentDto parentDto, String token) {
		String json = RippsUtility.getJson(parentDto);
		Optional<RuleConfiguration> optRuleConfiguration = ruleConfigurationHelper.findById(Integer.parseInt(id));
		RuleConfiguration ruleConfiguration = (optRuleConfiguration.isPresent()) ? optRuleConfiguration.get() : null;
		if (null == ruleConfiguration)
			return 0;
		if (parentDto.getName() == null) {
			return updateStatus(ruleConfiguration, ruleConfiguration.getRule().getId().toString(), parentDto);
		} else {
			String destinationString = RippsUtility.convertListToStringWithComma(parentDto.getDestinations());
			if (parentDto.isCommit()) {
				return createNewVersion(parentDto, ruleConfiguration, destinationString, json);
			} else {
				updateRule(parentDto, ruleConfiguration, destinationString, json);
			}
			Integer ruleid = ruleConfigurationHelper.save(ruleConfiguration).getId();
			log.info("Update route rule configuration " + ruleid);
			return 1;
		}

	}

	@Override
	@Transactional
	public Integer updateRule(String id, ParentDto parentDto, String token) {
		String json = RippsUtility.getJson(parentDto);

		Optional<RuleConfiguration> optRuleConfiguration = ruleConfigurationHelper.findById(Integer.parseInt(id));
		RuleConfiguration ruleConfiguration = (optRuleConfiguration.isPresent()) ? optRuleConfiguration.get() : null;
		if (null == ruleConfiguration)
			return 0;
		if (parentDto.getName() == null) {
			if (ruleConfiguration.getVersion() > 0) {
				throw new RippsAdminException("Changes not allowed for versioned record");
			}
			return updateStatus(ruleConfiguration, ruleConfiguration.getRule().getId().toString(), parentDto);
		} else {
			return updateRule1(parentDto, json, ruleConfiguration);
		}
	}

	private Integer updateRule1(ParentDto parentDto, String json, RuleConfiguration ruleConfiguration) {
		String destinationString = RippsUtility.convertListToStringWithComma(parentDto.getDestinations());
		if (parentDto.isCommit()) {
			log.info("Going to publish record");
			if (ruleConfiguration.getVersion() == 0) {
				ruleConfiguration.setVersion(ruleConfigurationHelper.findMax(ruleConfiguration.getRule().getId()));
				updateRule(parentDto, ruleConfiguration, destinationString, json);
			} else {
				RuleConfiguration existingDraft = ruleConfigurationHelper
						.getConfigurationForVersion(ruleConfiguration.getRule().getId(), 0);
				if (existingDraft == null) {
					return createNewVersion(parentDto, ruleConfiguration, destinationString, json);
				} else {
					ruleConfiguration = existingDraft;
					ruleConfiguration.setVersion(ruleConfigurationHelper.findMax(ruleConfiguration.getRule().getId()));
					updateRule(parentDto, ruleConfiguration, destinationString, json);
				}
			}
		} else {
			log.info("Going to draft record");
			if (ruleConfiguration.getVersion() == 0) {
				updateRule(parentDto, ruleConfiguration, destinationString, json);
			} else {
				RuleConfiguration existingDraft = ruleConfigurationHelper
						.getConfigurationForVersion(ruleConfiguration.getRule().getId(), 0);
				if (existingDraft == null) {
					return createNewVersion(parentDto, ruleConfiguration, destinationString, json);
				} else {
					ruleConfiguration = existingDraft;
					updateRule(parentDto, ruleConfiguration, destinationString, json);
				}
			}
		}
		Integer ruleid = ruleConfigurationHelper.save(ruleConfiguration).getId();
		log.info("Update route rule configuration " + ruleid);
		return 1;
	}

	private void updateRule(ParentDto parentDto, RuleConfiguration dbRuleConfiguration, String destinationString,
			String json) {
		if (parentDto.isCommit()) {
			dbRuleConfiguration.setCreatedOn(RippsUtility.getCurrentTimeStamp());
		}
		dbRuleConfiguration.setUpdatedBy(authSessionService.getCreatedBy());
		dbRuleConfiguration.setUpdatedOn(RippsUtility.getCurrentTimeStamp());
		dbRuleConfiguration.setDestination(destinationString);
		dbRuleConfiguration
				.setRuleJson(TagsMapper.getConditionalDecisionRuleFromConditionString(parentDto.getCondition()));

		dbRuleConfiguration.setJson(json);
		dbRuleConfiguration.setVerified(0);
		Optional<Rule> optRule = rulePersistanceHelper.findById(dbRuleConfiguration.getRule().getId());
		Rule rule = (optRule.isPresent()) ? optRule.get() : null;
		if (rule != null) {
			rule.setActive(RippsUtility.convertBooleanToActive(parentDto.isActive()));

			rule.setUpdatedBy(authSessionService.getCreatedBy());
			rule.setUpdatedOn(RippsUtility.getCurrentTime());
			rule.setName(parentDto.getName());
			rule.setDescription(parentDto.getDescription());
			rule.setActive(RippsUtility.convertBooleanToActive(parentDto.isActive()));
			dbRuleConfiguration.setRule(rule);
			rulePersistanceHelper.save(rule);
			log.info("Data has been updated for rule");
		}
	}

	private Integer createNewVersion(ParentDto parentDto, RuleConfiguration configureRule1, String destinationString,
			String json) {
		RuleConfiguration configureRule = new RuleConfiguration();
		configureRule.setRule(configureRule1.getRule());
		configureRule.setUpdatedBy(authSessionService.getCreatedBy());
		configureRule.setUpdatedOn(RippsUtility.getCurrentTimeStamp());
		configureRule.setCreatedBy(authSessionService.getCreatedBy());
		configureRule.setCreatedOn(RippsUtility.getCurrentTimeStamp());
		configureRule.setDestination(destinationString);
		configureRule.setRuleJson(TagsMapper.getConditionalDecisionRuleFromConditionString(parentDto.getCondition()));

		configureRule.setJson(json);
		configureRule.setVerified(0);
		configureRule.setActive('1');
		if (parentDto.isCommit()) {
			configureRule.setVersion(ruleConfigurationHelper.findMax(configureRule1.getRule().getId()));
		} else {
			configureRule.setVersion(0);
		}

		boolean flag = checkStatus(parentDto.isActive(), configureRule1.getRule().getActive());
		if (flag) {
			boolean flag1 = isScheduleForLatest(configureRule1);
			if (flag1) {
				log.info("Already configured with router :" + configureRule1.getId());
				throw new DisplayMessageException("Already configured with Router", HttpStatus.ALREADY_REPORTED);
			} else {
				Optional<Rule> optRule = rulePersistanceHelper.findById(configureRule1.getRule().getId());
				if (optRule.isPresent()) {
					Rule rule = optRule.get();
					rule.setActive(RippsUtility.convertBooleanToActive(parentDto.isActive()));

					rule.setUpdatedBy(authSessionService.getCreatedBy());
					rule.setUpdatedOn(RippsUtility.getCurrentTime());

					rulePersistanceHelper.save(rule);
					log.info("Data has been updated for rule");
				}
			}
		} else {
			Optional<Rule> optRule = rulePersistanceHelper.findById(configureRule1.getRule().getId());
			if (optRule.isPresent()) {
				Rule rule = optRule.get();
				log.info("Status has changed of route rule");
				rule.setActive(RippsUtility.convertBooleanToActive(parentDto.isActive()));

				rule.setUpdatedBy(authSessionService.getCreatedBy());
				rule.setUpdatedOn(RippsUtility.getCurrentTime());
				rulePersistanceHelper.save(rule);
				log.info("Data has been updated for rule2");
			}
		}

		Integer ruleid = ruleConfigurationHelper.save(configureRule).getId();
		log.info("Update rule configuration " + ruleid);
		return 1;
	}

	private boolean isScheduleForLatest(RuleConfiguration configuration) {
		boolean flag = false;
		List<ConfiguredRoutes> configuredRoutesList = configuredRoutesHelper.findByRuleConfiguration(configuration);
		for (ConfiguredRoutes configuredRoutes : configuredRoutesList) {
			if (configuredRoutes.getRoutingVersion().getStatus()) {
				flag = true;
			}
		}
		return flag;
	}

	private Integer updateStatus(RuleConfiguration ruleConfiguration, String id, ParentDto routeRuleUiDto) {
		ParentDto finalDto = null;
		com.fasterxml.jackson.databind.ObjectMapper object = new com.fasterxml.jackson.databind.ObjectMapper();
		try {
			finalDto = object.readValue(ruleConfiguration.getJson(), ParentDto.class);
			finalDto.setActive(routeRuleUiDto.isActive());
			String json = RuleEngineUtility.getJson(finalDto);
			ruleConfiguration.setJson(json);
			ruleConfigurationHelper.save(ruleConfiguration);
			Optional<Rule> optRouteRule = rulePersistanceHelper.findById(Integer.parseInt(id));
			List<RuleConfiguration> ruleConfigurationList = new ArrayList<>();
			ruleConfigurationList.add(ruleConfiguration);
			optRouteRule.ifPresent(routeRule -> {
				routeRule.setActive(RippsUtility.convertBooleanToActive(routeRuleUiDto.isActive()));

				routeRule.setUpdatedBy(authSessionService.getCreatedBy());
				routeRule.setUpdatedOn(RippsUtility.getCurrentTime());
				rulePersistanceHelper.save(routeRule);
			});
		} catch (IOException e) {
			log.error(e);
		}

		return 1;
	}

	private boolean checkStatus(boolean uiStatus, Character dbStatus) {
		boolean flag = false;
		if (dbStatus == '1' && !uiStatus) {
			flag = true;
		}
		return flag;
	}

	@Override
	@Transactional
	public List<RuleConfiguration> deleteRule(int id) {
		boolean flag = true;
		RuleConfiguration configuration = ruleConfigurationHelper.findById(id).orElse(null);
		Rule rule = null;
		if (configuration != null)
			rule = configuration.getRule();
		List<RuleConfiguration> configurationRuleList = ruleConfigurationHelper.findByRule(rule);
		if (configurationRuleList.size() > 1) {
			flag = false;
		}
		if (flag && rule != null) {
			rulePersistanceHelper.deleteById(rule.getId());
			return new ArrayList<>();
		} else {
			return ruleConfigurationHelper.findByRule(rule);
		}

	}

	@Override
	public List<RuleConfiguration> confirmRule(String id, String verified, String token) {
		RuleConfiguration configureRule = ruleConfigurationHelper.findById(Integer.parseInt(id)).orElse(null);
		Rule rule = null;
		if (verified != null && configureRule != null) {
			configureRule.setVerified(Integer.parseInt(verified));
			configureRule.setUpdatedBy(authSessionService.getCreatedBy());
			configureRule.setUpdatedOn(RippsUtility.getCurrentTime());
			ruleConfigurationHelper.save(configureRule).getId();
			rule = configureRule.getRule();

		}

		List<RuleConfiguration> list = ruleConfigurationHelper.findByRule(rule);
		for (RuleConfiguration ruleConfiguration : list) {
			ruleConfiguration.setDestination(RuleEngineUtility
					.convertListOfIdsToStringWithComma(getDestination(ruleConfiguration.getDestination())));
		}
		return list;
	}

	/**
	 * Fetch Rules based on rule type(workflow or route) and non zero rule
	 * configuration.
	 * 
	 * Find rules Check rule config i
	 * 
	 */
	@Override
	public ResponseWrapper getAllRulesWithoutZero(String ruletype) {
		List<Rule> ruleList = rulePersistanceHelper.findByRuleTypeAndActive(ruletype, '1');
		ResponseWrapper pageJPAData = new ResponseWrapper();

		if (!(CollectionUtil.isCollectionEmptyOrNull(ruleList))) {
			List<RuleDto> ruleDtoList = ObjectMapper.mapListObjects(ruleList, RuleDto.class);
			List<RuleDto> removalList = new ArrayList<>();
			for (RuleDto ruleDto : ruleDtoList) {
				List<RuleConfigurationDto> ruleConfigurationList = ruleDto.getRuleConfiguration();
				int size = ruleConfigurationList.size();
				if (size > 0) {
					RuleConfigurationDto ruleConfigurationDto = ruleConfigurationList.get(size - 1);

					if (ruleConfigurationDto.getVersion() == 0) {
						if (size != 1) {
							ruleConfigurationList.remove(size - 1);
						} else if (size == 1) {
							removalList.add(ruleDto);
						}
					} else {
						for (RuleConfigurationDto ruleConfiguration : ruleDto.getRuleConfiguration()) {
							if (ruletype.equals("workflow")) {
								ruleConfiguration.setDestination(convertListToStringWithComma1(
										getWorkflowDestination(ruleConfiguration.getDestination())));
							} else if (ruletype.equals("route")) {
								ruleConfiguration.setDestination(convertListToStringWithComma1(
										getDestination(ruleConfiguration.getDestination())));
							}
						}
					}

				}
				pageJPAData.setContent(ruleDtoList);
			}
		}

		return pageJPAData;
	}

	private String convertListToStringWithComma1(List<IdAndNameWrapper> list) {
		return list.stream().map(IdAndNameWrapper::getName).collect(Collectors.joining(","));
	}

	@Override
	public ConditionDto getConditionList(String service) {
		DroolRuleParameter droolRuleParameter = droolRuleWebuiHelper.findById(Integer.parseInt(service)).orElse(null);
		if (null == droolRuleParameter) {
			throw new CommonException("Drool Api Data set is not correct:" + service, HttpStatus.OK);
		}
		DroolRuleApi droolRuleApi = droolRuleApiHelper.findById(Integer.parseInt(droolRuleParameter.getApiId()))
				.orElse(null);
		if (droolRuleApi != null) {
			return new ConditionDto(listService.getInputFields(), getOutput(droolRuleParameter),
					getInputField(droolRuleApi));
		} else {
			throw new CommonException("Id is not matching with droolruleapi :" + service, HttpStatus.OK);
		}
	}

	private List<InputFields> getInputField(DroolRuleApi droolRuleApi) {
		return ObjectMapper.mapListObjects(droolRuleApi.getInputField(), InputFields.class);
	}

	private Output getOutput(DroolRuleParameter droolRuleParameter) {
		Output output = new Output();
		output.setEditable(droolRuleParameter.getEditable());
		output.setLabel(droolRuleParameter.getLabel());
		output.setMultiple(droolRuleParameter.getMultiple());
		output.setValues(getActiveOutputValues(droolRuleParameter));
		return output;
	}

	private List<Map<String, String>> getActiveOutputValues(DroolRuleParameter droolRuleParameter) {
		if (StringUtil.isEmptyOrNull(droolRuleParameter.getValue())) {
			String[] columnArray = droolRuleParameter.getColumn().split(",");
			if (columnArray.length == 3) {
				return ruleRepository.getActivedata(droolRuleParameter.getTableName().trim(), columnArray[0].trim(),
						columnArray[1].trim(), columnArray[2].trim());
			} else if (columnArray.length == 2) {
				return ruleRepository.getActivedata(droolRuleParameter.getTableName().trim(), columnArray[0].trim(),
						columnArray[1].trim());
			} else if (columnArray.length == 1) {
				throw new DisplayMessageException("1 column value is missing : " + droolRuleParameter.getColumn(),
						HttpStatus.OK);
			} else {
				throw new DisplayMessageException("2 column value is missing : " + droolRuleParameter.getColumn(),
						HttpStatus.OK);
			}
		} else {
			return Stream.of(droolRuleParameter.getValue().split(",")).map(value -> {
				Map<String, String> map = new HashMap<>();
				map.put("name", value);
				map.put("label", value);
				return map;
			}).toList();
		}
	}
}
