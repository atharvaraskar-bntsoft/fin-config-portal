package com.bnt.rest.jpa.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.bnt.multi.database.ReadOnlyRepository;
import com.bnt.rest.entity.Merchant;
import com.bnt.rest.entity.MerchantInstitution;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
@ReadOnlyRepository
public interface MerchantPersistenceHelper
		extends CrudRepository<Merchant, Integer>, QuerydslPredicateExecutor<Merchant> {

	public Merchant findMerchantByCode(String code);

	public Page<Merchant> findMerchantByDeleted(Character deleted, Pageable pageable);

	public List<Merchant> findMerchantByMerchantInstitution(MerchantInstitution merchantInstitution);

	public List<Merchant> findMerchantByMerchantInstitutionAndLockedAndDeleted(MerchantInstitution merchantInstitution,
			char locked, char delted);

	public List<Merchant> findByLockedAndDeleted(Character locked, Character deleted);

	public List<Merchant> findByDeleted(Character deleted);

	public Merchant findByName(String nextRecord);

	@Query("select m.code from Merchant m where m.merchantInstitution = :merchantInstitution")
	public List<String> findCodeByMerchantInstitution(
			@Param("merchantInstitution") MerchantInstitution merchantInstitution);

	@Query("select m.name from Merchant m where m.code = :code")
	public List<String> getCodeAndNameOnly(@Param("code") String code);

	@Query("select d.id, d.name, d.code from Merchant d where d.locked='0' and d.deleted='0'")
	public List<Object[]> getIdNameAndCode();

	@Query("select m.code,m.name from Merchant m")
	public List<Object> getCodeAndNameOnly();

	@Query("select m.code from Merchant m where m.id in ?1 ")
	public List<String> getMerchantCodeListByIdList(List<Integer> merchantIdList);

	@Query("SELECT m.code FROM Merchant m where m.merchantInstitution.id = ?1")
	public List<String> findAllCodeByMerchantInstitution(Integer merchantInstitutionId);

	@Query("SELECT m.code FROM Merchant m")
	public List<String> findAllCode();

	public Merchant findMerchantByMerchantInstitutionIdAndCode(Integer merchantInstitutionId, String code);
}
