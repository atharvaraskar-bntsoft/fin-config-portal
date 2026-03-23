package com.bnt.rest.service.impl;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.security.KeyStore;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Stream;

import javax.net.ssl.KeyManagerFactory;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManagerFactory;

import org.apache.hc.client5.http.impl.classic.CloseableHttpClient;
import org.apache.hc.client5.http.impl.classic.HttpClients;
import org.apache.hc.client5.http.impl.io.PoolingHttpClientConnectionManagerBuilder;
import org.apache.hc.client5.http.io.HttpClientConnectionManager;
import org.apache.hc.client5.http.ssl.NoopHostnameVerifier;
import org.apache.hc.client5.http.ssl.SSLConnectionSocketFactory;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.google.common.collect.Lists;
import com.bnt.core.orchestation.WorkFlows;
import com.bnt.bswitch.message.packager.DataType;
import com.bnt.bswitch.shared.lib.entities.CollectionUtil;
import com.bnt.common.util.Converter;
import com.bnt.common.util.RippsUtility;
import com.bnt.common.util.StreamUtils;
import com.bnt.common.util.StringUtil;
import com.bnt.common.util.exception.TokenException;
import com.bnt.common.util.exception.UserNotFoundException;
import com.bnt.constant.Constants;
import com.bnt.constant.EntityConstants;
import com.bnt.enums.AccoutType;
import com.bnt.enums.EntityGroupEnum;
import com.bnt.enums.lookup.CardType;
import com.bnt.enums.lookup.ConnectionStage;
import com.bnt.enums.lookup.TransactionType;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.AdapterDto;
import com.bnt.rest.dto.DeviceDto;
import com.bnt.rest.dto.DeviceTypeDto;
import com.bnt.rest.dto.DtoWrapper;
import com.bnt.rest.dto.IdAndNameStringWrapper;
import com.bnt.rest.dto.ImfStructureDto;
import com.bnt.rest.dto.ImfTemplateDto;
import com.bnt.rest.dto.LookupValueDto;
import com.bnt.rest.dto.NameAndCodeWrapper;
import com.bnt.rest.entity.AdapterConfiguration;
import com.bnt.rest.entity.Country;
import com.bnt.rest.entity.CountryState;
import com.bnt.rest.entity.Currency;
import com.bnt.rest.entity.Device;
import com.bnt.rest.entity.DeviceType;
import com.bnt.rest.entity.FunctionOperation;
import com.bnt.rest.entity.ImfTemplate;
import com.bnt.rest.entity.Institution;
import com.bnt.rest.entity.Location;
import com.bnt.rest.entity.LookupType;
import com.bnt.rest.entity.LookupValue;
import com.bnt.rest.entity.Merchant;
import com.bnt.rest.entity.MerchantInstitution;
import com.bnt.rest.entity.Role;
import com.bnt.rest.entity.Routing;
import com.bnt.rest.entity.RoutingVersion;
import com.bnt.rest.entity.SystemUser;
import com.bnt.rest.jpa.repository.AcquirerConfigPersistenceHelper;
import com.bnt.rest.jpa.repository.BinTablePersistenceHelper;
import com.bnt.rest.jpa.repository.CountryPersistenceHelper;
import com.bnt.rest.jpa.repository.CountryStatePersistenceHelper;
import com.bnt.rest.jpa.repository.CurrencyPersistenceHelper;
import com.bnt.rest.jpa.repository.DevicePersistenceRepository;
import com.bnt.rest.jpa.repository.DeviceTypePersistenceHelper;
import com.bnt.rest.jpa.repository.FunctionOperationHelper;
import com.bnt.rest.jpa.repository.ImfTemplatePersistenceHelper;
import com.bnt.rest.jpa.repository.InstitutionHelper;
import com.bnt.rest.jpa.repository.LocationPersistenceHelper;
import com.bnt.rest.jpa.repository.LookupTypePersistenceHelper;
import com.bnt.rest.jpa.repository.MerchantInstitutionPersistenceHelper;
import com.bnt.rest.jpa.repository.MerchantPersistenceHelper;
import com.bnt.rest.jpa.repository.ProcessorAdapterPersistenceHelper;
import com.bnt.rest.jpa.repository.RolePersistenceHelper;
import com.bnt.rest.jpa.repository.RoutingPersistenceHelper;
import com.bnt.rest.jpa.repository.RoutingVersionHelper;
import com.bnt.rest.jpa.repository.SwitchClusterPersistenceHelper;
import com.bnt.rest.jpa.repository.UserPersistenceHelper;
import com.bnt.rest.repository.AdapterConfigurationRepository;
import com.bnt.rest.repository.AuditLogRepository;
import com.bnt.rest.repository.LookupValueRepository;
import com.bnt.rest.repository.RuleRepository;
import com.bnt.rest.repository.StandardMessageSpecificationRepository;
import com.bnt.rest.repository.TxnLogBNTRepository;
import com.bnt.rest.service.AdapterService;
import com.bnt.rest.service.ImfStructureService;
import com.bnt.rest.service.NewWorkflowService;
import com.bnt.rest.service.ProcessorAdapterService;
import com.bnt.rest.service.SchemeImfMapperService;
import com.bnt.rest.wrapper.dto.DeviceTreeWrapper;
import com.bnt.rest.wrapper.dto.Fields;
import com.bnt.rest.wrapper.dto.FunctionOperationDto;
import com.bnt.rest.wrapper.dto.IdAndCodeAndPedIdWrapper;
import com.bnt.rest.wrapper.dto.IdAndCodeWrapper;
import com.bnt.rest.wrapper.dto.IdAndCodeWrapperString;
import com.bnt.rest.wrapper.dto.IdAndNameCodeWrapper;
import com.bnt.rest.wrapper.dto.IdAndNameWrapper;
import com.bnt.rest.wrapper.dto.ImfFields;
import com.bnt.rest.wrapper.dto.KeycloakTokenResponse;
import com.bnt.rest.wrapper.dto.KeyclockRole;
import com.bnt.rest.wrapper.dto.LocationTreeWrapper;
import com.bnt.rest.wrapper.dto.LookupValueUi;
import com.bnt.rest.wrapper.dto.LookuptypeUi;
import com.bnt.rest.wrapper.dto.MerchantTreeWrapper;
import com.bnt.rest.wrapper.dto.Operation;
import com.bnt.rest.wrapper.dto.Operator;
import com.bnt.rest.wrapper.dto.ServiceConditionDto;
import com.bnt.rest.wrapper.dto.ServiceTypeDto;
import com.bnt.rest.wrapper.dto.UserAttribute;
import com.bnt.service.mapper.AdapterToolKitImfMapper;
import com.bnt.service.mapper.GenericMapper;
import com.bnt.service.mapper.ListMapper;

