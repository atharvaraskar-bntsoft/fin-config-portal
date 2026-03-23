package com.bnt.rest.repository.impl;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.StringPath;
import com.querydsl.jpa.JPAQueryBase;
import com.querydsl.jpa.impl.JPAQuery;
import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.JPAPredicateHelper;
import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.RippsUtility;
import com.bnt.common.util.SmartFilterQueryUtils;
import com.bnt.common.util.StringUtil;
import com.bnt.common.util.exception.ExceptionLog;
import com.bnt.constant.ParameterConstant;
import com.bnt.enums.lookup.InternalProcessingCode;
import com.bnt.enums.lookup.TransactionType;
import com.bnt.multi.database.ReadOnlyRepository;
import com.bnt.repo.mapper.TxnLogMapper;
import com.bnt.rest.dto.DtoWrapper;
import com.bnt.rest.dto.MerchantBillingDto;
import com.bnt.rest.dto.TxnLogDto;
import com.bnt.rest.entity.Location;
import com.bnt.rest.entity.MerchantInstitution;
import com.bnt.rest.entity.QCommentEntity;
import com.bnt.rest.entity.QTxnLogEntity;
import com.bnt.rest.entity.TxnLogEntity;
import com.bnt.rest.jpa.repository.DevicePersistenceRepository;
import com.bnt.rest.jpa.repository.LocationPersistenceHelper;
import com.bnt.rest.jpa.repository.MerchantInstitutionPersistenceHelper;
import com.bnt.rest.jpa.repository.MerchantPersistenceHelper;
import com.bnt.rest.jpa.repository.BNTTxnLogPersistenceHelper;
import com.bnt.rest.repository.DeviceRepository;
import com.bnt.rest.repository.MerchantRepository;
import com.bnt.rest.repository.TxnLogBNTRepository;
import com.bnt.rest.service.impl.ListService;
import com.bnt.rest.wrapper.dto.TxnLookupResponseWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
@ReadOnlyRepository
public class TxnLogBNTRepositoryImpl implements TxnLogBNTRepository {

	private static final String JSON_UNQUOTE_JSON_EXTRACT_0_1 = "json_unquote(json_extract({0},{1}))";

	private static final String PERIOD = "period";

	@Autowired
	@Qualifier("readEntityManager")
	private EntityManager entityManager;

	/** The Constant LOGGER. */
	private static final Logger LOGGER = LogManager.getLogger(TxnLogBNTRepositoryImpl.class);

	@Autowired
	private BNTTxnLogPersistenceHelper txnLogPersistanceHelper;

	@Autowired
	private MerchantRepository merchantRepo;

	@Autowired
	private DeviceRepository deviceRepo;

	@Autowired
	private MerchantPersistenceHelper merchantPersistenceHelper;

	@Autowired
	private MerchantInstitutionPersistenceHelper institutionRepository;

	@Autowired
	private LocationPersistenceHelper locationPersistenceHelper;

	@Autowired
	private DevicePersistenceRepository jpaRepository;

	@Autowired
	private ListService listService;

	@Value("${spring.jpa.properties.hibernate.default_schema}")
	String schemaName;

	@Value("${path.transaction_type}")
	String pathTxnType;

	@Value("${path.masked_card_number}")
	String pathMaskedCardNumber;

	@Value("${path.message.type}")
	String pathMsgType;

	@Value("${path.parent_transaction_id}")
	String pathParentTxnID;

	@Value("${path.parent_transaction_id.reversal}")
	String pathParebtTxnIDReversal;

	@Value("${path.advice.parent_transaction_id}")
	String pathAdviceParentTxnID;

	@Value("${path.advice.parent_advice_staus}")
	String pathAdviceParentAdviceStatus;

	@Value("${path.source.acquirer}")
	String pathSourceAcqCode;

	/** The req response mapping path. */
	@Value("${report.max.size}")
	private int reportMaxSize;

	@Value("${path.destination.acquirer}")
	String pathDestinationAcqCode;

	@Value("${path.response.code}")
	String pathResponseCode;

	@Value("${path.amount}")
	String pathAmount;

	@Value("${path.saf.processed}")
	String pathSafProcessed;

	@Value("${path.destination.endpoint}")
	String pathDestinationEndPoint;

	@Value("${path.txn.service.type}")
	String pathTxnService;

	@Value("${region}")
	String isRegion;

	private static final String GET_PAGED_ACQUIRER_LIST_QUERY = "select distinct code from acquirer_id_config where deleted = '0' and active = '1'order by code";

	private static final String GET_PAGED_DEVICE_LIST_QUERY = "select distinct code from device where deleted = '0' and locked = '0'order by code";

