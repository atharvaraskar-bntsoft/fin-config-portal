package com.bnt.rest.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.bnt.rest.entity.BinAccountTypeMaster;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface BinAccountTypeMasterRepository {

	public BinAccountTypeMaster findBinAccountTypeMasterById(int id);

	public void deleteById(Integer id);

	public BinAccountTypeMaster save(BinAccountTypeMaster binAccountTypeMaster);

	public Page<BinAccountTypeMaster> findPagedBinAccountTypeMaster(Pageable pageable);

	public List<BinAccountTypeMaster> findAll();

	public List<BinAccountTypeMaster> saveList(List<BinAccountTypeMaster> binAccountTypeMasterList);

}
