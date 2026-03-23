package com.bnt.rest.repository.impl;

import java.util.List;

import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.metamodel.EntityType;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.querydsl.core.types.Predicate;
import com.querydsl.jpa.impl.JPAQuery;
import com.bnt.common.util.JPAUtils;
import com.bnt.rest.entity.EntityRecord;
import com.bnt.rest.entity.Location;
import com.bnt.rest.entity.QLocation;
import com.bnt.rest.entity.QLocationDetail;
import com.bnt.rest.repository.EntityRecordRepository;

/**************************
 * @author vaibhav.shejol *
 **************************/

@SuppressWarnings("deprecation")
public class EntityRecordImpl implements EntityRecordRepository {

	private static final Logger logger = LogManager.getLogger(EntityRecordImpl.class);

	@PersistenceContext
	private EntityManager entityManager;

	@PostConstruct
	public void setParam() {
		EntityType<?> entityType = JPAUtils.getEntityType(entityManager, Location.class);
		logger.debug("entityType..{}", entityType);
	}

	@Override
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Page<EntityRecord> getFilterData(Pageable pageable, String[] filters) {
		QLocation mi = QLocation.location;
		QLocationDetail mid = QLocationDetail.locationDetail;
		Predicate lockedPredicate = null;
		Predicate addressPredicate = null;
		Predicate institutionsPredicate = null;
		Predicate merchantPredicate = null;
		for (String each : filters) {
			if (each.contains(":")) {
				String param = each.split(":")[0];
				String value = each.split(":")[1];
				if (param.equals("status")) {
					if (value.equals("1")) {
						lockedPredicate = mi.locked.eq('0');
					} else {
						lockedPredicate = mi.locked.eq('1');
					}
				}
			}
		}
		Predicate deletePredicate = mi.deleted.eq('0');
		Page<EntityRecord> merchantInstitutionPage = null;
		JPAQuery jpaQuery = null;
		jpaQuery = new JPAQuery(entityManager);
		jpaQuery.from(mi).innerJoin(mi.locationDetail, mid)
				.where(lockedPredicate, addressPredicate, institutionsPredicate, merchantPredicate, deletePredicate)
				.limit(pageable.getPageSize()).offset(pageable.getOffset());
		List<EntityRecord> merchantInstitutionList = jpaQuery.fetch();
		merchantInstitutionPage = (Page<EntityRecord>) JPAUtils.getPageObjectFromList(pageable, merchantInstitutionList,
				jpaQuery.fetchCount());
		return merchantInstitutionPage;
	}
}
