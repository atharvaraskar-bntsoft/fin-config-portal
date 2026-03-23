package com.bnt.rest.jpa.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.Safing;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface SafingPersistenceHelper
		extends CrudRepository<Safing, String>, PagingAndSortingRepository<Safing, String> {

	@Query("select saf from Safing saf where saf.status <> 'EXCEPTION'and saf.deleted=0  and saf.postProcessingAction = 'SAF'")
	public Page<Safing> getPagableSafingList(Pageable pageable);

	@Query("select saf from Safing saf where saf.status = 'EXCEPTION' and saf.deleted=0  and saf.postProcessingAction = 'SAF'")
	public Page<Safing> findAllWithPagination(Pageable pageable);

	@Query("select saf from Safing saf where saf.status = ?1 and saf.deleted=0  and saf.postProcessingAction = 'SAF'")
	public Page<Safing> getPagableByStatus(String status, Pageable pageable);
}
