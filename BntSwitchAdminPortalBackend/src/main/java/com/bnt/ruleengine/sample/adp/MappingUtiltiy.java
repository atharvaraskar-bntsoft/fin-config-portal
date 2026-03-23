package com.bnt.ruleengine.sample.adp;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.stream.Collectors;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.Lists;
import com.bnt.bswitch.transformer.processor.FieldMapping;
import com.bnt.bswitch.transformer.processor.FieldTransformation;
import com.bnt.bswitch.transformer.processor.GroovyExecutor;
import com.bnt.bswitch.transformer.processor.InBuiltMapper;
import com.bnt.bswitch.transformer.processor.JoinFields;
import com.bnt.bswitch.transformer.processor.Loop;
import com.bnt.bswitch.transformer.processor.Mapping;
import com.bnt.bswitch.transformer.processor.MappingSet;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class MappingUtiltiy {

	private static Log logger = LogFactory.getLog(MappingUtiltiy.class);
	/** The imf field. */
	// private static String imfField =
	// "${message_exchange[%s].request_message[%s]}";

	/** The imf field response. */
	// private static String imfFieldResponse =
	// "${message_exchange[%s].response_message[%s]}";

	private static String NATIVE_FIELD = "${message_exchange[%s].native_%s_message[%s]}";
	private static String ADDITIONAL_FIELD = "${message_exchange[%s].additional_fields[%s]}";
	private static String REQUEST_RESPONSE_FIELD = "${message_exchange[%s].%s_message[%s]}";

	public static List<FieldTransformation> fetchConstantFieldList(List<MappingConstantField> lisMappingConstant,
			Map<String, Object> mapObject) {
		List<FieldTransformation> listMapping = new ArrayList<>();
		if (null != lisMappingConstant) {
			for (MappingConstantField mappingConstantField : lisMappingConstant) {
				listMapping.add(fetchConstantMapping(mappingConstantField, mapObject));
			}
		}
		return listMapping;
	}

	public static List<FieldTransformation> fetchConstantFieldListExtract(
			List<MappingConstantField> lisMappingConstant) {
		List<FieldTransformation> listMapping = new ArrayList<>();
		if (null != lisMappingConstant) {
			for (MappingConstantField mappingConstantField : lisMappingConstant) {
				listMapping.add(fetchConstantMappingExtract(mappingConstantField));
			}
		}
		return listMapping;
	}

	public static List<MappingConstantField> getResReqConstantFieldList(MessageMapping messageMapping,
			Map<String, Object> mapObject) {
		List<MappingConstantField> listMappingConstantField = null;
		String schemeType = (String) mapObject.get(AdpConstants.SCHEME_TYPE);
		if (AdpConstants.TEXT_REQUEST.equalsIgnoreCase(schemeType)) {
			listMappingConstantField = messageMapping.getRequestMapping().getListConstantMappingField();
		} else if (AdpConstants.TEXT_RESPONSE.equalsIgnoreCase(schemeType)) {
			if (null != messageMapping.getListResponseMapping() && !messageMapping.getListResponseMapping().isEmpty()) {
				listMappingConstantField = messageMapping.getListResponseMapping().get(0).getListConstantMappingField();
			}
		}
		return listMappingConstantField;
	}

	public static Mapping fetchConstantMapping(MappingConstantField mappingConstantField,
			Map<String, Object> mapObject) {
		String adapterType = (String) mapObject.get(AdpConstants.ADAPTER_TYPE);
		String schemeType = (String) mapObject.get(AdpConstants.SCHEME_TYPE);
		if ((AdpConstants.L1.equals(adapterType) && AdpConstants.TEXT_REQUEST.equals(schemeType))
				|| (AdpConstants.L3.equals(adapterType) && AdpConstants.TEXT_RESPONSE.equals(schemeType))) {
			return fetchNormalConstantMapping(mappingConstantField, mapObject);
		} else if ((AdpConstants.L3.equals(adapterType) && AdpConstants.TEXT_REQUEST.equals(schemeType))
				|| (AdpConstants.L1.equals(adapterType) && AdpConstants.TEXT_RESPONSE.equals(schemeType))) {
			return fetchComplexConstantMapping(mappingConstantField, mapObject);
		}
		return null;
	}

	public static Mapping fetchConstantMappingExtract(MappingConstantField mappingConstantField) {
		return fetchComplexConstantMappingExtract(mappingConstantField);
	}

	public static Mapping fetchComplexConstantMapping(MappingConstantField mappingConstantField,
			Map<String, Object> mapObject) {
		String networkService = (String) mapObject.get(AdpConstants.NETWORK_SERVICE);
		String schemeType = (String) mapObject.get(AdpConstants.SCHEME_TYPE);

		List<String> destinations = new ArrayList<>();
		destinations
				.add(String.format(NATIVE_FIELD, networkService, schemeType, mappingConstantField.getPackagerField()));
		if (mappingConstantField.getDestination() != null) {
			destinations.add(ImfUtility.getFinalString(mappingConstantField.getDestination()));
		} else {
			destinations.add(String.format(ADDITIONAL_FIELD, networkService, mappingConstantField.getPackagerField()));
		}
		return new FieldMapping(destinations, mappingConstantField.getSource(), AdpConstants.SYSTEM_ERROR);
	}

	public static Mapping fetchComplexConstantMappingExtract(MappingConstantField mappingConstantField) {
//		String networkService = (String) mapObject.get(AdpConstants.NETWORK_SERVICE);
//		String schemeType = (String) mapObject.get(AdpConstants.SCHEME_TYPE);

		List<String> destinations = new ArrayList<>();
//		destinations.add(String.format(NATIVE_FIELD, networkService,schemeType, mappingConstantField.getPackagerField()));
		if (mappingConstantField.getDestination() != null) {
			destinations.add(ImfUtility.getFinalString(mappingConstantField.getDestination()));
		} else {
			destinations.add(String.format(mappingConstantField.getPackagerField()));
		}
		return new FieldMapping(destinations, mappingConstantField.getSource(), AdpConstants.SYSTEM_ERROR);
	}

	public static Mapping fetchNormalConstantMapping(MappingConstantField mappingConstantField,
			Map<String, Object> mapObject) {
		List<String> destinations = new ArrayList<>();
		destinations.add(ImfUtility.getFinalString(mappingConstantField.getDestination()));
		return new FieldMapping(destinations, mappingConstantField.getSource(), AdpConstants.SYSTEM_ERROR);
	}

	public static Mapping fetchNormalConstantMappingExtract(MappingConstantField mappingConstantField) {
		List<String> destinations = new ArrayList<>();
		destinations.add(ImfUtility.getFinalString(mappingConstantField.getDestination()));
		return new FieldMapping(destinations, mappingConstantField.getSource(), AdpConstants.SYSTEM_ERROR);
	}

	public static Collection<? extends FieldTransformation> fetchCopyAsIsFieldList(
			List<MappingCopyAsIs> listMappingCopyAsIs, Map<String, Object> mapObject) {
		List<FieldTransformation> listMapping = new ArrayList<>();
		if (null != listMappingCopyAsIs) {
			for (MappingCopyAsIs mappingCopyAsIs : listMappingCopyAsIs) {
				if (mapObject != null && !mapObject.isEmpty()) {
					listMapping.add(fetchCopyAsIsMapping(mappingCopyAsIs, mapObject));
				} else {
					listMapping.add(fetchCopyAsIsMappingExtract(mappingCopyAsIs));
				}
			}
		}
		return listMapping;
	}

	private static Mapping fetchCopyAsIsMapping(MappingCopyAsIs mappingCopyAsIs, Map<String, Object> mapObject) {
		String networkService = (String) mapObject.get(AdpConstants.NETWORK_SERVICE);
		String schemeType = (String) mapObject.get(AdpConstants.SCHEME_TYPE);
		String adapterType = (String) mapObject.get(AdpConstants.ADAPTER_TYPE);

		if ((AdpConstants.L1.equals(adapterType) && AdpConstants.TEXT_REQUEST.equals(schemeType))
				|| (AdpConstants.L3.equals(adapterType) && AdpConstants.TEXT_RESPONSE.equals(schemeType))) {
			return fetchNormalCopyMapping(mappingCopyAsIs, schemeType, networkService);
		} else if ((AdpConstants.L3.equals(adapterType) && AdpConstants.TEXT_REQUEST.equals(schemeType))
				|| (AdpConstants.L1.equals(adapterType) && AdpConstants.TEXT_RESPONSE.equals(schemeType))) {
			return fetchComplexCopyMapping(mappingCopyAsIs, schemeType, networkService);
		}
		return null;
	}

	private static Mapping fetchCopyAsIsMappingExtract(MappingCopyAsIs mappingCopyAsIs) {
		return fetchNormalCopyMappingExtractor(mappingCopyAsIs, null, null);
	}

	private static Mapping fetchComplexCopyMapping(MappingCopyAsIs mappingCopyAsIs, String schemeType,
			String networkService) {
		List<String> destinations = new ArrayList<>();
		if (mappingCopyAsIs.getPackagerField() != null
				&& mappingCopyAsIs.getPackagerField().startsWith(AdpConstants.HTTP_HEADERS)) {
			destinations.add(updatePackagerField(mappingCopyAsIs.getPackagerField()));
		} else {
			destinations
					.add(String.format(NATIVE_FIELD, networkService, schemeType, mappingCopyAsIs.getPackagerField()));
		}
		destinations.add(String.format(REQUEST_RESPONSE_FIELD, networkService, schemeType,
				mappingCopyAsIs.getImfField().getText()));
		return new FieldMapping(destinations, null, ImfUtility.getFinalString(mappingCopyAsIs.getImfField()), null,
				Lists.newArrayList(),
				ValidationFunctionUtility.getListInBuiltValidation2(mappingCopyAsIs.getListValidationFunction()),
				mappingCopyAsIs.getIpc());
	}

	// this(destination, rawDestination, source, condition, Lists.newArrayList(),
	// Lists.newArrayList(), errorCode);
	private static Mapping fetchNormalCopyMapping(MappingCopyAsIs mappingCopyAsIs, String schemeType,
			String networkService) {
		List<String> destinations = new ArrayList<>();
		destinations.add(ImfUtility.getFinalString(mappingCopyAsIs.getImfField()));
		String packagerField = updatePackagerField(mappingCopyAsIs.getPackagerField());
		return new FieldMapping(destinations, null, packagerField, null, Lists.newArrayList(),
				ValidationFunctionUtility.getListInBuiltValidation2(mappingCopyAsIs.getListValidationFunction()),
				mappingCopyAsIs.getIpc());
	}

	private static Mapping fetchNormalCopyMappingExtractor(MappingCopyAsIs mappingCopyAsIs, String schemeType,
			String networkService) {
		List<String> destinations = new ArrayList<>();
		destinations.add(updatePackagerField(mappingCopyAsIs.getPackagerField()));
		String packagerField = ImfUtility.getFinalString(mappingCopyAsIs.getImfField());
		return new FieldMapping(destinations, null, packagerField, null, Lists.newArrayList(),
				ValidationFunctionUtility.getListInBuiltValidation2(mappingCopyAsIs.getListValidationFunction()),
				mappingCopyAsIs.getIpc());
	}

	private static String updatePackagerField(String packagerField) {
		if (packagerField.startsWith("${")) {
			return packagerField;
		} else {
			return "${" + packagerField + "}";
		}
	}

	public static Collection<? extends FieldTransformation> fetchExtractFieldList(
			List<MappingExtract> listMappingExtract, Map<String, Object> mapObject) {
		String networkService = (String) mapObject.get(AdpConstants.NETWORK_SERVICE);
		String schemeType = (String) mapObject.get(AdpConstants.SCHEME_TYPE);
		String adapterType = (String) mapObject.get(AdpConstants.ADAPTER_TYPE);
		String templateType = (String) mapObject.get(AdpConstants.TEMPLATE_TYPE);
		List<FieldTransformation> listMapping = new ArrayList<>();
		if (null != listMappingExtract) {
			for (MappingExtract mappingExtract : listMappingExtract) {
				listMapping.add(
						fetchExtractMapping(mappingExtract, schemeType, adapterType, templateType, networkService));
			}
		}
		return listMapping;
	}

	public static Collection<? extends FieldTransformation> fetchExtractFieldListExtract(
			List<MappingExtract> listMappingExtract) {
		List<FieldTransformation> listMapping = new ArrayList<>();
		if (null != listMappingExtract) {
			for (MappingExtract mappingExtract : listMappingExtract) {
				listMapping.add(fetchExtractMappingExtract(mappingExtract));
			}
		}
		return listMapping;
	}

	private static FieldTransformation fetchExtractMappingExtract(MappingExtract mappingExtract) {
		return fetchNormalExtractMappingExtract(mappingExtract);
	}

	private static FieldTransformation fetchNormalExtractMappingExtract(MappingExtract mappingExtract) {
		List<String> destinations = new ArrayList<>();
		destinations.add(updatePackagerField(mappingExtract.getPackagerField()));
		String packagerField = ImfUtility.getFinalString(mappingExtract.getImfField());
		return new FieldMapping(destinations, null, packagerField, mappingExtract.getCondition(),
				FunctionUtility.getListFunction(mappingExtract.getListFunction()),
				ValidationFunctionUtility.getListInBuiltValidation2(mappingExtract.getListValidationFunction()),
				mappingExtract.getIpc());
	}

	private static FieldTransformation fetchExtractMapping(MappingExtract mappingExtract, String schemeType,
			String adapterType, String templateType, String networkService) {
		if ((AdpConstants.L1.equals(adapterType) && AdpConstants.TEXT_REQUEST.equals(schemeType))
				|| (AdpConstants.L3.equals(adapterType) && AdpConstants.TEXT_RESPONSE.equals(schemeType))) {
			return fetchNormalExtractMapping(mappingExtract, schemeType);
		} else if ((AdpConstants.L3.equals(adapterType) && AdpConstants.TEXT_REQUEST.equals(schemeType))
				|| (AdpConstants.L1.equals(adapterType) && AdpConstants.TEXT_RESPONSE.equals(schemeType))) {
			return fetchComplexExtractMapping(mappingExtract, schemeType, networkService);
		}
		return null;
	}

	private static FieldTransformation fetchComplexExtractMapping(MappingExtract mappingExtract, String schemeType,
			String networkService) {
		List<String> destinations = new ArrayList<>();
		destinations.add(String.format(NATIVE_FIELD, networkService, schemeType, mappingExtract.getPackagerField()));
		String rawDestination = null;
		if (mappingExtract.isRawDestination()) {
			rawDestination = String.format(REQUEST_RESPONSE_FIELD, networkService, schemeType,
					mappingExtract.getImfField().getText());
		} else {
			destinations.add(String.format(REQUEST_RESPONSE_FIELD, networkService, schemeType,
					mappingExtract.getImfField().getText()));
		}
		return new FieldMapping(destinations, rawDestination, ImfUtility.getFinalString(mappingExtract.getImfField()),
				mappingExtract.getCondition(), FunctionUtility.getListFunction(mappingExtract.getListFunction()),
				ValidationFunctionUtility.getListInBuiltValidation2(mappingExtract.getListValidationFunction()),
				mappingExtract.getIpc());
	}

	private static FieldTransformation fetchNormalExtractMapping(MappingExtract mappingExtract, String schemeType) {
		List<String> destinations = new ArrayList<>();
		destinations.add(ImfUtility.getFinalString(mappingExtract.getImfField()));
		String packagerField = updatePackagerField(mappingExtract.getPackagerField());
		return new FieldMapping(destinations, null, packagerField, mappingExtract.getCondition(),
				FunctionUtility.getListFunction(mappingExtract.getListFunction()),
				ValidationFunctionUtility.getListInBuiltValidation2(mappingExtract.getListValidationFunction()),
				mappingExtract.getIpc());
	}

	public static Collection<? extends FieldTransformation> fetchJoinFieldList(List<MappingJoin> listMappingJoin,
			Map<String, Object> mapObject) {
		String schemeType = (String) mapObject.get(AdpConstants.SCHEME_TYPE);
		String adapterType = (String) mapObject.get(AdpConstants.ADAPTER_TYPE);
		String templateType = (String) mapObject.get(AdpConstants.TEMPLATE_TYPE);

		List<FieldTransformation> listMapping = new ArrayList<>();
		if (listMappingJoin != null) {
			for (MappingJoin mappingJoin : listMappingJoin) {
				listMapping.add(fetchJoinMapping(mappingJoin, schemeType, adapterType, templateType));
			}
		}
		return listMapping;
	}

	public static Collection<? extends FieldTransformation> fetchJoinFieldListExtract(
			List<MappingJoin> listMappingJoin) {
		List<FieldTransformation> listMapping = new ArrayList<>();
		if (listMappingJoin != null) {
			for (MappingJoin mappingJoin : listMappingJoin) {
				listMapping.add(fetchJoinMappingExtract(mappingJoin));
			}
		}
		return listMapping;
	}

	private static FieldTransformation fetchJoinMapping(MappingJoin mappingJoin, String schemeType, String adapterType,
			String templateType) {
		List<String> destinations = new ArrayList<>();
		destinations.add(ImfUtility.getFinalString(mappingJoin.getImfField()));
		return new JoinFields("", destinations, JoinUtility.getListJoinFieldPart(mappingJoin.getListJoinSource()),
				mappingJoin.getCondition(), FunctionUtility.getListFunction(mappingJoin.getListFunction()),
				ValidationFunctionUtility.getListInBuiltValidation2(mappingJoin.getListValidationFunction()),
				mappingJoin.getIpc());
	}

	private static FieldTransformation fetchJoinMappingExtract(MappingJoin mappingJoin) {
		List<String> destinations = new ArrayList<>();
		destinations.add(ImfUtility.getFinalString(mappingJoin.getImfField()));
		return new JoinFields("", destinations, JoinUtility.getListJoinFieldPart(mappingJoin.getListJoinSource()),
				mappingJoin.getCondition(), FunctionUtility.getListFunction(mappingJoin.getListFunction()),
				ValidationFunctionUtility.getListInBuiltValidation2(mappingJoin.getListValidationFunction()),
				mappingJoin.getIpc());
	}

	public static Collection<? extends FieldTransformation> fetchMapperFieldList(List<MappingMapper> listMappingMapper,
			Map<String, Object> mapObject) {
		String schemeType = (String) mapObject.get(AdpConstants.SCHEME_TYPE);
		String adapterType = (String) mapObject.get(AdpConstants.ADAPTER_TYPE);
		String templateType = (String) mapObject.get(AdpConstants.TEMPLATE_TYPE);
		List<FieldTransformation> listMapping = new ArrayList<>();
		if (listMappingMapper != null) {
			for (MappingMapper mappingMapper : listMappingMapper) {
				listMapping.add(fetchMapperMapping(mappingMapper, schemeType, adapterType, templateType));
			}
		}
		return listMapping;
	}

	// new InBuiltMapper("PARSE_87_LOCAL_DATE_TIME"
	private static FieldTransformation fetchMapperMapping(MappingMapper mappingMapper, String schemeType,
			String adapterType, String templateType) {
		List<Object> listParameters = new ArrayList<>();
		if (null != mappingMapper.getListParameters()) {
			for (ParametersUI parametersUI : mappingMapper.getListParameters()) {
				listParameters.add(parametersUI.getValue());
			}
		}
		return new InBuiltMapper(mappingMapper.getName(), listParameters, AdpConstants.SYSTEM_ERROR);
	}

	public static Collection<? extends FieldTransformation> fetchScriptFieldList(
			List<MappingScript> listMappingScript) {
		List<FieldTransformation> listMapping = new ArrayList<>();
		if (null != listMappingScript) {
			for (MappingScript mappingScript : listMappingScript) {
				listMapping.add(fetchScriptMapping(mappingScript));
			}
		}
		return listMapping;
	}

	private static FieldTransformation fetchScriptMapping(MappingScript mappingScript) {
		return new GroovyExecutor(mappingScript.getScript(), AdpConstants.SCRIPT_ERROR);
	}

	public static Collection<? extends FieldTransformation> fetchArraySupportFieldList(MessageMapping messageMapping,
			String schemeType, String adapterType, String templateType) {
		List<MappingLoop> listMappingLoop = schemeType.equals(AdpConstants.TEXT_REQUEST)
				? messageMapping.getRequestMapping().getListLoopMapping()
				: messageMapping.getListResponseMapping().get(0).getListLoopMapping();
		return fetchLoopList(listMappingLoop);
	}

	public static List<FieldTransformation> fetchLoopList(List<MappingLoop> listMappingLoop) {
		List<FieldTransformation> listMapping = new ArrayList<>();
		if (null != listMappingLoop) {
			Map<String, List<MappingLoop>> groupListMap = listMappingLoop.stream()
					.collect(Collectors.groupingBy(obj -> obj.getParentField()));
			for (Map.Entry<String, List<MappingLoop>> entry : groupListMap.entrySet()) {
				listMapping.add(fetchLoopObject(entry));
			}
		}
		return listMapping;
	}

	public static void generateJson(Object objectToTransform, String fileName) {
		try {
			new ObjectMapper().writeValue(new File(fileName), objectToTransform);
		} catch (JsonGenerationException e) {
			logger.error(e);
		} catch (JsonMappingException e) {
			logger.error(e);
		} catch (IOException e) {
			logger.error(e);
		}
	}

	private static FieldTransformation fetchLoopObject(Entry<String, List<MappingLoop>> entry) {
		List<FieldTransformation> fields = new ArrayList<>();
		for (MappingLoop mappingLoop : entry.getValue()) {
			fields.add(new FieldMapping(ImfUtility.getFinalString(mappingLoop.getImfField()),
					mappingLoop.getPackagerField(), AdpConstants.SYSTEM_ERROR));
		}
		if (fields.size() > 0) {
			return new Loop(new MappingSet(fields, null, null), entry.getKey());
		}
		return null;
	}

	public static List<MappingCopyAsIs> getResReqCopyAsIsList(MessageMapping messageMapping,
			Map<String, Object> mapObject) {
		List<MappingCopyAsIs> listMappingCopyAsIs = null;
		String schemeType = (String) mapObject.get(AdpConstants.SCHEME_TYPE);
		if (AdpConstants.TEXT_REQUEST.equalsIgnoreCase(schemeType)) {
			listMappingCopyAsIs = messageMapping.getRequestMapping().getListCopyAsIsMapping();
		} else if (AdpConstants.TEXT_RESPONSE.equalsIgnoreCase(schemeType)) {
			if (null != messageMapping.getListResponseMapping() && !messageMapping.getListResponseMapping().isEmpty()) {
				listMappingCopyAsIs = messageMapping.getListResponseMapping().get(0).getListCopyAsIsMapping();
			}
		}
		return listMappingCopyAsIs;
	}

	public static List<MappingExtract> getResReqExtractList(MessageMapping messageMapping,
			Map<String, Object> mapObject) {
		List<MappingExtract> listMappingExtract = null;
		String schemeType = (String) mapObject.get(AdpConstants.SCHEME_TYPE);
		if (AdpConstants.TEXT_REQUEST.equalsIgnoreCase(schemeType)) {
			listMappingExtract = messageMapping.getRequestMapping().getListExtractMapping();
		} else if (AdpConstants.TEXT_RESPONSE.equalsIgnoreCase(schemeType)
				&& null != messageMapping.getListResponseMapping()
				&& !messageMapping.getListResponseMapping().isEmpty()) {
			listMappingExtract = messageMapping.getListResponseMapping().get(0).getListExtractMapping();
		}
		return listMappingExtract;
	}

	public static List<MappingJoin> getResReqMappingJoinList(MessageMapping messageMapping,
			Map<String, Object> mapObject) {
		List<MappingJoin> listMappingJoin = null;
		String schemeType = (String) mapObject.get(AdpConstants.SCHEME_TYPE);
		if (AdpConstants.TEXT_REQUEST.equalsIgnoreCase(schemeType)) {
			listMappingJoin = messageMapping.getRequestMapping().getListJoinMapping();
		} else if (AdpConstants.TEXT_RESPONSE.equalsIgnoreCase(schemeType)) {
			if (null != messageMapping.getListResponseMapping() && !messageMapping.getListResponseMapping().isEmpty()) {
				listMappingJoin = messageMapping.getListResponseMapping().get(0).getListJoinMapping();
			}
		}
		return listMappingJoin;
	}

	public static List<MappingMapper> getResReqMappingMapperList(MessageMapping messageMapping,
			Map<String, Object> mapObject) {
		List<MappingMapper> listMappingMapper = null;
		String schemeType = (String) mapObject.get(AdpConstants.SCHEME_TYPE);
		if (AdpConstants.TEXT_REQUEST.equalsIgnoreCase(schemeType)) {
			listMappingMapper = messageMapping.getRequestMapping().getListMapperMapping();
		} else if (AdpConstants.TEXT_RESPONSE.equalsIgnoreCase(schemeType)) {
			if (null != messageMapping.getListResponseMapping() && !messageMapping.getListResponseMapping().isEmpty()) {
				listMappingMapper = messageMapping.getListResponseMapping().get(0).getListMapperMapping();
			}
		}
		return listMappingMapper;
	}

	public static List<MappingScript> getResReqMappingScriptList(MessageMapping messageMapping,
			Map<String, Object> mapObject) {
		List<MappingScript> listMappingScript = null;
		String schemeType = (String) mapObject.get(AdpConstants.SCHEME_TYPE);
		if (AdpConstants.TEXT_REQUEST.equalsIgnoreCase(schemeType)) {
			listMappingScript = messageMapping.getRequestMapping().getListScriptMapping();
		} else if (AdpConstants.TEXT_RESPONSE.equalsIgnoreCase(schemeType)) {
			if (null != messageMapping.getListResponseMapping() && !messageMapping.getListResponseMapping().isEmpty()) {
				listMappingScript = messageMapping.getListResponseMapping().get(0).getListScriptMapping();
			}
		}
		return listMappingScript;
	}

	public static List<FieldTransformation> fetchEchoFieldList(List<String> resReqMappingEchoList,
			Map<String, Object> mapObject) {
		List<FieldTransformation> listMapping = new ArrayList<>();
		if (null != resReqMappingEchoList && !resReqMappingEchoList.isEmpty()) {
			for (String echoSource : resReqMappingEchoList) {
				listMapping.add(fetchEchoMapping(echoSource, mapObject));
			}
		}
		return listMapping;
	}

	// ${message_exchange[GATEWAY_SERVICE].additional_fields[order.amounts.taxAmount]}
	private static FieldTransformation fetchEchoMapping(String echoPackagerField, Map<String, Object> mapObject) {
		String networkService = (String) mapObject.get(AdpConstants.NETWORK_SERVICE);
		String schemeType = (String) mapObject.get(AdpConstants.SCHEME_TYPE);

		List<String> destinations = new ArrayList<>();
		if (AdpConstants.TEXT_REQUEST.equalsIgnoreCase(schemeType)) {
			destinations.add(String.format(ADDITIONAL_FIELD, networkService, echoPackagerField));
			return new FieldMapping(destinations, updatePackagerField(echoPackagerField), AdpConstants.SYSTEM_ERROR);
		} else {
			destinations.add(String.format(NATIVE_FIELD, networkService, schemeType, echoPackagerField));
			return new FieldMapping(destinations, String.format(ADDITIONAL_FIELD, networkService, echoPackagerField),
					AdpConstants.SYSTEM_ERROR);
		}
	}
}
