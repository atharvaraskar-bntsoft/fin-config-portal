package com.bnt.rest.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.jdo.annotations.Transactional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.ReflectionUtil;
import com.bnt.common.util.RippsUtility;
import com.bnt.common.util.exception.DisplayMessageException;
import com.bnt.common.util.exception.ExceptionLog;
import com.bnt.constant.ParameterConstant;
import com.bnt.rest.dto.IdAndNameStringWrapper;
import com.bnt.rest.dto.VelocityLimitsDto;
import com.bnt.rest.entity.Currency;
import com.bnt.rest.entity.Device;
import com.bnt.rest.entity.Location;
import com.bnt.rest.entity.Merchant;
import com.bnt.rest.entity.MerchantInstitution;
import com.bnt.rest.entity.TransactionVelocity;
import com.bnt.rest.jpa.repository.CurrencyPersistenceHelper;
import com.bnt.rest.jpa.repository.DevicePersistenceRepository;
import com.bnt.rest.jpa.repository.LocationPersistenceHelper;
import com.bnt.rest.jpa.repository.MerchantInstitutionPersistenceHelper;
import com.bnt.rest.jpa.repository.MerchantPersistenceHelper;
import com.bnt.rest.jpa.repository.VelocityLimitsPersistenceHelper;
import com.bnt.rest.repository.VelocityLimitRepository;
import com.bnt.rest.service.LookupValueService;
import com.bnt.rest.service.VelocityLimitsService;
import com.bnt.service.mapper.ListMapper;
import com.bnt.service.mapper.TransactionVelocityMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class VelocityLimitsServiceImpl implements VelocityLimitsService {

	private static final String TRANSACTION_VELOCITY_WITH_PROVIDED_TRANSACTION_TYPE_ALREADY_EXIST = "Transaction Velocity with provided transaction type already exist";

	private static final String LIMIT_COUNT_ERROR_MESSAGE = "Only whole numbers are allowed.";

	private static final String LIMIT_AMOUNT_ERROR_MESSAGE = "Only positive numbers are allowed.";

	private static final Logger logger = LogManager.getLogger(VelocityLimitsServiceImpl.class);

	@Autowired
	private VelocityLimitsPersistenceHelper velocityRepository;

	@Autowired
	private VelocityLimitRepository velocityCustomRepo;

	@Autowired
	private MerchantInstitutionPersistenceHelper institutionRepository;

	@Autowired
	private MerchantPersistenceHelper merchantRepository;

	@Autowired
	private LocationPersistenceHelper locationRepository;

	@Autowired
	private DevicePersistenceRepository deviceRepository;

	@Autowired
	private CurrencyPersistenceHelper currencyRepository;

	@Autowired
	private LookupValueService lookUpValueService;

	public static final String MERCHANTINSTITUTION = "MerchantInstitution";

	public static final String MERCHANT = "Merchant";

	public static final String LOCATION = "Location";

	public static final String DEVICE = "Device";

	@Override
	public ResponseWrapper getvelocityLimitsServiceList(Map<String, Object> requestParamMap) {
		logger.info("inside getvelocityLimitsServiceList");
		String sortColumn = (String) requestParamMap.get(ParameterConstant.SORT_COLUMN);
		if (sortColumn != null) {
			if (sortColumn.equalsIgnoreCase("date")) {
				requestParamMap.put(ParameterConstant.SORT_COLUMN, null);
			}
			if (sortColumn.equalsIgnoreCase("limit_to")) {
				requestParamMap.put(ParameterConstant.SORT_COLUMN, "velocityentity");
			}
		}

		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		String[] filters = (String[]) requestParamMap.get(ParameterConstant.FILTERS);
		Page<TransactionVelocity> velocityLimitsPage = null;

		if (Optional.ofNullable(filters).isPresent()) {
			velocityLimitsPage = velocityCustomRepo.getFilterData(pageable, filters);
		} else {
			velocityLimitsPage = velocityRepository.findTransactionVelocityByDeleted('0', pageable);
		}
		Page<TransactionVelocity> count = velocityRepository.findTransactionVelocityByDeleted('0', null);
		List<VelocityLimitsDto> list = new ArrayList<>();
		VelocityLimitsDto velocityLimitsDto = null;
		for (TransactionVelocity transactionVelocity : velocityLimitsPage.getContent()) {
			velocityLimitsDto = TransactionVelocityMapper.mapVelocityLimitsToDto(transactionVelocity);
			list.add(velocityLimitsDto);
		}
		ResponseWrapper pageJPAData = JPAUtils.getResponseWrapperByPage(velocityLimitsPage, count.getContent().size());
		pageJPAData.setContent(list);

		return pageJPAData;
	}

	@Override
	public ResponseWrapper addVelocityLimits(VelocityLimitsDto velocityLimitsDto, String requestToken) {
		logger.info("Inside addVelocityLimits");

		VelocityLimitsDto savedDto = null;
		TransactionVelocity txnVelocity = new TransactionVelocity();
		try {

			if ((null != velocityLimitsDto.getTransactionTypes())) {
				txnVelocity.setTxnType(velocityLimitsDto.getTransactionTypes().getName());
			} else {
				throw new DisplayMessageException("Please Select Transaction Type", HttpStatus.ALREADY_REPORTED);
			}

			validateTransactionVelocity(velocityLimitsDto);
			txnVelocity = setTransactionVelocity(velocityLimitsDto, requestToken, txnVelocity);
			TransactionVelocity savedTxnVelocity = velocityRepository.save(txnVelocity);
			savedDto = TransactionVelocityMapper.mapVelocityLimitsToDto(savedTxnVelocity);
		} catch (RippsAdminException e) {
			logger.error(ExceptionLog.printStackTraceToString(e));
			throw new DisplayMessageException(e.getMessage(), HttpStatus.ALREADY_REPORTED);
		} catch (RuntimeException rte) {
			logger.error(ExceptionLog.printStackTraceToString(rte));
			throw new DisplayMessageException(rte.getMessage(), HttpStatus.ALREADY_REPORTED);
		} catch (Exception e) {
			logger.error(ExceptionLog.printStackTraceToString(e));
			throw new DisplayMessageException("Issue in save: Contact Admin", HttpStatus.ALREADY_REPORTED);
		}
		ResponseWrapper pageJPAData = new ResponseWrapper();
		pageJPAData.setContent(savedDto);
		return pageJPAData;
	}

	private TransactionVelocity setTransactionVelocity(VelocityLimitsDto velocityLimitsDto, String requestToken,
			TransactionVelocity txnVelocity) {
		logger.debug("inside getvelocityLimitsServiceList : requestToken :{}", requestToken);
		/**
		 * AuthSession authSession =
		 * authSessionRepository.findAuthSessionByToken(requestToken);
		 */
		try {
			ReflectionUtil.copy(txnVelocity, velocityLimitsDto);
		} catch (Exception e) {
			throw new RippsAdminException("Exception in copying Dto to entity");
		}
		String velocityEntity = null;
		if (TransactionVelocityMapper.MERCHANTINSTITUTION.equalsIgnoreCase(velocityLimitsDto.getType().getName())) {
			setMerchantInstitution(velocityLimitsDto, txnVelocity);
			txnVelocity.setMerchantId(null);
			txnVelocity.setLocationId(null);
			txnVelocity.setDeviceId(null);
			if (null != velocityRepository.findVelocityByTransactionType(txnVelocity.getMerchantInstitutionId().getId(),
					txnVelocity.getTxnType(), null, null, null)) {
				throw new RippsAdminException(TRANSACTION_VELOCITY_WITH_PROVIDED_TRANSACTION_TYPE_ALREADY_EXIST);
			}
			velocityEntity = TransactionVelocityMapper.getVelocityEntity(txnVelocity.getMerchantInstitutionId(),
					velocityLimitsDto.getType().getName());
		} else if (TransactionVelocityMapper.MERCHANT.equalsIgnoreCase(velocityLimitsDto.getType().getName())) {
			setMerchantInstitution(velocityLimitsDto, txnVelocity);
			setMerchant(velocityLimitsDto, txnVelocity);
			txnVelocity.setLocationId(null);
			txnVelocity.setDeviceId(null);
			if (null != velocityRepository.findVelocityByTransactionType(txnVelocity.getMerchantInstitutionId().getId(),
					txnVelocity.getTxnType(), txnVelocity.getMerchantId().getId(), null, null)) {
				throw new RippsAdminException(TRANSACTION_VELOCITY_WITH_PROVIDED_TRANSACTION_TYPE_ALREADY_EXIST);
			}
			velocityEntity = TransactionVelocityMapper.getVelocityEntity(txnVelocity.getMerchantId(),
					velocityLimitsDto.getType().getName());
		} else if (TransactionVelocityMapper.LOCATION.equalsIgnoreCase(velocityLimitsDto.getType().getName())) {
			setMerchantInstitution(velocityLimitsDto, txnVelocity);
			setMerchant(velocityLimitsDto, txnVelocity);
			setLocation(velocityLimitsDto, txnVelocity);
			txnVelocity.setDeviceId(null);
			if (null != velocityRepository.findVelocityByTransactionType(txnVelocity.getMerchantInstitutionId().getId(),
					txnVelocity.getTxnType(), txnVelocity.getMerchantId().getId(), txnVelocity.getLocationId().getId(),
					null)) {
				throw new RippsAdminException(TRANSACTION_VELOCITY_WITH_PROVIDED_TRANSACTION_TYPE_ALREADY_EXIST);
			}
			velocityEntity = TransactionVelocityMapper.getVelocityEntity(txnVelocity.getLocationId(),
					velocityLimitsDto.getType().getName());
		} else if (TransactionVelocityMapper.DEVICE.equalsIgnoreCase(velocityLimitsDto.getType().getName())) {
			setMerchantInstitution(velocityLimitsDto, txnVelocity);
			setMerchant(velocityLimitsDto, txnVelocity);
			setLocation(velocityLimitsDto, txnVelocity);
			setDevice(velocityLimitsDto, txnVelocity);
			if (null != velocityRepository.findVelocityByTransactionType(txnVelocity.getMerchantInstitutionId().getId(),
					txnVelocity.getTxnType(), txnVelocity.getMerchantId().getId(), txnVelocity.getLocationId().getId(),
					txnVelocity.getDeviceId().getId())) {
				throw new RippsAdminException(TRANSACTION_VELOCITY_WITH_PROVIDED_TRANSACTION_TYPE_ALREADY_EXIST);
			}
			velocityEntity = TransactionVelocityMapper.getVelocityEntity(txnVelocity.getDeviceId(),
					velocityLimitsDto.getType().getName());
		}
		txnVelocity.setVelocityEntity(velocityEntity);
		setCurrency(velocityLimitsDto, txnVelocity);
		txnVelocity.setDeleted('0');
		TransactionVelocityMapper.setOtherDetails(velocityLimitsDto, txnVelocity);
		return txnVelocity;
	}

	@Override
	public VelocityLimitsDto findVelocityLimitsById(int id) {
		TransactionVelocity velocity = velocityRepository.findById(id).orElse(null);
		return TransactionVelocityMapper.mapVelocityLimitsToDto(velocity);
	}

	@Override
	@Transactional
	public ResponseWrapper updateVelocityLimits(VelocityLimitsDto velocityLimitsDto, String requestToken, int id) {
		logger.info("Inside updateVelocityLimits");
		VelocityLimitsDto savedDto = null;
		try {
			TransactionVelocity txnVelocity = velocityRepository.findById(id).orElse(null);
			if (null != velocityLimitsDto.getTransactionTypes() && txnVelocity != null) {
				txnVelocity.setTxnType(velocityLimitsDto.getTransactionTypes().getName());
			} else {
				throw new DisplayMessageException("Please Select Transaction Type", HttpStatus.ALREADY_REPORTED);
			}
			validateTransactionVelocity(velocityLimitsDto);
			txnVelocity.setLocked(velocityLimitsDto.getLocked());
			setCurrency(velocityLimitsDto, txnVelocity);
			TransactionVelocityMapper.setOtherDetails(velocityLimitsDto, txnVelocity);
			TransactionVelocity savedTxnVelocity = velocityRepository.save(txnVelocity);
			savedDto = TransactionVelocityMapper.mapVelocityLimitsToDto(savedTxnVelocity);
		} catch (RippsAdminException e) {
			throw new DisplayMessageException(e.getMessage(), HttpStatus.ALREADY_REPORTED);
		} catch (RuntimeException rte) {
			logger.error(ExceptionLog.printStackTraceToString(rte));
			throw new DisplayMessageException(rte.getMessage(), HttpStatus.ALREADY_REPORTED);
		} catch (Exception e) {
			throw new DisplayMessageException("Issue in save: Contact Admin", HttpStatus.ALREADY_REPORTED);
		}
		ResponseWrapper pageJPAData = new ResponseWrapper();
		pageJPAData.setContent(savedDto);
		return pageJPAData;
	}

	private List<IdAndNameStringWrapper> getApplyLimit() {
		List<IdAndNameStringWrapper> list = new ArrayList<>();
		list.add(RippsUtility.getWrapper("INSTITUTION_GROUP", TransactionVelocityMapper.MERCHANTINSTITUTION));
		list.add(RippsUtility.getWrapper("INSTITUTION", TransactionVelocityMapper.MERCHANT));
		list.add(RippsUtility.getWrapper("LOCATION", TransactionVelocityMapper.LOCATION));
		list.add(RippsUtility.getWrapper("DEVICE", TransactionVelocityMapper.DEVICE));
		return list;
	}

	@Override
	public Map<String, Object> getFilterData() {
		Map<String, Object> map = new HashMap<>();
		map.put("status", ListMapper.getStatus());
		map.put("applyLimit", getApplyLimit());
		map.put("txnType", lookUpValueService.getTxnTypes());

		return map;
	}

	@Override
	public void deleteById(TransactionVelocity velocity) {
		velocity.setDeleted('1');
		velocity.setUpdatedOn(RippsUtility.getCurrentTime());
		velocityCustomRepo.saveTransactionVelocity(velocity);
	}

	@Override
	public TransactionVelocity findTransactionVelocityById(int id) {
		return this.velocityCustomRepo.findOne(id);
	}

	private void setCurrency(VelocityLimitsDto velocityLimitsDto, TransactionVelocity txnVelocity) {
		logger.info("setCurrency");
		Currency baseCurrencyId = null;
		if (RippsUtility.isNotNull(velocityLimitsDto.getBaseCurrencyId())) {
			baseCurrencyId = currencyRepository.findById(velocityLimitsDto.getBaseCurrencyId().getId()).orElse(null);
		} else {
			throw new RippsAdminException("Currency can't be blank");
		}
		if (baseCurrencyId != null) {
			txnVelocity.setBaseCurrencyId(baseCurrencyId);
		} else {
			throw new RippsAdminException("Invalid Base Currency");
		}
	}

	private void setMerchantInstitution(VelocityLimitsDto velocityLimitsDto, TransactionVelocity txnVelocity) {
		logger.info("setMerchantInstitution");
		MerchantInstitution merchantInstitution = null;
		if (RippsUtility.isNotNull(velocityLimitsDto.getMerchantInstitutionId())) {
			merchantInstitution = institutionRepository.findById(velocityLimitsDto.getMerchantInstitutionId().getId())
					.orElse(null);
		}
		if (merchantInstitution != null) {
			txnVelocity.setMerchantInstitutionId(merchantInstitution);
		} else {
			throw new RippsAdminException("Invalid Merchant Group");
		}
	}

	private void setMerchant(VelocityLimitsDto velocityLimitsDto, TransactionVelocity txnVelocity) {
		logger.info("setMerchant");
		Merchant merchant = null;
		if (RippsUtility.isNotNull(velocityLimitsDto.getMerchantId())) {
			merchant = merchantRepository.findById(velocityLimitsDto.getMerchantId().getId()).orElse(null);
		}
		if (merchant != null) {
			txnVelocity.setMerchantId(merchant);
		} else {
			throw new RippsAdminException("Invalid Merchant");
		}
	}

	private void setLocation(VelocityLimitsDto velocityLimitsDto, TransactionVelocity txnVelocity) {
		logger.info("setLocation");
		Location location = null;
		if (RippsUtility.isNotNull(velocityLimitsDto.getLocationId())) {
			location = locationRepository.findById(velocityLimitsDto.getLocationId().getId()).orElse(null);
		}
		if (location != null) {
			txnVelocity.setLocationId(location);
		} else {
			throw new RippsAdminException("Invalid Location");
		}
	}

	private void setDevice(VelocityLimitsDto velocityLimitsDto, TransactionVelocity txnVelocity) {
		logger.info("setDevice");
		Device device = null;
		if (RippsUtility.isNotNull(velocityLimitsDto.getDeviceId())) {
			device = deviceRepository.findById(velocityLimitsDto.getDeviceId().getId()).orElse(null);
		}
		if (device != null) {
			txnVelocity.setDeviceId(device);
		} else {
			throw new RippsAdminException("Invalid Device");
		}
	}

	private void validateTransactionVelocity(VelocityLimitsDto velocityLimitsDto) {
		logger.error("inside validateTransactionVelocity... ");
		if (null != velocityLimitsDto.getLimitCount()) {
			if (null != velocityLimitsDto.getLimitCount().getPerDay()
					&& Integer.valueOf(velocityLimitsDto.getLimitCount().getPerDay()) < 0) {
				throw new IllegalArgumentException(LIMIT_COUNT_ERROR_MESSAGE);
			} else if (null != velocityLimitsDto.getLimitCount().getPerMonth()
					&& Integer.valueOf(velocityLimitsDto.getLimitCount().getPerMonth()) < 0) {
				throw new IllegalArgumentException(LIMIT_COUNT_ERROR_MESSAGE);
			} else if (null != velocityLimitsDto.getLimitCount().getPerTime()
					&& Integer.valueOf(velocityLimitsDto.getLimitCount().getPerTime()) < 0) {
				throw new IllegalArgumentException(LIMIT_COUNT_ERROR_MESSAGE);
			}
		}

		if (null != velocityLimitsDto.getLimitAmount()) {
			if (null != velocityLimitsDto.getLimitAmount().getPerDay()
					&& Double.parseDouble(velocityLimitsDto.getLimitAmount().getPerDay()) < 0) {
				throw new IllegalArgumentException(LIMIT_AMOUNT_ERROR_MESSAGE);
			} else if (null != velocityLimitsDto.getLimitAmount().getPerMonth()
					&& Double.parseDouble(velocityLimitsDto.getLimitAmount().getPerMonth()) < 0) {
				throw new IllegalArgumentException(LIMIT_AMOUNT_ERROR_MESSAGE);
			} else if (null != velocityLimitsDto.getLimitAmount().getPerTime()
					&& Double.parseDouble(velocityLimitsDto.getLimitAmount().getPerTime()) < 0) {
				throw new IllegalArgumentException(LIMIT_AMOUNT_ERROR_MESSAGE);
			} else if (null != velocityLimitsDto.getLimitAmount().getSingleTransaction()
					&& Double.parseDouble(velocityLimitsDto.getLimitAmount().getSingleTransaction()) < 0) {
				throw new IllegalArgumentException(LIMIT_AMOUNT_ERROR_MESSAGE);
			}
		}
	}
}
