package com.bnt.repo.mapper;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.apache.commons.csv.CSVRecord;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.ApacheCSVUtil;
import com.bnt.common.util.CollectionUtil;
import com.bnt.common.util.JsonObjectUtil;
import com.bnt.common.util.JsonPathUtil;
import com.bnt.common.util.StringUtil;
import com.bnt.constant.TxnUiConstants;
import com.bnt.rest.dto.TxnLogResponseWrapper;
import com.bnt.rest.dto.TxnLogResponseWrapper.OperationWrapper;
import com.bnt.rest.entity.TxnLogEntity;
import com.bnt.rest.entity.component.TxnLogConfigurationDto;
import com.bnt.rest.wrapper.dto.KeyValueWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Configuration
@PropertySource("classpath:txnLog.properties")
public class TxnLogJsonMapper {

	private static final Logger logger = LogManager.getLogger(TxnLogJsonMapper.class);

	private static final String MESSAGE_EXCHANGE = "message_exchange";
	public static final String MESSAGE_COLLECTION = "message_collection";
	public static final String ROUTE = "route";
	private static String msgCollection;
	private static String msgExchange;
	private static String msgServiceTypeEnum;
	private static String adapterId;
	private static String txnRoute;
	private static String msgResponse;
	private static String msgRequest;
	private static String msgAdditionalFields;
	private static String pinBlock;
	private static String processingStatus;
	private static String originalDataElement;
	private static String parentTransactionId;
	private static String rrnOfTxnId;
	private static String txnType;
	private static String type;
	private static String respCode;
	public static final String REQUEST = "request_message";
	public static final String RESPONSE = "response_message";
	public static final String GATEWAY_MESSAGE_EXCHANGE_PATH = "message_collection[0].message_exchange";
	public static final String ADDITIONALFIELDS = "additionalFields";

	public TxnLogJsonMapper( /* @Value("${msg.domainObject}") String domainObject, */
			@Value("${msg.request}") String msgTxnRequest,
			@Value("${service.type}") String msgServiceType,
			@Value("${adapter.id}") String adpId,
			@Value("${pos.txn.type}") String posTxnType,
			@Value("${pos.payment.method}") String posPaymentMethod,
			@Value("${inflight.transactions}") String msgTxnCollection,
			@Value("${msg.exchange}") String msgTxnExchange,
			@Value("${internal.processingCode}") String internalProceCode,
			@Value("${msg.route}") String msgRoute,
			@Value("${msg.response}") String msgTxnResponse,
			@Value("${auditInfo.createdOn}") String createdOn,
			@Value("${processingStatus}") String procStatus,
			@Value("${original_data_element}") String txnOriginalDataElement,
			@Value("${parent_transaction_id}") String parentTxnId,
			@Value("${rrn}") String rrn,
			@Value("${transaction_type_indicator}") String txnTypeIndicator,
			@Value("${type}") String typeLabel,
			@Value("${msg.additionalfields}") String msgTxnAdditionalFields,
			@Value("${response.code}") String responseCode,
			@Value("${transaction.response}") String transactionResponse) {
		
		logger.info(" for transactionResponse {}", transactionResponse);

		msgCollection = msgTxnCollection;
		msgExchange = msgTxnExchange;
		msgServiceTypeEnum = msgServiceType;
		txnRoute = msgRoute;
		msgResponse = msgTxnResponse;
		msgRequest = msgTxnRequest;
		msgAdditionalFields = msgTxnAdditionalFields;
		originalDataElement = txnOriginalDataElement;
		parentTransactionId = parentTxnId;
		rrnOfTxnId = rrn;
		txnType = txnTypeIndicator;
		type = typeLabel;
		processingStatus = procStatus;
		adapterId = adpId;
		this.respCode = responseCode;
	}

