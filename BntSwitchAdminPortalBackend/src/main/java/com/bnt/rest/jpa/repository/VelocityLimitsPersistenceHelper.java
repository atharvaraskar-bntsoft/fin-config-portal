package com.bnt.rest.jpa.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.TransactionVelocity;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface VelocityLimitsPersistenceHelper
		extends CrudRepository<TransactionVelocity, Integer>, QuerydslPredicateExecutor<TransactionVelocity> {

	public Page<TransactionVelocity> findTransactionVelocityByDeleted(Character deleted, Pageable pageable);

	@Modifying
	@Query(value = "Update transaction_velocity txnVelocity set txnVelocity.deleted = '1' where txnVelocity.merchant_institution_code = ?", nativeQuery = true)
	public Integer saveDeleteByMerchantIntitution(Integer merchantInstitutionId);

	@Modifying
	@Query(value = "Update transaction_velocity txnVelocity set txnVelocity.deleted = '1' where txnVelocity.merchant_id = ?", nativeQuery = true)
	public Integer saveDeleteByMerchant(Integer merchantId);

	@Modifying
	@Query(value = "Update transaction_velocity txnVelocity set txnVelocity.deleted = '1' where txnVelocity.location_id = ?", nativeQuery = true)
	public Integer saveDeleteByLocation(Integer locationId);

	@Modifying
	@Query(value = "Update transaction_velocity txnVelocity set txnVelocity.deleted = '1' where txnVelocity.device_id = ?", nativeQuery = true)
	public Integer saveDeleteByDevice(Integer deviceId);

	@Query(value = "select * from transaction_velocity where merchant_institution_id = ? and transaction_type = ? and ifnull(merchant_id,-1)=ifnull(?,-1) and ifnull(location_id,-1)=ifnull(?,-1) and ifnull(device_id,-1)=ifnull(?,-1)", nativeQuery = true)
	public TransactionVelocity findVelocityByTransactionType(Integer merchantInstitutionId, String txnType,
			Integer merchantId, Integer locationId, Integer deviceId);

}
