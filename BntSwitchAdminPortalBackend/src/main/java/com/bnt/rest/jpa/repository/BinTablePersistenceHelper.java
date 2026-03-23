package com.bnt.rest.jpa.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.BinTable;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface BinTablePersistenceHelper extends JpaRepository<BinTable, Integer> {

	@Query("select b.id, b.brand from BinTable b")
	public List<Object> getIdAndBrandOnly();

	@Query("select distinct b.brand from BinTable b")
	public List<String> getBrandList();

	Page<BinTable> findBinTableByBinMasterIdId(Integer binMasterId, Pageable pageable);

	@Query("select b from BinTable b where b.binMasterId.id=?1")
	List<BinTable> getAllBinTableByBinMasterId(int binMasterId);

	@Query("select b.id, b.bin from BinTable b")
	public List<Object> getIdAndBinOnly();

}
