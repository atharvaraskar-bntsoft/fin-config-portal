package com.bnt.rest.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bnt.bswitch.shared.lib.entities.CollectionUtil;
import com.bnt.common.HttpCommons;
import com.bnt.common.ResponseEntityData;
import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.RippsUtility;
import com.bnt.constant.Constants;
import com.bnt.constant.RippsRestConstant;
import com.bnt.rest.dto.DeviceDto;
import com.bnt.rest.dto.DeviceTypeDto;
import com.bnt.rest.dto.DtoWrapper;
import com.bnt.rest.dto.IdAndNameStringWrapper;
import com.bnt.rest.dto.ImfTemplateDto;
import com.bnt.rest.dto.LookupValueDto;
import com.bnt.rest.dto.MerchantDto;
import com.bnt.rest.dto.NameAndCodeWrapper;
import com.bnt.rest.service.AcquirerConfigServiceRest;
import com.bnt.rest.service.AdapterDataEnrichmentService;
import com.bnt.rest.service.AdapterToolKitTransformService;
import com.bnt.rest.service.LookupValueService;
import com.bnt.rest.service.MerchantServiceRest;
import com.bnt.rest.service.ProcessorAdapterService;
import com.bnt.rest.service.impl.AuthSessionService;
import com.bnt.rest.service.impl.ListService;
import com.bnt.rest.wrapper.dto.FunctionOperationDto;
import com.bnt.rest.wrapper.dto.IdAndNameCodeWrapper;
import com.bnt.rest.wrapper.dto.IdAndNameWrapper;
import com.bnt.rest.wrapper.dto.MerchantTreeWrapper;
import com.bnt.rest.wrapper.dto.ServiceConditionDto;
import com.bnt.rest.wrapper.dto.ServiceTypeDto;
import com.bnt.service.mapper.RoutingMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "${crossOriginUrl}")

public class ListController {

	public static final String TYPE_LIST = "type-list";

	public static final String IMF_FIELD = "ImfField";

	public static final String FIND_IMF_FIELD_LIST_JSON = "Find Imf-field-list JSON";

	private static final Logger logger = LogManager.getLogger(ListController.class);

	@Autowired
	private ListService listService;

	@Autowired
	private LookupValueService lookUpValueService;

	@Autowired
	ProcessorAdapterService processorAdapterService;

	@Autowired
	private MerchantServiceRest merchantServiceRest;

	@Autowired
	private ProcessorAdapterService paService;

	@Autowired
	private AcquirerConfigServiceRest acqService;

	@Autowired
	private AdapterDataEnrichmentService adapterDataEnrichmentService;

	@Autowired
	private AdapterToolKitTransformService adapterToolKitTransformService;

	@Autowired
	private AuthSessionService authSessionService;

	@Autowired
	HttpServletRequest request;

