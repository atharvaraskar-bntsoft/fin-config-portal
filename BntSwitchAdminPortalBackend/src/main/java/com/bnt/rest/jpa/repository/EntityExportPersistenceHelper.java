package com.bnt.rest.jpa.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.bnt.rest.entity.EntityExport;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface EntityExportPersistenceHelper extends PagingAndSortingRepository<EntityExport, Integer>,
		CrudRepository<EntityExport, Integer>, QuerydslPredicateExecutor<EntityExport> {

	public EntityExport findByGroupTypeAndVersion(String groupType, Long version);

	@Query("SELECT Max(e.version) AS nextVersion FROM EntityExport e where e.groupType = ?1")
	public Long findMax(String groupType);

}
