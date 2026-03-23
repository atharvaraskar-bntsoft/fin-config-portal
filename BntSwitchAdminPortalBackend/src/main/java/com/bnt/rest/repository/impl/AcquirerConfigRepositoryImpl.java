package com.bnt.rest.repository.impl;

import java.util.Map;

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

import com.bnt.common.ResponseWrapper;
import com.bnt.common.util.JPAUtils;
import com.bnt.constant.ParameterConstant;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.AcquirerIdConfigDto;
import com.bnt.rest.dto.CountryDto;
import com.bnt.rest.entity.AcquirerIdConfig;
import com.bnt.rest.jpa.repository.AcquirerConfigPersistenceHelper;
import com.bnt.rest.repository.AcquirerConfigRepository;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public class AcquirerConfigRepositoryImpl implements AcquirerConfigRepository {

	private static final Logger logger = LogManager.getLogger(AcquirerConfigRepositoryImpl.class);

	@Autowired
	AcquirerConfigPersistenceHelper acquirerConfigPersistenceHelper;

	@PersistenceContext
	private EntityManager entityManager;

	@PostConstruct
	public void setParam() {
		EntityType<?> entityType = JPAUtils.getEntityType(entityManager, AcquirerIdConfig.class);
		logger.debug("entityType...{}", entityType);
	}

	@Override
	@Transactional
	public ResponseWrapper findAllAcquirer(Map<String, Object> requestParamMap) {
		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		String[] filters = (String[]) requestParamMap.get(ParameterConstant.FILTERS);

		Page<AcquirerIdConfig> acquirerIdConfigPage = null;

		if (filters == null) {
			acquirerIdConfigPage = acquirerConfigPersistenceHelper.findAcquirerIdConfigByDeleted('0', pageable);
		}

		if (acquirerIdConfigPage != null) {
			ResponseWrapper pageJPAData = new ResponseWrapper();
			pageJPAData.setPageNo(acquirerIdConfigPage.getNumber() + 1);
			pageJPAData.setTotalRecords(acquirerIdConfigPage.getTotalElements());
			pageJPAData.setContent(acquirerIdConfigPage.getContent().stream().map(value -> {
				AcquirerIdConfigDto dto = ObjectMapper.mapToDto(value, AcquirerIdConfigDto.class);
				CountryDto countryDto = new CountryDto();
				countryDto.setId(value.getCountry().getId());
				countryDto.setCountryName(value.getCountry().getCountryName());
				dto.setCountry(countryDto);
				return dto;
			}).toList());
			return pageJPAData;
		}
		return null;
	}

	@Override
	public AcquirerIdConfig findOne(int id) {
		return acquirerConfigPersistenceHelper.findById(id).orElse(null);
	}

	@Override
	public Integer acquirerIdConfig(AcquirerIdConfig acquirerIdConfigId) {
		return acquirerConfigPersistenceHelper.save(acquirerIdConfigId).getId();
	}

	@Override
	public AcquirerIdConfig findByCode(String code) {
		return acquirerConfigPersistenceHelper.findAcquirerIdConfigByCode(code);
	}

}
