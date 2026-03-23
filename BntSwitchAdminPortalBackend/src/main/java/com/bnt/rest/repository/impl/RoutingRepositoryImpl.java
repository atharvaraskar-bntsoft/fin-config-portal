package com.bnt.rest.repository.impl;

import java.util.List;

import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.persistence.metamodel.EntityType;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.querydsl.core.types.Predicate;
import com.querydsl.jpa.impl.JPAQuery;
import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.StringUtil;
import com.bnt.rest.entity.ConfiguredRoutes;
import com.bnt.rest.entity.QRouting;
import com.bnt.rest.entity.Routing;
import com.bnt.rest.entity.RoutingVersion;
import com.bnt.rest.jpa.repository.RoutingVersionHelper;
import com.bnt.rest.repository.RoutingRepository;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public class RoutingRepositoryImpl implements RoutingRepository {

	private static final Logger logger = LogManager.getLogger(RoutingRepositoryImpl.class);

	private static final String SERVICE = "service";

	@PersistenceContext
	private EntityManager entityManager;

	@Autowired
	private RoutingVersionHelper routingVersionJpaHelper;

	@PostConstruct
	public void setParam() {
		EntityType<?> entityType = JPAUtils.getEntityType(entityManager, Routing.class);
		logger.debug("entityType..{}", entityType);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public Long deleteConfiguredRoutes(RoutingVersion routingVersion) {
		List<ConfiguredRoutes> list = routingVersion.getConfiguredRoutes();
		for (ConfiguredRoutes configuredRoutes : list) {
			String query = "DELETE FROM ConfiguredRoutes e WHERE e.id = :id";
			Query q = entityManager.createQuery(query);
			q.setParameter("id", configuredRoutes.getId());
			q.executeUpdate();
		}
		return 1L;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public Long deleteVersion(Integer id, RoutingVersion routingVersion) {
		deleteConfiguredRoutes(routingVersion);
		String query = "DELETE FROM RoutingVersion e WHERE e.id = :id";
		Query q = entityManager.createQuery(query);
		q.setParameter("id", id);
		q.executeUpdate();
		return 1L;
	}

	@Override
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public List<Routing> getFilterData(String[] filters, String routeType) {
		QRouting mi = QRouting.routing;
		Predicate servicePredicate = null;
		Predicate namePredicate = null;
		Predicate ruleTypePredicate = null;

		if (filters != null) {
			for (String each : filters) {
				if (each.contains(":")) {
					String param = each.split(":")[0];
					String value = each.split(":")[1];
					if (param.equals(SERVICE)) {
						servicePredicate = mi.routetypevalue.eq(value);
					}

					else if (param.equals("ruletype")) {

						ruleTypePredicate = mi.ruletype.eq(value);
					}

					else if (param.equals("name")) {
						namePredicate = mi.name.eq(value);
					}
				}
			}
		}

		Predicate routeTypePredicate = null;
		if (!(StringUtil.isEmptyOrNull(routeType)) && SERVICE.equals(routeType)) {
			routeTypePredicate = mi.routetype.eq(routeType);
		} else {
			routeTypePredicate = mi.routetype.ne(SERVICE);
		}
		JPAQuery jpaQuery = null;
		jpaQuery = new JPAQuery(entityManager);
		jpaQuery.from(mi).where(routeTypePredicate, servicePredicate, namePredicate, ruleTypePredicate);
		return jpaQuery.fetch();
	}

	@Override
	public List<RoutingVersion> findAllNotinDeployedComponent() {
		return routingVersionJpaHelper.findAllNotinDeployedComponent();
	}

	@Override
	public List<Object[]> findAllNotinDeployedComponentNew() {
		return routingVersionJpaHelper.findAllNotinDeployedComponentNew();
	}

	@Override
	@SuppressWarnings({ "rawtypes", "unchecked", "deprecation" })
	public Page<Routing> getFilterData(String[] filters, String routeType, Pageable pageable) {
		QRouting mi = QRouting.routing;
		Predicate servicePredicate = null;
		Predicate namePredicate = null;
		Predicate ruleTypePredicate = null;

		if (filters != null) {
			for (String each : filters) {
				if (each.contains(":")) {
					String param = each.split(":")[0];
					String value = each.split(":")[1];
					if (param.equals(SERVICE)) {
						servicePredicate = mi.routetypevalue.eq(value);
					}

					else if (param.equals("ruletype")) {

						ruleTypePredicate = mi.ruletype.eq(value);
					}

					else if (param.equals("name")) {
						namePredicate = mi.name.eq(value);
					}
				}
			}
		}

		Predicate routeTypePredicate = null;
		if (!(StringUtil.isEmptyOrNull(routeType)) && SERVICE.equals(routeType)) {
			routeTypePredicate = mi.routetype.eq(routeType);
		} else {
			routeTypePredicate = mi.routetype.ne(SERVICE);
		}
		JPAQuery jpaQuery = null;
		jpaQuery = new JPAQuery(entityManager);
		jpaQuery.from(mi).where(routeTypePredicate, servicePredicate, namePredicate, ruleTypePredicate)
				.limit(pageable.getPageSize()).offset(pageable.getOffset());
		List<Routing> routingList = jpaQuery.fetch();

		return (Page<Routing>) JPAUtils.getPageObjectFromList(pageable, routingList, jpaQuery.fetchCount());
	}
}
