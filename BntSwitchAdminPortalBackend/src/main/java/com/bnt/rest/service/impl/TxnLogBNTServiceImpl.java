package com.bnt.rest.service.impl;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;

import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.CollectionUtil;
import com.bnt.common.util.GsonUtil;
import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.RippsUtility;
import com.bnt.common.util.exception.RippsAdminRestException;
import com.bnt.constant.ParameterConstant;
import com.bnt.constant.TxnUiConstants;
import com.bnt.repo.mapper.TxnLogJsonMapper;
import com.bnt.repo.mapper.TxnLogMainPageJsonMapper;
import com.bnt.repo.mapper.TxnLogMapper;
import com.bnt.repo.mapper.TxnLogMatrixJsonMapper;
import com.bnt.rest.dto.CommentEntityDto;
import com.bnt.rest.dto.MerchantBillingDto;
import com.bnt.rest.dto.TransactionMerchantRequestDto;
import com.bnt.rest.dto.TxnLogJsonWrapper;
import com.bnt.rest.dto.TxnLogResponseWrapper;
import com.bnt.rest.entity.AuthSession;
import com.bnt.rest.entity.CommentEntity;
import com.bnt.rest.entity.MerchantInstitution;
import com.bnt.rest.entity.TxnLogEntity;
import com.bnt.rest.entity.component.TxnLogConfigurationDto;
import com.bnt.rest.jpa.repository.CommentEntityPersistenceHelper;
import com.bnt.rest.jpa.repository.MerchantInstitutionPersistenceHelper;
import com.bnt.rest.jpa.repository.MerchantPersistenceHelper;
import com.bnt.rest.jpa.repository.ProcessorAdapterPersistenceHelper;
import com.bnt.rest.jpa.repository.BNTTxnLogPersistenceHelper;
import com.bnt.rest.service.impl.AuthSessionService;
import com.bnt.rest.repository.CommentRepository;
import com.bnt.rest.repository.DeviceRepository;
import com.bnt.rest.repository.TxnKeyLabelRepository;
import com.bnt.rest.repository.TxnLogBNTRepository;
import com.bnt.rest.service.CurrencyService;
import com.bnt.rest.service.impl.ListService;
import com.bnt.rest.service.LookupValueService;
import com.bnt.rest.service.ProcessorAdapterService;
import com.bnt.rest.service.TxnLogBNTService;
import com.bnt.rest.wrapper.dto.CommentWrapper;
import com.bnt.rest.wrapper.dto.TxnLogMatrix;
import com.bnt.rest.wrapper.dto.TxnLookupResponseWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class TxnLogBNTServiceImpl implements TxnLogBNTService {

	private static final Logger LOGGER = LogManager.getLogger(TxnLogBNTServiceImpl.class);

	@Autowired
	private TxnLogBNTRepository txnLogRepository;

	@Autowired
	private AuthSessionService authSessionService;

	@Autowired
	private CommentRepository commentRepository;

	@Autowired
	private BNTTxnLogPersistenceHelper txnLogBNTPersistenceHelper;

	@Autowired
	private ListService listService;

	@Autowired
	private LookupValueService lookUpValueService;

	private ResourceLoader resourceLoader;

	private BufferedReader reader;

	@Autowired
	private CommentEntityPersistenceHelper commentPersistanceHelper;

	private File specFile;

	@Autowired
	private MerchantPersistenceHelper merchantPersistenceHelper;

	@Autowired
	private ProcessorAdapterService processorAdapterService;

	@Autowired
	private CurrencyService currencyService;

	@Autowired
	private MerchantInstitutionPersistenceHelper institutionPersistenceHelper;

	@Autowired
	private BNTTxnLogPersistenceHelper bntTxnLogPersistenceHelper;

	@Autowired
	TxnLogConfigurationDto txnConfigDto;

	@Autowired
	private TxnKeyLabelRepository repository;

	@Value("${mapping.file.dir}")
	private String reqResponseMappingPath;

	@Value("${matrix.approved.destinations}")
	private String approvedDestinations;

	@Value("${matrix.additional.attributes}")
	private String allMatrixAdditionalAttr;

	@Value("${matrix.default.filename}")
	private String defaultMatrixFileName;

	@Value("${matrix.dcc.fileprefix}")
	private String dccFilePrefix;

	@PostConstruct
	public void init() {
		try {
			LOGGER.info("loading spec_config file...");

			Resource resource = resourceLoader.getResource("classpath:spec_configuration.csv");
			this.specFile = resource.getFile();

		} catch (NullPointerException | IOException e) {
			LOGGER.error("CSV File reader cound not be initialized. file {} error {}", specFile, e);
		}
	}

	@PreDestroy
	public void preDestroy() {
		if (reader != null) {
			try {
				reader.close();
			} catch (IOException e) {
				LOGGER.error("Failed to close the reader.");
			}
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public ResponseWrapper findPagedTxnLogs(Map<String, Object> requestParamMap) throws RippsAdminRestException {
		ResponseWrapper response = txnLogRepository.findPagedTxnLogs(requestParamMap);
		List<TxnLogEntity> txnlogDtoList = (List<TxnLogEntity>) response.getContent();
		List<TxnLogResponseWrapper> txnLogResponseList = mapTxnlogData(txnlogDtoList);
		response.setContent(txnLogResponseList);
		return response;
	}

	@PostConstruct
	public void getTxnKeyLabelMap() {
		try {
			LOGGER.info("Print Key Map");
			repository.getTxnKeyMap(true);
		} catch (Exception e) {
			LOGGER.error(e);
		}
	}

	private List<TxnLogResponseWrapper> mapTxnlogData(List<TxnLogEntity> txnlogList) {
		List<TxnLogResponseWrapper> txnLogResponseList = new ArrayList<>();

		TxnLogResponseWrapper txnResponse = null;
		Map<String, String> destinationMap = processorAdapterService.getProcessorAdapterCodeAndName();
		Map<String, String> currencyMap = currencyService.getCurrencyIsoCodeAndCode();

		for (TxnLogEntity entity : txnlogList) {
			Boolean forReview = getForReview(entity.getTxnId());
			try {
				txnResponse = TxnLogJsonMapper.setStaticData(entity, txnConfigDto, destinationMap, currencyMap,
						forReview);
			} catch (Exception e) {
				LOGGER.error("Error in mapping: mapTxnlogData for transaction id:{} :{}", entity.getId(), e);
				throw new RippsAdminException(e.getMessage());
			}
			TxnLogMainPageJsonMapper.mapTxnLogsToResponse(entity, txnResponse, txnConfigDto);
			txnLogResponseList.add(txnResponse);
		}
		return txnLogResponseList;
	}

	@Override
	public Boolean markTransactionReview(String transactionId, boolean status, String token) {
		CommentEntityDto comment = new CommentEntityDto();
		comment.setTransactionId(transactionId);
		comment.setForReview(status);
		comment.setCreatedBy(String.valueOf(authSessionService.getCreatedBy()));
		comment.setUpdatedBy(String.valueOf(authSessionService.getCreatedBy()));
		comment.setCreatedOn(new Date());
		comment.setUpdatedOn(new Date());
		return commentRepository.markTransactionReview(comment);
	}

	@Override
	public TxnLogResponseWrapper findTxnLogEntityById(String id) {
		try {
			TxnLogEntity entity = txnLogBNTPersistenceHelper.findByTxnId(id);
			Map<String, String> destinationMap = processorAdapterService.getProcessorAdapterCodeAndName();
			Boolean forReview = getForReview(id);
			TxnLogResponseWrapper txnResponse = TxnLogJsonMapper.mapTxnEntityToResponse(entity, txnConfigDto,
					destinationMap, forReview, "spec_configuration.csv");

			populateStatusByParentTxnIdAdvice(txnResponse, entity);

			CommentEntity commentEntity = commentPersistanceHelper.findForReviewByTransactionId(id);
			if (Optional.ofNullable(commentEntity).isPresent()) {
				if (commentEntity.isForReview()) {
					txnResponse.setForReview(commentEntity.isForReview());
				} else {
					txnResponse.setForReview(false);
				}
			}
			return txnResponse;

		} catch (Exception e) {
			LOGGER.error("findTxnLogById error on find by id", e);
			throw new RippsAdminException(
					"Json for the transaction is not compliant with IMF  : Please Contact Adminstrator");
		}

	}

	@Override
	public Object[] getFollowupAdviceTransaction(Long id, String txnId) {
		Object[] txn = null;

		try {
			txn = txnLogRepository.getFollowUpTxnAdvice(id, txnId);
		} catch (Exception e) {

			LOGGER.info("No followup transaction exists for the transaction id : {}", txnId);
		}

		return txn;
	}

	private void populateStatusByParentTxnIdAdvice(TxnLogResponseWrapper txnResponse, TxnLogEntity entity) {
		LOGGER.info("inside populateStatusByParentTxnIdAdvice() with entity {}", entity.getClass());
		TxnLogResponseWrapper.TxnStatusWrapper status = txnResponse.new TxnStatusWrapper();

		if (TxnUiConstants.AUTHORIZATION.equals(txnResponse.getMessageTypeIndicator())
				&& txnResponse.getProcessingStatus().toUpperCase().contains("APPROVE")) {

			Object[] followUpTxn = getFollowupAdviceTransaction(txnResponse.getId(), txnResponse.getTxnId());

			if (followUpTxn != null) {
				setAdviceStatus((String) followUpTxn[1], status);
			} else {
				status.setText(TxnUiConstants.PENDING);
			}
			if (status.getText() != null) {
				TxnLogMapper.setTxnStatusToUI(status);
				txnResponse.setTxnStatus(status);
			}
		}
	}

	private void setAdviceStatus(String txnType, TxnLogResponseWrapper.TxnStatusWrapper status) {
		if (TxnUiConstants.FINAL.equalsIgnoreCase(txnType)) {
			status.setText(TxnUiConstants.FINALISED);
		} else if (TxnUiConstants.REVERSE.equalsIgnoreCase(txnType)) {
			status.setText(TxnUiConstants.REVERSED);
		} else {
			status.setText(TxnUiConstants.FAILURE);
		}
	}

	private Boolean getForReview(String id) {
		CommentEntity commentEntity = commentPersistanceHelper.findForReviewByTransactionId(id);
		if (Optional.ofNullable(commentEntity).isPresent() && commentEntity.isForReview()) {
			return commentEntity.isForReview();
		}
		return false;
	}

	@Override
	public TxnLogJsonWrapper findTxnJson(String id) {

		try {
			TxnLogEntity txnLogBNTEntity = txnLogBNTPersistenceHelper.findById(Long.parseLong(id)).orElse(null);
			if (txnLogBNTEntity != null) {
				String serializedtxnData = txnLogBNTEntity.getTransactionData();

				String prettyJson = GsonUtil.toPrettyFormat(serializedtxnData);
				LOGGER.info("Pretty Json for txn Id {}", id);

				TxnLogJsonWrapper txnLogJsonWrapper = new TxnLogJsonWrapper();
				txnLogJsonWrapper.setJsonData(prettyJson);
				txnLogJsonWrapper.setTxnType(txnLogBNTEntity.getTxnType());

				return txnLogJsonWrapper;
			} else {
				return null;
			}

		} catch (Exception e) {
			LOGGER.error("ERROR in creating JSON for the transaction {}", e.getMessage());
			throw new RippsAdminException("ERROR in creating JSON for the transaction" + e.getMessage());
		}

	}

	@Override
	public String findTxnJsonString(String transactionId) {

		try {
			TxnLogEntity txnLogReconEntity = txnLogBNTPersistenceHelper.findByTxnId(transactionId);
			return txnLogReconEntity.getTransactionData();

		} catch (Exception e) {
			LOGGER.error("ERROR in getting JSON for the treansaction {}", e.getMessage());
			throw new RippsAdminException("ERROR in getting JSON for the treansaction" + e.getMessage());
		}

	}

	@Override
	public String findMessageContext(String transactionId) {

		try {
			String serializedtxnData = findTxnJsonString(transactionId);
			return GsonUtil.toPrettyFormat(serializedtxnData);

		} catch (Exception e) {
			LOGGER.error("ERROR in getting message context for the treansaction {}", e.getMessage());
			throw new RippsAdminException("ERROR in creating JSON for the treansaction" + e.getMessage());
		}

	}

	@Override
	public List<CommentWrapper> findTxnComments(String transactionId) {
		List<CommentEntityDto> commentList = commentRepository.getAllComments(transactionId);
		return TxnLogMapper.mapCommentDtoToResponse(commentList);
	}

	@Override
	public Long addComment(CommentWrapper commentWrapper, String requestToken) {

		CommentEntityDto comment = null;
		try {
			comment = TxnLogMapper.mapRequestToCommentDto(commentWrapper);
			comment.setCreatedBy(String.valueOf(authSessionService.getCreatedBy()));
			comment.setCreatedOn(RippsUtility.getCurrentTimeStamp());
		} catch (Exception e) {
			throw new RippsAdminException("Exception in copying request data to Dto");
		}
		Long commentId = commentRepository.saveComment(comment);
		if (commentId == null) {
			throw new RippsAdminException("Error in saving country");
		}
		return commentId;
	}

	@Override
	public TxnLookupResponseWrapper getTotalsLookUp(String deviceCode, Map<String, Object> requestParamMap) {
		return txnLogRepository.getTotalsLookUp(deviceCode, requestParamMap);
	}

	@Override
	public List<String> findTxnJournal(String deviceCode, Map<String, Object> requestParamMap) {
		List<TxnLogEntity> resultList = txnLogRepository.getTxnJournal(deviceCode, requestParamMap);
		return TxnLogMapper.mapJournal(resultList);

	}

	@Override
	public Map<String, Object> getFilterData() {

		Map<String, Object> map = new LinkedHashMap<>();
		map.put("txnType", lookUpValueService.getTxnTypes());
		map.put("status", listService.getProcessingStatusList());

		map.put("device", listService.getDeviceWrapperList());
		map.put("merchant", listService.getMerchantWrapperList());
		map.put("destination", listService.getDestinationList());
		return map;
	}

	@Override
	public TxnLogMatrix findTxnLogMatrixById(String id, String destinations, String mappingType) {
		TxnLogMatrix txnLogMatrix = new TxnLogMatrix();
		String messageContext = null;
		try {
			messageContext = findMessageContext(id);
			if (messageContext != null) {
				txnLogMatrix.setDestinations(destinations);
				txnLogMatrix.setTransactionId(id);
				txnLogMatrix.setMappingType(mappingType);

				TxnLogMatrixJsonMapper.mapMessageContextToTxnMatrix(txnLogMatrix, messageContext);

			}
		} catch (RippsAdminException e) {
			LOGGER.error(e.getMessage(), e);
			throw new RippsAdminException(e.getMessage());
		}
		return txnLogMatrix;
	}

	@Override
	public List<TxnLogEntity> findCSVReportTxnLogs(Map<String, Object> requestParamMap) throws RippsAdminRestException {
		String[] filters = (String[]) requestParamMap.get(ParameterConstant.FILTERS);
		return txnLogRepository.getAllReportFilter(filters);
	}

	public List<String> findMerchantListByMerchantinstitution(TransactionMerchantRequestDto txnMerchantRequest) {
		if (CollectionUtil.isCollectionEmptyOrNull(txnMerchantRequest.getMerchant())) {

			MerchantInstitution merchantInstitution = institutionPersistenceHelper
					.findById(txnMerchantRequest.getMerchantInstitution()).orElse(null);

			if ((txnMerchantRequest.getMerchantInstitution() == null)) {
				throw new RippsAdminException("Invalid Request");
			}
			return merchantPersistenceHelper.findCodeByMerchantInstitution(merchantInstitution);
		} else {

			List<Integer> merchantIds = txnMerchantRequest.getMerchant();

			return merchantPersistenceHelper.getMerchantCodeListByIdList(merchantIds);
		}
	}

	@Override
	public void deleteMerchantList(List<String> merchantList) {
		bntTxnLogPersistenceHelper.deleteMerchants(merchantList);
	}

	@Override
	public long countTxnLogs(List<String> merchantList) {
		return bntTxnLogPersistenceHelper.countTxns(merchantList);
	}

	@Override
	public ResponseWrapper getSourceAcquirerIdCodeList(Map<String, Object> requestParamMap) {
		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		String[] filters = (String[]) requestParamMap.get(ParameterConstant.FILTERS);
		return txnLogRepository.getSourceAcquirerIdCodeList(pageable, filters);
	}

	@Override
	public ResponseWrapper getDeviceCodeList(Map<String, Object> requestParamMap) {
		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		String[] filters = (String[]) requestParamMap.get(ParameterConstant.FILTERS);
		return txnLogRepository.getDeviceCodeList(pageable, filters);
	}

	@Override
	public ResponseWrapper getDestinationEndpointList(Map<String, Object> requestParamMap) {
		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		String[] filters = (String[]) requestParamMap.get(ParameterConstant.FILTERS);
		return txnLogRepository.getDestinationEndpointList(pageable, filters);
	}

	@Override
	public ResponseWrapper getMerchantIdList(Map<String, Object> requestParamMap) {
		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		String[] filters = (String[]) requestParamMap.get(ParameterConstant.FILTERS);
		return txnLogRepository.getMerchantIdListList(pageable, filters);
	}

}
