package com.bnt.ruleengine.sample.adp;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.bnt.adapter.validations.AdapterPostActions;
import com.bnt.adapter.validations.CartPreActions;
import com.bnt.bswitch.query.parser.Condition;
import com.bnt.bswitch.transformer.processor.FieldTransformation;
import com.bnt.bswitch.transformer.processor.transaction.AdapterRequestMapping;
import com.bnt.bswitch.transformer.processor.transaction.AdapterResponseMapping;
import com.bnt.bswitch.transformer.processor.transaction.AdapterTransaction;
import com.bnt.bswitch.transformer.processor.transaction.CartRequestMapping;
import com.bnt.bswitch.transformer.processor.transaction.CartResponseMapping;
import com.bnt.bswitch.transformer.processor.transaction.ConditionalResponse;
import com.bnt.bswitch.transformer.processor.transaction.TransactionFieldsMapping;
import com.bnt.bswitch.transformer.processor.transaction.TransactionSet;

public class UIJsonUtility {

	/**
	 * Iterate through each MessageMapping set messageType set Api name Condition
	 * Object Request Mapping object -set constant field -set constant imdg Response
	 * Mapping object Multi-Response Mapping object
	 * 
	 * @param mappingUI
	 */
	public static TransactionSet process(TransactionMappingUi mappingUI) {
		List<Object> listObjects = new ArrayList<>();
		Map<String, Object> commonMap = new HashMap<>();
		commonMap.put(AdpConstants.ADAPTER_TYPE, mappingUI.getAdapterType());
		commonMap.put(AdpConstants.TEMPLATE_TYPE, mappingUI.getTemplateType());
		for (MessageMapping messageMapping : mappingUI.getListMessageMapping()) {
			Map<String, Object> mapInternalObjects = buildInternalMapObjects(messageMapping, commonMap);
			listObjects.add(mapInternalObjects);
		}
		return buildFinalObject(listObjects);
	}

	/**
	 * Creates Internal objects for each message type.
	 * 
	 * @param messageMapping
	 * @param adapterType
	 * @param templateType
	 * @return
	 */
	private static Map<String, Object> buildInternalMapObjects(MessageMapping messageMapping,
			Map<String, Object> mapObject) {

		Map<String, Object> mapInternalObjects = new HashMap<>();
		mapInternalObjects.put(AdpConstants.MESSAGE_TYPE, messageMapping.getMessageType());
		mapInternalObjects.put(AdpConstants.API_NAME, messageMapping.getApiName());
		mapInternalObjects.put(AdpConstants.MESSAGE_CONDITION, messageMapping.getCondition());
		mapObject.put(AdpConstants.SCHEME_TYPE, AdpConstants.TEXT_REQUEST);
		mapObject.put(AdpConstants.NETWORK_SERVICE, messageMapping.getNetworkService());
		mapInternalObjects.put(AdpConstants.REQUEST, fetchAdapterFieldsMapping(messageMapping, mapObject));//
		if (messageMapping.isMultiResponse()) {
			mapObject.put(AdpConstants.SCHEME_TYPE, AdpConstants.TEXT_RESPONSE);
			mapObject.put(AdpConstants.MULTI_RESPONSE, AdpConstants.MULTI_RESPONSE);
			mapInternalObjects.put(AdpConstants.MULTI_RESPONSE,
					fetchAdapterMultiResponseFieldsMapping(messageMapping, mapObject));
		} else {
			mapObject.put(AdpConstants.SCHEME_TYPE, AdpConstants.TEXT_RESPONSE);
			mapInternalObjects.put(AdpConstants.RESPONSE, fetchAdapterFieldsMapping(messageMapping, mapObject));
		}
		return mapInternalObjects;
	}

	private static TransactionSet buildFinalObject(List<Object> listObjects) {
		List<AdapterTransaction> listAdapterTransaction = new ArrayList<>();
		for (Object object : listObjects) {
			listAdapterTransaction.add(fetchAdapterTransaction(object));
		}
		return new TransactionSet(listAdapterTransaction);
	}

