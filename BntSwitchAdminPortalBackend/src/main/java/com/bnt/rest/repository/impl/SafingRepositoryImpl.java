package com.bnt.rest.repository.impl;

import java.util.List;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import com.querydsl.core.types.Predicate;
import com.querydsl.jpa.impl.JPAQuery;
import com.bnt.bswitch.shared.lib.msg.ProcessingStatus;
import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.exception.ExceptionLog;
import com.bnt.rest.entity.QSafing;
import com.bnt.rest.entity.Safing;
import com.bnt.rest.jpa.repository.SafingPersistenceHelper;
import com.bnt.rest.repository.SafingRepository;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Component
public class SafingRepositoryImpl implements SafingRepository {

	private static final Logger LOGGER = LogManager.getLogger(SafingRepositoryImpl.class);

	@Autowired
	private SafingPersistenceHelper safingPersistenceHelper;

	@PersistenceContext
	public EntityManager entityManager;

	@Override
	public Safing save(Safing safing) {
		try {
			return safingPersistenceHelper.save(safing);
		} catch (Exception e) {
			LOGGER.error("Issue in saving safing-->");
			LOGGER.error(ExceptionLog.printStackTraceToString(e));
			return null;
		}
	}

	@Override
	public Iterable<Safing> saveAll(List<Safing> entities) {
		try {
			return safingPersistenceHelper.saveAll(entities);
		} catch (Exception e) {
			LOGGER.error("Issue in saving safingList-->");
			LOGGER.error(ExceptionLog.printStackTraceToString(e));
			return null;
		}
	}

	@Override
	public Page<Safing> getPagableSafingList(Pageable pageable) {
		return safingPersistenceHelper.getPagableSafingList(pageable);
	}

	@Override
	public Page<Safing> getPagableExceptionList(Pageable pageable) {
		return safingPersistenceHelper.findAllWithPagination(pageable);
	}

	@Override
	public List<Safing> findAll() {
		return (List<Safing>) safingPersistenceHelper.findAll();
	}

	@Override
	public Safing findById(String id) {
		return safingPersistenceHelper.findById(id).orElse(null);
	}

	@Override
	public Iterable<Safing> findAllById(Iterable<String> ids) {
		return safingPersistenceHelper.findAllById(ids);
	}

	@Override
	public Page<Safing> getPagableByStatus(String status, Pageable pageable) {
		return safingPersistenceHelper.getPagableByStatus(status, pageable);
	}

	@Override
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Page<Safing> findFilterData(Pageable pageable, String[] filters, String type) {
		QSafing safing = QSafing.safing;
		Predicate id = null;
		Predicate status = null;
		Predicate route = null;
		List<Safing> safingList = null;
		for (String each : filters) {
			if (each.contains(":")) {
				String param = each.split(":")[0];
				String value = each.split(":")[1];
				if (param.equals("id")) {
					id = safing.id.like(value + '%');
				}
				if (param.equals("status")) {
					status = safing.status.eq(value);
				}
			}
		}
		if (status == null) {
			if (ProcessingStatus.EXCEPTION.name().equalsIgnoreCase(type)) {
				status = safing.status.eq(ProcessingStatus.EXCEPTION.name());
			} else {
				status = safing.status.notEqualsIgnoreCase(ProcessingStatus.EXCEPTION.name());
			}
		}

		// status = safing.postProcessingAction.eq("SAF");

		Predicate deletePredicate = safing.deleted.eq('0');
		Page<Safing> safingPagedList = null;
		JPAQuery jpaQuery = null;
		jpaQuery = new JPAQuery(entityManager);

		jpaQuery.from(safing).where(deletePredicate, status, id, route).limit(pageable.getPageSize())
				.offset(pageable.getOffset());

		safingList = jpaQuery.fetch();

		safingPagedList = (Page<Safing>) JPAUtils.getPageObjectFromList(pageable, safingList, jpaQuery.fetchCount());

		return safingPagedList;
	}
}
