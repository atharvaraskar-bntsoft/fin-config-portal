package com.bnt.rest.service.impl;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.jayway.jsonpath.JsonPath;
import com.bnt.adapter.validations.AdapterPostActions;
import com.bnt.adapter.validations.AdapterPreActions;
import com.bnt.adapter.validations.CartPostActions;
import com.bnt.adapter.validations.CartPreActions;
import com.bnt.adapter.validations.Parameters;
import com.bnt.bswitch.transformer.mapper.operation.function.InBuiltValidation.InBuiltValidations;
import com.bnt.bswitch.transformer.mapper.operation.function.SystemDefinedFunctions;
import com.bnt.bswitch.transformer.mapper.operation.function.UtilityFunctions;
import com.bnt.bswitch.transformer.mapper.operation.function.UtilityFunctions.Functions;
import com.bnt.bswitch.transformer.processor.InBuiltMapper.Mapper;
import com.bnt.common.util.FileUtil;
import com.bnt.common.util.JsonObjectUtil;
import com.bnt.common.util.StringUtil;
import com.bnt.common.util.exception.ExceptionLog;
import com.bnt.constant.Constants;
import com.bnt.rest.dto.ELFunctionDto;
import com.bnt.rest.dto.SchemeImfMapperDto;
import com.bnt.rest.entity.StandardMessageSpecification;
import com.bnt.rest.jpa.repository.LookupValuePersistenceHelper;
import com.bnt.rest.repository.AdapterConfigurationRepository;
import com.bnt.rest.repository.StandardMessageSpecificationRepository;
import com.bnt.rest.service.AdapterToolKitTransformService;
import com.bnt.rest.service.SchemeImfMapperService;
import com.bnt.rest.wrapper.dto.IdAndCodeWrapperString;
import com.bnt.rest.wrapper.dto.adapter.FieldSchemeImfMapperUiWrapper;
import com.bnt.rest.wrapper.dto.adapter.TransformSchemeMapperUIDto;
import com.bnt.rest.wrapper.dto.adapter.postsaction.ActionDto;
import com.bnt.rest.wrapper.dto.adapter.postsaction.ActionParametersDto;
import com.bnt.service.mapper.AdapterTransformDataMapper;
import com.bnt.service.mapper.MessageConversionJsonMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class AdapterToolKitTransformServiceImpl implements AdapterToolKitTransformService {

	private static final Logger logger = LogManager.getLogger(AdapterToolKitTransformServiceImpl.class);

	@Value("${iso.packager.fields.exclude}")
	private String isoPackagerFieldExclude;

	@Value("${functions.optional.parameter.list}")
	private String functionsOptioalPramList;

	@Value("${action.list}")
	private String action;

	@Autowired
	AdapterConfigurationRepository adapterConfigurationRepository;

	@Autowired
	StandardMessageSpecificationRepository standardMessageSpecificationRepository;

	private List<String> deviceAdditionalAttribute = null;

	private List<String> locationAdditionalAttribute = null;

	private List<String> merchantAdditionalAttribute = null;

	@Autowired
	SchemeImfMapperService schemeImfMapperService;

	@Autowired
	LookupValuePersistenceHelper lookupValuePersistenceHelper;

	@Override
	public List<IdAndCodeWrapperString> getRuleList(Integer templateId, Integer formatId) {
		List<IdAndCodeWrapperString> idAndCodeWrapperStringList = new ArrayList<>();
		StandardMessageSpecification standardMessageSpecification = standardMessageSpecificationRepository
				.getMessageSpecification(templateId);
		String schemaXml = standardMessageSpecification.getMessageSchemaPackager();
		JSONObject jSONObject = MessageConversionJsonMapper.getJsonFromXml(schemaXml,
				standardMessageSpecification.getMessageStandard().getValue());
		String fieldpath = "$.template.field[*]";
		List<Map<String, Object>> filedList = JsonPath.parse(jSONObject.toString()).read(fieldpath);
		String id = "";
		IdAndCodeWrapperString idAndCodeWrapperString;
		for (int i = 0; i < filedList.size(); i++) {
			id = "" + filedList.get(i).get("id");
			id = id.replace("\"", "");
			idAndCodeWrapperString = new IdAndCodeWrapperString();
			idAndCodeWrapperString.setId(id);
			idAndCodeWrapperString.setCode("Field " + id + " " + filedList.get(i).get("name"));
			idAndCodeWrapperStringList.add(idAndCodeWrapperString);

		}

		return idAndCodeWrapperStringList;

	}

	@Override
	public Map<String, String> getDataMap() {
		logger.info("inside getDataMap()...");
		String jsonPath = "/adapter/transform_data_map.json";
		Map<String, String> hashMap = new HashMap<>();
		HashMap<String, Object> jsonHash = null;
		File jsonFile;
		try {
			jsonFile = FileUtil.getFileFromClassPathResource(jsonPath);
			jsonHash = new com.fasterxml.jackson.databind.ObjectMapper().readValue(jsonFile,
					new TypeReference<HashMap<String, Object>>() {
					});
		} catch (Exception e) {
			logger.error(ExceptionLog.printStackTraceToString(e));
		}
		if (jsonHash != null) {
			jsonHash.forEach((k, v) -> hashMap.put(k, JsonObjectUtil.getJsonStringFromObject(v)));
		}
		logger.info("completed getDataMap");
		return hashMap;

	}

	@Override
	public List<FieldSchemeImfMapperUiWrapper> getFieldSchemeImfMapperUiWrapper(Integer messageStandard) {
		logger.info("inside getFieldSchemeImfMapperUiWrapper with messageStandard:{}", messageStandard);
		List<SchemeImfMapperDto> schemeImfMapperDtolist = schemeImfMapperService
				.getSchemeImfMapperByMessageStandardId(messageStandard);
		List<FieldSchemeImfMapperUiWrapper> uiList = new ArrayList<>();
		FieldSchemeImfMapperUiWrapper fieldSchemeImfMapperUiWrapper = null;

		StandardMessageSpecification standardMessageSpecification = standardMessageSpecificationRepository
				.getMessageSpecification(messageStandard);
		String schemaXml = standardMessageSpecification.getMessageSchemaPackager();
		JSONObject jSONObject = MessageConversionJsonMapper.getJsonFromXml(schemaXml,
				standardMessageSpecification.getMessageStandard().getValue());
		String fieldpath = "$.template.field[*]";
		List<Map<String, Object>> filedList = JsonPath.parse(jSONObject.toString()).read(fieldpath);
		String id = "";
		for (int i = 0; i < filedList.size(); i++) {
			id = "" + filedList.get(i).get("id");
			fieldSchemeImfMapperUiWrapper = new FieldSchemeImfMapperUiWrapper();
			fieldSchemeImfMapperUiWrapper.setFieldId(id);
			fieldSchemeImfMapperUiWrapper.setFieldName("Field " + id + " " + filedList.get(i).get("name"));

			for (SchemeImfMapperDto schemeImfMapperDto : schemeImfMapperDtolist) {
				if (id.equalsIgnoreCase(schemeImfMapperDto.getFieldId())) {
					fieldSchemeImfMapperUiWrapper.setRequestImfExpression(schemeImfMapperDto.getRequestImfExpression());
					fieldSchemeImfMapperUiWrapper
							.setResponseImfExpression(schemeImfMapperDto.getResponseImfExpression());
					fieldSchemeImfMapperUiWrapper.setResponseImfLeg(schemeImfMapperDto.getResponseImfLeg());
					fieldSchemeImfMapperUiWrapper.setRequestImfField(schemeImfMapperDto.getRequestImfField());
					fieldSchemeImfMapperUiWrapper.setResponseImfField(schemeImfMapperDto.getResponseImfField());
				}
			}
			uiList.add(fieldSchemeImfMapperUiWrapper);
		}

		logger.info("getFieldSchemeImfMapperUiWrapper completed with uiList.size():{}", uiList.size());

		return uiList;
	}

	@Override
	public List<ELFunctionDto> getElFunctionList() {

		logger.info("get getElFunctionList");
		Functions[] enumFunctionsList = UtilityFunctions.Functions.values();

		/**
		 * List<ELFunctionDto> elList=eLFunctionService.findAllRecord();
		 * if(elList==null){ elList=new ArrayList<>(); }
		 */
		List<ELFunctionDto> elList = new ArrayList<>();

		ELFunctionDto elDto = null;
		String functionName = "";

		String[] parameterLabels = null;
		String toolTip = "";
		String paramters = "";
		for (Functions enumFunctions : enumFunctionsList) {
			functionName = enumFunctions.name();
			Class<?>[] objPrameter = enumFunctions.getParametersType();
			toolTip = enumFunctions.getDescription();
			parameterLabels = enumFunctions.getParametersLabel();

			elDto = new ELFunctionDto();
			elDto.setName(functionName);
			elDto.setExpType("function");
			elDto.setExpression(null);
			elDto.setFeatureType("transform");
			elDto.setSubType("transform");
			elDto.setActive(true);
			paramters = AdapterTransformDataMapper.createParameters(objPrameter, parameterLabels, toolTip);
			logger.info(paramters);
			elDto.setParameters(paramters);
			if (objPrameter != null && objPrameter.length > 0) {
				elDto.setParamCount(objPrameter.length);
			} else {
				elDto.setParamCount(0);
			}
			elList.add(elDto);
		}

		InBuiltValidations[] enumInBuiltValidations = InBuiltValidations.values();
		for (InBuiltValidations inBuiltValidations : enumInBuiltValidations) {
			Class<?>[] objPrameter = inBuiltValidations.getParametersType();
			functionName = inBuiltValidations.name();
			toolTip = inBuiltValidations.getDescription();
			parameterLabels = inBuiltValidations.getParametersLabel();

			elDto = new ELFunctionDto();
			elDto.setName(functionName);
			elDto.setExpType("in_built_validation");
			elDto.setExpression(null);
			elDto.setFeatureType("validation");
			elDto.setSubType("validation");
			elDto.setActive(true);
			paramters = AdapterTransformDataMapper.createParameters(objPrameter, parameterLabels, toolTip);
			logger.info(paramters);
			elDto.setParameters(paramters);
			if (objPrameter != null && objPrameter.length > 0) {
				elDto.setParamCount(objPrameter.length);
			} else {
				elDto.setParamCount(0);
			}
			elList.add(elDto);
		}
		/**
		 * List<ELFunctionDto>
		 * elCustomList=AdapterTransformDataMapper.elNewCustomList();
		 * elList.addAll(elCustomList);
		 */
		return elList;
	}

	@Override
	public List<String> getFieldExcludedList(String templateName) {
		List<String> transformExcludedFieldList = new ArrayList<>();
		String excludedFieldListFromAppProperties = "";
		if (templateName.contains(Constants.ISO)) {
			excludedFieldListFromAppProperties = isoPackagerFieldExclude;
		} else {
			// excludedFieldListFromAppProperties
		}
		String[] excludedList = excludedFieldListFromAppProperties.split(",", -1);
		transformExcludedFieldList.addAll(Arrays.asList(excludedList));
		return transformExcludedFieldList;
	}

	@Override
	public List<TransformSchemeMapperUIDto> getTransformSchemeMapperList(Integer messageStandard) {
		logger.info("inside getTransformSchemeMapperList with messageStandard:{}", messageStandard);
		List<SchemeImfMapperDto> schemeImfMapperDtolist = schemeImfMapperService.getAllSchemeImfMapper();
		List<TransformSchemeMapperUIDto> dbMapper = AdapterTransformDataMapper
				.schemeMapperUIfromDbDto(schemeImfMapperDtolist);
		if (dbMapper == null) {
			dbMapper = new ArrayList<>();
		}
		Mapper[] enumMapper = Mapper.values();
		String name = "";
		String toolTip = "";
		Class<?>[] objPrameter = null;
		String[] parameterLabels = null;
		String paramters = "";
		TransformSchemeMapperUIDto transformSchemeMapperUIDto = null;
		/** String[] fieldArray = null; */
		for (Mapper mapper : enumMapper) {
			name = mapper.name();
			toolTip = mapper.getDescription();
			parameterLabels = mapper.getParametersLabel();
			objPrameter = mapper.getParametersType();
			paramters = AdapterTransformDataMapper.createParameters(objPrameter, parameterLabels, toolTip);
			transformSchemeMapperUIDto = AdapterTransformDataMapper.schemeMapperUIfromInBuiltMapper(name, paramters,
					"");
			/**
			 * if(fieldArray!=null) { for (int i = 0; i < fieldArray.length; i++) {
			 * transformSchemeMapperUIDto =
			 * AdapterTransformDataMapper.schemeMapperUIfromInBuiltMapper(name, paramters,
			 * fieldArray[i]); dbMapper.add(transformSchemeMapperUIDto); } } else {
			 * transformSchemeMapperUIDto =
			 * AdapterTransformDataMapper.schemeMapperUIfromInBuiltMapper(name,
			 * paramters,""); }
			 */
			dbMapper.add(transformSchemeMapperUIDto);

		}
		return dbMapper;
	}

	@Override
	public List<ActionDto> adapterL3PostActionsMethodList() {
		logger.info("inside adapterL3PostActionsMethodList()...");
		List<ActionDto> actionList = new ArrayList<>();
		List<ActionParametersDto> actionParameterList = null;

		CartPostActions.Action[] enumMapper = CartPostActions.Action.values();
		Parameters[] paramaterArray = null;
		ActionDto actionDto = null;
		ActionParametersDto actionParametersDto = null;
		for (CartPostActions.Action action : enumMapper) {
			actionDto = new ActionDto();
			actionDto.setActionName(action.name());
			paramaterArray = action.getParametersType();
			actionParameterList = new ArrayList<>();
			for (int i = 0; i < paramaterArray.length; i++) {
				Parameters objPrameter = paramaterArray[i];
				actionParametersDto = new ActionParametersDto();
				actionParametersDto.setDataType(objPrameter.getClazz().getSimpleName());
				actionParametersDto.setDisplayName(objPrameter.getDisplayName());
				actionParametersDto.setOrdinal(i);
				actionParametersDto.setPossibleValue(objPrameter.getPossibleValue());
				actionParametersDto.setName(objPrameter.getName());
				actionParameterList.add(actionParametersDto);
			}
			actionDto.setParameters(actionParameterList);
			actionList.add(actionDto);
		}
		return actionList;
	}

	@Override
	public List<ActionDto> adapterPreActionsMethodList() {
		logger.info("inside adapterPreActionsMethodList()...");
		List<ActionDto> actionList = new ArrayList<>();
		List<ActionParametersDto> actionParameterList = null;
		AdapterPreActions.Action[] enumMapper = AdapterPreActions.Action.values();
		Parameters[] paramaterArray = null;
		ActionDto actionDto = null;
		ActionParametersDto actionParametersDto = null;
		List<String> actions = Arrays.asList(action.split(","));
		for (AdapterPreActions.Action action : enumMapper) {
			actionDto = new ActionDto();
			actionDto.setActionName(action.name());
			paramaterArray = action.getParametersType();
			actionParameterList = new ArrayList<>();
			for (int i = 0; i < paramaterArray.length; i++) {
				Parameters objPrameter = paramaterArray[i];
				actionParametersDto = new ActionParametersDto();
				actionParametersDto.setDataType(objPrameter.getClazz().getSimpleName());
				actionParametersDto.setDisplayName(objPrameter.getDisplayName());
				actionParametersDto.setOrdinal(i);
				if (actions.stream().anyMatch(action.name()::equalsIgnoreCase)) {
					getPossibleValueList(
							(null != deviceAdditionalAttribute ? deviceAdditionalAttribute
									: lookupValuePersistenceHelper.getValueListByType("deviceAdditionalAttribute")),
							(null != locationAdditionalAttribute ? locationAdditionalAttribute
									: lookupValuePersistenceHelper.getValueListByType("LOCATION_ADDTIONAL_ATTRIBUTE")),
							(null != merchantAdditionalAttribute ? merchantAdditionalAttribute
									: lookupValuePersistenceHelper.getValueListByType("MERCHANT_ADDTIONAL_ATTRIBUTE")),
							actionParametersDto, objPrameter);
				} else {
					actionParametersDto.setPossibleValue(objPrameter.getPossibleValue());
				}
				actionParametersDto.setName(objPrameter.getName());
				actionParameterList.add(actionParametersDto);
			}
			actionDto.setParameters(actionParameterList);
			actionList.add(actionDto);
		}
		return actionList;
	}

	@Override
	public List<ActionDto> adapterPostActionsMethodList() {
		logger.info("inside adapterPostActionsMethodList");
		List<ActionDto> actionList = new ArrayList<>();
		List<ActionParametersDto> actionParameterList = null;
		List<String> deviceAdditionalAttribute = lookupValuePersistenceHelper
				.getValueListByType("deviceAdditionalAttribute");
		List<String> locationAdditionalAttribute = lookupValuePersistenceHelper
				.getValueListByType("LOCATION_ADDTIONAL_ATTRIBUTE");
		List<String> merchantAdditionalAttribute = lookupValuePersistenceHelper
				.getValueListByType("MERCHANT_ADDTIONAL_ATTRIBUTE");
		AdapterPostActions.Action[] enumMapper = AdapterPostActions.Action.values();
		Parameters[] paramaterArray = null;
		ActionDto actionDto = null;
		ActionParametersDto actionParametersDto = null;
		for (AdapterPostActions.Action action : enumMapper) {
			actionDto = new ActionDto();
			actionDto.setActionName(action.name());
			paramaterArray = action.getParametersType();
			actionParameterList = new ArrayList<>();
			for (int i = 0; i < paramaterArray.length; i++) {
				Parameters objPrameter = paramaterArray[i];
				actionParametersDto = new ActionParametersDto();
				actionParametersDto.setDataType(objPrameter.getClazz().getSimpleName());
				actionParametersDto.setDisplayName(objPrameter.getDisplayName());
				actionParametersDto.setOrdinal(i);
				actionParametersDto.setName(objPrameter.getName());
				if (action.name().equalsIgnoreCase("VALIDATE_ENTITY_CONFIG")) {
					getPossibleValueList(deviceAdditionalAttribute, locationAdditionalAttribute,
							merchantAdditionalAttribute, actionParametersDto, objPrameter);
				} else if (action.name().equalsIgnoreCase("ENRICH_USING_ENTITY_CONFIG")) {
					getPossibleValueList(deviceAdditionalAttribute, locationAdditionalAttribute,
							merchantAdditionalAttribute, actionParametersDto, objPrameter);
				}

				else {
					actionParametersDto.setPossibleValue(objPrameter.getPossibleValue());
				}
				actionParameterList.add(actionParametersDto);
			}
			actionDto.setParameters(actionParameterList);
			actionList.add(actionDto);
		}
		return actionList;
	}

	private void getPossibleValueList(List<String> deviceAdditionalAttribute, List<String> locationAdditionalAttribute,
			List<String> merchantAdditionalAttribute, ActionParametersDto actionParametersDto, Parameters objPrameter) {
		if (objPrameter.getPossibleValue() != null && !objPrameter.getPossibleValue().isEmpty()) {
			for (Object obj : objPrameter.getPossibleValue()) {
				List<Object> object = (List<Object>) obj;
				getSizeCorrected(object);
				if (object != null && object.get(0) != null
						&& object.get(0).toString().equalsIgnoreCase("locationCode")) {
					getObjectPossibleValue(object, deviceAdditionalAttribute, locationAdditionalAttribute,
							merchantAdditionalAttribute);
				}
			}
		}
		actionParametersDto.setPossibleValue(objPrameter.getPossibleValue());
	}

	private void getPossibleValueListForSteps(List<String> deviceAdditionalAttribute,
			List<String> locationAdditionalAttribute, List<String> merchantAdditionalAttribute,
			ActionParametersDto actionParametersDto, Parameters objPrameter) {
		if (objPrameter.getPossibleValue() != null && !objPrameter.getPossibleValue().isEmpty()) {
			if (objPrameter.getPossibleValue().get(0) != null
					&& objPrameter.getPossibleValue().get(0).toString().equalsIgnoreCase("locationCode")) {
				getSizeCorrected(objPrameter.getPossibleValue());
				getObjectPossibleValue(objPrameter.getPossibleValue(), deviceAdditionalAttribute,
						locationAdditionalAttribute, merchantAdditionalAttribute);
			} else {
				for (Object obj : objPrameter.getPossibleValue()) {
					List<Object> object = (List<Object>) obj;
					if (object != null && object.get(0) != null
							&& object.get(0).toString().equalsIgnoreCase("locationCode")) {
						getSizeCorrected(object);
						getObjectPossibleValue(object, deviceAdditionalAttribute, locationAdditionalAttribute,
								merchantAdditionalAttribute);
					}
				}
			}

		}
		actionParametersDto.setPossibleValue(objPrameter.getPossibleValue());
	}

	private void getSizeCorrected(List<Object> object) {
		if (object != null) {
//			object.toString().contains("merchantCodeMapDestAcquirer");
			int index = object.indexOf("merchantCodeMapDestAcquirer");
			if (object.size() > index + 1) {
				object.subList(index + 1, object.size()).clear();
			}
		}
	}

	private List<Object> getObjectPossibleValue(List<Object> object, List<String> deviceAdditionalAttribute,
			List<String> locationAdditionalAttribute, List<String> merchantAdditionalAttribute) {
		for (String name : deviceAdditionalAttribute) {
			String device = "deviceAdditionalAttribute" + "[" + name + "]";
			object.add(device);
		}
		for (String name : locationAdditionalAttribute) {
			String location = "LOCATION_ADDTIONAL_ATTRIBUTE" + "[" + name + "]";
			object.add(location);
		}
		for (String name : merchantAdditionalAttribute) {
			String merchant = "MERCHANT_ADDTIONAL_ATTRIBUTE" + "[" + name + "]";
			object.add(merchant);
		}
		return object;
	}

	/*
	 * private List<Object> getPossibleValue(ActionParametersDto
	 * actionParametersDto, List<Object> possibleValue, List<String>
	 * deviceAdditionalAttribute, List<String> locationAdditionalAttribute,
	 * List<String> merchantAdditionalAttribute) { List<Object> object = new
	 * ArrayList<>(); for(Object obj:possibleValue) { if(obj!=null){ object =
	 * (List<Object>) obj;
	 * 
	 * } } return object; }
	 */

	@Override
	public List<ActionDto> adapterPostActionsMethodL3List() {
		logger.info("inside adapterPostActionsMethodL3List");
		List<ActionDto> actionList = new ArrayList<>();
		List<ActionParametersDto> actionParameterList = null;

		AdapterPostActions.Action[] enumMapper = AdapterPostActions.Action.values();
		Parameters[] paramaterArray = null;
		ActionDto actionDto = null;
		ActionParametersDto actionParametersDto = null;
		for (AdapterPostActions.Action action : enumMapper) {
			actionDto = new ActionDto();
			actionDto.setActionName(action.name());
			paramaterArray = action.getParametersType();
			actionParameterList = new ArrayList<>();
			for (int i = 0; i < paramaterArray.length; i++) {
				Parameters objPrameter = paramaterArray[i];
				actionParametersDto = new ActionParametersDto();
				actionParametersDto.setDataType(objPrameter.getClazz().getSimpleName());
				actionParametersDto.setDisplayName(objPrameter.getDisplayName());
				actionParametersDto.setOrdinal(i);
				actionParametersDto.setPossibleValue(objPrameter.getPossibleValue());
				actionParametersDto.setName(objPrameter.getName());
				actionParameterList.add(actionParametersDto);
			}
			actionDto.setParameters(actionParameterList);
			actionList.add(actionDto);
		}
		return actionList;
	}

	@Override
	@SuppressWarnings("unchecked")
	public Map<String, Object> getAdapterDataMap() {
		logger.info("inside getAdapterDataMap");
		String jsonPath = "/adapter/adapter_data_map.json";
		LinkedHashMap<String, Object> jsonHash = null;
		try {
			jsonHash = (LinkedHashMap<String, Object>) JsonObjectUtil.loadJsonFileAsType(jsonPath, Map.class);
		} catch (Exception e) {
			logger.error(ExceptionLog.printStackTraceToString(e));
		}
		logger.info("completed getDataMap");
		return jsonHash;

	}

	@Override
	public List<ActionDto> adapterL3StepMethodList() {
		logger.info("inside adapterL3StepMethodList()...");
		return getStepMethodListByAdapterType(Constants.ADAPTER_TYPE_L3);
	}

	@Override
	public List<ActionDto> adapterInBuiltValidationsList() {
		logger.info("Inside adapterInBuiltValidationsList()...");
		InBuiltValidations[] enumInBuiltValidations = InBuiltValidations.values();
		List<ActionDto> commonList = new ArrayList<>();
		List<ActionParametersDto> actionParameterList = null;
		ActionDto actionDto = null;
		ActionParametersDto actionParametersDto = null;
		for (InBuiltValidations enumFunction : enumInBuiltValidations) {
			actionDto = new ActionDto();
			actionDto.setActionName(enumFunction.name());
			actionDto.setTooltip(enumFunction.getDescription());
			actionDto.setType("in_built_validation");
			Class<?>[] functionParameters = enumFunction.getParametersType();
			String[] parametersNames = enumFunction.getParametersLabel();
			actionParameterList = new ArrayList<>();
			if (functionParameters.length == parametersNames.length) {
				for (int i = 0; i < functionParameters.length; i++) {
					Class<?> parameterClass = functionParameters[i];
					actionParametersDto = new ActionParametersDto();
					actionParametersDto.setDataType(parameterClass.getSimpleName());
					actionParametersDto.setOrdinal(i);
					actionParametersDto.setPossibleValue(null);
					actionParametersDto.setName(parametersNames[i]);
					AdapterTransformDataMapper.setDisplayValue(actionParametersDto);
					actionParameterList.add(actionParametersDto);
				}
			}
			actionDto.setParameters(actionParameterList);
			commonList.add(actionDto);
		}
		return commonList;
	}

	public List<ActionDto> getStepMethodListByAdapterType(String adapterType) {
		logger.info("inside getStepMethodListByAdapterType() for adapterType: {}", adapterType);
		List<ActionDto> actionList = new ArrayList<>();
		List<String> optioalPramArrayList = null;
		if (StringUtil.isNotNullOrBlank(functionsOptioalPramList)) {
			optioalPramArrayList = Arrays.asList(functionsOptioalPramList.toUpperCase().split(","));
		} else {
			optioalPramArrayList = new ArrayList<>();
		}

		boolean optionalFlag = false;
		SystemDefinedFunctions.Action[] enumMapper = SystemDefinedFunctions.Action.values();
		ActionDto actionDto = null;
		for (SystemDefinedFunctions.Action action : enumMapper) {
			if (optioalPramArrayList.contains(action.name())) {
				optionalFlag = true;
			}
			if (Constants.ADAPTER_TYPE_L1.equalsIgnoreCase(adapterType)) {
				if (action.isAdapterRequest() || action.isAdapterResponse()) {
					actionDto = new ActionDto();
					getStepMethodListBySystemDefinedFunctions(action, actionDto);
					actionDto.setRequest(action.isAdapterRequest());
					actionDto.setResponse(action.isAdapterResponse());
					actionDto.setParametersOptional(optionalFlag);
					actionList.add(actionDto);
				}
			} else if (Constants.ADAPTER_TYPE_L3.equalsIgnoreCase(adapterType)
					&& (action.isCartRequest() || action.isCartResponse())) {
				actionDto = new ActionDto();
				getStepMethodListBySystemDefinedFunctions(action, actionDto);
				actionDto.setRequest(action.isCartRequest());
				actionDto.setResponse(action.isCartResponse());
				actionDto.setParametersOptional(optionalFlag);
				actionList.add(actionDto);
			}
		}
		return actionList;
	}

	public void getStepMethodListBySystemDefinedFunctions(SystemDefinedFunctions.Action action, ActionDto actionDto) {
		logger.info("inside getStepMethodListBySystemDefinedFunctions()...");
		List<ActionParametersDto> actionParameterList = null;
		Parameters[] paramaterArray = null;
		ActionParametersDto actionParametersDto = null;
		List<String> deviceAdditionalAttribute = lookupValuePersistenceHelper
				.getValueListByType("deviceAdditionalAttribute");
		List<String> locationAdditionalAttribute = lookupValuePersistenceHelper
				.getValueListByType("LOCATION_ADDTIONAL_ATTRIBUTE");
		List<String> merchantAdditionalAttribute = lookupValuePersistenceHelper
				.getValueListByType("MERCHANT_ADDTIONAL_ATTRIBUTE");
		actionDto.setActionName(action.name());
		actionDto.setType("execute_function");
		paramaterArray = action.getParametersType();
		actionParameterList = new ArrayList<>();
		for (int i = 0; i < paramaterArray.length; i++) {
			Parameters objPrameter = paramaterArray[i];
			actionParametersDto = new ActionParametersDto();
			actionParametersDto.setDataType(objPrameter.getClazz().getSimpleName());
			actionParametersDto.setDisplayName(objPrameter.getDisplayName());
			actionParametersDto.setOrdinal(i);
			getPossibleValueListForSteps(deviceAdditionalAttribute, locationAdditionalAttribute,
					merchantAdditionalAttribute, actionParametersDto, objPrameter);
//			actionParametersDto.setPossibleValue(objPrameter.getPossibleValue());
			actionParametersDto.setName(objPrameter.getName());
			actionParameterList.add(actionParametersDto);
		}
		actionDto.setParameters(actionParameterList);
	}

	@Override
	public List<ActionDto> adapterL1StepsValidationList() {
		logger.info("inside adapterL1StepsValidationList()...");
		List<ActionDto> actionList = new ArrayList<>();
		List<ActionDto> adapterInBuiltValidationsList = adapterInBuiltValidationsList();
		actionList.addAll(adapterInBuiltValidationsList);
		List<ActionDto> stepMethod = getStepMethodListByAdapterType(Constants.ADAPTER_TYPE_L1);
		actionList.addAll(stepMethod);
		return actionList;
	}

	@Override
	public List<ActionDto> cartPreActionsMethodList() {
		logger.info("inside cartPreActionsMethodList()...");
		List<ActionDto> actionList = new ArrayList<>();
		List<ActionParametersDto> actionParameterList = null;

		CartPreActions.Action[] enumMapper = CartPreActions.Action.values();
		Parameters[] paramaterArray = null;
		ActionDto actionDto = null;
		ActionParametersDto actionParametersDto = null;
		for (CartPreActions.Action action : enumMapper) {
			actionDto = new ActionDto();
			actionDto.setActionName(action.name());
			paramaterArray = action.getParametersType();
			actionParameterList = new ArrayList<>();
			for (int i = 0; i < paramaterArray.length; i++) {
				Parameters objPrameter = paramaterArray[i];
				actionParametersDto = new ActionParametersDto();
				actionParametersDto.setDataType(objPrameter.getClazz().getSimpleName());
				actionParametersDto.setDisplayName(objPrameter.getDisplayName());
				actionParametersDto.setOrdinal(i);
				actionParametersDto.setPossibleValue(objPrameter.getPossibleValue());
				actionParametersDto.setName(objPrameter.getName());
				actionParameterList.add(actionParametersDto);
			}
			actionDto.setParameters(actionParameterList);
			actionList.add(actionDto);
		}
		logger.info("completed cartPreActionsMethodList().");
		return actionList;
	}

}