import jakarta.servlet.http.HttpServletRequest;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class ListService {

	private static final Logger logger = LogManager.getLogger(ListService.class);

	public static final String SERVICE_TYPE = "SERVICE_TYPE";

	public static final String INTERNAL_PROCESSING_CODE = "internal_processing_code";

	public static final String DATE = "Date";

	public static final String DOUBLE = "Double";

	public static final String NUMBER = "Number";

	public static final String INT = "int";

	public static final String STRING = "string";

	public enum ConfigScheduleStatus {
		SCHEDULED, CANCELED, FAILED, DEPLOYED, PREDEPLOYED
	}

	@Value("${string.operator}")
	private String listStringOperators;

	@Value("${int.operator}")
	private String listIntOperators;

	@Value("${message.exchange.fields}")
	private String msgExchangeFields;

	@Value("${message.context.fields}")
	private String msgContextFields;

	@Value("${keycloak.role.url}")
	private String roleUrl;

	@Value("${keycloak.client.id}")
	private String clientId;

	@Value("${keycloak.url}")
	private String url;

	@Value("${keycloak.realm}")
	private String realm;

	@Value("${keycloak.ssl.keystore.password}")
	private String keystorePassword;

	@Value("${tls.version}")
	private String tlsVersion;

	@Value("${keycloak.ssl.truststore.path}")
	private String truststore;

	@Value("${keycloak.ssl.identity.path}")
	private String identityPath;

	@Value("${keycloak.ssl.enabled}")
	private String isKeyCloakOverSSL;

	@Value("${keycloak.shared.url}")
	private String sharedUrl;

	@Autowired
	private MerchantPersistenceHelper merchantPersistHelper;

	@Autowired
	private MerchantInstitutionPersistenceHelper institutionRepository;

	@Autowired
	private BinTablePersistenceHelper schemePersistenceHelper;

	@Autowired
	private LocationPersistenceHelper locationRepository;

	@Autowired
	private DeviceTypePersistenceHelper deviceTypeRepository;

	@Autowired
	private DevicePersistenceRepository devicePersistenceHelper;

	@Autowired
	private AcquirerConfigPersistenceHelper acquirerIdConfigPersistenceHelper;

	@Autowired
	private CountryStatePersistenceHelper stateRepository;

	@Autowired
	private CountryPersistenceHelper countryRepository;

	@Autowired
	private CurrencyPersistenceHelper currencyRepository;

	@Autowired
	private UserPersistenceHelper userRepository;

	@Lazy
	@Autowired
	private TxnLogBNTRepository txnLogRepository;

	@Autowired
	private RolePersistenceHelper roleRepository;

	@Autowired
	private DevicePersistenceRepository deviceRepo;

	@Autowired
	private FunctionOperationHelper functionOperationHelper;

	@Autowired
	private AuditLogRepository auditLogRepository;

	@Autowired
	private RoutingPersistenceHelper routingPersistenceHelper;

	@Autowired
	private RoutingVersionHelper routingVersionHelper;

	@Autowired
	private InstitutionHelper institutionHelper;

	@Autowired
	private ProcessorAdapterPersistenceHelper processorAdapterPersistenceHelper;

	@Autowired
	ProcessorAdapterPersistenceHelper processorAdapterHelper;

	@Autowired
	RuleRepository ruleRepository;

	@Autowired
	private ImfTemplatePersistenceHelper imfTemplatePersistenceHelper;

	@Autowired
	private LookupValueRepository lookupValueRepository;

	@Autowired
	private LookupTypePersistenceHelper lookupTypePersistenceHelper;

	@Autowired
	private StandardMessageSpecificationRepository standardMessageSpecificationRepository;

	@Autowired
	private SchemeImfMapperService schemeImfMapperService;

	@Autowired
	private ImfStructureService imfStructureService;

	@Autowired
	private SwitchClusterPersistenceHelper switchClusterPersistenceHelper;

	@Autowired
	NewWorkflowService newWorkflowService;

	@Autowired
	ProcessorAdapterService processorAdapterService;

	@Autowired
	AdapterService adapterService;

	@Autowired
	HttpServletRequest request;

	@Autowired
	private AdapterConfigurationRepository adapterConfigurationRepository;

	public List<DtoWrapper> getMerchantList() {
		List<Merchant> merchantList = merchantPersistHelper.findByLockedAndDeleted('0', '0');
		return ObjectMapper.mapListObjects(merchantList, DtoWrapper.class);
	}

	public List<DtoWrapper> getAllMerchantList() {
		List<Merchant> merchantList = merchantPersistHelper.findByDeleted('0');
		return ObjectMapper.mapListObjects(merchantList, DtoWrapper.class);
	}

	public List<IdAndNameCodeWrapper> getMerchantWrapperList() {

		List<Object[]> merchantList = merchantPersistHelper.getIdNameAndCode();
		return GenericMapper.getIdAndNameCodeWrapperList(merchantList);
	}

	public List<IdAndCodeWrapper> getDeviceWrapperList() {

		List<Object[]> deviceList = devicePersistenceHelper.getIdAndCode();
		return GenericMapper.getIdAndCodeWrapperList(deviceList);
	}

	public List<DtoWrapper> getDeviceDtoWrapperList() {

		List<Object[]> deviceList = devicePersistenceHelper.getIdAndCode();
		return GenericMapper.getDtoWrapperListFromObjectArray(deviceList);
	}

	public List<NameAndCodeWrapper> getMerchantListCode() {
		List<Merchant> merchantList = merchantPersistHelper.findByLockedAndDeleted('0', '0');
		return ObjectMapper.mapListObjectToListDto(merchantList, NameAndCodeWrapper.class);
	}

	/**
	 * Fetch list of "MerchantInstitution" entities list
	 */

	public List<DtoWrapper> getMerchantInstitutionList() {
		List<MerchantInstitution> merchantList = institutionRepository.findByLockedAndDeleted('0', '0');
		List<DtoWrapper> dtoList = new ArrayList<>();
		if (merchantList != null) {
			merchantList.forEach(each -> {
				DtoWrapper dtoWrapper = new DtoWrapper();
				dtoWrapper.setId("" + each.getId());
				dtoWrapper.setName(each.getName());
				dtoList.add(dtoWrapper);
			});
		}

		return dtoList;
	}

	public List<DtoWrapper> getAllMerchantInstitutionList() {
		List<MerchantInstitution> merchantList = institutionRepository.findByDeleted('0');
		List<DtoWrapper> dtoList = new ArrayList<>();
		if (merchantList != null) {
			merchantList.forEach(each -> {
				DtoWrapper dtoWrapper = new DtoWrapper();
				dtoWrapper.setId("" + each.getId());
				dtoWrapper.setName(each.getName());
				dtoList.add(dtoWrapper);
			});
		}

		return dtoList;
	}

	/**
	 * Fetch list of "Institution" entities list
	 */

	public List<DtoWrapper> getInstitutionsList() {
		List<Institution> institutionList = institutionHelper.findByLockedAndDeleted('0', '0');
		return ObjectMapper.mapListObjectToListDto(institutionList, DtoWrapper.class);
	}

	public List<DtoWrapper> getLocationList() {
		List<Location> locationList = locationRepository.findByLockedAndDeleted('0', '0');
		return ObjectMapper.mapListObjectToListDto(locationList, DtoWrapper.class);
	}

	public List<DtoWrapper> getAllLocationList() {
		List<Location> locationList = locationRepository.findByDeleted('0');
		return ObjectMapper.mapListObjectToListDto(locationList, DtoWrapper.class);
	}

	public List<DeviceTypeDto> getDeviceTypeList() {
		List<DeviceType> locationList = (List<DeviceType>) deviceTypeRepository.findAll();
		return ObjectMapper.mapListObjectToListDto(locationList, DeviceTypeDto.class);
	}

	public List<DeviceDto> getDeviceList() {
		List<Object> deviceList = devicePersistenceHelper.getIdCodeAndLocked();
		return ListMapper.mapResponse(deviceList);
	}

	public List<String> getDeviceCodeListByDeviceTypeName(String deviceTypeName) {

		DeviceType deviceType = deviceTypeRepository.findByCode(deviceTypeName);
		return ListMapper.getDeviceCodeListByDeviceType(deviceType);
	}

	public List<DtoWrapper> getCurrenciesList() {
		List<Currency> currencyList = (List<Currency>) currencyRepository.findAll();
		return currencyList.stream().filter(value -> value.getActive().equals('1')).map(value -> {
			DtoWrapper dto = new DtoWrapper();
			dto.setId(String.valueOf(value.getId()));
			dto.setName(value.getCode());
			return dto;
		}).toList();
	}

	public List<DtoWrapper> getCurrenciesListByCodeAndIsocodeOnly() {
		List<Object> currencyList = currencyRepository.getCodeAndIsocodeOnly();
		List<DtoWrapper> dtoList = new ArrayList<>();
		currencyList.stream().forEach(each -> {
			Object[] object = (Object[]) each;
			DtoWrapper dtoWrapper = new DtoWrapper();
			dtoWrapper.setId((String) object[0]);
			dtoWrapper.setName((String) object[1]);
			dtoList.add(dtoWrapper);

		});
		return dtoList;
	}

	public List<DtoWrapper> getProcessingStatusList() {

		return ListMapper.getProcessingStatusList();
	}

	public List<IdAndNameWrapper> getUserList() {
		List<Object[]> userList = userRepository.getIdAndNameOnly();
		return GenericMapper.getIdNameWrapperListFromObjectArray(userList);

	}

	private Map<String, String> getCodeNameWrapperMap(List<Object> entityList) {
		return GenericMapper.getMapFromObjectList(entityList);
	}

	public List<DtoWrapper> getTransactionList() {
		return GenericMapper.getDtoWrapperListFromObjectArray(txnLogRepository.getIdAndNameList());

	}

	public List<IdAndNameWrapper> roleList() {

		List<IdAndNameWrapper> idAndNameWrapperList = new ArrayList<>();
		List<String> keycloakRoleList = getKeycloakRoles();
		int count = 1;
		if (!(CollectionUtil.isCollectionEmptyOrNull(keycloakRoleList))) {
			for (String roleName : keycloakRoleList) {
				IdAndNameWrapper wrapper = new IdAndNameWrapper();
				wrapper.setId(count);
				wrapper.setName(roleName);
				idAndNameWrapperList.add(wrapper);
				count++;
			}
		}

		return idAndNameWrapperList;
	}

	public List<FunctionOperationDto> getSubMenuList() {
		List<FunctionOperation> functionOperationList = (List<FunctionOperation>) functionOperationHelper.findAll();
		// logger.info("Find list of FunctionOperation functionOperationList:{}",
		// functionOperationList);
		List<FunctionOperationDto> functionOperationDtoList = new ArrayList<>();
		for (FunctionOperation functionOperation : functionOperationList) {
			if (functionOperation.getSubMenuFunction().getActive().equals('1')) {
				Operation operation = new Operation(functionOperation.isCreate(), functionOperation.isModify(),
						functionOperation.isView(), functionOperation.isDelete(), functionOperation.isCheck());
				FunctionOperationDto functionOperationDto = new FunctionOperationDto(
						functionOperation.getSubMenuFunction().getId(),
						functionOperation.getSubMenuFunction().getName(), operation);
				functionOperationDtoList.add(functionOperationDto);
				// logger.info("adding in FunctionOperationDtolist :{}", functionOperationDto);
			}

		}
		return functionOperationDtoList;
	}

	public List<MerchantTreeWrapper> getTree() {
		List<MerchantInstitution> merchantInstitutionList = institutionRepository.findAllByLockedAndDeleted('0', '0');
		List<MerchantTreeWrapper> merchantTreeList = new ArrayList<>();
		for (MerchantInstitution merchantInstitution : merchantInstitutionList) {
			List<Merchant> merchantList = merchantPersistHelper
					.findMerchantByMerchantInstitutionAndLockedAndDeleted(merchantInstitution, '0', '0');
			List<LocationTreeWrapper> locationTreeMapperList = new ArrayList<>();
			MerchantTreeWrapper merchantTreeWrapper = new MerchantTreeWrapper();
			merchantTreeWrapper.setId(merchantInstitution.getId());
			merchantTreeWrapper.setName(merchantInstitution.getName());
			merchantTreeWrapper.setMerchants(locationTreeMapperList);
			merchantTreeList.add(merchantTreeWrapper);
			for (Merchant merchant : merchantList) {
				List<DeviceTreeWrapper> deviceTreeMapperList = new ArrayList<>();
				List<Location> locationList = locationRepository.findLocationByMerchantAndLockedAndDeleted(merchant,
						'0', '0');
				LocationTreeWrapper locationTreeWrapper = new LocationTreeWrapper();
				locationTreeWrapper.setId(merchant.getId());
				locationTreeWrapper.setName(merchant.getName());
				locationTreeWrapper.setLocations(deviceTreeMapperList);
				locationTreeMapperList.add(locationTreeWrapper);
				for (Location location : locationList) {
					List<Device> deviceList = deviceRepo.findDeviceByLocationAndLockedAndDeleted(location, '0', '0');
					List<IdAndNameWrapper> deviceWrapper = new ArrayList<>();
					for (Device device : deviceList) {
						IdAndNameWrapper idAndNameWrapper = new IdAndNameWrapper();
						idAndNameWrapper.setId(device.getId());
						idAndNameWrapper.setName(device.getCode());
						deviceWrapper.add(idAndNameWrapper);
					}
					DeviceTreeWrapper deviceTreeWrapper = new DeviceTreeWrapper();
					deviceTreeWrapper.setId(location.getId());
					deviceTreeWrapper.setName(location.getName());
					deviceTreeWrapper.setCode(location.getCode());
					deviceTreeWrapper.setDevices(deviceWrapper);
					deviceTreeMapperList.add(deviceTreeWrapper);
				}
			}
		}

		return merchantTreeList;
	}

	public List<MerchantTreeWrapper> getListTree() {
		List<MerchantInstitution> merchantInstitutionList = institutionRepository.findAllByLockedAndDeleted('0', '0');
		List<MerchantTreeWrapper> merchantTreeList = new ArrayList<>();
		for (MerchantInstitution merchantInstitution : merchantInstitutionList) {
			List<Merchant> merchantList = merchantPersistHelper
					.findMerchantByMerchantInstitutionAndLockedAndDeleted(merchantInstitution, '0', '0');
			for (Merchant merchant : merchantList) {
				List<LocationTreeWrapper> locationTreeMapperList = new ArrayList<>();
				MerchantTreeWrapper merchantTreeWrapper = new MerchantTreeWrapper();
				merchantTreeWrapper.setId(merchant.getId());
				merchantTreeWrapper.setName(merchant.getName());
				merchantTreeWrapper.setMerchantInstitutionId(merchantInstitution.getId());
				merchantTreeWrapper.setMerchantInstitutionName(merchantInstitution.getName());
				merchantTreeWrapper.setLocations(locationTreeMapperList);
				merchantTreeList.add(merchantTreeWrapper);
				List<Location> locationList = locationRepository.findLocationByMerchantAndLockedAndDeleted(merchant,
						'0', '0');
				for (Location location : locationList) {
					List<DeviceTreeWrapper> deviceTreeMapperList = new ArrayList<>();
					LocationTreeWrapper locationTreeWrapper = new LocationTreeWrapper();
					locationTreeWrapper.setId(location.getId());
					locationTreeWrapper.setName(location.getName());
					locationTreeWrapper.setMerchantId(merchant.getId());
					locationTreeWrapper.setMerchantName(merchant.getName());
					locationTreeWrapper.setDevices(deviceTreeMapperList);
					locationTreeMapperList.add(locationTreeWrapper);
					List<Device> deviceList = deviceRepo.findDeviceByLocationAndLockedAndDeleted(location, '0', '0');
					List<IdAndNameWrapper> deviceWrapper = new ArrayList<>();
					for (Device device : deviceList) {
						IdAndNameWrapper idAndNameWrapper = new IdAndNameWrapper();
						idAndNameWrapper.setId(device.getId());
						idAndNameWrapper.setName(device.getCode());
						deviceWrapper.add(idAndNameWrapper);
					}
					DeviceTreeWrapper deviceTreeWrapper = new DeviceTreeWrapper();
					deviceTreeWrapper.setId(location.getId());// Needs to revisit
					deviceTreeWrapper.setName(location.getName());// Needs to revisit
					deviceTreeWrapper.setDevices(deviceWrapper);
					deviceTreeWrapper.setLocationId(location.getId());
					deviceTreeWrapper.setLocationName(location.getName());
					deviceTreeMapperList.add(deviceTreeWrapper);
				}
			}
		}

		return merchantTreeList;
	}

	public List<DtoWrapper> getStateListByCountry(int id) {
		Country country = countryRepository.findById(id).orElse(null);
		List<CountryState> merchantList = stateRepository.findCountryStateByCountry(country);

		List<DtoWrapper> dtoList = new ArrayList<>();
		for (CountryState state : merchantList) {
			DtoWrapper dto = new DtoWrapper();
			dto.setId(state.getId().toString());
			dto.setName(state.getStateName());
			dtoList.add(dto);
		}

		return dtoList;
	}

	public List<ServiceTypeDto> getAcquirerIdConfigList() {
		return new Converter<ServiceTypeDto>().listToObjectMapperList(
				Lists.newArrayList(acquirerIdConfigPersistenceHelper.findAll()), ServiceTypeDto.class);
	}

	public List<ServiceTypeDto> getMerchantServiceList() {
		List<ServiceTypeDto> serviceList = new ArrayList<>();
		List<LookupValueDto> lookupValueDtoList = getLookupValueByTypeName(SERVICE_TYPE);
		lookupValueDtoList.forEach(each -> {
			ServiceTypeDto service = new ServiceTypeDto(each.getId(), each.getValue());
			serviceList.add(service);
		});

		return serviceList;
	}

	public List<DtoWrapper> getAuditEntityList() {

		Set<String> auditEntityNameList = auditLogRepository.findAuditEntityNameList();
		Set<String> auditFilterList = EntityConstants.getAuditFilterList();

		Set<String> resultSet = StreamUtils.intersectionSet(auditEntityNameList, auditFilterList);
		List<DtoWrapper> dtoWrapperList = new ArrayList<>();
		for (String auditEntityName : resultSet) {
			String entityName = null;
			entityName = camelCase(auditEntityName);
			DtoWrapper dtoWrapper = new DtoWrapper();
			dtoWrapper.setId(entityName);
			dtoWrapper.setName(entityName);
			dtoWrapperList.add(dtoWrapper);
		}

		return dtoWrapperList;
	}

	public String camelCase(String str) {
		StringBuilder camelCase = new StringBuilder("");
		String parts[] = str.split("_");
		for (String part : parts) {
			String as = part.toLowerCase();
			int a = as.length();
			camelCase = camelCase.append(as.substring(0, 1).toUpperCase()).append(as.substring(1, a));
		}
		return camelCase.toString();
	}

	public List<IdAndNameStringWrapper> getOperatorList() {
		return ListMapper.getOperatorList();
	}

	public List<IdAndNameStringWrapper> getKeyList() {
		return ListMapper.getKeyList();
	}

	public List<IdAndNameStringWrapper> routingVersionList(int routingId) {
		Routing routing = new Routing();
		routing.setId(routingId);
		List<RoutingVersion> routingVersionList = routingVersionHelper.findRoutingVersionByRoutingAndStatus(routing,
				true);
		if (routingVersionList.isEmpty()) {
			List<IdAndNameStringWrapper> wrapperList = new ArrayList<>();
			IdAndNameStringWrapper wrapper = new IdAndNameStringWrapper();
			wrapperList.add(wrapper);
			return wrapperList;
		} else {
			List<IdAndNameStringWrapper> wrapperList = new ArrayList<>();
			for (RoutingVersion routingVersion : routingVersionList) {
				IdAndNameStringWrapper wrapper = new IdAndNameStringWrapper();
				if (routingVersion.getVersion() != 0) {
					wrapper.setId(routingVersion.getId().toString());
					wrapper.setName(routingVersion.getVersion().toString());
					wrapperList.add(wrapper);
				}
			}
			return wrapperList;
		}

	}

	public List<IdAndNameStringWrapper> routingServiceValue(int routingId) {
		Routing routing = routingPersistenceHelper.findById(routingId).orElse(null);
		List<IdAndNameStringWrapper> wrapperList = new ArrayList<>();
		if (routing != null) {
			IdAndNameStringWrapper wrapper = new IdAndNameStringWrapper();
			wrapper.setId(routing.getId().toString());
			wrapper.setName(routing.getRoutetypevalue());
			wrapperList.add(wrapper);
		}
		return wrapperList;
	}

	public List<IdAndNameWrapper> getRoutingList() {
		boolean flag = true;
		List<IdAndNameWrapper> idAndNameList = new ArrayList<>();
		for (Routing routing : routingPersistenceHelper.findAll()) {
			if (routing.getRoutingVersion().size() == 1 && routing.getRoutingVersion().get(0).getVersion() == 0) {
				flag = false;
			}
			if (routing.isRuleActive() && flag) {
				IdAndNameWrapper idAndNameWrapper = new IdAndNameWrapper();
				idAndNameWrapper.setId(routing.getId());
				idAndNameWrapper.setName(routing.getName());
				idAndNameList.add(idAndNameWrapper);
			}
		}
		return idAndNameList;
	}

	public List<IdAndNameCodeWrapper> getRoutingNameAndRoutetypevalueList() {
		boolean flag = true;
		List<IdAndNameCodeWrapper> idAndNameList = new ArrayList<>();
		for (Routing routing : routingPersistenceHelper.findAll()) {
			if (routing.getRoutingVersion().size() == 1 && routing.getRoutingVersion().get(0).getVersion() == 0) {
				flag = false;
			}
			if (routing.isRuleActive() && flag) {
				IdAndNameCodeWrapper idAndNameWrapper = new IdAndNameCodeWrapper();
				idAndNameWrapper.setId(routing.getId());
				idAndNameWrapper.setName(routing.getName() + "-" + routing.getRoutetypevalue() + " ("
						+ routing.getRuletype().toUpperCase() + ")");
				idAndNameWrapper.setCode(routing.getRoutetypevalue());
				idAndNameList.add(idAndNameWrapper);
			}
		}
		return idAndNameList;
	}

	public List<DtoWrapper> getScheduleStatusList() {

		return ListMapper.getScheduleStatusList();
	}

	public List<IdAndNameWrapper> getRoleList(String userId) {
		SystemUser user = userRepository.findSystemUserByEmail(userId.trim());

		if (user == null) {
			throw new UserNotFoundException(Constants.USER_NOT_FOUND, HttpStatus.UNAUTHORIZED);
		}

		List<IdAndNameWrapper> roleList = new ArrayList<>();
		logger.info("Role list for user : {}, roleList: {}", userId, roleList);
		return roleList;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.bnt.rest.service.ListService#getDestinationList()
	 */

	public List<IdAndNameWrapper> getDestinationList() {
		return new Converter<IdAndNameWrapper>().listToObjectMapperList(
				Lists.newArrayList(processorAdapterPersistenceHelper.findAll()), IdAndNameWrapper.class);

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.bnt.rest.service.ListService#getMerchantCodeAndNameList()
	 */

	public Map<String, String> getMerchantCodeAndNameMap() {
		List<Object> entityList = merchantPersistHelper.getCodeAndNameOnly();
		return getCodeNameWrapperMap(entityList);
	}

	public List<String> getCurrencyList() {
		List<Currency> merchantPage = (List<Currency>) currencyRepository.findAll();
		return merchantPage.stream().map(Currency::getCode).toList();
	}

	public static List<String> getCctiIdList() {
		return Stream.of("80", "82").toList();
	}

	public static List<String> getAccountList() {
		return Stream.of(AccoutType.values()).map(AccoutType::name).toList();
	}

	public static List<String> gettxnList() {
		return Stream.of(TransactionType.values()).map(TransactionType::name).toList();
	}

	public List<DtoWrapper> getCardList() {
		return Stream.of(CardType.values()).map(value -> {
			DtoWrapper dtoWrapper = new DtoWrapper();
			dtoWrapper.setId(value.name());
			dtoWrapper.setName(value.name());
			return dtoWrapper;
		}).toList();
	}

	public List<DtoWrapper> getNetworkStateList() {
		List<DtoWrapper> networkStateList = new ArrayList<>();
		DtoWrapper dtoWrapper = null;

		for (ConnectionStage networkType : ConnectionStage.values()) {
			dtoWrapper = new DtoWrapper();

			dtoWrapper.setId(networkType.toString());
			dtoWrapper.setName(networkType.name());
			networkStateList.add(dtoWrapper);

		}

		return networkStateList;
	}

	public Map<String, List<String>> getAllEntityGroupMap() {
		return EntityGroupEnum.getAllEntityGroupMap();
	}

	public List<String> getELFunctionOutputTypeList() {
		return Arrays.asList("Integer", "String", "Boolean", "Float", DOUBLE, "Operator");
	}

	public List<ImfTemplateDto> getImfTemplateList() {
		List<ImfTemplate> imfTemplateList = (List<ImfTemplate>) imfTemplatePersistenceHelper.findAll();
		return ObjectMapper.mapListObjectToListDto(imfTemplateList, ImfTemplateDto.class);
	}

	public List<LookupValueDto> getMessageStandard() {
		List<LookupValueDto> lookupValueDtoList = new ArrayList<>();
		List<LookupValue> lookupValueList;
		lookupValueList = standardMessageSpecificationRepository.getAllMessageStandard();
		if (lookupValueList != null && !lookupValueList.isEmpty()) {
			List<LookupValueDto> tempList = ObjectMapper.mapListObjectToListDto(lookupValueList, LookupValueDto.class);
			for (LookupValueDto each : tempList) {
				if ("Message_Standard".equalsIgnoreCase(each.getLookupType().getName())) {
					lookupValueDtoList.add(each);
				}
			}
		}
		return lookupValueDtoList;
	}

	public List<LookupValueDto> getMessageProtocol() {
		List<LookupValue> lookupValueList;
		lookupValueList = standardMessageSpecificationRepository.getAllMessageProtocol();
		return ObjectMapper.mapListObjectToListDto(lookupValueList, LookupValueDto.class);
	}

	public List<LookupValueDto> getLookupValueByTypeName(String typeName) {
		List<LookupValue> lookupValueList = lookupValueRepository.getLookUpValueByType(typeName);
		return ObjectMapper.mapListObjectToListDto(lookupValueList, LookupValueDto.class);
	}

	public List<IdAndCodeWrapperString> fieldListMessageSpecification(Integer messageStandardId) {
		return schemeImfMapperService.fieldListMessageSpecification(messageStandardId);
	}

	public List<String> getElExpressionExpTypeList() {
		return Arrays.asList("el_expression");
	}

	public List<String> getElExpressionFeatureTypeList() {
		return Arrays.asList("validation", "transform");
	}

	public List<String> getElExpressionSubTypeList() {
		return Arrays.asList("Select sub type", "format", "exclude");
	}

	public List<String> getImfFieldTypeList() {
		return Arrays.asList(StreamUtils.getEnumValues(DataType.class, DataType::name));

	}

	public ServiceConditionDto getRuleConditionInputFields() {
		ServiceConditionDto dto = new ServiceConditionDto();
		List<LookupValueDto> list = getLookupValueByTypeName(SERVICE_TYPE);
		dto.setService(list.stream().map(LookupValueDto::getValue).toList());
		dto.setFields(getInputFields());
		return dto;
	}

	/**
	 * getInputFields()
	 * 
	 * @return
	 */

	public List<Fields> getInputFields() {
		List<Fields> finalList = new ArrayList<>();
		List<Fields> messageContextList = getMessageContextFields();
		List<Fields> messageExchangeList = getMessageExchangeFields();
		List<Fields> imfList = getIMFFields();

		finalList.addAll(messageContextList);
		finalList.addAll(messageExchangeList);
		finalList.addAll(imfList);
		return finalList;
	}

	private List<Fields> getIMFFields() {
		ImfStructureDto imfStructureDto = imfStructureService.findMaxVersionImfStructure();
		List<ImfFields> listImfFields = AdapterToolKitImfMapper.getFieldsList(imfStructureDto.getImf());
		return transformImfFields(listImfFields);
	}

	private List<Fields> transformImfFields(List<ImfFields> listImfFields) {
		List<Fields> listFields = new ArrayList<>();
		for (ImfFields imfField : listImfFields) {
			Fields field = new Fields();
			field.setName("${message_exchange[GATEWAY_SERVICE].request_message[" + imfField.getName() + "]}");
			if (StringUtil.isNotNullOrBlank(imfField.getAlias())) {
				field.setLabel(imfField.getAlias());
			} else {
				String alliasName = imfField.getName();
				alliasName = alliasName.substring(alliasName.lastIndexOf(".") + 1, alliasName.length());
				field.setLabel(StringUtil.capitalizeWord(alliasName));
			}
			field.setDatatype(imfField.getType().toLowerCase());
			field.setUseCase("3");
			field.setOperator(getOperatorsList(imfField.getType().toLowerCase()));
			field.setToolTip("imf." + imfField.getName());
			listFields.add(field);
		}

		return listFields;
	}

	public List<Operator> getOperatorsList(String operator) {
		if (STRING.equalsIgnoreCase(operator)) {
			return listOperators(listStringOperators.split(","));
		} else if (INT.equalsIgnoreCase(operator)) {
			return listOperators(listIntOperators.split(","));
		} else if (NUMBER.equalsIgnoreCase(operator)) {
			return listOperators(listIntOperators.split(","));
		} else if (DOUBLE.equalsIgnoreCase(operator)) {
			return listOperators(listIntOperators.split(","));
		} else if (DATE.equalsIgnoreCase(operator)) {
			return listOperators(listIntOperators.split(","));
		} else {
			return listOperators("Equal|equal|value".split(","));
		}
	}

	private List<Operator> listOperators(String[] oprArray) {
		List<Operator> list = new ArrayList<>();
		for (String opr : oprArray) {
			Operator operator = new Operator();
			String[] array = opr.split("\\|");
			operator.setText(array[0]);
			operator.setValue(array[1]);
			operator.setKey(array[2]);
			list.add(operator);
		}
		return list;
	}

	/**
	 * transaction_type, payment_method, internal_processing_code
	 * 
	 * @return
	 */
	private List<Fields> getMessageContextFields() {
		List<Fields> listFields = new ArrayList<>();
		String[] fieldsArray = msgContextFields.split(",");
		for (String field : fieldsArray) {
			Fields object = getMessageField(field, "1");
			if (object != null)
				object.setToolTip("message.context." + object.getLabel());
			listFields.add(object);
		}
		return listFields;
	}

	/**
	 * adapter_id, internal_processing_code
	 * 
	 * @return
	 */
	private List<Fields> getMessageExchangeFields() {
		List<Fields> listFields = new ArrayList<>();
		String[] fieldsArray = msgExchangeFields.split(",");
		for (String field : fieldsArray) {
			Fields object = getMessageField(field, "2");
			if (object != null)
				object.setToolTip("message.exchange." + object.getLabel());
			listFields.add(object);
		}
		return listFields;
	}

	private Fields getMessageField(String fieldValueArray, String useCase) {
		String[] fieldsArray = fieldValueArray.split("\\|");
		if (useCase.equals("2")) {
			Fields fields = new Fields();
			fields.setUseCase(useCase);
			fields.setName("${message_exchange[GATEWAY_SERVICE]." + fieldsArray[0] + "}");
			fields.setLabel(fieldsArray[1]);
			fields.setDatatype(("safTransaction".equalsIgnoreCase(fieldsArray[0])
					|| "is_saf_processed".equalsIgnoreCase(fieldsArray[0])) ? "boolean" : STRING);
			fields.setOperator(getOperatorsList(fields.getDatatype()));
			fields.setData(getData(fieldsArray[0]));
			return fields;
		} else if (useCase.equals("1")) {
			Fields fields = new Fields();
			fields.setUseCase(useCase);
			fields.setName("${" + fieldsArray[0] + "}");
			fields.setLabel(fieldsArray[1]);
			fields.setDatatype(STRING);
			fields.setOperator(getOperatorsList(STRING));
			fields.setData(getData(fieldsArray[0]));
			return fields;
		} else {
			return null;
		}
	}

	/**
	 * adapter_id,internal_processing_code,transaction_type,payment_method
	 * 
	 * @param fieldName
	 * @return
	 */

	public List<String> getData(String fieldName) {
		List<String> listData = new ArrayList<>();
		if (fieldName.equalsIgnoreCase("adapter_id")) {
			List<AdapterConfiguration> configList = adapterConfigurationRepository
					.findAllVersionedAdapterConfiguration();
			if (configList != null && !configList.isEmpty()) {
				List<String> data = new ArrayList<>();
				configList.forEach(each -> data.add("" + each.getId()));
				listData = data;
			}
		} else if (fieldName.equalsIgnoreCase(INTERNAL_PROCESSING_CODE)) {
			List<LookupValueDto> list = getLookupValueByTypeName("INTERNAL_PROCESSING_CODE");
			listData = list.stream().map(LookupValueDto::getValue).toList();
		} else if (fieldName.equalsIgnoreCase("transaction_type")) {
			List<LookupValueDto> list = getLookupValueByTypeName("TRANSACTION_TYPE");
			listData = list.stream().map(LookupValueDto::getValue).toList();
		} else if (fieldName.equalsIgnoreCase("payment_method")) {
			List<LookupValueDto> list = getLookupValueByTypeName("PAYMENT_METHOD");
			listData = list.stream().map(LookupValueDto::getValue).toList();
		}
		return listData;
	}

	public WorkFlows getFinalJson() {
		return null;
	}

	public List<LookuptypeUi> getLookupTypeUiNameValueMap() {
		logger.info("inside getLookupTypeNameValueMap");
		List<LookuptypeUi> loookuptypeList = new ArrayList<>();
		Map<String, ArrayList<LookupValueUi>> mapLookupTypeValue = new HashMap<>();
		List<LookupValue> allLookupValue = (List<LookupValue>) lookupValueRepository.getLookUpValueAll();
		ArrayList<LookupValueUi> valueList = null;
		String looupTypeName = "";
		LookupValueUi lookupValueUi = null;
		for (LookupValue lookupValue : allLookupValue) {
			looupTypeName = lookupValue.getLookupType().getName();
			lookupValueUi = new LookupValueUi();
			lookupValueUi.setLookupvalue(lookupValue.getValue());

			valueList = mapLookupTypeValue.get(looupTypeName);
			if (valueList == null || valueList.isEmpty()) {
				valueList = new ArrayList<>();
			}
			valueList.add(lookupValueUi);
			mapLookupTypeValue.put(looupTypeName, valueList);
		}

		List<LookupType> allLookupType = (List<LookupType>) lookupTypePersistenceHelper.findAll();
		LookuptypeUi lookuptypeUi = null;
		for (LookupType lookupType : allLookupType) {
			lookuptypeUi = new LookuptypeUi();
			lookuptypeUi.setLookuptype(lookupType.getName());
			lookuptypeUi.setValues(mapLookupTypeValue.get(lookuptypeUi.getLookuptype()));
			loookuptypeList.add(lookuptypeUi);
		}
		return loookuptypeList;
	}

	public List<String> getSchemeList() {
		return schemePersistenceHelper.getBrandList();
	}

	public Map<String, List<Operator>> getOperatorTypeList() {
		Map<String, List<Operator>> mapOperator = new HashMap<>();
		mapOperator.put("stringOperators", getOperatorsList(STRING));
		mapOperator.put("intOperators", getOperatorsList(INT));
		return mapOperator;
	}

	public List<DtoWrapper> getSwitchClusterList() {
		return GenericMapper.getDtoWrapperListFromObjectArray(switchClusterPersistenceHelper.getIdAndKeyActive());
	}

	public Map<String, List<IdAndNameStringWrapper>> populateWorkflowruleDestinations() {
		Map<String, List<IdAndNameStringWrapper>> destinationMap = new HashMap<>();
		List<IdAndNameWrapper> workFlowIdNameList = newWorkflowService.getNameAndWorkFlowId();
		List<IdAndNameStringWrapper> processorIdNameList = processorAdapterService.findAll();
		List<IdAndNameStringWrapper> workFlowIdNameWrapperList = new ArrayList<>();
		if (workFlowIdNameList != null) {
			workFlowIdNameList.forEach(each -> {
				IdAndNameStringWrapper idAndNameWrapper = new IdAndNameStringWrapper();
				idAndNameWrapper.setId(each.getId().toString());
				idAndNameWrapper.setName(each.getName());
				workFlowIdNameWrapperList.add(idAndNameWrapper);

			});
		}
		destinationMap.put("workflow", workFlowIdNameWrapperList);
		destinationMap.put("destination", processorIdNameList);
		return destinationMap;
	}

	public List<IdAndNameWrapper> getL3ListForProcessorAdapter() {
		List<IdAndNameWrapper> idNameList = new ArrayList<>();
		List<AdapterDto> adapterDtoList = adapterService.getL3ListForProcessorAdapter();
		if (adapterDtoList != null) {
			adapterDtoList.forEach(each -> {
				IdAndNameWrapper idAndNameWrapper = new IdAndNameWrapper();
				idAndNameWrapper.setId(each.getId());
				idAndNameWrapper.setName(each.getName());
				idNameList.add(idAndNameWrapper);

			});
		}
		return idNameList;
	}

	public List<String> getRoles() {
		List<Role> roleList = (List<Role>) roleRepository.findAll();
		return roleList.stream().map(value -> value.getName()).toList();
	}

	public String getAttribute() {
		ResponseEntity<String> response = null;
		String url = sharedUrl + "/realms/bnt/protocol/openid-connect/userinfo";
		try {
			response = getResponse(url, RippsUtility.getToken(request));
		} catch (Exception e) {
			response = getResponse(url, getToken());
		}
		com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
		UserAttribute userAttribute = null;
		try {
			userAttribute = mapper.readValue(response.getBody(), UserAttribute.class);
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return userAttribute.getRegion();
	}

	public List<String> getKeycloakRoles() {
		List<String> roleList = getRoles();
		ResponseEntity<String> response = null;
		try {
			response = getResponse(roleUrl, RippsUtility.getToken(request));
		} catch (Exception e) {
			response = getResponse(roleUrl, getToken());
		}

		List<String> filterRoleList = new ArrayList<>();
		com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
		try {
			filterRoleList = filterKeycloakRoleApiResponse(roleList, response, mapper);
			if (CollectionUtil.isCollectionEmptyOrNull(filterRoleList)) {
				logger.info("Role list is empty in role api url from keycloak ");
			}
			logger.info("Role list retrieving from keycloak is filterRoleList:{}", filterRoleList);
		} catch (IOException e) {
			logger.error("IO exception occured while invoking keycloack  role API ", e);
		} catch (Exception e) {
			logger.error("No role to be assigned in the system to assign permissions", e);
		}
		return filterRoleList;

	}

	private List<String> filterKeycloakRoleApiResponse(List<String> roleList, ResponseEntity<String> response,
			com.fasterxml.jackson.databind.ObjectMapper mapper) throws IOException {
		return Stream.of(mapper.readValue(response.getBody(), KeyclockRole[].class))
				.filter(value -> value.getName().contains(clientId))
				.filter(value -> !roleList
						.contains(value.getName().substring(clientId.length() + 1, value.getName().length())))
				.map(value -> value.getName().substring(clientId.length() + 1, value.getName().length())).toList();
	}

	public ServiceConditionDto getReverseConditionDropDownList() {
		ServiceConditionDto dto = new ServiceConditionDto();
		List<LookupValueDto> list = getLookupValueByTypeName(SERVICE_TYPE);
		dto.setService(list.stream().map(LookupValueDto::getValue).toList());
		List<Fields> fieldsList = new ArrayList<>();

		Fields field1 = new Fields();
		field1.setUseCase("1");
		field1.setName("${transaction_type}");
		field1.setLabel("TransactionType");
		field1.setDatatype(STRING);
		field1.setOperator(getOperatorsList(STRING));
		field1.setData(getData("transaction_type"));
		field1.setToolTip("TransactionType");

		Fields field2 = new Fields();
		field2.setUseCase("2");
		field2.setName("${message_exchange.[SELECTED_SERVICE].internal_processing_code}");
		field2.setLabel("Message Exchange IPC");
		field2.setDatatype(STRING);
		field2.setOperator(getOperatorsList(STRING));
		field2.setData(getData(INTERNAL_PROCESSING_CODE));
		field2.setToolTip("message.exchange.ipc");

		Fields field3 = new Fields();
		field3.setUseCase("3");
		field3.setName("${message_exchange.[SELECTED_SERVICE].SELECTED_TYPE_message.[internal_processing_code]}");
		field3.setLabel("IMF IPC");
		field3.setDatatype(STRING);
		field3.setOperator(getOperatorsList(STRING));
		field3.setData(getData(INTERNAL_PROCESSING_CODE));
		field3.setToolTip("imf.ipc");

		fieldsList.add(field1);
		fieldsList.add(field2);
		fieldsList.add(field3);

		dto.setFields(fieldsList);
		return dto;
	}

	public List<IdAndCodeAndPedIdWrapper> getDeviceCodeAndPedIdList() {
		List<IdAndCodeAndPedIdWrapper> idAndNameList = new ArrayList<>();
		for (Device device : devicePersistenceHelper.findAll()) {
			IdAndCodeAndPedIdWrapper idAndCodeAndPedIdWrapper = new IdAndCodeAndPedIdWrapper();
			idAndCodeAndPedIdWrapper.setId(device.getId());
			idAndCodeAndPedIdWrapper.setCode(device.getCode());
			idAndCodeAndPedIdWrapper.setPedId(device.getPedId());
			idAndNameList.add(idAndCodeAndPedIdWrapper);
		}
		return idAndNameList;
	}

	private ResponseEntity<String> getResponse(String url, String token) {
		HttpHeaders headers = new HttpHeaders();
		headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
		headers.add("Authorization", "Bearer " + token);
		ResponseEntity<String> response = null;
		RestTemplate restTemplate = ssl();
		if (Boolean.TRUE.equals(Boolean.valueOf(isKeyCloakOverSSL) && null != restTemplate)) {
			logger.info("keycloak connection over SSL.");
			response = restTemplate.exchange(url.trim(), HttpMethod.GET, new HttpEntity<>("parameters", headers),
					String.class);
		} else {
			logger.info("keycloak connection over non SSL.");
			response = new RestTemplate().exchange(url.trim(), HttpMethod.GET, new HttpEntity<>("parameters", headers),
					String.class);
			return response;
		}

		return response;
	}

	public String getToken() {
		String tokenUrl = sharedUrl.trim() + "/realms/" + realm.trim() + "/protocol/openid-connect/token";
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
		LinkedMultiValueMap<String, String> map = new LinkedMultiValueMap<>();
		map.add("client_id", clientId);
		map.add("scope", "openid");
		map.add("grant_type", "refresh_token");
		map.add("refresh_token", request.getHeader("refreshToken"));

		HttpEntity<LinkedMultiValueMap<String, String>> httprequest = new HttpEntity<>(map, headers);
		ResponseEntity<String> response = null;

		RestTemplate restTemplate = ssl();
		if (Boolean.TRUE.equals(Boolean.valueOf(isKeyCloakOverSSL)) && null != restTemplate) {
			response = restTemplate.postForEntity(tokenUrl, httprequest, String.class);
		} else {
			response = new RestTemplate().postForEntity(tokenUrl, httprequest, String.class);
		}

		com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();

		try {
			KeycloakTokenResponse user = mapper.readValue(response.getBody(), KeycloakTokenResponse.class);
			return user.getAccess_token();
		} catch (JsonParseException e) {
			logger.error("IO exception occured while invoking  keycloack role API ", e);
		} catch (JsonMappingException e) {
			logger.error("IO exception occured while  invoking keycloack role API ", e);
		} catch (IOException e) {
			logger.error("IO exception occured while invoking keycloack role API  ", e);
		}
		return null;

	}

	public KeycloakTokenResponse getRefreshTokenCall(String refreshToken) {
		try {
			String tokenUrl = sharedUrl.trim() + "/realms/" + realm.trim() + "/protocol/openid-connect/token";
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
			LinkedMultiValueMap<String, String> map = new LinkedMultiValueMap<String, String>();
			map.add("client_id", clientId);
			map.add("scope", "openid");
			map.add("grant_type", "refresh_token");
			map.add("refresh_token", request.getHeader("refreshToken"));

			HttpEntity<LinkedMultiValueMap<String, String>> httprequest = new HttpEntity<LinkedMultiValueMap<String, String>>(
					map, headers);

			ResponseEntity<String> response = null;

			if (Boolean.TRUE.equals(Boolean.valueOf(isKeyCloakOverSSL))) {
				response = ssl().postForEntity(tokenUrl, httprequest, String.class);
			} else {
				response = new RestTemplate().postForEntity(tokenUrl, httprequest, String.class);
			}

			com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();

			try {
				KeycloakTokenResponse user = mapper.readValue(response.getBody(), KeycloakTokenResponse.class);
				return user;
			} catch (JsonParseException e) {
				logger.error("IO exception occured while invoking keycloack role API ", e);
			} catch (JsonMappingException e) {
				logger.error("IO exception occured while invoking keycloack role API ", e);
			} catch (IOException e) {
				logger.error("IO exception occured while invoking keycloack role API ", e);
			}
		} catch (Exception e) {
			logger.error("getToken : ", e);
			return null;
		}
		return null;
	}

	private RestTemplate ssl() {
		try {
			logger.info("keycloak ssl() method called for SSL connection.");
			String keyStoreType = KeyStore.getDefaultType();
			Path trustStorePath = Paths.get(truststore);
			KeyStore trustStore = KeyStore.getInstance(keyStoreType);
			try (InputStream trustStoreStream = Files.newInputStream(trustStorePath, StandardOpenOption.READ)) {
				trustStore.load(trustStoreStream, keystorePassword.toCharArray());
			}
			String trustManagerFactoryAlgorithm = TrustManagerFactory.getDefaultAlgorithm();
			TrustManagerFactory trustManagerFactory = TrustManagerFactory.getInstance(trustManagerFactoryAlgorithm);
			trustManagerFactory.init(trustStore);

			Path path = Paths.get(identityPath);
			KeyStore identity = KeyStore.getInstance(keyStoreType);
			try (InputStream identityStream = Files.newInputStream(path, StandardOpenOption.READ)) {
				identity.load(identityStream, keystorePassword.toCharArray());
			}
			String keyManagerFactoryAlgorithm = KeyManagerFactory.getDefaultAlgorithm();
			KeyManagerFactory keyManagerFactory = KeyManagerFactory.getInstance(keyManagerFactoryAlgorithm);
			keyManagerFactory.init(identity, keystorePassword.toCharArray());

			SSLContext sslContext = SSLContext.getInstance(tlsVersion);
			sslContext.init(keyManagerFactory.getKeyManagers(), trustManagerFactory.getTrustManagers(), null);

			SSLConnectionSocketFactory socketFactory = new SSLConnectionSocketFactory(sslContext,
					NoopHostnameVerifier.INSTANCE);
			HttpClientConnectionManager connectionManager = PoolingHttpClientConnectionManagerBuilder.create()
					.setSSLSocketFactory(socketFactory).build();
			CloseableHttpClient httpClient = HttpClients.custom().setConnectionManager(connectionManager).build();

			HttpComponentsClientHttpRequestFactory requestFactory = new HttpComponentsClientHttpRequestFactory();
			requestFactory.setHttpClient(httpClient);
			return new RestTemplate(requestFactory);

		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new RestTemplate();
		}
	}

	public boolean signOut(String userId, String token) {
		try {
			String validateUrl = sharedUrl.trim() + "/admin/realms/bnt/users/" + userId.trim() + "/logout";
			HttpHeaders headers = new HttpHeaders();
			headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
			headers.add("Authorization", "Bearer " + token);
			LinkedMultiValueMap<String, String> map = new LinkedMultiValueMap<>();
			HttpEntity<LinkedMultiValueMap<String, String>> httprequest = new HttpEntity<>(map, headers);
			ResponseEntity<String> response = null;
			if (Boolean.TRUE.equals(Boolean.valueOf(isKeyCloakOverSSL))) {
				response = ssl().postForEntity(validateUrl, httprequest, String.class);
			} else {
				response = new RestTemplate().postForEntity(validateUrl, httprequest, String.class);
			}
			if (response.getStatusCode() == HttpStatus.NO_CONTENT) {
				return true;
			} else {
				// throw new RippsAdminRestException("UNAUTHORISED_USER",
				// response.getStatusCode());
				throw new TokenException("Token expired", HttpStatus.OK);
			}
		} catch (NullPointerException e) {
			logger.info("User id is null");
			return false;
		} catch (Exception e) {
			logger.info(e.getMessage(), e);
			throw new TokenException("Token expired", HttpStatus.OK);
		}

	}

	public List<Map<String, String>> getListRole() {
		List<Object[]> listRole = roleRepository.findListRole();
		return listRole.stream().map(value -> {
			Map<String, String> map = new HashMap<>();
			map.put("id", value[0].toString());
			map.put("name", value[1].toString());
			return map;
		}).toList();
	}

}
