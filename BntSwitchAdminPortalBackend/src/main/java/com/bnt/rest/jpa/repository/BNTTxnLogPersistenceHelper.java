package com.bnt.rest.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.bnt.multi.database.ReadOnlyRepository;
import com.bnt.rest.entity.TxnLogEntity;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
@Transactional
@ReadOnlyRepository
public interface BNTTxnLogPersistenceHelper extends CrudRepository<TxnLogEntity, Long> {

	@Modifying
	@Query("delete from TxnLogEntity u where u.merchantId in ?1 ")
	void deleteMerchants(List<String> merchantList);

	@Query("SELECT count(*) FROM TxnLogEntity u where u.merchantId in ?1 ")
	long countTxns(List<String> merchantList);

	@Query("select tl.id, tl.txnType from TxnLogEntity tl ")
	List<Object[]> getIdAndNameSqlQuery();

	// Why not working ????
	// @Query("select t from TxnLogEntity t where t.txnId = :txnId")
	TxnLogEntity findByTxnId(@Param("txnId") String txnId);

}
