package com.bnt.rest.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.bnt.rest.entity.TransactionVelocity;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface VelocityLimitRepository {

	Page<TransactionVelocity> getFilterData(Pageable pageable, String[] filters);

	long countWithDeleted(char deleted);

	public TransactionVelocity saveTransactionVelocity(TransactionVelocity velocity);

	public TransactionVelocity findOne(int id);

}
