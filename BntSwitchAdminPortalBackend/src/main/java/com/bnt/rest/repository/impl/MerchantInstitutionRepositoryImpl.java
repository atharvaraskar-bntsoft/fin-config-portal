package com.bnt.rest.repository.impl;

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
import com.bnt.rest.entity.MerchantInstitution;
import com.bnt.rest.entity.QMerchantInstitution;
import com.bnt.rest.entity.QMerchantInstitutionDetail;
import com.bnt.rest.jpa.repository.MerchantInstitutionPersistenceHelper;
import com.bnt.rest.repository.MerchantInstitutionRepository;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
@ReadOnlyRepository
public class MerchantInstitutionRepositoryImpl implements MerchantInstitutionRepository {

	@Autowired
	private MerchantInstitutionPersistenceHelper jpaRepository;

	@PersistenceContext
	public EntityManager entityManager;

	@Override
	@SuppressWarnings({ "rawtypes", "unchecked", "deprecation" })
	public Page<MerchantInstitution> getFilterData(Pageable pageable, String[] filters) {
		QMerchantInstitution mi = QMerchantInstitution.merchantInstitution;
		QMerchantInstitutionDetail mid = QMerchantInstitutionDetail.merchantInstitutionDetail;
		Predicate lockedPredicate = null;
		Predicate addressPredicate = null;
		Predicate namePredicate = null;
		for (String each : filters) {
			if (each.contains(":")) {
				String param = each.split(":")[0];
				String value = each.split(":")[1];
				if (param.equals("status")) {
					lockedPredicate = JPAPredicateHelper.getStatusPredicate(mi.locked, value);
				}
				if (param.equals("address")) {
					addressPredicate = mid.city.like(value);
				}
				if (param.equals("name")) {
					namePredicate = QMerchantInstitution.merchantInstitution.name.like(value + '%');
				}
			}
		}
		Predicate deletePredicate = mi.deleted.eq('0');

		Page<MerchantInstitution> merchantInstitutionPage = null;
		JPAQuery jpaQuery = null;
		jpaQuery = new JPAQuery(entityManager);
		jpaQuery.from(mi).innerJoin(mi.merchantInstitutionDetail, mid)
				.where(lockedPredicate, addressPredicate, deletePredicate, namePredicate).limit(pageable.getPageSize())
				.offset(pageable.getOffset());
		List<MerchantInstitution> merchantInstitutionList = jpaQuery.fetch();
		merchantInstitutionPage = (Page<MerchantInstitution>) JPAUtils.getPageObjectFromList(pageable,
				merchantInstitutionList, jpaQuery.fetchCount());
		return merchantInstitutionPage;
	}

	@Override
	public long countWithDeleted(Character deleted) {
		QMerchantInstitution mi = QMerchantInstitution.merchantInstitution;
		Predicate deletePredicate = mi.deleted.eq(deleted);
		return jpaRepository.count(deletePredicate);
	}

	@Override
	public MerchantInstitution findOne(int id) {
		Optional<MerchantInstitution> optional = jpaRepository.findById(id);
		if (optional.isPresent()) {
			return optional.get();
		}
		return null;
	}

	@Override
	public String getMerchantInstitutionCodeById(Integer id) {

		Optional<MerchantInstitution> optional = jpaRepository.findById(id);
		if (optional.isPresent()) {
			MerchantInstitution merchantInstituion = optional.get();
			String miCode = null;
			if (merchantInstituion != null) {
				miCode = merchantInstituion.getCode();
			}
			return miCode;
		}
		return null;
	}
}