	/**
	 * Transform request mapping for Adapter(L1) & Cart(L3): UI Objects -> Switch
	 * Backend Objects
	 * 
	 * @param messageMapping : UI
	 * @param schemeType
	 * @param adapterType
	 * @param templateType
	 * @return TODO: All mapping for Request has to be created.[]
	 */
	public static TransactionFieldsMapping fetchAdapterFieldsMapping(MessageMapping messageMapping,
			Map<String, Object> mapObject) {
		String adapterType = (String) mapObject.get(AdpConstants.ADAPTER_TYPE);
		String schemeType = (String) mapObject.get(AdpConstants.SCHEME_TYPE);
		String templateType = (String) mapObject.get(AdpConstants.TEMPLATE_TYPE);

		List<FieldTransformation> listAllMappingFields = new ArrayList<>();
		// Add all constant fields
		listAllMappingFields.addAll(MappingUtiltiy.fetchConstantFieldList(
				MappingUtiltiy.getResReqConstantFieldList(messageMapping, mapObject), mapObject));
		// Add all copy as is fields
		listAllMappingFields.addAll(MappingUtiltiy
				.fetchCopyAsIsFieldList(MappingUtiltiy.getResReqCopyAsIsList(messageMapping, mapObject), mapObject));
		// Add all extract fields
		listAllMappingFields.addAll(MappingUtiltiy
				.fetchExtractFieldList(MappingUtiltiy.getResReqExtractList(messageMapping, mapObject), mapObject));
		// Add all Join fields(L3 Only)
		listAllMappingFields.addAll(MappingUtiltiy
				.fetchJoinFieldList(MappingUtiltiy.getResReqMappingJoinList(messageMapping, mapObject), mapObject));
		// Add all Mapper fields
		listAllMappingFields.addAll(MappingUtiltiy
				.fetchMapperFieldList(MappingUtiltiy.getResReqMappingMapperList(messageMapping, mapObject), mapObject));
		// Add all Script fields
		listAllMappingFields.addAll(MappingUtiltiy
				.fetchScriptFieldList(MappingUtiltiy.getResReqMappingScriptList(messageMapping, mapObject)));
		if (AdpConstants.L1.equals(adapterType)) {
			// Add all Script fields
			listAllMappingFields
					.addAll(MappingUtiltiy.fetchEchoFieldList(messageMapping.getListEchoMapping(), mapObject));

		}
		// Add all ArraySupport fields //
		if ((AdpConstants.L1.equals(adapterType) && schemeType.equals(AdpConstants.TEXT_REQUEST))
				|| (AdpConstants.L3.equals(adapterType) && schemeType.equals(AdpConstants.TEXT_RESPONSE))) {
			listAllMappingFields.addAll(
					MappingUtiltiy.fetchArraySupportFieldList(messageMapping, schemeType, adapterType, templateType));
		}
		if (AdpConstants.L1.equals(adapterType) && schemeType.equals(AdpConstants.TEXT_REQUEST)) {
			List<AdapterPostActions> listPostActions = messageMapping.getRequestMapping().getListAdapterPostActions();
			if (schemeType.equals(AdpConstants.TEXT_REQUEST) && listPostActions != null && listPostActions.size() > 0) {
				return new AdapterRequestMapping(listAllMappingFields, listPostActions);
			}
			return new AdapterRequestMapping(listAllMappingFields, null);
		} else if (AdpConstants.L3.equals(adapterType) && schemeType.equals(AdpConstants.TEXT_REQUEST)) {
			List<CartPreActions> listPreActions = messageMapping.getRequestMapping().getListCartPreActions();
			if (schemeType.equals(AdpConstants.TEXT_REQUEST) && listPreActions != null && listPreActions.size() > 0) {
				return new CartRequestMapping(listAllMappingFields, listPreActions);
			}
			return new CartRequestMapping(listAllMappingFields, null);
		} else if (AdpConstants.L1.equals(adapterType) && schemeType.equals(AdpConstants.TEXT_RESPONSE)) {
			return new AdapterResponseMapping(listAllMappingFields, null);
		} else if (AdpConstants.L3.equals(adapterType) && schemeType.equals(AdpConstants.TEXT_RESPONSE)
				&& !messageMapping.isMultiResponse()) {
			return new CartResponseMapping(listAllMappingFields, null);
		} else {
			return null;
		}
	}

	private static List<ConditionalResponse> fetchAdapterMultiResponseFieldsMapping(MessageMapping messageMapping,
			Map<String, Object> mapObject) {
		List<ConditionalResponse> listConditionalResponse = new ArrayList<>();
		List<AdapterReqResMapping> listResponseMapping = messageMapping.getListResponseMapping();
		if (listResponseMapping != null && !listResponseMapping.isEmpty()) {
			for (AdapterReqResMapping responseMapping : listResponseMapping) {
				listConditionalResponse.add(MultiResponseUtility.fetchConditionalResponse(responseMapping, mapObject));
			}
		}
		return listConditionalResponse;
	}

	private static AdapterTransaction fetchAdapterTransaction(Object object) {
		if (object != null) {
			Map<String, Object> map = (Map) object;
			String messageType = null;
			String apiName = null;
			Condition condition = null;
			TransactionFieldsMapping requestMapping = null;
			TransactionFieldsMapping responseMapping = null;
			List<ConditionalResponse> conditionalResponses = new ArrayList<>();
			for (Map.Entry<String, Object> entry : map.entrySet()) {
				if (entry.getKey().equals(AdpConstants.MESSAGE_TYPE)) {
					messageType = (String) entry.getValue();
				} else if (entry.getKey().equals(AdpConstants.MESSAGE_CONDITION)) {
					condition = (Condition) entry.getValue();
				} else if (entry.getKey().equals(AdpConstants.REQUEST)) {
					requestMapping = (TransactionFieldsMapping) entry.getValue();
				} else if (entry.getKey().equals(AdpConstants.RESPONSE)) {
					responseMapping = (TransactionFieldsMapping) entry.getValue();
				} else if (entry.getKey().equals(AdpConstants.MULTI_RESPONSE)) {
					conditionalResponses = (List<ConditionalResponse>) entry.getValue();
				} else if (entry.getKey().equals(AdpConstants.API_NAME)) {
					apiName = (String) entry.getValue();
				} else {
					// Not Valid KEY-VALUE mapping
				}
			}
			return new AdapterTransaction(messageType, apiName, requestMapping, responseMapping, conditionalResponses,
					condition);
		}
		return null;
	}
}
