package com.bnt.service.mapper;

import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.json.JSONObject;

import com.google.gson.JsonElement;
import com.jayway.jsonpath.JsonPath;
import com.bnt.bswitch.transformer.processor.transaction.TransactionSet;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.GsonUtil;
import com.bnt.common.util.HTMLInjectionUtil;
import com.bnt.common.util.JsonObjectUtil;
import com.bnt.common.util.StringUtil;
import com.bnt.common.util.exception.ExceptionLog;
import com.bnt.constant.Constants;
import com.bnt.rest.dto.AdapterConfigurationDto;
import com.bnt.rest.dto.AdapterDto;
import com.bnt.rest.dto.CustomBeanConfigurationDto;
import com.bnt.rest.dto.JsonDataCompListChildDto;
import com.bnt.rest.dto.NameVersionListDto;
import com.bnt.rest.dto.LookupValueDto;
import com.bnt.rest.dto.StandardMessageSpecificationDto;
import com.bnt.rest.dto.uiwrapper.CustomBeanConfigurationUiWrapper;
import com.bnt.rest.entity.Adapter;
import com.bnt.rest.entity.AdapterConfiguration;
import com.bnt.rest.wrapper.dto.IdAndCodeWrapperString;
import com.bnt.rest.wrapper.dto.adapter.AdapterApiFieldsData;
import com.bnt.rest.wrapper.dto.adapter.AdapterConfigSummaryUIWapper;
import com.bnt.rest.wrapper.dto.adapter.AdapterSummaryUIWrapper;
import com.bnt.rest.wrapper.dto.adapter.AdapterUiResponseWrapper;
import com.bnt.rest.wrapper.dto.adapter.BeanConfigurationUiWrapper;
import com.bnt.rest.wrapper.dto.adapter.FieldSchemeImfMapperUiWrapper;
import com.bnt.rest.wrapper.dto.adapter.IpcUiWrapper;
import com.bnt.rest.wrapper.dto.adapter.MasterAdapterWrapper;
import com.bnt.rest.wrapper.dto.adapter.NetworkConnectionManagment;
import com.bnt.rest.wrapper.dto.adapter.NetworkPropertiesResponseWrapper;
import com.bnt.rest.wrapper.dto.adapter.NetworkPropertiesResponseWrapper.PropertiesWrapper;
import com.bnt.rest.wrapper.dto.adapter.NetworkUiResponseWrapper;
import com.bnt.rest.wrapper.dto.adapter.ResponseCodeUiResponseWrapper;
import com.bnt.rest.wrapper.dto.adapter.SchemaUiResponseWrapper;
import com.bnt.rest.wrapper.dto.adapter.TransformUiResponseWrapper;
import com.bnt.rest.wrapper.dto.adapter.TransformUiSafingCondition;

