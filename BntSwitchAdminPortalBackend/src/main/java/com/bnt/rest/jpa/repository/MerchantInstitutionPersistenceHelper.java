package com.bnt.rest.jpa.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bnt.multi.database.ReadOnlyRepository;
import com.bnt.rest.entity.MerchantInstitution;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
@ReadOnlyRepository
public interface MerchantInstitutionPersistenceHelper
		extends CrudRepository<MerchantInstitution, Integer>, QuerydslPredicateExecutor<MerchantInstitution> {
	public Page<MerchantInstitution> findMerchantInstitutionByDeleted(Character deleted, Pageable pageable);

	public MerchantInstitution findMerchantInstitutionByCode(String code);

	@Query("select m FROM MerchantInstitution m where m.name = ?1")
	public MerchantInstitution findMerchantGroupByName(String name);

	public List<MerchantInstitution> findByLockedAndDeleted(Character locked, Character deleted);

	public List<MerchantInstitution> findByDeleted(Character deleted);

	public List<MerchantInstitution> findAllByLockedAndDeleted(char locked, char deleted);

	public MerchantInstitution findByName(String nextRecord);

	@Query("SELECT mi.code FROM MerchantInstitution mi where mi.institution.id= ?1")
	public List<String> findAllCodeByInstitutionId(Integer institutionId);

	@Query("SELECT m.code FROM MerchantInstitution m")
	public List<String> findAllCode();
}
