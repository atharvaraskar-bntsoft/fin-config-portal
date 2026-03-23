package com.bnt.rest.jpa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.BinAccountTypeMaster;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface BinAccountTypeMasterPersistenceHelper extends JpaRepository<BinAccountTypeMaster, Integer> {

}