import io.micrometer.core.instrument.util.StringUtils;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class AdapterWrapperDtoMapper {

	private static final Logger logger = LogManager.getLogger(AdapterWrapperDtoMapper.class);

	public static final String ACTION_NEW = "NEW";

	public static final String ACTION_EDIT = "EDIT";

	public static final String SAVETYPE_DRAFT = "DRAFT";

	public static final String SAVETYPE_VERSIONIT = "VERSIONIT";

	public static final String ADAPTR_TYPE_L1 = "L1";

	public static final String ADAPTR_TYPE_L3 = "L3";

	public static final String TAB_SCHEMA = "SCHEMA";

	public static final String TAB_NETWORK = "NETWORK";

	public static final String TAB_TRANSFORM = "TRANSFORM";

	public static final String TAB_RESPONSE_CODE = "RESPONSECODE";

	public static final String NON_SCHEDULED = "Non-Scheduled";

	public static final String ADAPTR_TYPE_ISO = "ISO";

	public static final String ADAPTR_TYPE_JSON = "JSON";

	public static final String ADAPTR_TYPE_SOAP = "SOAP";

	public static final String ADAPTR_TYPE_HTTP_URLENCODED = "HTTP-URLENCODED";

	public static final String ADAPTR_TYPE_XML_OVER_HTTP = "XML-OVER-HTTP";

	public static final Charset defaultCharset = StandardCharsets.UTF_8;

	public static void main(String[] args) {
		String path = "E:\\bnt-switch-portal\\toolkit\\toolkit\\work\\json\\L3-ISO-json.txt";
		try {
			String content = Files.readString(Paths.get(path));
			transformationApiValidation(content);
			/**
			 * //String data1="CONN1:${var_ip:127.0.0.1}#${var_port:8080}#lable#80000";
			 * //String data1="${VAR_IP:bnt.com}";
			 * //(StringUtil.getStringToEncodedString(data, null));
			 * 
			 * //String datax= ConfigurationProperites.resolvePlaceholder(data1); //Map
			 * map=ConfigurationProperites.getMap(datax, String.class); //Map
			 * map2=TypeConverter.convertIfNecessary(datax, Map.class, Four.class);
			 * //(datax);
			 */
		} catch (Exception e) {
			logger.error(e);
		}
	}

	public static AdapterDto uiWrapperToDto(AdapterUiResponseWrapper adapterUiResponseWrapper) {
		logger.info("inside uiWrapperToDto....");
		AdapterDto adapterDto = adapterUiResponseWrapper.getMasterData().getAdapterDto();
		String messageStandardName = "";
		try {
			sanatizeAdapterUiResponseWrapper(adapterUiResponseWrapper);
			messageStandardName = adapterUiResponseWrapper.getMasterData().getAdapterDto()
					.getStandardMessageSpecification().getMessageStandard().getValue();
			AdapterConfigurationDto adapterConfigurationDto = new AdapterConfigurationDto();
			adapterConfigurationDto.setFileType(adapterUiResponseWrapper.getSchemaData().getFileType());

			if (null != adapterUiResponseWrapper.getNetworkData()
					&& adapterUiResponseWrapper.getNetworkData().getProperties().isSamePackager()) {
				if (null != adapterUiResponseWrapper.getSchemaData()
						&& !StringUtils.isEmpty(adapterUiResponseWrapper.getSchemaData().getMessageSchemaPackager())) {
					adapterConfigurationDto.setResponsePackager(StringUtil.getStringToEncodedString(
							adapterUiResponseWrapper.getSchemaData().getMessageSchemaPackager()));
					adapterConfigurationDto.setMessageSchemaPackager(StringUtil.getStringToEncodedString(
							adapterUiResponseWrapper.getSchemaData().getMessageSchemaPackager()));
				} else if (null != adapterUiResponseWrapper.getSchemaData()
						&& !StringUtils.isEmpty(adapterUiResponseWrapper.getSchemaData().getResponsePackager())) {
					adapterConfigurationDto.setMessageSchemaPackager(StringUtil
							.getStringToEncodedString(adapterUiResponseWrapper.getSchemaData().getResponsePackager()));
					adapterConfigurationDto.setResponsePackager(StringUtil
							.getStringToEncodedString(adapterUiResponseWrapper.getSchemaData().getResponsePackager()));
				}
				validateSchemaDataContent(adapterConfigurationDto.getMessageSchemaPackager(), messageStandardName);
				validateSchemaDataContent(adapterConfigurationDto.getResponsePackager(), messageStandardName);
			} else if (null != adapterUiResponseWrapper.getSchemaData()) {
				adapterConfigurationDto.setMessageSchemaPackager(StringUtil
						.getStringToEncodedString(adapterUiResponseWrapper.getSchemaData().getMessageSchemaPackager()));
				adapterConfigurationDto.setResponsePackager(StringUtil
						.getStringToEncodedString(adapterUiResponseWrapper.getSchemaData().getResponsePackager()));
				if (null != adapterConfigurationDto.getMessageSchemaPackager())
					validateSchemaDataContent(adapterConfigurationDto.getMessageSchemaPackager(), messageStandardName);
				if (null != adapterConfigurationDto.getResponsePackager())
					validateSchemaDataContent(adapterConfigurationDto.getResponsePackager(), messageStandardName);
			}
			if (adapterUiResponseWrapper.getNetworkData() != null) {

				adapterConfigurationDto.setProperties(getNetworkProperties(adapterUiResponseWrapper));
			}
			if (adapterUiResponseWrapper.getTransformData() != null) {
				adapterConfigurationDto.setRequestMapping(JsonObjectUtil
						.getJsonStringFromObject(adapterUiResponseWrapper.getTransformData().getRequestMapping()));
				adapterConfigurationDto.setResponseMapping(JsonObjectUtil
						.getJsonStringFromObject((adapterUiResponseWrapper.getTransformData().getResponseMapping())));
				adapterConfigurationDto.setImfLeg(JsonObjectUtil
						.getJsonStringFromObject((adapterUiResponseWrapper.getTransformData().getImfLeg())));
				validateTransformDataContent(adapterUiResponseWrapper);
			}
			if (adapterUiResponseWrapper.getResponseCodeData() != null) {
				adapterConfigurationDto.setResponseCode(JsonObjectUtil
						.getJsonStringFromObject(adapterUiResponseWrapper.getResponseCodeData().getIpcUiWrapper()));
			}
			if (adapterUiResponseWrapper.getImfId() != null) {
				adapterConfigurationDto.setImfId(adapterUiResponseWrapper.getImfId());
			}
			List<AdapterConfigurationDto> listConfig = new ArrayList<>();
			listConfig.add(adapterConfigurationDto);
			adapterDto.setAdapterConfiguration(listConfig);
		} catch (RippsAdminException e) {
			throw new RippsAdminException(e.getMessage());
		} catch (Exception e) {
			throw new RippsAdminException("UI to DTO conversion failed" + e.getMessage());
		}
		return adapterDto;
	}

	public static AdapterUiResponseWrapper adapterDtoToUiWrapper(AdapterDto adapterDto) {
		logger.info("inside adapterDtoToUiWrapper()...");
		AdapterUiResponseWrapper response = new AdapterUiResponseWrapper();
		try {
			adapterDto.getAdapterConfiguration().get(0).setAdapter(null);
			MasterAdapterWrapper masterData = new MasterAdapterWrapper();
			masterData.setAdapterDto(adapterDto);

			response.setMasterData(masterData);
			response.setConfigurationId(adapterDto.getAdapterConfiguration().get(0).getId());
			response.setConfigurationVersion(adapterDto.getAdapterConfiguration().get(0).getVersion());
			response.setImfId(adapterDto.getAdapterConfiguration().get(0).getImfId());

			prepareSchemaData(adapterDto, response);

			prepareNetworkData(adapterDto, response);

			prepareTransformData(adapterDto, response);

			prepareResponseCodeData(adapterDto, response);

			response = preparePersistenceRequiredData(response);

		} catch (Exception e) {
			throw new RippsAdminException("Dto to UI conversion failed:" + e.getMessage());
		}
		return response;
	}

	private static AdapterUiResponseWrapper preparePersistenceRequiredData(AdapterUiResponseWrapper response) {
		try {
			setBeanDtoInAdapterUiResponseWrapper(response, null);
			setTabPersistantRequired(response);
		} catch (Exception e) {
			logger.error("issue in preparePersistenceRequiredData...{}", ExceptionLog.printStackTraceToString(e));
		}
		return response;
	}

	private static void prepareResponseCodeData(AdapterDto adapterDto, AdapterUiResponseWrapper response) {
		try {
			ResponseCodeUiResponseWrapper responseCodeData = setUiResponseCode(response, adapterDto);
			response.setResponseCodeData(responseCodeData);

		} catch (Exception e) {
			logger.error("issue inprepareResponseCodeData()...{}", ExceptionLog.printStackTraceToString(e));
		}
	}

	private static void prepareTransformData(AdapterDto adapterDto, AdapterUiResponseWrapper response) {
		try {
			TransformUiResponseWrapper transformData = setUiTransform(response, adapterDto);
			response.setTransformData(transformData);
		} catch (Exception e) {
			logger.error("issue in prepareTransformData().. {}", ExceptionLog.printStackTraceToString(e));
		}
	}

	private static void prepareNetworkData(AdapterDto adapterDto, AdapterUiResponseWrapper response) {
		try {
			NetworkUiResponseWrapper networkData = setUiNetwork(response, adapterDto);
			response.setNetworkData(networkData);
		} catch (Exception e) {
			logger.error("issue in Network-proprties data.. {}", ExceptionLog.printStackTraceToString(e));
			NetworkUiResponseWrapper networkData = new NetworkUiResponseWrapper();
			response.setNetworkData(networkData);
		}
	}

	private static void prepareSchemaData(AdapterDto adapterDto, AdapterUiResponseWrapper response) {
		try {
			SchemaUiResponseWrapper schemaData = new SchemaUiResponseWrapper();
			setSchemaDataUI(adapterDto.getAdapterConfiguration().get(0).getMessageSchemaPackager(),
					adapterDto.getStandardMessageSpecification().getMessageStandard().getValue(), schemaData,
					adapterDto.getAdapterConfiguration().get(0).getResponsePackager());
			response.setSchemaData(schemaData);
		} catch (Exception e) {
			logger.error("issue in schema data...{}", ExceptionLog.printStackTraceToString(e));
			throw new RippsAdminException("Issue in loading Schema data  :" + e.getMessage());
		}
	}

	public static String getNetworkProperties(AdapterUiResponseWrapper adapterUiResponseWrapper) {
		String properties = "";
		if (adapterUiResponseWrapper.getNetworkData() != null
				&& adapterUiResponseWrapper.getNetworkData().getProperties() != null) {
			adapterUiResponseWrapper.getNetworkData()
					.setProperties(encriptNetworkPassword(adapterUiResponseWrapper.getNetworkData().getProperties(),
							adapterUiResponseWrapper.getMasterData().getAdapterDto().getType()));
			filterNetworPropertiesList(adapterUiResponseWrapper.getNetworkData().getProperties());
			AdapterNetworkConnectionMapper.processConnectionsToProperties(adapterUiResponseWrapper);
			JsonElement jsonElement = GsonUtil
					.getJsonObjectFromType(adapterUiResponseWrapper.getNetworkData().getProperties(), true);
			properties = jsonElement.toString();
		}
		return properties;
	}

	public static void filterNetworPropertiesList(NetworkPropertiesResponseWrapper networkPropertiesResponseWrapper) {
		logger.info("inside filterNetworPropertiesList()...");
		List<PropertiesWrapper> message = networkPropertiesResponseWrapper.getMessage();
		List<PropertiesWrapper> network = networkPropertiesResponseWrapper.getNetwork();
		List<PropertiesWrapper> messageFiltered = new ArrayList<>();
		List<PropertiesWrapper> networkFiltered = new ArrayList<>();

		filterNewtokPropertyData(message, "message", messageFiltered);
		filterNewtokPropertyData(network, "network", networkFiltered);

		networkPropertiesResponseWrapper.setNetwork(networkFiltered);
		networkPropertiesResponseWrapper.setMessage(messageFiltered);
		logger.info("completed filterNetworProperties");
	}

	public static void filterNewtokPropertyData(List<PropertiesWrapper> data, String type,
			List<PropertiesWrapper> resultData) {
		logger.info("inside filterNewtokPropertyData for type: {}", type);
		if (!data.isEmpty()) {
			data.stream().forEach(each -> {
				if (each.getField() != null) {
					each.setField(each.getField().replace(" ", ""));
				}
				if (each.getValue() instanceof String) {
					resultData.add(each);
				} else if (each.getDatatype().equalsIgnoreCase("file")) {
					resultData.add(each);
				}
			});
		}
		logger.info("completed filterNewtokPropertyData with resultData size: {}", resultData.size());
	}

	public static NetworkUiResponseWrapper setUiNetwork(AdapterUiResponseWrapper adapterUiResponseWrapper,
			AdapterDto adapterDto) {
		NetworkUiResponseWrapper networkData = new NetworkUiResponseWrapper();
		NetworkPropertiesResponseWrapper networkProperties = GsonUtil.getObjectFromString(
				adapterDto.getAdapterConfiguration().get(0).getProperties(), NetworkPropertiesResponseWrapper.class);
		if (networkProperties != null) {
			decriptNetworkPassword(networkProperties, adapterDto.getType());
		} else {
			networkProperties = new NetworkPropertiesResponseWrapper();
		}
		networkData.setProperties(networkProperties);
		networkData.setConnectionManagement(
				AdapterNetworkConnectionMapper.processConnections(adapterUiResponseWrapper, networkProperties));
		return networkData;
	}

	public static TransformUiResponseWrapper setUiTransform(AdapterUiResponseWrapper adapterUiResponseWrapper,
			AdapterDto adapterDto) {
		logger.debug("inside setUiTransform().. for adapterUiResponseWrapper {}", adapterUiResponseWrapper);
		TransformUiResponseWrapper transformData = new TransformUiResponseWrapper();
		AdapterConfigurationDto adapterConfigurationDto = adapterDto.getAdapterConfiguration().get(0);
		if (adapterConfigurationDto != null) {
			transformData.setRequestMapping(
					JsonObjectUtil.getObjectFromJsonString(adapterConfigurationDto.getRequestMapping()));
			transformData.setResponseMapping(
					JsonObjectUtil.getObjectFromJsonString(adapterConfigurationDto.getResponseMapping()));
			transformData.setImfLeg(JsonObjectUtil.getObjectFromJsonString(adapterConfigurationDto.getImfLeg()));
		}
		return transformData;
	}

	public static ResponseCodeUiResponseWrapper setUiResponseCode(AdapterUiResponseWrapper adapterUiResponseWrapper,
			AdapterDto adapterDto) {
		logger.info("inside setUiResponseCode()...with adapterUiResponseWrapper.getConfigurationId:{}",
				adapterUiResponseWrapper.getConfigurationId());
		ResponseCodeUiResponseWrapper responseCodeData = new ResponseCodeUiResponseWrapper();
		AdapterConfigurationDto adapterConfigurationDto = adapterDto.getAdapterConfiguration().get(0);
		if (adapterConfigurationDto != null) {
			String responseCode = adapterConfigurationDto.getResponseCode();
			IpcUiWrapper ipcUiWrapper = null;
			ipcUiWrapper = GsonUtil.getObjectFromString(responseCode, IpcUiWrapper.class);
			responseCodeData.setIpcUiWrapper(ipcUiWrapper);
		}
		return responseCodeData;
	}

	public static String getTabName(AdapterUiResponseWrapper adapterUiResponseWrapper, String action) {

		logger.info("inside getTabName()...with action:{}", action);
		String flowName = "";
		if (adapterUiResponseWrapper.getSchemaData() != null
				&& "1".equalsIgnoreCase(adapterUiResponseWrapper.getSchemaData().getPersistRequired())) {
			flowName = flowName + "~" + TAB_SCHEMA;
		}
		if (adapterUiResponseWrapper.getNetworkData() != null
				&& "1".equalsIgnoreCase(adapterUiResponseWrapper.getNetworkData().getPersistRequired())) {
			flowName = flowName + "~" + TAB_NETWORK;
		}
		if (adapterUiResponseWrapper.getTransformData() != null
				&& "1".equalsIgnoreCase(adapterUiResponseWrapper.getTransformData().getPersistRequired())) {
			flowName = flowName + "~" + TAB_TRANSFORM;
		}
		if (adapterUiResponseWrapper.getResponseCodeData() != null
				&& "1".equalsIgnoreCase(adapterUiResponseWrapper.getResponseCodeData().getPersistRequired())) {
			flowName = flowName + "~" + TAB_RESPONSE_CODE;
		}
		return flowName;
	}

	public static AdapterUiResponseWrapper setTabPersistantRequired(AdapterUiResponseWrapper adapterUiResponseWrapper) {
		adapterUiResponseWrapper.getSchemaData().setPersistRequired("0");
		adapterUiResponseWrapper.getNetworkData().setPersistRequired("0");
		adapterUiResponseWrapper.getTransformData().setPersistRequired("0");
		adapterUiResponseWrapper.getResponseCodeData().setPersistRequired("0");
		adapterUiResponseWrapper.getBeanconfiguationData().setPersistRequired("0");
		return adapterUiResponseWrapper;
	}

	public static AdapterUiResponseWrapper adapterDtoToUiWrapper(AdapterDto adapterDto,
			List<String> transformExcludedFieldList) {
		logger.info("inside adapterDtoToUiWrapper()...");
		AdapterUiResponseWrapper response = null;
		AdapterUiResponseWrapper adapterUiResponseWrapper = adapterDtoToUiWrapper(adapterDto);
		try {
			response = setTranformDefaultData(adapterUiResponseWrapper, transformExcludedFieldList);
		} catch (Exception e) {
			logger.error("Exception in adapterDtoToUiWrapper()...{} ", e.getMessage());
		}
		logger.info("adapterDtoToUiWrapper completed");
		return response;
	}

	public static AdapterUiResponseWrapper setISOTranformDefaultData(AdapterUiResponseWrapper adapterUiResponseWrapper,
			List<String> transformExcludedFieldList) {
		logger.info("inside setISOTranformDefaultData()...");
		String schemaData = "";
		if (adapterUiResponseWrapper.getSchemaData() == null
				&& (adapterUiResponseWrapper.getSchemaData().getSchema() == null
						&& adapterUiResponseWrapper.getSchemaData().getResponseSchema() == null)) {
			throw new RippsAdminException("Issue in loading Schema data");
		}
		if (null != adapterUiResponseWrapper.getSchemaData().getSchema()) {
			if (adapterUiResponseWrapper.getSchemaData().getSchema() instanceof String) {
				schemaData = HTMLInjectionUtil
						.validateHTMLInjection(adapterUiResponseWrapper.getSchemaData().getSchema().toString());
			} else {
				schemaData = HTMLInjectionUtil.validateHTMLInjection(
						((JSONObject) adapterUiResponseWrapper.getSchemaData().getSchema()).toString());
			}
			setFieldSchemeImfMapper(schemaData, Constants.ADAPTER_FILE_TYPE_REQUEST, adapterUiResponseWrapper,
					transformExcludedFieldList);
		}
		if (null != adapterUiResponseWrapper.getSchemaData().getResponsePackager()) {
			if (adapterUiResponseWrapper.getSchemaData().getResponseSchema() instanceof String) {
				schemaData = adapterUiResponseWrapper.getSchemaData().getResponseSchema().toString();
			} else {
				schemaData = ((JSONObject) adapterUiResponseWrapper.getSchemaData().getResponseSchema()).toString();
			}
			setFieldSchemeImfMapper(schemaData, Constants.ADAPTER_FILE_TYPE_RESPONSE, adapterUiResponseWrapper,
					transformExcludedFieldList);
		}
		logger.info("setTranformDefaultData completed");
		return adapterUiResponseWrapper;
	}

	private static void setFieldSchemeImfMapper(String schemaData, String fieldType,
			AdapterUiResponseWrapper adapterUiResponseWrapper, List<String> transformExcludedFieldList) {

		if (checkStringData(schemaData)) {
			String fieldpath = "$.template.field[*]";
			List<Map<String, Object>> filedList = JsonPath.parse(schemaData).read(fieldpath);
			List<FieldSchemeImfMapperUiWrapper> fieldSchemeImfMapperUiWrapperList = new ArrayList<>();
			FieldSchemeImfMapperUiWrapper fieldSchemeImfMapperUiWrapper = null;
			String id = "";
			IdAndCodeWrapperString idAndCodeWrapperString = null;
			List<IdAndCodeWrapperString> listIdRule = new ArrayList<>();
			for (int i = 0; i < filedList.size(); i++) {
				id = "" + filedList.get(i).get("id");
				idAndCodeWrapperString = new IdAndCodeWrapperString();
				idAndCodeWrapperString.setId(id);
				idAndCodeWrapperString.setCode("Field " + id + " " + filedList.get(i).get("name"));
				listIdRule.add(idAndCodeWrapperString);

				if (!transformExcludedFieldList.contains(id)) {
					fieldSchemeImfMapperUiWrapper = new FieldSchemeImfMapperUiWrapper();
					fieldSchemeImfMapperUiWrapper.setFieldId(id);
					fieldSchemeImfMapperUiWrapper.setFieldName("Field " + id + " " + filedList.get(i).get("name"));
					fieldSchemeImfMapperUiWrapperList.add(fieldSchemeImfMapperUiWrapper);
				}
			}
			if (fieldType.equalsIgnoreCase(Constants.ADAPTER_FILE_TYPE_REQUEST)) {
				adapterUiResponseWrapper.getTransformData()
						.setFieldSchemeImfMapperUiWrapper(fieldSchemeImfMapperUiWrapperList);
				adapterUiResponseWrapper.getTransformData().setListIdRule(listIdRule);
			} else {
				adapterUiResponseWrapper.getTransformData()
						.setResponseFieldSchemeImfMapperUiWrapper(fieldSchemeImfMapperUiWrapperList);
				adapterUiResponseWrapper.getTransformData().setResponseListIdRule(listIdRule);
			}
		}
	}

	public static AdapterUiResponseWrapper setJSONTranformDefaultData(
			AdapterUiResponseWrapper adapterUiResponseWrapper) {
		logger.info("inside setTranformDefaultData");
		String schemaData = "";
		String adapterType = "";
		if (adapterUiResponseWrapper.getSchemaData() == null
				|| adapterUiResponseWrapper.getSchemaData().getSchema() == null) {
			throw new RippsAdminException("Issue in loading Schema data");
		}
		if (adapterUiResponseWrapper.getSchemaData().getSchema() instanceof String) {
			schemaData = HTMLInjectionUtil
					.validateHTMLInjection(adapterUiResponseWrapper.getSchemaData().getSchema().toString());
		} else {
			schemaData = HTMLInjectionUtil.validateHTMLInjection(
					((JSONObject) adapterUiResponseWrapper.getSchemaData().getSchema()).toString());
		}

		adapterType = adapterUiResponseWrapper.getMasterData().getAdapterDto().getType();
		if (StringUtil.isNotNullOrBlank(schemaData)) {
			AdapterApiFieldsData apiFieldsData = AdapterFieldsMapper.processJsonPackger(schemaData, adapterType);
			adapterUiResponseWrapper.getTransformData().setApiFieldsData(apiFieldsData);
		}
		logger.info("setTranformDefaultData completed");
		return adapterUiResponseWrapper;
	}

	public static AdapterUiResponseWrapper setSOAPTranformDefaultData(AdapterUiResponseWrapper adapterUiResponseWrapper,
			List<String> transformExcludedFieldList) {
		logger.info("inside setSOAPTranformDefaultData()...transformExcludedFieldList:{}", transformExcludedFieldList);
		return adapterUiResponseWrapper;
	}

	public static AdapterUiResponseWrapper setTranformDefaultData(AdapterUiResponseWrapper adapterUiResponseWrapper,
			List<String> transformExcludedFieldList) {
		logger.info("inside setTranformDefaultData()...");
		AdapterUiResponseWrapper response = null;
		String messageStandard = adapterUiResponseWrapper.getMasterData().getAdapterDto()
				.getStandardMessageSpecification().getMessageStandard().getValue();
		if (messageStandard.contains(ADAPTR_TYPE_ISO) && !messageStandard.contains(ADAPTR_TYPE_JSON)
				&& !messageStandard.contains(ADAPTR_TYPE_SOAP)) {
			logger.info("going for setISOTranformDefaultData...");
			response = setISOTranformDefaultData(adapterUiResponseWrapper, transformExcludedFieldList);
		} else if ((messageStandard.contains(ADAPTR_TYPE_JSON) || messageStandard.contains(ADAPTR_TYPE_HTTP_URLENCODED)
				|| messageStandard.contains(ADAPTR_TYPE_XML_OVER_HTTP))
				&& !messageStandard.contains(ADAPTR_TYPE_SOAP)) {
			logger.info("going for setJSONTranformDefaultData...");
			response = setJSONTranformDefaultData(adapterUiResponseWrapper);
		} else if (!messageStandard.contains(ADAPTR_TYPE_ISO) && !messageStandard.contains(ADAPTR_TYPE_JSON)
				&& messageStandard.contains(ADAPTR_TYPE_SOAP)) {
			logger.info("going for setISOTranformDefaultData");
			response = setSOAPTranformDefaultData(adapterUiResponseWrapper, transformExcludedFieldList);
		}
		if (response == null) {
			response = adapterUiResponseWrapper;
		}
		logger.info("setTranformDefaultData() completed...");
		return response;
	}

	public static NetworkPropertiesResponseWrapper encriptNetworkPassword(
			NetworkPropertiesResponseWrapper networkPropertiesResponseWrapper, String type) {
		logger.info("inside encriptNetworkPassword()...type:{}", type);
		List<PropertiesWrapper> propertiesWrapperList = null;

		propertiesWrapperList = networkPropertiesResponseWrapper.getNetwork();
		List<PropertiesWrapper> newNetworkList = new ArrayList<>();

		for (PropertiesWrapper propertiesWrapper : propertiesWrapperList) {
			if ("PASSWORD".equalsIgnoreCase(propertiesWrapper.getDatatype())) {
				propertiesWrapper.setValue((String) propertiesWrapper.getValue());
			}
			newNetworkList.add(propertiesWrapper);
		}
		networkPropertiesResponseWrapper.setNetwork(newNetworkList);
		return networkPropertiesResponseWrapper;
	}

	public static NetworkPropertiesResponseWrapper decriptNetworkPassword(
			NetworkPropertiesResponseWrapper networkPropertiesResponseWrapper, String type) {
		logger.info("inside decriptNetworkPassword()...type:{}", type);
		List<PropertiesWrapper> propertiesWrapperList = null;

		propertiesWrapperList = networkPropertiesResponseWrapper.getNetwork();
		List<PropertiesWrapper> newNetworkList = new ArrayList<>();

		for (PropertiesWrapper propertiesWrapper : propertiesWrapperList) {
			if ("PASSWORD".equalsIgnoreCase(propertiesWrapper.getDatatype())) {
				propertiesWrapper.setValue(((String) propertiesWrapper.getValue()).replace("_ENCRIPT", ""));
			}
			newNetworkList.add(propertiesWrapper);
		}
		networkPropertiesResponseWrapper.setNetwork(newNetworkList);
		return networkPropertiesResponseWrapper;
	}

	public static void validateConfigurationData(String flowName, AdapterConfigurationDto adapterConfigurationDto,
			AdapterUiResponseWrapper adapterUiResponseWrapper) {
		if (checkStringData(flowName) && adapterConfigurationDto != null) {

			if (null == adapterConfigurationDto.getFileType()
					&& !adapterUiResponseWrapper.getNetworkData().getProperties().isMultiPackager()) {
				if (flowName.contains(AdapterWrapperDtoMapper.TAB_SCHEMA)
						&& (!checkStringData(adapterConfigurationDto.getMessageSchemaPackager()))) {
					throw new RippsAdminException("Schema tab data is not valid");
				}
			} else if (adapterUiResponseWrapper.getNetworkData().getProperties().isMultiPackager()) {
				if (flowName.contains(AdapterWrapperDtoMapper.TAB_SCHEMA)
						&& (!(checkStringData(adapterConfigurationDto.getMessageSchemaPackager())
								|| checkStringData(adapterConfigurationDto.getResponsePackager())))) {
					throw new RippsAdminException("Schema tab data is not valid");
				}
			} else if (!StringUtils.isEmpty(adapterConfigurationDto.getFileType())
					&& adapterConfigurationDto.getFileType().equalsIgnoreCase(Constants.ADAPTER_FILE_TYPE_REQUEST)) {
				if (flowName.contains(AdapterWrapperDtoMapper.TAB_SCHEMA)
						&& !checkStringData(adapterConfigurationDto.getMessageSchemaPackager())) {
					throw new RippsAdminException("Schema tab data is not valid");
				}
			} else {
				if (flowName.contains(AdapterWrapperDtoMapper.TAB_SCHEMA)
						&& !checkStringData(adapterConfigurationDto.getResponsePackager())) {
					throw new RippsAdminException("Schema tab data is not valid");
				}
			}
			if (flowName.contains(AdapterWrapperDtoMapper.TAB_NETWORK)
					&& !checkStringData(adapterConfigurationDto.getProperties())) {
				throw new RippsAdminException("Network data is not valid");
			}
			if (flowName.contains(AdapterWrapperDtoMapper.TAB_TRANSFORM)
					&& !checkStringData(adapterConfigurationDto.getRequestMapping())) {
				throw new RippsAdminException("Transform tab data is not valid");
			}
			if (flowName.contains(AdapterWrapperDtoMapper.TAB_RESPONSE_CODE)
					&& !checkStringData(adapterConfigurationDto.getResponseCode())) {
				throw new RippsAdminException("Response tab data is not valid");
			}
		} else {
			throw new RippsAdminException("Adapter data is not valid");
		}
	}

	public static boolean checkStringData(String input) {
		boolean validationFlag = false;
		if (StringUtil.isEmptyOrNull(input)) {
			validationFlag = false;
		} else {
			validationFlag = true;
		}
		return validationFlag;
	}

	public static List<CustomBeanConfigurationDto> getBeanDtofromUiWrapper(
			AdapterUiResponseWrapper adapterUiResponseWrapper) {
		logger.info("inside getBeanDtofromUiWrapper");
		List<CustomBeanConfigurationDto> dtoList = null;
		if (adapterUiResponseWrapper.getBeanconfiguationData() != null) {
			List<CustomBeanConfigurationUiWrapper> wrapperList = adapterUiResponseWrapper.getBeanconfiguationData()
					.getBeans();
			dtoList = BeanConfigurationMapper.customUiWrapperToCustomDto(wrapperList);
		}
		return dtoList;
	}

	public static AdapterUiResponseWrapper setBeanDtoInAdapterUiResponseWrapper(
			AdapterUiResponseWrapper adapterUiResponseWrapper, List<CustomBeanConfigurationUiWrapper> beans) {
		logger.info("inside setBeanDtoInAdapterUiResponseWrapper()...");
		try {
			BeanConfigurationUiWrapper beanConfigurationUiWrapper = new BeanConfigurationUiWrapper();
			beanConfigurationUiWrapper.setBeans(beans);
			adapterUiResponseWrapper.setBeanconfiguationData(beanConfigurationUiWrapper);

		} catch (Exception e) {
			logger.error("issue in Bean-data data");
			logger.error(ExceptionLog.printStackTraceToString(e));
		}
		return adapterUiResponseWrapper;
	}

	public static AdapterUiResponseWrapper copyAdapterDtoToUiWrapper(AdapterDto adapterDto) {
		logger.info("inside copyAdapterDtoToUiWrapper()...");
		AdapterUiResponseWrapper response = new AdapterUiResponseWrapper();
		try {

			AdapterConfigurationDto adapterConfigurationDto = adapterDto.getAdapterConfiguration().get(0);
			adapterDto.getAdapterConfiguration().get(0).setAdapter(null);
			MasterAdapterWrapper masterData = new MasterAdapterWrapper();
			masterData.setAdapterDto(adapterDto);
			response.setMasterData(masterData);

			prepareSchemaData(response, adapterConfigurationDto);
			prepareNetworkData(adapterDto, response, adapterConfigurationDto);
			prepareTransformData(adapterDto, response, adapterConfigurationDto);
			prepareResponseCodeData(adapterDto, response, adapterConfigurationDto);
			setBeanDtoInAdapterUiResponseWrapper(response, null);
		} catch (Exception e) {
			throw new RippsAdminException("DTO to UI conversion failed:" + e.getMessage());
		}
		return response;
	}

	private static void prepareResponseCodeData(AdapterDto adapterDto, AdapterUiResponseWrapper response,
			AdapterConfigurationDto adapterConfigurationDto) {
		try {
			ResponseCodeUiResponseWrapper responseCodeData = setUiResponseCode(response, adapterDto);
			if (!StringUtil.isNotNullOrBlank(adapterConfigurationDto.getResponseCode())) {
				responseCodeData.setPersistRequired("0");
			} else {
				responseCodeData.setPersistRequired("1");
			}
			response.setResponseCodeData(responseCodeData);

		} catch (Exception e) {
			logger.error("issue in Responce-code data");
			logger.error(ExceptionLog.printStackTraceToString(e));
		}
	}

	private static void prepareTransformData(AdapterDto adapterDto, AdapterUiResponseWrapper response,
			AdapterConfigurationDto adapterConfigurationDto) {
		try {
			TransformUiResponseWrapper transformData = setUiTransform(response, adapterDto);

			if (!(StringUtil.isNotNullOrBlank(adapterConfigurationDto.getRequestMapping())
					|| StringUtil.isNotNullOrBlank(adapterConfigurationDto.getResponseMapping())
					|| StringUtil.isNotNullOrBlank(adapterConfigurationDto.getImfLeg()))) {
				transformData.setPersistRequired("0");
			} else {
				transformData.setPersistRequired("1");
			}
			response.setTransformData(transformData);
		} catch (Exception e) {
			logger.error("issue in Transform Request/Response mapping data");
			logger.error(ExceptionLog.printStackTraceToString(e));
		}
	}

	private static void prepareNetworkData(AdapterDto adapterDto, AdapterUiResponseWrapper response,
			AdapterConfigurationDto adapterConfigurationDto) {
		try {
			NetworkUiResponseWrapper networkData = new NetworkUiResponseWrapper();
			if (!StringUtil.isNotNullOrBlank(adapterConfigurationDto.getProperties())) {
				networkData.setPersistRequired("0");
			} else {
				networkData = setUiNetwork(response, adapterDto);
				networkData.setPersistRequired("1");
			}
			response.setNetworkData(networkData);
		} catch (Exception e) {
			logger.error("issue in Network-proprties data");
			logger.error(ExceptionLog.printStackTraceToString(e));
		}
	}

	private static void prepareSchemaData(AdapterUiResponseWrapper response,
			AdapterConfigurationDto adapterConfigurationDto) {
		try {
			SchemaUiResponseWrapper schemaData = new SchemaUiResponseWrapper();
			if (!StringUtil.isNotNullOrBlank(adapterConfigurationDto.getMessageSchemaPackager())) {
				schemaData.setPersistRequired("0");
			} else {
				schemaData.setPersistRequired("1");
			}
			schemaData.setMessageSchemaPackager(adapterConfigurationDto.getMessageSchemaPackager());
			schemaData.setResponsePackager(adapterConfigurationDto.getResponsePackager());
			response.setSchemaData(schemaData);
		} catch (Exception e) {
			throw new RippsAdminException("Issue  in loading Schema data :" + e.getMessage());
		}
	}

	public static AdapterUiResponseWrapper exportedUiWrapperToImportableUiWrapper(
			AdapterUiResponseWrapper adapterUiResponseWrapper) {
		logger.info("inside adapterDtoToUiWrapper");
		try {
			if (!StringUtil.isNotNullOrBlank(adapterUiResponseWrapper.getSchemaData().getMessageSchemaPackager())) {
				adapterUiResponseWrapper.getSchemaData().setPersistRequired("0");
			} else {
				adapterUiResponseWrapper.getSchemaData().setPersistRequired("1");
			}

			if (adapterUiResponseWrapper.getNetworkData().getProperties() == null) {
				adapterUiResponseWrapper.getNetworkData().setPersistRequired("0");
			} else {
				adapterUiResponseWrapper.getNetworkData().setPersistRequired("1");
			}

			if (adapterUiResponseWrapper.getTransformData().getRequestMapping() == null) {
				adapterUiResponseWrapper.getTransformData().setPersistRequired("0");
			} else {
				adapterUiResponseWrapper.getTransformData().setPersistRequired("1");
			}

			if (adapterUiResponseWrapper.getResponseCodeData() == null) {
				adapterUiResponseWrapper.getResponseCodeData().setPersistRequired("0");
			} else {
				adapterUiResponseWrapper.getResponseCodeData().setPersistRequired("1");
			}
		} catch (Exception e) {
			throw new RippsAdminException("DTO to UI conversion failed:" + e.getMessage());
		}
		return adapterUiResponseWrapper;
	}

	public static String getAdapterTypeByTemplateName(String templateName) {
		logger.info("getAdapterTypeByTemplateName() for templateName: {}", templateName);
		String type = null;
		if (templateName.contains(ADAPTR_TYPE_ISO) && !templateName.contains(ADAPTR_TYPE_JSON)
				&& !templateName.contains(ADAPTR_TYPE_SOAP)) {
			type = ADAPTR_TYPE_ISO;
		} else if (templateName.contains(ADAPTR_TYPE_JSON) && !templateName.contains(ADAPTR_TYPE_SOAP)) {
			type = ADAPTR_TYPE_JSON;
		} else if (!templateName.contains(ADAPTR_TYPE_ISO) && !templateName.contains(ADAPTR_TYPE_JSON)
				&& templateName.contains(ADAPTR_TYPE_SOAP)) {
			type = ADAPTR_TYPE_SOAP;
		} else if (templateName.contains(ADAPTR_TYPE_HTTP_URLENCODED)) {
			type = ADAPTR_TYPE_HTTP_URLENCODED;
		} else if (templateName.contains(ADAPTR_TYPE_XML_OVER_HTTP)) {
			type = ADAPTR_TYPE_XML_OVER_HTTP;
		}
		logger.info("return getAdapterTypeByTemplateName with type: {}", type);
		return type;
	}

	public static boolean validateSchemaDataContent(String schemaDataContent, String templateName) {
		boolean isValidContent = false;
		isValidContent = FileToSchemaDataMapper.validateSchemaDataContent(schemaDataContent, templateName);
		if (!isValidContent) {
			throw new RippsAdminException("Invalid Packager");
		} else {
			logger.info("Packager parsed successfully");
		}
		return isValidContent;
	}

	public static boolean validateTransformDataContent(AdapterUiResponseWrapper adapterUiResponseWrapper) {
		logger.info("inside validateTransformDataContent");
		boolean isValidContent = false;

		String templateName = adapterUiResponseWrapper.getMasterData().getAdapterDto().getStandardMessageSpecification()
				.getMessageStandard().getValue();

		String type = AdapterWrapperDtoMapper.getAdapterTypeByTemplateName(templateName);
		if (AdapterWrapperDtoMapper.ADAPTR_TYPE_ISO.equalsIgnoreCase(type)) {
			transformApiDataValidation(adapterUiResponseWrapper.getTransformData());
		} else if (AdapterWrapperDtoMapper.ADAPTR_TYPE_JSON.equalsIgnoreCase(type)) {
			logger.info("validate based on JSON");
			transformApiDataValidation(adapterUiResponseWrapper.getTransformData());
		} else if (AdapterWrapperDtoMapper.ADAPTR_TYPE_SOAP.equalsIgnoreCase(type)) {
			logger.info("validate based on SOAP");
			transformApiDataValidation(adapterUiResponseWrapper.getTransformData());
		} else if (AdapterWrapperDtoMapper.ADAPTR_TYPE_HTTP_URLENCODED.equalsIgnoreCase(type)) {
			logger.info("validate based on HTTP_URLENCODED");
			transformApiDataValidation(adapterUiResponseWrapper.getTransformData());
		}
		isValidContent = true;
		logger.info("returning validateTransformDataContent");
		return isValidContent;
	}

	public static void transformApiDataValidation(TransformUiResponseWrapper transformUiResponseWrapper) {
		logger.info("Inside transformApiDataValidation");
		boolean isValid = false;
		if ("1".equalsIgnoreCase(transformUiResponseWrapper.getPersistRequired())) {
			isValid = transformationApiValidation(
					JsonObjectUtil.getJsonStringFromObject(transformUiResponseWrapper.getRequestMapping()));
			if (!isValid) {
				logger.info("Invalid Trasnform-Request-Mapping- parsing failed");
				throw new RippsAdminException("Invalid Trasnform-Mapping");
			} else {
				logger.info("transform RequestMapping parsed successfully");
			}
		}
	}

	public static boolean transformationApiValidation(String json) {
		logger.info("Inside transformationApiValidation");
		boolean isValid = false;
		if (json != null) {
			logger.info("json to validate:->");
			TransactionSet transactionSet = JsonObjectUtil.getGenericObjectFromJsonString(json, TransactionSet.class);
			if (transactionSet == null) {
				logger.error("Exception in parsing tarnsform data Json:{} ", json);
				isValid = false;
			} else {
				logger.info("Transform data has been parsed");
				isValid = true;
			}
		}
		return isValid;
	}

	public static void convertAdapterUiData(AdapterUiResponseWrapper adapterUiResponseWrapper,
			List<String> transformExcludedFieldList) {
		logger.info("inside convertAdapterUiData");
		String templateName = adapterUiResponseWrapper.getMasterData().getAdapterDto().getStandardMessageSpecification()
				.getMessageStandard().getValue();
		setSchemaDataUI(adapterUiResponseWrapper.getSchemaData().getMessageSchemaPackager(), templateName,
				adapterUiResponseWrapper.getSchemaData(),
				adapterUiResponseWrapper.getSchemaData().getResponsePackager());// TODO
		setTranformDefaultData(adapterUiResponseWrapper, transformExcludedFieldList);
	}

	public static SchemaUiResponseWrapper setSchemaDataUI(String messageSchemaPackagerData, String templateName,
			SchemaUiResponseWrapper schemaData, String responsePackager) {
		logger.info("inside setSchemaDataUI");
		String schemaXml = "";
		try {
			if (schemaData == null) {
				schemaData = new SchemaUiResponseWrapper();
			}
			if (messageSchemaPackagerData == null || "".equalsIgnoreCase(messageSchemaPackagerData)) {
				schemaData.setSchema(null);
			} else {
				if (!StringUtils.isEmpty(messageSchemaPackagerData))
					schemaXml = StringUtil.getStringToEncodedString(messageSchemaPackagerData);
				JSONObject jSONObject = MessageConversionJsonMapper.getJsonFromXml(schemaXml, templateName);
				schemaData.setSchema(jSONObject.toString());
			}

			if (responsePackager == null || "".equalsIgnoreCase(responsePackager)) {
				schemaData.setResponseSchema(null);
			} else {
				schemaXml = null;
				if (!StringUtils.isEmpty(responsePackager))
					schemaXml = StringUtil.getStringToEncodedString(responsePackager);
				JSONObject jSONObject = MessageConversionJsonMapper.getJsonFromXml(schemaXml, templateName);
				schemaData.setResponseSchema(jSONObject.toString());
			}
			schemaData.setMessageSchemaPackager(messageSchemaPackagerData);
			schemaData.setResponsePackager(responsePackager);
		} catch (RippsAdminException e) {
			logger.error("issue in schema data");
			logger.error(ExceptionLog.printStackTraceToString(e));
			throw new RippsAdminException("Issue in loading Schema data :" + e.getMessage());
		}
		return schemaData;
	}

	public static AdapterDto convertAdapterToAdapterDtoWithAdapterConfiguration(Adapter adapter,
			AdapterDto adapterDto) {
		if (adapterDto == null) {
			adapterDto = new AdapterDto();
		}
		adapterDto.setAdapterId(adapter.getAdapterId());
		adapterDto.setActive(adapter.getActive());
		adapterDto.setGuid(adapter.getGuid());
		adapterDto.setId(adapter.getId());
		adapterDto.setName(adapter.getName());
		adapterDto.setStandardMessageSpecification(StandardMessageSpecificationMapper
				.getStandardMessageSpecificationDto(adapter.getStandardMessageSpecification()));
		adapterDto.setType(adapter.getType());
		adapterDto.setAdapterConfiguration(getAdapterConfigurationDto(adapter));
		return adapterDto;
	}

	public static AdapterConfigurationDto getAdapterConfigurationDto(AdapterConfiguration adapterConfiguration) {
		AdapterConfigurationDto adapterConfigurationDto = new AdapterConfigurationDto();
		adapterConfigurationDto.setId(adapterConfiguration.getId());
		adapterConfigurationDto.setGuid(adapterConfiguration.getGuid());
		adapterConfigurationDto.setImfId(ImfStructureMapper.getImfStructureDto(adapterConfiguration.getImfId()));
		adapterConfigurationDto.setMessageSchemaPackager(adapterConfiguration.getMessageSchemaPackager());
		adapterConfigurationDto.setResponsePackager(adapterConfiguration.getResponsePackager());
		adapterConfigurationDto.setProperties(adapterConfiguration.getProperties());
		adapterConfigurationDto.setRequestMapping(adapterConfiguration.getRequestMapping());
		adapterConfigurationDto.setResponseCode(adapterConfiguration.getResponseCode());
		adapterConfigurationDto.setResponseMapping(adapterConfiguration.getResponseMapping());
		adapterConfigurationDto.setStatus(adapterConfiguration.getStatus());
		adapterConfigurationDto.setVersion(adapterConfiguration.getVersion());
		return adapterConfigurationDto;
	}

	public static AdapterDto getAdapterDtoFromConfig(AdapterConfiguration adapterConfiguration) {
		AdapterDto adapterDto = new AdapterDto();
		Adapter adapter = adapterConfiguration.getAdapter();
		List<AdapterConfiguration> adapterConfigurationList = new ArrayList<>();
		adapterConfigurationList.add(adapterConfiguration);
		adapter.setAdapterConfiguration(adapterConfigurationList);
		convertAdapterToAdapterDtoWithAdapterConfiguration(adapter, adapterDto);
		return adapterDto;
	}

	public static List<AdapterConfigurationDto> getAdapterConfigurationDto(Adapter adapter) {
		AdapterConfigurationDto adapterConfigurationDto = null;
		List<AdapterConfigurationDto> adapterConfigurationDtoList = null;
		if (null != adapter.getAdapterConfiguration() && !adapter.getAdapterConfiguration().isEmpty()) {
			adapterConfigurationDtoList = new ArrayList<>();
			for (AdapterConfiguration adapterConfiguration : adapter.getAdapterConfiguration()) {
				adapterConfigurationDto = getAdapterConfigurationDto(adapterConfiguration);
				adapterConfigurationDtoList.add(adapterConfigurationDto);
			}
		}
		return adapterConfigurationDtoList;
	}

	public static List<AdapterConfiguration> getAdapterConfigurationFromAdpterConfigurationDto(
			List<AdapterConfigurationDto> list) {
		AdapterConfiguration adapterConfiguration = null;
		List<AdapterConfiguration> adapterConfigurationList = null;
		if (null != list && !list.isEmpty()) {
			adapterConfigurationList = new ArrayList<>();
			for (AdapterConfigurationDto adapterConfigurationDto : list) {
				adapterConfiguration = getAdapterConfiguration(adapterConfigurationDto);
				adapterConfigurationList.add(adapterConfiguration);
			}
		}
		return adapterConfigurationList;
	}

	private static AdapterConfiguration getAdapterConfiguration(AdapterConfigurationDto adapterConfigurationDto) {
		AdapterConfiguration adapterConfiguration = new AdapterConfiguration();
		adapterConfiguration.setId(adapterConfigurationDto.getId());
		adapterConfiguration.setGuid(adapterConfigurationDto.getGuid());
		adapterConfiguration.setImfId(ImfStructureMapper.getImfStructure(adapterConfigurationDto.getImfId()));
		adapterConfiguration.setMessageSchemaPackager(adapterConfigurationDto.getMessageSchemaPackager());
		adapterConfiguration.setResponsePackager(adapterConfigurationDto.getResponsePackager());
		adapterConfiguration.setProperties(adapterConfigurationDto.getProperties());
		adapterConfiguration.setRequestMapping(adapterConfigurationDto.getRequestMapping());
		adapterConfiguration.setResponseCode(adapterConfigurationDto.getResponseCode());
		adapterConfiguration.setResponseMapping(adapterConfigurationDto.getResponseMapping());
		adapterConfiguration.setStatus(adapterConfigurationDto.getStatus());
		adapterConfiguration.setVersion(adapterConfigurationDto.getVersion());
		return adapterConfiguration;
	}

	public static void getAdapterFromAdapterDto(Adapter adapter, AdapterDto adapterDto) {
		adapter.setActive(adapterDto.getActive());
		adapter.setAdapterId(adapterDto.getAdapterId());
		adapter.setGuid(adapterDto.getGuid());
		adapter.setId(adapterDto.getId());
		adapter.setName(adapterDto.getName());
		adapter.setStandardMessageSpecification(StandardMessageSpecificationMapper
				.getStandardMessageSpecification(adapterDto.getStandardMessageSpecification()));
		adapter.setType(adapterDto.getType());
		adapter.setAdapterConfiguration(
				getAdapterConfigurationFromAdpterConfigurationDto(adapterDto.getAdapterConfiguration()));
	}

	public static AdapterSummaryUIWrapper customSummaryUIWapper(Object[] customAdapterListDto) {
		AdapterSummaryUIWrapper adapterSummaryUIWrapper = new AdapterSummaryUIWrapper();
		adapterSummaryUIWrapper.setId(Integer.valueOf((short) customAdapterListDto[0]));
		adapterSummaryUIWrapper.setName(customAdapterListDto[1].toString());
		adapterSummaryUIWrapper.setTemplate(customAdapterListDto[2].toString());
		adapterSummaryUIWrapper.setAdapterConfigSummaryUIWapper(fetchVersionList(customAdapterListDto));
		return adapterSummaryUIWrapper;
	}

	public static NameVersionListDto customListDtoIMF(Object[] customAdapterListDto) {

		NameVersionListDto nameVersionListDto = new NameVersionListDto();
		nameVersionListDto.setType("IMF");
		nameVersionListDto.setName(customAdapterListDto[1].toString());
		String x = customAdapterListDto[2].toString();
		List<Integer> version = new ArrayList<>();
		version.add(Integer.parseInt(x));
		nameVersionListDto.setVersions(version);
		return nameVersionListDto;
	}

	public static NameVersionListDto customListDto(Object[] customAdapterListDto) {
		NameVersionListDto nameVersionListDto = new NameVersionListDto();
		nameVersionListDto.setType(customAdapterListDto[1].toString());
		nameVersionListDto.setName(customAdapterListDto[2].toString());
		nameVersionListDto.setTemplate(customAdapterListDto[3].toString());
		nameVersionListDto.setVersions(fetchCompVersionList(customAdapterListDto));

		return nameVersionListDto;
	}

	public static JsonDataCompListChildDto customJsonListDto(Object[] customAdapterListDto) {
		JsonDataCompListChildDto jsonDataCompListChildDto = new JsonDataCompListChildDto();
		jsonDataCompListChildDto.setVersion(Integer.parseInt(customAdapterListDto[1].toString()));
		jsonDataCompListChildDto.setJson(customAdapterListDto[2].toString());
		jsonDataCompListChildDto.setCreatedBy(customAdapterListDto[3].toString());
		jsonDataCompListChildDto.setFirstName(customAdapterListDto[4].toString());
		jsonDataCompListChildDto.setLastName(customAdapterListDto[5].toString());
		return jsonDataCompListChildDto;
	}

	private static List<AdapterConfigSummaryUIWapper> fetchVersionList(Object[] customAdapterListDto) {
		List<AdapterConfigSummaryUIWapper> list = new ArrayList<>();
		String x = customAdapterListDto[3].toString();
		String[] versionArray = x.split("\\|");
		String[] zeroArray = { "V", "M", "D" };
		String[] otherArray = { "V", "M" };
		for (String each : versionArray) {
			if (each.split(":").length == 1) {
				continue;
			}
			AdapterConfigSummaryUIWapper adapterConfigSummaryUIWapper = new AdapterConfigSummaryUIWapper();
			int version = Integer.parseInt(each.split(":")[1]);

			adapterConfigSummaryUIWapper.setId(Integer.parseInt(each.split(":")[0]));
			adapterConfigSummaryUIWapper.setVersion(version);
			if (version == 0) {
				adapterConfigSummaryUIWapper.setAction(Arrays.asList(zeroArray));
			} else {
				adapterConfigSummaryUIWapper.setAction(Arrays.asList(otherArray));
			}
			list.add(adapterConfigSummaryUIWapper);
		}
		return list;
	}

	private static List<Integer> fetchCompVersionList(Object[] customAdapterListDto) {
		List<Integer> version = new ArrayList<>();
		String x = customAdapterListDto[4].toString();
		String[] versionArray = x.split("\\|");

		for (String each : versionArray) {
			if (each.split(":").length == 1) {
				continue;
			}
			int ver = Integer.parseInt(each.split(":")[1]);
			version.add(ver);
		}
		return version;
	}

	private static List<Integer> fetchVersionImfList(Object[] customAdapterListDto) {
		List<Integer> version = new ArrayList<>();
		String x = customAdapterListDto[2].toString();
		String[] versionArray = x.split("\\|");

		for (String each : versionArray) {
			if (each.split(":").length == 1) {
				continue;
			}
			int ver = Integer.parseInt(each.split(":")[1]);
			version.add(ver);
		}
		return version;
	}

	private static void sanatizeAdapterUiResponseWrapper(AdapterUiResponseWrapper adapterUiResponseWrapper) {
		if (null != adapterUiResponseWrapper.getMasterData().getAdapterDto()) {
			AdapterDto adapterDto = adapterUiResponseWrapper.getMasterData().getAdapterDto();
			adapterDto.setAdapterId(HTMLInjectionUtil.validateHTMLInjection(adapterDto.getAdapterId()));
			adapterDto.setGuid(HTMLInjectionUtil.validateHTMLInjection(adapterDto.getGuid()));
			adapterDto.setName(HTMLInjectionUtil.validateHTMLInjection(adapterDto.getName()));
			adapterDto.setType(HTMLInjectionUtil.validateHTMLInjection(adapterDto.getType()));

			if (null != adapterDto.getStandardMessageSpecification()) {
				StandardMessageSpecificationDto standardMessageSpecificationDto = adapterDto
						.getStandardMessageSpecification();
				// standardMessageSpecificationDto.setMessageSchemaPackager(HTMLInjectionUtil.validateHTMLInjection(standardMessageSpecificationDto.getMessageSchemaPackager()));
				// standardMessageSpecificationDto.setProperties(HTMLInjectionUtil.validateHTMLInjection(standardMessageSpecificationDto.getProperties()));

				if (null != standardMessageSpecificationDto.getMessageStandard()) {
					LookupValueDto messageStandard = standardMessageSpecificationDto.getMessageStandard();
					messageStandard.setValue(HTMLInjectionUtil.validateHTMLInjection(messageStandard.getValue()));
					messageStandard
							.setDescription(HTMLInjectionUtil.validateHTMLInjection(messageStandard.getDescription()));
				}

				if (null != standardMessageSpecificationDto.getMessageProtocol()) {
					LookupValueDto messageProtocol = standardMessageSpecificationDto.getMessageProtocol();
					messageProtocol.setValue(HTMLInjectionUtil.validateHTMLInjection(messageProtocol.getValue()));
					messageProtocol
							.setDescription(HTMLInjectionUtil.validateHTMLInjection(messageProtocol.getDescription()));
				}

				if (null != standardMessageSpecificationDto.getTransmissionProtocol()) {
					LookupValueDto transmissionProtocol = standardMessageSpecificationDto.getTransmissionProtocol();
					transmissionProtocol
							.setValue(HTMLInjectionUtil.validateHTMLInjection(transmissionProtocol.getValue()));
					transmissionProtocol.setDescription(
							HTMLInjectionUtil.validateHTMLInjection(transmissionProtocol.getDescription()));
				}
			}

			if (null != adapterDto.getAdapterConfiguration()) {
				for (AdapterConfigurationDto adapterConfiguration : adapterDto.getAdapterConfiguration()) {
					adapterConfiguration
							.setFileType(HTMLInjectionUtil.validateHTMLInjection(adapterConfiguration.getFileType()));
					adapterConfiguration
							.setGuid(HTMLInjectionUtil.validateHTMLInjection(adapterConfiguration.getGuid()));
					adapterConfiguration
							.setImfLeg(HTMLInjectionUtil.validateHTMLInjection(adapterConfiguration.getImfLeg()));
					// adapterConfiguration.setMessageSchemaPackager(HTMLInjectionUtil.validateHTMLInjection(adapterConfiguration.getMessageSchemaPackager()));
					adapterConfiguration.setProperties(
							HTMLInjectionUtil.validateHTMLInjection(adapterConfiguration.getProperties()));
					adapterConfiguration.setRequestMapping(
							HTMLInjectionUtil.validateHTMLInjection(adapterConfiguration.getRequestMapping()));
					adapterConfiguration.setResponseCode(
							HTMLInjectionUtil.validateHTMLInjection(adapterConfiguration.getResponseCode()));
					adapterConfiguration.setResponseMapping(
							HTMLInjectionUtil.validateHTMLInjection(adapterConfiguration.getResponseMapping()));
					// adapterConfiguration.setResponsePackager(HTMLInjectionUtil.validateHTMLInjection(adapterConfiguration.getResponsePackager()));
					adapterConfiguration
							.setStatus(HTMLInjectionUtil.validateHTMLInjection(adapterConfiguration.getStatus()));
				}
			}
		}

		if (null != adapterUiResponseWrapper.getSchemaData()) {
			SchemaUiResponseWrapper schemaData = adapterUiResponseWrapper.getSchemaData();
			// schemaData.setMessageSchemaPackager(HTMLInjectionUtil.validateHTMLInjection(schemaData.getMessageSchemaPackager()));
			schemaData.setFileType(HTMLInjectionUtil.validateHTMLInjection(schemaData.getFileType()));
			schemaData.setPersistRequired(HTMLInjectionUtil.validateHTMLInjection(schemaData.getPersistRequired()));
			// schemaData.setResponsePackager(HTMLInjectionUtil.validateHTMLInjection(schemaData.getResponsePackager()));
		}

		if (null != adapterUiResponseWrapper.getNetworkData()) {
			NetworkUiResponseWrapper networkData = adapterUiResponseWrapper.getNetworkData();
			networkData.setPersistRequired(HTMLInjectionUtil.validateHTMLInjection(networkData.getPersistRequired()));
		}

		if (null != adapterUiResponseWrapper.getTransformData()) {
			TransformUiResponseWrapper transformData = adapterUiResponseWrapper.getTransformData();
			transformData
					.setPersistRequired(HTMLInjectionUtil.validateHTMLInjection(transformData.getPersistRequired()));

			if (null != transformData.getFieldSchemeImfMapperUiWrapper()) {
				for (FieldSchemeImfMapperUiWrapper fieldSchema : transformData.getFieldSchemeImfMapperUiWrapper()) {
					fieldSchema.setFieldId(HTMLInjectionUtil.validateHTMLInjection(fieldSchema.getFieldId()));
					fieldSchema.setFieldName(HTMLInjectionUtil.validateHTMLInjection(fieldSchema.getFieldName()));
					fieldSchema.setRequestImfExpression(
							HTMLInjectionUtil.validateHTMLInjection(fieldSchema.getRequestImfExpression()));
					fieldSchema.setRequestImfField(
							HTMLInjectionUtil.validateHTMLInjection(fieldSchema.getRequestImfField()));
					fieldSchema.setResponseImfExpression(
							HTMLInjectionUtil.validateHTMLInjection(fieldSchema.getResponseImfExpression()));
					fieldSchema.setResponseImfField(
							HTMLInjectionUtil.validateHTMLInjection(fieldSchema.getResponseImfField()));
					fieldSchema.setResponseImfLeg(
							HTMLInjectionUtil.validateHTMLInjection(fieldSchema.getResponseImfLeg()));
				}
			}

			if (null != transformData.getResponseFieldSchemeImfMapperUiWrapper()) {
				for (FieldSchemeImfMapperUiWrapper fieldSchema : transformData
						.getResponseFieldSchemeImfMapperUiWrapper()) {
					fieldSchema.setFieldId(HTMLInjectionUtil.validateHTMLInjection(fieldSchema.getFieldId()));
					fieldSchema.setFieldName(HTMLInjectionUtil.validateHTMLInjection(fieldSchema.getFieldName()));
					fieldSchema.setRequestImfExpression(
							HTMLInjectionUtil.validateHTMLInjection(fieldSchema.getRequestImfExpression()));
					fieldSchema.setRequestImfField(
							HTMLInjectionUtil.validateHTMLInjection(fieldSchema.getRequestImfField()));
					fieldSchema.setResponseImfExpression(
							HTMLInjectionUtil.validateHTMLInjection(fieldSchema.getResponseImfExpression()));
					fieldSchema.setResponseImfField(
							HTMLInjectionUtil.validateHTMLInjection(fieldSchema.getResponseImfField()));
					fieldSchema.setResponseImfLeg(
							HTMLInjectionUtil.validateHTMLInjection(fieldSchema.getResponseImfLeg()));
				}
			}

			if (null != transformData.getListIdRule()) {
				for (IdAndCodeWrapperString listIdRule : transformData.getListIdRule()) {
					listIdRule.setCode(HTMLInjectionUtil.validateHTMLInjection(listIdRule.getCode()));
					listIdRule.setId(HTMLInjectionUtil.validateHTMLInjection(listIdRule.getId()));
				}
			}

			if (null != transformData.getSafingCondition()) {
				for (TransformUiSafingCondition safingCondition : transformData.getSafingCondition()) {
					safingCondition.setTxnType(HTMLInjectionUtil.validateHTMLInjection(safingCondition.getTxnType()));
					safingCondition
							.setUpdateFlag(HTMLInjectionUtil.validateHTMLInjection(safingCondition.getUpdateFlag()));
				}
			}
		}

		if (null != adapterUiResponseWrapper.getResponseCodeData()) {
			ResponseCodeUiResponseWrapper responseCodeData = adapterUiResponseWrapper.getResponseCodeData();
			responseCodeData
					.setPersistRequired(HTMLInjectionUtil.validateHTMLInjection(responseCodeData.getPersistRequired()));
			if (null != responseCodeData.getIpcUiWrapper()) {
				IpcUiWrapper ipcUiWrapper = responseCodeData.getIpcUiWrapper();
				ipcUiWrapper.setComponentResponseCodeField(
						HTMLInjectionUtil.validateHTMLInjection(ipcUiWrapper.getComponentResponseCodeField()));
				ipcUiWrapper.setDefaultResponseCode(
						HTMLInjectionUtil.validateHTMLInjection(ipcUiWrapper.getDefaultResponseCode()));
				ipcUiWrapper.setDefaultResponseDesc(
						HTMLInjectionUtil.validateHTMLInjection(ipcUiWrapper.getDefaultResponseDesc()));
				ipcUiWrapper.setDefaultStatusCode(
						HTMLInjectionUtil.validateHTMLInjection(ipcUiWrapper.getDefaultStatusCode()));
			}
		}

		if (null != adapterUiResponseWrapper.getBeanconfiguationData()) {
			BeanConfigurationUiWrapper beanconfiguationData = adapterUiResponseWrapper.getBeanconfiguationData();
			beanconfiguationData.setPersistRequired(
					HTMLInjectionUtil.validateHTMLInjection(beanconfiguationData.getPersistRequired()));
			if (null != beanconfiguationData.getBeans()) {
				for (CustomBeanConfigurationUiWrapper bean : beanconfiguationData.getBeans()) {
					bean.setComponentType(HTMLInjectionUtil.validateHTMLInjection(bean.getComponentType()));
					// bean.setFileContent(HTMLInjectionUtil.validateHTMLInjection(bean.getFileContent()));
					// bean.setFileContentSingle(HTMLInjectionUtil.validateHTMLInjection(bean.getFileContentSingle()));
					bean.setFileName(HTMLInjectionUtil.validateHTMLInjection(bean.getFileName()));
					bean.setFileType(HTMLInjectionUtil.validateHTMLInjection(bean.getFileType()));
					bean.setPackagingType(HTMLInjectionUtil.validateHTMLInjection(bean.getPackagingType()));
				}
			}
		}
	}
}
