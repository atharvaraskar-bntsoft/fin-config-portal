package com.bnt.rest.repository.impl;

import java.util.List;

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
import com.bnt.common.util.JPAUtils;
import com.bnt.rest.entity.QTransactionVelocity;
import com.bnt.rest.entity.TransactionVelocity;
import com.bnt.rest.jpa.repository.VelocityLimitsPersistenceHelper;
import com.bnt.rest.repository.VelocityLimitRepository;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public class VelocityLimitRepositoryImpl implements VelocityLimitRepository {

	private static final Logger logger = LogManager.getLogger(VelocityLimitRepositoryImpl.class);

	@Autowired
	private VelocityLimitsPersistenceHelper jpaRepository;

	@PersistenceContext
	public EntityManager entityManager;

	@PostConstruct
	public void setParam() {
		EntityType<?> entityType = JPAUtils.getEntityType(entityManager, TransactionVelocity.class);
		logger.debug("entityType..{}", entityType);
	}

	// [limit_to:institution, transaction_type:1, status:0]
	@Override
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Page<TransactionVelocity> getFilterData(Pageable pageable, String[] filters) {
		QTransactionVelocity mi = QTransactionVelocity.transactionVelocity;
		Predicate lockedPredicate = null;
		Predicate limitTo = null;
		Predicate transactionType = null;
		String regex = "[0-9]+";
		for (String each : filters) {
			if (each.contains(":")) {
				String param = each.split(":")[0];
				String value = each.split(":")[1];
				lockedPredicate = getFilterData1(mi, lockedPredicate, param, value);
				if (param.equals("applyLimit")) {
					value = getFilterData2(value);
					limitTo = mi.velocityEntity.likeIgnoreCase(value + "%");
					if (value.matches(regex))
						limitTo = mi.velocityEntity.likeIgnoreCase("%" + value);
				}
				if (param.equals("txnType")) {
					transactionType = mi.txnType.likeIgnoreCase(value + "%");
				}
			}
		}
		Predicate deletePredicate = mi.deleted.eq('0');

		Page<TransactionVelocity> merchantInstitutionPage = null;
		JPAQuery jpaQuery = null;
		jpaQuery = new JPAQuery(entityManager);
		jpaQuery.from(mi).where(lockedPredicate, limitTo, transactionType, deletePredicate)
				.limit(pageable.getPageSize()).offset(pageable.getOffset());
		List<TransactionVelocity> merchantInstitutionList = jpaQuery.fetch();
		merchantInstitutionPage = (Page<TransactionVelocity>) JPAUtils.getPageObjectFromList(pageable,
				merchantInstitutionList, jpaQuery.fetchCount());
		return merchantInstitutionPage;
	}

	private String getFilterData2(String value) {
		if (value.equals("Merchant")) {
			value = "Merchant:";
		} else if (value.equals("MerchantInstitution")) {
			value = "MerchantInstitution:";
		}
		return value;
	}

	private Predicate getFilterData1(QTransactionVelocity mi, Predicate lockedPredicate, String param, String value) {
		if (param.equals("status")) {
			if (value.equals("1")) {
				lockedPredicate = mi.locked.eq('0');
			} else {
				lockedPredicate = mi.locked.eq('1');
			}
		}
		return lockedPredicate;
	}

	@Override
	public long countWithDeleted(char deleted) {
		QTransactionVelocity mi = QTransactionVelocity.transactionVelocity;
		Predicate deletePredicate = mi.deleted.eq(deleted);
		return jpaRepository.count(deletePredicate);
	}

	@Override
	public TransactionVelocity saveTransactionVelocity(TransactionVelocity velocity) {
		return jpaRepository.save(velocity);
	}

	@Override
	public TransactionVelocity findOne(int id) {
		return jpaRepository.findById(id).orElse(null);
	}

}