	public static TxnLogResponseWrapper mapTxnEntityToResponse(TxnLogEntity entity, TxnLogConfigurationDto txnConfig,
			Map<String, String> destinationMap, Boolean forReview, String specFileName) {
		String serializedtxnData = entity.getTransactionData();
		JSONObject messageContext = JsonObjectUtil.getJsonObjectFromString(serializedtxnData);
		TxnLogResponseWrapper txnLogResponse = null;
		try {
			txnLogResponse = TxnLogJsonMapper.setStaticData(entity, txnConfig, destinationMap, null, forReview);
		} catch (Exception e) {
			logger.error("Error in mapping static data of JSON to UI Response  {}", e.getMessage());
			throw new RippsAdminException("Error in mapping static data of JSON to UI Response " + e.getMessage());
		}
		try {
			if (messageContext != null) {
				JSONObject modifiedMessageContext = getModifiedMessageContextByExclusionResource(messageContext,
						specFileName);
				if (modifiedMessageContext != null) {
					messageContext = modifiedMessageContext;
				}
				setProcessingStatus(txnLogResponse, messageContext, txnConfig);
				setServicesData(txnLogResponse, messageContext, specFileName, txnConfig);
			}
		} catch (Exception e) {
			logger.error("Error in mapping service data of JSON to UI Response {} ", e.getMessage());
			throw new RippsAdminException("Error in mapping service data of JSON to UI Response " + e.getMessage());
		}
		return txnLogResponse;
	}

	private static void setProcessingStatus(TxnLogResponseWrapper txnLogResponse, JSONObject messageContext,
			TxnLogConfigurationDto txnConfig) {
		txnLogResponse.setProcessingStatus(
				JsonObjectUtil.getStringValueWithNullValueCheck(messageContext, txnConfig.getProcessingStatus()));
	}

	private static JSONObject getModifiedMessageContextByExclusionResource(JSONObject messageContext,
			String specFileName) {

		JSONObject modifiedMessageContext = null;
		try {
			Set<String> exclusionKeys = getExclusionKeys(messageContext, specFileName);
			if (!(CollectionUtil.isCollectionEmptyOrNull(exclusionKeys))) {
				logger.info("Set of Keys to exclude:{} ", exclusionKeys);
				modifiedMessageContext = JsonObjectUtil.excludeKeysFromJSON(messageContext, exclusionKeys);
				logger.info("Modified Message Context  {} ", modifiedMessageContext);
			}
		} catch (Exception e) {
			logger.error("setServicesData: error in set service data for ");
			throw new RippsAdminException(
					"error in setting services data of JSON to UI Response" + ":" + e.getMessage());
		}
		return modifiedMessageContext;
	}

	private static TxnLogResponseWrapper setServicesData(TxnLogResponseWrapper txnLogResponse,
			JSONObject messageContext, String specFile, TxnLogConfigurationDto txnConfig) {

		logger.info("setServicesData() for specFile {}", specFile);
		String serviceTypeEnum = null;
		List<TxnLogResponseWrapper.OperationWrapper> operations = new ArrayList<>();
		try {
			JSONArray messageCollection = messageContext.getJSONArray(msgCollection);
			JSONObject message = null;
			JSONObject messageExchange = null;

			for (int i = 0; i < messageCollection.length(); i++) {
				message = messageCollection.getJSONObject(i);
				messageExchange = message.getJSONObject(msgExchange);
				TxnLogResponseWrapper.OperationWrapper operation = null;
				serviceTypeEnum = JsonObjectUtil.getStringValue(messageExchange, msgServiceTypeEnum);
				if (!(serviceTypeEnum.equals(TxnUiConstants.GATEWAY_SERVICE))) {
					if (!(checkIfRouteExists(txnLogResponse, messageExchange))) {
						logger.error("No destination specified in the message context json");
						break;
					}
					operation = setOperation(txnLogResponse, messageExchange, i);
				} else {
					setTxnDataForGateway(txnLogResponse, messageExchange, txnConfig, i);
				}
				if (operation != null) {
					operations.add(operation);
				}
			}
		} catch (Exception e) {
			logger.error("setServicesData: error in set service data for {}", serviceTypeEnum);
			throw new RippsAdminException(
					"error in setting services data of JSON to UI Response" + serviceTypeEnum + ":" + e.getMessage());
		}
		txnLogResponse.setOperations(operations);
		return txnLogResponse;
	}

