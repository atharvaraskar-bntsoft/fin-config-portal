package com.bnt.service.mapper;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.bnt.bswitch.message.packager.Attribute;
import com.bnt.bswitch.message.packager.Field;
import com.bnt.bswitch.message.packager.Fields;
import com.bnt.bswitch.message.packager.HttpApiDefinition;
import com.bnt.bswitch.message.packager.HttpPackager;
import com.bnt.bswitch.message.packager.BNTPackager;
import com.bnt.common.util.JsonObjectUtil;
import com.bnt.common.util.StringUtil;
import com.bnt.rest.wrapper.dto.adapter.AdapterApiFields;
import com.bnt.rest.wrapper.dto.adapter.AdapterApiFieldsData;
import com.bnt.rest.wrapper.dto.adapter.AdapterTransformData;
import com.bnt.rest.wrapper.dto.adapter.ApiConditionalPackgerFields;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class AdapterFieldsMapper {

	private static final String HEADER2 = "header[";

	private AdapterFieldsMapper() {
	}

	private static final Logger logger = LogManager.getLogger(AdapterFieldsMapper.class);

	private static final String API_NAME = "apiName";

	private static final String[][] L1_ADAPTER_HEADER_CONSTANT = { { "L1_MESSAGE_TYPE_INDICATOR", API_NAME } };

	private static final String[][] L3_ADAPTER_HEADER_CONSTANT = { { "MESSAGE_TYPE_INDICATOR", API_NAME } };

	public static AdapterApiFieldsData processJsonPackger(String packagerContent, String adapterType) {
		logger.info("Inside processJsonPackger");
		HttpPackager httpPacakger = JsonObjectUtil.getGenericObjectFromJsonString(packagerContent, HttpPackager.class);
		if (httpPacakger == null) {
			logger.error("Exception in HttpPacakger tarnsform data Json {}", packagerContent);
		} else {
			logger.info("HttpPacakger Json has been parsed");
		}
		AdapterApiFieldsData apiFieldsData = new AdapterApiFieldsData();
		getJsonPackgerFieldList(httpPacakger, apiFieldsData, adapterType);
		return apiFieldsData;
	}

	public static List<ApiConditionalPackgerFields> processConditionalBNTPackager(HttpApiDefinition httpApiDefinition,
			List<AdapterTransformData> packagerDataHeadersFieldList) {
		logger.info("inside processConditionalBNTPackager");
		List<ApiConditionalPackgerFields> apiConditionalPackgerFieldsList = new ArrayList<>();
		if (!httpApiDefinition.getOutgoingConditionalPackager().isEmpty()) {
			httpApiDefinition.getOutgoingConditionalPackager().forEach((resName, bntPakager) -> {
				ApiConditionalPackgerFields apiConditionalPackgerFields = new ApiConditionalPackgerFields();
				apiConditionalPackgerFields.setOutgoingPackagerName(resName);
				List<AdapterTransformData> outGoingFieldsList = new ArrayList<>();
				outGoingFieldsList.addAll(packagerDataHeadersFieldList);
				outGoingFieldsList.addAll(processBNTPackager(bntPakager));
				apiConditionalPackgerFields.setOutGoingFields(outGoingFieldsList);
				apiConditionalPackgerFieldsList.add(apiConditionalPackgerFields);
			});
		}
		return apiConditionalPackgerFieldsList;
	}

	public static void getJsonPackgerFieldList(HttpPackager packager, AdapterApiFieldsData apiFieldsData,
			String adapterType) {
		logger.info("Inside getJsonPackgerFieldList");
		if (packager != null) {
			List<String> headers = packager.getHeaders();
			List<HttpApiDefinition> apiDefinitions = packager.getApiDefinitions();
			if (apiDefinitions != null && !apiDefinitions.isEmpty()) {
				List<AdapterApiFields> apiFields = new ArrayList<>();
				List<AdapterTransformData> packagerDataHeadersFieldList = getPackagerDataHeadersFieldList(headers);
				apiDefinitions.parallelStream().forEach(api -> {
					List<AdapterTransformData> incomingFieldsList = new ArrayList<>();
					List<AdapterTransformData> outGoingFieldsList = new ArrayList<>();
					AdapterApiFields apiField = new AdapterApiFields();
					apiField.setApiName(api.getName());
					apiField.setApiurl(api.getApi());
					if (AdapterWrapperDtoMapper.ADAPTR_TYPE_L1.equalsIgnoreCase(adapterType)) {
						if (api.getOutgoingConditionalPackager() != null) {
							apiField.setIsMutliResponse("Y");
							incomingFieldsList.addAll(packagerDataHeadersFieldList);
							incomingFieldsList.addAll(processBNTPackager(api.getIncomingPackager()));
							apiField.setApiConditionalPackgerFields(
									processConditionalBNTPackager(api, packagerDataHeadersFieldList));
						} else {
							incomingFieldsList.addAll(packagerDataHeadersFieldList);
							outGoingFieldsList.addAll(packagerDataHeadersFieldList);
							incomingFieldsList.addAll(processBNTPackager(api.getIncomingPackager()));
							outGoingFieldsList.addAll(processBNTPackager(api.getOutgoingPackager()));
						}
					} else if (AdapterWrapperDtoMapper.ADAPTR_TYPE_L3.equalsIgnoreCase(adapterType)) {
						incomingFieldsList.addAll(packagerDataHeadersFieldList);
						outGoingFieldsList.addAll(packagerDataHeadersFieldList);
						incomingFieldsList.addAll(processBNTPackager(api.getOutgoingPackager()));
						outGoingFieldsList.addAll(processBNTPackager(api.getIncomingPackager()));
					}
					apiField.setIncomingFields(incomingFieldsList);
					apiField.setOutGoingFields(outGoingFieldsList);
					apiFields.add(apiField);
				});
				apiFieldsData.setApiFields(apiFields);
			}
			List<AdapterTransformData> headerFieldList = getHeadersFieldList(headers, adapterType);
			apiFieldsData.setHeaderFields(headerFieldList);
			setHeadersConstantFieldList(adapterType, apiFieldsData);
		}
		logger.info("completed getJsonPackgerFieldList");
	}

	public static List<AdapterTransformData> getPackagerDataHeadersFieldList(List<String> headers) {
		logger.info("Inside getPackagerDataHeadersFieldList for adapterType:");
		List<AdapterTransformData> packagerDataHeadersFieldList = new ArrayList<>();
		if (headers != null && !headers.isEmpty()) {
			headers.forEach(each -> {
				AdapterTransformData adapterTransformData = new AdapterTransformData();
				adapterTransformData.setId("http_headers[" + each + "]");
				adapterTransformData.setName("HTTP-HEADER(" + each + ")");
				packagerDataHeadersFieldList.add(adapterTransformData);
			});
		}
		return packagerDataHeadersFieldList;
	}

	public static List<AdapterTransformData> getHeadersFieldList(List<String> headers, String adapterType) {
		logger.info("Inside getHeadersFieldList for adapterType:{}", adapterType);
		List<AdapterTransformData> headersFieldsList = new LinkedList<>();
		if (headers == null) {
			headers = new ArrayList<>();
		}
		if (!headers.isEmpty()) {
			headers.forEach(header -> {
				AdapterTransformData headerField = new AdapterTransformData();
				headerField.setId(HEADER2 + header + "]");
				headerField.setName(header);
				headersFieldsList.add(headerField);
			});
		}
		return headersFieldsList;
	}

	public static void setHeadersConstantFieldList(String adapterType, AdapterApiFieldsData apiFieldsData) {
		logger.info("Inside setHeadersConstantFieldList for adapterType:{}", adapterType);
		if (apiFieldsData == null) {
			return;
		}
		List<AdapterTransformData> headersFieldsList = apiFieldsData.getHeaderFields();
		if (headersFieldsList == null) {
			headersFieldsList = new ArrayList<>();
			apiFieldsData.setHeaderFields(headersFieldsList);
		}
		if (AdapterWrapperDtoMapper.ADAPTR_TYPE_L1.equalsIgnoreCase(adapterType)) {
			Arrays.asList(L1_ADAPTER_HEADER_CONSTANT).forEach(eachData -> {
				AdapterTransformData headerFieldConstant = new AdapterTransformData();
				headerFieldConstant.setId(HEADER2 + eachData[0] + "]");
				headerFieldConstant.setName(eachData[1]);
				setapiNameData(headerFieldConstant, apiFieldsData);
				apiFieldsData.getHeaderFields().add(headerFieldConstant);
			});
		} else if (AdapterWrapperDtoMapper.ADAPTR_TYPE_L3.equalsIgnoreCase(adapterType)) {
			Arrays.asList(L3_ADAPTER_HEADER_CONSTANT).forEach(eachData -> {
				AdapterTransformData headerFieldConstant = new AdapterTransformData();
				headerFieldConstant.setId(HEADER2 + eachData[0] + "]");
				headerFieldConstant.setName(eachData[1]);
				setapiNameData(headerFieldConstant, apiFieldsData);
				apiFieldsData.getHeaderFields().add(headerFieldConstant);
			});
		}
	}

	public static void setapiNameData(AdapterTransformData fieldData, AdapterApiFieldsData apiFieldsData) {
//		 logger.info("Inside setapiNameData for name:{}", fieldData.getName());
		if (API_NAME.equalsIgnoreCase(fieldData.getName())) {
			List<String> apiNameList = new LinkedList<>();
			apiFieldsData.getApiFields().parallelStream().forEach(eachapi -> apiNameList.add(eachapi.getApiName()));
			fieldData.setPossibleValue(apiNameList);
		}
	}

	public static List<AdapterTransformData> processBNTPackager(BNTPackager bntPackager) {
		logger.info("Inside processBNTPackager");
		List<AdapterTransformData> fieldList = new LinkedList<>();
		if (bntPackager != null) {
			processBNTPackager(bntPackager, fieldList);
		}
		logger.info("validateImf completed");
		return fieldList;
	}

	private static void processBNTPackager(BNTPackager bntPackager, List<AdapterTransformData> fieldList) {
		Iterator<Attribute> iterator;
		Attribute attribute;
		AdapterTransformData adapterTransformData;
		List<AdapterTransformData> abttributeChildList = null;
		iterator = bntPackager.getAttributes().listIterator();
		while (iterator.hasNext()) {
			attribute = iterator.next();
			if (attribute instanceof Field field) {
				// if no xml attribute found
				adapterTransformData = new AdapterTransformData();
				if (null == field.getXmlAttributes()) {
					adapterTransformData.setId(field.getFieldName());
					if (StringUtil.isNotNullOrBlank(field.getAlias())) {
						adapterTransformData.setName(field.getAlias());
					} else {
						adapterTransformData.setName(field.getFieldName());
					}
					fieldList.add(adapterTransformData);
				} else {
					processAttributeListField(fieldList, field.getFieldName(), field.getXmlAttributes());
				}

			}
			if (attribute instanceof Fields fields) {
				if (Fields.Type.LIST.equals(fields.getType())) {
					abttributeChildList = processAttributeListFields(attribute, null);
				} else {
					abttributeChildList = processIMFAttribute(attribute, "");
				}

				fieldList.addAll(abttributeChildList);
			}
		}
	}

	private static List<AdapterTransformData> processAttributeListField(List<AdapterTransformData> fieldList,
			String parentFieldName, List<Field> xmlAttributes) {
//		List<AdapterTransformData> fieldList = new ArrayList<>();
		for (Field field : xmlAttributes) {
			AdapterTransformData adapterTransformData = new AdapterTransformData();
			adapterTransformData.setName(parentFieldName + "&" + field.getFieldName());
			adapterTransformData.setParentField(parentFieldName);
			adapterTransformData.setId(parentFieldName + "&" + field.getFieldName());
			fieldList.add(adapterTransformData);
		}
		return fieldList;

	}

	public static List<AdapterTransformData> processIMFAttribute(Attribute attribute, String parentFieldsName) {
//		logger.info("inside processIMFAttribute for parent:{}", parentFieldsName);
		List<AdapterTransformData> fieldNameList = new LinkedList<>();
		if (attribute instanceof Field field) {
			instanceOfField(parentFieldsName, fieldNameList, field);
		} else if (attribute instanceof Fields fields) {
			instanceOfFields(parentFieldsName, fieldNameList, fields);
		}
		return fieldNameList;
	}

	private static void instanceOfFields(String parentFieldsName, List<AdapterTransformData> fieldNameList,
			Fields fields) {
		List<Attribute> abttributeChildList = fields.getAttributes();
		if (abttributeChildList != null) {
			instanceOfFields(parentFieldsName, fieldNameList, fields, abttributeChildList);
		}
	}

	private static void instanceOfFields(String parentFieldsName, List<AdapterTransformData> fieldNameList,
			Fields fields, List<Attribute> abttributeChildList) {
		List<AdapterTransformData> resultAbttributeNameList = null;
		for (Attribute atrb : abttributeChildList) {
			if ("".equalsIgnoreCase(parentFieldsName)) {
				if (Fields.Type.LIST.equals(fields.getType())) {
					AdapterTransformData adapterTransformDataListParent = new AdapterTransformData();
					adapterTransformDataListParent.setName(fields.getName());
					adapterTransformDataListParent.setId(fields.getName() + ".#");
					adapterTransformDataListParent.setParentField(fields.getName());
					resultAbttributeNameList = processAttributeListFields(atrb, null);
				} else {
					resultAbttributeNameList = processIMFAttribute(atrb, fields.getName());
				}
			} else {
				if (Fields.Type.LIST.equals(fields.getType())) {
					AdapterTransformData adapterTransformDataListParent = new AdapterTransformData();
					adapterTransformDataListParent.setName(parentFieldsName + "." + fields.getName());
					adapterTransformDataListParent.setId(parentFieldsName + "." + fields.getName() + ".#");
					adapterTransformDataListParent.setParentField(parentFieldsName + "." + fields.getName());
					resultAbttributeNameList = processAttributeListFields(atrb, adapterTransformDataListParent);
				} else {
					resultAbttributeNameList = processIMFAttribute(atrb, parentFieldsName + "." + fields.getName());
				}
			}
			fieldNameList.addAll(resultAbttributeNameList);
		}
	}

	private static void instanceOfField(String parentFieldsName, List<AdapterTransformData> fieldNameList,
			Field field) {
		AdapterTransformData adapterTransformData;
		List<AdapterTransformData> listXmlAttributes = null;
		adapterTransformData = new AdapterTransformData();
		if ("".equalsIgnoreCase(parentFieldsName)) {
			adapterTransformData.setId(field.getFieldName());
			if (StringUtil.isNotNullOrBlank(field.getAlias())) {
				adapterTransformData.setName(field.getAlias());
			} else {
				adapterTransformData.setName(field.getFieldName());
			}
		} else {
			if (StringUtil.isNotNullOrBlank(field.getAlias())) {
				adapterTransformData.setName(parentFieldsName + "." + field.getAlias());
			} else {
				adapterTransformData.setName(parentFieldsName + "." + field.getFieldName());
			}
			adapterTransformData.setId(parentFieldsName + "." + field.getFieldName());
			List<Field> xmlAttrList = field.getXmlAttributes();
			if (xmlAttrList != null) {
				listXmlAttributes = new ArrayList<>();
				for (Field xmlField : xmlAttrList) {
					AdapterTransformData adTrData = new AdapterTransformData();
					adTrData.setId(parentFieldsName + "." + field.getFieldName() + "&" + xmlField.getFieldName());
					adTrData.setName(parentFieldsName + "." + field.getFieldName() + "&" + xmlField.getFieldName());
					listXmlAttributes.add(adTrData);
				}
				fieldNameList.addAll(listXmlAttributes);
			}
		}
		fieldNameList.add(adapterTransformData);
	}

	private static List<AdapterTransformData> processAttributeListFields(Attribute attribute,
			AdapterTransformData adapterTransformDataParent) {
		logger.info("inside processAttributeListFields for parent");
		List<AdapterTransformData> fieldNameList = new LinkedList<>();
		AdapterTransformData adapterTransformData = null;
		if (attribute instanceof Field field) {
			adapterTransformData = getAdapterTransformData(field, adapterTransformDataParent);
			fieldNameList.add(adapterTransformData);
		} else if (attribute instanceof Fields fields) {
			processAttributeListFields(adapterTransformDataParent, fieldNameList, fields);
		}
		return fieldNameList;
	}

	private static void processAttributeListFields(AdapterTransformData adapterTransformDataParent,
			List<AdapterTransformData> fieldNameList, Fields fields) {
		List<Attribute> abttributeChildList = fields.getAttributes();
		if (abttributeChildList != null) {
			AdapterTransformData adapterTransformDataListParent = new AdapterTransformData();
			List<AdapterTransformData> resultAbttributeNameList = null;
			if (Fields.Type.LIST.equals(fields.getType())) {
				if (adapterTransformDataParent != null
						&& StringUtil.isNotNullOrBlank(adapterTransformDataParent.getName())) {
					String newParentHistory = getParentFieldListType(adapterTransformDataParent.getParentField(),
							adapterTransformDataParent.getName() + "." + fields.getName());
					adapterTransformDataListParent
							.setName(adapterTransformDataParent.getName() + "." + fields.getName());
					adapterTransformDataListParent
							.setId(adapterTransformDataParent.getId() + "." + fields.getName() + ".#");
					adapterTransformDataListParent.setParentField(newParentHistory);
				} else {
					String newParentHistory = getParentFieldListType("", fields.getName());
					adapterTransformDataListParent.setName(fields.getName());
					adapterTransformDataListParent.setId(fields.getName() + ".#");
					adapterTransformDataListParent.setParentField(newParentHistory);
				}
				for (Attribute atrb : abttributeChildList) {
					resultAbttributeNameList = processAttributeListFields(atrb, adapterTransformDataListParent);
					fieldNameList.addAll(resultAbttributeNameList);
				}
			} else {
				adapterTransformDataListParent.setName(adapterTransformDataParent.getName() + "." + fields.getName());
				adapterTransformDataListParent.setId(adapterTransformDataParent.getId() + "." + fields.getName());
				adapterTransformDataListParent.setParentField(adapterTransformDataParent.getParentField());
				for (Attribute atrb : abttributeChildList) {
					resultAbttributeNameList = processAttributeListFields(atrb, adapterTransformDataListParent);
					fieldNameList.addAll(resultAbttributeNameList);
				}
			}
		}
	}

	private static String getParentFieldListType(String history, String parentFieldPath) {
		if (StringUtil.isNotNullOrBlank(history)) {
			return history + "|" + parentFieldPath;
		} else {
			return parentFieldPath;
		}
	}

	private static AdapterTransformData getAdapterTransformData(Field field,
			AdapterTransformData adapterTransformDataParent) {
		AdapterTransformData adapterTransformData = new AdapterTransformData();
		if (adapterTransformDataParent != null) {
			adapterTransformData.setName(adapterTransformDataParent.getName() + "." + field.getFieldName());
			adapterTransformData.setId(adapterTransformDataParent.getId() + "." + field.getFieldName());
			adapterTransformData.setParentField(adapterTransformDataParent.getParentField());
		} else {
			adapterTransformData.setName(field.getFieldName());
			adapterTransformData.setId(field.getFieldName());
		}
		return adapterTransformData;
	}
}
