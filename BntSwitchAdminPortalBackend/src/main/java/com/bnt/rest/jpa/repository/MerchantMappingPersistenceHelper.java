package com.bnt.rest.jpa.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.MerchantCodeMapping;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface MerchantMappingPersistenceHelper
		extends CrudRepository<MerchantCodeMapping, Integer>, QuerydslPredicateExecutor<MerchantCodeMapping> {

	public Page<MerchantCodeMapping> findMerchantMappingByDeleted(Character c, Pageable pageable);
}
