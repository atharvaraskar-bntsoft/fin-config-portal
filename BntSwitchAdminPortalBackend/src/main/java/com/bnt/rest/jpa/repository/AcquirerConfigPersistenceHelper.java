package com.bnt.rest.jpa.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bnt.multi.database.ReadOnlyRepository;
import com.bnt.rest.entity.AcquirerIdConfig;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
@ReadOnlyRepository
public interface AcquirerConfigPersistenceHelper
		extends CrudRepository<AcquirerIdConfig, Integer>, QuerydslPredicateExecutor<AcquirerIdConfig> {

	public AcquirerIdConfig findAcquirerIdConfigByCode(String acquirerCode);

	public Page<AcquirerIdConfig> findAcquirerIdConfigByDeleted(Character deleted, Pageable pageable);

	public List<AcquirerIdConfig> findByActiveAndDeleted(boolean active, char deleted);

}