	private static final String GET_PAGED_DESTINATION_ENDPOINT_LIST_QUERY = "select distinct name,code from processor_adapter order by name";

	private static List<String> getApprovedStatusList() {
		List<String> approvedStatusList = new ArrayList<>();
		approvedStatusList.add(InternalProcessingCode.APPROVED.name());
		approvedStatusList.add(InternalProcessingCode.DCC_TXN.name());
		approvedStatusList.add(InternalProcessingCode.STANDIN_APPROVED.name());
		return approvedStatusList;
	}

	@Override
	public List<Object[]> getIdAndNameList() {
		return txnLogPersistanceHelper.getIdAndNameSqlQuery();
	}

	@Override
	public double getTransactionAmountByMerchant(MerchantBillingDto billingDto) throws RippsAdminException {
		Query query = this.entityManager
				.createNativeQuery("SELECT IFNULL((select sum(tl.txn_amount) as total_amount FROM " + schemaName + "."
						+ "txnlog tl WHERE  tl.merchant_code= ?),0)");
		query.setParameter(1, billingDto.getMerchantCode());
		Number total = (Number) query.getSingleResult();
		return total.doubleValue();
	}

	@Override
	public int getTransactionExit(MerchantBillingDto billingDto) throws RippsAdminException {
		Query query = this.entityManager.createNativeQuery(
				"SELECT EXISTS(select * FROM " + schemaName + "." + "txnlog tl WHERE  tl.merchant_code= ? )");
		query.setParameter(1, billingDto.getMerchantCode());
		Number total = (Number) query.getSingleResult();
		return total.intValue();
	}

	@Override
	public long getCountById() {
		Query query = this.entityManager.createNativeQuery("Select count(id) from " + schemaName + "." + "txn_log");

		Number total = (Number) query.getSingleResult();
		return total.longValue();
	}

	@Override
	public TxnLookupResponseWrapper getTotalsLookUp(String deviceCode, Map<String, Object> requestParamMap) {
		String[] filters = (String[]) requestParamMap.get(ParameterConstant.FILTERS);
		QTxnLogEntity qTxnLogEntity = QTxnLogEntity.txnLogEntity;

		Predicate datePredicate = null;

		if (filters != null) {
			for (String each : filters) {
				String param = each.split(":")[0];
				String value = each.split(":")[1];
				if (param.equals(PERIOD)) {
					datePredicate = getDatePredicate(qTxnLogEntity, value, false);
				}
			}

		}

		Long successCount = getStatusTransactionsCount(deviceCode, InternalProcessingCode.APPROVED.name(),
				datePredicate);
		Long declinedCount = getStatusTransactionsCount(deviceCode, InternalProcessingCode.GEN_DECLINE.name(),
				datePredicate);
		Double totalAuthorizedValue = null;/** getTotalAuthorizedValue(deviceCode, datePredicate); */
		TxnLookupResponseWrapper lookupResponse = new TxnLookupResponseWrapper();
		lookupResponse.setSuccessCount(successCount);
		lookupResponse.setDeclinedCount(declinedCount);
		lookupResponse.setTotalAuthorizedValue(totalAuthorizedValue);

		return lookupResponse;

	}

	private Predicate getDatePredicate(QTxnLogEntity qTxnLogEntity, String value, boolean refreshCall) {
		if (refreshCall) {
			return JPAPredicateHelper.getTimestampPredicateForDate(qTxnLogEntity.txnRecDateTime, value);
		} else {
			return JPAPredicateHelper.getTimestampPredicate(qTxnLogEntity.txnRecDateTime, value);
		}

	}

	private OrderSpecifier<Timestamp> getOrderByPredicate(QTxnLogEntity qTxnLogEntity) {
		return qTxnLogEntity.createdOn.desc();
	}

	/**
	 * private Double getTotalAuthorizedValue(String deviceCode, Predicate
	 * datePredicate) { return null; }
	 */