	@GetMapping(value = "merchant-list")
	public ResponseEntity<Map<String, Object>> getMerchantList(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@RequestParam(name = "institution", defaultValue = "default") String institution) {
		logger.info("Find all Invalid Messages");
		List<DtoWrapper> merchantList = null;
		merchantList = listService.getMerchantList();

		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find Merchant list");
		responseEntityData.setData(merchantList);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "institutions-list")
	public ResponseEntity<Map<String, Object>> getInstitutionsList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		List<DtoWrapper> institutionsList = listService.getInstitutionsList();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Institution list");
		responseEntityData.setData(institutionsList);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "merchant-service-list")
	public ResponseEntity<Map<String, Object>> getMerchantServiceList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		Map<String, Object> map = new HashMap<>();
		map.put("label", "Services");
		map.put("options", listService.getMerchantServiceList());
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setData(map);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "institution-list")
	public ResponseEntity<Map<String, Object>> getInstitutionList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		List<DtoWrapper> merchantList = listService.getMerchantInstitutionList();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find Institution list");
		responseEntityData.setData(merchantList);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "country-states-list/{id}")
	public ResponseEntity<Map<String, Object>> getCountryStateListById(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("id") int id) {
		List<DtoWrapper> merchantList = listService.getStateListByCountry(id);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		Map<String, Object> map = new HashMap<>();
		map.put("countryStateList", merchantList);
		responseEntityData.setMessage("Find Institution list");
		responseEntityData.setData(map);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "location-list")
	public ResponseEntity<Map<String, Object>> getLocationList(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@RequestParam(name = "institution", defaultValue = "default") String institution,
			@RequestParam(name = "merchant", defaultValue = "default") String merchant) {
		List<DtoWrapper> merchantList = null;

		merchantList = listService.getLocationList();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find Location list");
		responseEntityData.setData(merchantList);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "device-types-list")
	public ResponseEntity<Map<String, Object>> getDeviceTypeList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		List<DeviceTypeDto> deviceTypeList = listService.getDeviceTypeList();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find Device list");
		responseEntityData.setData(deviceTypeList);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "device-list")
	public ResponseEntity<Map<String, Object>> getDeviceList(@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		List<DeviceDto> deviceTypeList = listService.getDeviceList();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find Device list");
		responseEntityData.setData(deviceTypeList);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "currency-list")
	public ResponseEntity<Map<String, Object>> getCurrenciesList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		List<DtoWrapper> currencyList = listService.getCurrenciesList();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("All currencies");
		responseEntityData.setData(currencyList);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "codeandiso-currency-list")
	public ResponseEntity<Map<String, Object>> getCurrenciesListByCodeAndIsocodeOnly(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		List<DtoWrapper> currencyList = listService.getCurrenciesListByCodeAndIsocodeOnly();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("All Currencies By Code and Isocode");
		responseEntityData.setData(currencyList);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "users-list")
	public ResponseEntity<Map<String, Object>> getUserList(@RequestHeader(value = "X-Auth-Token") String xAuthToken) {

		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find User list");
		responseEntityData.setData(listService.getUserList());
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "card-type-list")
	public ResponseEntity<Map<String, Object>> getAllCardList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {

		List<DtoWrapper> merchantList = listService.getCardList();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find card list");
		responseEntityData.setData(merchantList);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);

	}

	@GetMapping(value = "approved-list")
	public ResponseEntity<Map<String, Object>> getProcessingStatusList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {

		List<DtoWrapper> merchantList = listService.getProcessingStatusList();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find processing status list");
		responseEntityData.setData(merchantList);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "transaction-list")
	public ResponseEntity<Map<String, Object>> getTransactionList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {

		List<DtoWrapper> transactionList = listService.getTransactionList();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find transaction status list");
		responseEntityData.setData(transactionList);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "transaction-type-list")
	public ResponseEntity<Map<String, Object>> getTransactionTypeList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		List<String> transactionTypeList = lookUpValueService.getTxnTypes();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find Transaction Type  list");
		responseEntityData.setData(transactionTypeList);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "role-list")
	public ResponseEntity<Map<String, Object>> getRoleList(@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		List<IdAndNameWrapper> roleList = listService.roleList();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		if (CollectionUtil.isCollectionEmptyOrNull(roleList)) {
			responseEntityData.setMessage("No role to be assigned in the system to assign permissions");
		} else {
			responseEntityData.setMessage("Role list");
			responseEntityData.setData(roleList);
		}

		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "list-role")
	public ResponseEntity<Map<String, Object>> getListRole() {
		try {
			List<Map<String, String>> listRole = listService.getListRole();
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find all Role List");
			responseEntityData.setData(listRole);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		}

	}

	@GetMapping(value = "functions-list")
	public ResponseEntity<Map<String, Object>> getSubMenuList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		List<FunctionOperationDto> subMenuList = listService.getSubMenuList();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setData(subMenuList);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "scheme-list")
	public ResponseEntity<Map<String, Object>> getSchemeList(@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		List<String> list = listService.getSchemeList();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Scheme list");
		responseEntityData.setData(list);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "acquirer-id-config-list")
	public ResponseEntity<Map<String, Object>> getacquirerIdConfigList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		List<ServiceTypeDto> list = listService.getAcquirerIdConfigList();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Scheme list");
		responseEntityData.setData(list);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "object-types-list")
	public ResponseEntity<Map<String, Object>> getAuditEntityList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {

		List<DtoWrapper> list = listService.getAuditEntityList();
		ResponseEntityData responseEntityData = new ResponseEntityData();

		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Audit Entity list");
		responseEntityData.setData(list);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);

	}

	@GetMapping(value = "/institutions-tree-list")
	public ResponseEntity<Map<String, Object>> getTree(@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		List<MerchantTreeWrapper> treeWrapperList = listService.getTree();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("get inst list 4");
		responseEntityData.setData(treeWrapperList);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "/institutions-list-tree")
	public ResponseEntity<Map<String, Object>> getListTree(@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		List<MerchantTreeWrapper> treeWrapperList = listService.getListTree();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("get inst list 4");
		responseEntityData.setData(treeWrapperList);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "/conditional-operater-list")
	public ResponseEntity<Map<String, Object>> populateConditionalOperater(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, String id1) {
		List<IdAndNameStringWrapper> operatorList = listService.getOperatorList();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setData(operatorList);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "/destinations")
	public ResponseEntity<Map<String, Object>> populateDestination(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setData(processorAdapterService.findAll());
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);

	}

	@GetMapping(value = "/workflow-rule-destinations")
	public ResponseEntity<Map<String, Object>> populateWorkflowruleDestinations(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Get workflow-destinations List");
		responseEntityData.setData(listService.populateWorkflowruleDestinations());
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);

	}

	@GetMapping(value = "/conditions")
	public ResponseEntity<Map<String, Object>> populateSelectionCriteria(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setData(listService.getKeyList());
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "/rule-message-types")
	public ResponseEntity<Map<String, Object>> populateSelectionValueAndconditionalOperator(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@RequestParam(name = "conditionID", defaultValue = "messageType") String id) {
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find all SelectionValueAndconditionalOperator");
		Map<String, Object> data = new HashMap<>();

		List<IdAndNameStringWrapper> conditionalOperatorList = null;
		List<IdAndNameStringWrapper> selectionValueList = null;
		if (id.equals("transactionAmount")) {
			conditionalOperatorList = RoutingMapper.populateTxnAmountConditionalOperater();
		} else if (id.equals("cardPrefix")) {
			conditionalOperatorList = RoutingMapper.populateBingConditionalOperater();
		} else {
			conditionalOperatorList = RoutingMapper.populateConditionalOperater();
		}

		if (id.equalsIgnoreCase("cardType")) {
			selectionValueList = RoutingMapper.getCardList();
		} else if (id.equalsIgnoreCase("messageType")) {
			selectionValueList = RoutingMapper.gettxnList();
		} else if (id.equalsIgnoreCase("merchantCategoryCode")) {
			selectionValueList = merchantCategoryCodeList();
		} else if (id.equalsIgnoreCase("posEntryMode")) {
			selectionValueList = RoutingMapper.posEntryModeList();
		} else if (id.equalsIgnoreCase("merchantId")) {
			selectionValueList = merchantIdList();
		} else if (id.equalsIgnoreCase("tokenType")) {
			selectionValueList = RoutingMapper.getTokenTypeList();
		} else if (id.equalsIgnoreCase("accountType")) {
			selectionValueList = RoutingMapper.getAccountList();
		} else if (id.equalsIgnoreCase("cctiId")) {
			selectionValueList = RoutingMapper.getCctiIdList();
		} else {
			selectionValueList = null;
		}

		data.put("operators", conditionalOperatorList);
		data.put("selectValues", selectionValueList);
		responseEntityData.setData(data);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@SuppressWarnings("unchecked")
	public List<IdAndNameStringWrapper> merchantIdList() {

		List<IdAndNameStringWrapper> merchantList = new ArrayList<>();
		IdAndNameStringWrapper cardTypeDto = null;
		ResponseWrapper pageJPAData = merchantServiceRest.findAllMerchants();
		List<MerchantDto> merchantDtoList = (List<MerchantDto>) pageJPAData.getContent();
		for (MerchantDto merchantDto : merchantDtoList) {
			cardTypeDto = new IdAndNameStringWrapper();
			cardTypeDto.setId(merchantDto.getCode());
			cardTypeDto.setName(merchantDto.getCode());
			merchantList.add(cardTypeDto);
		}
		return merchantList;
	}

	public List<IdAndNameStringWrapper> merchantCategoryCodeList() {

		List<IdAndNameStringWrapper> merchantList = new ArrayList<>();
		IdAndNameStringWrapper cardTypeDto = null;
		List<DtoWrapper> merchantDataList = merchantServiceRest.getCategoryCode();
		for (DtoWrapper merchantDto : merchantDataList) {
			cardTypeDto = new IdAndNameStringWrapper();
			cardTypeDto.setId(merchantDto.getName());
			cardTypeDto.setName(merchantDto.getName());
			merchantList.add(cardTypeDto);
		}
		return merchantList;

	}

	@GetMapping(value = "/routing-version-list/{id}")
	public ResponseEntity<Map<String, Object>> routingVersionList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("id") int id) {
		List<IdAndNameStringWrapper> operatorList = listService.routingVersionList(id);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setData(operatorList);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "/routing-service-value/{id}")
	public ResponseEntity<Map<String, Object>> routingServiceValue(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("id") int id) {
		List<IdAndNameStringWrapper> operatorList = listService.routingServiceValue(id);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setData(operatorList);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "routing-list")
	public ResponseEntity<Map<String, Object>> getRoutingList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		List<IdAndNameWrapper> scheduleVersionList = listService.getRoutingList();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setData(scheduleVersionList);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "routing-name-routetypevalue-list")
	public ResponseEntity<Map<String, Object>> getRoutingNameAndRoutetypevalueList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		List<IdAndNameCodeWrapper> scheduleVersionList = listService.getRoutingNameAndRoutetypevalueList();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setData(scheduleVersionList);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "role-list-user")
	public ResponseEntity<Map<String, Object>> getRoleListForUser(@RequestParam String userId) {

		List<IdAndNameWrapper> roleList = listService.getRoleList(userId);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setData(roleList);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);

	}

	@GetMapping(value = "deviceCodeList/ATM")
	public ResponseEntity<Map<String, Object>> getDeviceCodeListByDeviceType() {
		List<String> deviceCodes = listService.getDeviceCodeListByDeviceTypeName(Constants.ATM);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("get device code list of ATM type");
		responseEntityData.setData(deviceCodes);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "network-state-list")
	public ResponseEntity<Map<String, Object>> getAllNetworkState(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {

		List<DtoWrapper> stateList = listService.getNetworkStateList();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find network state list");
		responseEntityData.setData(stateList);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);

	}

	@GetMapping(value = "entity-group-list")
	public ResponseEntity<Map<String, Object>> getAllEntityGroup(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {

		Map<String, List<String>> entityGroupList = listService.getAllEntityGroupMap();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find entity group list");
		responseEntityData.setData(entityGroupList);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);

	}

	@GetMapping(value = "/imf-template-list")
	public ResponseEntity<Map<String, Object>> getImfTemplateNameList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Find ImfTemplateNameList");
		try {
			List<ImfTemplateDto> imfTemplateDtoList = listService.getImfTemplateList();

			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find ImfTemplate-List ");
			responseEntityData.setData(imfTemplateDtoList);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		}
	}

	@GetMapping(value = "/adapter-toolkit-template-list")
	public ResponseEntity<Map<String, Object>> getAdaterToolkitTemplateList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("inside AdaterToolkitTemplateList()...");
		try {
			List<LookupValueDto> lookupValueDtoList = listService.getMessageStandard();
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find AdaterToolkit-Template-List ");
			responseEntityData.setData(lookupValueDtoList);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		}
	}

	@GetMapping(value = "/adapter-toolkit-format-list")
	public ResponseEntity<Map<String, Object>> getAdaterToolkitFormatList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("inside getAdaterToolkitFormatList()...");
		try {
			List<LookupValueDto> lookupValueDtoList = listService.getMessageProtocol();
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find AdaterToolkit-Format-List ");
			responseEntityData.setData(lookupValueDtoList);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		}
	}

	@GetMapping(value = "/lookup-value-list/{typeName}")
	public ResponseEntity<Map<String, Object>> getLookupValueByTypeName(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("typeName") String typeName) {
		logger.info("Find getLookupValueByTypeName() with typeName:{}", typeName);
		try {
			List<LookupValueDto> lookupValueDtoList = listService.getLookupValueByTypeName(typeName);

			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find Lookup-value-list for " + typeName);
			responseEntityData.setData(lookupValueDtoList);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		}
	}

	@GetMapping(value = "data-enrichment/entity-mapping-list")
	public ResponseEntity<Map<String, Object>> getEntityMappingList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {

		logger.info("inside getEntityMappingList()...");

		Map<String, List<String>> entityMappingList = adapterDataEnrichmentService.getEntityMappingList();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find Entity-Mapping-List JSON");
		responseEntityData.setData(entityMappingList);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "data-enrichment/entity-imf-field-list")
	public ResponseEntity<Map<String, Object>> getImfFieldList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {

		logger.info("inside getImfFieldList()...");

		Map<String, Object> map = new HashMap<>();
		map.put(IMF_FIELD, adapterDataEnrichmentService.getImfFieldList());

		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage(FIND_IMF_FIELD_LIST_JSON);
		responseEntityData.setData(map);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "/schema-specification-field-list/{messageStandardId}")
	public ResponseEntity<Map<String, Object>> getFieldListMessageSpecification(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("messageStandardId") int messageStandardId) {

		logger.info("inside getFieldListMessageSpecification() with messageStandardId:{}", messageStandardId);
		Map<String, Object> map = new HashMap<>();
		try {
			map.put("SchemaSpecification", listService.fieldListMessageSpecification(messageStandardId));
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find field-list JSON");
			responseEntityData.setData(map);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		}
	}

	@GetMapping(value = "/adapter-data-map")
	public ResponseEntity<Map<String, Object>> getAdapterDataMapper(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("inside getAdapterDataMapper()...");

		Map<String, Object> map = new HashMap<>();
		map.put("AdapterdataMap", adapterToolKitTransformService.getDataMap());

		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find Adaptor Data Mapper");
		responseEntityData.setData(map);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);

	}

	@GetMapping(value = "/el-expression/param-type-list")
	public ResponseEntity<Map<String, Object>> getELFunctionTypeList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("inside getELFunctionTypeList");

		Map<String, Object> map = new HashMap<>();
		map.put(TYPE_LIST, listService.getELFunctionOutputTypeList());

		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find El-expression param-type-list");
		responseEntityData.setData(map);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);

	}

	@GetMapping(value = "/imf-field/type-list")
	public ResponseEntity<Map<String, Object>> getImfFieldTypeList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("inside getImfFieldTypeList()...");

		Map<String, Object> map = new HashMap<>();
		map.put(TYPE_LIST, listService.getImfFieldTypeList());

		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find imf field-type-list");
		responseEntityData.setData(map);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);

	}

	@GetMapping(value = "/el-expression/feature-type-list")
	public ResponseEntity<Map<String, Object>> getElExpressionFeatureTypeList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("inside getElExpressionFeatureTypeList()...");

		Map<String, Object> map = new HashMap<>();
		map.put(TYPE_LIST, listService.getElExpressionFeatureTypeList());

		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find El-expression feature-type-list");
		responseEntityData.setData(map);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);

	}

	@GetMapping(value = "/el-expression/exp-type-list")
	public ResponseEntity<Map<String, Object>> getElExpressionExpTypeList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("inside getElExpressionExpTypeList()...");

		Map<String, Object> map = new HashMap<>();
		map.put(TYPE_LIST, listService.getElExpressionExpTypeList());

		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find El-expression exp-type-list");
		responseEntityData.setData(map);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);

	}

	@GetMapping(value = "imf-byid-field-list/{id}")
	public ResponseEntity<Map<String, Object>> getImfByIdFieldList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("id") int id) {

		logger.info("inside getImfByIdFieldList with id: {}", id);
		Map<String, Object> map = new HashMap<>();
		map.put(IMF_FIELD, adapterDataEnrichmentService.getImfByIdFieldList(id));

		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage(FIND_IMF_FIELD_LIST_JSON);
		responseEntityData.setData(map);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "/el-expression/sub-type-list")
	public ResponseEntity<Map<String, Object>> getElExpressionSubTypeList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("inside getElExpressionSubTypeList");

		Map<String, Object> map = new HashMap<>();
		map.put(TYPE_LIST, listService.getElExpressionSubTypeList());

		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find El-expression sub-type-list");
		responseEntityData.setData(map);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);

	}

	@GetMapping(value = "imf-byid-field-list-hide-false/{id}")
	public ResponseEntity<Map<String, Object>> getImfByIdFieldListWithHideFalse(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("id") int id) {

		logger.info("inside getImfByIdFieldListWithHideFalse with id: {}", id);
		Map<String, Object> map = new HashMap<>();
		map.put(IMF_FIELD, adapterDataEnrichmentService.getImfByIdFieldListWithHideFalse(id));

		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage(FIND_IMF_FIELD_LIST_JSON);
		responseEntityData.setData(map);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "/inputfields/rulecondition")
	public ResponseEntity<Map<String, Object>> getRuleConditionInputFields(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Fetch Rule Condition Input Fields-list: starts");
		ServiceConditionDto list = listService.getRuleConditionInputFields();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setData(list);
		logger.info("Fetch Rule Condition Input Fields-list: ends");
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "/tag-rule-list")
	public ResponseEntity<Map<String, Object>> getTagRuleList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Fetch Rule Condition Input Fields-list: starts");

		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setData(lookUpValueService.getTagRules());
		logger.info("Fetch Rule Condition Input Fields-list: ends");
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "imf-field-list-byid-hide-false/{id}")
	public ResponseEntity<Map<String, Object>> getImfFieldsListByIdHideFalse(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("id") int id) {
		logger.info("inside getImfFieldsListByIdHideFalse with id:{}", id);
		Map<String, Object> map = new HashMap<>();
		map.put(IMF_FIELD, adapterDataEnrichmentService.getImfFieldsListByIdHideFalse(id));
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage(FIND_IMF_FIELD_LIST_JSON);
		responseEntityData.setData(map);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "lookup-type-value-map")
	public ResponseEntity<Map<String, Object>> getLookupTypeUiNameValueMap(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("inside getLookupTypeUiNameValueMap");
		Map<String, Object> map = new HashMap<>();
		map.put("list", listService.getLookupTypeUiNameValueMap());
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find Lookup Type-Value map");
		responseEntityData.setData(map);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "getMessageContextFieldList")
	public ResponseEntity<Map<String, Object>> getMessageContextFieldList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("inside getMessageContextFieldList");
		Map<String, Object> map = new HashMap<>();
		map.put("messageContextFields", adapterDataEnrichmentService.getMessageContextFieldList());
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find MessageContextFields JSON");
		responseEntityData.setData(map);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "getOperatorTypeList")
	public ResponseEntity<Map<String, Object>> getOperatorTypeList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("inside getOperatorTypeList");
		Map<String, Object> map = new HashMap<>();
		map.put("OperatorList", listService.getOperatorTypeList());
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find getOperatorTypeList JSON");
		responseEntityData.setData(map);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "switch-cluster-list")
	public ResponseEntity<Map<String, Object>> getSwitchClusterList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		List<DtoWrapper> list = listService.getSwitchClusterList();
		return HttpCommons.setResponseEntityData(list, "find list");
	}

	@GetMapping(value = "get-l3-list-for-processor-adapter")
	public ResponseEntity<Map<String, Object>> getL3ListForProcessorAdapter(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("inside getL3ListForProcessorAdapter");
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find L3/Cartiage List JSON");
		responseEntityData.setData(listService.getL3ListForProcessorAdapter());
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "get-messagecontext-fieldList-by-imf-version/{id}")
	public ResponseEntity<Map<String, Object>> getMessageContextFieldListByImfVersion(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("id") int id) {
		logger.info("inside getMessageContextFieldListByImfVersion");
		Map<String, Object> map = new HashMap<>();
		map.put("messageContextFieldsByVersion", adapterDataEnrichmentService.getFromListFieldListByImfVersion(id));
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find MessageContextFields JSON");
		responseEntityData.setData(map);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "/inputfields/reverse-condition")
	public ResponseEntity<Map<String, Object>> getReverseConditionDropDownList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Fetch reverse Condition Input Fields-list: starts");
		ServiceConditionDto list = listService.getReverseConditionDropDownList();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setData(list);
		logger.info("Fetch reverse Condition Input Fields-list: ends");
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "processor-list")
	public ResponseEntity<Map<String, Object>> getProcessorAdapterList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		List<IdAndNameStringWrapper> proAdpList = paService.getProAdpIdNameList();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Processor Adapter list");
		responseEntityData.setData(proAdpList);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "acquirer-list")
	public ResponseEntity<Map<String, Object>> getAcquirerList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		List<NameAndCodeWrapper> acqConfList = acqService.getAcqConfList();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Acquirer list");
		responseEntityData.setData(acqConfList);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "/add")
	public ResponseEntity<Map<String, Object>> viewForm(@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Find Merchant Acquirer Address");
		ResponseEntityData responseEntityData = new ResponseEntityData();
		Map<String, Object> data = new HashMap<>();
		data.put("instList", listService.getMerchantListCode());
		data.put("acqList", acqService.getAcqConfList());
		data.put("paList", paService.getProAdpIdNameList());
		responseEntityData.setData(data);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "/logout/{id}")
	public ResponseEntity<Map<String, Object>> logout(@PathVariable("id") String id) {
		String requestToken = RippsUtility.getToken(request);
		try {
			authSessionService.deleteAuthSession(requestToken);
			if (!requestToken.equals("")) {
				listService.signOut(id, requestToken);
			}
			return new ResponseEntity<Map<String, Object>>(
					RippsUtility.setResponseEntityData(RippsRestConstant.SUCCESS, "Logout succeed", null),
					HttpStatus.OK);
		} catch (Exception e) {
			logger.error("Logout failed for user", e);
			return new ResponseEntity<Map<String, Object>>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "UNAUTHORISED_USER", null),
					HttpStatus.OK);
		}
	}
}