	@SuppressWarnings("unused")
	private static JSONObject modifyFieldNames(JSONObject messageContext) {
		Map<String, String> keyMap = new LinkedHashMap<>();
		keyMap.put("mti", "domain_request_mti");
		messageContext = JsonObjectUtil.renameKeysFromJSON(messageContext,
				GATEWAY_MESSAGE_EXCHANGE_PATH + "." + REQUEST, keyMap);
		keyMap.clear();
		keyMap.put("mti", "domain_response_mti");
		messageContext = JsonObjectUtil.renameKeysFromJSON(messageContext,
				GATEWAY_MESSAGE_EXCHANGE_PATH + "." + RESPONSE, keyMap);
		return messageContext;
	}

	private static Set<String> getExclusionKeys(JSONObject messageContext, String specFilePath) {

		Iterable<CSVRecord> csvRecords = ApacheCSVUtil.readCSVFile(specFilePath, true);
		String filters = null;
		int index = 0;
		for (CSVRecord csvRecord : csvRecords) {
			index++;
			filters = csvRecord.get(0);

			// Parse filters String into array of records
			if (Boolean.TRUE.equals(parseFilter(messageContext, filters))) {

				logger.info("Exclusion Criteria has been matched at index {}{}{}", index,
						" with the given condition of row in spec file:", filters);
				List<String> exclusionList = ApacheCSVUtil.convertCSVRecordToList(csvRecord, 1);
				Set<String> exclusionSet = new HashSet<>(exclusionList);
				if (!(CollectionUtil.isCollectionEmptyOrNull(exclusionSet))) {
					return exclusionSet;
				}
			}
		}
		return new HashSet<>();
	}

	private static Boolean parseFilter(JSONObject messageContext, String filters) {
		Map<String, Object> flatMap = JsonPathUtil.getFlatMap(messageContext.toString(), false);

		logger.info("flat map of message context is :{}", flatMap);

		String operationType = null;
		String[] filterArray = null;
		Integer validate = null;
		boolean isValidated = false;
		if (filters.contains("&&")) {
			filterArray = filters.split("&&");
			operationType = "AND";
		} else if (filters.contains("||")) {
			filterArray = filters.split("||");
			operationType = "OR";
		} else {
			filterArray = new String[] { filters };
		}
		int counter = 0;
		isValidated = parseFilter1(flatMap, operationType, filterArray, validate, isValidated, counter);
		return isValidated;
	}

	private static boolean parseFilter1(Map<String, Object> flatMap, String operationType, String[] filterArray,
			Integer validate, boolean isValidated, int counter) {
		if (filterArray != null) {
			for (String each : filterArray) {

				if (each.contains("=")) {
					String param = each.split("=")[0];
					String value = each.split("=")[1];
					counter++;

					validate = parseFilter2(flatMap, operationType, filterArray, validate, counter, param, value);

					isValidated = (validate != null && validate.equals(1)) ? Boolean.TRUE : Boolean.FALSE;
					/**
					 * if (validate != null && validate.equals(-1)) { isValidated = false; }
					 * 
					 * else if (validate != null && validate.equals(1)) { isValidated = true; } else
					 * { isValidated= false; }
					 */
				}
			}
		}
		return isValidated;
	}

	private static Integer parseFilter2(Map<String, Object> flatMap, String operationType, String[] filterArray,
			Integer validate, int counter, String param, String value) {
		String checkValue;
		if (flatMap.containsKey(param) && flatMap.get(param) instanceof String pr) {
			checkValue = (String) flatMap.get(pr);
			validate = validateValue(value, checkValue, operationType, filterArray.length, counter);
		}
		return validate;
	}

