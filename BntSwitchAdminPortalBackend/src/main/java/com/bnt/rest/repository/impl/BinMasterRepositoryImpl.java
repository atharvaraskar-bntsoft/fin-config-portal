package com.bnt.rest.repository.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import com.bnt.rest.entity.BinMaster;
import com.bnt.rest.jpa.repository.BinMasterPersistenceHelper;
import com.bnt.rest.repository.BinMasterRepository;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Component
public class BinMasterRepositoryImpl implements BinMasterRepository {

	@Autowired
	private BinMasterPersistenceHelper binMasterPersistenceHelper;

	@Override
	public BinMaster findBinMasterById(int id) {
		return binMasterPersistenceHelper.findById(id).orElse(null);
	}

	@Override
	public Page<BinMaster> findPagedBinMaster(Pageable pageable) {
		return binMasterPersistenceHelper.findAll(pageable);
	}

	@Override
	public List<Object> findIdAndFileNameOnly() {
		return binMasterPersistenceHelper.getIdAndFileNameOnly();
	}

	@Override
	public BinMaster findBinMasterByFileName(String fileName) {
		return binMasterPersistenceHelper.findBinMasterByFileName(fileName);
	}

}
