package com.bnt.rest.jpa.repository;

import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.HolidayCalender;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface HolidayCalenderPersistenceHelper
		extends CrudRepository<HolidayCalender, Integer>, QuerydslPredicateExecutor<HolidayCalender> {

}