	private static Integer validateValue(String value, String checkValue, String operation, int filterLength,
			int currentIteration) {
		if (value.equalsIgnoreCase(checkValue)) {

			if (filterLength == currentIteration) {
				return 1;
			}
			if (operation != null && operation.equals("AND")) {
				return -1;
			} else if (operation != null && operation.equals("OR")) {
				return 1;
			}
		} else {
			if (operation != null && operation.equals("OR")) {
				return -1;
			} else {
				return 0;
			}
		}
		return null;
	}

	private static void setTxnDataForGateway(TxnLogResponseWrapper txnLogResponse, JSONObject messageExchange,
			TxnLogConfigurationDto txnConfig, int messageIndex) {
		JSONObject requestObject = messageExchange.getJSONObject(REQUEST);
		txnLogResponse.setMessageTypeIndicator(TxnLogMapper.getMessageTypeIndicator(requestObject, txnConfig));
		if (TxnUiConstants.AUTHORIZATION.equals(txnLogResponse.getMessageTypeIndicator())) {
			setParentTxnId(messageExchange, txnLogResponse);
		}
		setTxnType(txnLogResponse, messageExchange);
		try {
			List<KeyValueWrapper> additionalParamsList = txnLogResponse.getAdditionalParams();
			if (txnLogResponse.getAdditionalParams() == null) {
				additionalParamsList = new ArrayList<>();
			}
			Map<String, List<KeyValueWrapper>> additionalParamsMap = new HashMap<>();
			List<KeyValueWrapper> gatewayList = setGatewayServiceData(messageExchange, messageIndex,
					additionalParamsMap);
			additionalParamsList.addAll(gatewayList);
			/**
			 * if (null!=gatewayList) { additionalParamsList.addAll(gatewayList); }
			 */
			txnLogResponse.setAdditionalParams(additionalParamsList);
			txnLogResponse.setAdditionalParamsRequest(splitAndMap(additionalParamsMap.get("request")));
			txnLogResponse.setAdditionalParamsResponse(splitAndMap(additionalParamsMap.get("response")));
			txnLogResponse.setAdditionalFields(splitAndMap(additionalParamsMap.get(ADDITIONALFIELDS)));
		} catch (Exception e) {
			logger.error("error in setting gateway data of JSON to UI Response {}", e.getMessage());
			throw new RippsAdminException("error in setting gateway data of JSON to UI Response" + e.getMessage());
		}
	}

	private static void setTxnType(TxnLogResponseWrapper txnLogResponse, JSONObject messageExchange) {
		JSONObject requestObject = messageExchange.getJSONObject(REQUEST);
		JSONObject txnTypeIndicator = JsonObjectUtil.getJSONObject(requestObject, txnType);
		if (txnTypeIndicator != null) {
			txnLogResponse.setTxnType(JsonObjectUtil.getStringValue(txnTypeIndicator, type));
		}
	}

	private static OperationWrapper setOperation(TxnLogResponseWrapper txnLogResponse, JSONObject messageExchange,
			int messageIndex) {

		TxnLogResponseWrapper.OperationWrapper operation = txnLogResponse.new OperationWrapper();
		try {
			String serviceTypeEnum = getServiceType(messageExchange);
			String route = JsonObjectUtil.getStringValueWithNullValueCheck(messageExchange, txnRoute);
			if (!(StringUtil.isEmptyOrNull(route))) {
				operation.setName(getDestinationNameByRouteCode(route, txnLogResponse.getDestinationMap()));
				setDomainSpecificServiceData(messageExchange, operation, messageIndex);
			} else {
				logger.error("route is not exists for given service : {}", serviceTypeEnum);
				throw new RippsAdminException("route is not exists for given service :" + serviceTypeEnum);
			}
		} catch (Exception e) {
			logger.error("error in mapping provider response json data to UI Response {}", e.getMessage());
			throw new RippsAdminException(
					"error in mapping provider response json data to UI Response" + e.getMessage());
		}
		return operation;
	}

