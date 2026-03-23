package com.bnt.rest.repository.impl;

import java.sql.Timestamp;
import java.util.List;
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
import com.bnt.common.util.JPAPredicateHelper;
import com.bnt.common.util.JPAUtils;
import com.bnt.multi.database.ReadOnlyRepository;
import com.bnt.rest.entity.Location;
import com.bnt.rest.entity.QLocation;
import com.bnt.rest.entity.QLocationDetail;
import com.bnt.rest.jpa.repository.LocationPersistenceHelper;
import com.bnt.rest.repository.LocationRepository;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
@ReadOnlyRepository
public class LocationRepositoryImpl implements LocationRepository {

	private static final Logger logger = LogManager.getLogger(LocationRepositoryImpl.class);

	@PersistenceContext
	private EntityManager entityManager;

	@PostConstruct
	public void setParam() {
		EntityType<?> entityType = JPAUtils.getEntityType(entityManager, Location.class);
		logger.debug("entityType..{}", entityType);
	}

	@Autowired
	private LocationPersistenceHelper locationPersistenceHelper;

	@Override
	@SuppressWarnings({ "rawtypes", "unchecked", "deprecation" })
	public Page<Location> getFilterData(Pageable pageable, String[] filters) {
		QLocation qLocation = QLocation.location;
		QLocationDetail qLocationDetail = QLocationDetail.locationDetail;
		Predicate lockedPredicate = null;
		Predicate addressPredicate = null;
		Predicate institutionsPredicate = null;
		Predicate merchantPredicate = null;
		Predicate namePredicate = null;
		Predicate expiryOnPredicate = null;
		Timestamp currentTimeStamp = new Timestamp(System.currentTimeMillis());
		for (String each : filters) {
			if (each.contains(":")) {
				String param = each.split(":")[0];
				String value = each.split(":")[1];
				if (param.equals("status")) {
					lockedPredicate = JPAPredicateHelper.getStatusPredicate(qLocation.locked, value);
					expiryOnPredicate = JPAPredicateHelper.getExpiryPredicate(value, qLocation.expiryOn,
							currentTimeStamp);
				}
				addressPredicate = getFilterData1(qLocationDetail, addressPredicate, param, value);

				getFilterData2(param);

				merchantPredicate = getFilterData3(qLocation, merchantPredicate, param, value);
				if (param.equals("name")) {
					namePredicate = qLocation.name.like(value + '%');
				}
			}
		}
		Predicate deletePredicate = qLocation.deleted.eq('0');
		Page<Location> merchantInstitutionPage = null;
		JPAQuery jpaQuery = null;
		jpaQuery = new JPAQuery(entityManager);
		jpaQuery.from(qLocation).innerJoin(qLocation.locationDetail, qLocationDetail)
				.where(lockedPredicate, addressPredicate, institutionsPredicate, merchantPredicate, deletePredicate,
						namePredicate, expiryOnPredicate)
				.limit(pageable.getPageSize()).offset(pageable.getOffset());
		List<Location> merchantInstitutionList = jpaQuery.fetch();
		merchantInstitutionPage = (Page<Location>) JPAUtils.getPageObjectFromList(pageable, merchantInstitutionList,
				jpaQuery.fetchCount());
		return merchantInstitutionPage;
	}

	private Predicate getFilterData3(QLocation qLocation, Predicate merchantPredicate, String param, String value) {
		if (param.equals("merchant")) {
			merchantPredicate = qLocation.merchant.id.eq(Integer.parseInt(value));
		}
		return merchantPredicate;
	}

	private void getFilterData2(String param) {
		if (param.equals("merchantGroup")) {
			/**
			 * institutionsPredicate =
			 * qLocation.merchantInstitution.id.eq(Integer.parseInt(value));
			 */
		}
	}

	private Predicate getFilterData1(QLocationDetail qLocationDetail, Predicate addressPredicate, String param,
			String value) {
		if (param.equals("address")) {
			addressPredicate = qLocationDetail.city.like(value);
		}
		return addressPredicate;
	}

	@Override
	public String getLocationCodeById(Integer id) {

		Optional<Location> optional = locationPersistenceHelper.findById(id);

		if (optional.isPresent()) {
			Location location = optional.get();
			String locationCode = null;
			if (location != null) {
				locationCode = location.getCode();
			}

			return locationCode;
		}
		return null;
	}
}
