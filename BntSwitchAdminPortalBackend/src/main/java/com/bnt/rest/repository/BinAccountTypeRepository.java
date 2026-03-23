package com.bnt.rest.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.bnt.rest.entity.BinAccountType;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface BinAccountTypeRepository {

	public List<BinAccountType> findAll();

	public List<BinAccountType> getBinAccountTypeByBinTableId(int binMasterId);

	public Page<BinAccountType> findBinAccountTypeByBinTableId(Integer binTableId, Pageable pageable);

	public BinAccountType findBinAccountTypeById(int id);

	public Page<BinAccountType> findAllPagedBinAccountType(Pageable pageable);

}