	@SuppressWarnings("unused")
	private static void setTxnResponse(JSONObject messageExchange, TxnLogResponseWrapper.OperationWrapper operation,
			TxnLogResponseWrapper txnLogResponse) {
		logger.info("inside setTxnResponse().. for operation {}", operation);
		TxnLogResponseWrapper.TxnStatusWrapper status = txnLogResponse.new TxnStatusWrapper();
		status.setText(JsonObjectUtil.getStringValueWithNullValueCheck(messageExchange, processingStatus));
		if (status.getText() != null) {
			TxnLogMapper.setProcessingStatusToUI(status);
			txnLogResponse.setTxnResponse(status);
		}
	}

	private static void setParentTxnId(JSONObject messageExchange, TxnLogResponseWrapper txnLogResponse) {
		JSONObject requestObject = JsonObjectUtil.getChildJSONObject(messageExchange, REQUEST);
		String uuid = JsonObjectUtil.getStringValueWithNullValueCheck(requestObject, parentTransactionId);
		if (StringUtil.isNotNullOrBlank(uuid)) {
			txnLogResponse.setParentTxnId(uuid);
		} else {
			String rrn = JsonObjectUtil.getStringValueWithNullValueCheck(requestObject, rrnOfTxnId);
			txnLogResponse.setParentTxnId(rrn);
		}
	}

	private static List<KeyValueWrapper> setGatewayServiceData(JSONObject messageExchange, int messageIndex,
			Map<String, List<KeyValueWrapper>> additionalParamsMap) {
		List<KeyValueWrapper> gatewayList = new LinkedList<>();

		JSONObject request = null;
		JSONObject response = null;
		String requestResponsePath;
		try {
			request = messageExchange.getJSONObject(REQUEST);
			requestResponsePath = getRequestResponsePath(messageIndex, REQUEST);
			getGatewayRequestResponse(gatewayList, request.toString(), requestResponsePath, additionalParamsMap,
					"request");
		} catch (Exception e) {
			logger.error("error in mapping gateway service request json data to UI Response {}", e.getMessage());
			throw new RippsAdminException(
					"error in mapping gateway service request json data to UI Response" + e.getMessage());
		}
		try {
			if (!messageExchange.isNull(msgResponse)) {
				response = messageExchange.getJSONObject(msgResponse);
				requestResponsePath = getRequestResponsePath(messageIndex, RESPONSE);
				getGatewayRequestResponse(gatewayList, response.toString(), requestResponsePath, additionalParamsMap,
						"response");
			}
		} catch (Exception e) {
			logger.error("error in mapping gateway service response json data to UI Response {}", e.getMessage());
			throw new RippsAdminException(
					"error in mapping gateway service request json data to UI Response" + e.getMessage());
		}

		try {
			if (!messageExchange.isNull(msgAdditionalFields)) {
				response = messageExchange.getJSONObject(msgAdditionalFields);
				requestResponsePath = getRequestResponsePath(messageIndex, ADDITIONALFIELDS);
				getGatewayRequestResponse(gatewayList, response.toString(), requestResponsePath, additionalParamsMap,
						ADDITIONALFIELDS);
			}
		} catch (Exception e) {
			logger.error("error in mapping gateway service addition field json data to UI Response {}", e.getMessage());
			throw new RippsAdminException(
					"error in mapping gateway service addition field json data to UI Response" + e.getMessage());
		}
		return gatewayList;
	}

	private static void getGatewayRequestResponse(List<KeyValueWrapper> gatewayList, String requestResponseJson,
			String requestResponsePath, Map<String, List<KeyValueWrapper>> additionalParamsMap, String scheme) {

		List<KeyValueWrapper> requestResponseList = flattenRequestResponseToKeyValueWrapperList(requestResponseJson,
				requestResponsePath, null);
		if (Optional.ofNullable(requestResponseList).isPresent()) {
			additionalParamsMap.put(scheme, requestResponseList);
			gatewayList.addAll(requestResponseList);
		}
		// sorted while creation.
		// Why after add All, we need to sort
		Collections.sort(gatewayList);
	}

