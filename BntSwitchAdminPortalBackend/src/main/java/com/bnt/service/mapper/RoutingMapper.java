package com.bnt.service.mapper;

import java.util.ArrayList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.bnt.enums.AccoutType;
import com.bnt.enums.lookup.CardType;
import com.bnt.enums.lookup.POSEntryMode;
import com.bnt.enums.lookup.TokenType;
import com.bnt.enums.lookup.TransactionType;
import com.bnt.rest.dto.Condition;
import com.bnt.rest.dto.ConditionRowDto;
import com.bnt.rest.dto.ConfiguredRoutesDto;
import com.bnt.rest.dto.IdAndNameStringWrapper;
import com.bnt.rest.dto.RoutingVersionDto;
import com.bnt.rest.dto.RuleConfigurationDto;
import com.bnt.rest.dto.RuleDto;
import com.bnt.rest.wrapper.dto.ConfiguredRouteWrapper;
import com.bnt.rest.wrapper.dto.RuleConfigurationWrapper;
import com.bnt.rest.wrapper.dto.RuleWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class RoutingMapper {

	private static final Logger logger = LogManager.getLogger(RoutingMapper.class);

	private RoutingMapper() {

	}

	private static final String LESS = "less";
	private static final String NOTEQUAL = "notequals";
	private static final String EQUAL = "equals";
	private static final String GREATER = "greater";
	private static final String STARTS_WITH = "startswith";

	public static List<IdAndNameStringWrapper> populateTxnAmountConditionalOperater() {
		List<IdAndNameStringWrapper> withGreater = new ArrayList<>();
		IdAndNameStringWrapper gender = null;
		try {
			gender = new IdAndNameStringWrapper();
			gender.setId(GREATER);
			gender.setName(GREATER);
			withGreater.add(gender);
			gender = new IdAndNameStringWrapper();
			gender.setId(EQUAL);
			gender.setName(EQUAL);
			withGreater.add(gender);
			gender = new IdAndNameStringWrapper();
			gender.setId(NOTEQUAL);
			gender.setName(NOTEQUAL);
			withGreater.add(gender);
			gender = new IdAndNameStringWrapper();
			gender.setId(LESS);
			gender.setName(LESS);
			withGreater.add(gender);

		} catch (Exception e) {
			logger.error("populateTxnAmountConditionalOperater {}", e.getMessage());
		}
		return withGreater;
	}

	public static List<IdAndNameStringWrapper> populateConditionalOperater() {
		List<IdAndNameStringWrapper> withOutGreater = new ArrayList<>();
		IdAndNameStringWrapper gender = null;
		try {
			gender = new IdAndNameStringWrapper();
			gender.setId(EQUAL);
			gender.setName(EQUAL);
			withOutGreater.add(gender);
			gender = new IdAndNameStringWrapper();
			gender.setId(NOTEQUAL);
			gender.setName(NOTEQUAL);
			withOutGreater.add(gender);
		} catch (Exception e) {
			logger.error("populateConditionalOperater {}", e.getMessage());
		}
		return withOutGreater;
	}

	public static List<IdAndNameStringWrapper> populateBingConditionalOperater() {
		List<IdAndNameStringWrapper> startsWith = new ArrayList<>();
		IdAndNameStringWrapper gender = null;
		try {
			gender = new IdAndNameStringWrapper();
			gender.setId(STARTS_WITH);
			gender.setName(STARTS_WITH);
			startsWith.add(gender);

		} catch (Exception e) {
			logger.error("populateBingConditionalOperater {}", e.getMessage());
		}
		return startsWith;
	}

	public static List<IdAndNameStringWrapper> getAccountList() {

		List<IdAndNameStringWrapper> cardList = new ArrayList<>();
		IdAndNameStringWrapper cardTypeDto = null;
		for (AccoutType cardType : AccoutType.values()) {
			cardTypeDto = new IdAndNameStringWrapper();
			cardTypeDto.setId(cardType.getValue());
			cardTypeDto.setName(cardType.getValue());
			cardList.add(cardTypeDto);
		}
		return cardList;
	}

	public static List<IdAndNameStringWrapper> getCardList() {

		List<IdAndNameStringWrapper> cardList = new ArrayList<>();
		IdAndNameStringWrapper cardTypeDto = null;
		for (CardType cardType : CardType.values()) {
			cardTypeDto = new IdAndNameStringWrapper();
			cardTypeDto.setId(cardType.name());
			cardTypeDto.setName(cardType.name());
			cardList.add(cardTypeDto);
		}
		return cardList;
	}

	public static List<IdAndNameStringWrapper> gettxnList() {

		List<IdAndNameStringWrapper> cardList = new ArrayList<>();
		IdAndNameStringWrapper cardTypeDto = null;
		for (TransactionType cardType : TransactionType.values()) {
			cardTypeDto = new IdAndNameStringWrapper();
			cardTypeDto.setId(cardType.name());
			cardTypeDto.setName(cardType.name());
			cardList.add(cardTypeDto);
		}
		return cardList;
	}

	public static List<IdAndNameStringWrapper> posEntryModeList() {
		List<IdAndNameStringWrapper> cardList = new ArrayList<>();
		IdAndNameStringWrapper cardTypeDto = null;
		for (POSEntryMode cardType : POSEntryMode.values()) {
			cardTypeDto = new IdAndNameStringWrapper();
			cardTypeDto.setId(cardType.name());
			cardTypeDto.setName(cardType.name());
			cardList.add(cardTypeDto);
		}
		return cardList;
	}

	public static List<IdAndNameStringWrapper> getTokenTypeList() {

		List<IdAndNameStringWrapper> cardList = new ArrayList<>();
		IdAndNameStringWrapper cardTypeDto = null;

		for (TokenType cardType : TokenType.values()) {
			cardTypeDto = new IdAndNameStringWrapper();
			cardTypeDto.setId(cardType.name());
			cardTypeDto.setName(cardType.name());
			cardList.add(cardTypeDto);
		}
		return cardList;
	}

	private ConditionRowDto setConditionValue(Condition conditions) {
		IdAndNameStringWrapper uiMapper;
		ConditionRowDto routeRuleDto = new ConditionRowDto();
		if (conditions.getKey() != null) {
			uiMapper = conditions.getKey();
			if (uiMapper.getId().equalsIgnoreCase("transactionAmount")) {
				routeRuleDto.setTxnAmount(conditions.getTextValue());
			} else if (uiMapper.getId().equalsIgnoreCase("cardPrefix")) {
				routeRuleDto.setBinRange(conditions.getTextValue());
			} else {
				routeRuleDto.setSelectionCriteriaValue(conditions.getValue().getName());
			}
			routeRuleDto.setSelectionCriteria(uiMapper.getId());
		}
		if (conditions.getFunction() != null) {
			uiMapper = conditions.getFunction();
			routeRuleDto.setConditionalOperator(uiMapper.getId());
		}
		routeRuleDto.setLogicalOperator(conditions.getRelation());
		return routeRuleDto;
	}

	public static List<IdAndNameStringWrapper> getCctiIdList() {
		List<IdAndNameStringWrapper> cctiIdList = new ArrayList<>();
		String[] cctiIDArray = { "80", "82" };
		IdAndNameStringWrapper cctiIdDto = null;
		for (int i = 0; i < cctiIDArray.length; i++) {
			cctiIdDto = new IdAndNameStringWrapper();
			cctiIdDto.setId(cctiIDArray[i]);
			cctiIdDto.setName(cctiIDArray[i]);
			cctiIdList.add(cctiIdDto);
		}
		return cctiIdList;
	}

	public static void mapConfiguredRouteDto(ConfiguredRoutesDto routeDetail, RuleConfigurationDto ruleConfigurationDto,
			RoutingVersionDto versionDto) {

		logger.info("inside mapConfiguredRouteDto().. for versionDto {}", versionDto);
		ConfiguredRouteWrapper routeWrapper = new ConfiguredRouteWrapper();
		mapRuleConfigDtoToWrapper(routeWrapper, ruleConfigurationDto);
		mapRuleWrapper(routeWrapper, ruleConfigurationDto);
		routeDetail.setRouteWrapper(routeWrapper);
	}

	private static void mapRuleWrapper(ConfiguredRouteWrapper routeWrapper, RuleConfigurationDto ruleConfigurationDto) {
		RuleWrapper ruleWrapper = new RuleWrapper();
		RuleDto ruleDto = ruleConfigurationDto.getRule();
		ruleWrapper.setActive(ruleDto.getActive());
		ruleWrapper.setDescription(ruleDto.getDescription());
		ruleWrapper.setEditable(ruleDto.isEditable());
		ruleWrapper.setName(ruleDto.getName());
		ruleWrapper.setRuleType(ruleDto.getRuleType());
		ruleWrapper.setVersionable(ruleDto.isVersionable());
		ruleWrapper.setZeroVersion(ruleDto.isZeroVersion());
		routeWrapper.setRuleWrapper(ruleWrapper);
	}

	private static void mapRuleConfigDtoToWrapper(ConfiguredRouteWrapper routeWrapper,
			RuleConfigurationDto ruleConfigurationDto) {
		RuleConfigurationWrapper ruleConfigWrapper = new RuleConfigurationWrapper();
		ruleConfigWrapper.setActive(ruleConfigurationDto.getActive());
		ruleConfigWrapper.setDestination(ruleConfigurationDto.getDestination());
		ruleConfigWrapper.setDroolRule(ruleConfigurationDto.getDroolRule());
		ruleConfigWrapper.setJson(ruleConfigurationDto.getJson());
		ruleConfigWrapper.setRuleId(ruleConfigurationDto.getRule().getId());
		ruleConfigWrapper.setRuleJson(ruleConfigurationDto.getRuleJson());
		ruleConfigWrapper.setVerified(ruleConfigurationDto.getVerified());
		ruleConfigWrapper.setVersion(ruleConfigurationDto.getVersion());

		routeWrapper.setRuleConfig(ruleConfigWrapper);
	}

	private static RuleDto mapRuleWrapperToDto(ConfiguredRouteWrapper routeWrapper) {
		RuleWrapper ruleWrapper = routeWrapper.getRuleWrapper();
		RuleDto ruleDto = new RuleDto();
		ruleDto.setActive(ruleWrapper.getActive());
		ruleDto.setDescription(ruleWrapper.getDescription());
		ruleDto.setEditable(ruleWrapper.isEditable());
		ruleDto.setName(ruleWrapper.getName());
		ruleDto.setRuleType(ruleWrapper.getRuleType());
		ruleDto.setVersionable(ruleWrapper.isVersionable());
		ruleDto.setZeroVersion(ruleWrapper.isZeroVersion());

		return ruleDto;
	}

	private static List<RuleConfigurationDto> mapRuleConfigWrapperToDto(ConfiguredRouteWrapper routeWrapper,
			RuleDto ruleDto) {
		List<RuleConfigurationDto> ruleConfigList = new ArrayList<>(1);
		RuleConfigurationWrapper ruleConfigWrapper = routeWrapper.getRuleConfig();
		RuleConfigurationDto ruleConfigurationDto = new RuleConfigurationDto();
		ruleConfigurationDto.setActive(ruleConfigWrapper.getActive());
		ruleConfigurationDto.setDestination(ruleConfigWrapper.getDestination());
		ruleConfigurationDto.setDroolRule(ruleConfigWrapper.getDroolRule());
		ruleConfigurationDto.setJson(ruleConfigWrapper.getJson());
		ruleConfigurationDto.setRule(ruleDto);
		ruleConfigurationDto.setRuleJson(ruleConfigWrapper.getRuleJson());
		ruleConfigurationDto.setVerified(ruleConfigWrapper.getVerified());
		ruleConfigurationDto.setVersion(ruleConfigWrapper.getVersion());
		ruleConfigList.add(ruleConfigurationDto);
		return ruleConfigList;
	}

	public static RuleDto getRule(ConfiguredRouteWrapper routeWrapper) {
		RuleDto ruleDto = mapRuleWrapperToDto(routeWrapper);
		List<RuleConfigurationDto> ruleConfigDtoList = mapRuleConfigWrapperToDto(routeWrapper, ruleDto);
		ruleDto.setRuleConfiguration(ruleConfigDtoList);
		return ruleDto;
	}
}
