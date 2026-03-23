package com.bnt.rest.repository.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import jakarta.annotation.PostConstruct;
import javax.jdo.annotations.Transactional;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.metamodel.EntityType;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.querydsl.core.types.Predicate;
import com.querydsl.jpa.impl.JPAQuery;
import com.bnt.common.ResponseWrapper;
import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.RippsUtility;
import com.bnt.constant.ParameterConstant;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.CountryDto;
import com.bnt.rest.entity.Country;
import com.bnt.rest.entity.QCountry;
import com.bnt.rest.jpa.repository.CountryPersistenceHelper;
import com.bnt.rest.repository.CountryRepository;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public class CountryRepositoryImpl implements CountryRepository {

	private static final Logger logger = LogManager.getLogger(CountryRepositoryImpl.class);

	@Autowired
	private CountryPersistenceHelper countryPersistenceHelper;

	@PersistenceContext
	private EntityManager entityManager;

	@PostConstruct
	public void setParam() {
		EntityType<?> entityType = JPAUtils.getEntityType(entityManager, Country.class);
		logger.debug("entityType..{}", entityType);
	}

	@Override
	public ResponseWrapper findAll(Map<String, Object> requestParamMap) {
		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		String[] filters = (String[]) requestParamMap.get(ParameterConstant.FILTERS);
		Page<Country> page = null;

		long totalCount;
		totalCount = countryPersistenceHelper.count();
		if (filters == null) {
			page = countryPersistenceHelper.findAll(pageable);
		} else {
			page = getFilterData(pageable, filters);
		}
		List<CountryDto> countryDtoList = new ArrayList<>();
		for (Country country : page.getContent()) {
			CountryDto countryDto = ObjectMapper.mapToDto(country, CountryDto.class);
			countryDto.setActive(RippsUtility.convertActiveToBoolean(country.getActive()));
			countryDtoList.add(countryDto);
		}
		ResponseWrapper pageJPAData = JPAUtils.getResponseWrapperByPage(page, totalCount);
		pageJPAData.setContent(countryDtoList);
		return pageJPAData;
	}

	@SuppressWarnings({ "unchecked", "deprecation" })
	private Page<Country> getFilterData(Pageable pageable, String[] filters) {
		QCountry mi = QCountry.country;
		Predicate lockedPredicate = null;
		Predicate countryNamePredicate = null;
		for (String each : filters) {
			String param = each.split(":")[0];
			String value = each.split(":")[1];
			if (param.equals("status")) {
				if (value.equals("1")) {
					lockedPredicate = mi.active.eq('1');
				} else {
					lockedPredicate = mi.active.eq('0');
				}
			}
			if (param.equals("countryName")) {
				countryNamePredicate = mi.countryName.eq(value);
			}
		}
		Page<Country> merchantInstitutionPage = null;
		JPAQuery<Country> jpaQuery = null;
		jpaQuery = new JPAQuery<>(entityManager);
		jpaQuery.from(mi).where(lockedPredicate, countryNamePredicate).limit(pageable.getPageSize())
				.offset(pageable.getOffset());
		List<Country> merchantInstitutionList = jpaQuery.fetch();
		merchantInstitutionPage = (Page<Country>) JPAUtils.getPageObjectFromList(pageable, merchantInstitutionList,
				jpaQuery.fetchCount());
		return merchantInstitutionPage;
	}

	@Override
	public List<Map<String, String>> findAll() {
		List<Map<String, String>> countryList = new ArrayList<>();
		this.countryPersistenceHelper.findAll().forEach(country -> {
			Map<String, String> countryMap = new HashMap<>();
			countryMap.put("id", country.getId().toString());
			countryMap.put("name", country.getCountryName());
			countryMap.put("code", country.getCode());
			countryMap.put("shortCode", country.getShortCode());
			countryList.add(countryMap);
		});
		return countryList;
	}

	@Override
	public Country findOne(int i) {
		Optional<Country> optional = countryPersistenceHelper.findById(i);
		if (optional.isPresent()) {
			return optional.get();
		}
		return null;
	}

	@Override
	@Transactional
	public void deleteById(int id) {
		Optional<Country> optional = countryPersistenceHelper.findById(id);
		if (optional.isPresent()) {
			Country country = optional.get();
			countryPersistenceHelper.save(country);
		}
	}

	@Override
	public Country findByCountryName(String name) {
		return countryPersistenceHelper.findByCountryName(name);
	}
}
