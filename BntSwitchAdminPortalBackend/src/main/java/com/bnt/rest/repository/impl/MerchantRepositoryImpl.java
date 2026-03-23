package com.bnt.rest.repository.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.querydsl.core.types.Predicate;
import com.querydsl.jpa.impl.JPAQuery;
import com.bnt.common.util.JPAPredicateHelper;
import com.bnt.common.util.JPAUtils;
import com.bnt.multi.database.ReadOnlyRepository;
import com.bnt.rest.entity.LookupValue;
import com.bnt.rest.entity.Merchant;
import com.bnt.rest.entity.QMerchant;
import com.bnt.rest.entity.QMerchantDetail;
import com.bnt.rest.entity.QMerchantProfile;
import com.bnt.rest.jpa.repository.LookupValuePersistenceHelper;
import com.bnt.rest.jpa.repository.MerchantPersistenceHelper;
import com.bnt.rest.repository.MerchantRepository;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
@ReadOnlyRepository
public class MerchantRepositoryImpl implements MerchantRepository {

	@PersistenceContext
	public EntityManager entityManager;

	@Autowired
	private LookupValuePersistenceHelper lookupValuePersistenceHelper;

	@Autowired
	private MerchantPersistenceHelper merchantPersistenceHelper;

	@Override
	public Merchant findOne(int id) {
		Optional<Merchant> optional = merchantPersistenceHelper.findById(id);

		if (optional.isPresent()) {
			return optional.get();
		}
		return null;
	}

	@Override
	public Page<Merchant> findFilterData(Pageable pageable, String[] filters) {
		QMerchant merchant = QMerchant.merchant;
		QMerchantDetail merchantDetail = QMerchantDetail.merchantDetail;

		QMerchantProfile merchantProfile = QMerchantProfile.merchantProfile;
		Predicate lockedPredicate = null;
		Predicate addressPredicate = null;
		Predicate countryPredicate = null;
		Predicate institutionsPredicate = null;
		/** List<Merchant> merchantList; */
		Predicate servicePredicates = null;
		List<String> serviceCodeList = new ArrayList<>();
		Predicate partialAuthPredicate = null;
		Predicate namePredicate = null;
		for (String each : filters) {
			if (each.contains(":")) {
				String param = each.split(":")[0];
				String value = each.split(":")[1];
				if (param.equals("status")) {
					lockedPredicate = JPAPredicateHelper.getStatusPredicate(merchant.locked, value);
				}
				if (param.equals("address")) {
					addressPredicate = merchantDetail.city.like(value);
				}
				if (param.equals("country")) {
					countryPredicate = merchantDetail.country.countryName.eq(value);
				}

				if (param.equals("merchantGroup")) {
					institutionsPredicate = merchant.merchantInstitution.id.eq(Integer.parseInt(value));
				}
				if (param.contains("options")) {

					String[] services = value.split("\\s+");
					for (String eachServiceId : services) {
						if (eachServiceId.equals("0")) {
							partialAuthPredicate = merchantProfile.partialAuth.in("1", "Y");
							continue;
						}
						Integer serviceId = Integer.parseInt(eachServiceId);
						LookupValue lookupValue = lookupValuePersistenceHelper.findById(serviceId).get();
						String service = lookupValue.getValue();
						serviceCodeList.add(service);
						servicePredicates = merchantProfile.services.like("%" + service + "%").and(servicePredicates);
					}
				}
				if (param.equals("name")) {
					namePredicate = merchant.name.like(value + '%');
				}
			}
		}

		return getMerchantInstitutionPageDetails(merchant, merchantDetail, merchantProfile, lockedPredicate,
				addressPredicate, countryPredicate, institutionsPredicate, partialAuthPredicate, namePredicate,
				pageable, servicePredicates);
		/**
		 * Predicate deletePredicate = merchant.deleted.eq('0'); Page<Merchant>
		 * merchantInstitutionPage = null; JPAQuery jpaQuery = null; jpaQuery = new
		 * JPAQuery(entityManager);
		 * 
		 * jpaQuery.from(merchant).innerJoin(merchant.merchantDetail, merchantDetail)
		 * .leftJoin(merchant.merchantProfile, merchantProfile)
		 * .where(partialAuthPredicate, lockedPredicate, addressPredicate,
		 * countryPredicate, institutionsPredicate, deletePredicate, servicePredicates,
		 * namePredicate) .limit(pageable.getPageSize()).offset(pageable.getOffset());
		 * 
		 * merchantList = jpaQuery.fetch();
		 * 
		 * merchantInstitutionPage = (Page<Merchant>)
		 * JPAUtils.getPageObjectFromList(pageable, merchantList,
		 * jpaQuery.fetchCount());
		 * 
		 * return merchantInstitutionPage;
		 */
	}

	@Override
	public long countWithDeleted(char deleted) {
		QMerchant merchant = QMerchant.merchant;
		Predicate deletePredicate = merchant.deleted.eq(deleted);
		return merchantPersistenceHelper.count(deletePredicate);
	}

	@Override
	public String getMerchantCodeById(Integer id) {

		Optional<Merchant> optional = merchantPersistenceHelper.findById(id);
		if (optional.isPresent()) {
			Merchant merchant = optional.get();
			String merchantCode = null;
			if (merchant != null) {
				merchantCode = merchant.getCode();
			}

			return merchantCode;
		}
		return null;

	}

	@SuppressWarnings({ "unchecked", "deprecation", "rawtypes" })
	private Page<Merchant> getMerchantInstitutionPageDetails(QMerchant merchant, QMerchantDetail merchantDetail,
			QMerchantProfile merchantProfile, Predicate lockedPredicate, Predicate addressPredicate,
			Predicate countryPredicate, Predicate institutionsPredicate, Predicate partialAuthPredicate,
			Predicate namePredicate, Pageable pageable, Predicate servicePredicates) {
		List<Merchant> merchantList;
		Predicate deletePredicate = merchant.deleted.eq('0');
		Page<Merchant> merchantInstitutionPage = null;
		JPAQuery jpaQuery = null;
		jpaQuery = new JPAQuery(entityManager);

		jpaQuery.from(merchant).innerJoin(merchant.merchantDetail, merchantDetail)
				.leftJoin(merchant.merchantProfile, merchantProfile)
				.where(partialAuthPredicate, lockedPredicate, addressPredicate, countryPredicate, institutionsPredicate,
						deletePredicate, servicePredicates, namePredicate)
				.limit(pageable.getPageSize()).offset(pageable.getOffset());

		merchantList = jpaQuery.fetch();

		merchantInstitutionPage = (Page<Merchant>) JPAUtils.getPageObjectFromList(pageable, merchantList,
				jpaQuery.fetchCount());

		return merchantInstitutionPage;
	}
}
