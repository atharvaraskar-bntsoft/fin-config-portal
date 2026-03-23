package com.bnt.rest.repository.impl;

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
import com.querydsl.jpa.impl.JPAQuery;
import com.bnt.common.ResponseWrapper;
import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.exception.RippsAdminRestException;
import com.bnt.constant.ParameterConstant;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.CurrencyDto;
import com.bnt.rest.entity.Currency;
import com.bnt.rest.entity.QCurrency;
import com.bnt.rest.jpa.repository.CurrencyPersistenceHelper;
import com.bnt.rest.repository.CurrencyRepository;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public class CurrencyRepositoryImpl implements CurrencyRepository {

	private static final Logger logger = LogManager.getLogger(CurrencyRepositoryImpl.class);

	@Autowired
	private CurrencyPersistenceHelper currencyPersistenceHelper;

	@PersistenceContext
	private EntityManager entityManager;

	@PostConstruct
	public void setParam() {
		EntityType<?> entityType = JPAUtils.getEntityType(entityManager, Currency.class);
		logger.debug("entityType..{}", entityType);
	}

	@Override
	public ResponseWrapper findPagedCurrencies(Map<String, Object> requestParamMap) throws RippsAdminRestException {

		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		String[] filters = (String[]) requestParamMap.get(ParameterConstant.FILTERS);
		Page<Currency> userPage = null;
		if (filters == null) {
			userPage = currencyPersistenceHelper.findCurrencyByDeleted('0', pageable);
		} else {
			userPage = getFilterData(pageable, filters);
		}
		ResponseWrapper pageJPAData = JPAUtils.getResponseWrapperByPage(userPage, currencyPersistenceHelper.count());
		pageJPAData.setContent(ObjectMapper.mapListObjects(userPage.getContent(), CurrencyDto.class));
		return pageJPAData;

	}

	@SuppressWarnings("unchecked")
	private Page<Currency> getFilterData(Pageable pageable, String[] filters) {
		QCurrency mi = QCurrency.currency;
		Predicate lockedPredicate = null;
		Predicate currencyNamePredicate = null;
		Predicate codePredicate = null;
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
			if (param.equals("currencyName")) {
				currencyNamePredicate = QCurrency.currency.currencyName.eq(value);
			}
			if (param.equals("code")) {
				codePredicate = QCurrency.currency.code.eq(value);
			}

		}
		Page<Currency> merchantInstitutionPage = null;
		JPAQuery<Currency> jpaQuery = null;
		jpaQuery = new JPAQuery<>(entityManager);
		jpaQuery.from(mi).where(lockedPredicate, currencyNamePredicate, codePredicate).limit(pageable.getPageSize())
				.offset(pageable.getOffset());
		List<Currency> merchantInstitutionList = jpaQuery.fetch();
		merchantInstitutionPage = (Page<Currency>) JPAUtils.getPageObjectFromList(pageable, merchantInstitutionList, 0);
		return merchantInstitutionPage;
	}

	@Override
	public String getCurrencyCodeById(Integer id) {

		Optional<Currency> optional = currencyPersistenceHelper.findById(id);
		if (optional.isPresent()) {
			Currency currency = optional.get();
			String currencyCode = null;
			if (currency != null) {
				currencyCode = currency.getCode();
			}
			return currencyCode;
		}
		return null;
	}
}