	@SuppressWarnings({ "rawtypes", "unchecked", "deprecation" })
	private Long getStatusTransactionsCount(String deviceCode, String status, Predicate datePredicate) {

		QTxnLogEntity qTxnLogEntity = QTxnLogEntity.txnLogEntity;
		Predicate statusPredicate = qTxnLogEntity.ipc.eq(status);
		Predicate posTxnTypePredicate = qTxnLogEntity.txnType.eq(TransactionType.DEBIT.toString());
		Predicate devicePredicate = qTxnLogEntity.terminalId.eq(deviceCode);
		JPAQuery jpaQuery = null;
		jpaQuery = new JPAQuery(entityManager);
		jpaQuery.from(qTxnLogEntity).where(devicePredicate, posTxnTypePredicate, statusPredicate, datePredicate);

		return jpaQuery.fetchCount();

	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public List<TxnLogEntity> getTxnJournal(String deviceCode, Map<String, Object> requestParamMap) {
		String[] filters = (String[]) requestParamMap.get(ParameterConstant.FILTERS);
		QTxnLogEntity qTxnLogEntity = QTxnLogEntity.txnLogEntity;
		Predicate datePredicate = null;
		Predicate devicePredicate = qTxnLogEntity.terminalId.eq(deviceCode);
		Predicate txnPredicate = null;

		if (filters != null) {
			for (String each : filters) {
				if (each.contains(":")) {
					String param = each.split(":")[0];
					String value = each.split(":")[1];
					if (param.equals(PERIOD)) {
						datePredicate = getDatePredicate(qTxnLogEntity, value, false);
					}

					else if (param.equals("id")) {
						txnPredicate = JPAPredicateHelper.getStringPredicate(qTxnLogEntity.txnId, value);
					}

				}
			}

		}

		JPAQuery jpaQuery = null;
		jpaQuery = new JPAQuery(entityManager);
		JPAQueryBase jpaQueryBase = jpaQuery.from(qTxnLogEntity);

		if (txnPredicate != null) {
			jpaQueryBase.where(txnPredicate);

		} else {
			jpaQueryBase.where(devicePredicate, datePredicate);

		}

		return jpaQueryBase.fetch();

	}

	@SuppressWarnings("unused")
	@Override
	public ResponseWrapper findPagedTxnLogs(Map<String, Object> requestParamMap) {
		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		String[] filters = (String[]) requestParamMap.get(ParameterConstant.FILTERS);
		Predicate predicate = null;
		TxnLogDto txnLogDto = new TxnLogDto();
		Page<TxnLogEntity> txnLogPage = null;

		if (filters == null) {
			LOGGER.info("Refresh call for txn");
			Calendar calendar1 = Calendar.getInstance();
			calendar1.setTime(new Date());
			calendar1.add(Calendar.HOUR_OF_DAY, -24);
			Date date2 = calendar1.getTime();
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(new Date());
			Date date1 = calendar.getTime();
			long tsTime1 = date1.getTime();
			long tsTime2 = date2.getTime();
			filters = new String[] { "period:" + tsTime2 + "-" + tsTime1 };
			LOGGER.info("Time filter for txn:" + "period:" + tsTime2 + "-" + tsTime1);
			txnLogPage = getCustomFilter(filters, pageable, true);
		} else {
			txnLogPage = getCustomFilter(filters, pageable, false);
		}

		Long totalRecordscount = 0l;
		if (txnLogPage != null) {
			totalRecordscount = txnLogPage.getTotalElements();
		}
		return JPAUtils.getResponseWrapperByPage(txnLogPage, totalRecordscount);
	}

	@SuppressWarnings({ "rawtypes" })
	@Override
	public Page<TxnLogEntity> getCustomFilter(String[] filters, Pageable pageable, boolean refreshCall) {

		QTxnLogEntity qTxnLogEntity = QTxnLogEntity.txnLogEntity;
		QCommentEntity qCommentEntity = QCommentEntity.commentEntity;
		Predicate reviewOn = null;
		Predicate transactionTypePredicate = null;

		Predicate forReview = null;
		Predicate statusPredicate = null;
		Predicate datePredicate = null;
		Predicate merchantPredicate = null;
		Predicate devicePredicate = null;
		Predicate locationPredicate = null;
		Predicate currencyPredicate = null;
		Predicate sourceAcqPredicate = null;
		Predicate destinationAcqPredicate = null;
		Predicate destinationEndpointPredicate = null;
		Predicate rrnPredicate = null;
		Predicate uuidPredicate = null;
		Predicate amountPredicate = null;
		Predicate responseCodePredicate = null;
		Predicate txnStatusPredicate = null;
		Predicate safPredicate = null;
		Predicate msgTypePredicate = null;

		Predicate txnIdPredicate = null;
		Predicate destinationPredicate = null;
		Predicate maskedCardNumberPredicate = null;
		Predicate maskedCardNumberPredicate2 = null;

		Page<TxnLogEntity> page;
		if (filters != null) {
			for (String each : filters) {
				if (each.contains(":")) {
					String param = each.split(":")[0];
					String value = each.split(":")[1];

					if (param.equals("forReview") && value.equals("true")) {
						forReview = qCommentEntity.forReview.eq(Boolean.parseBoolean(value));
						reviewOn = qTxnLogEntity.txnId.eq(qCommentEntity.transactionId);
					}

					else if (param.equals("txnId")) {
						txnIdPredicate = qTxnLogEntity.txnId.eq(value);
					} else if (param.equals("maskedCardNumber")) {
						String jsonPath = pathMaskedCardNumber;
						String functionExp = JSON_UNQUOTE_JSON_EXTRACT_0_1;
						if (value.length() > 15) {
							// 6759405555556512
							StringBuilder valueBuilder = new StringBuilder(value.trim());
							valueBuilder.replace(6, 12, "XXXXXX");
							value = valueBuilder.toString();
							maskedCardNumberPredicate = JPAPredicateHelper.getPredicateFromFunction(functionExp,
									qTxnLogEntity.transactionData, jsonPath, value);
						} else if (value.startsWith("*")) {
							// *6512
							// set value as "6512" instead of "*6512"
							value = value.substring(1, value.length());
							maskedCardNumberPredicate = JPAPredicateHelper.getCustomEndsWithPredicateFromFunction(
									functionExp, qTxnLogEntity.transactionData, jsonPath, value);
						} else if (value.endsWith("*")) {
							// 675940*
							// set value as "675940" instead of "675940*"
							value = value.substring(0, value.length() - 1);
							maskedCardNumberPredicate = JPAPredicateHelper.getCustomStartsWithPredicateFromFunction(
									functionExp, qTxnLogEntity.transactionData, jsonPath, value);
						} else if (value.contains("*")) {
							// 675940*6512
							// devide value in two piece val1:"675940" & val2:"6512"
							String[] output = value.split("\\*");
							String value1 = output[0];
							String value2 = output[1];
							maskedCardNumberPredicate = JPAPredicateHelper.getCustomStartsWithPredicateFromFunction(
									functionExp, qTxnLogEntity.transactionData, jsonPath, value1);
							maskedCardNumberPredicate2 = JPAPredicateHelper.getCustomEndsWithPredicateFromFunction(
									functionExp, qTxnLogEntity.transactionData, jsonPath, value2);
						}

					}
					if (param.equals("txnType")) {
						transactionTypePredicate = JPAPredicateHelper.getStringPredicate(qTxnLogEntity.txnType, value);

					} else if (param.equals("msgType")) {
						String jsonPath = pathMsgType;
						String functionExp = JSON_UNQUOTE_JSON_EXTRACT_0_1;
						msgTypePredicate = JPAPredicateHelper.getPredicateFromFunction(functionExp,
								qTxnLogEntity.transactionData, jsonPath, value);

					} else if (param.equals("sourceAcq")) {
						String jsonPath = pathSourceAcqCode;
						String functionExp = JSON_UNQUOTE_JSON_EXTRACT_0_1;
						sourceAcqPredicate = JPAPredicateHelper.getPredicateFromFunction(functionExp,
								qTxnLogEntity.transactionData, jsonPath, value);

					} else if (param.equals("destinationAcq")) {
						String jsonPath = pathDestinationAcqCode;
						String jsonServicePath = pathTxnService;
						String functionExp = JSON_UNQUOTE_JSON_EXTRACT_0_1;
						destinationAcqPredicate = JPAPredicateHelper.getPredicateFromFunction(functionExp,
								qTxnLogEntity.transactionData, jsonPath, value);
						txnStatusPredicate = JPAPredicateHelper.getPredicateFromFunction(functionExp,
								qTxnLogEntity.transactionData, jsonServicePath, "AUTH_SERVICE");
					} else if (param.equals("processorAdpCode")) {
						String jsonPath = pathDestinationEndPoint;
						String jsonServicePath = pathTxnService;
						String functionExp = JSON_UNQUOTE_JSON_EXTRACT_0_1;
						destinationEndpointPredicate = JPAPredicateHelper.getPredicateFromFunction(functionExp,
								qTxnLogEntity.transactionData, jsonPath, value);
						txnStatusPredicate = JPAPredicateHelper.getPredicateFromFunction(functionExp,
								qTxnLogEntity.transactionData, jsonServicePath, "AUTH_SERVICE");

					} else if (param.equals("rrn")) {
						rrnPredicate = JPAPredicateHelper.getStringPredicate(qTxnLogEntity.rrn, value);

					} else if (param.equals("uuid")) {
						String jsonPath = pathParentTxnID;
						String functionExp = JSON_UNQUOTE_JSON_EXTRACT_0_1;
						uuidPredicate = JPAPredicateHelper.getPredicateFromFunction(functionExp,
								qTxnLogEntity.transactionData, jsonPath, value);

					} else if (param.equals("amount")) {
						String jsonPath = pathAmount;
						String functionExp = JSON_UNQUOTE_JSON_EXTRACT_0_1;
						amountPredicate = JPAPredicateHelper.getPredicateFromFunctionBigDecimal(functionExp,
								qTxnLogEntity.transactionData, jsonPath, value);

					} else if (param.equals("responseCode")) {
						String jsonPath = pathResponseCode;
						String functionExp = JSON_UNQUOTE_JSON_EXTRACT_0_1;
						responseCodePredicate = JPAPredicateHelper.getPredicateFromFunctionContains(functionExp,
								qTxnLogEntity.transactionData, jsonPath, value);

					} else if (param.equals("saf")) {
						String jsonPath = pathSafProcessed;
						String functionExp = JSON_UNQUOTE_JSON_EXTRACT_0_1;
						safPredicate = JPAPredicateHelper.getPredicateFromFunction(functionExp,
								qTxnLogEntity.transactionData, jsonPath, value);

					} else if (param.equals("status")) {
						statusPredicate = getStatusPredicate(qTxnLogEntity, value);
					} else if (param.equals("merchant")) {
						merchantPredicate = JPAPredicateHelper.getStringPredicate(qTxnLogEntity.merchantId, value);
					} else if (param.equals("device")) {
						devicePredicate = JPAPredicateHelper.getStringPredicate(qTxnLogEntity.terminalId, value);
					}

					else if (param.equals(PERIOD)) {
						String[] periods = value.split("-");
						if (!(StringUtil.isNotNullOrBlank(periods[0]) && StringUtil.isNotNullOrBlank(periods[1]))) {
							throw new RippsAdminException("'From Date' or 'To Date' cannot be empty");
						}
						datePredicate = getDatePredicate(qTxnLogEntity, value, refreshCall);
					}

				}
			}
		}

		JPAQuery jpaQuery = null;
		jpaQuery = new JPAQuery(entityManager);

		if (Boolean.TRUE.equals(Boolean.valueOf(isRegion))) {
			Predicate regionPredicate = null;
			String region = listService.getAttribute();
			if (null != region && !region.equalsIgnoreCase("all")) {
				regionPredicate = qTxnLogEntity.txnOriginatorReference.eq(region);
			} else if (StringUtil.isEmptyOrNull(region)) {
				regionPredicate = qTxnLogEntity.txnOriginatorReference.eq("");
			}
			if (forReview == null) {
				Predicate[] predicateList = { transactionTypePredicate, statusPredicate, datePredicate,
						merchantPredicate, devicePredicate, locationPredicate, currencyPredicate, txnIdPredicate,
						destinationPredicate, sourceAcqPredicate, destinationAcqPredicate, destinationEndpointPredicate,
						rrnPredicate, uuidPredicate, amountPredicate, responseCodePredicate, safPredicate,
						txnStatusPredicate, msgTypePredicate, maskedCardNumberPredicate, maskedCardNumberPredicate2,
						regionPredicate };
				page = getQueryDslResultPagable(qTxnLogEntity, jpaQuery, predicateList, pageable, qCommentEntity,
						reviewOn, false);
			} else {
				Predicate[] predicateList = { forReview, transactionTypePredicate, statusPredicate, datePredicate,
						merchantPredicate, devicePredicate, locationPredicate, currencyPredicate, txnIdPredicate,
						destinationPredicate, sourceAcqPredicate, destinationAcqPredicate, destinationEndpointPredicate,
						rrnPredicate, uuidPredicate, amountPredicate, responseCodePredicate, safPredicate,
						txnStatusPredicate, msgTypePredicate, maskedCardNumberPredicate, maskedCardNumberPredicate2,
						regionPredicate };
				page = getQueryDslResultPagable(qTxnLogEntity, jpaQuery, predicateList, pageable, qCommentEntity,
						reviewOn, true);
			}
			return page;
		} else {
			if (forReview == null) {
				Predicate[] predicateList = { transactionTypePredicate, statusPredicate, datePredicate,
						merchantPredicate, devicePredicate, locationPredicate, currencyPredicate, txnIdPredicate,
						destinationPredicate, sourceAcqPredicate, destinationAcqPredicate, destinationEndpointPredicate,
						rrnPredicate, uuidPredicate, amountPredicate, responseCodePredicate, safPredicate,
						txnStatusPredicate, msgTypePredicate, maskedCardNumberPredicate, maskedCardNumberPredicate2 };
				page = getQueryDslResultPagable(qTxnLogEntity, jpaQuery, predicateList, pageable, qCommentEntity,
						reviewOn, false);
			} else {
				Predicate[] predicateList = { forReview, transactionTypePredicate, statusPredicate, datePredicate,
						merchantPredicate, devicePredicate, locationPredicate, currencyPredicate, txnIdPredicate,
						destinationPredicate, sourceAcqPredicate, destinationAcqPredicate, destinationEndpointPredicate,
						rrnPredicate, uuidPredicate, amountPredicate, responseCodePredicate, safPredicate,
						txnStatusPredicate, msgTypePredicate, maskedCardNumberPredicate, maskedCardNumberPredicate2 };
				page = getQueryDslResultPagable(qTxnLogEntity, jpaQuery, predicateList, pageable, qCommentEntity,
						reviewOn, true);
			}
			return page;
		}

	}

	@SuppressWarnings({ "rawtypes", "unchecked", "deprecation" })
	private Page<TxnLogEntity> getQueryDslResultPagable(QTxnLogEntity qtxnLogEntity, JPAQuery jpaQuery,
			Predicate[] predicateList, Pageable pageable, QCommentEntity qCommentEntity, Predicate reviewOn,
			boolean forReview) {
		List<TxnLogEntity> txnLogEntityList = getQueryDslResult(qtxnLogEntity, jpaQuery, predicateList, pageable,
				qCommentEntity, reviewOn, forReview);
		return (Page<TxnLogEntity>) JPAUtils.getPageObjectFromList(pageable, txnLogEntityList, 0);
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	private List<TxnLogEntity> getQueryDslResult(QTxnLogEntity qTxnLogEntity, JPAQuery jpaQuery,
			Predicate[] predicateList, Pageable pageable, QCommentEntity qCommentEntity, Predicate reviewOn,
			boolean forReview) {
		if (forReview) {
			jpaQuery.from(qTxnLogEntity).innerJoin(qCommentEntity).on(reviewOn).where(predicateList)
					.orderBy(getOrderByPredicate(qTxnLogEntity)).limit(pageable.getPageSize())
					.offset(pageable.getOffset());
		} else {
			jpaQuery.from(qTxnLogEntity).where(predicateList).orderBy(getOrderByPredicate(qTxnLogEntity))
					.limit(pageable.getPageSize()).offset(pageable.getOffset());
		}
		try {

			LOGGER.info("------ Record fetch stating --------------------");
			LOGGER.info("Query : " + jpaQuery.toString());
			List<TxnLogEntity> list = jpaQuery.fetch();
			LOGGER.info("------ Record fetch end --------------------");
			return list;
		} catch (Exception e) {
			LOGGER.error("error in Fetch Query:{}", ExceptionLog.printStackTraceToString(e));
			throw new RippsAdminException("Error in Fetch Query:Contact System-Admin");
		}
	}

	private Predicate getStatusPredicate(QTxnLogEntity qtxnLogEntity, String value) {
		Predicate statusPredicate;
		String processsingStatus = TxnLogMapper.getProcessingStatusFromUI(value);

		List<String> approvedStatusList = getApprovedStatusList();
		StringPath ipcPath = qtxnLogEntity.ipc;
		if (processsingStatus.equals(InternalProcessingCode.IN_PROCESS.toString())) {
			statusPredicate = ipcPath.eq(InternalProcessingCode.IN_PROCESS.toString());
		} else if (!(approvedStatusList.contains(processsingStatus))) {
			statusPredicate = ipcPath.notIn(getApprovedStatusList()).and(
					ipcPath.ne(InternalProcessingCode.IN_PROCESS.toString()).and(ipcPath.lower().notLike("%approve%")));

		}

		else {

			// It will search for APPROVED,DCC_TXN,STANDIN_APPROVED
			statusPredicate = ipcPath.in(getApprovedStatusList()).or(ipcPath.containsIgnoreCase("approve"));
		}
		return statusPredicate;
	}

	@SuppressWarnings("unused")
	@Override
	public ResponseWrapper findPagedReportTxnLogs(Map<String, Object> requestParamMap) {
		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		String[] filters = (String[]) requestParamMap.get(ParameterConstant.FILTERS);
		Predicate predicate = null;
		TxnLogDto txnLogDto = new TxnLogDto();
		Page<TxnLogEntity> txnLogPage = null;
		txnLogPage = getCustomReportFilter(filters, pageable);

		Long totalRecordscount;
		totalRecordscount = txnLogPage.getTotalElements();
		return JPAUtils.getResponseWrapperByPage(txnLogPage, totalRecordscount);
	}

	@SuppressWarnings({ "rawtypes", "unchecked", "deprecation" })
	@Override
	public Page<TxnLogEntity> getCustomReportFilter(String[] filters, Pageable pageable) {
		QTxnLogEntity qTxnLogEntity = QTxnLogEntity.txnLogEntity;
		Predicate datePredicate = null;
		Predicate merchantPredicate = null;
		Predicate devicePredicate = null;
		Predicate locationPredicate = null;
		Predicate merchantInsPredicate = null;
		String enType = null;
		if (filters != null) {
			for (String each : filters) {

				if (each.contains(":")) {
					String param = each.split(":")[0];
					String value = each.split(":")[1];
					if (param.equals("entityType")) {
						enType = each;

					}

					if (param.equals("entity")) {
						String v = enType.split(":")[1];
						if (v.equals("Merchant")) {
							String merchantCode = merchantRepo.getMerchantCodeById(Integer.parseInt(value));
							merchantPredicate = JPAPredicateHelper.getStringPredicate(qTxnLogEntity.merchantId,
									merchantCode);
						} else if (v.equals("Location")) {
							Location location = locationPersistenceHelper.findLocationById(Integer.parseInt(value));
							List<String> devices = jpaRepository.findDeviceCodeByLocation(location);
							locationPredicate = JPAPredicateHelper.getArrayPredicate(qTxnLogEntity.terminalId, devices);
						} else if (v.equals("Device")) {
							String deviceCode = deviceRepo.getDeviceCodeById(Integer.parseInt(value));
							devicePredicate = JPAPredicateHelper.getStringPredicate(qTxnLogEntity.terminalId,
									deviceCode);
						} else {
							MerchantInstitution merchantInstitution = institutionRepository
									.findById(Integer.parseInt(value)).orElse(null);
							List<String> merchantCodes = merchantPersistenceHelper
									.findCodeByMerchantInstitution(merchantInstitution);
							merchantInsPredicate = JPAPredicateHelper.getArrayPredicate(qTxnLogEntity.merchantId,
									merchantCodes);
						}
					}

					if (param.equals(PERIOD)) {
						String[] periods = value.split("-");
						if (!(StringUtil.isNotNullOrBlank(periods[0]) && StringUtil.isNotNullOrBlank(periods[1]))) {
							throw new RippsAdminException("'From Date' or 'To Date' cannot be empty");
						}
						datePredicate = getDatePredicate(qTxnLogEntity, value, false);
					}

				}

			}
		}

		Page<TxnLogEntity> page;
		JPAQuery jpaQuery = null;
		jpaQuery = new JPAQuery(entityManager);

		jpaQuery.from(qTxnLogEntity)
				.where(datePredicate, merchantPredicate, merchantInsPredicate, locationPredicate, devicePredicate)
				.orderBy(getOrderByPredicate(qTxnLogEntity)).limit(pageable.getPageSize()).offset(pageable.getOffset());

		List<TxnLogEntity> list = null;
		try {
			list = jpaQuery.fetch();

		}

		catch (Exception e) {
			LOGGER.error("findPagedTxnLogs: Error in getting paged data {}", ExceptionLog.printStackTraceToString(e));
			throw new RippsAdminException("findPagedTxnLogs: Error in getting paged data" + e.getMessage());
		}
		page = (Page<TxnLogEntity>) JPAUtils.getPageObjectFromList(pageable, list, jpaQuery.fetchCount());

		return page;

	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public List<TxnLogEntity> getAllReportFilter(String[] filters) {
		QTxnLogEntity qTxnLogEntity = QTxnLogEntity.txnLogEntity;
		Predicate datePredicate = null;
		Predicate merchantPredicate = null;
		Predicate devicePredicate = null;
		Predicate locationPredicate = null;
		Predicate merchantInsPredicate = null;

		String enType = null;
		if (filters != null) {
			for (String each : filters) {

				if (each.contains(":")) {
					String param = each.split(":")[0];
					String value = each.split(":")[1];
					if (param.equals("entityType")) {
						enType = each;

					}

					if (param.equals("entity")) {
						String v = enType.split(":")[1];
						if (v.equals("Merchant")) {
							String merchantCode = merchantRepo.getMerchantCodeById(Integer.parseInt(value));
							merchantPredicate = JPAPredicateHelper.getStringPredicate(qTxnLogEntity.merchantId,
									merchantCode);
						} else if (v.equals("Location")) {
							Location location = locationPersistenceHelper.findLocationById(Integer.parseInt(value));
							List<String> devices = jpaRepository.findDeviceCodeByLocation(location);
							locationPredicate = JPAPredicateHelper.getArrayPredicate(qTxnLogEntity.terminalId, devices);
						} else if (v.equals("Device")) {
							String deviceCode = deviceRepo.getDeviceCodeById(Integer.parseInt(value));
							devicePredicate = JPAPredicateHelper.getStringPredicate(qTxnLogEntity.terminalId,
									deviceCode);
						} else {
							MerchantInstitution merchantInstitution = institutionRepository
									.findById(Integer.parseInt(value)).orElse(null);
							List<String> merchantCodes = merchantPersistenceHelper
									.findCodeByMerchantInstitution(merchantInstitution);
							merchantInsPredicate = JPAPredicateHelper.getArrayPredicate(qTxnLogEntity.merchantId,
									merchantCodes);
						}
					}

					if (param.equals(PERIOD)) {
						datePredicate = getDatePredicate(qTxnLogEntity, value, false);
					}

				}

			}
		}

		JPAQuery jpaQuery = null;
		jpaQuery = new JPAQuery(entityManager);

		jpaQuery.from(qTxnLogEntity)
				.where(datePredicate, merchantPredicate, merchantInsPredicate, locationPredicate, devicePredicate)
				.orderBy(getOrderByPredicate(qTxnLogEntity)).limit(reportMaxSize);

		List<TxnLogEntity> list = null;
		try {
			list = jpaQuery.fetch();

		}

		catch (Exception e) {
			LOGGER.error("findPagedTxnLogs: Error in getting list {}", ExceptionLog.printStackTraceToString(e));
			throw new RippsAdminException("findPagedTxnLogs: Error in getting list  data" + e.getMessage());
		}

		return list;

	}

	@Override
	public Object[] getFollowUpTxn(Long id, String parentTxnID) {
		String sqlQuery = " select id,JSON_UNQUOTE(JSON_EXTRACT(TXN_DATA, '" + pathTxnType + "')) AS TXN_TYPE  "
				+ "from txn_log where id > " + id + " AND " + "JSON_UNQUOTE(JSON_EXTRACT(TXN_DATA, '" + pathParentTxnID
				+ "'))= '" + parentTxnID + "';";

		return JPAUtils.getObjectFromNativeQuery(entityManager, sqlQuery);

	}

	@Override
	public Object[] getFollowUpReversalTxn(Long id, String parentTxnID) {
		String sqlQuery = "select id,JSON_UNQUOTE(JSON_EXTRACT(TXN_DATA, '" + pathTxnType + "')) AS TXN_TYPE "
				+ " from txn_log where id > " + id + " AND " + " JSON_UNQUOTE(JSON_EXTRACT(TXN_DATA, '"
				+ pathParebtTxnIDReversal + "')) = '" + parentTxnID + "';";

		return JPAUtils.getObjectFromNativeQuery(entityManager, sqlQuery);

	}

	@Override
	public Object[] getFollowUpTxnAdvice(Long id, String txnId) {
		String sqlQuery = "select id,JSON_UNQUOTE(JSON_EXTRACT(TXN_DATA, '" + pathAdviceParentAdviceStatus
				+ "')) AS TXN_TYPE "
				+ " from txn_log where txn_recv_date_time >= (select txn_recv_date_time from txn_log where id=" + id
				+ ")  AND upper(ipc) like 'APPROVE%' AND " + " JSON_UNQUOTE(JSON_EXTRACT(TXN_DATA, '"
				+ pathAdviceParentTxnID + "')) = '" + txnId + "';";
		return JPAUtils.getObjectFromNativeQuery(entityManager, sqlQuery);
	}

	@Override
	public ResponseWrapper getSourceAcquirerIdCodeList(Pageable pageable, String[] filters) {
		String queryMain = GET_PAGED_ACQUIRER_LIST_QUERY;
		return SmartFilterQueryUtils.getFilteredDataResponseUsingMainQuery(entityManager, queryMain, null, pageable,
				filters);
	}

	@Override
	public ResponseWrapper getDeviceCodeList(Pageable pageable, String[] filters) {
		String queryMain = GET_PAGED_DEVICE_LIST_QUERY;
		return SmartFilterQueryUtils.getFilteredDataResponseUsingMainQuery(entityManager, queryMain, null, pageable,
				filters);
	}

	@Override
	public ResponseWrapper getDestinationEndpointList(Pageable pageable, String[] filters) {
		String queryMain = GET_PAGED_DESTINATION_ENDPOINT_LIST_QUERY;
		return SmartFilterQueryUtils.getFilteredDataResponseUsingMainQuery(entityManager, queryMain, null, pageable,
				filters);
	}

	@Override
	public ResponseWrapper getMerchantIdListList(Pageable pageable, String[] filters) {
		return SmartFilterQueryUtils.getFilteredDataUsingJsonQuery(entityManager, null, pageable, filters,
				"txnLog.merchantIdFilter");
	}
}
