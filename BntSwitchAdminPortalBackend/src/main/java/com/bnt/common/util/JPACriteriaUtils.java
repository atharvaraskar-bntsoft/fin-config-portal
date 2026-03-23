package com.bnt.common.util;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.bnt.common.util.exception.ExceptionLog;
import com.bnt.rest.entity.BaseEntity;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class JPACriteriaUtils {

	private JPACriteriaUtils() {
	}

	private static final String QUERY_STRING = "queryString:{}";
	private static final Logger logger = LogManager.getLogger(JPACriteriaUtils.class);

	@SuppressWarnings("unchecked")
	public static <A, B> A getSpecificChild(EntityManager entityManager, Class<A> classType, String mappedByAttribute,
			Integer parentId, Integer childId) {

		CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		CriteriaQuery<A> searchQuery = criteriaBuilder.createQuery(classType);
		Root<A> aRoot = searchQuery.from(classType);

		Join<A, B> bJoin = (Join<A, B>) aRoot.fetch(mappedByAttribute);
		Path<? extends Number> parentIdPath = aRoot.get("id");
		Path<? extends Number> childIdPath = bJoin.get("id");
		List<Predicate> predicates = new ArrayList<>();
		predicates.add(criteriaBuilder.equal(parentIdPath, parentId));
		predicates.add(criteriaBuilder.equal(childIdPath, childId));
		searchQuery = getSearchQueryWithAndPredicate(criteriaBuilder, searchQuery, predicates);

		TypedQuery<A> query = entityManager.createQuery(searchQuery);
		return query.getSingleResult();

	}

	private static <A> CriteriaQuery<A> getSearchQueryWithAndPredicate(CriteriaBuilder criteriaBuilder,
			CriteriaQuery<A> searchQuery, List<Predicate> predicates) {
		Predicate andPredicate = criteriaBuilder.and(predicates.stream().toArray(Predicate[]::new));

		return searchQuery.where(andPredicate);
	}

	public static <A> A getSpecificChild(EntityManager entityManager, Class<A> classType, Integer id) {
		CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		CriteriaQuery<A> searchQuery = criteriaBuilder.createQuery(classType);
		Root<A> aRoot = searchQuery.from(classType);
		Path<? extends Number> idPath = aRoot.get("id");
		List<Predicate> predicates = new ArrayList<>();
		predicates.add(criteriaBuilder.equal(idPath, id));
		Predicate andPredicate = criteriaBuilder.and(predicates.stream().toArray(Predicate[]::new));
		searchQuery.where(andPredicate);
		TypedQuery<A> query = entityManager.createQuery(searchQuery);
		return query.getSingleResult();
	}

	@SuppressWarnings("unchecked")
	public static <T> T getNonJoinNonVersionObject(EntityManager entityManager, Class<?> entityClass,
			Integer primaryId) {
		return (T) entityManager.find(entityClass, primaryId);
	}

	public static boolean validateName(EntityManager entityManager, Class<?> classType, String name,
			String columnName) {
		logger.info("inside validateName");
		boolean validation = false;
		String valueName = "";
		if (name != null) {
			valueName = name.replace(" ", "");
			valueName = valueName.toLowerCase();
		}
		logger.info("valueName : {}", valueName);
		if (StringUtil.isNotNullOrBlank(valueName)) {
			String tableName = JPAUtils.getTableName(classType);
			try {
				StringBuilder query = new StringBuilder();
				query.append("select count(1) from (SELECT lower(REPLACE(").append(columnName)
						.append(", ' ', '' )) as name from ").append(tableName);
				query.append(" ) entity where name = ?");
				logger.info("queryString: {}", query.toString());
				Query q = entityManager.createNativeQuery(query.toString());
				q.setParameter(1, valueName);
				long result = (long) q.getSingleResult();
				BigInteger data = BigInteger.valueOf(result);
				// BigInteger data= (BigInteger)q.getSingleResult();
				if (data.intValue() > 0) {
					logger.info("Name already exists.");
				} else {
					validation = true;
				}
			} catch (Exception e) {
				logger.error(ExceptionLog.printStackTraceToString(e));
			}
		}
		logger.info("completed validateName with validation: {}", validation);
		return validation;
	}

	@SuppressWarnings("unchecked")
	public static <T> T getEntityByName(EntityManager entityManager, Class<? extends BaseEntity> classType, String name,
			String columnName) {
		logger.info("inside getEntityByName()...");
		T objectEntity = null;
		String valueName = "";
		if (name != null) {
			valueName = name.replace(" ", "").toLowerCase();
		}
		logger.info("valueName...:{}", valueName);
		if (StringUtil.isNotNullOrBlank(valueName)) {
			String tableName = JPAUtils.getTableName(classType);
			try {
				StringBuilder sql = new StringBuilder();
				sql.append("select adp.* from ").append(tableName).append(" adp where adp.id in ");
				sql.append("(select entity.id from (SELECT lower(REPLACE(").append(columnName);
				sql.append(", ' ', '' )) as name , id from ").append(tableName).append(" ) entity where name = ? )");
				logger.info("queryString...: {}", sql.toString());

				Query query = entityManager.createNativeQuery(sql.toString(), classType);
				query.setParameter(1, valueName);
				List<Class<? extends BaseEntity>> result = query.getResultList();
				if (result != null && !result.isEmpty()) {
					objectEntity = (T) result.get(0);
				}
			} catch (Exception e) {
				logger.error(ExceptionLog.printStackTraceToString(e));
			}
		}
		logger.info("completed getEntityByName().");
		return objectEntity;
	}

	@SuppressWarnings("unchecked")
	public static <T> T getLatestEntityByID(EntityManager entityManager, Class<? extends BaseEntity> classType,
			String column) {
		logger.info("inside getLatestEntityByColumn");
		T objectEntity = null;

		if (classType != null) {
			String tableName = JPAUtils.getTableName(classType);
			try {
				StringBuilder sql = new StringBuilder();
				sql.append("select * from ").append(tableName).append(" order by ").append(column)
						.append(" desc limit 1");
				logger.info(QUERY_STRING, sql.toString());
				Query query = entityManager.createNativeQuery(sql.toString(), classType);
				List<Class<? extends BaseEntity>> result = query.getResultList();
				if (result != null && !result.isEmpty()) {
					objectEntity = (T) result.get(0);
				}
			} catch (Exception e) {
				logger.error(ExceptionLog.printStackTraceToString(e));
			}
		}
		logger.info("completed getLatestEntityByColumn");
		return objectEntity;
	}
}
