package com.bnt.rest.jpa.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.BinAccountType;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface BinAccountTypePersistenceHelper extends JpaRepository<BinAccountType, Integer> {

	@Query("select b from BinAccountType b where b.binTableId.id=?1")
	List<BinAccountType> getBinAccountTypeByBinTableId(int binMasterId);

	Page<BinAccountType> findBinAccountTypeByBinTableIdId(Integer binTableId, Pageable pageable);

}
