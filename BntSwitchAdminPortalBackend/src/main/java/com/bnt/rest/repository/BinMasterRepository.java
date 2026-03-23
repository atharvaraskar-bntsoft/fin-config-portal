package com.bnt.rest.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.bnt.rest.entity.BinMaster;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface BinMasterRepository {

	public BinMaster findBinMasterById(int id);

	public Page<BinMaster> findPagedBinMaster(Pageable pageable);

	public List<Object> findIdAndFileNameOnly();

	public BinMaster findBinMasterByFileName(String fileName);
}
