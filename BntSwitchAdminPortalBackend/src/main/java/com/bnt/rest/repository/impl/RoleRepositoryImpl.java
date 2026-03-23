package com.bnt.rest.repository.impl;

import java.util.List;

import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.persistence.metamodel.EntityType;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.querydsl.core.types.Predicate;
import com.querydsl.jpa.impl.JPAQuery;
import com.bnt.common.util.JPAUtils;
import com.bnt.rest.entity.Country;
import com.bnt.rest.entity.QRole;
import com.bnt.rest.entity.QRoleFunction;
import com.bnt.rest.entity.Role;
import com.bnt.rest.entity.RoleFunction;
import com.bnt.rest.repository.RoleRepository;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public class RoleRepositoryImpl implements RoleRepository {

	private static final Logger logger = LogManager.getLogger(RoleRepositoryImpl.class);

	@PersistenceContext
	private EntityManager entityManager;

	@PostConstruct
	public void setParam() {
		EntityType<?> entityType = JPAUtils.getEntityType(entityManager, Country.class);
		logger.debug("entityType..{}", entityType);
	}

	@SuppressWarnings({ "unchecked", "deprecation" })
	@Override
	public Page<Role> getFilterData(Pageable pageable, String[] filters) {
		// functions:1, 2
		QRole mi = QRole.role;
		QRoleFunction roleFunction = QRoleFunction.roleFunction;
		Predicate lockedPredicate = null, namePredicate = null;
		Predicate functionPredicate = null;
		for (String each : filters) {
			if (each.contains(":")) {
				String param = each.split(":")[0];
				String value = each.split(":")[1];
				lockedPredicate = getFilterData1(mi, lockedPredicate, param, value);

				if (param.equals("name")) {
					namePredicate = mi.name.eq(value);
				}
				functionPredicate = getFilterData2(roleFunction, functionPredicate, param, value);
			}
		}
		Predicate deletePredicate = mi.deleted.eq('0');
		Page<Role> userPage;
		JPAQuery<Role> jpaQuery = null;
		jpaQuery = new JPAQuery<>(entityManager);
		if (functionPredicate != null) {
			jpaQuery.from(mi).innerJoin(mi.roleFunctions, roleFunction)
					.where(functionPredicate, lockedPredicate, deletePredicate, namePredicate)
					.limit(pageable.getPageSize()).offset(pageable.getOffset());
		} else {
			jpaQuery.from(mi).where(lockedPredicate, deletePredicate, namePredicate).limit(pageable.getPageSize())
					.offset(pageable.getOffset());
		}
		/**
		 * jpaQuery.from(mi).innerJoin(mi.roleFunctions, mi).where(lockedPredicate,
		 * deletePredicate).limit(pageable.getPageSize()).offset(pageable.getOffset());
		 */

		List<Role> userRoleList = jpaQuery.fetch();
		userPage = (Page<Role>) JPAUtils.getPageObjectFromList(pageable, userRoleList, jpaQuery.fetchCount());
		return userPage;

		/**
		 * Predicate deletePredicate = mi.deleted.eq('0'); Page<Role> userPage1 = null;
		 * JPAQuery jpaQuery = null; jpaQuery = new JPAQuery(entityManager); if(null ==
		 * rolePredicate) { jpaQuery.from(qSystemUser).where(lockedPredicate,
		 * rolePredicate,
		 * deletePredicate).limit(pageable.getPageSize()).offset(pageable.getOffset());
		 * }else { jpaQuery.from(qSystemUser).innerJoin(qSystemUser.roleId,
		 * qSystemUserRole).where(lockedPredicate, rolePredicate,
		 * deletePredicate).limit(pageable.getPageSize()).offset(pageable.getOffset());
		 * } List<SystemUser> usersList = jpaQuery.fetch(); userPage1 =
		 * (Page<SystemUser>) JPAUtils.getPageObjectFromList(pageable, usersList,
		 * jpaQuery.fetchCount()); return userPage1;
		 */
	}

	private Predicate getFilterData2(QRoleFunction roleFunction, Predicate functionPredicate, String param,
			String value) {
		if (param.equals("function")) {
			functionPredicate = roleFunction.subMenuFunction.id.eq(Integer.parseInt(value));
		}
		return functionPredicate;
	}

	private Predicate getFilterData1(QRole mi, Predicate lockedPredicate, String param, String value) {
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
	public void deleteRoleFunctionByRole(Role role) {
		List<RoleFunction> list = role.getRoleFunctions();
		for (RoleFunction configuredRoutes : list) {
			String query = "DELETE FROM RoleFunction e WHERE e.id = :id";
			Query q = entityManager.createQuery(query);
			q.setParameter("id", configuredRoutes.getId());
			q.executeUpdate();
		}
	}
}
