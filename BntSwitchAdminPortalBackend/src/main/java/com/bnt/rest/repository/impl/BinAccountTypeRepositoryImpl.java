package com.bnt.rest.repository.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import com.bnt.rest.entity.BinAccountType;
import com.bnt.rest.jpa.repository.BinAccountTypePersistenceHelper;
import com.bnt.rest.repository.BinAccountTypeRepository;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Component
public class BinAccountTypeRepositoryImpl implements BinAccountTypeRepository {

	@Autowired
	private BinAccountTypePersistenceHelper binAccountTypePersistenceHelper;

	@Override
	public List<BinAccountType> findAll() {
		return binAccountTypePersistenceHelper.findAll();
	}

	@Override
	public List<BinAccountType> getBinAccountTypeByBinTableId(int binMasterId) {
		return binAccountTypePersistenceHelper.getBinAccountTypeByBinTableId(binMasterId);
	}

	@Override
	public Page<BinAccountType> findBinAccountTypeByBinTableId(Integer binTableId, Pageable pageable) {
		return binAccountTypePersistenceHelper.findBinAccountTypeByBinTableIdId(binTableId, pageable);
	}

	@Override
	public Page<BinAccountType> findAllPagedBinAccountType(Pageable pageable) {
		return binAccountTypePersistenceHelper.findAll(pageable);
	}

	@Override
	public BinAccountType findBinAccountTypeById(int id) {
		return binAccountTypePersistenceHelper.findById(id).orElse(null);
	}
}