	/**
	 * Flattening the Provider JSON spec into a map of key value.
	 */
	private static OperationWrapper setDomainSpecificServiceData(JSONObject messageExchange, OperationWrapper operation,
			int messageIndex) {

		String serviceTypeEnum = getServiceType(messageExchange);
		try {
			setRequestResponseFields(messageExchange, operation, messageIndex);
			if ("ATM".equalsIgnoreCase(operation.getDeviceTypeCode())) {
				TxnLogAtmJsonMapper.setRequestResponseFields(messageExchange, operation, messageIndex);
			}
		} catch (Exception e) {
			logger.error("setDomainSpecificServiceData: for service type: {}", serviceTypeEnum);
		}
		return operation;
	}

	public static void setRequestResponseFields(JSONObject modifiedMessageExchange, OperationWrapper operation,
			int messageIndex) {
		logger.info("Setting request response data for service name:{}", operation.getName());
		JSONObject request = JsonObjectUtil.getChildJSONObject(modifiedMessageExchange, msgRequest);
		JSONObject response = JsonObjectUtil.getChildJSONObject(modifiedMessageExchange, msgResponse);
		String serviceProcessingStatus = JsonObjectUtil.getStringValue(modifiedMessageExchange, processingStatus);

		Map<String, List<KeyValueWrapper>> requestMap = new LinkedHashMap<>();
		Map<String, List<KeyValueWrapper>> responseMap = new LinkedHashMap<>();
		if (request != null) {
			requestMap = getProviderMap(messageIndex, request, REQUEST, serviceProcessingStatus);
		}
		if (response != null) {
			responseMap = getProviderMap(messageIndex, response, RESPONSE, serviceProcessingStatus);
		}
		operation.setRequest(requestMap);
		operation.setResponse(responseMap);
		setAdditionalFields(modifiedMessageExchange, operation, messageIndex, serviceProcessingStatus);
	}

	public static void setAdditionalFields(JSONObject modifiedMessageExchange, OperationWrapper operation,
			int messageIndex, String serviceProcessingStatus) {
		logger.info("Setting request response data for service name:{}", operation.getName());
		JSONObject addtionalFieldJson = JsonObjectUtil.getChildJSONObject(modifiedMessageExchange, msgAdditionalFields);
		if (!StringUtil.isNotNullOrBlank(serviceProcessingStatus)) {
			serviceProcessingStatus = JsonObjectUtil.getStringValue(modifiedMessageExchange, processingStatus);
		}
		Map<String, List<KeyValueWrapper>> addtionalFieldMap = new LinkedHashMap<>();
		if (addtionalFieldJson != null) {
			addtionalFieldMap = getProviderMap(messageIndex, addtionalFieldJson, ADDITIONALFIELDS,
					serviceProcessingStatus);
		}
		operation.setAdditionalField(addtionalFieldMap);
	}

	private static Map<String, List<KeyValueWrapper>> getProviderMap(int messageIndex, JSONObject requestResponseObject,
			String messageType, String serviceProcessingStatus) {
		Map<String, List<KeyValueWrapper>> requestResponseMap;
		String requestResponseJson = requestResponseObject.toString();
		String requestResponsePath = getRequestResponsePath(messageIndex, messageType);
		requestResponseMap = getProviderRequestResponse(requestResponseJson, requestResponsePath,
				serviceProcessingStatus);
		return requestResponseMap;
	}

	private static String getRequestResponsePath(int messageIndex, String type) {
		return MESSAGE_COLLECTION + "[" + messageIndex + "]" + "." + MESSAGE_EXCHANGE + "." + type;
	}

