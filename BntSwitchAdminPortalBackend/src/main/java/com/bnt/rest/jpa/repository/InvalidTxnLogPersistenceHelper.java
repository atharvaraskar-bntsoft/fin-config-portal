package com.bnt.rest.jpa.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.InvalidMessageEntity;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface InvalidTxnLogPersistenceHelper
		extends PagingAndSortingRepository<InvalidMessageEntity, String>, CrudRepository<InvalidMessageEntity, String> {

}