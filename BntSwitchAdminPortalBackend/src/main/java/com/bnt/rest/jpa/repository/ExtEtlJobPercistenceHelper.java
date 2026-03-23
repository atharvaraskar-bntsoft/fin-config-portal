package com.bnt.rest.jpa.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.ExtEtlJob;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface ExtEtlJobPercistenceHelper
		extends CrudRepository<ExtEtlJob, Integer>, QuerydslPredicateExecutor<ExtEtlJob> {

	Page<ExtEtlJob> findExtEtlJobByDeleted(char deleted, Pageable pageable);

}