	/**
	 * Common method to Convert Provider request/response JSON, flatten the JSON
	 * into a map, split the map into two maps so that UI will render the attributes
	 * by managing the UI width into first column and second column. returns the Map
	 * of key value wrapper list
	 */
	static Map<String, List<KeyValueWrapper>> getProviderRequestResponse(String requestResponseJson,
			String requestResponsePath, String serviceProcessingStatus) {

		List<KeyValueWrapper> requestResponseList = flattenRequestResponseToKeyValueWrapperList(requestResponseJson,
				requestResponsePath, serviceProcessingStatus);
		return splitAndMap(requestResponseList);
	}

	@SuppressWarnings("unchecked")
	public static Map<String, List<KeyValueWrapper>> splitAndMap(List<KeyValueWrapper> requestResponseList) {
		List[] splitReqResList = CollectionUtil.splitList(requestResponseList);
		Map<String, List<KeyValueWrapper>> requestResponseMap = new LinkedHashMap<>();
		if (!(CollectionUtil.isArrayEmptyOrNull(splitReqResList))) {
			requestResponseMap.put(TxnUiConstants.LABEL_FIRST_COLUMN, splitReqResList[0]);
			requestResponseMap.put(TxnUiConstants.LABEL_SECOND_COLUMN, splitReqResList[1]);
			requestResponseMap.put(TxnUiConstants.LABEL_THIRD_COLUMN, splitReqResList[2]);
		}
		return requestResponseMap;
	}

	/**
	 * Flatten request response to list.
	 */
	@SuppressWarnings("unchecked")
	public static List<KeyValueWrapper> flattenRequestResponseToKeyValueWrapperList(String requestResponseJson,
			String requestResponsePath, String serviceProcessingStatus) {

		logger.info("flattenRequestResponseToKeyValueWrapperList() for serviceProcessingStatus {}",
				serviceProcessingStatus);
		Map<String, Object> requestResponseDetailMap = null;
		if (requestResponsePath.contains("additionalFields")) {
			try {
				requestResponseDetailMap = new ObjectMapper().readValue(requestResponseJson, HashMap.class);
				if (requestResponseDetailMap.containsKey("http_headers")) {
					JsonObject convertedObject = new Gson().fromJson(requestResponseJson, JsonObject.class);
					requestResponseDetailMap = new ObjectMapper()
							.readValue(convertedObject.get("http_headers").toString(), HashMap.class);
				}
			} catch (JsonProcessingException e) {
				logger.error(e);
			}

		} else {
			requestResponseDetailMap = JsonObjectUtil.getFlatMapOfJson(requestResponseJson, true, false);
		}
		processSpecificKeysOfRequestResponse(requestResponseDetailMap);
		return KeyValueWrapper.getKeyValueWrapperList(requestResponseDetailMap, requestResponsePath);
	}

	/**
	 * Process specific keys of gateway request response.
	 */
	private static void processSpecificKeysOfRequestResponse(Map<String, Object> requestResponseDetailMap) {
		if (null != requestResponseDetailMap && requestResponseDetailMap.get(pinBlock) != null) {
			requestResponseDetailMap.remove(pinBlock);
		}
	}

	/**
	 * Get processor adapter code by id.
	 */
	private static String getDestinationNameByRouteCode(String routeCode, Map<String, String> destinationMap) {
		return destinationMap.get(routeCode);
	}

