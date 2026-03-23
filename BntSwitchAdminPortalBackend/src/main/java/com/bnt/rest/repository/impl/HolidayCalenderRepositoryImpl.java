package com.bnt.rest.repository.impl;

import java.util.List;

import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.metamodel.EntityType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.querydsl.core.types.Predicate;
import com.querydsl.jpa.impl.JPAQuery;
import com.bnt.common.util.JPAUtils;
import com.bnt.rest.entity.HolidayCalender;
import com.bnt.rest.entity.QHolidayCalender;
import com.bnt.rest.jpa.repository.HolidayCalenderPersistenceHelper;
import com.bnt.rest.repository.HolidayCalenderRepository;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public class HolidayCalenderRepositoryImpl implements HolidayCalenderRepository {

	@Autowired
	HolidayCalenderPersistenceHelper holidayCalenderPersistenceHelper;

	@PersistenceContext
	private EntityManager entityManager;

	private EntityType<?> entityType;

//	@Override
//	public Page<HolidayCalender> findFilterData(Pageable pageable, String[] filters) {
//		// TODO Auto-generated method stub
//		return null;
//	}

	@Override
	public Page<HolidayCalender> findFilterData(Pageable pageable, String[] filters) {
		QHolidayCalender device = QHolidayCalender.holidayCalender;
		Predicate merchantCodePredicate = null;

		Page<HolidayCalender> holidayCalenderPage = null;
		JPAQuery jpaQuery = null;
		jpaQuery = new JPAQuery(entityManager);
		jpaQuery.from(device).where(merchantCodePredicate).limit(pageable.getPageSize()).offset(pageable.getOffset());
		List<HolidayCalender> holidayCalenderList = jpaQuery.fetch();
		holidayCalenderPage = (Page<HolidayCalender>) JPAUtils.getPageObjectFromList(pageable, holidayCalenderList,
				jpaQuery.fetchCount());
		return holidayCalenderPage;
	}
}
