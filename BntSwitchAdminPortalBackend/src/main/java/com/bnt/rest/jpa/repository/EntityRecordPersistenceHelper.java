package com.bnt.rest.jpa.repository;

import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.bnt.rest.entity.EntityRecord;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface EntityRecordPersistenceHelper extends PagingAndSortingRepository<EntityRecord, Integer>,
		CrudRepository<EntityRecord, Integer>, QuerydslPredicateExecutor<EntityRecord> {

}