	private static String convertDateToString(String date) {
		SimpleDateFormat format1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		SimpleDateFormat format2 = new SimpleDateFormat("MMM dd, yyyy HH:mm:ss");
		Date date1 = null;
		try {
			date1 = format1.parse(date);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return format2.format(date1);
	}

	public static TxnLogResponseWrapper setStaticData(TxnLogEntity entity, TxnLogConfigurationDto txnConfig,
			Map<String, String> destinationMap, Map<String, String> currencyMap, Boolean forReview) {

		TxnLogResponseWrapper txnLogResponse = new TxnLogResponseWrapper();

		try {
			txnLogResponse.setId(entity.getId());
			txnLogResponse.setTxnId(entity.getTxnId());
			txnLogResponse.setTxnType(entity.getTxnType());
			txnLogResponse.setDeviceCode(entity.getTerminalId());
			txnLogResponse.setMerchantCode(entity.getMerchantId());
			txnLogResponse.setPspRefId(entity.getTxnPspReference());
			txnLogResponse.setDate(entity.getTxnRecDateTime());
			TxnLogMapper.setStatus(entity, txnLogResponse);

			txnLogResponse.setDestinationMap(destinationMap);
			txnLogResponse.setCurrencyMap(currencyMap);
			if (entity.getTxnRecDateTime() != null) {
				txnLogResponse.setDateString(convertDateToString(entity.getTxnRecDateTime().toString()));
			} else {
				txnLogResponse.setDateString("");
			}
		} catch (Exception e) {
			logger.error("error in setting static data of JSON to UI Response {} forReview: {} ", txnConfig, forReview,
					e);
			throw new RippsAdminException("error in setting static data of JSON to UI Response" + e);
		}
		return txnLogResponse;
	}

	private static String getServiceType(JSONObject messageExchange) {
		return JsonObjectUtil.getStringValue(messageExchange, msgServiceTypeEnum);
	}

	public static void setApprovedAmount(TxnLogConfigurationDto txnConfig, TxnLogResponseWrapper txnResponse,
			JSONObject responseObject) {
		if (responseObject != null) {
			try {
				JSONObject amount = getAmountObject(txnConfig, responseObject);
				if (amount != null) {
					txnResponse.setApprovedAmount(JsonObjectUtil.getDoubleValue(amount, txnConfig.getAmount()));
					txnResponse.setApprovedAmountCurrencyCode(
							JsonObjectUtil.getStringValue(amount, txnConfig.getCurrency()));
				}
			} catch (Exception e) {
				logger.error("Error in retrieving approved amount");
				logger.error(e);
			}
		}
	}

	private static JSONObject getAmountObject(TxnLogConfigurationDto txnConfig, JSONObject reqResObject) {
		JSONObject amount1 = null;
		try {
			amount1 = reqResObject.getJSONObject(txnConfig.getAmounts());
		} catch (JSONException e) {
			//logger.info("Not getting amount");
		}
		JSONObject amount = null;
		if (amount1 != null) {
			try {
				amount = amount1.getJSONObject(txnConfig.getAmountAuthTxn());
			} catch (JSONException e) {
				//logger.info("Not getting auth txn amount");
			}
			if (amount == null) {
				try {
					amount = amount1.getJSONObject(txnConfig.getAmountTransaction());
				} catch (JSONException e) {
					//logger.info("Not getting txn amount");
					return null;
				}
			}
		} else {
			return null;
		}
		return amount;
	}

	public static void setRequestedAmount(TxnLogConfigurationDto txnConfig, TxnLogResponseWrapper txnResponse,
			JSONObject requestObject) {
		if (requestObject != null) {
			try {
				JSONObject amount = getAmountObject(txnConfig, requestObject);
				if (amount != null) {
					txnResponse.setRequestedAmount(JsonObjectUtil.getDoubleValue(amount, txnConfig.getAmount()));
					txnResponse.setRequestedAmountCurrencyCode(
							JsonObjectUtil.getStringValue(amount, txnConfig.getCurrency()));
				}
			} catch (Exception e) {
				logger.error("Error in retrieving requested amount");
				logger.error(e);
			}
		}
	}

	private static boolean checkIfRouteExists(TxnLogResponseWrapper txnResponse, JSONObject messageExchange) {
		logger.info("inside checkIfRouteExists().. for txnResponse {}", txnResponse);
		Integer routeId;
		routeId = JsonObjectUtil.getIntegerValue(messageExchange, ROUTE);
		return routeId > 0;
	}
}
