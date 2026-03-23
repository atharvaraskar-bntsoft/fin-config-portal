package com.bnt.rest.repository.impl;

import java.util.ArrayList;
import java.util.HashMap;
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

import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.RippsUtility;
import com.bnt.common.util.exception.RippsAdminRestException;
import com.bnt.constant.ParameterConstant;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.CountryStateDto;
import com.bnt.rest.entity.CountryState;
import com.bnt.rest.entity.QCountry;
import com.bnt.rest.entity.QCountryState;
import com.bnt.rest.entity.QCurrency;
import com.bnt.rest.jpa.repository.CountryStatePersistenceHelper;
import com.bnt.rest.repository.CountryStateRepository;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public class CountryStateRepositoryImpl implements CountryStateRepository {

	private static final Logger logger = LogManager.getLogger(CountryStateRepositoryImpl.class);

	@Autowired
	private CountryStatePersistenceHelper countryStatePersistenceHelper;

	@PersistenceContext
	private EntityManager entityManager;

	@PostConstruct
	public void setParam() {
		EntityType<?> entityType = JPAUtils.getEntityType(entityManager, CountryState.class);
		logger.debug("entityType..{}", entityType);
	}

	@Override
	public ResponseWrapper findPagedCountryStates(Map<String, Object> requestParamMap) throws RippsAdminRestException {
		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		String[] filters = (String[]) requestParamMap.get(ParameterConstant.FILTERS);
		Page<CountryState> page = null;

		if (filters == null) {
			page = findActiveCountries('0', pageable);
		} else {
			page = getFilterData(pageable, filters);
		}

		List<CountryStateDto> countryDtoList = new ArrayList<>();
		for (CountryState country : page.getContent()) {
			CountryStateDto countryDto = ObjectMapper.mapToDto(country, CountryStateDto.class);
			countryDto.setActive(RippsUtility.convertActiveToBoolean(country.getActive()));
			countryDtoList.add(countryDto);
		}
		ResponseWrapper pageJPAData = JPAUtils.getResponseWrapperByPage(page, countryStatePersistenceHelper.count());
		pageJPAData.setContent(countryDtoList);
		return pageJPAData;
	}

	@SuppressWarnings({ "unused", "rawtypes", "unchecked", "static-access", "deprecation" })
	private Page<CountryState> findActiveCountries(char c, Pageable pageable) {
		QCountry qCountry = QCountry.country;
		QCurrency qCurrency = QCurrency.currency;
		QCountryState qCountryState = QCountryState.countryState;
		Predicate countryDeletePredicate = null;
		Predicate countrystateDeletePredicate = null;
		List<CountryState> countryList = null;
		Page<CountryState> countryStatePage = null;

		JPAQuery jpaQuery = null;

		// if the corresponding country of country state is deleted then that
		// record is not to be fetched at all in the country state.
		countrystateDeletePredicate = qCountryState.countryState.deleted.eq('0');
		jpaQuery = new JPAQuery(entityManager);
		jpaQuery.from(qCountryState).where(countrystateDeletePredicate).limit(pageable.getPageSize())
				.offset(pageable.getOffset());
		countryList = jpaQuery.fetch();
		return (Page<CountryState>) JPAUtils.getPageObjectFromList(pageable, countryList, jpaQuery.fetchCount());
	}

	@SuppressWarnings({ "unchecked", "deprecation", "rawtypes" })
	private Page<CountryState> getFilterData(Pageable pageable, String[] filters) {
		QCountryState mi = QCountryState.countryState;
		Predicate lockedPredicate = null;
		Predicate stateNamePredicate = null;
		BooleanExpression countryIdExpression = null;

		BooleanExpression countryDeletedExpression = null;

		Predicate countryPredicate = null;
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
			if (param.equals("country")) {
				countryIdExpression = mi.country.id.eq(Integer.parseInt(value));
				countryPredicate = countryIdExpression.and(countryDeletedExpression);

			}
			if (param.equals("stateName")) {
				stateNamePredicate = QCountryState.countryState.stateName.like(value + '%');
			}
		}

		Page<CountryState> merchantInstitutionPage = null;
		JPAQuery jpaQuery = null;
		jpaQuery = new JPAQuery<Object>(entityManager);
		jpaQuery.from(mi).where(lockedPredicate, countryPredicate, stateNamePredicate).limit(pageable.getPageSize())
				.offset(pageable.getOffset());
		List<CountryState> merchantInstitutionList = jpaQuery.fetch();
		merchantInstitutionPage = (Page<CountryState>) JPAUtils.getPageObjectFromList(pageable, merchantInstitutionList,
				jpaQuery.fetchCount());
		return merchantInstitutionPage;
	}

	@Override
	public List<Map<String, String>> findAll() {
		List<Map<String, String>> countryList = new ArrayList<>();
		this.countryStatePersistenceHelper.findAll().forEach(country -> {
			Map<String, String> countryMap = new HashMap<>();
			countryMap.put("id", country.getId().toString());
			countryMap.put("name", country.getStateName());
			countryList.add(countryMap);
		});
		return countryList;
	}

	@Override
	public CountryState findOne(int id) {
		Optional<CountryState> optional = countryStatePersistenceHelper.findById(id);

		if (optional.isPresent()) {
			return optional.get();
		}
		return null;
	}

	@Override
	public CountryState findByStateName(String stateName) {
		return countryStatePersistenceHelper.findByStateName(stateName);
	}
}
