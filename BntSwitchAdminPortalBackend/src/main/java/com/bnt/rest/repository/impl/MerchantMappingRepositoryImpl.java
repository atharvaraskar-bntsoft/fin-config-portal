package com.bnt.rest.repository.impl;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.metamodel.EntityType;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.querydsl.core.types.Predicate;
import com.querydsl.jpa.impl.JPAQuery;
import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.ReflectionUtil;
import com.bnt.common.util.RippsUtility;
import com.bnt.common.util.StringUtil;
import com.bnt.common.util.exception.ExceptionLog;
import com.bnt.constant.IgnoreCopyConstants;
import com.bnt.constant.ParameterConstant;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.DtoWrapper;
import com.bnt.rest.dto.MerchantCodeMappingDto;
import com.bnt.rest.entity.AcquirerIdConfig;
import com.bnt.rest.entity.Device;
import com.bnt.rest.entity.Location;
import com.bnt.rest.entity.Merchant;
import com.bnt.rest.entity.MerchantCodeMapping;
import com.bnt.rest.entity.ProcessorAdapter;
import com.bnt.rest.entity.QMerchantCodeMapping;
import com.bnt.rest.jpa.repository.MerchantMappingPersistenceHelper;
import com.bnt.rest.jpa.repository.ProcessorAdapterPersistenceHelper;
import com.bnt.rest.repository.MerchantMappingRepository;
import com.bnt.rest.service.ProcessorAdapterService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public class MerchantMappingRepositoryImpl implements MerchantMappingRepository {

	private static final String ISSUE_IN_SOURCE_MERCHANT = "Issue in Source Merchant";

	private static final String SOURCE_MERCHANT_IS_MANDATORY = "Source Merchant is mandatory";

	private static final Logger logger = LogManager.getLogger(MerchantMappingRepositoryImpl.class);

	@Autowired
	MerchantMappingPersistenceHelper helper;

	@PersistenceContext
	public EntityManager entityManager;

	@SuppressWarnings("unused")
	private EntityType<?> entityType;

	@Autowired
	private ProcessorAdapterPersistenceHelper processHelper;

	@Autowired
	private ProcessorAdapterService processorService;

	@PostConstruct
	public void setParam() {
		entityType = JPAUtils.getEntityType(entityManager, MerchantCodeMapping.class);
	}

	@Override
	@Transactional
	public ResponseWrapper findMerchantMapping(Map<String, Object> requestParamMap) {

		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		String[] filters = (String[]) requestParamMap.get(ParameterConstant.FILTERS);

		Page<MerchantCodeMapping> merchantMappingPage = null;

		if (null == filters) {
			merchantMappingPage = helper.findMerchantMappingByDeleted('0', pageable);
		} else {
			merchantMappingPage = getFilterData(pageable, filters);
		}
		long count = countWithDeleted('0');
		ResponseWrapper pageJPAData = JPAUtils.getResponseWrapperByPage(merchantMappingPage, count);
		pageJPAData.setContent(getDtoList(merchantMappingPage.getContent()));
		return pageJPAData;
	}

	@SuppressWarnings({ "rawtypes", "unchecked", "deprecation" })
	public Page<MerchantCodeMapping> getFilterData(Pageable pageable, String[] filters) {
		// functions:1, 2
		QMerchantCodeMapping mi = QMerchantCodeMapping.merchantCodeMapping;
		Predicate lockedPredicate = null;
		Predicate processorPredicate = null;
		String regex = "[0-9]+";
		for (String each : filters) {
			String param = each.split(":")[0];
			String value = each.split(":")[1];
			if (param.equals("status")) {
				lockedPredicate = setLockedPredicate(mi, value);
			}

			if (param.equals("processorList")) {
				processorPredicate = setProcessorPredicate(mi, regex, value);
			}

		}
		Predicate deletePredicate = mi.deleted.eq('0');
		Page<MerchantCodeMapping> merchantInstitutionPage = null;
		JPAQuery jpaQuery = null;
		jpaQuery = new JPAQuery(entityManager);
		jpaQuery.from(mi).where(lockedPredicate, processorPredicate, deletePredicate).limit(pageable.getPageSize())
				.offset(pageable.getOffset());
		List<MerchantCodeMapping> merchantInstitutionList = jpaQuery.fetch();
		merchantInstitutionPage = (Page<MerchantCodeMapping>) JPAUtils.getPageObjectFromList(pageable,
				merchantInstitutionList, jpaQuery.fetchCount());
		return merchantInstitutionPage;
	}

	private Predicate setProcessorPredicate(QMerchantCodeMapping mi, String regex, String value) {
		Predicate processorPredicate;
		String processorId;
		if (value.matches(regex)) {
			processorPredicate = mi.processorId.id.like(value);
		} else {
			processorId = processorService.getIdFromCode(value);
			if (null != processorId) {
				processorPredicate = mi.processorId.id.like(processorId);
			} else {
				processorPredicate = mi.processorId.id.like("0");
			}
		}
		return processorPredicate;
	}

	private Predicate setLockedPredicate(QMerchantCodeMapping mi, String value) {
		Predicate lockedPredicate;
		if (value.equals("1")) {
			lockedPredicate = mi.active.eq('1');
		} else {
			lockedPredicate = mi.active.eq('0');
		}
		return lockedPredicate;
	}

	@Override
	public MerchantCodeMapping findOne(int id) {
		Optional<MerchantCodeMapping> mcm = helper.findById(id);
		if (mcm.isPresent())
			return mcm.get();

		return null;
	}

	private List<MerchantCodeMappingDto> getDtoList(List<MerchantCodeMapping> mappingList) {
		List<MerchantCodeMappingDto> dtoList = new ArrayList<>();
		for (MerchantCodeMapping entity : mappingList) {
			dtoList.add(populateMappingDto(entity));
		}
		return dtoList;
	}

	private MerchantCodeMappingDto populateMappingDto(MerchantCodeMapping entity) {
		MerchantCodeMappingDto dto = ObjectMapper.mapToDto(entity, MerchantCodeMappingDto.class);
		DtoWrapper processorId = new DtoWrapper();
		processorId.setId(entity.getProcessorId().getId() + "");
		processorId.setName(entity.getProcessorId().getName());
		dto.setProcessorId(processorId);
		return dto;
	}

	@Override
	public void deleteById(int id) {
		Optional<MerchantCodeMapping> merchantCode = helper.findById(id);
		if (merchantCode.isPresent()) {
			MerchantCodeMapping mcm = merchantCode.get();
			mcm.setDeleted('1');
			mcm.setUpdatedOn(new Timestamp(new Date().getTime()));
			helper.save(mcm);
		}
	}

	@Override
	@Transactional
	public Integer saveMerchantCodeMapping(MerchantCodeMappingDto mappingDto) {
		MerchantCodeMapping mapping = setMerchantCodeMapping(mappingDto);
		return helper.save(mapping).getId();
	}

	private MerchantCodeMapping setMerchantCodeMapping(MerchantCodeMappingDto mappingDto) {
		String regex = "^[a-zA-Z0-9_]*$";
		MerchantCodeMapping mapping = new MerchantCodeMapping();
		if (mappingDto.getProcessorId() != null) {
			Optional<ProcessorAdapter> processorAdapter = processHelper
					.findById(Integer.parseInt(mappingDto.getProcessorId().getId()));
			if (processorAdapter.isPresent())
				mapping.setProcessorId(processorAdapter.get());
		} else {
			throw new RippsAdminException("Processor is mandatory");
		}

		List<String> ignoreCopyAuditField = Arrays.asList(IgnoreCopyConstants.IGNORE_COPY_AUDITFIELDS_CREATE);

		if (StringUtil.isNotNullOrBlank(mappingDto.getDestinationAcquirer())) {
			setDestinationAcquirer(mappingDto, regex, mapping, ignoreCopyAuditField);
		} else if (StringUtil.isNotNullOrBlank(mappingDto.getDestinationMerchant())) {
			setDestinationMerchant(mappingDto, regex, mapping, ignoreCopyAuditField);
		} else if (StringUtil.isNotNullOrBlank(mappingDto.getDestinationLocation())) {
			setDestinationLocation(mappingDto, regex, mapping, ignoreCopyAuditField);
		} else if (StringUtil.isNotNullOrBlank(mappingDto.getDestinationDevice())) {
			setDestinationDevice(mappingDto, regex, mapping, ignoreCopyAuditField);
		}

		mapping.setActive(RippsUtility.convertBooleanToCharZeroOne(mappingDto.getActive()));
		/** mapping.setCreatedOn(new Timestamp(new Date().getTime())); **/
		/** mapping.setCreatedBy(1);// check how to fetch current user ID **/
		mapping.setDeleted('0');
		return mapping;
	}

	private void setDestinationDevice(MerchantCodeMappingDto mappingDto, String regex, MerchantCodeMapping mapping,
			List<String> ignoreCopyAuditField) {
		if (mappingDto.getSourceMerchantId() != null) {
			Merchant merchant = new Merchant();
			try {
				ReflectionUtil.copy(merchant, mappingDto.getSourceMerchantId(), ignoreCopyAuditField);
			} catch (Exception e) {
				logger.error(ExceptionLog.printStackTraceToString(e));
				throw new RippsAdminException(ISSUE_IN_SOURCE_MERCHANT);
			}
			mapping.setSourceMerchantId(merchant);
		} else {
			throw new RippsAdminException(SOURCE_MERCHANT_IS_MANDATORY);
		}
		if (mappingDto.getSourceLocationId() != null) {
			Location location = new Location();
			try {
				ReflectionUtil.copy(location, mappingDto.getSourceLocationId(), ignoreCopyAuditField);
			} catch (Exception e) {
				logger.error(ExceptionLog.printStackTraceToString(e));
				throw new RippsAdminException("Issue in Source Location");
			}
			mapping.setSourceLocationId(location);
		} else {
			throw new RippsAdminException("Source Location is mandatory");
		}
		if (mappingDto.getSourceDeviceId() != null) {
			Device device = new Device();
			try {
				ReflectionUtil.copy(device, mappingDto.getSourceDeviceId(), ignoreCopyAuditField);
			} catch (Exception e) {
				logger.error(ExceptionLog.printStackTraceToString(e));
				throw new RippsAdminException("Issue in Source Device");
			}
			mapping.setSourceDeviceId(device);
			if (StringUtil.validateText(mappingDto.getDestinationDevice(), regex)) {
				mapping.setDestinationDevice(mappingDto.getDestinationDevice());
			} else {
				throw new RippsAdminException("Destination Device is invalid");
			}
		} else {
			throw new RippsAdminException("Issue in Source Device is mandatory");
		}
	}

	private void setDestinationLocation(MerchantCodeMappingDto mappingDto, String regex, MerchantCodeMapping mapping,
			List<String> ignoreCopyAuditField) {
		if (mappingDto.getSourceMerchantId() != null) {
			Merchant merchant = new Merchant();
			try {
				ReflectionUtil.copy(merchant, mappingDto.getSourceMerchantId(), ignoreCopyAuditField);
			} catch (Exception e) {
				logger.error(ExceptionLog.printStackTraceToString(e));
				throw new RippsAdminException(ISSUE_IN_SOURCE_MERCHANT);
			}
			mapping.setSourceMerchantId(merchant);
		} else {
			throw new RippsAdminException(SOURCE_MERCHANT_IS_MANDATORY);
		}
		if (mappingDto.getSourceLocationId() != null) {
			Location location = new Location();
			try {
				ReflectionUtil.copy(location, mappingDto.getSourceLocationId(), ignoreCopyAuditField);
			} catch (Exception e) {
				logger.error(ExceptionLog.printStackTraceToString(e));
				throw new RippsAdminException("Issue in Source Location");
			}
			mapping.setSourceLocationId(location);
			if (StringUtil.validateText(mappingDto.getDestinationLocation(), regex)) {
				mapping.setDestinationLocation(mappingDto.getDestinationLocation());
			} else {
				throw new RippsAdminException("Destination Location is invalid");
			}
		} else {
			throw new RippsAdminException("Source Location is mandatory");
		}
	}

	private void setDestinationMerchant(MerchantCodeMappingDto mappingDto, String regex, MerchantCodeMapping mapping,
			List<String> ignoreCopyAuditField) {
		if (mappingDto.getSourceMerchantId() != null) {
			Merchant merchant = new Merchant();
			try {
				ReflectionUtil.copy(merchant, mappingDto.getSourceMerchantId(), ignoreCopyAuditField);
			} catch (Exception e) {
				logger.error(ExceptionLog.printStackTraceToString(e));
				throw new RippsAdminException(ISSUE_IN_SOURCE_MERCHANT);
			}
			mapping.setSourceMerchantId(merchant);
			if (StringUtil.validateText(mappingDto.getDestinationMerchant(), regex)) {
				mapping.setDestinationMerchant(mappingDto.getDestinationMerchant());
			} else {
				throw new RippsAdminException("Destination Merchant is invalid");
			}
		} else {
			throw new RippsAdminException(SOURCE_MERCHANT_IS_MANDATORY);
		}
	}

	private void setDestinationAcquirer(MerchantCodeMappingDto mappingDto, String regex, MerchantCodeMapping mapping,
			List<String> ignoreCopyAuditField) {
		if (mappingDto.getSourceAcquirerId() != null) {
			AcquirerIdConfig acquirerIdConfig = new AcquirerIdConfig();
			try {
				ReflectionUtil.copy(acquirerIdConfig, mappingDto.getSourceAcquirerId(), ignoreCopyAuditField);
			} catch (Exception e) {
				logger.error(ExceptionLog.printStackTraceToString(e));
				throw new RippsAdminException("Issue in Source Acquirer");
			}
			mapping.setSourceAcquirerId(acquirerIdConfig);
			if (StringUtil.validateText(mappingDto.getDestinationAcquirer(), regex)) {
				mapping.setDestinationAcquirer(mappingDto.getDestinationAcquirer());
			} else {
				throw new RippsAdminException("Destination Acquirer is invalid");
			}
		} else {
			throw new RippsAdminException("Source Acquirer is mandatory");
		}
	}

	@Override
	@Transactional
	public void updateMerchantCodeMapping(MerchantCodeMapping mapping) {
		helper.save(mapping);
	}

	public long countWithDeleted(Character deleted) {
		QMerchantCodeMapping mi = QMerchantCodeMapping.merchantCodeMapping;
		Predicate deletePredicate = mi.deleted.eq(deleted);
		return helper.count(deletePredicate);
	}
}
