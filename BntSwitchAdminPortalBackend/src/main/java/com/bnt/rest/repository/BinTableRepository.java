package com.bnt.rest.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.bnt.rest.entity.BinTable;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface BinTableRepository {

	public BinTable findBinTableById(int id);

	public Page<BinTable> findPagedBinTable(Pageable pageable);

	public List<Object> findIdAndBinOnly();

	public Page<BinTable> findBinTableByBinMasterId(Integer binMasterId, Pageable pageable);

	public List<BinTable> getAllBinTableByBinMasterId(Integer binMasterId);

	Page<BinTable> findFilterBinTable(Pageable pageable, String[] filters);

}
