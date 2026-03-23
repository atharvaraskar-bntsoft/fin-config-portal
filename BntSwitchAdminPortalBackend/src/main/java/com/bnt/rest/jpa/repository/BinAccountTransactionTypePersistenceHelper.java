package com.bnt.rest.jpa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.BinAccountTransactionType;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface BinAccountTransactionTypePersistenceHelper extends JpaRepository<BinAccountTransactionType, Integer> {

}
