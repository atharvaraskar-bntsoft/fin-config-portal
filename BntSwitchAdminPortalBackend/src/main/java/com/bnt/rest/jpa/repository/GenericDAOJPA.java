package com.bnt.rest.jpa.repository;

import java.io.Serializable;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.bnt.common.util.JPAUtils;
import com.bnt.rest.entity.BaseEntity;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class GenericDAOJPA<T, ID extends Serializable> implements GenericDAO<T, ID> {

	private static final Logger logger = LogManager.getLogger(GenericDAOJPA.class.getName());

	private final Class<T> persistentClass;

	@PersistenceContext
	private EntityManager entityManager;

	public GenericDAOJPA(final Class<T> persistentClass) {
		super();
		this.persistentClass = persistentClass;
	}

	@SuppressWarnings("unchecked")
	public static GenericDAOJPA<EntityManager, String> getInstance(EntityManager entityManager, String entityName) {
		Class<? extends BaseEntity> entityClass = (Class<? extends BaseEntity>) JPAUtils
				.getClassTypeBySimpleName(entityManager, entityName);
		if (entityClass != null) {
			return getInstance(entityManager, entityClass);
		}
		return null;
	}

	@SuppressWarnings("rawtypes")
	public static GenericDAOJPA getInstance(EntityManager entityManager, Class<? extends BaseEntity> entityClass) {
		GenericDAOJPA entityDao = new GenericDAOJPA<>(entityClass);
		entityDao.setEntityManager(entityManager);
		return entityDao;
	}

	@Override
	public List<T> findAll() {
		return findByCriteria();
	}

	@Override
	public T get(final ID id) {
		return getEntityManager().find(persistentClass, id);
	}

	@Override
	public Class<T> getEntityClass() {
		return persistentClass;
	}

	@PersistenceContext
	public void setEntityManager(final EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	public EntityManager getEntityManager() {
		return entityManager;
	}

	protected List<T> findByCriteria(final CriteriaQuery... criterion) {
		return findByCriteria(-1, -1, criterion);
	}

	@SuppressWarnings({ "unchecked", "deprecation" })
	protected List<T> findByCriteria(final int firstResult, final int maxResults,
			final CriteriaQuery... criteriaQuery) {

		CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
		CriteriaQuery<T> cq = cb.createQuery(getEntityClass());
		cq.from(getEntityClass());

		return getEntityManager().createQuery(cq).getResultList();
	}

}
